import { useCreateForm } from '@/context/CreateFormContext';
import { getImageDimention } from '@/libs/utils';
import { useFieldArray } from 'react-hook-form';
// import { CloseButton } from '../Icon';
import { ComponentProps } from 'react';
import { HStack, ScrollView, View } from '@gluestack-ui/themed';
import { Image } from '@gluestack-ui/themed';

export function PreviewMedia(props: ComponentProps<typeof View>) {
	const { control } = useCreateForm();
	const { fields: value, remove } = useFieldArray({ name: 'media', control });

	if (!value || !value.length) return null;

	return (
		<View {...props}>
			<ScrollView horizontal py="$4" showsHorizontalScrollIndicator={false}>
				<HStack px="$4" gap="$2">
					{getImageDimention(value, 16).map((e, index) => (
						<View
							key={e.uri}
							borderWidth={1}
							borderColor="$gray5"
							overflow="hidden"
							borderRadius="$sm"
							position="relative"
						>
							<Image width={e.width} height={e.height} alt='preview' source={e} />
							{/* <CloseButton
								onPress={() => remove(index)}
								pos="absolute"
								right="$2.5"
								elevation="$0.5"
								shadowColor="$color10"
								top="$2.5"
							/> */}
						</View>
					))}
				</HStack>
			</ScrollView>
		</View>
	);
}
