import { HStack, TextStyled } from '@/components/custom/syledComponents';
import { useCreateForm } from '@/context/CreateFormContext';
import { getAddressFromCoord } from '@/libs/geocoding';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';
import { router } from 'expo-router';
import React from 'react';

import { Button, Card, Spinner, View } from 'tamagui';

interface AddressCardProps {
	address?: string;
	coordinate: Position;
}
export default function AddressCard({ address, coordinate }: AddressCardProps) {
	const form = useCreateForm();

	const onSubmit = async () => {
		const [lng, lat] = coordinate;

		form.setValue('location', {
			lat,
			lng,
			address: address || (await getAddressFromCoord(lat, lng)),
		});

		router.back();
	};

	return (
		<Card gap="$3" p="$3" elevation="$1">
			<HStack minHeight={56} ai="center" gap="$2.5">
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
			</HStack>

			<Button
				children="Pilih lokasi"
				theme="blue_active"
				onPress={onSubmit}
			/>
		</Card>
	);
}
