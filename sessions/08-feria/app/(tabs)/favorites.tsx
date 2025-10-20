import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text } from 'react-native';
import { FavoriteVendors } from '../../src/components/FavoriteVendors';

const FavoritesScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.title}>Tus favoritos</Text>
                <Text style={styles.subtitle}>
                    Guarda tus puestos preferidos y accede a ellos rápidamente.
                </Text>
            </View>
            <FavoriteVendors />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8fafc'
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0f172a'
    },
    subtitle: {
        marginTop: 6,
        fontSize: 14,
        color: '#475569'
    }
});

export default FavoritesScreen;
