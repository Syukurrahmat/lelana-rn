import { StyleSheet } from 'react-native';
import { TabBar, TabBarItem } from 'react-native-tab-view';
import { Props as TabBarProps } from 'react-native-tab-view/lib/typescript/commonjs/src/TabBar';

export default function CustomTabbar(props: TabBarProps<any>) {
	return (
		<TabBar
			{...props}
			pressColor="transparent"
			indicatorStyle={{ backgroundColor: 'blueviolet' }}
			inactiveColor="gray"
			activeColor="blueviolet"
			tabStyle={style.tab}
			renderTabBarItem={({ key, ...tabbarProps }) => (
				<TabBarItem
					key={key}
					labelStyle={style.labelStyle}
					{...tabbarProps}
				/>
			)}
			style={style.tabBar}
		/>
	);
}

const style = StyleSheet.create({
	tabBar: {
		backgroundColor: 'transparent',
		borderBottomWidth: 1,
		borderColor: 'gray',
		elevation: 0,
		height: 50,
	},
	tab: {
		padding: 0,
	},
	labelStyle: {
		fontFamily: 'Inter',
		fontSize: 12,
	},
});
