import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type CardProfileProps = {
  imageUri: string;
  role: string;
  meta: string;
  likesLabel: string;
  onLike: () => void;
};

export const CardProfile = ({
  imageUri,
  role,
  meta,
  likesLabel,
  onLike,
}: CardProfileProps) => (
  <View style={styles.card}>
    <Image source={{ uri: imageUri }} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.role}>{role}</Text>
      <Text style={styles.meta}>{meta}</Text>
    </View>
    <TouchableOpacity activeOpacity={0.9} style={styles.likeButton} onPress={onLike}>
      <Text style={styles.likeEmoji}>🤍</Text>
      <Text style={styles.likeText}>{likesLabel}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 3,
    borderColor: "#2563eb",
    alignSelf: "center",
  },
  info: { marginTop: 16, alignItems: "center" },
  role: { color: "#1e293b", fontSize: 16, fontWeight: "600", textAlign: "center" },
  meta: { marginTop: 4, color: "#64748b" },
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
  likeText: { color: "#ffffff", fontWeight: "700", fontSize: 16, marginLeft: 12 },
});
