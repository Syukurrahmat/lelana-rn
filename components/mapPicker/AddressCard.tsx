import { TextStyled } from '@/components/custom/CustomComponents';
import { useCreateForm } from '@/context/CreateFormContext';
import { getAddressFromCoord } from '@/libs/geocoding';
import { Button, ButtonText, Card, HStack, Spinner } from '@gluestack-ui/themed';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';
import { router } from 'expo-router';
import React from 'react';

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
			<HStack minHeight={56} alignItems="center" gap="$2.5">
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

			<Button onPress={onSubmit}>
				<ButtonText>Pilih Lokasi </ButtonText>
			</Button>
		</Card>
	);
}
