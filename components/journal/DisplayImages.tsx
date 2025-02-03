import { getImageDimention } from '@/libs/utils';
import { Image, ScrollView, ScrollViewProps, View, XStack } from 'tamagui';

interface DisplayImagesProps extends ScrollViewProps {
	images: EntryImageData[];
	leftOffset: number;
}

export default function DisplayImages(props: DisplayImagesProps) {
	const { images, leftOffset, ...scrollViewProps } = props;
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			{...scrollViewProps}
		>
			{!!leftOffset && <View width={leftOffset} />}
			<XStack px="$4" gap="$2">
				{getImageDimention(images, leftOffset).map((e, i) => (
					<View
						key={i}
						borderWidth={1}
						borderColor="$borderColor"
						overflow="hidden"
						borderRadius="$4"
					>
						<Image
							key={i}
							alt="image"
							width={e.width}
							height={e.height}
							source={e}
						/>
					</View>
				))}
			</XStack>
		</ScrollView>
	);
}
