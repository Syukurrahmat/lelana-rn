import { createContext, useContext } from 'react';

export type HabitPageContextType = {
	habits: Habit[];
	setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
};
export const HabitPageContext = createContext<HabitPageContextType>(null as never);
export const useHabitContext = () => useContext(HabitPageContext);
