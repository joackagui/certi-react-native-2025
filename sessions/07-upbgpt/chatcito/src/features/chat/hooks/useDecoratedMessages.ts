import { useMemo } from 'react';

import { ChatMessage } from '../../../store/chatStore';
import { formatDateLabel, formatTime } from '../utils/formatters';

export type DecoratedMessage = ChatMessage & {
  formattedTime: string;
  showMeta: boolean;
  showAvatar: boolean;
  dateLabel?: string;
};

const isSameGroup = (current: ChatMessage, previous?: ChatMessage | null) => {
  if (!previous) {
    return false;
  }

  const sameRole = previous.role === current.role;
  const withinFiveMinutes = current.createdAt - previous.createdAt < 5 * 60 * 1000;

  return sameRole && withinFiveMinutes;
};

export const useDecoratedMessages = (messages: ChatMessage[]): DecoratedMessage[] =>
  useMemo(() => {
    const sorted = [...messages].sort((a, b) => a.createdAt - b.createdAt);
    let lastDateKey = '';

    return sorted.map<DecoratedMessage>((message, index) => {
      const previous = sorted[index - 1];
      const grouped = isSameGroup(message, previous);
      const formattedTime = formatTime(message.createdAt);

      const currentDate = new Date(message.createdAt);
      const dateKey = currentDate.toISOString().slice(0, 10);
      const dateLabel =
        dateKey !== lastDateKey ? formatDateLabel(message.createdAt) : undefined;

      if (dateLabel) {
        lastDateKey = dateKey;
      }

      return {
        ...message,
        formattedTime,
        showMeta: !grouped,
        showAvatar: !grouped,
        dateLabel,
      };
    });
  }, [messages]);
