import { Card, Heading, HStack, View } from '@gluestack-ui/themed';
import moment from 'moment';
import {
	HeadingStyled,
	MyButtonIcon,
	TextStyled,
} from '../custom/CustomComponents';

interface DailyJournalTitleProps {
	date: string;
	isReversed: boolean;
	entryLength: number;
	summary: JournalItem['summary'];
	onReverse: () => void;
}

export function DailyJournalTitle({
	date,
	summary,
	onReverse,
	isReversed,
	entryLength,
}: DailyJournalTitleProps) {
	return (
		<View px="$4">
			<HStack py="$3" alignItems="center" justifyContent="space-between">
				<HeadingStyled size="md" fontFamily="Inter" fontWeight={600}>
					{moment(date).format('DD MMM YYYY')}
				</HeadingStyled>

				{entryLength > 1 && (
					<MyButtonIcon
						borderRadius="$full"
						onPress={onReverse}
						name={isReversed ? 'arrow-up' : 'arrow-down'}
					/>
				)}
			</HStack>
			<Card
				p="$3"
				bg="$primary0"
				borderColor="$primary200"
				variant="outline"
				elevation="$0"
			>
				<Heading size="md" color="$blue11" fontWeight="600">
					Tentang Hari ini
				</Heading>
				<TextStyled>{summary}</TextStyled>
			</Card>
		</View>
	);
}
