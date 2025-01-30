import { TextStyled } from '@/components/custom/CustomComponents';
import CustomTabbar from '@/components/habits/CustomTabbar';
import OverallHabits from '@/components/habits/OverallHabits';
import TodayHabit from '@/components/habits/TodayHabits';
import WeekHabits from '@/components/habits/WeekHabits';
import { memo, useState } from 'react';

import { HabitPageContext } from '@/components/habits/HabitPageContext';
import { useWindowDimensions } from 'react-native';
import {
	Route,
	SceneMap,
	TabView
} from 'react-native-tab-view';
 import { useImmer } from "use-immer";
import { Box, Heading, VStack } from '@gluestack-ui/themed';


const dummyHabits: Habit[] = [
	{
		id: 1,
		order: 1,
		name: 'Drink Water',
		icon: 'water',
		color: '#00bcd4',
		isDones: [false, false, false, false, false, false, false],
	},
	{
		id: 2,
		order: 2,
		name: 'Morning Exercise',
		icon: 'heart',
		color: '#f44336',
		isDones: [false, false, false, false, false, false, false],
	},
	{
		id: 3,
		order: 3,
		name: 'Read a Book',
		icon: 'book',
		color: '#3f51b5',
		isDones: [false, false, false, false, false, false, false],
	},
	{
		id: 4,
		order: 4,
		name: 'Meditation',
		icon: 'heart',
		color: '#4caf50',
		isDones: [false, false, false, false, false, false, false],
	},
	{
		id: 5,
		order: 5,
		name: 'Plan the Day',
		icon: 'calendar',
		color: '#ff9800',
		isDones: [false, false, false, false, false, false, false],
	},

	{
		id: 7,
		order: 7,
		name: 'Go for a Walk',
		icon: 'walk',
		color: '#795548',
		isDones: [false, false, false, false, false, false, false],
	},
	{
		id: 8,
		order: 8,
		name: 'Journal Writing',
		icon: 'pencil',
		color: '#607d8b',
		isDones: [false, false, false, false, false, false, false],
	},
];

const TodayHabitMemo = memo(TodayHabit);
const WeekHabitsMemo = memo(WeekHabits);
const OverallHabitsMemo = memo(OverallHabits);

const renderScene = SceneMap({
	daily: TodayHabitMemo,
	weekly: WeekHabitsMemo,
	overall: OverallHabitsMemo,
});

const routes: Route[] = [
	{ key: 'daily', title: 'Hari ini' },
	{ key: 'weekly', title: 'Minggu ini' },
	{ key: 'overall', title: 'Ringkasan' },
];

export default function TabsDemo() {
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [habits, setHabits] = useImmer(dummyHabits);
	
	return (
		<Box>
			<VStack bg="$backgroundStrong" p="$4">
				<Heading size='md'>Habbit {index}</Heading>
				<TextStyled>Lorem ipsum dolor sit amet.</TextStyled>
			</VStack>
			<HabitPageContext.Provider value={{ habits, setHabits }}>
				<TabView
					lazy
					renderTabBar={CustomTabbar}
					navigationState={{ index, routes }}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={{ width: layout.width }}
					renderLazyPlaceholder={(p) => <TextStyled>sksksk</TextStyled>}
				/>
			</HabitPageContext.Provider>
		</Box>
	);
}
 