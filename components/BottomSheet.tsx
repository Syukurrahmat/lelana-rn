import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sheet, SheetProps, View, ViewProps } from 'tamagui';

interface BottomSheetProps extends SheetProps {
	contentWrapperProps?: ViewProps;
	withOverlay?: boolean;
}

export function BottomSheet(props: BottomSheetProps) {
	const { children, contentWrapperProps, withOverlay = true, ...p } = props;
	const insets = useSafeAreaInsets();

	return (
		<View>
			<Sheet
				modal
				defaultPosition={1}
				dismissOnSnapToBottom
				zIndex={100000}
				moveOnKeyboardChange
				animationConfig={{
					type: 'spring',
					damping: 40,
					stiffness: 400,
					mass: 1,
					overshootClamping: false,
				}}
				{...p}
				portalProps={{ marginTop: insets.top }}
			>
				{withOverlay && (
					<Sheet.Overlay
						opacity={0.5}
						bg="black"
						animation="quick"
						enterStyle={{ opacity: 0 }}
						exitStyle={{ opacity: 0 }}
					/>
				)}

				<Sheet.Frame pt="$2" gap="$1" bg="white">
					<Sheet.Handle bg="$color7" height={6} w="80" mx="auto" />
					<View {...contentWrapperProps}>{children}</View>
				</Sheet.Frame>
			</Sheet>
		</View>
	);
}

export function FloatingBottomSheet(props: BottomSheetProps) {
	const { children, contentWrapperProps, withOverlay = true, ...p } = props;
	// const insets = useSafeAreaInsets();

	return (
		<View>
			<Sheet
				modal
				defaultPosition={1}
				dismissOnSnapToBottom
				zIndex={100000}
				animationConfig={{
					type: 'spring',
					damping: 40,
					stiffness: 400,
					mass: 1,
					overshootClamping: false,
				}}
				// portalProps={{ marginTop: insets.top }}
				{...p}
			>
				{withOverlay && (
					<Sheet.Overlay
						opacity={0.5}
						bg="black"
						animation="quick"
						enterStyle={{ opacity: 0 }}
						exitStyle={{ opacity: 0 }}
					/>
				)}
				<View px="$2.5" pb="$3">
					<Sheet.Frame unstyled>
						<View bg="white" borderRadius="$6" pt="$2" gap="$1">
							<Sheet.Handle bg="$color7" height={6} w="80" mx="auto" />
							<View {...contentWrapperProps}>{children}</View>
						</View>
					</Sheet.Frame>
				</View>
			</Sheet>
		</View>
	);
}
