import { TABBAR_HEIGHT } from '@/constant/constant';
import { MyFonts } from '@/theme/font';
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					height: TABBAR_HEIGHT,
					maxHeight: TABBAR_HEIGHT,
					zIndex: 3000000,
					backgroundColor: 'white',
				},
				tabBarLabelStyle:{
					fontFamily : MyFonts['500Medium']
				},
				tabBarItemStyle: { padding: 3 },
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: (props) => (
						<Feather name="home" {...props} size={22} />
					),
				}}
			/>
			<Tabs.Screen
				name="calendar"
				options={{
					title: 'Calendar',
					tabBarIcon: (props) => (
						<Feather name="calendar" {...props} size={22} />
					),
				}}
			/>
			<Tabs.Screen
				name="gallery"
				options={{
					title: 'Gallery',
					tabBarIcon: (props) => (
						<Feather name="image" {...props} size={22} />
					),
				}}
			/>
			<Tabs.Screen
				name="habit"
				options={{
					title: 'Habits',
					tabBarIcon: (props) => (
						<Feather name="life-buoy" {...props} size={22} />
					),
				}}
			/>
			<Tabs.Screen
				name="setting"
				options={{
					title: 'Setting',
					tabBarIcon: (props) => (
						<Feather name="settings" {...props} size={22} />
					),
				}}
			/>
		</Tabs>
	);
}
