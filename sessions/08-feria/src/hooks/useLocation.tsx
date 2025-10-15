import { useState, useEffect} from 'react';
import { LocationCoord } from '../types';
import {  getCurrentLocation } from '../services/locationService';

export const useLocation = () => {
    const [location, setLocation] =
        useState<LocationCoord | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null >(null); 
    useEffect(() => {
        (async () => {
            try {
                const current = await getCurrentLocation();
                setLocation(current);
            } catch (e ) {
                setError(e instanceof Error ? e.message: String(e));
            } finally {
                setLoading(false);
            }
            // { accuracy: Location.Accuracy.High }
            // centerOn(current.coords.latitude, current.coords.longitude, false);
        })();
    }, []);
    return { location, setLocation, loading, error };
}