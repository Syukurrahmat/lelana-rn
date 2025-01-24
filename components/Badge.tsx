import { ReactNode } from 'react';
import { SizableText, View } from 'tamagui';

export default function Badge({ children }: { children: ReactNode }) {
	return (
		<View
			bg="$blue3"
			borderRadius="$2"
			px="$2"
			borderWidth={1}
			borderColor="$blue8"
		>
			<SizableText
				textTransform="uppercase"
				color="$blue10Dark"
				fontSize="$1"
				fontWeight="bold"
				lineHeight="$1"
				children={children}
			/>
		</View>
	);
}
