import { CreateFormValues } from '@/context/CreateFormContext';
import {
	View
} from '@gluestack-ui/themed';
import Mapbox from '@rnmapbox/maps';
import { router } from 'expo-router';
import React from 'react';
import { UseControllerReturn } from 'react-hook-form';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import ButtonListItem from '../ButtonListItem';
import { TextStyled } from '../custom/CustomComponents';

type LocationSheetProps = UseControllerReturn<CreateFormValues, 'location'> & {
	sheetRef: React.RefObject<ActionSheetRef>;
};

export function LocationSheet(props: LocationSheetProps) {
	const { field, sheetRef } = props;
	const { value, onChange } = field;

	const coordinate = value && [value.lng, value.lat];

	return (
		<View>
			<ActionSheet
				ref={sheetRef}
				overdrawEnabled
				headerAlwaysVisible
				indicatorStyle={{ width: '35%' }}
				gestureEnabled
				defaultOverlayOpacity={0.5}
				zIndex={-1}
			>
				<View pt="$3" pb="$6">
					<View px="$4">
						<TextStyled fontWeight="600" fontSize="$lg">
							{value?.address}
						</TextStyled>
					</View>

					{coordinate && (
						<View height={200}>
							<Mapbox.MapView
								scaleBarEnabled={false}
								logoEnabled={false}
								scrollEnabled={false}
								pitchEnabled={false}
								rotateEnabled={false}
								zoomEnabled={false}
								attributionEnabled={false}
								style={{ flex: 1, marginBlock: 16 }}
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
						</View>
					)}

					<View>
						<ButtonListItem
							iconName="map-pin"
							label="Ubah Lokasi"
							onPress={() => {
								sheetRef.current?.hide();
								setTimeout(() => router.push('/mapPicker'), 150);
							}}
						/>
						<ButtonListItem
							iconName="edit-3"
							label="Ubah Nama Lokasi"
							onPress={() => {
								// close();
								// setTimeout(() => router.push('/mapPicker', {}), 150);
							}}
						/>
						<ButtonListItem
							iconName="trash"
							label="Hapus Lokasi"
							onPress={() => {
								sheetRef.current?.hide();
								setTimeout(() => onChange(null), 150);
							}}
						/>
					</View>
				</View>
			</ActionSheet>
		</View>
	);
}
