import { TextStyled } from '@/components/custom/CustomComponents';
import { useHabitContext } from '@/components/habits/HabitPageContext';
import { shadeColor } from '@/libs/utils';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { FlatList } from 'react-native';
import { MyTouchableOpacity } from '../custom/CustomComponents';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from '@/hooks/useDebounce';
import { Box, Center, HStack, View, VStack } from '@gluestack-ui/themed';

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
		<Box>
			<FlatList
				contentContainerStyle={
					{
						// paddingBlock: tokens.space.$3.val,
						// paddingInline: tokens.space.$4.val,
					}
				}
				data={habits}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <Box h={12} />}
				renderItem={({ item, index }) => (
					<WeeklyHabitItem
						key={item.id}
						habit={item}
						onItemPress={(dayIndex) => onItemPress(item.id, dayIndex)}
					/>
				)}
			/>
		</Box>
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
				<Center
					backgroundColor={habit.color}
					borderRadius="$2"
					w="$3"
					h="$3"
				>
					<Ionicons name={habit.icon as any} size={22} color="white" />
				</Center>
				<TextStyled fontWeight={600} children={habit.name} />
			</HStack>
			<HStack justifyContent="space-between" gap="$2">
				{moment.weekdaysShort().map((day, index) => (
					<DailyHabit
						key={day}
						day={day}
						color={habit.color}
						isActive={habit.isDones[index]}
						onPress={() => onItemPress(index)}
					/>
				))}
			</HStack>
		</VStack>
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
		<View alignItems="center">
			<TextStyled fontSize="$xs" color="$color9" children={day} />
			<MyTouchableOpacity onPress={_onPress}>
				<Center
					w="$2.5"
					h="$2.5"
					borderRadius="$4"
					borderWidth={1}
					borderColor={color}
					bg={checked ? shadeColor(color, 100) : undefined}
				/>
			</MyTouchableOpacity>
		</View>
	);
}
