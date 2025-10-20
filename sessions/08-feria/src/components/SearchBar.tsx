import React from "react";
import { View, TextInput, StyleSheet, Pressable, StyleProp, ViewStyle, TextInputProps } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type SearchBarProps = { 
    value: string; 
    onChange: (t: string) => void; 
    placeholder?: string;
    onClear?: () => void;
    style?: StyleProp<ViewStyle>;
    inputProps?: TextInputProps;
};

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder, onClear, style, inputProps }) => {
    const handleClear = () => {
        if (onClear) {
            onClear();
            return;
        }
        onChange("");
    };

    return (
        <View style={[styles.wrap, style]}>
            <Ionicons name="search" size={18} color="#64748b" style={styles.leadingIcon} />
            <TextInput 
                style={styles.input}
                value={value} 
                onChangeText={onChange} 
                placeholder={placeholder ?? "Buscar..."} 
                placeholderTextColor="#94a3b8"
                returnKeyType="search"
                clearButtonMode="never"
                {...inputProps}
            />
            {value.length > 0 && (
                <Pressable onPress={handleClear} hitSlop={8}>
                    <Ionicons name="close-circle" size={20} color="#94a3b8" />
                </Pressable>
            )}
        </View>
    );
};
const styles = StyleSheet.create({ 
    wrap: { 
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        borderRadius: 999,
        paddingVertical: 10,
        paddingHorizontal: 14,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 3
    },
    leadingIcon: {
        marginRight: 8
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#0f172a"
    }
});
