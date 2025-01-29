import Badge from '@/components/Badge';
import { MyTouchableOpacity } from '@/components/custom/CustomComponents';
import { HStack } from '@/components/custom/syledComponents'; //prettier-ignore
import { CreateFormValues } from '@/context/CreateFormContext';
import { useSheetDisclousure } from '@/hooks/useSheetDisclousure';
import { UseControllerReturn } from 'react-hook-form';
import { View } from 'tamagui'; //prettier-ignore
import { ThemedIcon } from '../Icon';

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
						<ThemedIcon name="hash" color="$blue10" size={20} />
					</View>
					<HStack gap="$2" flexWrap="wrap" flex={1}>
						{value.map((e) => (
							<Badge key={e} children={e} />
						))}
					</HStack>
				</HStack>
			</MyTouchableOpacity>
		</View>
	);
}
