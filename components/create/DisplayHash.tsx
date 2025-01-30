import Tags from '@/components/Badge';
import { CreateFormValues } from '@/context/CreateFormContext';
import { useSheetDisclousure } from '@/hooks/useSheetDisclousure';
import { HStack, View } from '@gluestack-ui/themed';
import { UseControllerReturn } from 'react-hook-form';
import { MyTouchableOpacity, ThemedIcon } from '../custom/CustomComponents';

type DisplayTagsProps = UseControllerReturn<CreateFormValues, 'tags'> &
	ReturnType<typeof useSheetDisclousure>;

export function DisplayTags(props: DisplayTagsProps) {
	const { field, open } = props;
	const { value } = field;

	if (!value.length) return null;

	return (
		<View px="$4">
			<MyTouchableOpacity onPress={open}>
				<HStack gap="$2" alignItems="flex-start">
					<View mt={3}>
						<ThemedIcon name="hash" color="$primary500" size={18} />
					</View>
					<HStack gap="$2" flexWrap="wrap" flex={1}>
						{value.map((e) => (
							<Tags key={e} children={e} />
						))}
					</HStack>
				</HStack>
			</MyTouchableOpacity>
		</View>
	);
}
