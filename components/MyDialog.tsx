import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	AnimatePresence,
	Card,
	Overlay,
	Portal,
	View,
	getVariableValue,
} from 'tamagui';

interface MyDialogProps {
	opened: boolean;
	onClose: () => void;
	children: ReactNode;
	withOverlay?: boolean;
}

const animationConfig = {
	damping: 20,
	stiffness: 300,
	mass: 0.5,
	overshootClamping: false,
};

export function MyDialog(props: MyDialogProps) {
	const { opened, onClose, children, withOverlay = true } = props;
	const insets = useSafeAreaInsets();
	const heightOverlay = useSharedValue(Dimensions.get('window').height);
	const height = useSharedValue(50);

	const initialTranslate = {
		transform: [
			{
				translateY: heightOverlay.value / 2 - height.value / 2 + insets.top,
			},
		],
	};

	const collapsableStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: withSpring(
					heightOverlay.value / 2 - height.value / 2 + insets.top,
					animationConfig
				),
			},
		],
	}));

	return (
		<Portal>
			<AnimatePresence>
				{opened &&
					(withOverlay ? (
						<Overlay
							onLayout={(e) =>
								(heightOverlay.value = e.nativeEvent.layout.height)
							}
							key="overlay"
							fullscreen
							bg="black"
							onPress={onClose}
							opacity={0.5}
							animation={'200ms'}
							enterStyle={{ opacity: 0 }}
							exitStyle={{ opacity: 0 }}
						/>
					) : (
						<View
							onLayout={(e) =>
								(heightOverlay.value = e.nativeEvent.layout.height)
							}
							flex={1}
							key="overlay"
							pos="absolute"
							width="100%"
							height="100%"
							onPress={onClose}
						/>
					))}
			</AnimatePresence>

			<AnimatePresence>
				{opened && (
					<Animated.View
						key="content"
						style={[
							collapsableStyle,
							style.contentWrapper,
							initialTranslate,
						]}
						onLayout={(e) => (height.value = e.nativeEvent.layout.height)}
					>
						<Card
							p="$4"
							elevate
							elevation="$1"
							animateOnly={['transform', 'opacity']}
							animation="200ms"
							enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
							exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
							gap="$4"
						>
							{children}
						</Card>
					</Animated.View>
				)}
			</AnimatePresence>
		</Portal>
	);
}

const style = StyleSheet.create({
	contentWrapper: {
		position: 'absolute',
		zIndex: 10000000,
		width: '100%',
		flex: 1,
		top: 0,
		paddingInline: getVariableValue('$4', 'space'),
	},
});
