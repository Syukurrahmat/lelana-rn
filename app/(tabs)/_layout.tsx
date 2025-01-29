import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
	return (
		<Tabs
		
			screenOptions={{
				tabBarStyle: {
					height: 65,
					zIndex : 3000000,
					backgroundColor: 'white',
				},
				tabBarItemStyle: {
					padding: 3,
				},
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
