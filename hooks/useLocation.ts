import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function useLocation() {
    const [isLoading, setIsloading] = useState(true);
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null
    );

    useEffect(() => {
        Location.requestForegroundPermissionsAsync()
            .then((e) =>
                e.status === 'granted' ? Location.getCurrentPositionAsync({}) : null
            )
            .then(setLocation)
            .finally(() => setIsloading(false));
    }, []);

    return { location, setLocation, isLoading }
};
