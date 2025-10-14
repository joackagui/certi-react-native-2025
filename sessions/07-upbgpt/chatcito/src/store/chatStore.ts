import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  photos: string[];
  createdAt: number;
};

type Chat = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
};

type ChatState = {
  chats: Chat[];
  currentChatId: string | null;
  isThinking: boolean;

  createChat: () => string;
  setCurrentChat: (id: string) => void;
  deleteChat: (id: string) => void;
  getCurrentChat: () => Chat | undefined;

  pushMessage: (m: Omit<ChatMessage, "id" | "createdAt">) => ChatMessage;
  setThinking: (v: boolean) => void;
  replaceMessage: (id: string, patch: Partial<ChatMessage>) => void;
  clearCurrentChat: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,
      isThinking: false,

      createChat: () => {
        const newChat: Chat = {
          id: Math.random().toString(36).slice(2),
          title: "Nuevo Chat",
          messages: [
            {
              id: "sys-1",
              role: "assistant",
              content: "¡Hola! Soy tu asistente. ¿En qué te ayudo hoy?",
              photos: [],
              createdAt: Date.now(),
            },
          ],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        set((state) => ({
          chats: [newChat, ...state.chats],
          currentChatId: newChat.id,
        }));

        return newChat.id;
      },

      setCurrentChat: (id) => set({ currentChatId: id }),

      deleteChat: (id) => {
        set((state) => {
          const filteredChats = state.chats.filter((chat) => chat.id !== id);
          const newCurrentChatId =
            state.currentChatId === id
              ? filteredChats[0]?.id || null
              : state.currentChatId;

          return {
            chats: filteredChats,
            currentChatId: newCurrentChatId,
          };
        });
      },

      getCurrentChat: () => {
        const { chats, currentChatId } = get();
        return chats.find((chat) => chat.id === currentChatId);
      },

      pushMessage: (m) => {
        const { chats, currentChatId } = get();
        if (!currentChatId) return null;

        const newMsg: ChatMessage = {
          id: Math.random().toString(36).slice(2),
          createdAt: Date.now(),
          ...m,
        };

        const updatedChats = chats.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [...chat.messages, newMsg],
                updatedAt: Date.now(),
                title:
                  chat.messages.length === 1 && m.role === "user"
                    ? m.content.slice(0, 30) +
                      (m.content.length > 30 ? "..." : "")
                    : chat.title,
              }
            : chat
        );

        set({ chats: updatedChats });
        return newMsg;
      },

      setThinking: (v) => set({ isThinking: v }),

      replaceMessage: (id, patch) => {
        const { chats, currentChatId } = get();
        if (!currentChatId) return;

        const updatedChats = chats.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.id === id ? { ...msg, ...patch } : msg
                ),
                updatedAt: Date.now(),
              }
            : chat
        );

        set({ chats: updatedChats });
      },

      clearCurrentChat: () => {
        const { chats, currentChatId } = get();
        if (!currentChatId) return;

        const updatedChats = chats.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  {
                    id: "sys-1",
                    role: "assistant",
                    content: "¡Hola! Soy tu asistente. ¿En qué te ayudo hoy?",
                    photos: [],
                    createdAt: Date.now(),
                  },
                ],
                updatedAt: Date.now(),
              }
            : chat
        );

        set({ chats: updatedChats });
      },
    }),
    {
      name: "chat-store",
      storage: createJSONStorage(() => AsyncStorage),
      version: 2, // Incrementa la versión
      migrate: (persistedState: any, version) => {
        if (version === 0 || version === 1) {
          // Migrar desde versiones antiguas
          return {
            chats: [],
            currentChatId: null,
            isThinking: false,
          };
        }
        return persistedState as ChatState;
      },
    }
  )
);
