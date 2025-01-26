import React from 'react';
import { SheetProps, Sheet, View, ViewProps } from 'tamagui';

interface BottomSheet extends SheetProps {
	contentWrapperProps?: ViewProps;
}

export function BottomSheet(props: BottomSheet) {
	const { children, contentWrapperProps, ...p } = props;

	return (
		<Sheet
			modal
			defaultPosition={1}
			dismissOnSnapToBottom
			zIndex={100000}
			animation="quick"
			{...p}
		>
			<Sheet.Overlay
				animation="lazy"
				enterStyle={{ opacity: 0 }}
				exitStyle={{ opacity: 0 }}
			/>

			<Sheet.Frame pt="$2" gap="$1" bg='white'>
				<Sheet.Handle bg="$color8" h="6" />
				<View {...contentWrapperProps}>{children}</View>
			</Sheet.Frame>
		</Sheet>
	);
}
