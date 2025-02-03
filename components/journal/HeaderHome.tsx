import { Card, H2, H5, Stack, View } from 'tamagui';
import { TextStyled } from '../custom/CustomComponents';

export default function HeaderHome() {
	return (
		<View p="$4" gap="$4">
			<Stack gap="$2">
				<H2>Selamat Pagi</H2>
				<TextStyled>
					Here&apos;s a basic starter to show navigating from one screen to
					another.
				</TextStyled>
			</Stack>
			<Card theme="blue" p="$4" gap="$2" elevation="$0.25">
				<H5 fontWeight={600}>Kata Kata Hari ini</H5>
				<TextStyled lineHeight="$4">
					Lorem ipssum dolor sit, amet consectetur adipisicing elit. Esse
					tempora sint veniam omnis, tempore culpa quasi hic corrupti
					asperiores. Provident aliquam sequi quaerat, fugit nihil ipsum
					deleniti velit aperiam deserunt?
				</TextStyled>
			</Card>
		</View>
	);
}
