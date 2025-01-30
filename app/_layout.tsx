import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';

import { MAPBOX_ACCESS } from '@/constant/constant';
import AppContextProvider from '@/context/AppContext';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import Mapbox from '@rnmapbox/maps';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { SheetProvider } from 'react-native-actions-sheet';
import '../libs/SheetManager';

Mapbox.setAccessToken(MAPBOX_ACCESS);
SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const [loaded] = useFonts({
		Inter: Inter_400Regular,
	});

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync();
	}, [loaded]);

	if (!loaded) return null;

	return (
		<GluestackUIProvider config={config}>
			<AppContextProvider>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
		</GluestackUIProvider>
	);
}
