import * as ImagePicker from 'expo-image-picker';

type useCameraPickerOpt = {
	onPhotoAdded?: (values: ImagePicker.ImagePickerSuccessResult) => void;
};

export function useCameraPicker(opt?: useCameraPickerOpt) {
	const launchCamera = async () => {
		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ['images', 'videos'],
			quality: 1,
			cameraType: ImagePicker.CameraType.back
		});

		if (result.canceled || !opt?.onPhotoAdded) return;
		opt.onPhotoAdded(result)
	};

	return launchCamera
}

export function useImagesLibraryPicker(opt?: useCameraPickerOpt) {
	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images', 'videos'],
			allowsMultipleSelection: true,
			quality: 1,
		});

		if (result.canceled || !opt?.onPhotoAdded) return;
		opt.onPhotoAdded(result)
	};

	return pickImage
}
