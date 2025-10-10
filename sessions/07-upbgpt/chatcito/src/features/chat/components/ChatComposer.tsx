import React from 'react';
import { Input, Spinner, Icon, Layout } from '@ui-kitten/components';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

type ChatComposerProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
  onPickImage: () => void;
  isThinking: boolean;
  paddingBottom: number;
};

export const ChatComposer = ({
  value,
  onChangeText,
  onSend,
  onPickImage,
  isThinking,
  paddingBottom,
}: ChatComposerProps) => (
  <Layout style={[styles.composer, { paddingBottom }]} level="1">
    <View style={styles.inputWrapper}>
      <Input
        placeholder="Escribe tu mensaje…"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSend}
        blurOnSubmit={false}
        returnKeyType="send"
        size="large"
        textStyle={styles.inputText}
        style={styles.input}
        accessoryLeft={(iconProps) => (
          <TouchableOpacity onPress={onPickImage}>
            <Icon {...iconProps} name="camera-outline" />
          </TouchableOpacity>
        )}
        accessoryRight={(iconProps) => (
          <TouchableOpacity
            onPress={onSend}
            disabled={!value.trim() || isThinking}
          >
            {isThinking ? (
              <Spinner {...iconProps} size="tiny" />
            ) : (
              <Icon {...iconProps} name="paper-plane" />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  </Layout>
);

const styles = StyleSheet.create({
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
});
