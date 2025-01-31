import { Feather } from '@expo/vector-icons';
import { Pressable } from '@gluestack-ui/themed';
import React, { ComponentProps } from 'react';
import { TextStyled, ThemedIcon } from './custom/CustomComponents';

interface ButtonListItemProps extends ComponentProps<typeof Pressable> {
	iconName?: ComponentProps<typeof Feather>['name'];
	label: string;
}

export default function ButtonListItem(props: ButtonListItemProps) {
	const { label, iconName, ...p } = props;
	return (
		<Pressable
			flexDirection="row"
			alignItems="center"
			$active-bg="$trueGray100"
			gap="$3"
			px="$4"
			py="$3.5"
			{...p}
		>
			{!!iconName && <ThemedIcon name={iconName} size={18} />}
			<TextStyled>{label}</TextStyled>
		</Pressable>
	);
}
