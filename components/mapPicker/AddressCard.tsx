import { TextStyled } from '@/components/custom/CustomComponents';
import { useCreateForm } from '@/context/CreateFormContext';
import { getAddressFromCoord } from '@/libs/geocoding';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';
import { router } from 'expo-router';
import React from 'react';
import { Button, Card, Spinner, XStack } from 'tamagui';

interface AddressCardProps {
	address?: string;
	coordinate: Position;
}
export default function AddressCard({ address, coordinate }: AddressCardProps) {
	const form = useCreateForm();

	const onSubmit = async () => {
		const [lng, lat] = coordinate;
		address = address || (await getAddressFromCoord(lat, lng));

		form.setValue('location', {
			lat,
			lng,
			address,
			displayAddress: address,
		});

		router.back();
	};

	return (
		<Card gap="$3" p="$3" elevation="$1">
			<XStack minHeight={56} alignItems="center" gap="$2.5">
				{address ? (
					<TextStyled>{address}</TextStyled>
				) : (
					<>
						<Spinner size="small" color="gray" />
						<TextStyled>
							{[...coordinate]
								.map((e) => e.toPrecision(12))
								.reverse()
								.join(' ,')}
						</TextStyled>
					</>
				)}
			</XStack>

			<Button onPress={onSubmit}>Pilih Lokasi</Button>
		</Card>
	);
}
