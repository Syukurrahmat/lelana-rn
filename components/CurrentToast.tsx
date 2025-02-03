import { Toast, useToastState } from '@tamagui/toast';
import { YStack } from 'tamagui';

export function CurrentToast() {
	const currentToast = useToastState();

	if (!currentToast || currentToast.isHandledNatively) return null;

	return (
		<Toast
			key={currentToast.id}
			duration={currentToast.duration}
			viewportName={currentToast.viewportName}
			enterStyle={{ opacity: 0, scale: 0.5, y: 25 }}
			exitStyle={{ opacity: 0, scale: 1, y: 20 }}
			theme="accent"
			borderRadius="$6"
			bottom={0}
			animation="quick"
			py="$0.5"
		>
			<YStack ai="center" p="$2" gap="$2">
				<Toast.Title fontWeight="bold">{currentToast.title}</Toast.Title>
				{!!currentToast.message && (
					<Toast.Description>{currentToast.message}</Toast.Description>
				)}
			</YStack>
		</Toast>
	);
}
