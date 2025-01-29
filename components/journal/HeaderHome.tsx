import { Card, H2, H5, Paragraph, View } from 'tamagui';
import { TextStyled } from '../custom/syledComponents';

export default function HeaderHome() {
	return (
		<View px="$4">
			<View py="$3" gap="$2">
				<H2>Selamat Pagi</H2>
				<TextStyled>
					Here&apos;s a basic starter to show navigating from one screen to
					another.
				</TextStyled>
			</View>
			<Card bg='$backgroundFocus' p='$3'>
				<H5>Kata Kata Hari ini</H5>
				<Paragraph lineHeight="$1" fontWeight="400">
					Lorem ipssum dolor sit, amet consectetur adipisicing elit. Esse
					tempora sint veniam omnis, tempore culpa quasi hic corrupti
					asperiores. Provident aliquam sequi quaerat, fugit nihil ipsum
					deleniti velit aperiam deserunt?
				</Paragraph>
			</Card>
		</View>
	);
}
