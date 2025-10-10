import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, Text } from '@ui-kitten/components';

type ImagePreviewModalProps = {
  visible: boolean;
  photos: string[];
  currentIndex: number | null;
  onChangeIndex: (nextIndex: number) => void;
  onClose: () => void;
};

export const ImagePreviewModal = ({
  visible,
  photos,
  currentIndex,
  onChangeIndex,
  onClose,
}: ImagePreviewModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (event?: GestureResponderEvent) => {
    event?.stopPropagation();
    onClose();
  };

  const hasPhotos = photos.length > 0 && currentIndex !== null;
  const photoUri = hasPhotos ? photos[currentIndex!] : undefined;

  const canGoPrev = hasPhotos && currentIndex! > 0;
  const canGoNext = hasPhotos && currentIndex! < photos.length - 1;

  const goPrev = () => {
    if (canGoPrev) {
      onChangeIndex(currentIndex! - 1);
    }
  };

  const goNext = () => {
    if (canGoNext) {
      onChangeIndex(currentIndex! + 1);
    }
  };

  useEffect(() => {
    if (currentIndex === null) {
      return;
    }

    const indexesToPrefetch = [currentIndex - 1, currentIndex + 1].filter(
      (index) => index >= 0 && index < photos.length
    );

    indexesToPrefetch.forEach((index) => {
      const uri = photos[index];
      if (uri) {
        Image.prefetch(uri);
      }
    });
  }, [currentIndex, photos]);

  const counterLabel = useMemo(() => {
    if (!hasPhotos) {
      return '';
    }
    return `${currentIndex! + 1} / ${photos.length}`;
  }, [currentIndex, hasPhotos, photos.length]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalImage} onPress={handleClose} accessibilityRole="button">
        <View style={styles.topBar}>
          <View style={styles.counterWrapper}>
            {counterLabel ? (
              <View style={styles.counterPill}>
                <Text appearance="hint" category="c2" style={styles.counterText}>
                  {counterLabel}
                </Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={handleClose}
            activeOpacity={0.8}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Cerrar vista previa"
          >
            <Icon name="close-outline" fill="#fff" style={styles.closeIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <View style={styles.imageWrapper}>
            {photoUri ? (
              <>
                <Image
                  source={{ uri: photoUri }}
                  style={styles.previewImage}
                  resizeMode="contain"
                  onLoadStart={() => setIsLoading(true)}
                  onLoadEnd={() => setIsLoading(false)}
                />
                {isLoading && (
                  <ActivityIndicator style={styles.loader} color="#fff" size="large" />
                )}
              </>
            ) : null}
          </View>

          {(canGoPrev || canGoNext) && (
            <View style={styles.navRow}>
              <TouchableOpacity
                onPress={goPrev}
                activeOpacity={0.85}
                disabled={!canGoPrev}
                style={[styles.navButton, !canGoPrev && styles.navButtonDisabled]}
                accessibilityRole="button"
                accessibilityLabel="Imagen anterior"
              >
                <Icon name="arrow-back-outline" fill="#fff" style={styles.navIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={goNext}
                activeOpacity={0.85}
                disabled={!canGoNext}
                style={[styles.navButton, !canGoNext && styles.navButtonDisabled]}
                accessibilityRole="button"
                accessibilityLabel="Imagen siguiente"
              >
                <Icon name="arrow-forward-outline" fill="#fff" style={styles.navIcon} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalImage: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  topBar: {
    position: 'absolute',
    top: 40,
    left: 30,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 3,
  },
  counterWrapper: {
    flex: 1,
  },
  counterPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(34, 43, 69, 0.75)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  counterText: {
    color: '#fff',
    letterSpacing: 0.5,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(34, 43, 69, 0.9)',
    marginLeft: 16,
  },
  closeIcon: {
    width: 22,
    height: 22,
  },
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    flexGrow: 1,
    width: '100%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
  },
  navRow: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  navButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(34, 43, 69, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    opacity: 0.35,
  },
  navIcon: {
    width: 28,
    height: 28,
  },
});
