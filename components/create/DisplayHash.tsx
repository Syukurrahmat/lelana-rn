import { useCreateForm } from '@/context/CreateFormContext';
import { View, XStack } from 'tamagui';
import {
	MyTouchableOpacity,
	TextStyled,
	ThemedIcon,
} from '../custom/CustomComponents';
import { useDisclousureOverlay } from './overlay/overlayContext';
import Tags from '../Badge';

export function DisplayTags() {
	const { watch } = useCreateForm();
	const { tagSheet } = useDisclousureOverlay();
	const value = watch('tags');

	if (!value.length) return null;

	return (
		<View px="$4">
			<MyTouchableOpacity onPress={tagSheet.open}>
				<XStack gap="$2.5" alignItems="flex-start">
					<View mt={3}>
						<ThemedIcon name="hash" color="$blue10" size={18} />
					</View>

					<XStack gap="$2" flexWrap="wrap" flex={1}>
						{value.map((e) => (
							<Tags key={e} children={e} />
						))}
					</XStack>
				</XStack>
			</MyTouchableOpacity>
		</View>
	);
}
