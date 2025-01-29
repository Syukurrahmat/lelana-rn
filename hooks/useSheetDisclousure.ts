/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Keyboard } from 'react-native';

type Options = {
	opened: boolean;
	posision?: number;
};

export function useSheetDisclousure(options: Options) {
	const [opened, _setOpened] = useState(options.opened);
	const [position, setPosition] = useState(options.posision);

	const backHandler = useCallback(() => {
		close();
		return true;
	}, [])

	const open = () => {
		BackHandler.addEventListener('hardwareBackPress', backHandler);
		Keyboard.dismiss()
		_setOpened(true);
	};

	const close = () => {
		BackHandler.removeEventListener('hardwareBackPress', backHandler);
		Keyboard.dismiss()
		_setOpened(false);
		setPosition(options.posision)
	};

	const setOpened = (val: boolean) => val ? open() : close();

	useEffect(() => {
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', backHandler);
		};
	}, []);

	return { position, opened, open, close, setPosition, setOpened, }
}
