import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useChatStore } from "../src/store/chatStore";
import { SafeAreaView } from "react-native-safe-area-context"; // ← Importar esto

export default function ChatsScreen() {
  const router = useRouter();
  const { chats, currentChatId, createChat, setCurrentChat, deleteChat } =
    useChatStore();

  const handleCreateChat = () => {
    const newChatId = createChat();
    setCurrentChat(newChatId);
    router.push("/chat");
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChat(chatId);
    router.push("/chat");
  };

  const handleDeleteChat = (chatId: string, chatTitle: string) => {
    Alert.alert(
      "Eliminar chat",
      `¿Estás seguro de que quieres eliminar "${chatTitle}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteChat(chatId),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateChat}
        >
          <Text style={styles.createButtonText}>+ Nuevo Chat</Text>
        </TouchableOpacity>

        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.chatItem,
                item.id === currentChatId && styles.selectedChat,
              ]}
              onPress={() => handleSelectChat(item.id)}
              onLongPress={() => handleDeleteChat(item.id, item.title)}
            >
              <Text style={styles.chatTitle}>{item.title}</Text>
              <Text style={styles.chatDate}>
                {new Date(item.updatedAt).toLocaleDateString()}
              </Text>
              <Text style={styles.messageCount}>
                {item.messages.length} mensajes
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No hay chats. Crea uno nuevo para comenzar.
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  createButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  createButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  chatItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedChat: {
    borderColor: "#007AFF",
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  chatDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  messageCount: {
    fontSize: 12,
    color: "#888",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 32,
    fontSize: 16,
  },
});
