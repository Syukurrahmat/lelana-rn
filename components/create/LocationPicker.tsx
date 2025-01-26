import { CreateFormValues } from '@/context/CreateFormContext';
import { useSheetDisclousure } from '@/hooks/useSheetDisclousure';
import { Edit3, MapPin, Trash2 } from '@tamagui/lucide-icons';
import React from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import MapView, { Marker } from 'react-native-maps';
import { Input, ListItem, View, YStack } from 'tamagui';
import { BottomSheet } from '../BottomSheet';
import { MyTouchableOpacity } from '../custom/CustomComponents';
import { HStack, TextStyled } from '../custom/syledComponents';

export function LocationSheet(
	props: UseControllerProps<CreateFormValues, 'location'>
) {
	const {
		field: { value, onChange },
	} = useController(props);

	const { position, setPosition, setOpened, opened } = useSheetDisclousure({
		opened: false,
		posision: 0,
	});

	return (
		<>
			<MyTouchableOpacity
				style={{ marginTop: 12 }}
				onPress={() => setOpened(true)}
			>
				<HStack gap="$2">
					<MapPin size={20} color="$color9" />
					<TextStyled
						lineHeight="$1"
						flex={1}
						numberOfLines={1}
						color="$color9"
					>
						{value?.address || [value?.lat, value?.lng].join(' , ')}
					</TextStyled>
				</HStack>
			</MyTouchableOpacity>
			<BottomSheet
				open={opened}
				defaultPosition={1}
				onOpenChange={setOpened}
				snapPoints={[430]}
				snapPointsMode="constant"
				forceRemoveScrollEnabled={opened}
				position={position}
				onPositionChange={setPosition}
				contentWrapperProps={{
					borderColor: 'red',
				}}
			>
				{value && (
					<MapView
						pitchEnabled={false}
						zoomEnabled={false}
						scrollEnabled={false}
						rotateEnabled={false}
						toolbarEnabled={false}
						showsCompass={false}
						region={{
							latitude: value.lat,
							longitude: value.lng,
							latitudeDelta: 0.01,
							longitudeDelta: 0.01,
						}}
						style={{
							height: 160,
							width: '100%',
						}}
					>
						<Marker
							coordinate={{
								latitude: value.lat,
								longitude: value.lng,
							}}
						/>
					</MapView>
				)}
				<View px="$3" gap="$0">
					<TextStyled fontSize="$4" my="$4">
						{value?.address}
					</TextStyled>
					<YStack gap="$2" theme="light_blue">
						<ListItem
							br="$2"
							pressTheme
							bw={1}
							justifyContent="flex-start"
							icon={MapPin}
							title="Ubah Lokasi"
						/>

						<ListItem
							pressTheme
							br="$2"
							bw={1}
							justifyContent="flex-start"
							icon={Edit3}
							title="Ubah Nama Lokasi"
						/>

						<ListItem
							pressTheme
							br="$2"
							bw={1}
							justifyContent="flex-start"
							icon={Trash2}
							title="Hapus Lokasi"
						/>
					</YStack>
					<Input/>

					{/* <Text>
					{JSON.stringify(value, null, 4)} Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Maxime reiciendis neque odio, qui
					perspiciatis quidem culpa, amet vitae repudiandae, dicta
					exercitationem dist inctio. Placeat consequatur magni, aliquam
					alias laboriosam voluptatem exercitationem?
				</Text> */}
				</View>
			</BottomSheet>
		</>
	);
}
