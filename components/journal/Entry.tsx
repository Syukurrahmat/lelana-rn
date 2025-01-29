import moment from 'moment';
import {
	Circle,
	getTokens,
	H4,
	Paragraph,
	SizableText,
	Stack,
	View,
	XStack,
} from 'tamagui';
import Badge from '../Badge';
import { IconButton } from '../Icon';
import { HStack } from '../custom/syledComponents';
import DisplayImages from './DisplayImages';

interface Entry {
	entry: EntryItem;
	isLast?: boolean;
}

export function Entry({ entry, isLast }: Entry) {
	const token = getTokens();

	const { content, location, tags, images } = entry;

	const VertivalLine = !isLast && (
		<View pos="absolute" left="$4" w={18} top={10 + 18} h="100%">
			<View w={3} bg="$blue5Light" h="100%" mx="auto" />
		</View>
	);

	return (
		<Stack pos="relative" mt="$4">
			{VertivalLine}
			<XStack px="$4" gap="$2">
				<Circle
					size={18}
					bg="$backgroundStrong"
					mt={8}
					borderColor="$blue10"
					borderWidth={3}
				/>
				<View flex={1} gap="$1">
					<HStack justifyContent="space-between">
						<H4 color="$blue10" fontWeight="bold">
							{moment(entry.datetime).format('HH:mm')}
						</H4>
						<IconButton name="more-horizontal" />
					</HStack>
					{!!location && (
						<SizableText
							fontWeight="400"
							fontSize="$4"
							numberOfLines={1}
							color="$color9"
						>
							{location.address}
						</SizableText>
					)}
					{!!content && <Paragraph fontSize="$5">{content}</Paragraph>}
				</View>
			</XStack>
			{!!images.length && (
				<DisplayImages
					images={images.map((e) => ({ ...e, uri: e.imageUrl }))}
				/>
			)}
			{!!tags.length && (
				<XStack
					mt="$2"
					gap="$2"
					pr="$4"
					flexWrap="wrap"
					pl={token.space.$2.val + token.space.$4.val + 18}
				>
					{tags.map((e) => (
						<Badge key={e.id} children={e.name} />
					))}
				</XStack>
			)}
			<View h="$1" />
		</Stack>
	);
}
