import { defaultConfig } from '@tamagui/config/v4'
import { createAnimations } from "@tamagui/animations-react-native";
import { createInterFont } from "@tamagui/font-inter";
import { createMedia } from "@tamagui/react-native-media-driver";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { createTamagui } from "tamagui";

const animations = createAnimations({
	bouncy: {
		type: "spring",
		damping: 10,
		mass: 0.9,
		stiffness: 100
	},
	lazy: {
		type: "spring",
		damping: 20,
		stiffness: 60
	},
	quick: {
		type: "spring",
		damping: 20,
		mass: 1.05,
		stiffness: 250
	}
});

const headingFont = createInterFont({
	
})
const bodyFont = createInterFont();

const config = createTamagui({
	animations,
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
});

export type AppConfig = typeof config;

declare module "tamagui" {
	// overrides TamaguiCustomConfig so your custom types
	// work everywhere you import `tamagui`
	interface TamaguiCustomConfig extends AppConfig { }
}

declare module "@tamagui/core" {
	interface TamaguiCustomConfig extends AppConfig { }
}
export default config