import { CreateFormValues } from '@/context/CreateFormContext';
import { Button, ButtonText, View } from '@gluestack-ui/themed';
import Mapbox from '@rnmapbox/maps';
import { router } from 'expo-router';
import React, { forwardRef, useRef } from 'react';
import { UseControllerReturn } from 'react-hook-form';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { TextStyled, ThemedIcon } from '../custom/CustomComponents';

type LocationSheetProps = UseControllerReturn<CreateFormValues, 'location'>;

export const LocationSheet = forwardRef<ActionSheetRef, LocationSheetProps>(
	function LocationSheet(props, ref) {
		const { field } = props;
		const { value, onChange } = field;

		return (
			<View>
				<ActionSheet
					ref={ref}
					overdrawEnabled
					headerAlwaysVisible
					gestureEnabled
				>
					<View px="$4">
						<TextStyled fontWeight="bold" fontSize="$md">
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
							children={<ThemedIcon name="map-pin" size={18} />}
							// children="Ubah Lokasi"
							onPress={() => {
								// close();
								setTimeout(() => router.push('/mapPicker', {}), 200);
							}}
						/>
						<Button
							children={<ThemedIcon name="edit-3" size={18} />}
							// children="Ubah Nama Lokasi"
							onPress={() => {}}
						/>
						<Button
							// br="$0"
							// bg="white"
							// h="$5"
							// jc="flex-start"
							// gap="$1"
							children={<ThemedIcon name="trash" size={18} />}
							// children="Hapus Lokasi"
							onPress={() => {
								// close();
								setTimeout(() => onChange(null), 200);
							}}
						/>
					</View>
				</ActionSheet>
			</View>
		);
	}
);
