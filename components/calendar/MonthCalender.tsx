import { HStack, TextStyled } from '@/components/custom/syledComponents';
import moment from 'moment';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Spinner, View } from 'tamagui';

interface MonthCalendarProps {
	startOfmonth: Date;
	height: number;
}

export const MonthCalender = memo(
	({ startOfmonth, height }: MonthCalendarProps) => {
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
					<HStack h="36" justifyContent="center">
						<TextStyled fontSize="$5">{monthFormatted}</TextStyled>
					</HStack>

					<View
						justifyContent="flex-start"
						flexDirection="row"
						fw="wrap"
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
						<TextStyled fontSize="$6" ta="center">
							{monthFormatted}
						</TextStyled>
						<Spinner size="small" />
					</HStack>
				)}
			</View>
		);
	}
);

const WeekDays = memo(() => (
	<>
		{moment.weekdaysShort().map((day, index) => (
			<View key={index} style={style.weekCellWrapper}>
				<View flex={1} style={style.cell} w="100%">
					<TextStyled
						lineHeight="$1"
						fontSize="$3"
						color="$color9"
						ta="center"
						children={day}
					/>
				</View>
			</View>
		))}
	</>
));

const EmptyDays = memo(({ count }: { count: number }) => (
	<>
		{Array.from({ length: count }, (_, index) => (
			<View key={index} style={style.dayCell} p="1" />
		))}
	</>
));

const Days = memo(({ count }: { count: number }) => (
	<>
		{Array.from({ length: count }, (_, index) => (
			<View key={index} style={style.dayCell} p="1">
				<View flex={1} style={style.cell}>
					<TextStyled lineHeight="$1" ta="center">
						{index + 1}
					</TextStyled>
				</View>
			</View>
		))}
	</>
));

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
