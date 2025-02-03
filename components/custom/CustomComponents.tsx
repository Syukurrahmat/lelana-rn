import { Feather } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import {
	Button,
	ButtonIcon,
	Stack,
	StackProps,
	Text,
	TextProps,
	useTheme,
} from 'tamagui';

export const TextStyled = (props: TextProps) => (
	<Text fontFamily="$body" {...props} />
);

export const MyTouchableOpacity = (props: TouchableOpacityProps) => (
	<TouchableOpacity activeOpacity={0.6} {...props} />
);

export const Container = (props: StackProps) => (
	<Stack bg="$background" flex={1} {...props} />
);

type ThemedIconProps = Omit<ComponentProps<typeof Feather>, 'color'> & {
	color?: ComponentProps<typeof Text>['color'];
};

export const ThemedIcon = ({ color, ...props }: ThemedIconProps) => {
	const theme = useTheme();
	const iconColor = color
		? theme[color.toString().slice(1)]?.val || color
		: color;

	return <Feather color={iconColor} {...props} />;
};

type MyButtonIconProps = Omit<ComponentProps<typeof Button>, 'color'> & {
	iconSize?: number;
	iconColor?: ThemedIconProps['color'];
	name: ThemedIconProps['name'];
	transparent?: boolean;
};

export const MyButtonIcon = ({
	iconSize,
	iconColor,
	name,
	transparent = true,
	...props
}: MyButtonIconProps) => {
	return (
		<Button
			borderWidth={0}
			bg={transparent ? 'transparent' : undefined}
			aspectRatio={1}
			px={0}
			py={0}
			{...props}
		>
			<ButtonIcon>
				<ThemedIcon
					name={name}
					size={iconSize || 22}
					color={iconColor || '$colorFocus'}
				/>
			</ButtonIcon>
		</Button>
	);
};
