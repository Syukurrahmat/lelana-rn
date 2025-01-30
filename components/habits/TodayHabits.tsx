import { TextStyled } from '@/components/custom/CustomComponents';
import { useDebouncedCallback } from '@/hooks/useDebounce';
import { shadeColor } from '@/libs/utils';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { MyTouchableOpacity } from '../custom/CustomComponents';
import { useHabitContext } from './HabitPageContext';
import { Box, Center, HStack, View } from '@gluestack-ui/themed';

export default function TodayHabit() {
	const { habits, setHabits } = useHabitContext();

	const onItemPress = useDebouncedCallback((habitId: number) => {
		setHabits((draft) => {
			const todo = draft.find((e) => e.id === habitId)!;
			todo.isDones[6] = !todo.isDones[6];
		});
	}, 0);

	return (
		<Box>
			<FlatList
				// contentContainerStyle={{
				// paddingBlock: tokens.space.$3.val,
				// paddingInline: tokens.space.$4.val,
				// }}
				data={habits}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <View h={12} />}
				renderItem={({ item, index }) => (
					<HabitItem
						habit={item}
						isActive={Boolean(item.isDones[6])}
						onPress={() => onItemPress(item.id)}
					/>
				)}
			/>
		</Box>
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
		<HStack
			p="$2"
			gap="$3"
			borderWidth={1}
			borderColor="$borderColor"
			$pressed-backgroundColor="$backgroundDark100"
 			borderRadius="$3"
			justifyContent="space-between"
		>
			<Center backgroundColor={habit.color} borderRadius="$2" w="$3" h="$3">
				<Ionicons name={habit.icon as any} size={22} color="white" />
			</Center>
			<TextStyled fontWeight={600} children={habit.name} />
			<Box flex={1} />
			<MyTouchableOpacity onPress={_onPress}>
				<Center
					w="$3"
					h="$3"
					borderRadius="$lg"
					borderWidth={1}
					bg={checked ? shadeColor(habit.color, 100) : undefined}
					borderColor={habit.color}
				/>
			</MyTouchableOpacity>
		</HStack>
	);
}
