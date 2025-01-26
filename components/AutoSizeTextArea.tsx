import { useState } from 'react';
import { Input, View } from 'tamagui';

export function AutoSizeTextArea(props: ControledValueProps<string>) {
	const { value, onChange } = props;
	const [height, setHeight] = useState(0);

	return (
		<Input
			autoFocus
			multiline
			fontFamily="$body"
			value={value}
			onChangeText={onChange}
			verticalAlign="top"
			bg="$backgroundTransparent"
			unstyled
			h={height < 50 ? 50 : height}
			placeholder="Tulis Apa yang kamu lakukan sekarang"
			onContentSizeChange={(e) =>
				setHeight(e.nativeEvent.contentSize.height + 10)
			}
		/>
	);
}
