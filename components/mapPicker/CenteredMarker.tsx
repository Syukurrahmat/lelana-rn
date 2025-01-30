import { useAppContext } from '@/context/AppContext';
import { Image } from '@gluestack-ui/themed';
import React from 'react';

export default function CenteredMarker({ size = 45 }) {
	const { safeAreaDimention } = useAppContext();

	return (
		<Image
			borderWidth={1}
			style={{
				position: 'absolute',
				height: size,
				width: size,
				bottom: '50%',
				left: safeAreaDimention.width / 2 - size / 2,
			}}
			alt='centered marker'
			source={{ uri: require('@/assets/images/map-marker.png') }}
		/>
	);
}
