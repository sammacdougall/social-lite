import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HEADER_BAR_GRADIENT, HEADER_GRADIENT_COLORS } from '@/constants/HeaderTheme';

const FILTERS = [
  { id: 'sports', label: 'Sports Club', color: '#5B9BD5', selected: true },
  { id: 'hiking', label: 'Hiking Enthusiasts', color: '#9B59B6', selected: true },
  { id: 'book', label: 'Book Lovers', color: '#5BA561', selected: false },
  { id: 'local', label: 'Local Events', color: '#F5A623', selected: false },
] as const;

type CommunityHeaderProps = {
  onBack?: () => void;
  onCalendar?: () => void;
  onNotifications?: () => void;
  selectedFilters?: string[];
  onFilterPress?: (id: string) => void;
};

export function CommunityHeader({
  onBack,
  onCalendar,
  onNotifications,
  selectedFilters = ['sports', 'hiking'],
  onFilterPress,
}: CommunityHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[...HEADER_GRADIENT_COLORS]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.topRow}
      >
        <View style={styles.left}>
          <Pressable onPress={onBack} style={styles.iconBtn} hitSlop={8}>
            <Text style={styles.arrow}>{'<'}</Text>
          </Pressable>
          <Pressable onPress={onCalendar} style={styles.calendarIconBtn} hitSlop={8}>
            <Text style={styles.navIcon}>📅</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsScroll}
          style={styles.pillsWrapper}
        >
          {FILTERS.map((f) => {
            const selected = selectedFilters.includes(f.id);
            return (
              <Pressable
                key={f.id}
                onPress={() => onFilterPress?.(f.id)}
                style={[styles.pill, { backgroundColor: f.color }, selected && styles.pillSelected]}
              >
                <Text style={styles.pillText} numberOfLines={1}>{f.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <View style={styles.right}>
          <Pressable onPress={onCalendar} style={styles.iconBtn} hitSlop={8}>
            <Text style={styles.navIcon}>📅</Text>
          </Pressable>
          <Pressable onPress={onNotifications} style={styles.iconBtn} hitSlop={8}>
            <Text style={styles.navIcon}>🔔</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: HEADER_BAR_GRADIENT.marginBottom,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    ...HEADER_BAR_GRADIENT,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 8,
  },
  arrow: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  calendarIconBtn: {
    padding: 4,
  },
  navIcon: {
    fontSize: 18,
    color: '#fff',
  },
  pillsWrapper: {
    flex: 1,
    maxHeight: 40,
  },
  pillsScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    opacity: 0.85,
  },
  pillSelected: {
    opacity: 1,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  pillText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 8,
  },
  iconBtn: {
    padding: 6,
  },
});
