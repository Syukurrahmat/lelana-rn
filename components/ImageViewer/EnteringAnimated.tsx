import React, { useEffect, useMemo } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getVariableValue, View } from 'tamagui';
import { InitialViewingMeasure } from './type';
import { useViewerContext } from './ImageViewerProvider';

const timingConfig = {
	duration: 300,
	dampingRatio: 2.2,
	stiffness: 318,
	overshootClamping: true,
	restDisplacementThreshold: 71.23,
	restSpeedThreshold: 0.01,
};

interface EnteringAnimatedProps {
	onComplete: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function EnteringAnimated(props: EnteringAnimatedProps) {
	const { enterExitThumbData, images } = useViewerContext();
	const { x, y, width, height , index} = enterExitThumbData;
	
	const insets = useSafeAreaInsets();
	const sharedValues = useSharedValue({
		top: y + insets.top,
		left: x,
		width: width,
		height: height,
		borderRadius: getVariableValue('$4', 'radius'),
	});
	
	const largeImage = images[index]
	const { onComplete } = props;

	const endStyle = useMemo(() => {
		const aspectRatio = largeImage.width / largeImage.height;
		const scaledHeight = SCREEN_WIDTH / aspectRatio;
		const top = SCREEN_HEIGHT / 2 - scaledHeight / 2;

		return {
			top: top,
			left: 0,
			width: SCREEN_WIDTH,
			height: scaledHeight,
			borderRadius: 0,
		};
	}, [largeImage.height, largeImage.width]);

	useEffect(() => {
		sharedValues.modify((value) => {
			'worklet';

			value.top = withSpring(endStyle.top, timingConfig, () =>
				runOnJS(onComplete)()
			);
			value.left = withSpring(endStyle.left, timingConfig);
			value.width = withSpring(endStyle.width, timingConfig);
			value.height = withSpring(endStyle.height, timingConfig);
			value.borderRadius = withSpring(endStyle.borderRadius, timingConfig);

			return value;
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		top: sharedValues.value.top,
		left: sharedValues.value.left,
		width: sharedValues.value.width,
		height: sharedValues.value.height,
		borderRadius: sharedValues.value.borderRadius,
	}));

	return (
		<View h={SCREEN_HEIGHT}>
			<Animated.Image
				key="djd"
				style={[animatedStyle]}
				alt="image"
				source={{ uri: largeImage.uri }}
			/>
		</View>
	);
}
