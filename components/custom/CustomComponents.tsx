import { Feather } from '@expo/vector-icons';
import { Box, Button, Heading, Text, useToken } from '@gluestack-ui/themed';
import { ComponentProps } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export const TextStyled = (props: ComponentProps<typeof Text>) => (
	<Text fontFamily="Inter" {...props} />
);

export const HeadingStyled = (props: ComponentProps<typeof Heading>) => (
	<Heading fontFamily="Inter" {...props} />
);

export const MyTouchableOpacity = (props: TouchableOpacityProps) => (
	<TouchableOpacity activeOpacity={0.6} {...props} />
);

export const Container = (props: ComponentProps<typeof Box>) => (
	<Box bg="#F8FAFC" flex={1} {...props} />
);

type ThemedIconProps = Omit<ComponentProps<typeof Feather>, 'color'> & {
	color?: ComponentProps<typeof Text>['color'];
};

export const ThemedIcon = ({ color, ...props }: ThemedIconProps) => {
	const themedColor = useToken('colors', color?.slice(1) as any) || color
	return <Feather color={themedColor} {...props} />;
};

type MyButtonIconProps = Omit<ComponentProps<typeof Button>, 'color'> & {
	iconSize?: number;
	iconColor?: ThemedIconProps['color'];
	name: ThemedIconProps['name'];
};

export const MyButtonIcon = ({
	iconSize,
	iconColor,
	name,
	...props
}: MyButtonIconProps) => {
	return (
		<Button
			variant="link"
			$active-bg="$backgroundLight100"
			aspectRatio={1}
			px={0}
			py={0}
			borderRadius='$lg'
			{...props}
		>
			<ThemedIcon
				name={name}
				size={(iconSize || 22)}
				color={(iconColor || '$trueGray500')}
			/>
		</Button>
	);
};
