import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

const PARTICIPANT_AVATARS = [
  'https://i.pravatar.cc/128?img=12',
  'https://i.pravatar.cc/128?img=47',
  'https://i.pravatar.cc/128?img=33',
  'https://i.pravatar.cc/128?img=68',
  'https://i.pravatar.cc/128?img=22',
  'https://i.pravatar.cc/128?img=45',
];

type CommunityEventCardProps = {
  title?: string;
  timeRange?: string;
  isNew?: boolean;
  participantAvatarUris?: string[];
  onAccept?: () => void;
  onDecline?: () => void;
};

export function CommunityEventCard({
  title = 'Game Night',
  timeRange = '7:00 pm - 10:00 pm',
  isNew = true,
  participantAvatarUris = PARTICIPANT_AVATARS,
  onAccept,
  onDecline,
}: CommunityEventCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title} ⭐</Text>
        {isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newText}>New</Text>
          </View>
        )}
      </View>
      <Text style={styles.time}>{timeRange}</Text>
      <View style={styles.avatarsRow}>
        {participantAvatarUris.slice(0, 6).map((uri, i) => (
          <View key={i} style={styles.avatar}>
            <Image source={{ uri }} style={styles.avatarImage} />
          </View>
        ))}
        <Text style={styles.moreArrow}>›</Text>
      </View>
      <Text style={styles.addressLabel}>ADDRESS</Text>
      <View style={styles.actions}>
        <Pressable style={styles.acceptBtn} onPress={onAccept}>
          <Text style={styles.acceptText}>✓ Accept</Text>
        </Pressable>
        <Pressable style={styles.declineBtn} onPress={onDecline}>
          <Text style={styles.declineText}>✕ Decline</Text>
        </Pressable>
      </View>
      <View style={styles.reminder}>
        <Text style={styles.reminderIcon}>🔔</Text>
        <Text style={styles.reminderText}>Reminder set for 1 hour before</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  newBadge: {
    backgroundColor: '#9B59B6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  time: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 6,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  moreArrow: {
    fontSize: 20,
    color: '#9ca3af',
    marginLeft: 4,
  },
  addressLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9ca3af',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: '#5BA561',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  declineBtn: {
    flex: 1,
    backgroundColor: '#E85D75',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  reminder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reminderIcon: {
    fontSize: 14,
  },
  reminderText: {
    fontSize: 12,
    color: '#6b7280',
  },
});
