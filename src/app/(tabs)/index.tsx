// ============================================================
// HALAMAN A — RINGKASAN MATA KULIAH
// Syarat tugas:
//   • Dirender dengan .map() pada array statis (BUKAN FlatList)
//   • Menampilkan: nama matkul, kode, jumlah SKS, nama dosen
//   • Key unik pada setiap item → key={mk.id}
// ============================================================

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChakraBadge from '../../components/ChakraBadge';
import GradientHeader from '../../components/GradientHeader';
import ScrollCard from '../../components/ScrollCard';
import { COLORS, FONTS, SPACING } from '../../constants/theme';
import { mataKuliah, WARNA_MATKUL } from '../../data/jadwalData';

export default function RingkasanMatkulScreen() {
  // Statistik kecil dari data statis (dihitung, bukan hardcode angka)
  const totalMatkul = mataKuliah.length;
  const totalSks = mataKuliah.reduce((jumlah, mk) => jumlah + mk.sks, 0);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.konten} showsVerticalScrollIndicator={false}>
        <GradientHeader
          kicker="Semester Ganjil 2025/2026"
          title="Ringkasan Matkul"
          subtitle="Mata kuliah yang diambil semester ini"
        />

        {/* Panel statistik */}
        <View style={styles.statRow}>
          <View style={styles.statBox}>
            <Text style={styles.statAngka}>{totalMatkul}</Text>
            <Text style={styles.statLabel}>Mata kuliah</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statAngka}>{totalSks}</Text>
            <Text style={styles.statLabel}>Total SKS</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>GULUNGAN MATA KULIAH</Text>

        {/*
          INTI SYARAT A: render daftar dengan .map()
          Setiap elemen diberi key unik dari data statis (mk.id).
        */}
        {mataKuliah.map((mk, index) => (
          <ScrollCard
            key={mk.id}
            index={index}
            accentColor={WARNA_MATKUL[mk.nama]}
            style={styles.kartu}
          >
            <View style={styles.barisAtas}>
              <View style={styles.kolomInfo}>
                <Text style={styles.namaMatkul}>{mk.nama}</Text>
                <Text style={styles.subInfo}>
                  {mk.kode} · {mk.dosen}
                </Text>
              </View>
              <ChakraBadge sks={mk.sks} />
            </View>
          </ScrollCard>
        ))}

        <Text style={styles.footerCaption}>
          Halaman ini dirender dengan .map() dari array statis · key unik: id
        </Text>
      </ScrollView>
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
  statRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.panelNavy,
    borderWidth: 1,
    borderColor: COLORS.panelBorder,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statAngka: {
    color: COLORS.textLight,
    fontSize: 22,
    fontFamily: FONTS.display,
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 10,
  },
  kartu: {
    marginBottom: 10,
  },
  barisAtas: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  kolomInfo: {
    flex: 1,
  },
  namaMatkul: {
    color: COLORS.inkBrown,
    fontSize: 15,
    fontWeight: '700',
  },
  subInfo: {
    color: COLORS.inkBrownSub,
    fontSize: 12,
    marginTop: 3,
  },
  footerCaption: {
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 14,
  },
});
