import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { getLoadedFonts, useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { getFontSizeVariable, getToken, TamaguiProvider, Theme } from 'tamagui';

import { X } from '@tamagui/lucide-icons';
import config from '../tamagui.config';
import { getTokens } from 'tamagui';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const colorScheme = useColorScheme();
	const router = useRouter();
	const [loaded] = useFonts({
		'Inter-Black': require('@tamagui/font-inter/otf/Inter-Black.otf'),
		'Inter-Bold': require('@tamagui/font-inter/otf/Inter-Bold.otf'),
		'Inter-ExtraBold': require('@tamagui/font-inter/otf/Inter-ExtraBold.otf'),
		'Inter-ExtraLight': require('@tamagui/font-inter/otf/Inter-ExtraLight.otf'),
		'Inter-Light': require('@tamagui/font-inter/otf/Inter-Light.otf'),
		Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
		'Inter-SemiBold': require('@tamagui/font-inter/otf/Inter-SemiBold.otf'),
		'Inter-Thin': require('@tamagui/font-inter/otf/Inter-Thin.otf'),
	});

	const token = getFontSizeVariable('$1');
	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
			console.log(getLoadedFonts());
			console.log(token);
		}
	}, [loaded]);

	if (!loaded) return null;

	return (
		<TamaguiProvider config={config}>
			<Theme name={colorScheme}>
				<ThemeProvider
					value={colorScheme === 'light' ? DefaultTheme : DarkTheme}
				>
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
								headerRight: () => <X onPress={() => router.back()} />,
							}}
						/>
						<Stack.Screen name="+not-found" />
					</Stack>
				</ThemeProvider>
			</Theme>
		</TamaguiProvider>
	);
}
