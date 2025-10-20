import React from "react";
import { View, StyleSheet } from "react-native";

export const Search: React.FC<{ children: React.ReactNode }>
    = ({ children }) => {
        return (
        <View style={styles.card}>
                {children}
        </View>);
    };
const styles = StyleSheet.create({
    card: {
        position: "absolute",
        top: 20,
        left: 16,
        right: 16,
        backgroundColor: "rgba(255,255,255,0.98)",
        borderRadius: 26,
        paddingHorizontal: 18,
        paddingVertical: 20,
        shadowColor: "#0f172a",
        shadowOpacity: 0.18,
        shadowRadius: 22,
        shadowOffset: { width: 0, height: 12 },
        borderColor: "rgba(148, 163, 184, 0.2)",
        borderWidth: 1,
        elevation: 12
    }
});
