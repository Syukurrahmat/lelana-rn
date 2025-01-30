import { Card, Heading, View, VStack } from '@gluestack-ui/themed';
import { HeadingStyled, TextStyled } from '../custom/CustomComponents';

export default function HeaderHome() {
	return (
		<View p="$4" gap="$4">
			<VStack gap="$2">
				<HeadingStyled size="2xl">Selamat Pagi</HeadingStyled>
				<TextStyled>
					Here&apos;s a basic starter to show navigating from one screen to
					another.
				</TextStyled>
			</VStack>
			<Card variant="outline" borderColor="$blue200" bg="$blue50" p="$3">
				<HeadingStyled size="lg" mb="$1">
					Kata Kata Hari ini
				</HeadingStyled>
				<TextStyled>
					Lorem ipssum dolor sit, amet consectetur adipisicing elit. Esse
					tempora sint veniam omnis, tempore culpa quasi hic corrupti
					asperiores. Provident aliquam sequi quaerat, fugit nihil ipsum
					deleniti velit aperiam deserunt?
				</TextStyled>
			</Card>
		</View>
	);
}
