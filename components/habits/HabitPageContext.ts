import { createContext, useContext } from 'react';

export type HabitPageContext = {
	habits: Habit[];
	setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
};
export const HabitPageContext = createContext<HabitPageContext>(null as never);
export const useHabitContext = () => useContext(HabitPageContext);
