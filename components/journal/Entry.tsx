import {
	Box,
	Center,
	HStack,
	useToken as getToken,
	View,
} from '@gluestack-ui/themed';
import moment from 'moment';
import Tags from '../Badge';
import {
	HeadingStyled,
	MyButtonIcon,
	TextStyled,
} from '../custom/CustomComponents';
import DisplayImages from './DisplayImages';

interface EntryProps {
	entry: EntryItem;
	isLast?: boolean;
}

const bulletOption = {
	size: 16,
	marginTop: 9,
};

export function Entry({ entry, isLast }: EntryProps) {
	const { content, location, tags, images } = entry;

	const displayImageOffset = getToken('space', '2') + bulletOption.size;

	const VertivalLine = !isLast && (
		<View
			position="absolute"
			left="$4"
			w={bulletOption.size}
			top={bulletOption.size + bulletOption.marginTop}
			h="100%"
		>
			<View w={3} bg="$primary50" h="100%" mx="auto" />
		</View>
	);

	return (
		<Box position="relative" mt="$4">
			{VertivalLine}
			<HStack px="$4" gap="$2">
				<Center
					borderRadius={1000}
					w={bulletOption.size}
					h={bulletOption.size}
					mt={bulletOption.marginTop}
					borderColor="$primary500"
					borderWidth={3}
				/>
				<View flex={1}>
					<HStack alignItems="center" justifyContent="space-between">
						<HeadingStyled size="md" color="$primary500" fontWeight="bold">
							{moment(entry.datetime).format('HH:mm')}
						</HeadingStyled>
						<MyButtonIcon
							name="more-horizontal"
							size="xs"
							borderRadius="$full"
						/>
					</HStack>
					<View gap="$2" mt="$0.5">
						{!!location && (
							<TextStyled
								fontWeight="400"
								fontSize="$sm"
								numberOfLines={1}
								color="$trueGray500"
								children={location.address}
							/>
						)}
						{!!content && <TextStyled>{content}</TextStyled>}
					</View>
				</View>
			</HStack>
			{!!images.length && (
				<DisplayImages
					images={images.map(({ imageUrl, ...e }) => ({
						...e,
						uri: imageUrl,
					}))}
					leftOffset={displayImageOffset}
				/>
			)}
			{!!tags.length && (
				<View mt="$3.5" pl={displayImageOffset}>
					<HStack gap="$2" px="$4" flexWrap="wrap">
						{tags.map((e) => (
							<Tags key={e.id} children={e.name} />
						))}
					</HStack>
				</View>
			)}
			<View h="$1" />
		</Box>
	);
}
