import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { GestureResponderEvent, Modal, View as ViewNative } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Overlay, View } from 'tamagui';
import { MyButtonIcon } from '../custom/CustomComponents';
import { ImageViewerCaroseul } from './Carousel';

import {
	AnimationStatus,
	ViewerContext,
	ViewerWrapperContext,
} from './ViewerContext';

export interface ViewerProviderProps {
	images: EntryImageData[];
	children: ReactNode;
}

const measureElement = (target: ViewNative) => {
	return new Promise<MeasureInWindowReturn>((resolve) => {
		target.measureInWindow((x, y, width, height) => {
			resolve({ x, y, width, height });
		});
	});
};

export function ViewerProvider(props: ViewerProviderProps) {
	const { images, children } = props;

	const [thumbBounds, setThumbBounds] = useState<MeasureInWindowReturn | null>(null); //prettier-ignore
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const [transision, setTransition] = useState<AnimationStatus>('entering');
	const thumbnailRef = useRef<(ViewNative | null)[]>([]);

	const insets = useSafeAreaInsets();

	const onThumnailClicked = useCallback(
		(event: GestureResponderEvent, index: number) => {
			measureElement(event.target).then((result) => {
				setTransition('entering');
				setThumbBounds(result);
				setCurrentIndex(index);
			});
		},
		[]
	);

	const onClose = async () => {
		if (currentIndex === null) return;
		const currentThumb = thumbnailRef.current[currentIndex];

		if (!currentThumb) return;
		const currentThumbBounds = await measureElement(currentThumb);

		setThumbBounds(currentThumbBounds);
		setTransition('exiting');
	};

	return (
		<ViewerWrapperContext.Provider
			value={{ thumbnailRef, onThumnailClicked }}
		>
			{children}
			<Modal
				visible={currentIndex !== null}
				onRequestClose={onClose}
				transparent
				statusBarTranslucent
			>
				{currentIndex !== null && thumbBounds && (
					<ViewerContext.Provider
						value={{
							images,
							currentIndex,
							thumbBounds,
							transision,
							setCurrentIndex,
							setTransition,
						}}
					>
						<GestureHandlerRootView style={{ flex: 1 }}>
							<Overlay
								bg="black"
								animation="lazy"
								opacity={0.8}
								zIndex={-1}
							/>
							<View
								pos="absolute"
								right="$4"
								top={insets.top}
								zIndex={1}
							>
								<MyButtonIcon
									name="x"
									circular
									transparent={false}
									bg="$color06"
									pressStyle={{ opacity: 0.8, bg: '$color06' }}
									iconColor="white"
									onPress={() => setCurrentIndex(null)}
								/>
							</View>
							<ImageViewerCaroseul />
						</GestureHandlerRootView>
					</ViewerContext.Provider>
				)}
			</Modal>
		</ViewerWrapperContext.Provider>
	);
}
