import { GetThemeValueForKey } from "tamagui";

export const MAPBOX_ACCESS = 'pk.eyJ1Ijoic3l1a3VyeGl4aXhpeCIsImEiOiJjbTZmemJwd3QwYnNoMmtwd2h0a291a2JmIn0.kv1Jv6YILiDWgY2lvL3aww'
export const TABBAR_HEIGHT = 65

export const CALENDAR_DIMENTION = {
    headerHeight : 35,
    py : '$2' as GetThemeValueForKey<'paddingVertical'>,
    px : '$4' as GetThemeValueForKey<'paddingHorizontal'>,
    gap : '$2' as GetThemeValueForKey<'gap'>,
}