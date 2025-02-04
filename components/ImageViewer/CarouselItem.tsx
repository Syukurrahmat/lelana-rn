import { ImageDataWithDimention } from '@/libs/utils';
import React, { useCallback } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	clamp,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { Image, View } from 'tamagui';

interface ImageViewerCaroseulItemProps {
	imageData: ImageDataWithDimention;
	enableToPanState: UseStateReturn<boolean>;
}

const SCALE_TRESHOLD = 0.5;
const [SCALE_MIN, SCALE_MAX] = [1, 2.5];
const [TRANSLATE_MIN] = [0];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');



export function ImageViewerCaroseulItem(props: ImageViewerCaroseulItemProps) {
	const { imageData, enableToPanState } = props;
	const [enableSwipe, setenableSwipe] = enableToPanState;

	const scale = useSharedValue(1);
	const savedScale = useSharedValue(1);

	const translationX = useSharedValue(0);
	const translationY = useSharedValue(0);

	const savedTranslationX = useSharedValue(0);
	const savedTranslationY = useSharedValue(0);

	const maxTranslationX = useSharedValue(0);
	const maxTranslationY = useSharedValue(0);

	const imageAspectRatio = imageData.width / imageData.height;

	const resetTranslate = useCallback(() => {
		'worklet';
		translationX.value = TRANSLATE_MIN;
		translationY.value = TRANSLATE_MIN;
		savedTranslationX.value = translationX.value;
		savedTranslationY.value = translationY.value;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const resetScale = useCallback(() => {
		'worklet';
		scale.value = SCALE_MIN;
		savedScale.value = scale.value;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const pinchGesture = Gesture.Pinch()
		.onUpdate((e) => {
			const newScale = savedScale.value * e.scale;
			scale.value = bouncyClamp(
				scale.value,
				newScale,
				SCALE_MIN + 0.2,
				SCALE_MAX + 0.5,
				SCALE_TRESHOLD
			);
		})

		.onEnd(() => {
			if (scale.value > SCALE_MAX) {
				scale.value = SCALE_MAX;
			}
			if (scale.value < SCALE_MIN + 0.1) {
				resetScale();
				resetTranslate();
			}

			savedScale.value = scale.value;
			runOnJS(setenableSwipe)(scale.value === 1);
		});

	const panYGesture = Gesture.Pan()
		.activeOffsetY(enableSwipe ? [-5, 5] : [-1, 1])
		.minPointers(1)
		.onUpdate((e) => {
			let newY = savedTranslationY.value + e.translationY / scale.value;
			translationY.value = newY;
		})
		.onEnd(() => {
			if (scale.value === 1) {
				if (Math.abs(translationY.value) > 100) {
					console.log('xxixix');
				}
				resetTranslate();
			}

			const scaledHeight = (SCREEN_WIDTH * scale.value) / imageAspectRatio;
			const heightOffset = (scaledHeight - SCREEN_HEIGHT) / (2 * scale.value); //prettier-ignore

			const isImageOffside = scaledHeight > SCREEN_HEIGHT;
			const maxY = Math.max(0, heightOffset);

			maxTranslationY.value = maxY;

			translationY.value = isImageOffside
				? clamp(translationY.value, -maxY, maxY)
				: 0;
			savedTranslationY.value = translationY.value;
		});

	const panXGesture = Gesture.Pan()
		.enabled(!enableSwipe)
		.onUpdate((e) => {
			let newX = savedTranslationX.value + e.translationX / scale.value;
			translationX.value = newX;
		})
		.onEnd(() => {
			const scaledWidth = SCREEN_WIDTH * scale.value;
			const maxX = (scaledWidth - SCREEN_WIDTH) / (2 * scale.value);

			maxTranslationX.value = maxX;

			translationX.value = clamp(translationX.value, -maxX, maxX);
			savedTranslationX.value = translationX.value;
		});

	const doubleTapGesture = Gesture.Tap()
		.numberOfTaps(2)
		.maxDelay(100)
		.onEnd(() => {
			if (scale.value > 1) {
				resetScale();
				resetTranslate();
			} else {
				scale.value = 2;
				savedScale.value = 2;
			}
		});

	const composed = Gesture.Simultaneous(
		pinchGesture,
		doubleTapGesture,
		panXGesture,
		panYGesture
	);

	const animatedStyle = useAnimatedStyle(() => {
		const isScaleWithSpring = [SCALE_MIN, SCALE_MAX].includes(scale.value);
		const isTranslateXWithSpring = [
			TRANSLATE_MIN,
			maxTranslationX.value,
			-maxTranslationX.value,
		].includes(translationX.value);
		const isTranslateYWithSpring = [
			TRANSLATE_MIN,
			maxTranslationY.value,
			-maxTranslationY.value,
		].includes(translationY.value);

		return {
			transform: [
				{
					scale: isScaleWithSpring ? withSpring(scale.value) : scale.value,
				},
				{
					translateX: isTranslateXWithSpring
						? withSpring(translationX.value)
						: translationX.value,
				},
				{
					translateY: isTranslateYWithSpring
						? withSpring(translationY.value)
						: translationY.value,
				},
			],
		};
	});

	return (
		<TouchableOpacity activeOpacity={1}>
			<View width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
				<GestureDetector gesture={composed}>
					<View flex={1} jc="center">
						<Animated.View style={[animatedStyle]}>
							<Image
								key={imageData.id}
								w="100%"
								h="auto"
								aspectRatio={imageAspectRatio}
								alt="image"
								objectFit="contain"
								source={{ uri: imageData.uri }}
							/>
						</Animated.View>
					</View>
				</GestureDetector>
			</View>
		</TouchableOpacity>
	);
}

const bouncyClamp = (
	currentValue: number,
	newValue: number,
	min: number,
	max: number,
	threshold: number
) => {
	'worklet';

	return newValue > max + threshold || newValue < min - threshold
		? currentValue
		: newValue;
};