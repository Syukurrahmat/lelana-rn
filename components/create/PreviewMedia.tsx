import { useCreateForm } from '@/context/CreateFormContext';
import { getImageDimention, ImageDataWithDimention } from '@/libs/utils';
import { useFieldArray } from 'react-hook-form';
import {
	getVariableValue,
	Image,
	ScrollView,
	View,
	ViewProps,
	XStack,
} from 'tamagui';
import { MyButtonIcon } from '../custom/CustomComponents';

export function PreviewMedia(props: ViewProps) {
	const { control } = useCreateForm();
	const { fields: value, remove } = useFieldArray({ name: 'media', control });

	if (!value || !value.length) return null;

	const horizontalSpace = getVariableValue('$4', 'space') * 2;

	return (
		<View {...props}>
			<ScrollView horizontal py="$4" showsHorizontalScrollIndicator={false}>
				<XStack px="$4" gap="$2.5">
					{getImageDimention(value, horizontalSpace).map((e, index) => (
						<DisplayMedia
							key={e.uri}
							media={e}
							onRemove={() => remove(index)}
						/>
					))}
				</XStack>
			</ScrollView>
		</View>
	);
}

interface DisplayMediaProps {
	media: ImageDataWithDimention;
	onRemove: () => void;
}

function DisplayMedia({ media, onRemove }: DisplayMediaProps) {
	return (
		<View
			borderWidth={1}
			borderColor="$borderColorPress"
			overflow="hidden"
			borderRadius="$4"
			position="relative"
		>
			<Image
				width={media.width}
				height={media.height}
				alt="preview"
				source={media}
			/>
			<MyButtonIcon
				onPress={onRemove}
				pos="absolute"
				right="$2.5"
				top="$2.5"
				name="x"
				bg="$color5"
				circular
				size="$2"
				iconSize={18}
				transparent={false}
				elevation="$0.5"
				shadowColor="$color10"
			/>
		</View>
	);
}
