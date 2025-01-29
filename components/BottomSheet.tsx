import React from 'react';
import { Sheet, SheetProps, View, ViewProps } from 'tamagui';

interface BottomSheetProps extends SheetProps {
	contentWrapperProps?: ViewProps;
}

export function BottomSheet(props: BottomSheetProps) {
	const { children, contentWrapperProps, ...p } = props;

	return (
		<Sheet
			modal
			defaultPosition={1}
			dismissOnSnapToBottom
			zIndex={100000}
			animation='quick'
			{...p}
		>
			<Sheet.Overlay
				animation='medium'
				enterStyle={{ opacity: 0 }}
				exitStyle={{ opacity: 0 }}
			/>

			<Sheet.Frame pt="$2" gap="$1" bg='white'>
				<Sheet.Handle bg="$color8" h="5" w='100' />
				<View {...contentWrapperProps}>{children}</View>
			</Sheet.Frame>
		</Sheet>
	);
}
