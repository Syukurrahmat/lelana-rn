import { MyDialog } from '@/components/MyDialog';
import { CreateFormValues, useCreateForm } from '@/context/CreateFormContext';
import { useSheetDisclousure } from '@/hooks/useSheetDisclousure';
import React, { memo, useEffect, useRef, useState } from 'react';
import { ControllerRenderProps, useController } from 'react-hook-form';
import { TextInput } from 'react-native';
import { Button, H4, Spacer, TextArea, View, XStack } from 'tamagui';
import { useDisclousureOverlay } from './overlayContext';

export function AddressModal() {
	const { addressDialog } = useDisclousureOverlay();
	const { control } = useCreateForm();
	const { field: fieldWithRef } = useController({ control, name: 'location' });
	const { ref, ...field } = fieldWithRef;
	const { opened, close } = addressDialog;

	return (
		<MyDialog
			opened={opened}
			onClose={close}
			withOverlay={false}
			children={<AddressDialogInner {...addressDialog} {...field} />}
		/>
	);
}

type AddressDialogInnerProps = ReturnType<typeof useSheetDisclousure> &
	Omit<ControllerRenderProps<CreateFormValues, 'location'>, 'ref'>;

const AddressDialogInner = memo(function AddressDialogInner(
	props: AddressDialogInnerProps
) {
	const { value, onChange, opened, close } = props;
	const [initialAddress] = useState(value?.displayAddress || '');
	const [displayAddress, setDisplayAddress] = useState(initialAddress);
	const inputRef = useRef<TextInput>(null);

	const onChangehandler = (displayAddress: string) => {
		setDisplayAddress(displayAddress);
		onChange({
			...value,
			displayAddress,
		});
	};

	const resetToInital = () => {
		onChange({
			...value,
			displayAddress: initialAddress,
		});
	};

	const reset = () => {
		onChange({
			...value,
			displayAddress: value?.address,
		});
	};

	useEffect(() => {
		if (opened) {
			setTimeout(() => inputRef.current?.focus(), 100);
		}
	}, [opened]);

	return (
		<View gap="$3">
			<H4>Edit Nama Lokasi</H4>
			<TextArea
				ref={inputRef}
				minHeight={90}
				lineHeight="$4"
				verticalAlign="top"
				autoFocus
				value={displayAddress || ''}
				onChangeText={onChangehandler}
			/>
			<XStack gap="$3">
				<Button
					variant="outlined"
					bw={1}
					theme="red"
					onPress={() => {
						reset();
						close();
					}}
					children="Reset"
				/>
				<Spacer flex={1} />
				<Button
					variant="outlined"
					bw={1}
					onPress={() => {
						resetToInital();
						close();
					}}
					children="Batal"
				/>
				<Button
					theme="blue"
					onPress={() => {
						onChangehandler(displayAddress.trim());
						close();
					}}
				>
					Simpan
				</Button>
			</XStack>
		</View>
	);
});
