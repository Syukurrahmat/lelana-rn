import { Octicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';

export default function Layout() {

	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					height : 60,
					backgroundColor : 'white',
				},
				headerShown : false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: (props) => (
						<Octicons name="home" {...props} size={22} />
					),
				}}
			/>
			<Tabs.Screen
				name="calendar"
				options={{
					title: 'Calendar',
					tabBarIcon: (props) => (
						<Octicons name="calendar" {...props} size={22} />
					),
				}}
			/>
			<Tabs.Screen
				name="gallery"
				options={{
					title: 'Gallery',
					tabBarIcon: (props) => (
						<Octicons name="image" {...props} size={22} />
					),
				}}
			/>
			<Tabs.Screen
				name="habit"
				options={{
					title: 'Habits',
					tabBarIcon: (props) => (
						<Octicons name="light-bulb" {...props} size={22} />
					),
				}}
			/>
			<Tabs.Screen
				name="setting"
				options={{
					title: 'Setting',
					tabBarIcon: (props) => (
						<Octicons name="gear" {...props} size={22} />
					),
				}}
			/>
		</Tabs>
	);
}
