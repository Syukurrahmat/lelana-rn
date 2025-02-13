import { getImageDimention, ImageDataWithDimention } from '@/libs/utils';
import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { getVariableValue, Image, useTheme, View, ViewProps } from 'tamagui';
import { ThumbnailItemWrapper } from '../ImageViewer/ThumbnailItemWrapper';
import { ViewerProvider } from '../ImageViewer/ImageViewerProvider';

export interface DisplayImagesProps extends ViewProps {
	images: EntryImageData[];
	leftOffset: number;
}

export default function DisplayImages(props: DisplayImagesProps) {
	const { images, leftOffset, ...viewProps } = props;

	const imagesWithDimention = getImageDimention(images, leftOffset);

	return (
		<ViewerProvider images={images}>
			<View {...viewProps}>
				<FlatList
					data={imagesWithDimention}
					renderItem={(p) => <RenderImageItem {...p} />}
					horizontal
					showsHorizontalScrollIndicator={false}
					overScrollMode="never"
					keyExtractor={(item) => item.id.toString()}
					ListFooterComponent={<View pr="$4" />}
					ListHeaderComponent={<View pl={leftOffset} pr="$4" />}
					ItemSeparatorComponent={() => <View pr="$2" />}
				/>
			</View>
		</ViewerProvider>
	);
}

function RenderImageItem(props: ListRenderItemInfo<ImageDataWithDimention>) {
	const { item, index } = props;
	const theme = useTheme();

	return (
		<ThumbnailItemWrapper
			imageIndex={index}
			style={{
				borderWidth: 1,
				borderColor: theme.borderColor.val,
				overflow: 'hidden',
				borderRadius: getVariableValue('$4', 'radius'),
			}}
		>
			<Image
				alt="image"
				width={item.width}
				height={item.height}
				source={item}
			/>
		</ThumbnailItemWrapper>
	);
}
