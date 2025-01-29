import { useCreateForm } from '@/context/CreateFormContext';
import { getImageDimention } from '@/libs/utils';
import { useFieldArray } from 'react-hook-form';
import { Image, ScrollView, View, ViewProps, XStack } from 'tamagui';
import { CloseButton } from '../Icon';

export function PreviewMedia(props: ViewProps) {
	const { control } = useCreateForm();
	const { fields: value, remove } = useFieldArray({ name: 'media', control });

	if (!value || !value.length) return null;

	return (
		<View {...props}>
			<ScrollView horizontal py="$4" showsHorizontalScrollIndicator={false}>
				<XStack px="$4" gap="$2">
					{getImageDimention(value, ['$4', '$4']).map((e, index) => (
						<View
							key={e.uri}
							borderWidth={1}
							borderColor="$gray5"
							overflow="hidden"
							borderRadius="$4"
							pos="relative"
						>
							<Image width={e.width} height={e.height} src={e.uri} />
							<CloseButton
								onPress={() => remove(index)}
								pos="absolute"
								right="$2.5"
								elevation="$0.5"
								shadowColor="$color10"
								top="$2.5"
							/>
						</View>
					))}
				</XStack>
			</ScrollView>
		</View>
	);
}
