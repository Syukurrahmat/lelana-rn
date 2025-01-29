import Collapsable from '@/components/Collapsible';
import { MyTouchableOpacity } from '@/components/custom/CustomComponents';
import { HStack, TextStyled } from '@/components/custom/syledComponents'; //prettier-ignore
import { CreateFormValues } from '@/context/CreateFormContext';
import { TouchableOpacityProps } from 'react-native';
import { Square } from 'tamagui';
import { ThemedIcon } from '../Icon';

type LocationPickerProps = TouchableOpacityProps & {
	location: CreateFormValues['location'];
};

export function AddressDisplay({ location, ...props }: LocationPickerProps) {
	return (
		<Collapsable isOpen={!!location}>
			<MyTouchableOpacity {...props}>
				<HStack gap="$2">
					<Square size={20}>
						<ThemedIcon name="map-pin" size={19} color="$color10" />
					</Square>
					<TextStyled
						lineHeight="$1"
						flex={1}
						numberOfLines={1}
						color="$color10"
						children={location?.address}
					/>
				</HStack>
			</MyTouchableOpacity>
		</Collapsable>
	);
}
