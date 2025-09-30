import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

type SectionSkillsProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};
export const SectionSkills = ({
  title = "My Section",
  description = "My Description",
  children,
}: SectionSkillsProps) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubTitle}>{description}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
  sectionHeader: { marginBottom: 16 },
  sectionTitle: { fontSize: 20, color: "black", fontWeight: 700 },
  sectionSubTitle: { fontSize: 14, color: "black", fontWeight: 300 },
});
