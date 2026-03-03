import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HEADER_BAR_GRADIENT, HEADER_GRADIENT_COLORS, HEADER_TITLE } from '@/constants/HeaderTheme';

export function PrivatePageHeader() {
  return (
    <LinearGradient
      colors={[...HEADER_GRADIENT_COLORS]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <Text style={styles.title}>Private Calendar</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...HEADER_BAR_GRADIENT,
  },
  title: {
    ...HEADER_TITLE,
  },
});
