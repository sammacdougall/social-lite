import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';
import {
  EVENT_CATEGORY_COLORS,
  TENTATIVE_COLOR,
  CANCELLED_COLOR,
  type EventCategoryKey,
} from '@/constants/CalendarTheme';

const LABELS: Record<EventCategoryKey, string> = {
  work: 'Work',
  personal: 'Social',
  health: 'Fitness',
  hobbies: 'Family',
};

export function PrivateLegend() {
  return (
    <View style={styles.legend}>
      <View style={styles.row}>
        {(Object.keys(EVENT_CATEGORY_COLORS) as EventCategoryKey[]).map((key) => (
          <View key={key} style={styles.item}>
            <View style={[styles.dot, { backgroundColor: EVENT_CATEGORY_COLORS[key] }]} />
            <Text style={styles.label}>{LABELS[key]}</Text>
          </View>
        ))}
      </View>
      <View style={styles.row}>
        <View style={styles.item}>
          <View style={[styles.tentativeBox, { backgroundColor: TENTATIVE_COLOR }]} />
          <Text style={styles.label}>Tentative</Text>
        </View>
        <View style={styles.item}>
          <View style={styles.cancelledBox}>
            <Text style={styles.xText}>✕</Text>
          </View>
          <Text style={styles.label}>Cancelled</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legend: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
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
  tentativeBox: {
    width: 14,
    height: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderStyle: 'dashed',
  },
  cancelledBox: {
    width: 14,
    height: 10,
    borderRadius: 3,
    backgroundColor: CANCELLED_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  xText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  label: { fontSize: 12, opacity: 0.9 },
});
