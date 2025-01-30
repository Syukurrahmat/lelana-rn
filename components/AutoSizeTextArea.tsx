import { useToken } from '@gluestack-ui/themed';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native';

export function AutoSizeTextArea(props: ControledValueProps<string>) {
	const { value, onChange } = props;
	const [height, _setHeight] = useState(0);

	return (
		<TextInput
			multiline
			autoFocus={!value}
			value={value}
			onChangeText={onChange}
			textAlignVertical="top"
			style={{
				height: height < 85 ? 85 : height,
				flex: 1,
				fontFamily: 'Inter',
				fontSize: useToken('fontSizes', 'md'),
			}}
			placeholder="Tulis Apa yang kamu lakukan sekarang"
			onContentSizeChange={(e) => {
				if (value) _setHeight(e.nativeEvent.contentSize.height + 20);
			}}
		/>
	);
}
