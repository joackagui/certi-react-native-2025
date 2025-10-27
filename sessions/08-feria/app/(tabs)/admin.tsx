import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AdminScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de administración</Text>
      <Text style={styles.subtitle}>
        Desde aquí podrás gestionar tiendas, usuarios y contenido exclusivo para administradores.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 16,
  },
  helper: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
});

export default AdminScreen;

