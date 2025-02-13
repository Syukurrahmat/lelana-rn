import { createSystemFont } from '@tamagui/config/v4';

import {
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
    useFonts,
} from '@expo-google-fonts/poppins';

const FontMaps = {
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
}

const FONT_NAME = 'Poppins' as const

type FontFamily = keyof typeof FontMaps
type ReplacePrefix<T extends string, Prefix extends string> = T extends `${Prefix}_${infer Rest}` ? Rest : T;

type FontWeightName = ReplacePrefix<FontFamily, typeof FONT_NAME>
type FontRecord = Record<FontWeightName, FontFamily>

export const MyFonts: FontRecord = Object.keys(FontMaps).reduce((acc, key) => {
    const trimmedKey = key.replace(`${FONT_NAME}_`, "") as FontWeightName
    acc[trimmedKey] = key as FontFamily;
    return acc;
}, {} as FontRecord);

type TamaguiFontFaceConfigType = Record<number, { normal: FontFamily, italic: FontFamily }>

export const createFontArgument: Parameters<typeof createSystemFont>[number] = {
    font: {
        family: `${FONT_NAME}_400Regular`,
        face: {
            100: { normal: `${FONT_NAME}_100Thin`, italic: `${FONT_NAME}_100Thin_Italic` },
            200: { normal: `${FONT_NAME}_200ExtraLight`, italic: `${FONT_NAME}_200ExtraLight_Italic` },
            300: { normal: `${FONT_NAME}_300Light`, italic: `${FONT_NAME}_300Light_Italic` },
            400: { normal: `${FONT_NAME}_400Regular`, italic: `${FONT_NAME}_400Regular_Italic` },
            500: { normal: `${FONT_NAME}_500Medium`, italic: `${FONT_NAME}_500Medium_Italic` },
            600: { normal: `${FONT_NAME}_600SemiBold`, italic: `${FONT_NAME}_600SemiBold_Italic` },
            700: { normal: `${FONT_NAME}_700Bold`, italic: `${FONT_NAME}_700Bold_Italic` },
            800: { normal: `${FONT_NAME}_800ExtraBold`, italic: `${FONT_NAME}_800ExtraBold_Italic` },
            900: { normal: `${FONT_NAME}_900Black`, italic: `${FONT_NAME}_900Black_Italic` },
        } as TamaguiFontFaceConfigType,
        "weight": {
            "1": "100",
            "2": "200",
            "3": "300",
            "4": "400",
            "5": "500",
            "6": "600",
            "7": "700",
            "8": "800",
            "9": "900",
            "true": "300"
        },
    }
}

export const useMyFont = (): ReturnType<typeof useFonts> => {
    return useFonts(FontMaps)
}