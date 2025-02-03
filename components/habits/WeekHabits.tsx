import { TextStyled } from '@/components/custom/CustomComponents';
import { useHabitContext } from '@/components/habits/HabitPageContext';
import { useDebouncedCallback } from '@/hooks/useDebounce';
import { shadeColor } from '@/libs/utils';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { getVariableValue, Square, Stack, View, XStack } from 'tamagui';
import { MyTouchableOpacity } from '../custom/CustomComponents';

export default function WeekHabits() {
	const { habits, setHabits } = useHabitContext();

	const onItemPress = useDebouncedCallback(
		(habitId: number, dayIndex: number) => {
			setHabits((draft) => {
				const todo = draft.find((e) => e.id === habitId)!;
				todo.isDones[dayIndex] = !todo.isDones[dayIndex];
			});
		},
		0
	);

	return (
		<View>
			<FlatList
				contentContainerStyle={{
					paddingBlock: getVariableValue('$3', 'space'),
					paddingInline: getVariableValue('$4', 'space'),
				}}
				data={habits}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <View height={12} />}
				renderItem={({ item, index }) => (
					<WeeklyHabitItem
						key={item.id}
						habit={item}
						onItemPress={(dayIndex) => onItemPress(item.id, dayIndex)}
					/>
				)}
			/>
		</View>
	);
}

interface WeeklyHabitItemProps {
	habit: Habit;
	onItemPress: (dayIndex: number) => void;
}

function WeeklyHabitItem({ habit, onItemPress }: WeeklyHabitItemProps) {
	return (
		<Stack
			borderRadius="$3"
			p="$2"
			gap="$2"
			borderWidth={1}
			borderColor="$borderColor"
		>
			<XStack gap="$3" ai='center'>
				<Square
					backgroundColor={habit.color as any}
					borderRadius="$2"
					size="$3"
				>
					<Ionicons name={habit.icon as any} size={22} color="white" />
				</Square>
				<TextStyled fontWeight={600} children={habit.name} />
			</XStack>
			<XStack justifyContent="space-between" gap="$2">
				{moment.weekdaysShort().map((day, index) => (
					<DailyHabit
						key={day}
						day={day}
						color={habit.color}
						isActive={habit.isDones[index]}
						onPress={() => onItemPress(index)}
					/>
				))}
			</XStack>
		</Stack>
	);
}

interface DailyHabitProps {
	onPress: () => void;
	isActive: boolean;
	day: string;
	color: string;
}

function DailyHabit({ onPress, isActive, day, color }: DailyHabitProps) {
	const [checked, setChecked] = useState(isActive);

	const _onPress = () => {
		setChecked((e) => !e);
		onPress();
	};

	useEffect(() => {
		setChecked(isActive);
	}, [isActive]);

	return (
		<View alignItems="center" gap='$1'>
			<TextStyled fontSize="$2" color="$color9" children={day} />
			<MyTouchableOpacity onPress={_onPress}>
				<Square
					size="$2.5"
					borderRadius="$4"
					borderWidth={1}
					borderColor={color as any}
					bg={checked ? (shadeColor(color, 100) as any) : undefined}
				/>
			</MyTouchableOpacity>
		</View>
	);
}
