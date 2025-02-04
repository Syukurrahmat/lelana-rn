import AppContextProvider from '@/context/AppContext';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import React, { ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { config } from '../tamagui.config';
import { CurrentToast } from './CurrentToast';
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
							<SafeAreaView style={{ flex: 1 }} mode="margin">
								<SheetProvider context="global">
									{children}
								</SheetProvider>
								<CurrentToast />
								<ToastViewport bottom={66} left={0} right={0} />
							</SafeAreaView>
						</Container>
					</ToastProvider>
				</AppContextProvider>
			</TamaguiProvider>
		</GestureHandlerRootView>
	);
}
