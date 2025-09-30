import { useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";

export const CardProfile = () => {
    const [likes, setLikes] = useState(0);
    const likesLabel = `${likes} like${likes === 1 ? "" : "s"}`;
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: "https://i.pravatar.cc/220?img=2" }}
        style={styles.avatar}
      />
      <View style={styles.cardInfo}>
        <Text style={styles.cardRole}>React Native Developer en progreso</Text>
        <Text style={styles.cardMeta}>La Paz · Bolivia 2025</Text>
      </View>

      {/* <Button title="¡Gracias por tu like!" onPress={() => alert("¡Gracias por tu like!")} /> */}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.likeButton}
        onPress={() => setLikes((prev) => prev + 1)}
      >
        <Text style={styles.likeEmoji}>🤍</Text>
        <Text style={styles.likeText}>{likesLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4, //  z-index
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#2563eb",
    alignSelf: "center",
  },
  cardInfo: { marginTop: 16, alignItems: "center" },
  cardRole: {
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  cardMeta: { marginTop: 4, color: "#64748b" },
  likeButton: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  likeEmoji: { fontSize: 18 },
  likeText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 12,
  },
});

