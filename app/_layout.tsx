import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { getFontSizeVariable, TamaguiProvider, Theme } from 'tamagui';

import { X } from '@tamagui/lucide-icons';
import config from '../tamagui.config';
import CreateFormProvider from '@/context/CreateFormContext';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const colorScheme = useColorScheme();
	const router = useRouter();
	const [loaded] = useFonts({
		InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
		Inter: require('@tamagui/font-inter/otf/Inter-Regular.otf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) return null;

	return (
		<TamaguiProvider config={config}>
			<Theme name={colorScheme}>
				<ThemeProvider
					value={colorScheme === 'light' ? DefaultTheme : DarkTheme}
				>
					<CreateFormProvider>
						<Stack>
							<Stack.Screen
								name="(tabs)"
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="create"
								options={{
									title: 'Buat Entri',
									presentation: 'modal',
									headerBackVisible: false,
									headerRight: () => (
										<X onPress={() => router.back()} />
									),
								}}
							/>
							<Stack.Screen name="+not-found" />
						</Stack>
					</CreateFormProvider>
				</ThemeProvider>
			</Theme>
		</TamaguiProvider>
	);
}
