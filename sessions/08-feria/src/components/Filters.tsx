import { Text, View, StyleSheet, Pressable } from 'react-native';
import { CATEGORIES } from '../data/categories';
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
                            <Pressable key={`${category}-${index}`} 
                                style={styles.chip}
                                onPress={() => { selectCategory(category) }}>
                                <Text style={styles.text}>{category}</Text>
                            </Pressable>
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
    },
    text: {
        marginHorizontal: 5,
        marginVertical: 5,
        color: 'white'
    },
    chip: {
        backgroundColor: '#0019b0',
        borderRadius: 50,
        marginVertical: 3,
        marginHorizontal: 3,
        paddingHorizontal: 2
    }
})