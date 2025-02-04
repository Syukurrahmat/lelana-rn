type CreateEntryForm = {
    content: string;
    date: string;
    time: string;
    images: File[];
    tags: string[];
    address?: string,
    coordinate?: MyLatLng
    section: CreateEntryFormSection
    coordinateEdited: boolean,
    userLocationIsLoading: boolean,
};

type MyLatLng = {
    lat: number,
    lng: number
}

type CreateEntryFormSection = 'main' | 'datepicker' | 'locationpicker'


type PlaceItem = {
    placeId: number
    licence: string
    name: string
    displayName: string
    lat: number
    lng: number
}

declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare module "*.css" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default any;
}



type JournalItem = {
    id: number
    date: string
    entries: EntryItem[]
    habits: JournalItemHabit[]
    summary?: string
}

type JournalItemHabit = {
    id: number,
    name: string,
    icon: string,
    color: string,
    deletedAt: string | null
}

type Summary = {
    id: number,
    content: string,
    createdAt: string,
    updatedAt: string
}
type EntryItem = {
    id: number
    content: string
    datetime: string
    location: {
        address: string
        id: number
    } | null
    images: {
        id: number,
        imageUrl: string
        width: number
        height: number
    }[]
    tags: { name: string, id: number }[]

    createdAt: string
    updatedAt: string
}


type EntryImageData = {
    id: number,
    uri: string;
    width: number;
    height: number;
}

type Habit = {
    id: number,
    name: string,
    color: string,
    icon: string,
    order: number,
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    isDones: boolean[]
}


interface CustomInputProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    error?: string;
}

interface ChildrenProps {
    children: ReactNode;
}


type ControledValueProps<T> = {
    value: T | null
    onChange?: (value: T) => void
}

type UseStateReturn<T> = [T, React.Dispatch<React.SetStateAction<T>>]