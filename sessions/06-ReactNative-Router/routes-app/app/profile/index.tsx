import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Perfil' }} />
      <Text style={styles.title}>Perfil de usuario</Text>
      <Text style={styles.copy}>TATA QUISPE.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  copy: { textAlign: 'center', color: '#475569' },
});
