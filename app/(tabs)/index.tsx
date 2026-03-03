import React, { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from '@/components/Themed';
import { PrivateMonthCalendar, PrivateLegend, PrivatePageHeader } from '@/components/CalendarWidget';
import type { CalendarEvent } from '@/components/CalendarWidget';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

// Mock events matching the reference image (spread across current month)
function getMockPrivateEvents(): CalendarEvent[] {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const pad = (n: number) => String(n).padStart(2, '0');
  const date = (day: number) => `${y}-${pad(m)}-${pad(day)}`;
  const at = (day: number, hour: number, min = 0) =>
    new Date(y, m - 1, day, hour, min).toISOString();

  return [
    { id: '1', title: 'Team Meeting', start_at: at(4, 10), end_at: at(4, 11), category: 'work', is_confidential: false, is_recurring: false, status: 'scheduled' },
    { id: '2', title: 'Dinner with Friends', start_at: at(5, 19), end_at: at(5, 21), category: 'personal', is_confidential: false, is_recurring: false, status: 'scheduled' },
    { id: '3', title: 'Family Picnic', start_at: at(6, 11), end_at: at(6, 15), category: 'hobbies', is_confidential: false, is_recurring: false, status: 'scheduled' },
    { id: '4', title: 'Gym Class', start_at: at(7, 9), end_at: at(7, 10), category: 'health', is_confidential: false, is_recurring: true, status: 'scheduled' },
    { id: '5', title: 'Movie Night', start_at: at(8, 19), end_at: at(8, 22), category: 'personal', is_confidential: false, is_recurring: false, status: 'cancelled' },
    { id: '6', title: 'Work Presentation', start_at: at(11, 14), end_at: at(11, 15), category: 'work', is_confidential: false, is_recurring: false, status: 'scheduled' },
    { id: '7', title: 'Yoga Session', start_at: at(12, 8), end_at: at(12, 9), category: 'health', is_confidential: false, is_recurring: true, status: 'scheduled' },
    { id: '8', title: 'Hiking Trip', start_at: at(15, 10), end_at: at(15, 16), category: 'personal', is_confidential: false, is_recurring: false, status: 'scheduled' },
    { id: '9', title: 'Doctor\'s Appointment', start_at: at(18, 14), end_at: at(18, 15), category: 'health', is_confidential: true, is_recurring: false, status: 'scheduled' },
    { id: '10', title: 'Beach Day', start_at: at(21, 10), end_at: at(21, 18), category: 'personal', is_confidential: false, is_recurring: false, status: 'tentative' },
    { id: '11', title: 'Birthday Party', start_at: at(24, 19), end_at: at(24, 23), category: 'personal', is_confidential: false, is_recurring: false, status: 'scheduled' },
    { id: '12', title: 'Project Deadline', start_at: at(27, 17), end_at: at(27, 18), category: 'work', is_confidential: false, is_recurring: false, status: 'scheduled' },
    { id: '13', title: 'Game Night', start_at: at(28, 19), end_at: at(28, 23), category: 'hobbies', is_confidential: false, is_recurring: false, status: 'scheduled' },
  ];
}

export default function PrivateCalendarScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const events = useMemo(() => getMockPrivateEvents(), []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PrivatePageHeader />
      <PrivateMonthCalendar
        events={events}
        onPrevMonth={() => {}}
        onNextMonth={() => {}}
        onAddPress={() => {}}
      />
        <PrivateLegend />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
});
