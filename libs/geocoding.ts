import { MAPBOX_ACCESS } from '@/constant/constant';
import axios from 'axios'
import { useEffect, useState } from 'react';

const GEOCODING_API = MAPBOX_ACCESS

export const getAddressFromCoord = async (lat: number, lng: number) => {
    const e = await axios(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&limit=1&language=ID&access_token=${GEOCODING_API}`);
    return e.data.features[0].properties.full_address as string;
};


export const useAddressFromCoord = (lat: number, lng: number) => {
    const [address, setAddress] = useState<string>()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        setAddress(undefined)
        getAddressFromCoord(lat, lng).then(setAddress).finally(() => setLoading(false))
    }, [lat, lng])


    return { address, loading }
}

