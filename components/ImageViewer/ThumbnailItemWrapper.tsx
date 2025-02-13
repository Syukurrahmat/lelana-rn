import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useViewerWrapperContext } from './ViewerContext';
import Animated from 'react-native-reanimated';

interface ThumbnailItemWrapperProps extends TouchableOpacityProps {
	imageIndex: number;
}

export function ThumbnailItemWrapper(props: ThumbnailItemWrapperProps) {
	const { imageIndex, ...touchableOpacityProps } = props;
	const { thumbnailRef, onThumnailClicked } = useViewerWrapperContext();

	return (
		<Animated.View sharedTransitionTag={'displayImage' + imageIndex}>
			<TouchableOpacity
				ref={(el) => (thumbnailRef.current[imageIndex] = el)}
				activeOpacity={0.9}
				{...touchableOpacityProps}
				onPress={(event) => onThumnailClicked(event, imageIndex)}
			/>
		</Animated.View>
	);
}
