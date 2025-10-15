import * as Location from 'expo-location';
import { LocationCoord } from '../types';

export const ensureForegroundPermission =
    async () => {
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status === 'granted') {
            return true;
        }
        const req = await Location.requestForegroundPermissionsAsync();
        return req.status === 'granted';
    }

export const getCurrentLocation = async () => {
    const granted = await ensureForegroundPermission();
    if(!granted) {
        return null;
    }
    const current = await
        Location.getCurrentPositionAsync(
            { accuracy: Location.Accuracy.High });
    return current.coords as LocationCoord;
}