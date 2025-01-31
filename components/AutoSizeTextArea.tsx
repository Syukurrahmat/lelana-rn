import { useToken } from '@gluestack-ui/themed';
import { forwardRef, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';

type AutoSizeTextAreaProps = Omit<Omit<TextInputProps, 'value'>, 'onChange'> &
	ControledValueProps<string> & { minHeight?: number };

export const AutoSizeTextArea = forwardRef<TextInput, AutoSizeTextAreaProps>(
	function AutoSizeTextArea(props, ref) {
		const {
			value,
			onChange,
			minHeight = 85,
			style,
			...textInputPops
		} = props;
		const [height, _setHeight] = useState(0);
		
		return (
			<TextInput
				multiline
				{...textInputPops}
				ref={ref}
				value={value || ''}
				onChangeText={onChange}
				textAlignVertical="top"
				style={[
					{
						height: height < minHeight ? minHeight : height,
						flex: 1,
						fontFamily: 'Inter',
						fontSize: useToken('fontSizes', 'md'),
					},
					style,
				]}
				onContentSizeChange={(e) => {
					if (value) _setHeight(e.nativeEvent.contentSize.height + 20);
				}}
			/>
		);
	}
);
