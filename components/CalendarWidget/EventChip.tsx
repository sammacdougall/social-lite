import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';
import {
  EVENT_CATEGORY_COLORS,
  CONFIDENTIAL_INDICATOR,
  RECURRING_OPACITY,
  ONE_OFF_OPACITY,
  EVENT_STATUS,
  type EventCategoryKey,
} from '@/constants/CalendarTheme';
import type { EventStatus } from '@/types/database';
import type { CalendarEvent } from './CalendarWidget';

type EventChipProps = {
  event: CalendarEvent;
  compact?: boolean;
};

function getCategoryColor(category: EventCategoryKey): string {
  return EVENT_CATEGORY_COLORS[category] ?? EVENT_CATEGORY_COLORS.personal;
}

export function EventChip({ event, compact }: EventChipProps) {
  const baseColor = event.color ?? getCategoryColor(event.category as EventCategoryKey);
  const opacity = event.is_recurring ? RECURRING_OPACITY : ONE_OFF_OPACITY;
  const statusStyle = EVENT_STATUS[event.status as EventStatus] ?? {};
  const timeStr = formatTime(event.start_at, event.end_at);

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: baseColor,
          opacity,
          ...(event.is_confidential ? CONFIDENTIAL_INDICATOR : {}),
          ...statusStyle,
        },
      ]}
    >
      <Text style={styles.title} numberOfLines={compact ? 1 : 2}>
        {event.title}
      </Text>
      {!compact && (
        <Text style={styles.time} numberOfLines={1}>
          {timeStr}
        </Text>
      )}
    </View>
  );
}

function formatTime(start: string, end: string): string {
  try {
    const s = new Date(start);
    const e = new Date(end);
    const fmt = (d: Date) =>
      d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
    return `${fmt(s)} – ${fmt(e)}`;
  } catch {
    return '';
  }
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  time: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginTop: 2,
  },
});
