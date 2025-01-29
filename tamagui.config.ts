/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createAnimations } from "@tamagui/animations-react-native";
import { createInterFont } from "@tamagui/font-inter";
import { shorthands } from "@tamagui/shorthands";
import { shadows, themes, tokens, } from "@tamagui/themes";
import { createTamagui } from "tamagui";
import { defaultConfig } from '@tamagui/config/v4';


// const animations = createAnimations({
// 	bouncy: {
// 		type: "spring",
// 		damping: 10,
// 		mass: 0.9,
// 		stiffness: 100
// 	},
// 	lazy: {
// 		type: "spring",
// 		damping: 20,
// 		stiffness: 60
// 	},
// 	quick: {
// 		type: "spring",
// 		damping: 20,
// 		mass: 1,
// 		stiffness: 250
// 	}
// });

const headingFont = createInterFont()
const bodyFont = createInterFont();

const config = createTamagui({
	...defaultConfig,
	defaultTheme: 'light',
	shorthands,
	fonts: {
		heading: headingFont,
		body: bodyFont
	},
	themes,
	settings :undefined
});

// console.log(JSON.stringify(Object.keys(themes), null, 4))
// console.log(JSON.stringify(Object.keys(defaultConfig.themes), null, 4))

const dd = createTamagui({
	animations: defaultConfig.animations,
	defaultTheme: 'light',
	shouldAddPrefersColorThemes: false,
	themeClassNameOnRoot: false,
	shorthands,
	fonts: {
		heading: headingFont,
		body: bodyFont
	},
	themes,
	tokens,
	shadows,
});


export type AppConfig = typeof config;

declare module "tamagui" {
	interface TamaguiCustomConfig extends AppConfig { }
}

declare module "@tamagui/core" {
	interface TamaguiCustomConfig extends AppConfig { }
}
export default config