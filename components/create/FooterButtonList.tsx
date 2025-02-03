import { MyButtonIcon } from '@/components/custom/CustomComponents';
import { useCreateForm } from '@/context/CreateFormContext';
import { useCameraPicker, useImagesLibraryPicker } from '@/hooks/usePhotoPicker'; //prettier-ignore
import { getUniqueArrayOfObj } from '@/libs/utils';
import { ImagePickerSuccessResult } from 'expo-image-picker';
import { router } from 'expo-router';
import React from 'react';
import { Button, View, XStack } from 'tamagui';
import { useDisclousureOverlay } from './overlay/overlayContext';

interface FooterButtonListProps {
	onSubmit: () => void;
}

export default function FooterButtonList({ onSubmit }: FooterButtonListProps) {
	const { control, ...form } = useCreateForm();
	const { locatonSheet, tagSheet } = useDisclousureOverlay();

	const onPhotoAdded = (result: ImagePickerSuccessResult) => {
		const { media } = form.getValues();
		const value = getUniqueArrayOfObj(
			[...media, ...result.assets],
			'fileName'
		);
		form.setValue('media', value);
	};

	const pickImage = useImagesLibraryPicker({ onPhotoAdded });
	const launchCamera = useCameraPicker({ onPhotoAdded });

	return (
		<XStack
			px="$4"
			py="$2"
			gap="$2"
			borderTopWidth={1}
			borderColor="$borderColorPress"
			bg="white"
		>
			<MyButtonIcon iconSize={24} onPress={launchCamera} name="camera" />
			<MyButtonIcon iconSize={24} onPress={pickImage} name="image" />
			<MyButtonIcon
				iconSize={22}
				onPress={() =>
					form.getValues().location
						? locatonSheet.open()
						: router.push('/mapPicker')
				}
				name="map-pin"
			/>
			<MyButtonIcon iconSize={24} onPress={tagSheet.open} name="hash" />
			<View flex={1} />
			<Button theme='blue' onPress={onSubmit}>Buat</Button>
		</XStack>
	);
}
