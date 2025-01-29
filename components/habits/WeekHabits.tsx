import {
	Container,
	HStack,
	TextStyled,
	VStack,
} from '@/components/custom/syledComponents';
import { useHabitContext } from '@/components/habits/HabitPageContext';
import { shadeColor } from '@/libs/utils';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { FlatList } from 'react-native';
import { getTokens, Square, View } from 'tamagui';
import { MyTouchableOpacity } from '../custom/CustomComponents';

export default function WeekHabits() {
	const { habits, setHabits } = useHabitContext();
	const tokens = getTokens();

	const onItemPress = (index: number, dayIndex: number) => {
		setHabits((prevHabits) => {

			const updatedHabit = {
				...prevHabits[index],
				isDones: prevHabits[index].isDones.map((done, i) =>
					i === dayIndex ? !done : done
				),
			};

			return [
				...prevHabits.slice(0, index),
				updatedHabit,
				...prevHabits.slice(index + 1),
			];
		});
	};
  
	return (
		<Container>
			<FlatList
				contentContainerStyle={{
					paddingBlock: tokens.space.$3.val,
					paddingInline: tokens.space.$4.val,
				}}
				data={habits}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <View h={12} />}
				renderItem={({ item, index }) => (
					<WeeklyHabitItem
						key={item.id}
						habit={item}
						onItemPress={(dayIndex) => onItemPress(index, dayIndex)}
					/>
				)}
			/>
		</Container>
	);
}

interface WeeklyHabitItemProps {
	habit: Habit;
	onItemPress: (dayIndex: number) => void;
}

function WeeklyHabitItem({ habit, onItemPress }: WeeklyHabitItemProps) {
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
									habit.isDones[index]
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
