import { Provider } from '@/components/Provider';
import { MAPBOX_ACCESS } from '@/constant/constant';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import Mapbox from '@rnmapbox/maps';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

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
		<Provider>
			<StatusBar translucent backgroundColor='transparent' />
			<Stack
				screenOptions={{
					headerShown: false,
					statusBarTranslucent:true,
					statusBarBackgroundColor : 'transparent',
					statusBarStyle : 'dark',
				}}
			>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="create"
					options={{
						title: 'Buat Entri',
						presentation: 'modal',
						headerShown: false,
					}}
				/>
				<Stack.Screen name="mapPicker" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
		</Provider>
	);
}
