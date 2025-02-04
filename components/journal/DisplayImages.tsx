import React from 'react';
import { FlatList } from 'react-native';

import { getImageDimention, ImageDataWithDimention } from '@/libs/utils';
import { Fragment, useCallback, useState } from 'react';
import {
	GestureResponderEvent,
	ListRenderItem,
	TouchableOpacity,
} from 'react-native';

import { getVariableValue, Image, useTheme, View, ViewProps } from 'tamagui';
import { ImageViewerModal } from '../ImageViewer/ImageViewerModal';
import { InitialImageViewing } from '../ImageViewer/type';

export interface DisplayImagesProps extends ViewProps {
	images: EntryImageData[];
	leftOffset: number;
}

export default function DisplayImages(props: DisplayImagesProps) {
	const { images, leftOffset, ...viewProps } = props;

	const imageViewerState = useState<InitialImageViewing | null>(null);
	const imagesWithDimention = getImageDimention(images, leftOffset);

	const theme = useTheme();

	const onImagePressed = useCallback(
		({ target }: GestureResponderEvent, uri: string, index: number) => {
			target.measureInWindow((x, y, width, height) =>
				imageViewerState[1]({ x, y, width, height, index, uri })
			);
		},
		[imageViewerState]
	);

	const renderItem: ListRenderItem<ImageDataWithDimention> = useCallback(
		({ item, index }) => (
			<TouchableOpacity
				onPress={(e) => onImagePressed(e, item.uri, index)}
				activeOpacity={0.9}
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
			</TouchableOpacity>
		),
		[onImagePressed, theme.borderColor.val]
	);

	return (
		<Fragment>
			<View {...viewProps}>
				<FlatList
					data={imagesWithDimention}
					renderItem={renderItem}
					horizontal
					showsHorizontalScrollIndicator={false}
					overScrollMode="never"
					keyExtractor={(item) => item.id.toString()}
					ListFooterComponent={<View pr="$4" />}
					ListHeaderComponent={<View pl={leftOffset} pr="$4" />}
					ItemSeparatorComponent={() => <View pr="$2" />}
				/>
			</View>

			<ImageViewerModal
				images={images}
				showedImageState={imageViewerState}
			/>
		</Fragment>
	);
}
