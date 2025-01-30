import { createContext, useContext } from 'react';
import { Updater } from 'use-immer';

export type HabitPageContextType = {
	habits: Habit[];
	setHabits: Updater<Habit[]>
};
export const HabitPageContext = createContext<HabitPageContextType>(null as never);
export const useHabitContext = () => useContext(HabitPageContext);
