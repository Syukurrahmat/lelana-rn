import { useSheetDisclousure } from '@/hooks/useSheetDisclousure';
import React, { ReactNode } from 'react';
import { AnimatePresence, Overlay, Portal } from 'tamagui';
import { AddressModal } from './AddressDialog';
import { LocationSheet } from './LocationSheet';
import { DisclousureOverlayContext } from './overlayContext';
import { TagsSheet } from './TagsSheet';

export function OverlayContentProvider({ children }: { children: ReactNode }) {
	const locatonSheet = useSheetDisclousure({ opened: false });
	const tagSheet = useSheetDisclousure({ opened: false });
	const addressDialog = useSheetDisclousure({ opened: false });

	const overlayVisible =
		locatonSheet.opened || tagSheet.opened || addressDialog.opened;

	const closeOverlayContent = () => {
		locatonSheet.close();
		tagSheet.close();
		addressDialog.close();
	};

	return (
		<DisclousureOverlayContext.Provider
			value={{
				locatonSheet,
				tagSheet,
				addressDialog,
			}}
		>
			{children}

			<Portal>
				<AnimatePresence>
					{overlayVisible && (
						<Overlay
							key="overlay"
							onPress={closeOverlayContent}
							fullscreen
							bg="black"
							opacity={0.5}
							animation="quicker"
							bw={1}
							enterStyle={{ opacity: 0 }}
							exitStyle={{ opacity: 0 }}
						/>
					)}
				</AnimatePresence>
			</Portal>
			<AddressModal />
			<LocationSheet />
			<TagsSheet />
		</DisclousureOverlayContext.Provider>
	);
}
