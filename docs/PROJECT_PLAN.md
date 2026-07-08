# Project Plan — Sistem Jadwal Kuliah "Jadwal Shinobi"

**Tugas Praktikum Pemrograman Mobile · Handling Lists & Data Rendering**
React Native (Expo) · Tema visual terinspirasi Naruto · Preview via Expo Go
Deadline: 1 minggu · Pengumpulan: link repository GitHub

---

## 1. Ringkasan Proyek

Aplikasi mobile 3 halaman dengan data statis (hardcode) yang mendemonstrasikan tiga teknik rendering list dalam satu proyek. Tema visual mengangkat atmosfer dunia shinobi — bukan aplikasi jadwal kuliah putih-abu biasa.

| Halaman | Teknik wajib | Isi tiap item | Syarat khusus |
|---|---|---|---|
| Ringkasan Matkul | `.map()` | nama, kode, SKS, dosen | key unik per item |
| Daftar Pertemuan | `FlatList` | matkul, pertemuan ke-, topik, tanggal (min. 10 item) | `keyExtractor`, `ItemSeparatorComponent`, `ListHeaderComponent`, `ListEmptyComponent` |
| Jadwal per Hari | `SectionList` | matkul, ruangan, jam mulai–selesai | header hari bergaya beda dari item |

---

## 2. Konsep Tema: "Shinobi UI"

**Prinsip:** terinspirasi, bukan menyalin. Semua elemen visual digambar sendiri (bentuk generik via SVG) — tanpa gambar karakter, logo, atau simbol desa resmi. Selain original, ini juga aman untuk repo GitHub publik.

**Signature element** (satu hal yang paling diingat): kartu jadwal bergaya **gulungan misi (mission scroll)** krem di atas latar navy malam, dipisahkan header hari berbentuk **ikat kepala ninja** dengan kanji hari Jepang. Efek lain hanya pendukung — jangan tumpuk semua efek di semua tempat agar tidak norak.

### 2.1 Palet warna (`constants/theme.js`)

| Token | Hex | Pemakaian |
|---|---|---|
| `naruOrange` | `#FF7A1A` | Warna utama: header, aksen kartu, ikon tab aktif |
| `akaRed` | `#C62828` | Ujung gradient header, aksen penting |
| `chakraBlue` | `#3AA7F0` | Aksen sekunder, badge 2 SKS |
| `goldSeal` | `#F0B429` | Badge SKS ("segel"), highlight kecil |
| `nightNavy` | `#0D1321` | Background utama (suasana malam) |
| `panelNavy` | `#16202F` | Tab bar, permukaan sekunder |
| `scrollCream` | `#F3E7CC` | Background kartu gulungan |
| `scrollBorder` | `#C9A96A` | Border kartu gulungan |
| `inkBrown` | `#3B2A17` | Teks utama di atas cream |
| `inkBrownSub` | `#7A6142` | Teks sekunder di atas cream |
| `textLight` | `#E8EDF5` | Teks utama di atas navy |
| `textMuted` | `#93A0B4` | Teks sekunder di atas navy |

### 2.2 Tipografi

- Judul halaman & nama hari: **Potta One** (Google Fonts, gaya kuas Jepang) via `@expo-google-fonts/potta-one`, dimuat dengan `useFonts` di root layout.
- Teks isi: font sistem default — keterbacaan tetap nomor satu.

### 2.3 Efek visual khas (semua kompatibel Expo Go)

1. **Header gradient chakra** — `LinearGradient` oranye → merah dengan ornamen spiral generik (`react-native-svg`) samar di sudut.
2. **Shuriken spinner** — bintang 4 sisi digambar dengan `react-native-svg`, diputar terus memakai Reanimated (`withRepeat(withTiming(...))`). Dipakai di `ListEmptyComponent` dan sebagai aksen loading.
3. **Kartu gulungan (scroll card)** — background cream, border coklat, strip gelap tipis di sisi kiri sebagai "batang gulungan", aksen oranye.
4. **Header hari "ikat kepala"** — strip gelap metalik + plat berisi kanji hari dan nama hari, sticky saat scroll: 月 Senin · 火 Selasa · 水 Rabu · 木 Kamis · 金 Jumat.
5. **Entrance stagger** — kartu muncul berurutan dengan `entering={FadeInDown.delay(index * 80)}` (Reanimated) — kesan kilat berpindah (shunshin).
6. **Press feedback** — kartu mengecil ke scale 0.97 + getar halus `expo-haptics` saat ditekan.
7. **Badge chakra SKS** — pill kecil: 3 SKS = oranye (elemen api), 2 SKS = biru (elemen air).
8. **Tab bar gelap** — ikon `MaterialCommunityIcons`: `shuriken` (Ringkasan), `script-text-outline` (Pertemuan), `calendar-week` (Jadwal); tint aktif oranye.

