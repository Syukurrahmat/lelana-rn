import { Feather } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Button, ButtonProps } from 'tamagui';
import { TextStyled, ThemedIcon } from './custom/CustomComponents';

interface ButtonListItemProps extends ButtonProps {
	iconName?: ComponentProps<typeof Feather>['name'];
	label: string;
}

export default function ButtonListItem(props: ButtonListItemProps) {
	const { label, iconName, ...p } = props;
	return (
		<Button
			flexDirection="row"
			justifyContent='flex-start'
			gap="$1"
			px="$4"
			height='$5'
			bg='transparent'
			borderRadius='$0'
			{...p}
		>
			{!!iconName && <ThemedIcon name={iconName} size={18} />}
			<TextStyled>{label}</TextStyled>
		</Button>
	);
}
