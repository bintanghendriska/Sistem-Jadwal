// ============================================================
// HeadbandHeader — header seksi bergaya "ikat kepala ninja":
// strip metal gelap + plat berisi kanji hari Jepang.
// Ini memenuhi syarat SectionList: "Header setiap seksi wajib
// memiliki gaya berbeda dari item biasa" — kontras total dengan
// kartu gulungan krem. Dibungkus latar navy agar rapi saat
// sticky (stickySectionHeadersEnabled).
// ============================================================

import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

interface HeadbandHeaderProps {
  kanji: string;
  hari: string;
  jumlahKelas: number;
}

export default function HeadbandHeader({ kanji, hari, jumlahKelas }: HeadbandHeaderProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.band}>
        <View style={[styles.rivet, { left: 7 }]} />
        <View style={[styles.rivet, { right: 7 }]} />

        {/* Plat metal berisi kanji hari (月 = Senin, 火 = Selasa, ...) */}
        <View style={styles.plate}>
          <Text style={styles.kanji}>{kanji}</Text>
        </View>

        <Text style={styles.hari}>{hari}</Text>
        <View style={styles.spacer} />
        <Text style={styles.jumlah}>{jumlahKelas} kelas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Latar navy supaya konten di belakang tertutup rapi saat header sticky
  wrap: {
    backgroundColor: COLORS.nightNavy,
    paddingTop: 4,
    paddingBottom: 10,
  },
  band: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.headband,
    borderWidth: 1,
    borderColor: COLORS.headbandBorder,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  rivet: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.rivet,
  },
  plate: {
    backgroundColor: COLORS.headbandPlate,
    borderWidth: 1,
    borderColor: COLORS.headbandBorder,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  kanji: {
    color: COLORS.kanjiOrange,
    fontSize: 16,
    fontFamily: FONTS.display,
  },
  hari: {
    color: COLORS.textLight,
    fontSize: 15,
    fontFamily: FONTS.display,
    marginLeft: 10,
  },
  spacer: {
    flex: 1,
  },
  jumlah: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
});
