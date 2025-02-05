import React, {
	createContext,
	memo,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
} from 'react';
import { GestureResponderEvent, Modal, View as ViewNative } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Overlay, View } from 'tamagui';
import { MyButtonIcon } from '../custom/CustomComponents';
import { ImageViewerCaroseul } from './Carousel';
import { EnteringAnimated } from './EnteringAnimated';
import { AnimationStatus, InitialViewingMeasure } from './type';

type ViewerWrapperContextType = {
	thumbnailRef: React.MutableRefObject<(ViewNative | null)[]>;
	onThumnailClicked: (event: GestureResponderEvent, index: number) => void;
};

type ViewerContextType = ViewerWrapperContextType & {
	images: EntryImageData[];
	enterExitThumbData: InitialViewingMeasure;
	currentIndex: number;
	setCurrentIndex: React.Dispatch<React.SetStateAction<number | null>>;
	setEnterExitThumbData: React.Dispatch<
		React.SetStateAction<InitialViewingMeasure | null>
	>;
};

const ViewerContext = createContext<ViewerContextType>(null as any);
const ViewerWrapperContext = createContext<ViewerWrapperContextType>(
	null as any
);

export const useViewerContext = () => useContext(ViewerContext);
export const useViewerWrapperContext = () => useContext(ViewerWrapperContext);

export interface ViewerProviderProps {
	images: EntryImageData[];
	children: ReactNode;
}

export function ViewerProvider(props: ViewerProviderProps) {
	const { images, children } = props;

	const [currentIndex, setCurrentIndex] = useState<number | null>(null); //prettier-ignore
	const [enterExitThumbData, setEnterExitThumbData] = useState<InitialViewingMeasure | null>(null); //prettier-ignore

	const thumbnailRef = useRef<(ViewNative | null)[]>([]);
	const insets = useSafeAreaInsets();

	const childrenMemoed = useMemo(() => children, [children]);

	const onThumnailClicked = useCallback(
		(event: GestureResponderEvent, index: number) => {
			event.target.measureInWindow((x, y, width, height) => {
				setEnterExitThumbData({ x, y, width, height, index });
				setCurrentIndex(index);
			});
		},
		[]
	);

	// const onImagePressed = useCallback(
	// 	({ target }: GestureResponderEvent, uri: string, index: number) => {
	// 		target.measureInWindow((x, y, width, height) =>
	// 			imageViewerState[1]({ x, y, width, height, index, uri })
	// 		);
	// 	},
	// 	[imageViewerState]
	// );

	const onClose = () => {
		setCurrentIndex(null);
	};

	return (
		<ViewerWrapperContext.Provider
			value={{ thumbnailRef, onThumnailClicked }}
		>
			{childrenMemoed}
			<Modal
				visible={currentIndex !== null}
				onRequestClose={onClose}
				transparent
				statusBarTranslucent
			>
				{currentIndex !== null && enterExitThumbData && (
					<ViewerContext.Provider
						value={{
							thumbnailRef,
							images,
							currentIndex,
							enterExitThumbData,
							setCurrentIndex,
							onThumnailClicked,
							setEnterExitThumbData,
						}}
					>
						<GestureHandlerRootView style={{ flex: 1 }}>
							<Overlay
								bg="black"
								animation="lazy"
								opacity={0.95}
								zIndex={-1}
							/>
							<View
								pos="absolute"
								right="$4"
								top={insets.top}
								zIndex={10}
							>
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
					</ViewerContext.Provider>
				)}
			</Modal>
		</ViewerWrapperContext.Provider>
	);
}

const ImageViewerModalInner = memo(function ImageViewerModalInner() {
	const [transision, setTransition] = useState<AnimationStatus>('entering');

	return (
		<View flex={1}>
			{transision === 'entering' && (
				<EnteringAnimated onComplete={() => setTransition('caroseul')} />
			)}
			{transision === 'caroseul' && <ImageViewerCaroseul />}
		</View>
	);
});
