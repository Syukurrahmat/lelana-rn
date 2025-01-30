import { TextStyled, ThemedIcon } from '@/components/custom/CustomComponents';
import { useCreateForm } from '@/context/CreateFormContext';
import { useDatetimePicker } from '@/hooks/useDatetimePicker';
import moment from 'moment';
import { useController } from 'react-hook-form';
import { TouchableOpacityProps } from 'react-native';
// import { ThemedIcon } from '../Icon';
import { MyTouchableOpacity } from '../custom/CustomComponents';
import { HStack } from '@gluestack-ui/themed';

export function DatetimePicker(props: TouchableOpacityProps) {
	const { control } = useCreateForm();
	const { field } = useController({ control, name: 'datetime' });
	const { value, onChange } = field;

	const openDatetimePicker = useDatetimePicker(moment(value), (e) => {
		onChange(e.toDate());
	});

	return (
		<MyTouchableOpacity onPress={openDatetimePicker} {...props}>
			<HStack gap="$2" alignItems="center">
				<ThemedIcon name="calendar" size={18} color="$primary500" />
				<TextStyled color="$primary500" fontSize="$md" fontWeight="500">
					{moment(value).format('DD MMMM YYYY, HH:mm')}
				</TextStyled>
			</HStack>
		</MyTouchableOpacity>
	);
}
