// ============================================================
// ScrollCard — kartu "gulungan misi": krem, batang gulungan
// berwarna di sisi kiri, sudut kanan membulat.
// Efek: entrance stagger (FadeInDown berurutan sesuai index),
// mengecil saat ditekan, plus getaran halus (expo-haptics).
// Dipakai sebagai kartu item di ketiga halaman.
// ============================================================

import * as Haptics from 'expo-haptics';
import { ReactNode } from 'react';
import { Platform, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS } from '../constants/theme';

interface ScrollCardProps {
  index?: number;
  accentColor?: string;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export default function ScrollCard({ index = 0, accentColor = COLORS.naruOrange, style, children }: ScrollCardProps) {
  const getarHalus = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <Animated.View entering={FadeInDown.duration(380).delay(index * 70)}>
      <Pressable
        onPressIn={getarHalus}
        style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
      >
        {/* Batang gulungan (aksen warna per mata kuliah) */}
        <View style={[styles.roll, { backgroundColor: accentColor }]} />
        <View style={styles.body}>{children}</View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.scrollCream,
    borderWidth: 1,
    borderColor: COLORS.scrollBorder,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  roll: {
    width: 5,
  },
  body: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
