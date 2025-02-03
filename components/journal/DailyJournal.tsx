import moment from 'moment';
import { Card, H4, H5, View, XStack } from 'tamagui';
import { MyButtonIcon, TextStyled } from '../custom/CustomComponents';

interface DailyJournalTitleProps {
	date: string;
	isReversed: boolean;
	entryLength: number;
	summary: JournalItem['summary'];
	onReverse: () => void;
}

export function DailyJournalTitle(props: DailyJournalTitleProps) {
	const { date, summary, onReverse, isReversed, entryLength } = props;
	return (
		<View px="$4">
			<XStack py="$2" alignItems="center" justifyContent="space-between">
				<H4>{moment(date).format('DD MMM YYYY')}</H4>

				{entryLength > 1 && (
					<MyButtonIcon
						circular
						onPress={onReverse}
						name={isReversed ? 'arrow-up' : 'arrow-down'}
					/>
				)}
			</XStack>
			<Card theme="blue" p="$3" gap="$2" bw={1} borderColor="$blue8">
				<H5 color="$blue10" fontWeight="600">
					Tentang Hari ini
				</H5>
				<TextStyled>{summary}</TextStyled>
			</Card>
		</View>
	);
}
