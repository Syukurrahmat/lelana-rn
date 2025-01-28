import { getAddressFromCoord } from '@/libs/geocoding';
import { ImagePickerAsset } from 'expo-image-picker';
import * as Location from 'expo-location';
import { createContext, useContext, useEffect } from 'react';

type CreateForm = UseFormReturn<CreateFormValues, any, undefined>;
const CreateFormContext = createContext<CreateForm>(null as any);

import { useForm, UseFormReturn } from 'react-hook-form';

export type CreateFormValues = {
	datetime: Date;
	location: { lat: number; lng: number; address?: string } | null;
	content: string;
	tags : string[]
	media: ImagePickerAsset[];
};

export const useCreateForm = () => useContext(CreateFormContext);

export default function CreateFormProvider({ children }: ChildrenProps) {
	const form = useForm<CreateFormValues>({
		defaultValues: {
			datetime: new Date(),
			media: [],
			tags: [],
		},
	});

	useEffect(() => {
		Location.requestForegroundPermissionsAsync()
			.then((e) =>
				e.status === 'granted' ? Location.getCurrentPositionAsync({}) : null
			)
			.then(async (e) => {
				if (e) {
					const lat = e.coords.latitude;
					const lng = e.coords.longitude;
					const address = await getAddressFromCoord(lat, lng);
					form.setValue('location', { lat, lng, address },);
				} else {
					form.setValue('location', null);
				}
			});
	}, []);

	return <CreateFormContext.Provider value={form} children={children} />;
}
