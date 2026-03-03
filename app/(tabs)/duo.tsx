import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '@/components/Themed';
import { DuoHeader, DuoWeekCalendar, type DuoCalendarEvent } from '@/components/CalendarWidget';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const ALEX_COLOR = '#5B9BD5';
const SAM_COLOR = '#E85D75';

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

function getMockDuoEvents(weekStart: Date): DuoCalendarEvent[] {
  return [
    { id: '1', title: 'Yoga Class', start_at: at(weekStart, 0, 12, 0), end_at: at(weekStart, 0, 13, 30), color: ALEX_COLOR },
    { id: '2', title: 'Work Meeting', start_at: at(weekStart, 0, 11, 30), end_at: at(weekStart, 0, 12, 0), color: ALEX_COLOR },
    { id: '3', title: 'Work Meeting', start_at: at(weekStart, 3, 11, 30), end_at: at(weekStart, 3, 12, 0), color: ALEX_COLOR },
    { id: '4', title: 'Hiking Trip', start_at: at(weekStart, 4, 12, 0), end_at: at(weekStart, 4, 13, 30), color: ALEX_COLOR },
    { id: '5', title: 'Movie Night', start_at: at(weekStart, 1, 12, 0), end_at: at(weekStart, 1, 13, 30), color: SAM_COLOR },
    { id: '6', title: 'Movie Night', start_at: at(weekStart, 2, 11, 30), end_at: at(weekStart, 2, 12, 0), color: SAM_COLOR },
    { id: '7', title: 'Dinner Date', start_at: at(weekStart, 2, 12, 0), end_at: at(weekStart, 2, 13, 0), color: SAM_COLOR },
    { id: '8', title: 'Movie Night', start_at: at(weekStart, 2, 13, 30), end_at: at(weekStart, 2, 14, 0), color: SAM_COLOR },
    { id: '9', title: 'Work Training', start_at: at(weekStart, 5, 11, 30), end_at: at(weekStart, 5, 12, 30), color: SAM_COLOR },
    { id: '10', title: 'Gym Session', start_at: at(weekStart, 5, 13, 0), end_at: at(weekStart, 5, 14, 0), color: SAM_COLOR },
  ];
}

export default function DuoCalendarScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));

  const events = useMemo(() => getMockDuoEvents(weekStart), [weekStart]);
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
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <DuoHeader
        currentDay={currentDay}
        onBack={handlePrevWeek}
        onCalendar={() => {}}
        onViewChange={() => {}}
        onPlay={() => {}}
        onNotifications={() => {}}
      />
        <DuoWeekCalendar
          weekStart={weekStart}
          events={events}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
});
