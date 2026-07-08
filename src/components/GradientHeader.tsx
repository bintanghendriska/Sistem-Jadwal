// ============================================================
// GradientHeader — banner "chakra" oranye → merah dengan
// ornamen spiral generik (react-native-svg) di pojok kanan.
// Dipakai sebagai judul di ketiga halaman; di Halaman Pertemuan
// komponen ini menjadi ListHeaderComponent milik FlatList.
// ============================================================

import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FONTS } from '../constants/theme';

interface GradientHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
}

export default function GradientHeader({ kicker, title, subtitle }: GradientHeaderProps) {
  return (
    <LinearGradient
      colors={[COLORS.naruOrange, COLORS.akaRed]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.wrap}
    >
      {/* Spiral dekoratif — bentuk generik, digambar sendiri */}
      <Svg style={styles.spiral} width={120} height={120} viewBox="0 0 110 110">
        <Path
          d="M55 55 a5 5 0 0 1 10 0 a10 10 0 0 1 -20 0 a15 15 0 0 1 30 0 a20 20 0 0 1 -40 0 a25 25 0 0 1 50 0"
          stroke="#FFF3E4"
          strokeOpacity={0.28}
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>

      {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    overflow: 'hidden',
    marginBottom: 16,
  },
  spiral: {
    position: 'absolute',
    right: -22,
    top: -22,
  },
  kicker: {
    color: '#FFE3C7',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: FONTS.display,
  },
  subtitle: {
    color: '#FFE3C7',
    fontSize: 13,
    marginTop: 4,
  },
});
