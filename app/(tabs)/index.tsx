import { Container, MyButtonIcon } from '@/components/custom/CustomComponents';
import { DailyJournalTitle } from '@/components/journal/DailyJournal';
import { Entry } from '@/components/journal/Entry';
import HeaderHome from '@/components/journal/HeaderHome';
import { router } from 'expo-router';
import { useState } from 'react';
import { SectionList } from 'react-native';
import { View } from 'tamagui';

const getDummyImage = (w: number, h: number) => ({
	id: Math.floor(Math.random() * 1_000_000_000),
	width: w,
	height: h,
	imageUrl: `https://images.unsplash.com/photo-1696220833162-3c12027f7548?q=80&w=${w}&h=${h}&auto=format&fit=crop`,
});

export const data: JournalItem[] = [
	{
		id: 3,
		summary: 'ksksskk kkm\n\n\nsksk',
		entries: [
			{
				id: 7,
				content: '',
				datetime: '2025-01-19T04:44:00.000Z',
				createdAt: '2025-01-19T04:46:06.633Z',
				updatedAt: '2025-01-19T04:46:06.633Z',
				location: {
					address: 'Karangtalun, Sragen, Jawa Tengah, Jawa, Indonesia',
					id: 7,
				},
				images: [
					getDummyImage(1000, 780),
					getDummyImage(800, 880),
					getDummyImage(1000, 780),
					getDummyImage(800, 880),
				],
				tags: [],
			},
			{
				id: 6,
				content: 'qqq',
				datetime: '2025-01-19T03:32:00.000Z',
				createdAt: '2025-01-19T03:32:21.223Z',
				updatedAt: '2025-01-19T03:32:21.223Z',
				location: {
					address:
						'Kauman, Surakarta, Kecamatan Pasar Kliwon, Jawa Tengah, Jawa, 57118, Indonesia',
					id: 6,
				},
				images: [],
				tags: [],
			},
		],
		date: '2025-01-19',
		habits: [
			{
				id: 1,
				name: 'Hemat waktu ',
				color: '#82c91e',
				deletedAt: null,
				icon: 'clock',
			},
			{
				id: 3,
				name: 'olahraga',
				color: '#82c91e',
				deletedAt: null,
				icon: 'dumbbell',
			},
		],
	},
	{
		id: 1,
		summary: 'xixixix\n',
		entries: [
			{
				id: 2,
				content: 'mantap',
				datetime: '2025-01-12T04:41:00.000Z',
				createdAt: '2025-01-12T04:42:18.230Z',
				updatedAt: '2025-01-12T04:42:18.230Z',
				location: {
					address: 'Dukuh, Jawa Tengah, Jawa, 57554, Indonesia',
					id: 2,
				},
				images: [getDummyImage(400, 600), getDummyImage(700, 800)],
				tags: [],
			},
			{
				id: 3,
				content: 'oke lahh ',
				datetime: '2025-01-12T04:41:00.000Z',
				createdAt: '2025-01-12T04:42:39.866Z',
				updatedAt: '2025-01-12T04:42:39.866Z',
				location: {
					address: 'Dukuh, Jawa Tengah, Jawa, 57554, Indonesia',
					id: 3,
				},
				images: [],
				tags: [
					{ name: 'coba yaa ', id: 1 },
					{ name: 'kucing', id: 2 },
					{ name: 'bahagia', id: 3 },
				],
			},
			{
				id: 1,
				content: 'xixixi',
				datetime: '2025-01-12T04:41:00.000Z',
				createdAt: '2025-01-12T04:41:48.998Z',
				updatedAt: '2025-01-12T04:41:48.998Z',
				location: {
					address: 'Dukuh, Jawa Tengah, Jawa, 57554, Indonesia',
					id: 1,
				},
				images: [
					getDummyImage(800, 800),
					getDummyImage(800, 800),
					getDummyImage(1000, 800),
					getDummyImage(800, 800),
				],
				tags: [],
			},
			{
				id: 5,
				content: 'coba cobq\n\n',
				datetime: '2025-01-12T03:30:00.000Z',
				createdAt: '2025-01-19T03:31:55.275Z',
				updatedAt: '2025-01-19T03:31:55.275Z',
				location: {
					address:
						'Kauman, Surakarta, Kecamatan Pasar Kliwon, Jawa Tengah, Jawa, 57118, Indonesia',
					id: 5,
				},
				images: [],
				tags: [],
			},
		],
		date: '2025-01-12',
		habits: [
			{
				id: 1,
				name: 'Hemat waktu ',
				color: '#82c91e',
				deletedAt: null,
				icon: 'clock',
			},
			{
				id: 2,
				name: 'workout',
				color: '#82c91e',
				deletedAt: null,
				icon: 'briefcase',
			},
			{
				id: 3,
				name: 'olahraga',
				color: '#82c91e',
				deletedAt: null,
				icon: 'dumbbell',
			},
			{
				id: 4,
				name: 'sehat',
				color: '#7950f2',
				deletedAt: null,
				icon: 'pill',
			},
			{
				id: 5,
				name: 'pesta',
				color: '#7950f2',
				deletedAt: null,
				icon: 'party-popper',
			},
		],
	},
	{
		id: 2,
		summary: 'www',
		entries: [
			{
				id: 4,
				content: 'djdkdjk',
				datetime: '2025-01-08T03:30:00.000Z',
				createdAt: '2025-01-19T03:30:41.061Z',
				updatedAt: '2025-01-19T03:30:41.061Z',
				location: {
					address:
						'Kauman, Surakarta, Kecamatan Pasar Kliwon, Jawa Tengah, Jawa, 57118, Indonesia',
					id: 4,
				},
				images: [],
				tags: [],
			},
			{
				id: 41,
				content: 'djdkdjk',
				datetime: '2025-01-08T03:30:00.000Z',
				createdAt: '2025-01-19T03:30:41.061Z',
				updatedAt: '2025-01-19T03:30:41.061Z',
				location: {
					address:
						'Kauman, Surakarta, Kecamatan Pasar Kliwon, Jawa Tengah, Jawa, 57118, Indonesia',
					id: 4,
				},
				images: [],
				tags: [],
			},
		],
		date: '2025-01-08',
		habits: [
			{
				id: 3,
				name: 'olahraga',
				color: '#82c91e',
				deletedAt: null,
				icon: 'dumbbell',
			},
		],
	},
];

