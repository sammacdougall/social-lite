import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

// Demo headshots for group event participants (4 people)
const PARTICIPANT_AVATARS = [
  'https://i.pravatar.cc/128?img=12',
  'https://i.pravatar.cc/128?img=47',
  'https://i.pravatar.cc/128?img=33',
  'https://i.pravatar.cc/128?img=68',
];

type EventProposalCardProps = {
  title?: string;
  timeRange?: string;
  participantAvatarUris?: string[];
  onAccept?: () => void;
  onReject?: () => void;
};

export function EventProposalCard({
  title = 'Group Study',
  timeRange = '6:00 - 9:00 pm',
  participantAvatarUris = PARTICIPANT_AVATARS,
  onAccept,
  onReject,
}: EventProposalCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.time}>{timeRange}</Text>
      <View style={styles.avatarsRow}>
        {participantAvatarUris.slice(0, 4).map((uri, i) => (
          <View key={i} style={styles.participantAvatar}>
            <Image source={{ uri }} style={styles.participantImage} />
          </View>
        ))}
      </View>
      <View style={styles.actions}>
        <Pressable style={styles.acceptBtn} onPress={onAccept}>
          <Text style={styles.acceptText}>✓ Accept</Text>
        </Pressable>
        <Pressable style={styles.rejectBtn} onPress={onReject}>
          <Text style={styles.rejectText}>Reject</Text>
        </Pressable>
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
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 14,
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  participantImage: {
    width: '100%',
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: '#4A90D9',
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
  rejectBtn: {
    flex: 1,
    backgroundColor: '#E85D75',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
