import {
	AddressDisplay,
	DatetimePicker,
	DisplayTags,
	LocationSheet,
	PreviewMedia,
	TagsSheet,
} from '@/components/create';

import { Container, HStack, TextStyled } from '@/components/custom/syledComponents'; //prettier-ignore
import { IconButton } from '@/components/Icon';
import { useCreateForm } from '@/context/CreateFormContext';
import { useCameraPicker, useImagesLibraryPicker } from '@/hooks/usePhotoPicker'; //prettier-ignore
import { useSheetDisclousure } from '@/hooks/useSheetDisclousure';
import { getUniqueArrayOfObj } from '@/libs/utils';
import { ImagePickerSuccessResult } from 'expo-image-picker';
import { useToast } from 'react-native-toast-notifications';

import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useController } from 'react-hook-form';
import { Button, ScrollView, Spacer, Stack, View } from 'tamagui'; //prettier-ignore
import { AutoSizeTextArea } from '../components/AutoSizeTextArea';

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

	const locationSheetState = useSheetDisclousure({ opened: false });
	const locationController = useController({ control, name: 'location' });

	const tagsSheetState = useSheetDisclousure({ opened: false });
	const tagsController = useController({ control, name: 'tags' });

	const ddd = form.watch('address')
	
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
				<IconButton
					name="x"
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
					<Stack gap="$0" mb="$2">
						<DatetimePicker />
						<AddressDisplay
							location={locationController.field.value}
							style={{ paddingTop: 12 }}
							onPress={locationSheetState.open}
						/>
					</Stack>
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
				gap="$2.5"
				borderBlockStartWidth={1}
				boc="$borderColor"
				bg="$backgroundStrong"
				elevation="$0.25"
				shac="$shadowColor"
			>
				<IconButton
					br="$2"
					size="$3"
					iconSize={22}
					onPress={launchCamera}
					name="camera"
				/>
				<IconButton
					br="$2"
					size="$3"
					iconSize={22}
					onPress={pickImage}
					name="image"
				/>
				<IconButton
					br="$2"
					size="$3"
					iconSize={20}
					onPress={() =>
						locationController.field.value
							? locationSheetState.open()
							: router.push('/mapPicker')
					}
					name="map-pin"
				/>
				<IconButton
					br="$2"
					size="$3"
					iconSize={22}
					onPress={tagsSheetState.open}
					name="hash"
				/>
				<Spacer flex={1} />
				<Button theme="light_blue" themeInverse onPress={onSubmit}>
					Buat
				</Button>
			</HStack>

			<LocationSheet {...locationController} {...locationSheetState} />
			<TagsSheet {...tagsController} {...tagsSheetState} />
		</Container>
	);
}
