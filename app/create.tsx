import {
	AddressDisplay,
	DatetimePicker,
	DisplayTags,
	LocationSheet,
	PreviewMedia,
	TagsSheet,
} from '@/components/create';

import { useCreateForm } from '@/context/CreateFormContext';
import { useCameraPicker, useImagesLibraryPicker } from '@/hooks/usePhotoPicker'; //prettier-ignore
import { useSheetDisclousure } from '@/hooks/useSheetDisclousure';
import { getUniqueArrayOfObj } from '@/libs/utils';
import { ImagePickerSuccessResult } from 'expo-image-picker';
import { useToast } from 'react-native-toast-notifications';

import {
	Container,
	MyButtonIcon,
	TextStyled,
} from '@/components/custom/CustomComponents';
import {
	Box,
	Button,
	ButtonText,
	HStack,
	ScrollView,
	View,
	VStack,
} from '@gluestack-ui/themed';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Controller, useController } from 'react-hook-form';
import { AutoSizeTextArea } from '../components/AutoSizeTextArea';
import ActionSheet, {
	ActionSheetRef,
	SheetManager,
} from 'react-native-actions-sheet';

export default function Create() {
	const { control, ...form } = useCreateForm();
	const navigation = useNavigation();
	const toast = useToast();

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

	const locationSheetRef = useRef<ActionSheetRef>(null);
	const openLoctionSheenRef = () => {
		locationSheetRef.current?.show();
	};

	const locationController = useController({ control, name: 'location' });

	const tagsSheetState = useSheetDisclousure({ opened: false });
	const tagsController = useController({ control, name: 'tags' });

	const ddd = form.watch('address');

	const onSubmit = form.handleSubmit((values) => {
		if (!values.content && !values.media.length) {
			toast.hideAll();
			toast.show('Anda belum memasukkan apapun');
			return;
		}
	});

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<MyButtonIcon
					name="x"
					iconColor="$trueGray800"
					onPress={() => {
						form.reset();
						router.back();
					}}
				/>
			),
		});
	}, [form, navigation]);

	return (
		<>
			<Container>
				<ScrollView>
					<View px="$4" pt="$4" gap="$2.5">
						<VStack gap="$0" mb="$2">
							<DatetimePicker />
							<AddressDisplay
								location={locationController.field.value}
								style={{ paddingTop: 12 }}
								onPress={openLoctionSheenRef}
							/>
						</VStack>
						<Controller
							control={control}
							name="content"
							render={({ field: { ref, ...props } }) => (
								<AutoSizeTextArea {...props} />
							)}
						/>
						<TextStyled>{ddd}</TextStyled>
					</View>

					<PreviewMedia />
					<DisplayTags {...tagsController} {...tagsSheetState} />
				</ScrollView>

				<HStack
					px="$4"
					py="$2"
					gap="$1.5"
					borderTopWidth={1}
					borderColor="$borderLight100"
					bg="white"
				>
					<MyButtonIcon
						iconSize={22}
						onPress={launchCamera}
						name="camera"
					/>
					<MyButtonIcon iconSize={22} onPress={pickImage} name="image" />
					<MyButtonIcon
						iconSize={20}
						onPress={() =>
							locationController.field.value
								? openLoctionSheenRef()
								: router.push('/mapPicker')
						}
						name="map-pin"
					/>
					<MyButtonIcon
						iconSize={22}
						onPress={tagsSheetState.open}
						name="hash"
					/>
					<Box flex={1} />
					<Button onPress={onSubmit}>
						<ButtonText>Buat</ButtonText>
					</Button>
				</HStack>
				<LocationSheet ref={locationSheetRef} {...locationController} />
				<TagsSheet {...tagsController} {...tagsSheetState} />
			</Container>
		</>
	);
}
