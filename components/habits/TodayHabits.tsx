import {
	Container,
	HStack,
	TextStyled,
} from '@/components/custom/syledComponents';
import { shadeColor } from '@/libs/utils';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { getTokens, Spacer, Square, View } from 'tamagui';
import { MyTouchableOpacity } from '../custom/CustomComponents';
import { useHabitContext } from './HabitPageContext';

function splitArray<T>(arr: T[], index: number) {
	return [arr.slice(0, index), arr[index], arr.slice(index + 1)] as const;
}

export default function TodayHabit() {
	const { habits, setHabits } = useHabitContext();
	const tokens = getTokens();

	const onItemPress = (index: number) => {
		setHabits((prevHabits) => {
			const updatedHabit = {
				...prevHabits[index],
				isDones: prevHabits[index].isDones.map((done, i) =>
					i === 6 ? !done : done
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
					<HabitItem
						habit={item}
						isActive={Boolean(item.isDones[6])}
						onPress={() => onItemPress(index)}
					/>
				)}
			/>
		</Container>
	);
}

interface HabitItemProps {
	habit: Habit;
	isActive: boolean;
	onPress: () => void;
}

function HabitItem({ habit, isActive, onPress }: HabitItemProps) {
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

