import { useHabitContext } from '@/components/habits/HabitPageContext';
import {
	Container,
	HStack,
	TextStyled,
	VStack,
} from '@/components/custom/syledComponents';
import { shadeColor } from '@/libs/utils';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { ScrollView, Square, View } from 'tamagui';
import { MyTouchableOpacity } from '../custom/CustomComponents';

export default function WeekHabits() {
	const { habits, setHabits } = useHabitContext();

	const onItemPress = (habitId: number, dayIndex: number) => {
		setHabits((prevHabits) =>
			prevHabits.map((habit) =>
				habit.id === habitId
					? {
							...habit,
							isDone: habit.isDone.map((done, i) =>
								i === dayIndex ? !done : done
							),
					  }
					: habit
			)
		);
	};
	
	return (
		<Container>
			<ScrollView px="$4">
				<VStack gap="$2.5" py="$2.5">
					{habits.map((habit) => (
						<WeeklyHabitItem
							key={habit.id}
							habit={habit}
							onItemPress={(dayIndex) => onItemPress(habit.id, dayIndex)}
						/>
					))}
				</VStack>
			</ScrollView>
		</Container>
	);
}

interface WeeklyHabitItem {
	habit: Habit;
	onItemPress: (dayIndex: number) => void;
}

function WeeklyHabitItem({ habit, onItemPress }: WeeklyHabitItem) {
	return (
		<VStack
			borderRadius="$3"
			p="$2"
			gap="$2"
			borderWidth={1}
			borderColor="$borderColor"
		>
			<HStack gap="$3">
				<Square backgroundColor={habit.color} borderRadius="$2" size="$3">
					<Ionicons name={habit.icon as any} size={22} color="white" />
				</Square>
				<TextStyled fontWeight={600} children={habit.name} />
			</HStack>
			<HStack jc="space-between" gap="$2">
				{moment.weekdaysShort().map((day, index) => (
					<View key={day} ai="center">
						<TextStyled fontSize="$1" color="$color9" children={day} />
						<MyTouchableOpacity>
							<Square
								size="$2.5"
								onPress={() => onItemPress(index)}
								borderRadius="$4"
								borderWidth={1}
								borderColor={habit.color}
								bg={
									habit.isDone[index]
										? shadeColor(habit.color, 100)
										: undefined
								}
							/>
						</MyTouchableOpacity>
					</View>
				))}
			</HStack>
		</VStack>
	);
}
