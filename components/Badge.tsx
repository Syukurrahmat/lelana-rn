import { Octicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { SizableText } from 'tamagui';
import { MyTouchableOpacity } from './custom/CustomComponents';
import { HStack } from './custom/syledComponents';

interface BadgeProps {
	children: ReactNode;
	withCloseButton?: boolean;
	onClose?: () => void;
}

export default function Badge(props: BadgeProps) {
	const { children, withCloseButton, onClose } = props;

	return (
		<HStack
			bg="$blue3"
			borderRadius="$2"
			gap="$2"
			px="$2"
			borderWidth={1}
			borderColor="$blue8"
		>
			<SizableText
				color="$blue10Dark"
				fontSize="$3"
				fontWeight="bold"
				children={children}
			/>
			{withCloseButton && (
				<MyTouchableOpacity onPress={onClose}>
					<Octicons name="x" size={16} color="$color10" />
				</MyTouchableOpacity>
			)}
		</HStack>
	);
}
