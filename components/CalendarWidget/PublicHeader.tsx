import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HEADER_BAR_GRADIENT, HEADER_GRADIENT_COLORS, HEADER_TITLE } from '@/constants/HeaderTheme';

type PublicHeaderProps = {
  onCamera?: () => void;
};

export function PublicHeader({ onCamera }: PublicHeaderProps) {
  return (
    <LinearGradient
      colors={[...HEADER_GRADIENT_COLORS]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <Text style={styles.title}>Public Calendar</Text>
      <Pressable onPress={onCamera} style={styles.cameraBtn} hitSlop={12}>
        <Text style={styles.cameraIcon}>📷</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...HEADER_BAR_GRADIENT,
  },
  title: {
    ...HEADER_TITLE,
    fontSize: 20,
  },
  cameraBtn: {
    position: 'absolute',
    right: HEADER_BAR_GRADIENT.paddingHorizontal,
    padding: 8,
  },
  cameraIcon: {
    fontSize: 22,
    color: '#fff',
  },
});
