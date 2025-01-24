import Collapsable from '@/components/Collapsible';
import { IconButton } from '@/components/custom/CustomComponents';
import {
	Container,
	HStack,
	MyTouchableOpacity,
	TextStyled,
} from '@/components/custom/syledComponents';
import {
	useCameraPicker,
	useImagesLibraryPicker,
} from '@/components/PhotoPickerHook';

import { getUniqueArray } from '@/libs/utils';
import {
	Calendar,
	Camera,
	Hash,
	Image,
	MapPin,
	X,
} from '@tamagui/lucide-icons';
import { ImagePickerAsset, ImagePickerSuccessResult } from 'expo-image-picker';
import moment from 'moment';
import { useState } from 'react';
import { Button, View, SizableText, Spacer, Stack, TextArea } from 'tamagui';

export default function Create() {
	const [images, setImages] = useState<ImagePickerAsset[]>([]);

	const onPhotoAdded = (result: ImagePickerSuccessResult) => {
		setImages((prev) =>
			getUniqueArray([...prev, ...result.assets], 'fileName')
		);
	};
	const [expanded, setexpanded] = useState(false);

	const pickImage = useImagesLibraryPicker({ onPhotoAdded });
	const launchCamera = useCameraPicker({ onPhotoAdded });

	return (
		<Container>
			<Stack px="$4" flex={1}>
				<Stack gap="$2" py="$4">
					<MyTouchableOpacity>
						<HStack gap="$2">
							<Calendar size={20} color="$blue10" />
							<SizableText color="$blue10" fontWeight="500">
								{moment().format('DD MMMM YYYY, HH:mm')}
							</SizableText>
						</HStack>
					</MyTouchableOpacity>
					<MyTouchableOpacity>
						<HStack gap="$2" alignItems="flex-start">
							<MapPin size={20} color="$color9" mt="5" />
							<SizableText flex={1} numberOfLines={2} color="$color9">
								Karangtalun, Sragen, Jawa Tengah, Jawa, Indonesia
							</SizableText>
							<MyTouchableOpacity>
								<X size={18} />
							</MyTouchableOpacity>
						</HStack>
					</MyTouchableOpacity>
				</Stack>
				<Button onPress={() => setexpanded((e) => !e)}> lorem</Button>
				<Collapsable expanded={expanded}>
					<TextStyled>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
						rerum placeat odit labore veniam nam reprehenderit blanditiis
						temporibus. Blanditiis voluptatem similique, iure minima quos
						recusandae ipsa vel ducimus corrupti sint.
					</TextStyled>
				</Collapsable>
				<TextArea
					flex={1}
					autoFocus
					verticalAlign="top"
					bg="$backgroundTransparent"
					unstyled
					placeholder="Tulis Apa yang kamu lakukan sekarang"
				/>
			</Stack>
 
			<HStack
				px="$4"
				py="$2.5"
				gap="$2.5"
				borderBlockStartWidth={1}
				borderColor="$borderColor"
			>
				<IconButton onPress={launchCamera} icon={Camera} size="$3" />
				<IconButton onPress={pickImage} icon={Image} size="$3" />
				<IconButton icon={MapPin} size="$3" />
				<IconButton icon={Hash} size="$3" />
				<Spacer flex={1} />
				<Button theme="dark_blue">Buat</Button>
			</HStack>
		</Container>
	);
}
