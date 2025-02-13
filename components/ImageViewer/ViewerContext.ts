import { createContext, useContext } from 'react';
import { GestureResponderEvent, View } from 'react-native';

export type AnimationStatus = 'entering' | 'caroseul' | 'exiting';

export type ViewerWrapperContextType = {
    thumbnailRef: React.MutableRefObject<(View | null)[]>;
    onThumnailClicked: (event: GestureResponderEvent, index: number) => void;
};

export type ViewerContextType = {
    images: EntryImageData[];

    transision: AnimationStatus;
    setTransition: React.Dispatch<React.SetStateAction<AnimationStatus>>;
    
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number | null>>;
    
    thumbBounds: MeasureInWindowReturn;
 };

export const ViewerContext = createContext<ViewerContextType>(null as any);
export const ViewerWrapperContext = createContext<ViewerWrapperContextType>(
    null as any
);

export const useViewerContext = () => useContext(ViewerContext);
export const useViewerWrapperContext = () => useContext(ViewerWrapperContext);
