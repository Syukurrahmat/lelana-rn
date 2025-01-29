import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { TamaguiProvider, Theme } from 'tamagui';
import { ToastProvider } from 'react-native-toast-notifications';

import { MAPBOX_ACCESS } from '@/constant/constant';
import AppContextProvider from '@/context/AppContext';
import Mapbox from '@rnmapbox/maps';
import config from '../tamagui.config';
import { ThemedIcon } from '@/components/Icon';
import { Feather } from '@expo/vector-icons';
import { TextStyled } from '@/components/custom/syledComponents';

Mapbox.setAccessToken(MAPBOX_ACCESS);
SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
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
				<ThemeProvider value={DefaultTheme}>
					<ToastProvider
						icon={<Feather name="info" size={18} color="white" />}
						successIcon={
							<Feather name="check-circle" size={18} color="white" />
						}
						dangerIcon={
							<Feather name="alert-circle" size={18} color="white" />
						}
						warningIcon={
							<Feather name="alert-triangle" size={18} color="white" />
						}
						style={{ gap: 8 }}
						textStyle={{ fontFamily: 'Inter' }}
						offsetBottom={65}
						animationDuration={150}
					>
						<AppContextProvider>
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
									}}
								/>
								<Stack.Screen
									name="mapPicker"
									options={{ headerShown: false }}
								/>
								<Stack.Screen name="+not-found" />
							</Stack>
						</AppContextProvider>
					</ToastProvider>
				</ThemeProvider>
			</Theme>
		</TamaguiProvider>
	);
}
