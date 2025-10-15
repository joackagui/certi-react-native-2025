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
        top: 16,
        left: 12,
        right: 12,
        backgroundColor: "rgba(255,255,255,0.96)",
        borderRadius: 20,
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 6
    }
});