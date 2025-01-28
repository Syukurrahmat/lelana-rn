import { CreateFormValues } from '@/context/CreateFormContext';
import { useDebouncedValue } from '@/hooks/useDebounce';
import { combineAndGetUniqueArray } from '@/libs/utils';
import { Check, Plus } from '@tamagui/lucide-icons';
import React, { memo, useEffect, useRef, useState } from 'react';
import { UseControllerReturn } from 'react-hook-form';
import { Input, ListItem, ListItemProps, View } from 'tamagui';
import Badge from '../Badge';
import { BottomSheet } from '../BottomSheet';
import { HStack, TextStyled } from '../custom/syledComponents';

interface LocationSheetProps
	extends UseControllerReturn<CreateFormValues, 'tags'> {
	opened: boolean;
	setOpened: (v: boolean) => void;
}

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

export function TagsSheet(props: LocationSheetProps) {
	const { opened, setOpened } = props;

	return (
		<BottomSheet
			open={opened}
			onOpenChange={setOpened}
			snapPointsMode="percent"
			snapPoints={[98]}
			forceRemoveScrollEnabled={opened}
		>
			<InnerTagsSheet {...props} />
		</BottomSheet>
	);
}

const InnerTagsSheet = memo((props: LocationSheetProps) => {
	const { opened, field } = props;
	const { value, onChange } = field;

	const inputRef = useRef<Input>(null);

	const [selectedTags, setSelectedTag] = useState(value);
	const [searchValue, setSearchValue] = useState('');
	const tagList = dummyTags;

	const debouncedSearch = useDebouncedValue(searchValue, 200);

	const displayTagList = combineAndGetUniqueArray(
		tagList.map((e) => e.name),
		selectedTags
	)
		.filter((e) => e.toLowerCase().includes(debouncedSearch.toLowerCase()))
		.slice(0, 7);

	const addTag = () => {
		const tag = searchValue.trim();
		if (!tag.length || selectedTags.includes(tag)) return;
		setSelectedTag((prev) => [...prev, tag]);
	};

	const removeTags = (tag: string) => {
		setSelectedTag((prev) => prev.filter((e) => e !== tag));
	};

	const getItemProps = (tag: string): ListItemProps => {
		const isSelected = selectedTags.includes(tag);

		if (!isSelected) {
			return {
				onPress: () => setSelectedTag((prev) => [...prev, tag]),
			};
		}

		return {
			theme: 'blue_active',
			iconAfter: Check,
			onPress: () => removeTags(tag),
		};
	};

	useEffect(() => {
		if (opened) inputRef.current?.focus();
		else {
			setTimeout(() => onChange(selectedTags), 200);
		}
	}, [opened]);

	return (
		<View px="$4" gap="$4">
			<Input
				ref={inputRef}
				value={searchValue}
				onChangeText={setSearchValue}
				placeholder="Tambah atau cari tags"
				submitBehavior="submit"
			/>
			{!!selectedTags.length && (
				<HStack fw="wrap" rowGap="$2.5" columnGap="$2">
					{selectedTags.map((e) => (
						<Badge
							key={e}
							children={e}
							withCloseButton
							onClose={() => removeTags(e)}
						/>
					))}
				</HStack>
			)}

			<View pb="$3" gap="$2.5">
				{displayTagList.map((e) => (
					<ListItem
						key={e}
						br="$2"
						pressTheme
						bw={1}
						justifyContent="flex-start"
						title={e}
						{...getItemProps(e)}
					/>
				))}
				{Boolean(
					debouncedSearch.length &&
						!displayTagList.length &&
						displayTagList.every((e) => e !== debouncedSearch)
				) &&
					(debouncedSearch.length > 3 ? (
						<ListItem
							br="$2"
							pressTheme
							bw={1}
							icon={Plus}
							color="$color9"
							onPress={addTag}
							justifyContent="flex-start"
							title={
								<TextStyled color="$color9">
									Tambah {debouncedSearch}
								</TextStyled>
							}
						/>
					) : (
						<TextStyled ta="center" color="$color9">
							Tag Tidak ditemukan
						</TextStyled>
					))}
			</View>
		</View>
	);
});
