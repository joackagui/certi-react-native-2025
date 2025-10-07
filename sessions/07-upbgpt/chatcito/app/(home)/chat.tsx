import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Layout, Text, Input, Button, Spinner, Icon } from '@ui-kitten/components';
import {
  KeyboardAvoidingView,
  Platform,
  FlatList,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import * as ImagePicker from 'expo-image-picker';
import { useChatStore, ChatMessage } from '../../src/store/chatStore';
import { getGeminiMessage } from '../../src/services/ai';
import Markdown from 'react-native-markdown-display';
// import { mockAIReply } from '../../src/services/ai';

type DecoratedMessage = ChatMessage & {
  formattedTime: string;
  showMeta: boolean;
  showAvatar: boolean;
  dateLabel?: string;
};

const formatTime = (timestamp: number) =>
  new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));

const formatDateLabel = (timestamp: number) =>
  new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(new Date(timestamp));

function Bubble({ item }: { item: DecoratedMessage }) {
  const isUser = item.role === 'user';

  return (
    <View
      style={[
        styles.messageRow,
        { flexDirection: isUser ? 'row-reverse' : 'row' },
      ]}
    >
      <View style={[styles.avatarSlot, !item.showAvatar && styles.avatarHidden]}>
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
          !item.showMeta && styles.bubbleShellStacked,
        ]}
      >
        <Layout
          level="1"
          style={[
            styles.bubble,
            isUser ? styles.userBubble : styles.assistantBubble,
            !item.showMeta && (isUser ? styles.userBubbleStacked : styles.assistantBubbleStacked),
          ]}
        >
          { !isUser && (
            <Text
              category="c2"
              style={[styles.bubbleLabel, isUser ? styles.userLabel : styles.assistantLabel]}
            >
              {isUser ? '' : 'Asistente'}
            </Text>
          )}

          <Text style={[styles.bubbleText, isUser && styles.userText]}>
            <Markdown>
              {item.content}
            </Markdown>
          </Text>

          <View
            style={[
              styles.timeRow,
              { justifyContent: isUser ? 'flex-end' : 'flex-start' },
            ]}
          >
            <Text
              style={[styles.timeText, isUser ? styles.userTimeText : styles.assistantTimeText]}
            >
              {item.formattedTime}
            </Text>
          </View>
        </Layout>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const { messages, pushMessage, isThinking, setThinking, replaceMessage } = useChatStore();
  const [text, setText] = useState('');
  const listRef = useRef<FlatList<DecoratedMessage>>(null);
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const sorted = useMemo(
    () => [...messages].sort((a, b) => a.createdAt - b.createdAt),
    [messages]
  );

  const decoratedMessages = useMemo(() => {
    let lastDateKey = '';

    return sorted.map<DecoratedMessage>((message, index) => {
      const currentDate = new Date(message.createdAt);
      const dateKey = currentDate.toISOString().slice(0, 10);
      const previous = sorted[index - 1];
      const sameGroup =
        previous &&
        previous.role === message.role &&
        message.createdAt - previous.createdAt < 5 * 60 * 1000;

      const formattedTime = formatTime(message.createdAt);
      const dateLabel = dateKey !== lastDateKey ? formatDateLabel(message.createdAt) : undefined;
      if (dateLabel) {
        lastDateKey = dateKey;
      }

      return {
        ...message,
        formattedTime,
        showMeta: !sameGroup,
        showAvatar: !sameGroup,
        dateLabel,
      };
    });
  }, [sorted]);

  const scrollToEnd = () => listRef.current?.scrollToEnd({ animated: true });

  const send = useCallback(async () => {
    const content = text.trim();
    if (!content || isThinking) return;
    setText('');
    const userMsg = pushMessage({ role: 'user', content });
    scrollToEnd();

    setThinking(true);
    const placeholder = pushMessage({ role: 'assistant', content: 'Escribiendo…' });

    try {
      // const replyText = 'Esta es una respuesta simulada del asistente.';
      const replyText = await getGeminiMessage(userMsg.content);
      replaceMessage(placeholder.id, { content: replyText });
    } catch (e: any) {
      replaceMessage(placeholder.id, { content: 'Ocurrió un error obteniendo la respuesta.' });
    } finally {
      setThinking(false);
      setTimeout(scrollToEnd, 100);
    }
  }, [text, isThinking, pushMessage, setThinking, replaceMessage, sorted]);

  const renderItem = ({ item }: { item: DecoratedMessage }) => (
    <View>
      {item.dateLabel && (
        <View style={styles.dateLabelWrapper}>
          <Text style={styles.dateLabelText}>{item.dateLabel.toUpperCase()}</Text>
        </View>
      )}
      <Bubble item={item} />
    </View>
  );

  const pickImage = async () => {
    console.log('Pick image');
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Se requieren permisos para acceder a las fotos.');
      return;
    }
    const result = 
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={Platform.select({ ios: headerHeight, android: 0 })}
    >
      <Layout style={styles.container} level="2">
        <FlatList
          ref={listRef}
          data={decoratedMessages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingVertical: 16,
            paddingBottom: isKeyboardVisible ? 16 : 32 + insets.bottom,
            paddingHorizontal: 12,
          }}
          onContentSizeChange={scrollToEnd}
          onLayout={scrollToEnd}
          style={styles.list}
        />

        <Layout
          style={[
            styles.composer,
            {
              paddingBottom: isKeyboardVisible
                ? Platform.select({ ios: 6, android: 12 })
                : Math.max(insets.bottom + 12, 20),
            },
          ]}
          level="1"
        >
          <View style={styles.inputWrapper}>
            <Input
              placeholder="Escribe tu mensaje…"
              value={text}
              onChangeText={setText}
              onSubmitEditing={send}
              blurOnSubmit={false}
              returnKeyType="send"
              size="large"
              textStyle={styles.inputText}
              style={styles.input}
              accessoryLeft = {(iconProps) => (
                <TouchableOpacity onPress={pickImage}>
                  <Icon {...iconProps} name="camera-outline" />
                </TouchableOpacity>
              )}
              accessoryRight={(iconProps) => (
                <TouchableOpacity onPress={send} disabled={!text.trim() || isThinking}>
                  {isThinking ? (
                    <Spinner {...iconProps} size="tiny" />
                  ) : (
                    <Icon {...iconProps} name="paper-plane" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
          {/* <Button
            onPress={send}
            disabled={!text.trim() || isThinking}
            appearance="filled"
            size="large"
            style={styles.sendButton}
          >
            {isThinking ? <Spinner size="tiny" /> : 'Enviar'}
          </Button> */}
        </Layout>
      </Layout>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#edf1f7',
  },
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  dateLabelWrapper: {
    alignSelf: 'center',
    backgroundColor: '#E4E9F2',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
    marginTop: 12,
  },
  dateLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B778E',
    letterSpacing: 0.4,
  },
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
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#d3dae6',
    backgroundColor: '#fff',
    shadowColor: '#1a2138',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    borderRadius: 16,
    borderColor: '#c5cee0',
    backgroundColor: '#f7f9fc',
  },
  inputText: {
    fontSize: 15,
  },
  sendButton: {
    borderRadius: 16,
    paddingHorizontal: 18,
  },
});
