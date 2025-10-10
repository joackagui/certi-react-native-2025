import React from 'react';
import { Layout, Icon, Text } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';

import { DecoratedMessage } from '../hooks/useDecoratedMessages';

type MessageBubbleProps = {
  message: DecoratedMessage;
};

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <View
      style={[
        styles.messageRow,
        { flexDirection: isUser ? 'row-reverse' : 'row' },
      ]}
    >
      <View
        style={[
          styles.avatarSlot,
          !message.showAvatar && styles.avatarHidden,
        ]}
      >
        <View
          style={[
            styles.avatar,
            isUser ? styles.userAvatar : styles.assistantAvatar,
          ]}
        >
          {isUser ? (
            <Text style={styles.avatarText}>Tú</Text>
          ) : (
            <Icon name="flash-outline" fill="#fff" style={styles.avatarIcon} />
          )}
        </View>
      </View>

      <View
        style={[
          styles.bubbleShell,
          isUser ? styles.bubbleShellRight : styles.bubbleShellLeft,
          !message.showMeta && styles.bubbleShellStacked,
        ]}
      >
        <Layout
          level="1"
          style={[
            styles.bubble,
            isUser ? styles.userBubble : styles.assistantBubble,
            !message.showMeta &&
              (isUser ? styles.userBubbleStacked : styles.assistantBubbleStacked),
          ]}
        >
          {!isUser && (
            <Text
              category="c2"
              style={[
                styles.bubbleLabel,
                isUser ? styles.userLabel : styles.assistantLabel,
              ]}
            >
              {isUser ? '' : 'Asistente'}
            </Text>
          )}

          <Markdown
            style={{
              body: [styles.bubbleText, isUser && styles.userText],
              text: [styles.bubbleText, isUser && styles.userText],
              paragraph: styles.paragraph,
            }}
          >
            {message.content}
          </Markdown>

          <View
            style={[
              styles.timeRow,
              { justifyContent: isUser ? 'flex-end' : 'flex-start' },
            ]}
          >
            <Text
              style={[
                styles.timeText,
                isUser ? styles.userTimeText : styles.assistantTimeText,
              ]}
            >
              {message.formattedTime}
            </Text>
          </View>
        </Layout>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageRow: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'flex-end',
  },
  avatarSlot: {
    width: 34,
    alignItems: 'center',
  },
  avatarHidden: {
    opacity: 0,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assistantAvatar: {
    backgroundColor: '#8F9BB3',
  },
  userAvatar: {
    backgroundColor: '#3366FF',
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  avatarIcon: {
    width: 18,
    height: 18,
  },
  bubbleShell: {
    maxWidth: '68%',
  },
  bubbleShellLeft: {
    marginLeft: 6,
  },
  bubbleShellRight: {
    marginRight: 6,
  },
  bubbleShellStacked: {
    marginTop: -4,
  },
  bubble: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#dfe3f0',
    paddingHorizontal: 9,
    paddingVertical: 6,
    minHeight: 32,
  },
  assistantBubble: {
    backgroundColor: '#FAFBFF',
  },
  assistantBubbleStacked: {
    borderTopLeftRadius: 8,
  },
  userBubble: {
    backgroundColor: '#3366FF',
    borderColor: '#2952CC',
  },
  userBubbleStacked: {
    borderTopRightRadius: 8,
  },
  bubbleLabel: {
    marginBottom: 2,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  assistantLabel: {
    color: '#8F9BB3',
  },
  userLabel: {
    color: '#E7F1FF',
  },
  bubbleText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#1A2138',
  },
  paragraph: {
    marginTop: 0,
    marginBottom: 4,
  },
  userText: {
    color: '#F7F9FC',
  },
  timeRow: {
    marginTop: 4,
  },
  timeText: {
    fontSize: 11,
    letterSpacing: 0.2,
  },
  assistantTimeText: {
    color: '#8F9BB3',
  },
  userTimeText: {
    color: '#D6E4FF',
  },
});
