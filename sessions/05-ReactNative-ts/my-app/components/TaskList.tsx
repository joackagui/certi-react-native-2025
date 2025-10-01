import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../types";
import { ProgressBar } from "./ProgressBar";

type TaskListProps = {
  tasks: Task[];
  progress: number;
  onToggleTask: (taskId: string) => void;
};

export const TaskList = ({ tasks, progress, onToggleTask }: TaskListProps) => {
  const renderTask: ListRenderItem<Task> = ({ item }) => {
    const completedStyles = item.completed ? styles.cardCompleted : null;
    const titleStyles = item.completed ? styles.titleCompleted : null;
    const dueStyles = item.completed ? styles.dueCompleted : null;
    const descriptionStyles = item.completed ? styles.descriptionCompleted : null;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.card, completedStyles]}
        onPress={() => onToggleTask(item.id)}
      >
        <View style={styles.header}>
          <Text style={[styles.title, titleStyles]}>{item.title}</Text>
          <Text style={[styles.due, dueStyles]}>{item.due}</Text>
        </View>
        <Text style={[styles.description, descriptionStyles]}>{item.description}</Text>
        <Text style={styles.hint}>Toca para marcar como completada</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <ProgressBar progress={progress} />
      <FlatList
        data={tasks}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: { height: 16 },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardCompleted: { borderColor: "#2563eb", backgroundColor: "#e0f2fe" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { color: "#0f172a", fontSize: 16, fontWeight: "700" },
  titleCompleted: { color: "#1d4ed8", textDecorationLine: "line-through" },
  due: { color: "#64748b", fontSize: 12, fontWeight: "600" },
  dueCompleted: { color: "#1d4ed8" },
  description: { color: "#475569", lineHeight: 20 },
  descriptionCompleted: { color: "#1e3a8a" },
  hint: { marginTop: 12, color: "#94a3b8", fontSize: 12 },
});
