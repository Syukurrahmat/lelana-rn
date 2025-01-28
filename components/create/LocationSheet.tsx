import { CreateFormValues } from '@/context/CreateFormContext';
import { Edit3, MapPin, Trash2 } from '@tamagui/lucide-icons';
import React, { memo } from 'react';
import { UseControllerReturn } from 'react-hook-form';
import MapView, { Marker } from 'react-native-maps';
import { ListItem, View } from 'tamagui';
import { BottomSheet } from '../BottomSheet';
import { TextStyled } from '../custom/syledComponents';

interface LocationSheetProps
	extends UseControllerReturn<CreateFormValues, 'location'> {
	opened: boolean;
	setOpened: (v: boolean) => void;
}

export function LocationSheet(props: LocationSheetProps) {
	const { opened, setOpened, field } = props;
	const { value } = field;


	
	return (
		<BottomSheet
			open={opened}
			onOpenChange={setOpened}
			snapPointsMode="fit"
			forceRemoveScrollEnabled={opened}
			contentWrapperProps={{
				borderColor: 'red',
			}}
		>
			<View px="$3">
				<TextStyled fontWeight="bold" fontSize="$5">
					{value?.address}
				</TextStyled>
			</View>
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
						flex: 1,
						height: 160,
						width: '100%',
						marginBlock: 12,
					}}
				>
					<Marker
						coordinate={{ latitude: value.lat, longitude: value.lng }}
					/>
				</MapView>
			)}

			<View px="$3" pb="$3" gap="$2.5">
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
			</View>
		</BottomSheet>
	);
}
