import { TextStyled } from '@/components/custom/CustomComponents';
import { useDebouncedCallback } from '@/hooks/useDebounce';
import { shadeColor } from '@/libs/utils';
import { Ionicons } from '@expo/vector-icons';
import { getVariableValue } from '@tamagui/core';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Spacer, Square, View, XStack } from 'tamagui';
import { MyTouchableOpacity } from '../custom/CustomComponents';
import { useHabitContext } from './HabitPageContext';

export default function TodayHabit() {
	const { habits, setHabits } = useHabitContext();

	const onItemPress = useDebouncedCallback((habitId: number) => {
		setHabits((draft) => {
			const todo = draft.find((e) => e.id === habitId)!;
			todo.isDones[6] = !todo.isDones[6];
		});
	}, 0);

	return (
		<View>
			<FlatList
				contentContainerStyle={{
					paddingBlock: getVariableValue('$3', 'space'),
					paddingInline: getVariableValue('$4', 'space'),
				}}
				data={habits}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <View height={10} />}
				renderItem={({ item }) => (
					<HabitItem
						habit={item}
						isActive={Boolean(item.isDones[6])}
						onPress={() => onItemPress(item.id)}
					/>
				)}
			/>
		</View>
	);
}

interface HabitItemProps {
	habit: Habit;
	isActive: boolean;
	onPress: () => void;
}

function HabitItem({ habit, isActive, onPress }: HabitItemProps) {
	const [checked, setChecked] = useState(isActive);

	const _onPress = () => {
		setChecked((e) => !e);
		onPress();
	};

	useEffect(() => {
		setChecked(isActive);
	}, [isActive]);

	return (
		<XStack
			p="$2"
			gap="$3"
			ai="center"
			jc="space-between"
			borderWidth={1}
			borderColor="$borderColor"
			pressStyle={{ bg: '$backgroundPress' }}
			borderRadius="$3"
			onPress={_onPress}
		>
			<Square bg={habit.color as any} borderRadius="$2" size="$3">
				<Ionicons name={habit.icon as any} size={22} color="white" />
			</Square>
			<TextStyled fontWeight={600} children={habit.name} />
			<Spacer flex={1} />
			<MyTouchableOpacity onPress={_onPress}>
				<Square
					size="$3"
					borderRadius="$5"
					borderWidth={1}
					bg={checked ? (shadeColor(habit.color, 100) as any) : undefined}
					borderColor={habit.color as any}
				/>
			</MyTouchableOpacity>
		</XStack>
	);
}
