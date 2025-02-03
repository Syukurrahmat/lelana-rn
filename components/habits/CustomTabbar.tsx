import { StyleSheet } from 'react-native';
import { TabBar, TabBarItem } from 'react-native-tab-view';
import { Props as TabBarProps } from 'react-native-tab-view/lib/typescript/commonjs/src/TabBar';
import { useTheme } from 'tamagui';

export default function CustomTabbar(props: TabBarProps<any>) {
	const theme = useTheme();

	return (
		<TabBar
			{...props}
			pressColor="transparent"
			indicatorStyle={{ backgroundColor: theme.blue11.val }}
			inactiveColor="gray"
			activeColor={theme.blue11.val}
			style={[style.tabBar, { borderColor: theme.borderColorPress.val }]}
			renderTabBarItem={({ key, ...tabbarProps }) => (
				<TabBarItem
					key={key}
					labelStyle={style.labelStyle}
					{...tabbarProps}
				/>
			)}
		/>
	);
}

const style = StyleSheet.create({
	tabBar: {
		backgroundColor: 'transparent',
		borderBottomWidth: 1.3,
		borderTopWidth: 1.3,
		elevation: 0,
		height: 44,
	},

	labelStyle: {
		fontFamily: 'Inter',
		fontSize: 12,
		marginTop: -4,
	},
});
