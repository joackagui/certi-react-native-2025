import React, { useEffect, useRef, useState, useCallback } from 'react';
import { StyleSheet, ActivityIndicator, Pressable, View, Platform, Alert, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../src/components/Search';
import { SearchBar } from '../../src/components/SearchBar';

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [jumping, setJumping] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso requerido', 'Activa el permiso de ubicación para centrar el mapa en tu posición.');
        setLoading(false);
        return;
      }

      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLocation(current);
      setLoading(false);

      centerOn(current.coords.latitude, current.coords.longitude, false);
    })();
  }, []);

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

  const goToMyLocation = useCallback(async () => {
    try {
      setJumping(true);
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        const req = await Location.requestForegroundPermissionsAsync();
        if (req.status !== 'granted') {
          Alert.alert('Sin permisos', 'No puedo acceder a tu ubicación.');
          setJumping(false);
          return;
        }
      }
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLocation(pos);
      centerOn(pos.coords.latitude, pos.coords.longitude, true);
    } catch (e) {
      Alert.alert('Error', 'No se pudo obtener tu ubicación.');
    } finally {
      setJumping(false);
    }
  }, [centerOn]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation
          showsMyLocationButton={Platform.OS === 'android'}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Estás aquí"
            />
          )}
        </MapView>
        <Search>
          <Text>Feria 16 de Julio</Text>
          <SearchBar value={searchText} onChange={setSearchText} />
        </Search>
        <Pressable
          onPress={goToMyLocation}
          style={({ pressed }) => [
            styles.fab,
            pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
          ]}
          android_ripple={{ color: 'rgba(0,0,0,0.1)', borderless: false }}
          accessibilityRole="button"
          accessibilityLabel="Ir a mi ubicación"
          testID="btn-my-location"
        >
          {jumping ? (
            <ActivityIndicator />
          ) : (
            <Ionicons name="locate" size={22} />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  map: { flex: 1 },

  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    height: 48,
    width: 48,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
});
