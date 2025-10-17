import { View, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/categories';
import React, { useState } from 'react';
import { Filter } from './Filter';
export const Filters = () => {
    const [categories, setCategories] = useState(CATEGORIES);

    const selectCategory = (currentCategory: { name: string, active: boolean }) => {
        setCategories(categories.map((category) => {
            return (currentCategory.name === category.name) ?
                { name: category.name, active: !category.active } 
                : category;

        }))

    }
    return (
        <View style={styles.container}>
            {
                categories.length > 0 && categories.map(
                    (category, index) => {
                        return (
                            <Filter
                                cat={category}
                                index={index}
                                selectCategory={selectCategory}
                            />
                        )

                    }
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})