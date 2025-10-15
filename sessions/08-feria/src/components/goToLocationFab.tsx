import { Pressable, StyleSheet, ActivityIndicator } from "react-native"
import { Ionicons } from '@expo/vector-icons';

export const GoToLocationFab = ({ goToMyLocation, jumping }) => {
    return (<Pressable
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
    </Pressable>);
}

const styles = StyleSheet.create({
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
})
