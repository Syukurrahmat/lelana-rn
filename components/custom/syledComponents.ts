import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, SizableText, Stack, styled, XStack, YStack } from "tamagui";

export const Container = styled(SafeAreaView, {
	name: "Container",
	flex: 1,
	backgroundColor: "$backgroundStrong"
});
 
export const HStack = styled(XStack, {
	name: 'HStack',
	alignItems : 'center',
	gap : '$true'
})

export const VStack = styled(YStack, {
	name: 'VStack',
	gap : '$true'
})

export const MyTouchableOpacity = styled(TouchableOpacity, {
	name: 'MyTouchableOpacity',
	activeOpacity : 0.7
})

export const TextStyled = styled(SizableText, {
	name: 'TextStyled',
})
 
 