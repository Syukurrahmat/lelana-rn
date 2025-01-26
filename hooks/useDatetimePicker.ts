import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import moment, { Moment } from 'moment';

export const useDatetimePicker = (
	value: Moment,
	onChange: (value: Moment) => void
) => {
	const showDatePicker = () => {
		DateTimePickerAndroid.open({
			mode: 'date',
			is24Hour: true,
			value: value.toDate(),
			onChange: (event, date) => {
				if (!date) return;
				const valueMoment = moment(date);
				onChange(value.clone().set({
					year: valueMoment.year(),
					month: valueMoment.month(),
					date: valueMoment.date(),
				})
				);
				if (event.type === 'dismissed') return;
				showTimePicker();
			},
		});
	};

	const showTimePicker = () => {
		DateTimePickerAndroid.open({
			mode: 'time',
			is24Hour: true,
			value: value.toDate(),
			onChange: (_, date) => {
				if (!date) return;
				const valueMoment = moment(date);
				onChange(value.clone().set({
					hour: valueMoment.hour(),
					minute: valueMoment.minute(),
					millisecond: valueMoment.millisecond(),
				})
				);
			},
		});
	};

	return showDatePicker;
};
