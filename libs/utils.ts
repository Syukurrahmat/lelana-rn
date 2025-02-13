import { Dimensions } from "react-native";

export function getUniqueArrayOfObj<T>(arr: T[], key: keyof T) {
	const seen = new Set();
	return arr.filter(item => {
		const value = item[key];
		if (seen.has(value)) {
			return false;
		}
		seen.add(value);
		return true;
	});
}

export function combineAndGetUniqueArray<T>(...args: T[][]) {
	return [...new Set([...args.flatMap(e => e)])]
}

export type ImageDataWithDimention = {
	id: number
	height: number;
	width: number;
	uri: string;
}

export function getImageDimention(imagesData: EntryImageData[], horizontalSpace: number): ImageDataWithDimention[] {
	if (imagesData.length === 0) return [];
	const isSingle = imagesData.length === 1;

	const dimension = Dimensions.get('window').width - horizontalSpace
	const maxW = isSingle ? dimension : dimension * 0.8
	const minW = dimension * 0.6

	const heightList = {
		allPortrait: 250,
		allLanscape: 200,
		mixed: 225,
		singleAddition: 100,
	}

	const isAllPortrait = imagesData.every(
		({ width, height }) => height > width
	);
	const isAllLanscape = imagesData.every(
		({ width, height }) => height <= width
	);

	let height = isAllPortrait
		? heightList.allPortrait
		: isAllLanscape
			? heightList.allLanscape
			: heightList.mixed

	if (isSingle) height += heightList.singleAddition

	return imagesData.map((e) => {
		const aspectRatio = e.height / e.width;
		const width = aspectRatio * height;

		return {
			height: height,
			width: width <= minW ? minW : width >= maxW ? maxW : width,
			uri: e.uri,
			id: e.id
		};
	});
}

export function shadeColor(color: string, amount: number) {
	return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}
