import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {
  EVENT_CATEGORY_COLORS,
  TENTATIVE_COLOR,
  CANCELLED_COLOR,
  type EventCategoryKey,
} from '@/constants/CalendarTheme';
import type { CalendarEvent } from './CalendarWidget';

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

type DayCell = { dateString: string; day: number; month: number; year: number } | null;

function getWeeksForMonth(year: number, month: number): DayCell[][] {
  const first = new Date(year, month - 1, 1);
  const last = new Date(year, month, 0);
  const startDay = first.getDay();
  const daysInMonth = last.getDate();
  const leadingNulls = startDay;
  const totalSlots = Math.ceil((leadingNulls + daysInMonth) / 7) * 7;
  const cells: DayCell[] = [];
  for (let i = 0; i < leadingNulls; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      dateString: `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      day: d,
      month,
      year,
    });
  }
  while (cells.length < totalSlots) cells.push(null);
  const weeks: DayCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function getCategoryColor(category: EventCategoryKey): string {
  return EVENT_CATEGORY_COLORS[category] ?? EVENT_CATEGORY_COLORS.personal;
}

type PrivateMonthCalendarProps = {
  events: CalendarEvent[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onAddPress: () => void;
  onDayPress?: (dateString: string) => void;
};

export function PrivateMonthCalendar({
  events,
  onPrevMonth,
  onNextMonth,
  onAddPress,
  onDayPress,
}: PrivateMonthCalendarProps) {
  const [current, setCurrent] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() + 1 };
  });

  const monthLabel = useMemo(() => {
    const d = new Date(current.year, current.month - 1, 1);
    return d.toLocaleString('default', { month: 'long', year: 'numeric' });
  }, [current.year, current.month]);

  const weeks = useMemo(
    () => getWeeksForMonth(current.year, current.month),
    [current.year, current.month]
  );

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((ev) => {
      const key = ev.start_at.slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    });
    return map;
  }, [events]);

  const handlePrev = () => {
    if (current.month === 1) setCurrent({ year: current.year - 1, month: 12 });
    else setCurrent({ year: current.year, month: current.month - 1 });
    onPrevMonth();
  };

  const handleNext = () => {
    if (current.month === 12) setCurrent({ year: current.year + 1, month: 1 });
    else setCurrent({ year: current.year, month: current.month + 1 });
    onNextMonth();
  };

  const { width } = useWindowDimensions();
  const cellSize = Math.floor((width - 32) / 7);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Pressable onPress={handlePrev} style={styles.navBtn} hitSlop={12}>
          <Text style={styles.arrow}>{'<'}</Text>
        </Pressable>
        <Text style={styles.monthYear} numberOfLines={1}>{monthLabel}</Text>
        <Pressable onPress={handleNext} style={styles.navBtn} hitSlop={12}>
          <Text style={styles.arrow}>{'>'}</Text>
        </Pressable>
        <Pressable onPress={onAddPress} style={styles.addBtn} hitSlop={12}>
          <Text style={styles.plus}>+</Text>
        </Pressable>
      </View>
      <View style={styles.dayHeaderRow}>
        {DAY_NAMES.map((name) => (
          <View key={name} style={[styles.dayHeaderCell, { width: cellSize }]}>
            <Text style={styles.dayHeaderText}>{name}</Text>
          </View>
        ))}
      </View>
      <ScrollView style={styles.gridScroll} showsVerticalScrollIndicator={false}>
        {weeks.map((week, wi) => (
          <View key={wi} style={styles.weekRow}>
            {week.map((day, di) => (
              <DayCell
                key={di}
                day={day}
                events={day ? eventsByDate[day.dateString] ?? [] : []}
                cellSize={cellSize}
                onPress={day ? () => onDayPress?.(day.dateString) : undefined}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function DayCell({
  day,
  events,
  cellSize,
  onPress,
}: {
  day: DayCell;
  events: CalendarEvent[];
  cellSize: number;
  onPress?: () => void;
}) {
  const displayEvents = events.slice(0, 3);

  return (
    <Pressable
      style={[styles.cell, { width: cellSize, minHeight: cellSize }]}
      onPress={onPress}
      disabled={!day}
    >
      {day ? (
        <>
          <Text style={styles.cellDate}>{day.day}</Text>
          <View style={styles.cellEvents}>
            {displayEvents.map((ev) => (
              <DayEventLabel key={ev.id} event={ev} />
            ))}
            {events.length > 3 && (
              <Text style={styles.more}>+{events.length - 3}</Text>
            )}
          </View>
        </>
      ) : null}
    </Pressable>
  );
}

function DayEventLabel({ event }: { event: CalendarEvent }) {
  const isTentative = event.status === 'tentative';
  const isCancelled = event.status === 'cancelled';
  const color =
    event.color ?? getCategoryColor(event.category as EventCategoryKey);
  const bgColor = isCancelled ? CANCELLED_COLOR : isTentative ? TENTATIVE_COLOR : color;

  return (
    <View
      style={[
        styles.eventLabel,
        {
          backgroundColor: bgColor,
          ...(isTentative ? styles.eventLabelTentative : {}),
        },
      ]}
    >
      <Text
        style={[
          styles.eventLabelText,
          isCancelled && styles.eventLabelCancelled,
        ]}
        numberOfLines={1}
      >
        {isCancelled && 'Cancelled: '}
        {isTentative && 'Maybe: '}
        {event.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
    gap: 8,
  },
  navBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: { fontSize: 22, color: '#1f2937', fontWeight: '600' },
  monthYear: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: { fontSize: 20, color: '#1f2937', fontWeight: '600' },
  dayHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  dayHeaderCell: { alignItems: 'center' },
  dayHeaderText: { fontSize: 12, fontWeight: '600', color: '#6b7280' },
  gridScroll: { maxHeight: 340 },
  weekRow: { flexDirection: 'row' },
  cell: {
    padding: 4,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  cellDate: { fontSize: 13, fontWeight: '500', color: '#1f2937', marginBottom: 2 },
  cellEvents: { gap: 2 },
  eventLabel: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  eventLabelTentative: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderStyle: 'dashed',
  },
  eventLabelText: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '600',
  },
  eventLabelCancelled: {
    textDecorationLine: 'line-through',
    color: '#fff',
    opacity: 0.9,
  },
  more: { fontSize: 8, color: '#6b7280', marginTop: 1 },
});
