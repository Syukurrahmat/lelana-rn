import { View } from '@gluestack-ui/themed';
import { ReactNode, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

interface CollapsableProps {
	children?: ReactNode;
	isOpen: boolean;
}

export default function Collapsable({ children, isOpen }: CollapsableProps) {
	const [height, setHeight] = useState(0);

	const onLayout = (event: LayoutChangeEvent) => {
		const measuredHeight = event.nativeEvent.layout.height;
		if (measuredHeight > 0 && height !== measuredHeight) {
			setHeight(measuredHeight + 1);
		}
	};

	const collapsableStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(isOpen ? height : 0, { duration: 200 }),
		};
	}, [height, isOpen]);

	return (
		<Animated.View style={[collapsableStyle, { overflow: 'hidden' }]}>
			<View position="absolute" w="100%" onLayout={onLayout}>
				{children}
			</View>
		</Animated.View>
	);
}
