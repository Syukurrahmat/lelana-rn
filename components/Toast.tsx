import { Toast, useToastState } from '@tamagui/toast';
import { YStack } from 'tamagui'; //prettier-ignore

export default function MyToast() {
    const currentToast = useToastState();

    if (!currentToast || currentToast.isHandledNatively) return null;
    return (
        <Toast
            key={currentToast.id}
            duration={currentToast.duration}
            enterStyle={{ opacity: 0, scale: 0.5, y: 10 }}
            exitStyle={{ opacity: 0, scale: 1, y: 10 }}
            opacity={1}
            scale={1}
            theme="dark"
            br="$4"
            py="$2"
            px="$3"
            animation="quicker"
            viewportName={currentToast.viewportName}
        >
            <YStack>
                <Toast.Title>{currentToast.title}</Toast.Title>
                {!!currentToast.message && (
                    <Toast.Description>{currentToast.message}</Toast.Description>
                )}
            </YStack>
        </Toast>
    );
}
