import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
type FiltersProps = {
    cat: { name: string, active: boolean};
    index: number;
    selectCategory: (category: { name: string, active: boolean}) => void;
}
export const Filter = ({
    cat,
    index,
    selectCategory
}: FiltersProps) => {
    return (
        <Pressable key={`${cat.name}-${index}`}
            style={[styles.chip, cat.active && styles.chipActive]}
            onPress={() => { selectCategory(cat) }}>
            <Text style={styles.text}>{cat.name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        marginHorizontal: 5,
        marginVertical: 5,
        color: 'white'
    },
    chip: {
        backgroundColor: '#35adf2ff',
        borderRadius: 50,
        marginVertical: 3,
        marginHorizontal: 3,
        paddingHorizontal: 2
    },
    chipActive: {
        backgroundColor: '#0019b0',
    }
})