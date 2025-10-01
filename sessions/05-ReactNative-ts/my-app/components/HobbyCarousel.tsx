import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { Hobby } from "../types";

type HobbyCarouselProps = {
  hobbies: Hobby[];
};

export const HobbyCarousel = ({ hobbies }: HobbyCarouselProps) => {
  const renderHobby: ListRenderItem<Hobby> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={hobbies}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={renderHobby}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: { paddingRight: 4 },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 18,
    width: 160,
    height: 120,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  icon: { fontSize: 28 },
  text: { color: "#0f172a", fontWeight: "600", fontSize: 16 },
  separator: { width: 12 },
});
