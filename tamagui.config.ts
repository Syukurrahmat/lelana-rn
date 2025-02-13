import { createSystemFont, defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from '@tamagui/core';
import { shorthands } from "@tamagui/shorthands";
import { createFontArgument } from './theme/font';

const fonts = {
	body: createSystemFont({ ...createFontArgument, sizeLineHeight: (n) => n + 6 }),
	heading: createSystemFont({ ...createFontArgument, sizeLineHeight: (n) => n + 6, sizeSize: (n) => n * 1.4 }),
}

export const config = createTamagui({
	...defaultConfig,
	fonts,
	shorthands,
	settings: {
		...defaultConfig.settings,
		onlyAllowShorthands: false
	}
})


type Conf = typeof config

declare module '@tamagui/core' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface TamaguiCustomConfig extends Conf { }
}