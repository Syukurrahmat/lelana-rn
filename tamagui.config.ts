/* eslint-disable @typescript-eslint/no-empty-object-type */
import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from '@tamagui/core';
import { createInterFont } from "@tamagui/font-inter";
import { shorthands } from "@tamagui/shorthands";

const headingFont = createInterFont()
const bodyFont = createInterFont();


export const config = createTamagui({
	...defaultConfig,
	fonts: {
		heading: headingFont,
		body: bodyFont
	},
	shorthands,
	settings: {
		...defaultConfig.settings,
		onlyAllowShorthands: false
	}
})


type Conf = typeof config

declare module '@tamagui/core' {
	interface TamaguiCustomConfig extends Conf { }
}