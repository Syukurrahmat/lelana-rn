import { ArrowUpWideNarrow } from '@tamagui/lucide-icons';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import { Card, H4, H5, Paragraph, XStack } from 'tamagui';
import { VStack } from '../custom/syledComponents';

interface DailyJournalTitleProps {
	date: string;
	summary: JournalItem['summary'];
}

export function DailyJournalTitle({ date, summary }: DailyJournalTitleProps) {
	return (
		<VStack px="$4" gap="$2">
			<XStack py="$3" alignItems="center" justifyContent="space-between">
				<H4>{moment(date).format('DD MMM YYYY')}</H4>
				<TouchableOpacity
					activeOpacity={0.8}
					children={<ArrowUpWideNarrow color="$color8" size={20} />}
				/>
			</XStack>
			<Card p="$3" bg="$blue4Light">
				<H5 color="$blue11" fontWeight="600">
					Tentang Hari ini
				</H5>
				<Paragraph>{summary}</Paragraph>
			</Card>
		</VStack>
	);
}
