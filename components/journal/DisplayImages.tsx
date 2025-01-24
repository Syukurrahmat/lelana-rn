import { Image, ScrollView, Stack, View, XStack } from 'tamagui';
interface DisplayImagesProps {
	images: EntryImageData[];
	leftOffset?: number;
}

export default function DisplayImages({
	images,
	leftOffset,
}: DisplayImagesProps) {
	return (
		<ScrollView horizontal mt="$2" showsHorizontalScrollIndicator={false}>
			{!!leftOffset && <Stack w={leftOffset} />}
			<XStack px="$4" gap="$2">
				{getImageDimention(images).map((e, i) => (
					<View
						key={i}
						borderWidth={1}
						borderColor="$gray5"
						overflow="hidden"
						borderRadius="$4"
					>
						<Image
							key={i}
							width={e.width}
							height={e.height}
							src={e.src}
						/>
					</View>
				))}
			</XStack>
		</ScrollView>
	);
}

function getImageDimention(imagesData: EntryImageData[]) {
	if (imagesData.length == 0) return [];

	const [minW, maxW] = [200, 250];
	const isSingle = imagesData.length == 1;

	const isAllPortrait = imagesData.every(
		({ width, height }) => height > width
	);
	const isAllLanscape = imagesData.every(
		({ width, height }) => height <= width
	);

	const height =
		(isAllPortrait ? 250 : isAllLanscape ? 200 : 225) + (isSingle ? 100 : 0);

	return imagesData.map((e) => {
		const aspectRatio = e.height / e.width;
		const width = aspectRatio * height;

		return {
			height: height,
			width: width <= minW ? minW : width >= maxW ? maxW : width,
			src: e.uri,
		};
	});
}
