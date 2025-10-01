import { StyleSheet, Text, View } from "react-native";
import { Skill } from "../types";

type SkillChipsProps = {
  skills: Skill[];
};

export const SkillChips = ({ skills }: SkillChipsProps) => (
  <View style={styles.container}>
    {skills.map((skill) => (
      <View key={skill.id} style={styles.chip}>
        <Text style={styles.chipText}>{skill.title}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    backgroundColor: "#e0f2fe",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginRight: 12,
    marginBottom: 12,
  },
  chipText: { color: "#1d4ed8", fontWeight: "600" },
});
