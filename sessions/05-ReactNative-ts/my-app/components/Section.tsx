import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

type SectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export const Section = ({ title, description, children }: SectionProps) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.subtitle}>{description}</Text> : null}
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 32 },
  header: { marginBottom: 16 },
  title: { fontSize: 20, fontWeight: "700", color: "#0f172a" },
  subtitle: { marginTop: 4, color: "#475569", lineHeight: 20 },
});
