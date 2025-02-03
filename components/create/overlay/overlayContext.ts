import { useSheetDisclousure } from '@/hooks/useSheetDisclousure';
import { createContext, useContext } from 'react';

export type DisclousureOverlayContextType = {
	addressDialog: ReturnType<typeof useSheetDisclousure>;
	tagSheet: ReturnType<typeof useSheetDisclousure>;
	locatonSheet: ReturnType<typeof useSheetDisclousure>;
};

export const DisclousureOverlayContext =
	createContext<DisclousureOverlayContextType>(null as any);

export const useDisclousureOverlay = () =>
	useContext(DisclousureOverlayContext);
