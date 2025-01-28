import { useHabitContext } from '@/components/habits/HabitPageContext';
import {
	Container,
	HStack,
	TextStyled,
	VStack,
} from '@/components/custom/syledComponents';
import { shadeColor } from '@/libs/utils';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Spacer, Square } from 'tamagui';
import { MyTouchableOpacity } from '../custom/CustomComponents';

export default function TodayHabit() {
	const { habits, setHabits } = useHabitContext();

	const onItemPress = (habitId: number) => {
		setHabits((prevHabits) =>
			prevHabits.map((habit) =>
				habit.id === habitId
					? {
							...habit,
							isDone: habit.isDone.map((done, i) =>
								i === 6 ? !done : done
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
						<HabitItem
							key={habit.id}
							habit={habit}
							isActive={Boolean(habit.isDone[6])}
							onPress={() => onItemPress(habit.id)}
						/>
					))}
				</VStack>
			</ScrollView>
		</Container>
	);
}

interface HabitItem {
	habit: Habit;
	isActive: boolean;
	onPress: () => void;
}

function HabitItem({ habit, isActive, onPress }: HabitItem) {
	return (
		<HStack
			p="$2"
			gap="$3"
			borderWidth={1}
			borderColor="$borderColor"
			pressStyle={{
				backgroundColor: '$backgroundPress',
			}}
			onPress={onPress}
			borderRadius="$3"
			justifyContent="space-between"
		>
			<Square backgroundColor={habit.color} borderRadius="$2" size="$3">
				<Ionicons name={habit.icon as any} size={22} color="white" />
			</Square>
			<TextStyled fontWeight={600} children={habit.name} />
			<Spacer flex={1} />
			<MyTouchableOpacity>
				<Square
					size="$3"
					borderRadius="$4"
					borderWidth={1}
					bg={isActive ? shadeColor(habit.color, 100) : undefined}
					borderColor={habit.color}
				/>
			</MyTouchableOpacity>
		</HStack>
	);
}
