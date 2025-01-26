import { useCallback, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

type initialValues = {
	opened: boolean;
	posision: number;
};

export function useSheetDisclousure(initialValues: initialValues) {
	const [opened, _setOpened] = useState(initialValues.opened);
	const [position, setPosition] = useState(initialValues.posision);

	const backHandler = useCallback(() => {
		close();
		return true;
	}, [])

	const open = () => {
		BackHandler.addEventListener('hardwareBackPress', backHandler);
		_setOpened(true);
	};

	const close = () => {
		BackHandler.removeEventListener('hardwareBackPress', backHandler);
		_setOpened(false);
		setPosition(initialValues.posision)
	};

	const setOpened = (val: boolean) => {
		val ? open() : close();
	}

	useEffect(() => {
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', backHandler);
		};
	}, []);

	return { position, opened, setPosition, setOpened, }
}
