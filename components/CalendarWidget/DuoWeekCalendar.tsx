import React, { useMemo, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const FIRST_HOUR = 1;   // 1am
const LAST_HOUR = 24;   // through 11pm (hour 23)
const SCROLL_TO_HOUR = 8; // scroll to 8am on open
const MINUTES_PER_SLOT = 30;
const SLOTS_PER_HOUR = 60 / MINUTES_PER_SLOT;
const ROW_HEIGHT = 36;
const TIME_COL_WIDTH = 52;

/** Pixel offset so the row at SCROLL_TO_HOUR (e.g. 8am) is at the top when opened */
const INITIAL_SCROLL_Y =
  ((SCROLL_TO_HOUR - FIRST_HOUR) * 60 / MINUTES_PER_SLOT) * ROW_HEIGHT;

export type DuoCalendarEvent = {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
  color: string;
};

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getDayIndex(dateStr: string, weekStart: Date): number {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  const ms = d.getTime() - weekStart.getTime();
  return Math.floor(ms / 86400000);
}

function minutesFromMidnight(iso: string): number {
  const d = new Date(iso);
  return d.getHours() * 60 + d.getMinutes();
}

function toSlotOffset(minutes: number): number {
  const startMinutes = FIRST_HOUR * 60;
  return ((minutes - startMinutes) / MINUTES_PER_SLOT) * ROW_HEIGHT;
}

function slotToMinutes(slotIndex: number): number {
  return FIRST_HOUR * 60 + slotIndex * MINUTES_PER_SLOT;
}

type DuoWeekCalendarProps = {
  weekStart: Date;
  events: DuoCalendarEvent[];
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  /** When true, wrapper uses flex: 1 instead of maxHeight (e.g. for Group tab with hovering card) */
  fillContainer?: boolean;
};

export function DuoWeekCalendar({
  weekStart,
  events,
  onPrevWeek,
  onNextWeek,
  fillContainer = false,
}: DuoWeekCalendarProps) {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const dayWidth = (width - TIME_COL_WIDTH - 16) / 7;

  // On open (and when week changes), scroll to 8am so user sees daytime first
  useEffect(() => {
    const t = setTimeout(() => {
      scrollRef.current?.scrollTo({ y: INITIAL_SCROLL_Y, animated: false });
    }, 100);
    return () => clearTimeout(t);
  }, [weekStart]);

  const timeSlots = useMemo(() => {
    return Array.from({ length: (LAST_HOUR - FIRST_HOUR) * SLOTS_PER_HOUR }, (_, i) => {
      const totalMins = FIRST_HOUR * 60 + i * MINUTES_PER_SLOT;
      const h = Math.floor(totalMins / 60);
      const m = totalMins % 60;
      if (m === 0) {
        const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
        const ampm = h >= 12 ? ' pm' : ' am';
        return `${hour}${ampm}`;
      }
      return '';
    });
  }, []);

  const placedEvents = useMemo(() => {
    const weekStartMs = weekStart.getTime();
    return events
      .map((ev) => {
        const start = new Date(ev.start_at);
        const end = new Date(ev.end_at);
        const dayIndex = getDayIndex(ev.start_at, weekStart);
        if (dayIndex < 0 || dayIndex > 6) return null;
        const startMins = minutesFromMidnight(ev.start_at);
        const endMins = minutesFromMidnight(ev.end_at);
        const rangeStart = FIRST_HOUR * 60;
        const rangeEnd = LAST_HOUR * 60;
        if (endMins <= rangeStart || startMins >= rangeEnd) return null;
        const top = toSlotOffset(Math.max(startMins, rangeStart));
        const bottom = toSlotOffset(Math.min(endMins, rangeEnd));
        const height = Math.max(20, bottom - top);
        const left = dayIndex * dayWidth + 2;
        const eventWidth = dayWidth - 4;
        return {
          ...ev,
          dayIndex,
          top,
          height,
          left,
          width: eventWidth,
        };
      })
      .filter(Boolean) as (DuoCalendarEvent & { top: number; height: number; left: number; width: number })[];
  }, [events, weekStart, dayWidth]);

  const totalHeight = (LAST_HOUR - FIRST_HOUR) * SLOTS_PER_HOUR * ROW_HEIGHT;

  const scrollHeight = 404; // leaves room for day header (36) when not fillContainer

  return (
    <View style={[styles.wrapper, fillContainer && styles.wrapperFill]}>
      {/* Day header fixed at top - does not scroll */}
      <View style={styles.dayHeaderRow}>
        <View style={[styles.timeColSpacer, { width: TIME_COL_WIDTH }]} />
        {DAY_LABELS.map((name) => (
          <View key={name} style={[styles.dayHeaderCell, { width: dayWidth }]}>
            <Text style={styles.dayHeaderText}>{name}</Text>
          </View>
        ))}
      </View>
      {/* Only the time grid scrolls underneath */}
      <ScrollView
        ref={scrollRef}
        horizontal={false}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
        style={[styles.scroll, !fillContainer && { maxHeight: scrollHeight }, fillContainer && styles.scrollFill]}
      >
        <View style={styles.scrollContent}>
          <View style={[styles.gridBody, { height: totalHeight }]}>
            <View style={[styles.timeCol, { width: TIME_COL_WIDTH }]}>
              {timeSlots.map((label, i) => (
                <View
                  key={i}
                  style={[styles.timeSlot, { height: ROW_HEIGHT }]}
                >
                  {label ? <Text style={styles.timeText}>{label}</Text> : null}
                </View>
              ))}
            </View>
            {Array.from({ length: 7 }, (_, col) => (
              <View key={col} style={[styles.dayCol, { width: dayWidth }]}>
                {timeSlots.map((_, row) => (
                  <View
                    key={row}
                    style={[
                      styles.cell,
                      { width: dayWidth, height: ROW_HEIGHT },
                      (col + row) % 2 === 0 && styles.cellAlt,
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
          {placedEvents.map((ev) => (
            <View
              key={ev.id}
              style={[
                styles.eventBlock,
                {
                  left: ev.left + TIME_COL_WIDTH,
                  top: ev.top,
                  width: ev.width,
                  height: ev.height,
                  backgroundColor: ev.color,
                },
              ]}
            >
              <Text style={styles.eventTitle} numberOfLines={2}>
                {ev.title}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f0f4f8',
    maxHeight: 440,
  },
  wrapperFill: {
    flex: 1,
    maxHeight: undefined,
  },
  scroll: {},
  scrollFill: {
    flex: 1,
  },
  scrollContent: { position: 'relative' },
  dayHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    backgroundColor: '#e8eef4',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  timeColSpacer: {},
  dayHeaderCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayHeaderText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
  },
  gridBody: {
    flexDirection: 'row',
    position: 'relative',
  },
  timeCol: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'rgba(0,0,0,0.08)',
  },
  timeSlot: {
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  timeText: {
    fontSize: 10,
    color: '#6b7280',
  },
  dayCol: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'rgba(0,0,0,0.06)',
  },
  cell: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  cellAlt: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  eventBlock: {
    position: 'absolute',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
});
