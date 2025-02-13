import { useCallback, useEffect, useMemo } from 'react';
import { Gesture, State } from 'react-native-gesture-handler';
import { cancelAnimation, clamp, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useViewerContext } from './ViewerContext';
import { bouncyClamp, getEnterStyle as getTransformedThumbBound, withAnimation } from './lib';

interface UseViewingGestureProps {
	imageData: EntryImageData;
	isScroling: boolean;
	index: number;
	containerDimention: {
		width: number,
		height: number
	}
	insetTop?: number
}

export const useViewingGesture = (props: UseViewingGestureProps) => {
	const { imageData, isScroling, insetTop = 0, containerDimention, index } = props;
	const { thumbBounds, transision, currentIndex, setTransition, setCurrentIndex } = useViewerContext()

	const state = useMemo(() => {
		return currentIndex !== index || transision === 'caroseul'
			? 'none' as const
			: transision
	}, [currentIndex, index, transision])

	const transformConfig = useMemo(() => ({
		ASPECT_RATIO: imageData.width / imageData.height,
		SCALE_MAX: 2.5,
		SCALE_DOUBLE_TAB: 2,
		SCALE_TOLERANCE: 0.5,
		TRANSLATION_X_TOLERANCE: containerDimention.width - 10,
		TRANSLATION_Y_TOLERANCE: containerDimention.height - 10,
		RESET_SCALE: 1,
		RESET_TRANSLATE: 0,

		RESET_WIDTH: containerDimention.width,
		RESET_HEIGHT: imageData.width / imageData.height * containerDimention.width,
		RESET_BORDER_RADIUS: 0,
	}), [containerDimention, imageData])

	const initialStyle = useMemo(
		() => state === 'entering'
			? getTransformedThumbBound(thumbBounds, containerDimention.height, insetTop)
			: {
				translationX: transformConfig.RESET_TRANSLATE,
				translationY: transformConfig.RESET_TRANSLATE,
				height: transformConfig.RESET_HEIGHT,
				width: transformConfig.RESET_WIDTH,
				borderRadius: transformConfig.RESET_BORDER_RADIUS,
			},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	const layoutValues = useSharedValue({
		width: initialStyle.width,
		height: initialStyle.height,
		borderRadius: initialStyle.borderRadius
	})

	const translationX = useSharedValue(initialStyle.translationX);
	const translationY = useSharedValue(initialStyle.translationY);
	const scale = useSharedValue(transformConfig.RESET_SCALE);

	const savedScale = useSharedValue(1);
	const savedTranslationX = useSharedValue(0);
	const savedTranslationY = useSharedValue(0);

	useEffect(() => {
		if (state === 'entering') {
			layoutValues.modify((value) => {
				'worklet';

				value.borderRadius = withTiming(transformConfig.RESET_BORDER_RADIUS, { duration: 200 })
				value.height = withTiming(transformConfig.RESET_HEIGHT, { duration: 200 })
				value.width = withTiming(transformConfig.RESET_WIDTH, { duration: 200 },
					() => runOnJS(setTransition)('caroseul')
				)

				return value;
			});
			translationX.value = withTiming(transformConfig.RESET_TRANSLATE, { duration: 200 })
			translationY.value = withTiming(transformConfig.RESET_TRANSLATE, { duration: 200 })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (state === 'exiting') {
			const exitStyle = getTransformedThumbBound(thumbBounds, containerDimention.height, insetTop)

			layoutValues.modify((value) => {
				'worklet';

				value.width = withTiming(exitStyle.width, { duration: 200 })
				value.height = withTiming(exitStyle.height, { duration: 200 })
				value.borderRadius = withTiming(exitStyle.borderRadius, { duration: 200 })

				return value;
			});
			translationX.value = withTiming(exitStyle.translationX, { duration: 200 })
			translationY.value = withTiming(exitStyle.translationY, { duration: 200 },
				() => runOnJS(setCurrentIndex)(null)
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state])

	const calculateMaxTranslation = useCallback((scale: number) => {
		'worklet';

		const scaledWidth = containerDimention.width * scale;
		const scaledHeight = (scaledWidth) / transformConfig.ASPECT_RATIO

		const maxX = scaledWidth < containerDimention.width
			? 0
			: (scaledWidth - containerDimention.width) / 2 / scale
		const maxY = scaledHeight < containerDimention.height
			? 0
			: (scaledHeight - containerDimention.height) / 2 / scale

		return { x: maxX, y: maxY };
	}, [containerDimention, transformConfig.ASPECT_RATIO])

	const gestureList = useMemo(() => {
		const pinchGesture = Gesture.Pinch()
			.enabled(!isScroling)
			.onStart(() => {
				cancelAnimation(scale)
				savedScale.value = scale.value;
			})
			.onUpdate((e) => {
				const newScale = savedScale.value * e.scale;
				scale.value = bouncyClamp(
					scale.value,
					newScale,
					transformConfig.RESET_SCALE + 0.2,
					transformConfig.SCALE_MAX + 0.5,
					transformConfig.SCALE_TOLERANCE
				);
			})
			.onEnd(() => {
				if (scale.value > transformConfig.SCALE_MAX) {
					scale.value = withAnimation(transformConfig.SCALE_MAX);
				}
				if (scale.value < transformConfig.RESET_SCALE + 0.1) {
					scale.value = withAnimation(transformConfig.RESET_SCALE);
				}
			})

		const panGesture = Gesture.Pan()
			.enabled(!isScroling)
			.minDistance(0)
			.onStart(() => {
				cancelAnimation(translationX)
				cancelAnimation(translationY)
				savedTranslationX.value = translationX.value;
				savedTranslationY.value = translationY.value;
			})
			.onUpdate((e) => {
				const newX = savedTranslationX.value + e.translationX / scale.value;
				const newY = savedTranslationY.value + e.translationY / scale.value;

				translationX.value = newX
				translationY.value = newY
			})
			.onEnd(() => {
				const maxTranslation = calculateMaxTranslation(scale.value)

				translationX.value = withAnimation(clamp(
					translationX.value,
					-maxTranslation.x,
					maxTranslation.x,
				));

				translationY.value = withAnimation(clamp(
					translationY.value,
					-maxTranslation.y,
					maxTranslation.y,
				));
			})
			.onTouchesMove((event, state) => {
				if (([State.UNDETERMINED, State.BEGAN] as State[]).includes(event.state)) {
					if (scale.value !== transformConfig.RESET_SCALE || event.numberOfTouches === 2) {
						state.activate();
					}
					else {
						state.fail();
					}
				}
			})

		const doubleTapGesture = Gesture.Tap()
			.enabled(!isScroling)
			.numberOfTaps(2)
			.maxDelay(200)
			.onStart(() => {
				cancelAnimation(scale)
				cancelAnimation(translationX)
				cancelAnimation(translationY)
			})
			.onEnd((e) => {
				if (scale.value > 1) {
					scale.value = withAnimation(transformConfig.RESET_SCALE);
					translationX.value = withAnimation(transformConfig.RESET_TRANSLATE);
					translationY.value = withAnimation(transformConfig.RESET_TRANSLATE);
				} else {
					scale.value = withAnimation(transformConfig.SCALE_DOUBLE_TAB);

					const y = savedTranslationY.value - (e.y - containerDimention.height / 2);
					const x = savedTranslationX.value - (e.x - containerDimention.width / 2);

					const maxTranslation = calculateMaxTranslation(transformConfig.SCALE_DOUBLE_TAB);

					translationY.value = withAnimation(clamp(y, -maxTranslation.y, maxTranslation.y));
					translationX.value = withAnimation(clamp(x, -maxTranslation.x, maxTranslation.x));
				}
			})
		return { pinchGesture, panGesture, doubleTapGesture }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isScroling])

	const gesture = Gesture.Race(
		gestureList.doubleTapGesture,
		Gesture.Simultaneous(
			gestureList.pinchGesture,
			gestureList.panGesture
		)
	)

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ scale: scale.value },
			{ translateX: translationX.value },
			{ translateY: translationY.value },
		],
		width: layoutValues.value.width,
		height: layoutValues.value.height,
		borderRadius: layoutValues.value.borderRadius,
	}), []);

	return {
		gesture,
		animatedStyle,
		containerStyle: {
			width: containerDimention.width,
			height: containerDimention.height,
			paddingTop: insetTop
		}
	};
};





