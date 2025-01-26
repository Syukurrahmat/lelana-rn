import { X } from '@tamagui/lucide-icons';
import { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { SizableText } from 'tamagui';
import { HStack } from './custom/syledComponents';
import { MyTouchableOpacity } from './custom/CustomComponents';

interface BadgeProps {
	children: ReactNode;
	withCloseButton?: Boolean;
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
					<X size={16} color="$color10" />
				</MyTouchableOpacity>
			)}
		</HStack>
	);
}
