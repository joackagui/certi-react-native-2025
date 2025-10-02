import React from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Inicio' }} />
      <Text style={styles.title}>Bienvenido a Routes App</Text>
      <Text style={styles.subtitle}>Esta es la ruta raíz registrada por Expo Router.</Text>
      <Link href="/profile" style={styles.link}>
        Ir al perfil →
      </Link>

      <Link href="/dashboard" style={styles.link}>
        Ir al Dashboard →
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: 24 },
  title: { fontSize: 28, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  subtitle: { textAlign: 'center', color: '#334155', marginBottom: 24 },
  link: { color: '#2563eb', fontWeight: '600', fontSize: 16 },
});
