import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';

import { DecoratedMessage } from '../hooks/useDecoratedMessages';
import { MessageBubble } from './MessageBubble';

export type MessageListProps = {
  messages: DecoratedMessage[];
  listRef: React.RefObject<FlatList<DecoratedMessage>>;
  bottomSpacing: number;
  onContentSizeChange?: () => void;
  onLayout?: () => void;
};

export const MessageList = ({
  messages,
  listRef,
  bottomSpacing,
  onContentSizeChange,
  onLayout,
}: MessageListProps) => {
  const renderItem = useCallback<ListRenderItem<DecoratedMessage>>(
    ({ item }) => (
      <View>
        {item.dateLabel && (
          <View style={styles.dateLabelWrapper}>
            <Text style={styles.dateLabelText}>{item.dateLabel.toUpperCase()}</Text>
          </View>
        )}
        <MessageBubble message={item} />
      </View>
    ),
    []
  );

  return (
    <FlatList
      ref={listRef}
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: bottomSpacing },
      ]}
      onContentSizeChange={onContentSizeChange}
      onLayout={onLayout}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
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
});
