import { useCreateForm } from '@/context/CreateFormContext';
import Mapbox, { MapView } from '@rnmapbox/maps';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import { View } from 'tamagui';
import { FloatingBottomSheet } from '../../BottomSheet';
import ButtonListItem from '../../ButtonListItem';
import { TextStyled } from '../../custom/CustomComponents';
import { useDisclousureOverlay } from './overlayContext';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';

const useRenderWhenOnceOpened = (opened: boolean) => {
	const [rendered, setRendered] = useState(false);

	useEffect(() => {
		if (opened && !rendered) {
			setRendered(true);
		}
	}, [opened, rendered]);

	return rendered;
};

export function LocationSheet() {
	const { locatonSheet, addressDialog } = useDisclousureOverlay();
	const { control } = useCreateForm();
	const { field } = useController({ control, name: 'location' });
	const { opened, close, setOpened } = locatonSheet;
	const { value, onChange } = field;

	const coordinate = value && [value.lng, value.lat];

	return (
		<FloatingBottomSheet
			snapPointsMode="fit"
			open={opened}
			onOpenChange={setOpened}
			withOverlay={false}
		>
			<View py="$3">
				<View px="$4">
					<TextStyled fontWeight="600" fontSize="$5">
						{value?.displayAddress}{' '}
						{value && value.address !== value.displayAddress && (
							<TextStyled color="$color08" fontSize="$3">
								(Telah diedit)
							</TextStyled>
						)}
					</TextStyled>
				</View>

				{coordinate && (
					<View height={200} my="$3">
						<LocationMapView opened={opened} coordinate={coordinate} />
					</View>
				)}

				<View>
					<ButtonListItem
						iconName="map-pin"
						label="Ubah Lokasi"
						onPress={() => {
							close();
							setTimeout(() => router.push('/mapPicker'), 150);
						}}
					/>
					<ButtonListItem
						iconName="edit-3"
						label="Ubah Nama Lokasi"
						onPress={() => {
							close();
							addressDialog.open();
						}}
					/>
					<ButtonListItem
						iconName="trash"
						label="Hapus Lokasi"
						onPress={() => {
							close();
							setTimeout(() => onChange(null), 150);
						}}
					/>
				</View>
			</View>
		</FloatingBottomSheet>
	);
}

function LocationMapView({
	coordinate,
	opened,
}: {
	coordinate: Position;
	opened: boolean;
}) {
	const ref = useRef<MapView>(null);
	const rendered = useRenderWhenOnceOpened(opened);

	return (
		<Mapbox.MapView
			ref={ref}
			scaleBarEnabled={false}
			logoEnabled={false}
			scrollEnabled={false}
			pitchEnabled={false}
			rotateEnabled={false}
			zoomEnabled={false}
			attributionEnabled={false}
			style={{ flex: 1, pointerEvents: 'auto' }}
		>
			<Mapbox.Camera
				animationMode="none"
				centerCoordinate={coordinate}
				zoomLevel={14}
			/>
			<Mapbox.PointAnnotation
				id="marker-1"
				coordinate={coordinate}
				children={<View />}
			/>
		</Mapbox.MapView>
	);
}
