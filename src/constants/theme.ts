// ============================================================
// Tema "Shinobi UI" — terinspirasi atmosfer dunia ninja.
// Satu sumber kebenaran untuk seluruh warna & font aplikasi.
// ============================================================

export const COLORS = {
  // Warna utama
  naruOrange: '#FF7A1A', // oranye khas — header, aksen, tab aktif
  akaRed: '#C62828', // merah — ujung gradient header
  chakraBlue: '#3AA7F0', // biru chakra — aksen sekunder
  goldSeal: '#F0B429', // emas segel — highlight kecil

  // Latar (suasana malam)
  nightNavy: '#0D1321', // background utama
  panelNavy: '#16202F', // tab bar & panel statistik
  panelBorder: '#2A3347',

  // "Ikat kepala" (header hari di SectionList)
  headband: '#262D38',
  headbandBorder: '#454F5E',
  headbandPlate: '#1C222C',
  rivet: '#6B7686',
  kanjiOrange: '#FFB27A',

  // Kartu "gulungan misi"
  scrollCream: '#F3E7CC',
  scrollBorder: '#C9A96A',
  scrollRoll: '#8C6A3F',
  inkBrown: '#3B2A17', // teks utama di atas cream
  inkBrownSub: '#7A6142', // teks sekunder di atas cream

  // Teks di atas navy
  textLight: '#E8EDF5',
  textMuted: '#93A0B4',
} as const;

export const FONTS = {
  // Font gaya kuas Jepang (Google Fonts), dimuat di src/app/_layout.tsx
  display: 'PottaOne_400Regular',
} as const;

export const SPACING = {
  screen: 16,
  card: 12,
} as const;

export type ColorToken = keyof typeof COLORS;
