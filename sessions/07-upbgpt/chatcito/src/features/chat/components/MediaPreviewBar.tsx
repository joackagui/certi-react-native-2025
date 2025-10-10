import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { Icon, Layout, Button } from '@ui-kitten/components';

type MediaPreviewBarProps = {
  photos: string[];
  onOpenPreview: (index: number) => void;
  onRemovePhoto: (index: number) => void;
  onClear: () => void;
};

export const MediaPreviewBar = ({
  photos,
  onOpenPreview,
  onRemovePhoto,
  onClear,
}: MediaPreviewBarProps) => {
  if (photos.length === 0) {
    return null;
  }

  return (
    <Layout level="1" style={styles.previewBar}>
      <View style={styles.headerRow}>
        <Icon name="image-outline" fill="#2E3A59" style={styles.galleryIcon} />
        <Button appearance="ghost" size="tiny" status="basic" onPress={onClear}>
          Limpiar
        </Button>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {photos.map((uri, index) => (
          <View key={`${uri}-${index}`} style={styles.imageContent}>
            <TouchableOpacity
              onPress={() => onOpenPreview(index)}
              activeOpacity={0.85}
              style={styles.thumbWrapper}
            >
              <Image source={{ uri }} style={styles.thumb} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onRemovePhoto(index)}
              activeOpacity={0.8}
              style={styles.removeButton}
            >
              <Icon name="close-outline" fill="#fff" style={styles.removePhotoIcon} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  previewBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#edf1f7',
    backgroundColor: '#edf1f7',
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  galleryIcon: {
    width: 18,
    height: 18,
  },
  imageContent: {
    width: 50,
    height: 50,
    borderRadius: 10,
    position: 'relative',
    marginRight: 12,
    marginVertical: 6,
  },
  thumbWrapper: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#dfe3f0',
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222B45',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  removePhotoIcon: {
    width: 16,
    height: 16,
  },
});
