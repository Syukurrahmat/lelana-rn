import {
	Button,
	ButtonText,
	Center,
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
	View,
} from '@gluestack-ui/themed';
import { router } from 'expo-router';
import React from 'react';
import { ActionSheetRef } from 'react-native-actions-sheet';

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
import {
	useDisclousure,
	useSheetDisclousure,
} from '@/hooks/useSheetDisclousure';
import { getUniqueArrayOfObj } from '@/libs/utils';
import { ImagePickerSuccessResult } from 'expo-image-picker';
import { useToast } from 'react-native-toast-notifications';

import {
	Container,
	HeadingStyled,
	MyButtonIcon,
} from '@/components/custom/CustomComponents';
import { Box, HStack, ScrollView, VStack } from '@gluestack-ui/themed';
import { useNavigation } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Controller, useController } from 'react-hook-form';
import { Keyboard, TextInput } from 'react-native';
import { AutoSizeTextArea } from '../components/AutoSizeTextArea';
import { TextareaInput } from '@gluestack-ui/themed';

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

	const openLocationSheet = () => {
		Keyboard.dismiss();
		locationSheetRef.current?.show();
	};

	const editAddressDisclousure = useDisclousure(false);

	const locationController = useController({ control, name: 'location' });
	const tagsSheetState = useSheetDisclousure({ opened: false });
	const tagsController = useController({ control, name: 'tags' });

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
		<Container>
			<ScrollView>
				<View px="$4" pt="$4" gap="$2.5">
					<VStack gap="$0" mb="$2">
						<DatetimePicker />
						<AddressDisplay
							location={locationController.field.value}
							style={{ paddingTop: 12 }}
							onPress={openLocationSheet}
						/>
					</VStack>
					<Controller
						control={control}
						name="content"
						render={({ field }) => (
							<AutoSizeTextArea
								autoFocus={!field.value}
								placeholder="Tulis Apa yang kamu lakukan sekarang"
								{...field}
							/>
						)}
					/>
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
					size="lg"
					iconSize={24}
					onPress={launchCamera}
					name="camera"
				/>
				<MyButtonIcon
					size="lg"
					iconSize={24}
					onPress={pickImage}
					name="image"
				/>
				<MyButtonIcon
					size="lg"
					iconSize={22}
					onPress={() =>
						locationController.field.value
							? openLocationSheet()
							: router.push('/mapPicker')
					}
					name="map-pin"
				/>
				<MyButtonIcon
					size="lg"
					iconSize={24}
					onPress={editAddressDisclousure.open}
					name="hash"
				/>
				<Box flex={1} />

				<Button onPress={onSubmit}>
					<ButtonText>Buat</ButtonText>
				</Button>
			</HStack>

			<LocationSheet sheetRef={locationSheetRef} {...locationController} />
			<TagsSheet {...tagsController} {...tagsSheetState} />
			<Controller
				control={control}
				name="address"
				render={({ field: { ref, ...props } }) => (
					<EditAddressModal {...props} {...editAddressDisclousure} />
				)}
			/>
		</Container>
	);
}

function EditAddressModal(
	props: ControledValueProps<string> & ReturnType<typeof useDisclousure>
) {
	const initialFocusRef = React.useRef<any>(null);
	const { value, onChange, opened, close } = props;

	useEffect(() => {}, [opened]);

	return (
		<Center>
			<Modal size="lg" isOpen={opened} onClose={close} useRNModal>
				<ModalBackdrop />
				<ModalContent borderRadius="$lg">
					<ModalHeader>
						<HeadingStyled size="lg">Ubah Nama Lokasi</HeadingStyled>
					</ModalHeader>
					<ModalBody>
						<Textarea >
							<TextareaInput
								ref={initialFocusRef}
								value={value || ''}
								onChangeText={onChange}
								placeholder="Tulis Alamat lengkap"
							/>
						</Textarea>
					</ModalBody>
					<ModalFooter gap="$2">
						<Button variant="outline" action="secondary" onPress={close}>
							<ButtonText>Batal</ButtonText>
						</Button>
						<Button
							action="primary"
							borderWidth="$0"
							onPress={() => {
								close();
							}}
						>
							<ButtonText>Simpan</ButtonText>
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Center>
	);
}
