import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, ListRenderItem } from 'react-native';
import { View } from 'tamagui';
import { TextStyled } from '../custom/CustomComponents';
import { ImageViewerCaroseulItem } from './CarouselItem';
import { useViewerContext } from './ImageViewerProvider';

 
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function ImageViewerCaroseul() {
	const enableSwipeState = useState(true);
	const {  currentIndex, images } = useViewerContext();
	const flatListRef = useRef<FlatList>(null);

	const renderItem: ListRenderItem<EntryImageData> = useCallback(
		({ item, index }) => (
			<ImageViewerCaroseulItem
				enableToPanState={enableSwipeState}
				imageData={item}
			/>
		),
		[enableSwipeState]
	);

	useEffect(() => {
		if (flatListRef.current && currentIndex !== null) {
			flatListRef.current?.scrollToIndex({
				index: currentIndex,
				animated: false,
			});
		}
	}, [currentIndex]);

	return (
		<View flex={1}>
			<View flex={1}>
				<FlatList
					ref={flatListRef}
					data={images}
					horizontal
					pagingEnabled
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderItem}
					initialScrollIndex={currentIndex}
					scrollEnabled={enableSwipeState[0]}
					showsHorizontalScrollIndicator={false}
					getItemLayout={(_, index) => ({
						length: SCREEN_WIDTH,
						offset: SCREEN_WIDTH * index,
						index,
					})}
					onViewableItemsChanged={({ viewableItems, ...p }) => {
						console.log(viewableItems) 
					}}
				/>
			</View>
			<View bg="white" opacity={0.3} pos="absolute" w="100%" bottom={0}>
				<TextStyled>
					{JSON.stringify({ initialIndex: currentIndex })}
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
				</TextStyled>
			</View>
		</View>
	);
}
