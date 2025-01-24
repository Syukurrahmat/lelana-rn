import { ArrowUpWideNarrow } from '@tamagui/lucide-icons';
import moment from 'moment';
import { FlatList, TouchableOpacity } from 'react-native';
import { Card, H4, H5, Paragraph, XStack } from 'tamagui';
import { VStack } from '../custom/syledComponents';
import { Entry } from './Entry';

export default function DailyJournal({ journal }: { journal: JournalItem }) {
	return (
		<VStack borderBlockStartWidth={1} borderColor="$borderColor">
			<VStack px="$4" gap="$2">
				<XStack py="$3" alignItems="center" justifyContent="space-between">
					<H4>{moment(journal.date).format('DD MMM YYYY')}</H4>
					<TouchableOpacity
						activeOpacity={0.8}
						children={<ArrowUpWideNarrow color="$color8" size={20} />}
					/>
				</XStack>
				<Card p="$3" bg="$blue4Light">
					<H5 color="$blue11" fontWeight="600">
						Tentang Hari ini
					</H5>
					<Paragraph>{journal.summary}</Paragraph>
				</Card>
			</VStack>
			<FlatList
				data={journal.entries}
				keyExtractor={(e) => e.id.toString()}
				renderItem={({ item, index }) => (
					<Entry
						entry={item}
						isLast={index == journal.entries.length - 1}
					/>
				)}
			/>
		</VStack>
	);
}
