import { HStack, TextStyled } from '@/components/custom/syledComponents';
import { CreateFormValues } from '@/context/CreateFormContext';
import { useDatetimePicker } from '@/hooks/useDatetimePicker';
import { Calendar } from '@tamagui/lucide-icons';
import moment from 'moment';
import { UseControllerProps, useController } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';

export function DatetimePicker(
	props: UseControllerProps<CreateFormValues, 'datetime'>
) {
	const {
		field: { value, onChange },
	} = useController(props);

	const openDatetimePicker = useDatetimePicker(moment(value), (e) => {
		onChange(e.toDate());
	});

	return (
		<TouchableOpacity onPress={openDatetimePicker}>
			<HStack gap="$2">
				<Calendar size={20} color="$blue10" />
				<TextStyled color="$blue10" fontWeight="500">
					{moment(value).format('DD MMMM YYYY, HH:mm')}
				</TextStyled>
			</HStack>
		</TouchableOpacity>
	);
}
