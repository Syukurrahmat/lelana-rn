import Badge from '@/components/Badge';
import Collapsable from '@/components/Collapsible';
import { HStack } from '@/components/custom/syledComponents';
import { Hash } from '@tamagui/lucide-icons';
import { useState, useRef, useEffect } from 'react';
import { TextInput } from 'react-native';
import { Input } from 'tamagui';

interface TagInputProps {
	openedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
	onFocus?: () => void;
}
export default function TagInput({ openedState, onFocus }: TagInputProps) {
	const [opened, setOpened] = openedState;

	const maxPills = 5;

	const [text, setText] = useState('');
	const [pills, setPills] = useState<string[]>([]);

	const inputRef = useRef<TextInput>(null);

	const addPill = () => {
		if (text.trim() && !pills.includes(text.trim())) {
			setPills([...pills, text.trim()]);
			setText('');
		}
	};

	const removePill = (pill: string) => {
		setPills(pills.filter((item) => item !== pill));
	};

	useEffect(() => {
		if (opened) inputRef.current?.focus();
	}, [opened]);

	return (
		<Collapsable isOpen={opened}>
			<HStack w="100%" gap="$2" alignItems="flex-start">
				<Hash color="$blue9" size={20} mt="3" />
				<HStack gap="$2" flexWrap="wrap" flex={1}>
					{pills.map((e) => (
						<Badge
							key={e}
							withCloseButton
							onClose={() => removePill(e)}
							children={e}
						/>
					))}
					{pills.length < maxPills && (
						<Input
							flex={1}
							ref={inputRef}
							px="0"
							py="$1"
							color="$blue10"
							fontFamily="$body"
							minWidth="100"
							unstyled
							onKeyPress={({ nativeEvent: { key } }) => {
								if (key === 'Backspace' && text.length == 0) {
									setPills((e) => e.slice(0, -1));
								}
							}}
							onBlur={() => {
								if (pills.length == 0) setOpened(false);
							}}
							onFocus={onFocus}
							onSubmitEditing={addPill}
							value={text}
							onChangeText={(value) => setText(value)}
							placeholder="Tambah Tag"
							placeholderTextColor="$blue7"
							submitBehavior="submit"
						/>
					)}
				</HStack>
			</HStack>
		</Collapsable>
	);
}
