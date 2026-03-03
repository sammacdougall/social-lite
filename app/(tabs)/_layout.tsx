import React from 'react';
import { SymbolView } from 'expo-symbols';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const calendarIcon = { ios: 'calendar', android: 'calendar_today', web: 'calendar_today' };
const peopleTwoIcon = { ios: 'person.2', android: 'people', web: 'people' };
const peopleThreeIcon = { ios: 'person.3', android: 'groups', web: 'groups' };
const buildingIcon = { ios: 'building.2', android: 'apartment', web: 'apartment' };
const globeIcon = { ios: 'globe', android: 'public', web: 'public' };

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Private',
          tabBarIcon: ({ color }) => (
            <SymbolView name={calendarIcon} tintColor={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="duo"
        options={{
          title: 'Duo',
          tabBarIcon: ({ color }) => (
            <SymbolView name={peopleTwoIcon} tintColor={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: 'Group',
          tabBarIcon: ({ color }) => (
            <SymbolView name={peopleThreeIcon} tintColor={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color }) => (
            <SymbolView name={buildingIcon} tintColor={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="public"
        options={{
          title: 'Public',
          tabBarIcon: ({ color }) => (
            <SymbolView name={globeIcon} tintColor={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
