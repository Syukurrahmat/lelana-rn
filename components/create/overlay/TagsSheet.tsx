import Tags from '@/components/Badge';
import { BottomSheet } from '@/components/BottomSheet';
import { TextStyled, ThemedIcon } from '@/components/custom/CustomComponents';
import { CreateFormValues, useCreateForm } from '@/context/CreateFormContext';
import { useDebouncedValue } from '@/hooks/useDebounce';
import { combineAndGetUniqueArray } from '@/libs/utils';
import React, { memo, useEffect, useState } from 'react';
import { ControllerRenderProps, useController } from 'react-hook-form';
import { Button, ButtonProps, H4, Input, Sheet, View, XStack } from 'tamagui';
import { useDisclousureOverlay } from './overlayContext';

const dummyTags: { id?: number; name: string }[] = [
	{
		id: 1,
		name: 'Reflections',
	},
	{
		id: 2,
		name: 'Daily Thoughts',
	},
	{
		id: 3,
		name: 'Gratitude',
	},
	{
		id: 4,
		name: 'Goals',
	},
	{
		id: 5,
		name: 'Life Lessons',
	},
	{
		id: 6,
		name: 'Mood Tracker',
	},
	{
		id: 7,
		name: 'Dreams',
	},
	{
		id: 8,
		name: 'Memories',
	},
	{
		id: 9,
		name: 'Challenges',
	},
	{
		id: 10,
		name: 'Personal Growth',
	},
];

export function TagsSheet() {
	const { tagSheet } = useDisclousureOverlay();
	const { control } = useCreateForm();
	const { field } = useController({ control, name: 'tags' });
	const { opened, setOpened } = tagSheet;

	return (
		<BottomSheet
			open={opened}
			onOpenChange={setOpened}
			snapPointsMode="percent"
			snapPoints={[100]}
			withOverlay={false}
		>
			<InnerTagsSheet field={field} opened={opened} />
		</BottomSheet>
	);
}

type TagsSheetProps = {
	field: ControllerRenderProps<CreateFormValues, 'tags'>;
	opened: boolean;
};

const InnerTagsSheet = memo(function InnerTagsSheet(props: TagsSheetProps) {
	const { opened, field } = props;
	const { value, onChange } = field;

	const [selectedTags, setSelectedTag] = useState(value);
	const [searchValue, setSearchValue] = useState('');

	const tagList = dummyTags;

	const debouncedSearch = useDebouncedValue(searchValue, 100);

	const displayTagList = combineAndGetUniqueArray(
		tagList.map((e) => e.name),
		selectedTags
	).filter((e) => e.toLowerCase().includes(debouncedSearch.toLowerCase()));

	const addNewTag = () => {
		const tag = searchValue.trim();
		if (selectedTags.length >= 5 || !tag.length || selectedTags.includes(tag))
			return;
		setSelectedTag((prev) => [tag, ...prev]);
	};

	const appendTag = (tag: string) => {
		if (selectedTags.length >= 5) return;
		setSelectedTag((prev) => [tag, ...prev]);
	};

	const removeTag = (tag: string) => {
		setSelectedTag((prev) => prev.filter((e) => e !== tag));
	};

	useEffect(() => {
		if (!opened) {
			setTimeout(() => onChange(selectedTags));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opened]);

	return (
		<View pt="$3" bg="white" boc="red" h="98%">
			<View px="$4" gap="$3">
				<XStack ai="baseline" gap="$2">
					<H4>Tambah Tag</H4>
					<TextStyled color="$color10">(max 5)</TextStyled>
				</XStack>
				<Input
					value={searchValue}
					onChangeText={setSearchValue}
					placeholder="Tambah atau cari tags"
					submitBehavior="submit"
				/>
			</View>
			<View h="$6">
				{selectedTags.length ? (
					<Sheet.ScrollView
						horizontal
						flexShrink={1}
						flex={0}
						py="$4"
						h="100%"
						showsHorizontalScrollIndicator={false}
					>
						<XStack gap="$2.5" px="$4">
							{selectedTags.map((e) => (
								<Tags
									key={e}
									children={e}
									withCloseButton
									onClose={() => removeTag(e)}
								/>
							))}
						</XStack>
					</Sheet.ScrollView>
				) : (
					<View h="100%" px="$4" jc="center" ai="center">
						<TextStyled color="$color10">
							Belum Ada Tag yang dipilih
						</TextStyled>
					</View>
				)}
			</View>

			<Sheet.ScrollView flex={1}>
				<View pb="$3" px="$4" gap="$2">
					{displayTagList.map((tag) => (
						<SelectTagItem
							key={tag}
							tag={tag}
							isActive={selectedTags.includes(tag)}
							onAppend={() => appendTag(tag)}
							onRemove={() => removeTag(tag)}
						/>
					))}
					{Boolean(
						debouncedSearch.length &&
							!displayTagList.length &&
							displayTagList.every((e) => e !== debouncedSearch)
					) && (
						<Button
							color="$color9"
							onPress={addNewTag}
							variant="outlined"
							bw={1}
							icon={<ThemedIcon name="plus" />}
							justifyContent="flex-start"
							children={'Tambah ' + debouncedSearch}
						/>
					)}
				</View>
			</Sheet.ScrollView>
		</View>
	);
});

interface SelectTagItemProps {
	tag: string;
	isActive: boolean;
	onAppend: () => void;
	onRemove: () => void;
}

const activeProps: ButtonProps = {
	theme: 'blue',
	variant: undefined,
	iconAfter: <ThemedIcon name="check" size={18} color="$blue10" />,
};
const inActiveProps: ButtonProps = {
	theme: undefined,
	variant: 'outlined',
	iconAfter: undefined,
};

function SelectTagItem(props: SelectTagItemProps) {
	const { tag, isActive, onAppend, onRemove } = props;

	return (
		<Button
			key={tag}
			justifyContent="space-between"
			bw={1}
			children={tag}
			onPress={isActive ? onRemove : onAppend}
			{...(isActive ? activeProps : inActiveProps)}
		/>
	);
}
