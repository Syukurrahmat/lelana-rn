import { withSpring } from 'react-native-reanimated';
import { getVariableValue } from 'tamagui';


export const getEnterStyle = (thumbBounds: MeasureInWindowReturn, containerHeight: number, insetTop: number) => {
	const { x, y, height, width } = thumbBounds;

	return {
		translationX: x,
		translationY: (-containerHeight + insetTop + height) / 2 + y,
		height,
		width,
		borderRadius: getVariableValue('$4', 'radius') as number
	};
};
export const withAnimation: typeof withSpring = (toValue) => {
	'worklet';

	return withSpring(toValue, {
		mass: 1,
		damping: 15,
		stiffness: 200,
		overshootClamping: false,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 2,
	});
};export const bouncyClamp = (
	currentValue: number,
	newValue: number,
	min: number,
	max: number,
	tolerancy: number
) => {
	'worklet';

	return (newValue > max + tolerancy) || (newValue < min - tolerancy)
		? currentValue
		: newValue;
};