### 2.4 Mapping efek → syarat penilaian

| Syarat tugas | Wujud dalam tema |
|---|---|
| `ListHeaderComponent` | Banner gradient "Papan Misi — Total N pertemuan · Semester Ganjil" |
| `ItemSeparatorComponent` | Garis putus-putus dengan titik shuriken kecil di tengah |
| `ListEmptyComponent` | Shuriken berputar + teks "Belum ada gulungan misi" |
| Header seksi bergaya beda | Ikat kepala kanji — kontras total dari kartu cream ✓ |
| Key unik | Semua data punya field `id` string unik |

---

## 3. Tech Stack & Dependencies

Basis: **Expo SDK terbaru**, template default `create-expo-app` (sudah berisi Expo Router, Reanimated, `@expo/vector-icons`, `expo-haptics`, `expo-font`).

```bash
npx create-expo-app@latest jadwal-shinobi
cd jadwal-shinobi

# tambahan untuk efek visual
npx expo install expo-linear-gradient react-native-svg

# font tema
npx expo install @expo-google-fonts/potta-one
```

Semua paket di atas **bundled di Expo Go** — tidak butuh development build. Aturan main: jangan menambah paket native lain tanpa mengecek dukungannya di docs.expo.dev, atau aplikasi tidak akan jalan di Expo Go.

---

## 4. Struktur Proyek

```
jadwal-shinobi/
├── app/
│   └── (tabs)/
│       ├── _layout.tsx        → definisi 3 tab + styling tab bar gelap
│       ├── index.tsx          → Halaman A: Ringkasan Matkul (.map)
│       ├── pertemuan.tsx      → Halaman B: Daftar Pertemuan (FlatList)
│       └── jadwal.tsx         → Halaman C: Jadwal per Hari (SectionList)
├── components/
│   ├── GradientHeader.tsx     → banner gradient chakra
│   ├── ScrollCard.tsx         → kartu gulungan (dipakai 3 halaman)
│   ├── HeadbandHeader.tsx     → header hari kanji (SectionList)
│   ├── ShurikenSpinner.tsx    → SVG bintang 4 sisi + rotasi Reanimated
│   └── ChakraBadge.tsx        → pill SKS
├── constants/
│   └── theme.ts                → palet warna + ukuran
└── data/
    └── jadwalData.ts          → 3 array statis + interface TypeScript
```

---

## 5. Desain Data (`data/jadwalData.js`)

```js
export const mataKuliah = [
  { id: 'MK1', nama: 'Pemrograman Mobile', kode: 'IF-401', sks: 3, dosen: 'Dr. Ahmad Fauzi' },
  // ...total 5 matkul
];

export const pertemuan = [
  { id: 'P1', matkul: 'Pemrograman Mobile', ke: 1, topik: 'Pengenalan React Native', tanggal: '4 Sep 2025' },
  // ...3 pertemuan × 5 matkul = 15 item (syarat minimum 10, ambil lebih biar aman)
];

export const jadwalMingguan = [
  { title: 'Senin', kanji: '月', data: [
    { id: 'J1', matkul: 'Pemrograman Mobile', ruangan: 'A201', jam: '08.00 – 10.30' },
  ]},
  { title: 'Selasa', kanji: '火', data: [ /* ... */ ]},
  { title: 'Rabu', kanji: '水', data: [ /* ... */ ]},
];
```

Bentuk `jadwalMingguan` sengaja mengikuti format `sections` milik SectionList (`{ title, data }`) sehingga tidak perlu transformasi; field `kanji` tinggal dibaca di `renderSectionHeader`.

---

## 6. Rencana per Halaman

