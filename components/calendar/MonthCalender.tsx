import { TextStyled } from '@/components/custom/CustomComponents';
import { Spinner } from '@gluestack-ui/themed';
import { HStack, View } from '@gluestack-ui/themed';
import moment from 'moment';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

interface MonthCalendarProps {
	startOfmonth: Date;
	height: number;
}

export const MonthCalender = memo(function MonthCalender({
	startOfmonth,
	height,
}: MonthCalendarProps) {
	const firstDay = startOfmonth.getDay();
	const daysInMonth = new Date(
		startOfmonth.getFullYear(),
		startOfmonth.getMonth() + 1,
		0
	).getDate();

	const monthFormatted = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric',
	}).format(startOfmonth);

	const [loaded, setLoaded] = useState(false);

	const calendar = useMemo(
		() => (
			<View gap="$2" px="$4" py="$2">
				<HStack h={36} justifyContent="center">
					<TextStyled fontSize="$lg">{monthFormatted}</TextStyled>
				</HStack>

				<View
					justifyContent="flex-start"
					flexDirection="row"
					flexWrap="wrap"
					flex={1}
				>
					<WeekDays />
					<EmptyDays count={firstDay} />
					<Days count={daysInMonth} />
				</View>
			</View>
		),
		[]
	);

	useEffect(() => {
		setLoaded(true);
		return () => setLoaded(false);
	}, []);

	return (
		<View h={height} justifyContent="center" alignItems="center">
			{loaded ? (
				calendar
			) : (
				<HStack gap="$2.5">
					<TextStyled fontSize="$lg" textAlign="center">
						{monthFormatted}
					</TextStyled>
					<Spinner size="small" />
				</HStack>
			)}
		</View>
	);
});

const WeekDays = memo(function WeekDays() {
	return (
		<>
			{moment.weekdaysShort().map((day, index) => (
				<View key={index} style={style.weekCellWrapper}>
					<View flex={1} style={style.cell} w="100%">
						<TextStyled
							lineHeight="$md"
							fontSize="$sm"
							color="$color9"
							textAlign="center"
							children={day}
						/>
					</View>
				</View>
			))}
		</>
	);
});

const EmptyDays = memo(function EmptyDays({ count }: { count: number }) {
	return (
		<>
			{Array.from({ length: count }, (_, index) => (
				<View key={index} style={style.dayCell} p={1} />
			))}
		</>
	);
});

const Days = memo(function Days({ count }: { count: number }) {
	return (
		<>
			{Array.from({ length: count }, (_, index) => (
				<View key={index} style={style.dayCell} p={1}>
					<View flex={1} style={style.cell}>
						<TextStyled lineHeight="$md" textAlign="center">
							{index + 1}
						</TextStyled>
					</View>
				</View>
			))}
		</>
	);
});

const style = StyleSheet.create({
	weekCellWrapper: {
		flexBasis: '14.28%',
		aspectRatio: 2,
	},
	dayCell: {
		flexBasis: '14.28%',
		aspectRatio: 1,
	},
	cell: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
