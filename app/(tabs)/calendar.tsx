import { MonthCalender } from '@/components/calendar/MonthCalender';
import { Container } from '@/components/custom/syledComponents';
import { Octicons } from '@expo/vector-icons';
import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, FlatList, ListRenderItem } from 'react-native';
import { Button, getTokens } from 'tamagui';

const COUNT_MONTH = 50;

function generateInitialMonth() {
	const now = new Date();
	const begin = new Date(
		now.getFullYear(),
		now.getMonth() - COUNT_MONTH + 3,
		1
	);

	const result: Date[] = [];

	for (let i = 1; i <= COUNT_MONTH; i++) {
		const newDate = new Date(begin);
		newDate.setMonth(begin.getMonth() + i);
		result.push(newDate);
	}

	return result;
}

const initialMonthList = generateInitialMonth();

export default function Calendar() {
	const [months, setMonth] = useState(initialMonthList);

	const token = getTokens();

	const calendarHeight = useMemo(
		() =>
			(Dimensions.get('screen').width - 2 * token.space.$4.val) * (6.5 / 7) +
			36 +
			2 * token.space.$1.val,
		[]
	);

	const renderItem: ListRenderItem<Date> = useCallback(
		({ item }) => (
			<MonthCalender height={calendarHeight} startOfmonth={item} />
		),
		[]
	);

	const loadMoreDates = () => {};

	return (
		<Container pos="relative">
			<FlatList
				data={months}
				renderItem={renderItem}
				keyExtractor={(item) => item.toISOString()}
				onEndReached={loadMoreDates}
				maxToRenderPerBatch={10}
				initialNumToRender={10}
				initialScrollIndex={COUNT_MONTH - 4.5}
				onEndReachedThreshold={0.1}
				getItemLayout={(data, index) => ({
					length: calendarHeight,
					offset: calendarHeight * index,
					index,
				})}
			/>
			<Button
				pos="absolute"
				right="$4"
				bottom="$4"
				theme="blue"
				elevation="$0.25"
				size="$5"
				aspectRatio={1}
				icon={<Octicons name="calendar" size={22} />}
			/>
		</Container>
	);
}
