import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';
import { useViewingGesture } from './useViewingGesture';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface CaroseulItemProps {
	imageData: EntryImageData;
	isScroling: boolean;
	index: number;
}

export function ImageViewerCaroseulItem(props: CaroseulItemProps) {
	const { imageData, index, isScroling } = props;
	const ref = useAnimatedRef();
	const insets = useSafeAreaInsets();

	const { gesture, animatedStyle, containerStyle } = useViewingGesture({
		imageData,
		index,
		isScroling,
		containerDimention: {
			width: SCREEN_WIDTH,
			height: SCREEN_HEIGHT,
		},
		insetTop: insets.top,
	});

	return (
		<TouchableOpacity activeOpacity={1}>
			<View style={[containerStyle, { paddingTop: insets.top }]}>
				<GestureDetector gesture={gesture}>
					<View flex={1} jc="center">
						<Animated.View
							ref={ref}
							style={[animatedStyle, { overflow: 'hidden' }]}
						>
							<Image
								key={imageData.id}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
								}}
								alt="image"
								source={{ uri: imageData.uri }}
							/>
						</Animated.View>
					</View>
				</GestureDetector>
			</View>
		</TouchableOpacity>
	);
}
