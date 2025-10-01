import { StyleSheet, Text, View } from "react-native";

type HeroHeaderProps = {
  greeting: string;
  title: string;
  subtitle: string;
};

export const HeroHeader = ({ greeting, title, subtitle }: HeroHeaderProps) => (
  <View style={styles.container}>
    <Text style={styles.greeting}>{greeting}</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  greeting: { fontSize: 16, color: "#475569", fontWeight: "600" },
  title: { fontSize: 28, fontWeight: "700", color: "#0f172a", marginTop: 4 },
  subtitle: { marginTop: 10, color: "#475569", lineHeight: 20 },
});
