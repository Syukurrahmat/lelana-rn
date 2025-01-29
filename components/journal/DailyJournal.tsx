import moment from 'moment';
import { Card, H4, H5, Paragraph, View, XStack } from 'tamagui'; //prettier-ignore
import { IconButton } from '../Icon';
import { useState } from 'react';

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
		<View px="$4" gap="$2">
			<XStack py="$3" ai="center" jc="space-between">
				<H4>{moment(date).format('DD MMM YYYY')}</H4>
				
				{entryLength > 1 && (
					<IconButton
						onPress={onReverse}
						name={isReversed ? 'arrow-up' : 'arrow-down'}
					/>
				)}
			</XStack>
			<Card p="$3" bg="$blue4">
				<H5 color="$blue11" fontWeight="600">
					Tentang Hari ini
				</H5>
				<Paragraph>{summary}</Paragraph>
			</Card>
		</View>
	);
}
