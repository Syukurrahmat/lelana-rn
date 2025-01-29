import { getAddressFromCoord } from '@/libs/geocoding';
import MapboxGL from '@rnmapbox/maps';
import { ImagePickerAsset } from 'expo-image-picker';
import React, { useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

export type CreateFormValues = {
	datetime: Date;
	location: { lat: number; lng: number; address: string } | null;
	address: string | null;
	content: string;
	tags: string[];
	media: ImagePickerAsset[];
};

export const useCreateForm = () => useFormContext<CreateFormValues>();

export default function CreateFormProvider({ children }: ChildrenProps) {
	const form = useForm<CreateFormValues>({
		defaultValues: {
			datetime: new Date(),
			media: [],
			tags: ['coba', 'xixixi'],
			location: null,
			address: null,
		},
	});

	useEffect(() => {
		MapboxGL.locationManager.getLastKnownLocation().then(async (pos) => {
			if (pos) {
				const lat = pos.coords.latitude;
				const lng = pos.coords.longitude;
				const address = await getAddressFromCoord(lat, lng);
				form.setValue('location', { lat, lng, address });
			} else {
				form.setValue('location', null);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <FormProvider {...form} children={children} />;
}
