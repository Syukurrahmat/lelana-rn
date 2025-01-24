import { X } from '@tamagui/lucide-icons';
import { Button, ButtonProps, SizableTextProps } from 'tamagui';

interface IconButtonProps extends ButtonProps {
	iconColor?: SizableTextProps['color'];
	icon: any;
}

export function IconButton(props: IconButtonProps) {
	const { icon: Icon, iconColor = '$gray10', ...rest } = props;

	return (
		<Button aspectRatio={1} bg="transparent" {...rest}>
			<Icon color={iconColor} />
		</Button>
	);
}
