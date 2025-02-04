import { ReactNode } from 'react';
import {
	MyTouchableOpacity,
	TextStyled,
	ThemedIcon,
} from './custom/CustomComponents';
import { View, XStack, XStackProps } from 'tamagui';

interface TagsProps extends XStackProps {
	children: ReactNode;
	withCloseButton?: boolean;
	onClose?: () => void;
}

export default function Tags(props: TagsProps) {
	const { children, withCloseButton , onClose, ...p } = props;

	return (
		<XStack
			borderWidth={1}
			borderColor="$blue8"
			borderRadius="$2"
			bg="$blue2"
			px="$2.5"
			alignItems="center"
			pr={withCloseButton ? '$0' : undefined}
			gap="$2"
			{...p}
		>
			<View py="$1">
				<TextStyled color="$blue10">{children}</TextStyled>
			</View>
			{withCloseButton && (
				<MyTouchableOpacity
					style={{
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						aspectRatio: 1,
					}}
					onPress={onClose}
				>
					<ThemedIcon name="x" size={17} color="$color12" />
				</MyTouchableOpacity>
			)}
		</XStack>
	);
}
