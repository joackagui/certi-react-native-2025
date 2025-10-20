import { Pressable, StyleSheet, Text } from 'react-native';
import { CategoryFilter } from '../data/categories';

type FilterProps = {
    cat: CategoryFilter;
    onToggle: (categoryName: CategoryFilter['name']) => void;
};

export const Filter = ({ cat, onToggle }: FilterProps) => (
    <Pressable
        style={[styles.chip, cat.active && styles.chipActive]}
        accessibilityRole="button"
        accessibilityState={{ selected: cat.active }}
        onPress={() => onToggle(cat.name)}
    >
        <Text style={[styles.text, cat.active && styles.textActive]}>{cat.name}</Text>
    </Pressable>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a'
    },
    chip: {
        backgroundColor: '#f1f5f9',
        borderColor: '#cbd5f5',
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        marginBottom: 8,
        shadowColor: '#0f172a',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2
    },
    chipActive: {
        backgroundColor: '#0ea5e9',
        borderColor: '#0284c7',
        shadowOpacity: 0.16,
        elevation: 4
    },
    textActive: {
        color: '#ffffff'
    }
});
