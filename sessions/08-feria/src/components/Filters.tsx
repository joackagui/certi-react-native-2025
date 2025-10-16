import { View, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/categories';
import React from 'react';
import { Filter } from './Filter';
export const Filters = () => {

    const selectCategory = (category: string) => {
        console.log('hiciste tap en ', category);
    }
    return (
        <View style={styles.container}>
            {
                CATEGORIES.length > 0 && CATEGORIES.map(
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