import React, { useMemo, useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DuoWeekCalendar, GroupHeader, EventProposalCard } from '@/components/CalendarWidget';
import type { DuoCalendarEvent } from '@/components/CalendarWidget';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const BLUE = '#5B9BD5';
const ORANGE = '#F5A623';
const PURPLE = '#9B59B6';
const PINK = '#E85D75';
const GREEN = '#5BA561';

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

function getMockGroupEvents(weekStart: Date): DuoCalendarEvent[] {
  return [
    { id: '1', title: 'Work Presentation', start_at: at(weekStart, 0, 9, 0), end_at: at(weekStart, 0, 10, 0), color: BLUE },
    { id: '2', title: 'Lunch', start_at: at(weekStart, 0, 12, 0), end_at: at(weekStart, 0, 13, 0), color: ORANGE },
    { id: '3', title: 'Alex', start_at: at(weekStart, 1, 12, 0), end_at: at(weekStart, 1, 14, 0), color: ORANGE },
    { id: '4', title: 'Volleyball Game', start_at: at(weekStart, 0, 13, 30), end_at: at(weekStart, 0, 14, 30), color: PURPLE },
    { id: '5', title: 'BBQ Gathering', start_at: at(weekStart, 0, 15, 0), end_at: at(weekStart, 0, 18, 0), color: BLUE },
    { id: '6', title: 'Yoga Class', start_at: at(weekStart, 2, 17, 30), end_at: at(weekStart, 2, 18, 30), color: PINK },
    { id: '7', title: 'Emma', start_at: at(weekStart, 2, 12, 0), end_at: at(weekStart, 2, 15, 0), color: GREEN },
    { id: '8', title: 'Starting', start_at: at(weekStart, 2, 13, 30), end_at: at(weekStart, 2, 14, 0), color: BLUE },
    { id: '9', title: 'BBQ Gathering', start_at: at(weekStart, 6, 17, 0), end_at: at(weekStart, 6, 20, 0), color: GREEN },
  ];
}

export default function GroupCalendarScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { width } = useWindowDimensions();
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));

  const events = useMemo(() => getMockGroupEvents(weekStart), [weekStart]);
  const currentDay = new Date().getDate();

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <GroupHeader
        currentDay={currentDay}
        onBack={handlePrevWeek}
        onCalendar={() => {}}
        onViewChange={() => {}}
        onChat={() => {}}
        onNotifications={() => {}}
      />
      {/* Calendar area: day headers static at top, only time grid scrolls */}
      <View style={styles.calendarArea}>
        <DuoWeekCalendar
          weekStart={weekStart}
          events={events}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
          fillContainer
        />
        {/* Group Study card hovers over calendar – not part of calendar scroll */}
        <View style={[styles.cardOverlay, { maxWidth: width - 32 }]}>
          <EventProposalCard
            title="Group Study"
            timeRange="6:00 - 9:00 pm"
            onAccept={() => {}}
            onReject={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  calendarArea: {
    flex: 1,
    position: 'relative',
    minHeight: 0,
  },
  cardOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 16,
    width: 280,
  },
});
