import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetModalProps,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { ReactNode, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { getVariableValue, View } from 'tamagui';

type MyBottomSheetProps = Omit<
	Omit<BottomSheetModalProps, 'ref'>,
	'backdropComponent'
> & {
	sheetRef: React.RefObject<BottomSheetModal>;
	withBackdrop?: boolean;
	backdropProps?: BottomSheetBackdropProps;
	children: ReactNode;
	useFloatingBottomSheet?: boolean;
};

type RenderBackdrop = (props: BottomSheetBackdropProps) => React.JSX.Element;

export default function MyBottomSheet(props: MyBottomSheetProps) {
	const {
		sheetRef,
		withBackdrop = true,
		backdropProps,
		children,
		useFloatingBottomSheet,
		...bottomSheetModalProps
	} = props;

	const renderBackdrop: RenderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				{...backdropProps}
			/>
		),
		[backdropProps]
	);

	if (useFloatingBottomSheet) {
		return (
			<MyFloatingBottomSheet renderBackdrop={renderBackdrop} {...props} />
		);
	}
	return (
		<BottomSheetModal
			index={0}
			ref={sheetRef}
			enableDynamicSizing
			enablePanDownToClose
			{...bottomSheetModalProps}
			handleIndicatorStyle={style.handleIndicator}
			backdropComponent={withBackdrop ? renderBackdrop : undefined}
		>
			<BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
		</BottomSheetModal>
	);
}

function MyFloatingBottomSheet(
	props: MyBottomSheetProps & { renderBackdrop: RenderBackdrop }
) {
	const {
		sheetRef,
		withBackdrop = true,
		backdropProps,
		children,
		renderBackdrop,
		...bottomSheetModalProps
	} = props;

	return (
		<BottomSheetModal
			index={0}
			ref={sheetRef}
			enableDynamicSizing
			enablePanDownToClose
			{...bottomSheetModalProps}
			backdropComponent={withBackdrop ? renderBackdrop : undefined}
			backgroundStyle={floatingStyle.background}
			handleStyle={floatingStyle.handle}
			style={floatingStyle.frame}
			handleIndicatorStyle={style.handleIndicator}
		>
			<BottomSheetView style={floatingStyle.sheetView}>
				<View style={floatingStyle.content}>{children}</View>
			</BottomSheetView>
		</BottomSheetModal>
	);
}

const style = StyleSheet.create({
	handleIndicator: {
		backgroundColor: '#EEEEEE',
		width: 80,
		height: 6,
	},
});
const floatingStyle = StyleSheet.create({
	frame: {
		marginInline: getVariableValue('$2.5', 'space'),
	},
	background: {
		backgroundColor: 'transparent',
	},
	handle: {
		backgroundColor: 'white',
		borderTopLeftRadius: getVariableValue('$6', 'radius'),
		borderTopRightRadius: getVariableValue('$6', 'radius'),
	},
	sheetView: {
		flex: 1,
		paddingBottom: getVariableValue('$2.5', 'space'),
	},
	content: {
		backgroundColor: 'white',
		borderBottomLeftRadius: getVariableValue('$6', 'radius'),
		borderBottomRightRadius: getVariableValue('$6', 'radius'),
	},
});
