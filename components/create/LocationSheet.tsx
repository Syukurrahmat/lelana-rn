import { CreateFormValues } from '@/context/CreateFormContext';
import { useSheetDisclousure } from '@/hooks/useSheetDisclousure';
import Mapbox from '@rnmapbox/maps';
import { router } from 'expo-router';
import React from 'react';
import { UseControllerReturn } from 'react-hook-form';
import { Button, View } from 'tamagui';
import { BottomSheet } from '../BottomSheet';
import { TextStyled } from '../custom/syledComponents';
import { ThemedIcon } from '../Icon';

type LocationSheetProps = UseControllerReturn<CreateFormValues, 'location'> &
	ReturnType<typeof useSheetDisclousure>;

export function LocationSheet(props: LocationSheetProps) {
	const { opened, setOpened, close, field } = props;
	const { value, onChange } = field;

	return (
		<BottomSheet
			open={opened}
			onOpenChange={setOpened}
			snapPointsMode="fit"
			forceRemoveScrollEnabled={opened}
		>
			<View px="$3">
				<TextStyled fontWeight="bold" fontSize="$5">
					{value?.address}
				</TextStyled>
			</View>

			{value && (
				<Mapbox.MapView
					scaleBarEnabled={false}
					logoEnabled={false}
					scrollEnabled={false}
					pitchEnabled={false}
					rotateEnabled={false}
					zoomEnabled={false}
					attributionEnabled={false}
					style={{ flex: 1, height: 180, marginBlock: 16 }}
				>
					<Mapbox.Camera
						centerCoordinate={[value.lng, value.lat]}
						zoomLevel={13}
					/>
					<Mapbox.PointAnnotation
						id="marker-1"
						coordinate={[value.lng, value.lat]}
						children={<View />}
					/>
				</Mapbox.MapView>
			)}

			<View pb="$3">
				<Button
					br="$0"
					bg="white"
					h="$5"
					jc="flex-start"
					gap="$1"
					icon={<ThemedIcon name="map-pin" size={18} />}
					children="Ubah Lokasi"
					onPress={() => {
						close();
						setTimeout(() => router.push('/mapPicker', {}), 200);
					}}
				/>
				<Button
					br="$0"
					bg="white"
					h="$5"
					jc="flex-start"
					gap="$1"
					icon={<ThemedIcon name="edit-3" size={18} />}
					children="Ubah Nama Lokasi"
					onPress={() => {}}
				/>
				<Button
					br="$0"
					bg="white"
					h="$5"
					jc="flex-start"
					gap="$1"
					icon={<ThemedIcon name="trash" size={18} />}
					children="Hapus Lokasi"
					onPress={() => {
						close();
						setTimeout(() => onChange(null), 200);
					}}
				/>
			</View>
		</BottomSheet>
	);
}
