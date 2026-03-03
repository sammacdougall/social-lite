import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HEADER_BAR_GRADIENT, HEADER_GRADIENT_COLORS } from '@/constants/HeaderTheme';

const GROUP_COLORS = { alex: '#5B9BD5', emma: '#5BA561' };

// Demo headshots for group members
const ALEX_AVATAR = 'https://i.pravatar.cc/128?img=12';
const EMMA_AVATAR = 'https://i.pravatar.cc/128?img=47';
const EXTRA_AVATAR = 'https://i.pravatar.cc/128?img=33';

type GroupHeaderProps = {
  currentDay?: number;
  onBack?: () => void;
  onCalendar?: () => void;
  onViewChange?: () => void;
  onChat?: () => void;
  onNotifications?: () => void;
};

export function GroupHeader({
  currentDay = new Date().getDate(),
  onBack,
  onCalendar,
  onViewChange,
  onChat,
  onNotifications,
}: GroupHeaderProps) {
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
        <View style={[styles.pill, { backgroundColor: GROUP_COLORS.alex }]}>
          <View style={styles.avatar}>
            <Image source={{ uri: ALEX_AVATAR }} style={styles.avatarImage} />
          </View>
          <Text style={styles.pillText}>Alex</Text>
        </View>
        <View style={[styles.avatarStandalone]}>
          <Image source={{ uri: EXTRA_AVATAR }} style={styles.avatarImage} />
        </View>
        <View style={[styles.pill, { backgroundColor: GROUP_COLORS.emma }]}>
          <View style={styles.avatar}>
            <Image source={{ uri: EMMA_AVATAR }} style={styles.avatarImage} />
          </View>
          <Text style={styles.pillText}>Emma</Text>
          <Text style={styles.refreshIcon}>↻</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Pressable onPress={onViewChange} style={styles.iconBtn} hitSlop={8}>
          <Text style={styles.navIcon}>✓</Text>
        </Pressable>
        <Pressable onPress={onChat} style={styles.iconBtn} hitSlop={8}>
          <Text style={styles.navIcon}>💬</Text>
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
    backgroundColor: 'rgba(0,0,0,0.25)',
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
    gap: 6,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 6,
    paddingRight: 10,
    borderRadius: 20,
    gap: 6,
  },
  pillText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  avatarStandalone: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  refreshIcon: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 2,
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
    color: 'rgba(255,255,255,0.95)',
  },
});
