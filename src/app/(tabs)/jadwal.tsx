// ============================================================
// HALAMAN C — JADWAL PER HARI
// Syarat tugas (SectionList):
//   • Jadwal dikelompokkan berdasarkan hari (sections)
//   • Item menampilkan: nama matkul, ruangan, jam mulai–selesai
//   • Header seksi bergaya BEDA dari item → HeadbandHeader
//     (ikat kepala ninja + kanji hari) vs kartu gulungan krem
// Bonus: stickySectionHeadersEnabled agar nama hari menempel
// di atas saat di-scroll.
// ============================================================

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientHeader from '../../components/GradientHeader';
import HeadbandHeader from '../../components/HeadbandHeader';
import ScrollCard from '../../components/ScrollCard';
import { COLORS, SPACING } from '../../constants/theme';
import { jadwalMingguan, WARNA_MATKUL } from '../../data/jadwalData';

export default function JadwalPerHariScreen() {
  const totalKelas = jadwalMingguan.reduce((jumlah, seksi) => jumlah + seksi.data.length, 0);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <SectionList
        sections={jadwalMingguan}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled
        renderItem={({ item, index }) => (
          <ScrollCard index={index} accentColor={WARNA_MATKUL[item.matkul]}>
            <View style={styles.barisAtas}>
              <Text style={styles.namaMatkul}>{item.matkul}</Text>
              {/* Chip jam mulai–selesai */}
              <View style={styles.jamChip}>
                <MaterialCommunityIcons name="clock-outline" size={12} color={COLORS.inkBrown} />
                <Text style={styles.jamText}>{item.jam}</Text>
              </View>
            </View>
            <View style={styles.ruangRow}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={13}
                color={COLORS.inkBrownSub}
              />
              <Text style={styles.ruangan}>{item.ruangan}</Text>
            </View>
          </ScrollCard>
        )}
        // Header seksi: gaya "ikat kepala" — jelas berbeda dari item
        renderSectionHeader={({ section }) => (
          <HeadbandHeader
            kanji={section.kanji}
            hari={section.title}
            jumlahKelas={section.data.length}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.jarakItem} />}
        renderSectionFooter={() => <View style={styles.jarakSeksi} />}
        ListHeaderComponent={
          <GradientHeader
            kicker="Jadwal Mingguan"
            title="Jadwal per Hari"
            subtitle={`${totalKelas} kelas · dikelompokkan dengan SectionList`}
          />
        }
        ListFooterComponent={
          <Text style={styles.footerCaption}>
            SectionList · header hari sticky dengan gaya berbeda dari item ✓
          </Text>
        }
        contentContainerStyle={styles.konten}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.nightNavy,
  },
  konten: {
    padding: SPACING.screen,
    paddingBottom: 32,
  },
  barisAtas: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  namaMatkul: {
    flex: 1,
    color: COLORS.inkBrown,
    fontSize: 14,
    fontWeight: '700',
  },
  jamChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${COLORS.scrollBorder}55`,
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  jamText: {
    color: COLORS.inkBrown,
    fontSize: 11,
    fontWeight: '700',
  },
  ruangRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
  },
  ruangan: {
    color: COLORS.inkBrownSub,
    fontSize: 12,
  },
  jarakItem: {
    height: 8,
  },
  jarakSeksi: {
    height: 10,
  },
  footerCaption: {
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 14,
  },
});
