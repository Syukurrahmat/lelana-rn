import { TextStyled } from '@/components/custom/CustomComponents'; //prettier-ignore
import { CreateFormValues } from '@/context/CreateFormContext';
import { HStack } from '@gluestack-ui/themed';
import { TouchableOpacityProps } from 'react-native';
import Collapsable from '../Collapsible';
import { MyTouchableOpacity, ThemedIcon } from '../custom/CustomComponents';

type LocationPickerProps = TouchableOpacityProps & {
	location: CreateFormValues['location'];
};

export function AddressDisplay({ location, ...props }: LocationPickerProps) {
	return (
		<Collapsable isOpen={true}>
			<MyTouchableOpacity {...props}>
				<HStack gap="$2" alignItems="center">
					<ThemedIcon name="map-pin" size={18} color="$trueGray500" />
					<TextStyled
						lineHeight="$md"
						flex={1}
						numberOfLines={1}
						color="$trueGray500"
						children={location?.address}
					/>
				</HStack>
			</MyTouchableOpacity>
		</Collapsable>
	);
}
