import { IconButton } from '@/components/custom/CustomComponents';
import { CreateFormValues } from '@/context/CreateFormContext';
import { getImageDimention } from '@/libs/utils';
import { X } from '@tamagui/lucide-icons';
import { UseControllerProps, useController } from 'react-hook-form';
import { View, ScrollView, XStack, Image } from 'tamagui';


export function PreviewMedia(
	props: UseControllerProps<CreateFormValues, 'media'>
) {
	const {
		field: { value, onChange },
	} = useController(props);

	const onItemDelete = (uri: string) => {
		onChange(value.filter((e) => e.uri !== uri));
	};

	if (!value || !value.length) return null;

	return (
		<View>
			<ScrollView horizontal py="$4" showsHorizontalScrollIndicator={false}>
				<XStack px="$4" gap="$2">
					{getImageDimention(value, ['$4', '$4']).map((e) => (
						<View
							key={e.uri}
							borderWidth={1}
							borderColor="$gray5"
							overflow="hidden"
							borderRadius="$4"
							pos="relative"
						>
							<Image width={e.width} height={e.height} src={e.uri} />
							<IconButton
								onPress={() => onItemDelete(e.uri)}
								bg="$gray5"
								size="$2"
								borderRadius="$10"
								iconSize={18}
								pos="absolute"
								right="$2.5"
								top="$2.5"
								icon={X} />
						</View>
					))}
				</XStack>
			</ScrollView>
		</View>
	);
}
