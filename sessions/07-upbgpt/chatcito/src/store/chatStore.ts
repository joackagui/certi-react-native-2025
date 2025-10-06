import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: number;
};

type ChatState = {
  messages: ChatMessage[];
  isThinking: boolean;
  pushMessage: (m: Omit<ChatMessage, 'id' | 'createdAt'>) => ChatMessage;
  setThinking: (v: boolean) => void;
  replaceMessage: (id: string, patch: Partial<ChatMessage>) => void;
  clear: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [
        {
          id: 'sys-1',
          role: 'assistant',
          content: '¡Hola! Soy tu asistente. ¿En qué te ayudo hoy?',
          createdAt: Date.now(),
        },
      ],
      isThinking: false,
      pushMessage: (m) => {
        const newMsg: ChatMessage = {
          id: Math.random().toString(36).slice(2),
          createdAt: Date.now(),
          ...m,
        };
        set({ messages: [...get().messages, newMsg] });
        return newMsg;
      },
      setThinking: (v) => set({ isThinking: v }),
      replaceMessage: (id, patch) => {
        set({
          messages: get().messages.map((mm) => (mm.id === id ? { ...mm, ...patch } : mm)),
        });
      },
      clear: () => set({ messages: [], isThinking: false }),
    }),
    {
      name: 'chat-store',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);
