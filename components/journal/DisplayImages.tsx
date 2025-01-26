import { getImageDimention } from '@/libs/utils';
import { getTokens, Image, ScrollView, Stack, View, XStack } from 'tamagui';
interface DisplayImagesProps {
	images: EntryImageData[];
}

export default function DisplayImages({ images }: DisplayImagesProps) {
	const token = getTokens();

	return (
		<ScrollView horizontal mt="$2" showsHorizontalScrollIndicator={false}>
			<Stack w={token.space.$2.val + 18} />
			<XStack px="$4" gap="$2">
				{getImageDimention(images, ['$4', '$2', 18, '$4']).map((e, i) => (
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
							src={e.uri}
						/>
					</View>
				))}
			</XStack>
		</ScrollView>
	);
}
