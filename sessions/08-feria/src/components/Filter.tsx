import { Pressable, StyleSheet, Text} from 'react-native';
type FiltersProps = {
    cat: string;
    index: number;
    selectCategory : (category: string) => void;
}
export const Filter = ({
    cat,
    index,
    selectCategory
}: FiltersProps ) => {
    return (
        <Pressable key={`${cat}-${index}`}
            style={styles.chip}
            onPress={() => { selectCategory(cat) }}>
            <Text style={styles.text}>{cat}</Text>
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
        backgroundColor: '#0019b0',
        borderRadius: 50,
        marginVertical: 3,
        marginHorizontal: 3,
        paddingHorizontal: 2
    }
})