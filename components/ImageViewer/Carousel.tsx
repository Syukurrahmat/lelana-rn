import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, ListRenderItem, ViewToken } from 'react-native';
import { View } from 'tamagui';
import { ImageViewerCaroseulItem } from './CarouselItem';
import { useViewerContext } from './ViewerContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ImageViewerCaroseul = memo(function ImageViewerCaroseul() {
	const { currentIndex, images, setCurrentIndex } = useViewerContext(); //prettier-ignore
	const [isScroling, setIsScroling] = useState(false);
	const flatListRef = useRef<FlatList>(null);

	const renderItem: ListRenderItem<EntryImageData> = useCallback(
		({ item, index }) => (
			<ImageViewerCaroseulItem
				index={index}
				isScroling={isScroling}
				imageData={item}
			/>
		),
		[isScroling]
	);

	const onViewableItemsChanged = useCallback(
		({ viewableItems }: { viewableItems: ViewToken<EntryImageData>[] }) => {
			if (typeof viewableItems[0].index === 'number') {
				setCurrentIndex(viewableItems[0].index);
			}
		},
		[setCurrentIndex]
	);

	const getItemLayout = useCallback(
		(_: any, index: number) => ({
			length: SCREEN_WIDTH,
			offset: SCREEN_WIDTH * index,
			index,
		}),
		[]
	);
	useEffect(() => {
		if (currentIndex !== null) {
			flatListRef.current?.scrollToIndex({
				index: currentIndex,
				animated: false,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<View flex={1}>
			<FlatList
				ref={flatListRef}
				data={images}
				horizontal
				pagingEnabled
				initialScrollIndex={currentIndex}
				showsHorizontalScrollIndicator={false}
				onScrollBeginDrag={() => setIsScroling(true)}
				onScrollEndDrag={() => setIsScroling(false)}
				getItemLayout={getItemLayout}
				onViewableItemsChanged={onViewableItemsChanged}
				renderItem={renderItem}
			/>
		</View>
	);
});
