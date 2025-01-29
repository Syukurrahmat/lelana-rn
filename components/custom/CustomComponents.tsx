import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export function MyTouchableOpacity(props: TouchableOpacityProps) {
	return <TouchableOpacity activeOpacity={0.6} {...props} />;
}
