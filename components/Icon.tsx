import { Feather } from '@expo/vector-icons';
import { OpaqueColorValue, TouchableOpacityProps } from 'react-native';
import { Button, ButtonProps, getThemes, GetThemeValueForKey, getToken, styled, usePropsAndStyle, useTheme, View } from 'tamagui'; //prettier-ignore
import { MyTouchableOpacity } from './custom/CustomComponents';
import { getTokens } from 'tamagui';

type ThemedIconProps = {
	size?: number;
	color?: 'unset' | OpaqueColorValue | GetThemeValueForKey<'color'> | null;
	name: React.ComponentProps<typeof Feather>['name'];
};

export function ThemedIcon({ color, ...props }: ThemedIconProps) {
	const theme = useTheme();
	const c = color && color !== 'unset' ? theme[color as any]?.val : color;

	return <Feather color={c} {...props} />;
}

type IconButtonProps = Omit<ThemedIconProps, 'size'> &
	ButtonProps & {
		iconSize?: number;
	};

export function IconButton(props: IconButtonProps) {
	const {
		name,
		color = '$color10',
		iconSize = 20,
		size = '$2.5',
		...p
	} = props;

	return (
		<Button
			pressStyle={{ bg: '$backgroundTransparent', bw: 0 }}
			bg='transparent'
			circular
			size={size}
			style={{ padding: 4 }}
			{...p}
		>
			<ThemedIcon name={name} color={color} size={iconSize} />
		</Button>
	);
}

export const CloseButton = styled(Button, {
	icon: <ThemedIcon name="x" color="$color12" />,
	aspectRatio: 1,
	borderWidth: 1,
	size: '$1.5',
	p: 0,
	borderRadius: '$12',
});
