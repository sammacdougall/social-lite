import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Text } from '@/components/Themed';
import {
  CALENDAR_THEME,
  CALENDAR_THEME_DARK,
  EVENT_CATEGORY_COLORS,
  CONFIDENTIAL_INDICATOR,
  RECURRING_OPACITY,
  ONE_OFF_OPACITY,
  type EventCategoryKey,
} from '@/constants/CalendarTheme';
import { useColorScheme } from '@/components/useColorScheme';
import type { EventRow } from '@/types/database';

export type CalendarEvent = Pick<
  EventRow,
  'id' | 'title' | 'start_at' | 'end_at' | 'category' | 'is_confidential' | 'is_recurring' | 'status'
> & {
  color?: string; // for duo/group: per-user color
};

type CalendarWidgetProps = {
  events: CalendarEvent[];
  onDayPress?: (date: DateData) => void;
  onAddPress?: () => void;
  showAddButton?: boolean;
};

function getCategoryColor(category: EventCategoryKey): string {
  return EVENT_CATEGORY_COLORS[category] ?? EVENT_CATEGORY_COLORS.personal;
}

export function CalendarWidget({
  events,
  onDayPress,
  onAddPress,
  showAddButton = true,
}: CalendarWidgetProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? CALENDAR_THEME_DARK : CALENDAR_THEME;
  const [currentMonth, setCurrentMonth] = useState<string | null>(null);

  const markedDates = useMemo(() => {
    const marked: Record<
      string,
      { dots?: { key: string; color: string }[]; marked?: boolean; dotColor?: string }
    > = {};
    events.forEach((ev) => {
      const dateStr = ev.start_at.slice(0, 10);
      const color = ev.color ?? getCategoryColor(ev.category as EventCategoryKey);
      if (!marked[dateStr]) {
        marked[dateStr] = { dots: [] };
      }
      const dots = marked[dateStr].dots ?? [];
      dots.push({ key: ev.id, color });
      marked[dateStr].dots = dots;
      marked[dateStr].marked = true;
    });
    return marked;
  }, [events]);

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.calendarBackground }]}>
      <Calendar
        current={currentMonth ?? undefined}
        onMonthChange={(m) => setCurrentMonth(m.dateString)}
        onDayPress={onDayPress}
        markingType="multi-dot"
        markedDates={markedDates}
        theme={theme}
        style={styles.calendar}
        enableSwipeMonths
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  calendar: {
    borderRadius: 16,
    paddingBottom: 8,
  },
});
