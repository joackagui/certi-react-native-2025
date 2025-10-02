import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const ProductsScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Productos' }} />
      <Text style={styles.title}>Listado de productos</Text>
      <Text style={styles.copy}>Aquí aparecerán los productos disponibles.</Text>
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  copy: { textAlign: 'center', color: '#475569' },
});
