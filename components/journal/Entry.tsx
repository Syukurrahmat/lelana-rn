import { Ellipsis } from '@tamagui/lucide-icons';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
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
		<Stack pos="relative">
			{VertivalLine}
			<XStack px="$4" gap="$2">
				<Circle
					size={18}
					bg="$backgroundStrong"
					mt={10}
					borderColor="$blue10"
					borderWidth={3}
				/>
				<Stack flex={1} gap="$1">
					<XStack justifyContent="space-between">
						<H4 color="$blue10" fontWeight="bold">
							{moment(entry.datetime).format('HH:mm')}
						</H4>
						<TouchableOpacity
							style={{
								height: 24,
								width: 24,
								justifyContent: 'center',
								alignItems: 'center',
							}}
							activeOpacity={0.7}
							children={<Ellipsis color="$color8" size={20} />}
						/>
					</XStack>
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
				</Stack>
			</XStack>
			{!!images.length && (
				<DisplayImages
					leftOffset={token.space.$2.val + 18}
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
