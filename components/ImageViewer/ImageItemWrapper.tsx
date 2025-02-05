import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useViewerWrapperContext } from './ImageViewerProvider';

interface ImageItemWrapperProps extends TouchableOpacityProps {
	imageIndex: number;
}

export function ImageItemWrapper(props: ImageItemWrapperProps) {
	const { imageIndex, ...touchableOpacityProps } = props;
	const { thumbnailRef, onThumnailClicked } = useViewerWrapperContext();

	return (
		<TouchableOpacity
			ref={(el) => (thumbnailRef.current[imageIndex] = el)}
			activeOpacity={0.9}
			{...touchableOpacityProps}
			onPress={(event) => onThumnailClicked(event, imageIndex)}
		/>
	);
}
