import { getImageDimention } from '@/libs/utils';
import { Box, HStack, Image, ScrollView, View } from '@gluestack-ui/themed';
interface DisplayImagesProps {
	images: EntryImageData[];
	leftOffset: number;
}

export default function DisplayImages({
	images,
	leftOffset = 0,
}: DisplayImagesProps) {
	return (
		<ScrollView horizontal mt="$3.5" showsHorizontalScrollIndicator={false}>
			{!!leftOffset && <Box w={leftOffset} />}
			<HStack px="$4" gap="$2">
				{getImageDimention(images, leftOffset).map((e, i) => (
					<View
						key={i}
						borderWidth={1}
						borderColor="$borderLight200"
						overflow="hidden"
						borderRadius="$md"
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
			</HStack>
		</ScrollView>
	);
}
