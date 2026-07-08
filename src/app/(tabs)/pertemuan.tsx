// ============================================================
// HALAMAN B — DAFTAR PERTEMUAN
// Syarat tugas (FlatList, minimal 10 item — di sini 15):
//   • keyExtractor            → key unik per pertemuan (item.id)
//   • ItemSeparatorComponent  → pemisah visual (garis + shuriken)
//   • ListHeaderComponent     → judul "Papan Misi" di atas daftar
//   • ListEmptyComponent      → tampilan saat data kosong
// Item menampilkan: nama matkul, pertemuan ke-, topik, tanggal.
// ============================================================

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientHeader from '../../components/GradientHeader';
import ScrollCard from '../../components/ScrollCard';
import ShurikenSpinner, { ShurikenStar } from '../../components/ShurikenSpinner';
import { COLORS, FONTS, SPACING } from '../../constants/theme';
import { Pertemuan, pertemuan, WARNA_MATKUL } from '../../data/jadwalData';

// ------------------------------------------------------------
// SAKLAR DEMO: ubah ke `true` untuk membuktikan
// ListEmptyComponent berfungsi (lalu screenshot untuk laporan),
// kembalikan ke `false` untuk penggunaan normal.
// ------------------------------------------------------------
const TAMPILKAN_EMPTY_STATE = false;

// Pemisah antar item: garis tipis dengan shuriken kecil di tengah
function ShurikenSeparator() {
  return (
    <View style={styles.sepRow}>
      <View style={styles.sepLine} />
      <ShurikenStar size={12} color={COLORS.headbandBorder} holeColor={COLORS.nightNavy} />
      <View style={styles.sepLine} />
    </View>
  );
}

// Tampilan saat data pertemuan kosong
function EmptyMisi() {
  return (
    <View style={styles.emptyWrap}>
      <ShurikenSpinner size={56} color={COLORS.naruOrange} />
      <Text style={styles.emptyJudul}>Belum ada gulungan misi</Text>
      <Text style={styles.emptySub}>
        Data pertemuan kosong — ListEmptyComponent sedang tampil.
      </Text>
    </View>
  );
}

export default function DaftarPertemuanScreen() {
  const sumberData: Pertemuan[] = TAMPILKAN_EMPTY_STATE ? [] : pertemuan;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <FlatList
        data={sumberData}
        // 1) keyExtractor: key unik per item pertemuan
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ScrollCard index={index} accentColor={WARNA_MATKUL[item.matkul]}>
            <Text style={styles.judulItem}>
              {item.matkul} — Pertemuan {item.ke}
            </Text>
            <Text style={styles.topik}>{item.topik}</Text>
            <View style={styles.tanggalRow}>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={13}
                color={COLORS.inkBrownSub}
              />
              <Text style={styles.tanggal}>{item.tanggal}</Text>
            </View>
          </ScrollCard>
        )}
        // 2) ItemSeparatorComponent: pemisah visual antar item
        ItemSeparatorComponent={ShurikenSeparator}
        // 3) ListHeaderComponent: judul halaman di atas daftar
        ListHeaderComponent={
          <GradientHeader
            kicker="Papan Misi"
            title="Daftar Pertemuan"
            subtitle={`Total ${sumberData.length} pertemuan · Semester Ganjil`}
          />
        }
        // 4) ListEmptyComponent: tampil jika data pertemuan kosong
        ListEmptyComponent={EmptyMisi}
        ListFooterComponent={
          sumberData.length > 0 ? (
            <Text style={styles.footerCaption}>
              FlatList · keyExtractor · ItemSeparator · ListHeader · ListEmpty ✓
            </Text>
          ) : null
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
    flexGrow: 1, // agar empty state bisa berada di tengah layar
  },
  judulItem: {
    color: COLORS.inkBrown,
    fontSize: 14,
    fontWeight: '700',
  },
  topik: {
    color: COLORS.inkBrownSub,
    fontSize: 12,
    marginTop: 3,
  },
  tanggalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 7,
  },
  tanggal: {
    color: COLORS.inkBrownSub,
    fontSize: 12,
  },
  sepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 10,
  },
  sepLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.panelBorder,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyJudul: {
    color: COLORS.textLight,
    fontSize: 18,
    fontFamily: FONTS.display,
    marginTop: 18,
  },
  emptySub: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  footerCaption: {
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 16,
  },
});
