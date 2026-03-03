import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';
import { EVENT_CATEGORY_COLORS, type EventCategoryKey } from '@/constants/CalendarTheme';

const LABELS: Record<EventCategoryKey, string> = {
  work: 'Work',
  personal: 'Personal',
  health: 'Health',
  hobbies: 'Hobbies',
};

export function CategoryLegend() {
  return (
    <View style={styles.legend}>
      {(Object.keys(EVENT_CATEGORY_COLORS) as EventCategoryKey[]).map((key) => (
        <View key={key} style={styles.item}>
          <View style={[styles.dot, { backgroundColor: EVENT_CATEGORY_COLORS[key] }]} />
          <Text style={styles.label}>{LABELS[key]}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 12,
    opacity: 0.9,
  },
});
