import { LocationSheet } from '@/components/create/LocationPicker';
import { IconButton } from '@/components/custom/CustomComponents';
import { Container, HStack } from '@/components/custom/syledComponents'; //prettier-ignore
import { useCreateForm } from '@/context/CreateFormContext';
import { useCameraPicker, useImagesLibraryPicker } from '@/hooks/usePhotoPicker'; //prettier-ignore
import { getUniqueArray } from '@/libs/utils';
import { Camera, Hash, Image as ImageIcon, MapPin } from '@tamagui/lucide-icons'; //prettier-ignore
import { ImagePickerAsset, ImagePickerSuccessResult } from 'expo-image-picker';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Button, ScrollView, Spacer, Stack, View } from 'tamagui'; //prettier-ignore
import { AutoSizeTextArea } from '../components/AutoSizeTextArea';
import TagInput from '../components/create/TagInput';
import { PreviewMedia } from '../components/create/PreviewMedia';
import { DatetimePicker } from '../components/create/DatetimePicker';

export default function Create() {
	const { register, setValue, handleSubmit, getValues, control, reset } =
		useCreateForm();

	const onPhotoAdded = (result: ImagePickerSuccessResult) => {
		const prev = getValues().media;
		setValue(
			'media',
			getUniqueArray([...prev, ...result.assets], 'fileName')
		);
	};

	const pickImage = useImagesLibraryPicker({ onPhotoAdded });
	const launchCamera = useCameraPicker({ onPhotoAdded });

	return (
		<Container>
			<ScrollView>
				<View px="$4" py="$4" gap="$2.5">
					<Stack gap="$0">
						<DatetimePicker control={control} name="datetime" />
						<LocationSheet control={control} name="location" />
					</Stack>

					<Controller
						control={control}
						name="content"
						render={({ field: { ref, ...props } }) => (
							<AutoSizeTextArea {...props} />
						)}
					/>
				</View>

				<PreviewMedia control={control} name="media" />
			</ScrollView>

			<HStack
				px="$4"
				py="$2"
				gap="$2.5"
				borderBlockStartWidth={1}
				borderColor="$borderColor"
				bg="$backgroundStrong"
			>
				<IconButton onPress={launchCamera} icon={Camera} size="$3" />
				<IconButton onPress={pickImage} icon={ImageIcon} size="$3" />
				<IconButton icon={MapPin} size="$3" />
				<IconButton
					onPress={() => {
 					}}
					icon={Hash}
					size="$3"
				/>
				<Spacer flex={1} />
				<Button theme="dark_blue">Buat</Button>
			</HStack>
		</Container>
	);
}
