import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

type SearchBarProps = { 
    value: string; 
    onChange: (t: string) => void; 
    placeholder?: string 
    onClear?: () => void
};

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder, onClear }) => {
    return (
        <View style={styles.wrap}>
            <TextInput 
                style={styles.input} 
                value={value} 
                onChangeText={onChange} 
                placeholder={placeholder ?? "Buscar..."} 
                returnKeyType="search" />
        </View>
    );
};
const styles = StyleSheet.create({ 
    wrap: { 
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 3
    },
    input: {
        backgroundColor: "#f4f4f5",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14
    }
});
