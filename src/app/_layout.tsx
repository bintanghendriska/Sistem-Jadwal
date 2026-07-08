// ============================================================
// Root layout (expo-router).
// Tugasnya: memuat font Potta One (Google Fonts) lalu
// merender Stack berisi grup tab. Selama font dimuat,
// tampilkan layar navy polos agar tidak berkedip putih.
// ============================================================

import { PottaOne_400Regular, useFonts } from '@expo-google-fonts/potta-one';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { COLORS } from '../constants/theme';

export default function RootLayout() {
  const [fontSiap] = useFonts({ PottaOne_400Regular });

  if (!fontSiap) {
    return <View style={{ flex: 1, backgroundColor: COLORS.nightNavy }} />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.nightNavy },
        }}
      />
    </>
  );
}
