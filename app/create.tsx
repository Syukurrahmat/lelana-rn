import Badge from '@/components/Badge';
import {
	DatetimePicker,
	LocationSheet,
	PreviewMedia,
	TagsSheet,
} from '@/components/create';
import {
	IconButton,
	MyTouchableOpacity,
} from '@/components/custom/CustomComponents';
import { Container, HStack, TextStyled } from '@/components/custom/syledComponents'; //prettier-ignore
import { useCreateForm } from '@/context/CreateFormContext';
import { useCameraPicker, useImagesLibraryPicker } from '@/hooks/usePhotoPicker'; //prettier-ignore
import { useSheetDisclousure } from '@/hooks/useSheetDisclousure';
import { getUniqueArrayOfObj } from '@/libs/utils';
import { Camera, Hash, Image as ImageIcon, MapPin } from '@tamagui/lucide-icons'; //prettier-ignore
import { ImagePickerSuccessResult } from 'expo-image-picker';
import { Controller, useController } from 'react-hook-form';
import { Button, ScrollView, Spacer, Stack, View } from 'tamagui'; //prettier-ignore
import { AutoSizeTextArea } from '../components/AutoSizeTextArea';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1Ijoic3l1a3VyeGl4aXhpeCIsImEiOiJjbTZmemJwd3QwYnNoMmtwd2h0a291a2JmIn0.kv1Jv6YILiDWgY2lvL3aww');

export default function Create() {
	const { control, ...form } = useCreateForm();

	const onPhotoAdded = (result: ImagePickerSuccessResult) => {
		const { media } = form.getValues();
		form.setValue(
			'media',
			getUniqueArrayOfObj([...media, ...result.assets], 'fileName')
		);
	};

	const pickImage = useImagesLibraryPicker({ onPhotoAdded });
	const launchCamera = useCameraPicker({ onPhotoAdded });

	const locationSheetState = useSheetDisclousure({ opened: false });
	const locationController = useController({ control, name: 'location' });

	const tagsSheetState = useSheetDisclousure({ opened: false });
	const tagsController = useController({ control, name: 'tags' });

	return (
		<Container>
			<ScrollView>
				<View px="$4" py="$4" gap="$2.5">
					<Stack gap="$0">
						<DatetimePicker control={control} name="datetime" />

						<MyTouchableOpacity
							style={{ marginTop: 12 }}
							onPress={locationSheetState.open}
						>
							<HStack gap="$2">
								<MapPin size={20} color="$color9" />
								<TextStyled
									lineHeight="$1"
									flex={1}
									numberOfLines={1}
									color="$color9"
									children={
										locationController.field.value?.address ||
										'Loading...'
									}
								/>
							</HStack>
						</MyTouchableOpacity>
					</Stack>

					<Controller
						control={control}
						name="content"
						render={({ field: { ref, ...props } }) => (
							<AutoSizeTextArea {...props} />
						)}
					/>
					<View h={300} w='100%'>
						<Mapbox.MapView    />
					</View>
				</View>

				<PreviewMedia control={control} name="media" />

				{!!tagsController.field.value.length && (
					<View px="$4">
						<MyTouchableOpacity onPress={tagsSheetState.open}>
							<HStack gap="$2" alignItems="flex-start">
								<Hash color="$blue9" size={20} mt="3" />
								<HStack gap="$2" flexWrap="wrap" flex={1}>
									{tagsController.field.value.map((e) => (
										<Badge key={e} children={e} />
									))}
								</HStack>
							</HStack>
						</MyTouchableOpacity>
					</View>
				)}
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
				<IconButton
					icon={MapPin}
					onPress={locationSheetState.open}
					size="$3"
				/>
				<IconButton onPress={tagsSheetState.open} icon={Hash} size="$3" />
				<Spacer flex={1} />
				<Button theme="dark_blue">Buat</Button>
			</HStack>

			<LocationSheet {...locationController} {...locationSheetState} />
			<TagsSheet {...tagsController} {...tagsSheetState} />
		</Container>
	);
}
