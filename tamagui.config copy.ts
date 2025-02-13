import defaultConfig, { createSystemFont } from '@tamagui/config/v4'
import { shorthands } from '@tamagui/shorthands'
import { createTamagui } from 'tamagui'
import { myThemes } from './theme/theme'
import { createFontArgument } from './theme/font'

const fonts = {
	body: createSystemFont({ ...createFontArgument, sizeLineHeight: (n) => n + 6 }),
	heading: createSystemFont({ ...createFontArgument, sizeLineHeight: (n) => n + 6, sizeSize: (n) => n * 1.4 }),
}

export const tamaguiConfig = createTamagui({
	...defaultConfig,
	themes: myThemes,
	fonts,
	shorthands: {
		...shorthands,
		radius: 'borderRadius',
	},
	settings: {
		...defaultConfig.settings,
		onlyAllowShorthands: false,
	}
})

export default tamaguiConfig
export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface TamaguiCustomConfig extends Conf { }
}