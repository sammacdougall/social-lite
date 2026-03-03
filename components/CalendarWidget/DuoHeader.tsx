import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HEADER_BAR_GRADIENT, HEADER_GRADIENT_COLORS } from '@/constants/HeaderTheme';

const DUO_COLORS = { alex: '#5B9BD5', sam: '#E85D75' };

// Demo headshot placeholders (pass alexAvatarUri / samAvatarUri to override)
const ALEX_AVATAR = 'https://i.pravatar.cc/128?img=12';
const SAM_AVATAR = 'https://i.pravatar.cc/128?img=47';

type DuoHeaderProps = {
  currentDay?: number;
  alexAvatarUri?: string | null;
  samAvatarUri?: string | null;
  onBack?: () => void;
  onCalendar?: () => void;
  onViewChange?: () => void;
  onPlay?: () => void;
  onNotifications?: () => void;
};

export function DuoHeader({
  currentDay = new Date().getDate(),
  alexAvatarUri,
  samAvatarUri,
  onBack,
  onCalendar,
  onViewChange,
  onPlay,
  onNotifications,
}: DuoHeaderProps) {
  return (
    <LinearGradient
      colors={[...HEADER_GRADIENT_COLORS]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <View style={styles.left}>
        <Pressable onPress={onBack} style={styles.iconBtn} hitSlop={8}>
          <Text style={styles.chevron}>{'<'}</Text>
        </Pressable>
        <Pressable onPress={onCalendar} style={styles.calendarBadge} hitSlop={8}>
          <Text style={styles.calendarIcon}>📅</Text>
          <View style={styles.dayBadge}>
            <Text style={styles.dayNum}>{currentDay}</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.center}>
        <View style={[styles.pill, { backgroundColor: DUO_COLORS.alex }]}>
          <Text style={styles.pillText}>Alex</Text>
          <View style={styles.avatar}>
            <Image
              source={{ uri: alexAvatarUri ?? ALEX_AVATAR }}
              style={styles.avatarImage}
            />
          </View>
        </View>
        <View style={[styles.pill, { backgroundColor: DUO_COLORS.sam }]}>
          <Text style={styles.pillText}>Sam</Text>
          <View style={styles.avatar}>
            <Image
              source={{ uri: samAvatarUri ?? SAM_AVATAR }}
              style={styles.avatarImage}
            />
          </View>
        </View>
      </View>
      <View style={styles.right}>
        <Pressable onPress={onViewChange} style={styles.iconBtn} hitSlop={8}>
          <Text style={styles.navIcon}>⊞</Text>
        </Pressable>
        <Pressable onPress={onPlay} style={styles.iconBtn} hitSlop={8}>
          <Text style={styles.navIcon}>▶</Text>
        </Pressable>
        <Pressable onPress={onNotifications} style={styles.iconBtn} hitSlop={8}>
          <Text style={styles.navIcon}>🔔</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...HEADER_BAR_GRADIENT,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  chevron: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  calendarBadge: {
    position: 'relative',
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarIcon: {
    fontSize: 18,
  },
  dayBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1e3a5f',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  dayNum: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 6,
    borderRadius: 20,
    gap: 6,
  },
  pillText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 4,
  },
  navIcon: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
});
