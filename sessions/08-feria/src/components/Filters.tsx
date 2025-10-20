import { ScrollView, StyleSheet } from 'react-native';
import { CategoryFilter } from '../data/categories';
import React from 'react';
import { Filter } from './Filter';

type FiltersProps = {
    categories: CategoryFilter[];
    onToggle: (categoryName: CategoryFilter['name']) => void;
};

export const Filters: React.FC<FiltersProps> = ({ categories, onToggle }) => (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
    >
        {categories.map((category) => (
            <Filter
                key={category.name}
                cat={category}
                onToggle={onToggle}
            />
        ))}
    </ScrollView>
);

const styles = StyleSheet.create({
    content: {
        paddingTop: 4,
        paddingBottom: 2,
        paddingHorizontal: 2,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
