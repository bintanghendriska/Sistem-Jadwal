// ============================================================
// ChakraBadge — pill kecil penanda jumlah SKS.
// 3 SKS ke atas = "elemen api" (oranye), 2 SKS = "elemen air"
// (biru). Dipakai di kartu Halaman Ringkasan Matkul.
// ============================================================

import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

interface ChakraBadgeProps {
  sks: number;
}

export default function ChakraBadge({ sks }: ChakraBadgeProps) {
  const elemen = sks >= 3 ? COLORS.naruOrange : COLORS.chakraBlue;

  return (
    <View style={[styles.badge, { borderColor: elemen, backgroundColor: `${elemen}1F` }]}>
      <View style={[styles.dot, { backgroundColor: elemen }]} />
      <Text style={styles.text}>{sks} SKS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 3,
    gap: 5,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  text: {
    color: COLORS.inkBrown,
    fontSize: 11,
    fontWeight: '700',
  },
});
