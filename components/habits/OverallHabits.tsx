import {
	Container,
	HStack,
	TextStyled,
	VStack,
} from '@/components/custom/syledComponents';
import { shadeColor } from '@/libs/utils';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { useMemo } from 'react';
import { ScrollView, Square, View } from 'tamagui';

export default function OverallHabits() {
	// const { habits, setHabits } = useHabitContext();
	return (
		<TextStyled>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
			incidunt, sint illum id rerum perferendis accusantium, reprehenderit
			officia sapiente dolorem soluta epellat architecto eveniet eum,
			quibusdam sed? Dicta, sunt.
			Rerum.WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWQ
		</TextStyled>
	);
	// return (
	// 	<Container>
	// 		<ScrollView px="$4">
	// 			<VStack gap="$2.5" py="$2.5">
	// 				{habits.map((habit) => (
	// 					<WeeklyHabitItem key={habit.id} habit={habit} />
	// 				))}
	// 			</VStack>
	// 		</ScrollView>
	// 	</Container>
	// );
}

function WeeklyHabitItem({ habit }: { habit: Habit }) {
	return (
		<VStack br="$3" py="$2" gap="$2" bw={1} boc="$borderColor">
			<HStack gap="$3" px="$2">
				<Square bg={habit.color as any} br="$2" size="$3">
					<Ionicons name={habit.icon as any} size={22} color="white" />
				</Square>
				<TextStyled fow={600} children={habit.name} />
			</HStack>
			<HabitHeatmap habit={habit} />
		</VStack>
	);
}

const data = {
	date: {
		start: new Date('2024-02-10'),
		end: new Date('2025-01-19'),
	},
	data: [
		true,
		true,
		true,
		false,
		true,
		false,
		false,
		false,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		false,
		true,
		false,
		true,
		false,
		true,
		false,
		false,
		true,
		true,
		true,
		true,
		false,
		false,
		false,
		false,
		true,
		true,
		false,
		true,
		true,
		true,
		true,
		false,
		false,
		true,
		true,
		true,
		false,
		true,
		false,
		true,
		false,
		false,
		false,
		false,
		false,
		true,
		false,
		true,
		true,
		true,
		false,
		false,
		false,
		false,
		false,
		true,
		false,
		false,
		true,
		true,
		false,
		false,
		false,
		true,
		true,
		false,
		true,
		false,
		true,
		false,
		false,
		true,
		true,
		false,
		false,
		true,
		true,
		false,
		false,
		true,
		true,
		false,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		true,
		false,
		true,
		false,
		true,
		true,
		false,
		false,
		false,
		false,
		true,
		true,
		false,
		false,
		false,
		false,
		true,
		false,
		true,
		true,
		false,
		false,
		true,
		true,
		false,
		true,
		false,
		false,
		false,
		false,
		true,
		true,
		false,
		true,
		true,
		false,
		false,
		true,
		true,
		true,
		false,
		false,
		true,
		true,
		true,
		true,
		true,
		false,
		false,
		true,
		false,
		false,
		false,
		true,
		true,
		false,
		false,
		false,
		false,
		true,
		true,
		true,
		false,
		false,
		false,
		true,
		true,
		false,
		false,
		true,
		true,
		true,
		true,
		true,
		false,
		true,
		true,
		true,
		true,
		false,
		true,
		true,
		false,
		false,
		true,
		true,
		true,
		false,
		false,
		true,
		true,
		false,
		false,
		false,
		false,
		false,
		true,
		true,
		true,
		false,
		false,
		true,
		false,
		true,
		true,
		true,
		true,
		true,
		true,
		false,
		true,
		true,
		false,
		false,
		false,
		false,
		true,
		true,
		false,
		true,
		false,
		true,
		true,
		false,
		true,
		false,
		true,
		false,
		true,
		false,
		false,
		false,
		false,
		true,
		false,
		true,
		false,
		false,
		true,
		true,
		false,
		false,
		true,
		false,
		true,
		false,
		false,
		true,
		false,
		false,
		false,
		false,
		true,
		false,
		true,
		true,
		false,
		true,
		true,
		true,
		false,
		false,
		true,
		true,
		true,
		true,
		false,
		true,
		false,
		true,
		true,
		true,
		true,
		true,
		true,
		false,
		true,
		false,
		false,
		true,
		false,
		true,
		false,
		false,
		true,
		true,
		false,
		false,
		true,
		true,
		true,
		true,
		false,
		true,
		false,
		true,
		true,
		true,
		false,
		true,
		false,
		false,
		true,
		false,
		false,
		true,
		false,
		true,
		true,
		false,
		false,
		false,
		false,
		true,
		false,
		false,
		true,
		false,
		true,
		true,
		true,
		false,
		false,
		false,
		false,
		true,
		false,
		false,
		false,
		false,
		false,
		true,
		true,
		true,
		true,
		false,
		true,
		true,
		true,
		false,
		true,
		true,
		true,
		false,
		false,
		true,
		true,
		false,
		true,
		true,
		false,
		false,
		false,
		false,
		true,
		true,
		true,
		true,
		false,
		false,
		false,
		true,
	],
};

export function HabitHeatmap({ habit }: { habit: Habit }) {
	const offsetDay = moment(data.date.start).day();
	const dd = [...Array(offsetDay).fill(null), ...data.data];

	const gg = useMemo(
		() =>
			generateMonthSpans(
				moment(data.date.start).startOf('week').toDate(),
				data.date.end
			),
		[]
	);

	return (
		<TextStyled>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
			incidunt, sint illum id rerum perferendis accusantium, reprehenderit
			officia sapiente dolorem soluta epellat architecto eveniet eum,
			quibusdam sed? Dicta, sunt.
			Rerum.WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWQ
		</TextStyled>
	);
	return (
		<View>
			<ScrollView horizontal contentOffset={{ x: 100000, y: 0 }}>
				<View fd="column" fw="wrap" h={20 * 7} px="$2">
					{dd.map((status, index) => (
						<Square size={20} key={index} p={1}>
							<Square
								br="$1"
								w="100%"
								h="100%"
								bg={
									(status
										? habit.color
										: shadeColor(habit.color, 200)) as any
								}
							/>
						</Square>
					))}
				</View>
			</ScrollView>
		</View>
	);
}

const generateMonthSpans = (
	startDate: string | Date,
	endDate: string | Date
) => {
	let start = moment(startDate);
	const end = moment(endDate);
	const monthSpans = [];

	while (start.isBefore(end)) {
		const currentMonth = start
			.clone()
			.add(1, 'month')
			.startOf('month')
			.endOf('week');

		const span = currentMonth.diff(start, 'week');

		if (span) {
			monthSpans.push({
				span: currentMonth.diff(start, 'week'),
				name: start.format('MMM'),
			});
		}

		start = currentMonth;
	}

	return monthSpans;
};
