import { X } from '@tamagui/lucide-icons';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Button, ButtonProps, SizableTextProps } from 'tamagui';

interface IconButtonProps extends ButtonProps {
	iconColor?: SizableTextProps['color'];
	iconSize?: number;
	icon: any;
}

export function IconButton(props: IconButtonProps) {
	const { icon: Icon, iconSize, iconColor = '$gray10', ...rest } = props;

	return (
		<Button aspectRatio={1} bg="transparent" {...rest}>
			<Icon size={iconSize} color={iconColor} />
		</Button>
	);
}

export function MyTouchableOpacity(props: TouchableOpacityProps) {
	return <TouchableOpacity activeOpacity={0.75} {...props} />;
}
