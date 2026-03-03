import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

type PublicEventCardProps = {
  title: string;
  dateTime: string;
  imageUri: string;
  onJoin?: () => void;
};

export function PublicEventCard({ title, dateTime, imageUri, onJoin }: PublicEventCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.textBlock}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.meta}>{dateTime}</Text>
        </View>
        <Image source={{ uri: imageUri }} style={styles.icon} />
      </View>
      <Pressable style={styles.joinBtn} onPress={onJoin}>
        <Text style={styles.joinBtnText}>Join</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#e8f0f8',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  meta: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  joinBtn: {
    backgroundColor: '#4A90D9',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  joinBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
