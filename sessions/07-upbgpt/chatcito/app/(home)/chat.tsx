import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import {
  KeyboardAvoidingView,
  Platform,
  FlatList,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import * as ImagePicker from 'expo-image-picker';
import { useChatStore } from '../../src/store/chatStore';
import { postImageGeneration } from '../../src/services/ai';
import { useDecoratedMessages, DecoratedMessage } from '../../src/features/chat/hooks/useDecoratedMessages';
import { MessageList } from '../../src/features/chat/components/MessageList';
import { MediaPreviewBar } from '../../src/features/chat/components/MediaPreviewBar';
import { ImagePreviewModal } from '../../src/features/chat/components/ImagePreviewModal';
import { ChatComposer } from '../../src/features/chat/components/ChatComposer';

export default function ChatScreen() {
  const { messages, pushMessage, isThinking, setThinking, replaceMessage } = useChatStore();
  const [text, setText] = useState('');
  const listRef = useRef<FlatList<DecoratedMessage>>(null);
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const decoratedMessages = useDecoratedMessages(messages);

  const scrollToEnd = useCallback(
    () => listRef.current?.scrollToEnd({ animated: true }),
    []
  );

  const openPreview = useCallback((index: number) => {
    setPreviewIndex(index);
    setPreviewVisible(true);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewVisible(false);
    setPreviewIndex(null);
  }, []);

  const removePhoto = useCallback((currentIndex: number) => {
    setPhotos((prev) => {
      const next = prev.filter((_photo, index) => index !== currentIndex);
      const nextLength = next.length;

      setPreviewIndex((prevIndex) => {
        if (prevIndex === null) {
          return null;
        }

        if (prevIndex > currentIndex) {
          return prevIndex - 1;
        }

        if (prevIndex === currentIndex) {
          if (nextLength === 0) {
            return null;
          }
          return Math.min(currentIndex, nextLength - 1);
        }

        return prevIndex;
      });

      if (nextLength === 0) {
        setPreviewVisible(false);
      }

      return next;
    });
  }, []);

  const clearPhotos = useCallback(() => {
    setPhotos([]);
    setPreviewVisible(false);
    setPreviewIndex(null);
  }, []);

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

  const send = useCallback(async () => {
    const content = text.trim();
    if (!content || isThinking) return;
    setText('');
    const userMsg = pushMessage({ role: 'user', content, photos });
    scrollToEnd();

    setThinking(true);
    const placeholder = pushMessage({ role: 'assistant', content: 'Escribiendo…' });

    try {
      // const replyText = 'Esta es una respuesta simulada del asistente.';
      const replyText = await postImageGeneration(userMsg.content);
      replaceMessage(placeholder.id, { content: replyText.text, photos: [replyText.imageUrl] });
    } catch (e: any) {
      console.log(e)
      replaceMessage(placeholder.id, { content: 'Ocurrió un error obteniendo la respuesta.' });
    } finally {
      setThinking(false);
      setTimeout(scrollToEnd, 100);
    }
  }, [text, isThinking, pushMessage, setThinking, replaceMessage, scrollToEnd]);

  const pickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Se requieren permisos para acceder a las fotos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsMultipleSelection: true
    });

    if (!result.canceled) {
      const uris = result.assets.map(asset => asset.uri);
      setPhotos(prev => [...prev, ...uris]);
    }
  }, []);

  const listBottomSpacing = isKeyboardVisible ? 16 : 32 + insets.bottom;
  const composerPaddingBottom = isKeyboardVisible
    ? Platform.select({ ios: 6, android: 12 }) ?? 12
    : Math.max(insets.bottom + 12, 20);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={Platform.select({ ios: headerHeight, android: 0 })}
    >
      <Layout style={styles.container} level="2">
        <MessageList
          messages={decoratedMessages}
          listRef={listRef}
          bottomSpacing={listBottomSpacing}
          onContentSizeChange={scrollToEnd}
          onLayout={scrollToEnd}
        />
        <MediaPreviewBar
          photos={photos}
          onOpenPreview={openPreview}
          onRemovePhoto={removePhoto}
          onClear={clearPhotos}
        />
        <ImagePreviewModal
          visible={previewVisible}
          photos={photos}
          currentIndex={previewIndex}
          onChangeIndex={setPreviewIndex}
          onClose={closePreview}
        />
        <ChatComposer
          value={text}
          onChangeText={setText}
          onSend={send}
          onPickImage={pickImage}
          isThinking={isThinking}
          paddingBottom={composerPaddingBottom}
        />
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
});
