// import { ThemedIcon } from '@/components/Icon';
import AddressCard from '@/components/mapPicker/AddressCard';
import CenteredMarker from '@/components/mapPicker/CenteredMarker';
import { useAppContext } from '@/context/AppContext';
import { useCreateForm } from '@/context/CreateFormContext';
import { useAddressFromCoord } from '@/libs/geocoding';
import { Input } from '@gluestack-ui/themed';
import { Button, HStack, View } from '@gluestack-ui/themed';
import MapboxGL from '@rnmapbox/maps';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';
import { router } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';

const DEFAULT_COORD = [110.881503, -7.3749556];

export default function LocationPicker() {
	const form = useCreateForm();
	const { safeAreaDimention } = useAppContext();

	const [initialCoordinate, isDefinedBefore] = useMemo(() => {
		const { location } = form.getValues();

		return location
			? [[location.lng, location.lat], true]
			: [DEFAULT_COORD, false];
	}, []);

	const [selectedPos, setSelectedPos] = useState<Position>(initialCoordinate);
	const { address } = useAddressFromCoord(selectedPos[1], selectedPos[0]);
	const ref = useRef<MapboxGL.Camera>(null);

	const flyToUserLocation = async () => {
		const position = await MapboxGL.locationManager.getLastKnownLocation();
		if (!position || !ref.current) return;
		const { latitude, longitude } = position.coords;
		ref.current.flyTo([longitude, latitude], 300);
	};

	return (
		<View
			flex={1}
			position="relative"
			style={{ minHeight: safeAreaDimention.height }}
		>
			<MapboxGL.MapView
				id="map-picker"
				style={{ flex: 1 }}
				scaleBarEnabled={false}
				compassEnabled
				logoPosition={{ bottom: 160, left: 18 }}
				compassPosition={{ bottom: 230, right: 18 }}
				attributionEnabled={false}
				onMapIdle={(state) => setSelectedPos(state.properties.center)}
			>
				<MapboxGL.Camera
					ref={ref}
					zoomLevel={13}
					centerCoordinate={initialCoordinate}
					animationMode="none"
				/>
				<MapboxGL.UserLocation />
			</MapboxGL.MapView>

			<View p="$4" position="absolute" top={0} w="100%">
				<MapPickerHeader />
			</View>
			{/* 
			<Button
				bg="white"
				pos="absolute"
				right={18}
				bottom={170}
				aspectRatio={1}
				p={0}
				size="$5"
				onPress={flyToUserLocation}
			>
				<ThemedIcon name="target" size={24} />
			</Button> */}

			<CenteredMarker />

			<View p="$4" position="absolute" bottom={0} w="100%">
				<AddressCard address={address} coordinate={selectedPos} />
			</View>
		</View>
	);
}

function MapPickerHeader() {
	return (
		<HStack
			gap="$2"
			bg="white"
			elevation="$1"
			shadowColor="$background"
			borderRadius="$5"
		>
			<Button
				bg="white"
				aspectRatio={1}
				p="$1"
				onPress={() => router.back()}
			>
				{/* <ThemedIcon name="arrow-left" size={22} /> */}
			</Button>
			<Input p={0} bg="white" flex={1} />
		</HStack>
	);
}
