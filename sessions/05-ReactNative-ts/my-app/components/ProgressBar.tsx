import { StyleSheet, Text, View } from "react-native";

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar = ({ progress }: ProgressBarProps) => (
  <View style={styles.container}>
    <View style={styles.track}>
      <View style={[styles.indicator, { width: `${progress}%` }]} />
    </View>
    <Text style={styles.label}>{`${progress}% de avance`}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  track: {
    height: 14,
    borderRadius: 999,
    backgroundColor: "#e2e8f0",
    overflow: "hidden",
  },
  indicator: { height: "100%", backgroundColor: "#2563eb" },
  label: { marginTop: 6, color: "#475569", fontSize: 12, fontWeight: "500" },
});
