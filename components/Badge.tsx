import { Octicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { MyTouchableOpacity, ThemedIcon } from './custom/CustomComponents';
import { TextStyled } from './custom/CustomComponents';
import { HStack } from '@gluestack-ui/themed';
import { Badge, BadgeText, BadgeIcon } from '@gluestack-ui/themed';

interface TagsProps {
	children: ReactNode;
	withCloseButton?: boolean;
	onClose?: () => void;
}

export default function Tags(props: TagsProps) {
	const { children, withCloseButton, onClose } = props;

	return (
		<Badge
			variant="outline"
			borderWidth={1.2}
			borderColor="$primary200"
			borderRadius="$md"
			px="$2.5"
			py="$0.5"
			alignItems="center"
			pr={withCloseButton ? '$2' : undefined}
			gap="$2"
		>
			<BadgeText>{children}</BadgeText>
			{withCloseButton && (
				<MyTouchableOpacity onPress={onClose}>
					<BadgeIcon as={() => <ThemedIcon name="x" size={16} />} />
				</MyTouchableOpacity>
			)}
		</Badge>
	);
}
