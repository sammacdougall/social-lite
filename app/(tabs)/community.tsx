import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Pressable, Text, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DuoWeekCalendar,
  CommunityHeader,
  CommunityEventCard,
} from '@/components/CalendarWidget';
import type { DuoCalendarEvent } from '@/components/CalendarWidget';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const GREEN = '#5BA561';
const YELLOW = '#E8B923';
const GRAY = '#9CA3AF';

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function at(weekStart: Date, dayOffset: number, hour: number, minute: number): string {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function getMockCommunityEvents(weekStart: Date): DuoCalendarEvent[] {
  return [
    { id: '1', title: 'Soccer Practice', start_at: at(weekStart, 0, 18, 0), end_at: at(weekStart, 0, 19, 0), color: GREEN },
    { id: '2', title: 'Game Night', start_at: at(weekStart, 1, 19, 0), end_at: at(weekStart, 1, 22, 0), color: YELLOW },
    { id: '3', title: 'Local Tournament', start_at: at(weekStart, 2, 12, 0), end_at: at(weekStart, 2, 21, 0), color: GREEN },
    { id: '4', title: 'invit Events', start_at: at(weekStart, 2, 14, 30), end_at: at(weekStart, 2, 15, 0), color: GRAY },
  ];
}

export default function CommunityCalendarScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['sports', 'hiking']);

  const events = useMemo(() => getMockCommunityEvents(weekStart), [weekStart]);

  const handlePrevWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() - 7);
    setWeekStart(next);
  };

  const handleNextWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
  };

  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <CommunityHeader
        onBack={() => {}}
        onCalendar={() => {}}
        onNotifications={() => {}}
        selectedFilters={selectedFilters}
        onFilterPress={toggleFilter}
      />

      {/* Left / Right week navigation */}
      <View style={styles.navRow}>
        <Pressable
          onPress={handlePrevWeek}
          style={styles.navBtn}
          hitSlop={12}
          accessibilityLabel="Previous week"
        >
          <Text style={[styles.navArrow, { color: colors.text }]}>{'<'}</Text>
        </Pressable>
        <View style={styles.weekLabel}>
          <Text style={[styles.weekLabelText, { color: colors.text }]} numberOfLines={1}>
            {weekStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            {' – '}
            {new Date(weekStart.getTime() + 6 * 86400000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </Text>
        </View>
        <Pressable
          onPress={handleNextWeek}
          style={styles.navBtn}
          hitSlop={12}
          accessibilityLabel="Next week"
        >
          <Text style={[styles.navArrow, { color: colors.text }]}>{'>'}</Text>
        </Pressable>
      </View>

      {/* Calendar: day headers static, time grid scrollable */}
      <View style={styles.calendarArea}>
        <DuoWeekCalendar
          weekStart={weekStart}
          events={events}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
          fillContainer
        />
        {/* Hovering event card – not part of calendar scroll */}
        <View style={[styles.cardOverlay, isLandscape && styles.cardOverlayLandscape]}>
          <CommunityEventCard
            title="Game Night"
            timeRange="7:00 pm - 10:00 pm"
            isNew
            onAccept={() => {}}
            onDecline={() => {}}
          />
        </View>
        {/* FAB: Add event */}
        <Pressable
          style={({ pressed }) => [
            styles.fab,
            { backgroundColor: colors.tint || '#4A90D9' },
            pressed && styles.fabPressed,
          ]}
        >
          <Text style={styles.fabText}>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    minHeight: 0,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navArrow: {
    fontSize: 22,
    fontWeight: '600',
  },
  weekLabel: {
    flex: 1,
    alignItems: 'center',
  },
  weekLabelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  calendarArea: {
    flex: 1,
    position: 'relative',
    minHeight: 0,
  },
  cardOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 72,
    width: 280,
  },
  cardOverlayLandscape: {
    width: 260,
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  fabPressed: {
    opacity: 0.9,
  },
  fabText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '300',
    lineHeight: 32,
  },
});
