import moment from 'moment';
import {
	Circle,
	GetThemeValueForKey,
	getToken,
	H5,
	styled,
	View,
	XStack,
} from 'tamagui';
import Tags from '../Badge';
import { MyButtonIcon, TextStyled } from '../custom/CustomComponents';
import DisplayImages from './DisplayImages';

interface EntryProps {
	entry: EntryItem;
	isLast?: boolean;
}

const bulletOption = {
	size: 18,
	marginTop: 12,
	spacing: '$2.5' as GetThemeValueForKey<'gap'>,
};

const VerticalLine = styled(View, {
	position: 'absolute',
	left: '$4',
	width: bulletOption.size,
	top: bulletOption.size + bulletOption.marginTop,
	height: '100%',
	children: <View width={4} bg="$blue4" height="100%" mx="auto" />,
});

const Bullet = styled(Circle, {
	size: bulletOption.size,
	mt: bulletOption.marginTop,
	borderColor: '$blue10',
	borderWidth: 3,
});

export function Entry({ entry, isLast }: EntryProps) {
	const { content, location, tags, images } = entry;

	const displayImageOffset = getToken('$2', 'space') + bulletOption.size;

	return (
		<View position="relative" mt="$4">
			{!isLast && <VerticalLine />}
			<XStack px="$4" gap={bulletOption.spacing}>
				<Bullet />
				<View flex={1}>
					<XStack alignItems="center" justifyContent="space-between">
						<H5 color="$blue10" fontWeight="bold">
							{moment(entry.datetime).format('HH:mm')}
						</H5>
						<MyButtonIcon size="$3" name="more-horizontal" circular />
					</XStack>
					<View gap="$2.5" mt="$0.5">
						{!!location && (
							<TextStyled
								fontWeight="400"
								numberOfLines={1}
								color="$color10"
								children={location.address}
							/>
						)}
						{!!content && (
							<TextStyled lineHeight="$4">{content}</TextStyled>
						)}
					</View>
				</View>
			</XStack>
			{!!images.length && (
				<DisplayImages
					mt="$2.5"
					images={images.map(({ imageUrl, ...e }) => ({
						...e,
						uri: imageUrl,
					}))}
					leftOffset={displayImageOffset}
				/>
			)}
			{!!tags.length && (
				<View mt="$2.5" pl={displayImageOffset}>
					<XStack gap="$2" px="$4" flexWrap="wrap">
						{tags.map((e) => (
							<Tags key={e.id} children={e.name} />
						))}
					</XStack>
				</View>
			)}
			<View height="$0.5" />
		</View>
	);
}
