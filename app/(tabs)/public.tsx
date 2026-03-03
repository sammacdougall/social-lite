import React, { useState } from 'react';
import { ScrollView, StyleSheet, Pressable, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { PublicHeader, PublicEventCard } from '@/components/CalendarWidget';
import Colors from '@/constants/Colors';
import { HEADER_GRADIENT_COLORS } from '@/constants/HeaderTheme';
import { useColorScheme } from '@/components/useColorScheme';

// Event images – balloons, runners, business expo style
const EVENT_IMAGES = {
  party: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=96&h=96&fit=crop',
  run: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=96&h=96&fit=crop',
  expo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=96&h=96&fit=crop',
};

// Bottom hero: outdoor market / festival scene
const HERO_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80';

const MOCK_PUBLIC_EVENTS = [
  {
    id: '1',
    title: 'Brand Launch Party',
    dateTime: 'Fri May 12 • 7:00 PM',
    imageUri: EVENT_IMAGES.party,
  },
  {
    id: '2',
    title: 'Charity Fun Run',
    dateTime: 'Sat May 13 • 9:00 AM',
    imageUri: EVENT_IMAGES.run,
  },
  {
    id: '3',
    title: 'Student Biz Expo',
    dateTime: 'Sun May 14 • 1:00 PM',
    imageUri: EVENT_IMAGES.expo,
  },
];

export default function PublicCalendarScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [filter, setFilter] = useState<'nearby' | 'all'>('all');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <PublicHeader onCamera={() => {}} />

      {/* Filter bar */}
      <LinearGradient
        colors={[...HEADER_GRADIENT_COLORS]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.filterBar}
      >
        <Pressable
          style={[styles.filterBtn, filter === 'nearby' && styles.filterBtnActive]}
          onPress={() => setFilter('nearby')}
        >
          <Text style={styles.filterIcon}>🔍</Text>
          <Text style={styles.filterLabel}>Nearby</Text>
        </Pressable>
        <Pressable
          style={[styles.filterBtn, filter === 'all' && styles.filterBtnActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.filterLabel}>All Events</Text>
          <Text style={styles.filterChevron}>▼</Text>
        </Pressable>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Event cards */}
        <View style={styles.eventList}>
          {MOCK_PUBLIC_EVENTS.map((ev) => (
            <PublicEventCard
              key={ev.id}
              title={ev.title}
              dateTime={ev.dateTime}
              imageUri={ev.imageUri}
              onJoin={() => {}}
            />
          ))}
        </View>

        {/* CTA */}
        <Text style={[styles.cta, { color: colors.text }]}>
          100+ Events Near You!
        </Text>

        {/* Bottom illustration – market / community scene */}
        <View style={styles.heroWrap}>
          <Image
            source={{ uri: HERO_IMAGE }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  filterBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  filterIcon: {
    fontSize: 16,
  },
  filterLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  filterChevron: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  eventList: {
    marginBottom: 20,
  },
  cta: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  heroWrap: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
});