export default function Home() {
	const [reversedJournal, setReversedJournal] = useState<string[]>([]);

	const onJournalReverse = (date: string) => {
		setReversedJournal((prev) =>
			reversedJournal.includes(date)
				? prev.filter((e) => e !== date)
				: [...prev, date]
		);
	};

	const sections = data.map(({ entries, ...e }) => ({
		...e,
		data: reversedJournal.includes(e.date) ? [...entries].reverse() : entries,
	}));

	return (
		<Container position="relative">
			<SectionList
				ListHeaderComponent={<HeaderHome />}
				ListFooterComponent={<View height="$3" />}
				nestedScrollEnabled
				sections={sections}
				keyExtractor={(item) => item.id.toString()}
				renderSectionHeader={({ section: { date, summary, data } }) => (
					<DailyJournalTitle
						date={date}
						summary={summary}
						entryLength={data.length}
						isReversed={reversedJournal.includes(date)}
						onReverse={() => onJournalReverse(date)}
					/>
				)}
				renderItem={({ item, index, section }) => (
					<Entry entry={item} isLast={index === section.data.length - 1} />
				)}
			/>

			<MyButtonIcon
				pos="absolute"
				right="$4"
				bottom="$4"
				transparent={false}
				theme="blue"
				size="$5"
				borderWidth={1}
				borderColor="$blue8"
				shadowColor="$accent10"
				elevation="$0.5"
				background="initial"
				name="plus"
				onPress={() => router.push('/create')}
			/>
		</Container>
	);
}
