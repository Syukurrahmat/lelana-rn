import { TextStyled, ThemedIcon } from '@/components/custom/CustomComponents';
import { useCreateForm } from '@/context/CreateFormContext';
import { useDatetimePicker } from '@/hooks/useDatetimePicker';
import moment from 'moment';
import { useController } from 'react-hook-form';
import { TouchableOpacityProps } from 'react-native';
 import { XStack } from 'tamagui';
import { MyTouchableOpacity } from '../custom/CustomComponents';

export function DatetimePicker(props: TouchableOpacityProps) {
	const { control } = useCreateForm();
	const { field } = useController({ control, name: 'datetime' });
	const { value, onChange } = field;

	const openDatetimePicker = useDatetimePicker(moment(value), (e) => {
		onChange(e.toDate());
	});

	return (
		<MyTouchableOpacity onPress={openDatetimePicker} {...props}>
			<XStack gap="$2.5" alignItems="center">
				<ThemedIcon name="calendar" size={18} color="$blue10" />
				<TextStyled color="$blue10">
					{moment(value).format('DD MMMM YYYY, HH:mm')}
				</TextStyled>
			</XStack>
		</MyTouchableOpacity>
	);
}
