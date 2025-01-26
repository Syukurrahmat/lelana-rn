import { memo, ReactNode, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { View } from 'tamagui';

interface Collapsable {
	children?: ReactNode;
	isOpen: boolean;
}

export default function Collapsable({ children, isOpen }: Collapsable) {
	const [height, setHeight] = useState(0);

	const onLayout = (event: LayoutChangeEvent) => {
		const onLayoutHeight = event.nativeEvent.layout.height;

		if (onLayoutHeight > 0 && height !== onLayoutHeight) {
			setHeight(onLayoutHeight + 1);
		}
	};

	const collapsableStyle = useAnimatedStyle(() => ({
		height: withTiming(isOpen ? height : 0, { duration: 200 }),
	}));

	return (
		<Animated.View style={[collapsableStyle, { overflow: 'hidden' }]}>
			<View pos="absolute" w="100%" onLayout={onLayout}>
				{children}
			</View>
		</Animated.View>
	);
}
