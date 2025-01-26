import {
	Container,
	TextStyled,
	VStack,
} from '@/components/custom/syledComponents';
import { DailyJournalTitle } from '@/components/journal/DailyJournal';
import { Entry } from '@/components/journal/Entry';
import { Plus } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { SectionList } from 'react-native';
import { Button, Card, H2, H5, Paragraph, ScrollView } from 'tamagui';

const getDummyImage = (w: number, h: number) => ({
	width: w,
	height: h,
	imageUrl: `https://images.unsplash.com/photo-1694308069570-41159e7bd4b1?q=80&w=${w}&h=${h}&auto=format&fit=crop`,
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
	const router = useRouter();

	return (
		<Container position="relative">
			<Button
				pos="absolute"
				bottom="$3"
				right="$3"
				zIndex={2000}
				theme="blue"
				borderWidth={1.5}
				borderColor="$blue6"
				onPress={() => router.push('/create')}
				icon={<Plus size={20} />}
			/>
			<ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
				<VStack px="$4">
					<VStack py="$3" gap="$2">
						<H2>Selamat Pagi</H2>
						<TextStyled>
							Here&apos;s a basic starter to show navigating from one
							screen to another.
						</TextStyled>
					</VStack>
					<Card bg="$backgroundFokus" p="$3">
						<H5>Kata Kata Hari ini</H5>
						<Paragraph lineHeight="$1" fontWeight="400">
							Lorem ipssum dolor sit, amet consectetur adipisicing elit.
							Esse tempora sint veniam omnis, tempore culpa quasi hic
							corrupti asperiores. Provident aliquam sequi quaerat, fugit
							nihil ipsum deleniti velit aperiam deserunt?
						</Paragraph>
					</Card>
				</VStack>
				<SectionList
					sections={data.map(({ entries, ...e }) => ({
						...e,
						data: entries,
					}))}
					keyExtractor={(item, index) => item.id.toString()}
					renderSectionHeader={({ section: { date, summary } }) => (
						<DailyJournalTitle date={date} summary={summary} />
					)}
					renderItem={({ item, index, section }) => (
						<Entry
							entry={item}
							isLast={index == section.data.length - 1}
						/>
					)}
				/>
			</ScrollView>
		</Container>
	);
}
