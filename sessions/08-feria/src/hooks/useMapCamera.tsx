import { RefObject, useCallback } from "react";
import MapView from 'react-native-maps';

export const useMapCamera = (mapRef: RefObject<MapView | null>) => {
    const centerOn = useCallback((lat: number, lng: number, animate = true) => {
        const region = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        };
        if (animate) {
            mapRef.current?.animateToRegion(region, 600);
        } else {
            mapRef.current?.animateToRegion(region);
        }
    }, []);
    return { centerOn }
}