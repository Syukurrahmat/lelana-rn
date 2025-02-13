import AppContextProvider from '@/context/AppContext';
import { ToastProvider } from '@tamagui/toast';
import React, { ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { config } from '../tamagui.config';
import { Container } from './custom/CustomComponents';

export function Provider({ children }: { children: ReactNode }) {
	const colorScheme = useColorScheme();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<TamaguiProvider
				config={config}
				defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
			>
				<AppContextProvider>
					<ToastProvider
						burntOptions={{ from: 'bottom' }}
						swipeDirection="down"
						duration={6000}
					>
						<Container>
							<SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
						</Container>
					</ToastProvider>
				</AppContextProvider>
			</TamaguiProvider>
		</GestureHandlerRootView>
	);
}
