import {
	DatetimePicker,
	DisplayAddress,
	DisplayTags,
	PreviewMedia,
} from '@/components/create';
import FooterButtonList from '@/components/create/FooterButtonList';
import { OverlayContentProvider } from '@/components/create/overlay/OverlayContentProvider';
import { Container, MyButtonIcon } from '@/components/custom/CustomComponents';
import { useCreateForm } from '@/context/CreateFormContext';
import { useToastController } from '@tamagui/toast';
import { router } from 'expo-router';
import { Controller } from 'react-hook-form';
import { H3, ScrollView, Stack, View, XStack } from 'tamagui';
import { AutoSizeTextArea } from '../components/AutoSizeTextArea';

export default function Create() {
	const form = useCreateForm();
	const toast = useToastController();

	const onSubmit = form.handleSubmit((values) => {
		toast.show('Successfully saved!');
	});

	return (
		<Container>
			<OverlayContentProvider>
				<XStack
					px="$4"
					py="$2"
					borderBottomWidth={1}
					borderColor="$borderColorPress"
					bg="white"
					justifyContent="space-between"
					alignItems="center"
				>
					<H3 fontWeight={700}>Buat Entri</H3>
					<MyButtonIcon
						iconSize={22}
						size="$3"
						onPress={() => router.back()}
						name="x"
					/>
				</XStack>
				<ScrollView>
					<View px="$4" pt="$4" gap="$2.5">
						<Stack mb="$3">
							<DatetimePicker />
							<DisplayAddress style={{ paddingTop: 12 }} />
						</Stack>
						<Controller
							control={form.control}
							name="content"
							render={({ field }) => (
								<AutoSizeTextArea
									autoFocus={!field.value}
									placeholder="Tulis Apa yang kamu lakukan sekarang"
									{...field}
								/>
							)}
						/>
					</View>
					<PreviewMedia />

					<DisplayTags />
				</ScrollView>

				<FooterButtonList onSubmit={onSubmit} />
			</OverlayContentProvider>
		</Container>
	);
}
