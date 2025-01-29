import * as Location from 'expo-location';
import { createContext, useContext, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import CreateFormProvider from './CreateFormContext';

type AppContextType = {
	safeAreaDimention: {
		width: number;
		height: number;
	};
};

const AppContext = createContext<AppContextType>(null as any);
export const useAppContext = () => useContext(AppContext);

export default function AppContextProvider({ children }: ChildrenProps) {
	const insets = initialWindowMetrics?.insets;
	const window = useWindowDimensions();

	const safeAreaDimention = {
		height: window.height - (insets ? insets.top + insets.bottom : 0),
		width: window.width - (insets ? insets.left + insets.right : 0),
	};

	useEffect(() => {
		Location.requestForegroundPermissionsAsync();
	}, []);

	return (
		<AppContext.Provider value={{ safeAreaDimention }}>
			<CreateFormProvider>{children}</CreateFormProvider>
		</AppContext.Provider>
	);
}
