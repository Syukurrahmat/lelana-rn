import axios from 'axios'

const GEOCODING_API = 'pk.e6d87e1c19dd81c6e6133b3420fcd179'

export const getAddressFromCoord = async (lat: number, lng: number) => {
    const e = await axios(`https://us1.locationiq.com/v1/reverse?key=${GEOCODING_API}&lat=${lat}&lon=${lng}&format=json`);
    return e.data.display_name;
};
