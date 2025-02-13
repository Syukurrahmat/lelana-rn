import { Provider } from '@/components/Provider';
import { MAPBOX_ACCESS } from '@/constant/constant';
import { useMyFont } from '@/theme/font';
import Mapbox from '@rnmapbox/maps';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

Mapbox.setAccessToken(MAPBOX_ACCESS);
SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const [loaded] = useMyFont();

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync();
	}, [loaded]);

	if (!loaded) return null;

	return (
		<Provider>
			<StatusBar style="auto" />
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="create"
					options={{
						title: 'Buat Entri',
						headerShown: false,
					}}
				/>
				<Stack.Screen name="mapPicker" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
		</Provider>
	);
}
