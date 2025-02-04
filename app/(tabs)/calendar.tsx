import { MonthCalender } from '@/components/calendar/MonthCalender';
import { Container, MyButtonIcon } from '@/components/custom/CustomComponents';
import { CALENDAR_DIMENTION, TABBAR_HEIGHT } from '@/constant/constant';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { router } from 'expo-router';
import moment from 'moment';
import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getVariableValue, Spinner, View } from 'tamagui';

export const COUNT_MONTH = 50;

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
	const dimention = useWindowDimensions();
	const inset = useSafeAreaInsets();

	const calendarHeight = useMemo(() => {
		const { py, px, gap, headerHeight } = CALENDAR_DIMENTION;
		const calendarAspectRatio = 6.5 / 7;

		const width = dimention.width - 2 * getVariableValue(px, 'space');
		const calendarHeight = width * calendarAspectRatio;
		return (
			calendarHeight +
			2 * getVariableValue(py, 'space') +
			getVariableValue(gap, 'space') +
			headerHeight
		);
	}, [dimention.width]);

	const renderItem: ListRenderItem<Date> = useCallback(
		({ item }) => (
			<MonthCalender height={calendarHeight} startOfmonth={item} />
		),
		[calendarHeight]
	);

	const onStartReached = () => {
		console.log('sjsjsjs')
		setMonth((prev) => {
			const first = moment(prev[0]);
			return [
				...Array.from({ length: COUNT_MONTH / 2 }, (_, i) =>
					first
						.clone()
						.subtract(i + 1, 'M')
						.toDate()
				).reverse(),
				...prev,
			].slice(0, 2 * COUNT_MONTH);
		});
	};
	const onEndReached = () => {
		setMonth((prev) => {
			const last = moment(prev[prev.length - 1]);
			return [
				...prev,
				...Array.from({ length: COUNT_MONTH / 2 }, (_, i) =>
					last
						.clone()
						.add(i + 1, 'M')
						.toDate()
				),
			].slice(-2 * COUNT_MONTH);
		});
	};

	return (
		<Container pos="relative">
			<View
				height={dimention.height - TABBAR_HEIGHT - 10}
				width={dimention.width}
			>
				<FlashList
					data={months}
					renderItem={renderItem}
				/>
			</View>

			<MyButtonIcon
				pos="absolute"
				right="$4"
				bottom="$4"
				transparent={false}
				theme="blue"
				size="$5"
				borderWidth={1}
				borderColor="$blue8"
				shadowColor="$accent10"
				elevation="$0.5"
				background="initial"
				name="calendar"
				onPress={() => router.push('/create')}
			/>
		</Container>
	);
}