### Halaman A — Ringkasan Matkul (`.map()`)
- `ScrollView` berisi `mataKuliah.map((mk, index) => <ScrollCard key={mk.id} ... />)`.
- Wajib `.map()`, bukan FlatList — soal spesifik meminta ini.
- Tiap kartu: nama matkul, kode, `ChakraBadge` SKS, nama dosen, entrance stagger.

### Halaman B — Daftar Pertemuan (`FlatList`)
```jsx
<FlatList
  data={pertemuan}
  keyExtractor={(item) => item.id}
  renderItem={({ item, index }) => <ScrollCard pertemuan={item} index={index} />}
  ItemSeparatorComponent={ShurikenSeparator}
  ListHeaderComponent={<GradientHeader total={pertemuan.length} />}
  ListEmptyComponent={<EmptyMisi />}
  contentContainerStyle={{ padding: 16 }}
/>
```
- Bukti `ListEmptyComponent`: ganti sementara `data={[]}`, screenshot, kembalikan. Screenshot masuk README.

### Halaman C — Jadwal per Hari (`SectionList`)
- `sections={jadwalMingguan}`, `stickySectionHeadersEnabled`.
- `renderSectionHeader` → `HeadbandHeader` (kanji + nama hari) — kontras jelas dari item (syarat terpenuhi eksplisit).
- Item: matkul, ruangan, jam mulai–selesai.

---

## 7. Menjalankan & Preview via Expo Go

1. Install **Expo Go** dari Play Store (Android) / App Store (iOS).
2. Di folder proyek: `npx expo start`.
3. Scan QR code — Android: dari dalam app Expo Go; iOS: dari kamera bawaan.
4. HP dan laptop **harus satu jaringan Wi‑Fi**. Kalau jaringan kampus memblokir/beda subnet, pakai: `npx expo start --tunnel`.
5. Perubahan kode ter-reload otomatis (Fast Refresh); kalau macet, tekan `r` di terminal atau shake device → Reload.

---

## 8. Timeline 7 Hari

| Hari | Target |
|---|---|
| 1 | Setup proyek, `theme.js`, `jadwalData.js`, tab layout gelap jalan di Expo Go |
| 2 | Komponen `ScrollCard` + Halaman A (.map) selesai |
| 3 | Halaman B: FlatList + keempat props berfungsi |
| 4 | Halaman C: SectionList + `HeadbandHeader` sticky |
| 5 | Efek: gradient header, shuriken spinner, stagger, haptics, font Potta One |
| 6 | Polish, screenshot 4+ (termasuk bukti empty state), tulis README |
| 7 | Buffer perbaikan, push final, submit link repo |

---

## 9. Checklist Definition of Done

- [ ] Halaman A dirender dengan `.map()` + key unik, tanpa warning di console
- [ ] FlatList ≥ 10 item, keempat props terbukti berfungsi
- [ ] Screenshot `ListEmptyComponent` tersimpan di README
- [ ] Header hari SectionList sticky dan bergaya jelas beda dari item
- [ ] Seluruh data berasal dari array statis dalam proyek
- [ ] Aplikasi berjalan mulus di Expo Go (uji minimal di Android)
- [ ] README lengkap: deskripsi, cara run, daftar fitur, 4+ screenshot
- [ ] Repo publik, riwayat commit bertahap per fitur

---

## 10. Konvensi Git & README

Commit bertahap per fitur (riwayat yang wajar = bukti kerja sendiri):

```
chore: init expo project + theme constants
feat: static data jadwal kuliah
feat: halaman ringkasan matkul dengan .map()
feat: halaman pertemuan FlatList + 4 props
feat: halaman jadwal SectionList + headband header
feat: efek visual shinobi (gradient, shuriken, stagger)
docs: README + screenshot
```

Kerangka README: judul + tagline tema → deskripsi tugas → fitur per halaman (sebut teknik rendering yang dipakai) → cara menjalankan via Expo Go → screenshot → identitas (nama, NIM, kelas).

---

## 11. Catatan Hak Cipta

Tema ini *terinspirasi* estetika Naruto lewat warna, motif ninja generik (shuriken, gulungan, kanji hari), dan gaya gerak — tanpa memakai aset resmi apa pun. Jangan commit gambar karakter, logo, atau simbol desa ke repo; semua ornamen digambar sendiri sebagai SVG. Repo tetap bersih secara IP dan justru terlihat lebih orisinal saat dinilai.
