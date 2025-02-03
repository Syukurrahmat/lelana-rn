import { TextStyled, ThemedIcon } from '@/components/custom/CustomComponents'; //prettier-ignore
import { useCreateForm } from '@/context/CreateFormContext';
import React, { useEffect, useState } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { XStack } from 'tamagui';
import Collapsable from '../Collapsible';
import { MyTouchableOpacity } from '../custom/CustomComponents';
import { useDisclousureOverlay } from './overlay/overlayContext';

export function DisplayAddress({ ...props }: TouchableOpacityProps) {
	const { locatonSheet } = useDisclousureOverlay();
	const { watch } = useCreateForm();
	const location = watch('location');
	const [address, setAddress] = useState(location?.displayAddress);

	useEffect(() => {
		if (location?.address) setAddress(location.displayAddress);
	}, [location]);

	return (
		<Collapsable isOpen={!!location}>
			<MyTouchableOpacity onPress={() => locatonSheet.open()} {...props}>
				<XStack gap="$2.5" alignItems="center">
					<ThemedIcon name="map-pin" size={18} color="$color10" />
					<TextStyled
						flex={1}
						numberOfLines={1}
						color="$color10"
						children={address?.trim()}
					/>
				</XStack>
			</MyTouchableOpacity>
		</Collapsable>
	);
}
