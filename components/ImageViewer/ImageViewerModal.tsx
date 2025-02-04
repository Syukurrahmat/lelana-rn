import { memo, useState } from 'react';
import { Modal } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Overlay, View } from 'tamagui';
import { MyButtonIcon } from '../custom/CustomComponents';
import { ImageViewerCaroseul } from './Carousel';
import { EnteringAnimated } from './EnteringAnimated';
import { AnimationStatus, InitialImageViewing } from './type';

export interface ViewingImageModalProps {
	showedImageState: UseStateReturn<InitialImageViewing | null>;
	images: EntryImageData[];
}


export function ImageViewerModal(props: ViewingImageModalProps) {
	const { showedImageState, images } = props;

	const [initialImage, setInitialImage] = showedImageState;
	const insets = useSafeAreaInsets();

	const onClose = () => {
		setInitialImage(null);
	};

	return (
		<Modal
			visible={Boolean(initialImage)}
			onRequestClose={onClose}
			transparent
			statusBarTranslucent
		>
			{!!initialImage && (
				<GestureHandlerRootView style={{ flex: 1 }}>
					<Overlay
						bg="black"
						animation="lazy"
						opacity={0.95}
						zIndex={-1}
					/>
					<View pos="absolute" right="$4" top={insets.top} zIndex={10}>
						<MyButtonIcon
							name="x"
							circular
							transparent={false}
							bg="$color06"
							pressStyle={{ opacity: 0.8, bg: '$color06' }}
							iconColor="white"
							onPress={onClose}
						/>
					</View>
					<ImageViewerModalInner {...props} />
				</GestureHandlerRootView>
			)}
		</Modal>
	);
}

const ImageViewerModalInner = memo(function ImageViewerModalInner(
	props: ViewingImageModalProps
) {
	const { showedImageState, images } = props;
	const [transision, setTransition] = useState<AnimationStatus>('entering');
	const [initialImage, setInitialImage] = showedImageState;

	return (
		<View flex={1}>
			{transision === 'entering' && (
				<EnteringAnimated
					smallImage={initialImage!}
					largeImage={images[initialImage!.index]}
					onComplete={() => setTransition('caroseul')}
				/>
			)}
			{transision === 'caroseul' && (
				<ImageViewerCaroseul
					images={images}
					initialIndex={initialImage!.index}
				/>
			)}
		</View>
	);
});
