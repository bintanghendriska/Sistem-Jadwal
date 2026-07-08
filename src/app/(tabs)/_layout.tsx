// ============================================================
// Layout tab — 3 halaman tugas:
// 1. Matkul     → .map()       (index.tsx)
// 2. Pertemuan  → FlatList     (pertemuan.tsx)
// 3. Jadwal     → SectionList  (jadwal.tsx)
// Tab bar gelap dengan tint oranye ala tema shinobi.
// ============================================================

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { COLORS } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.naruOrange,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.panelNavy,
          borderTopColor: COLORS.panelBorder,
        },
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Matkul',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shuriken" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pertemuan"
        options={{
          title: 'Pertemuan',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="script-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="jadwal"
        options={{
          title: 'Jadwal',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-week" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
