# 🌀 Jadwal Shinobi — Sistem Jadwal Kuliah

> Tugas Praktikum **Pemrograman Mobile** · Handling Lists & Data Rendering
> React Native (Expo) dengan tema visual terinspirasi dunia ninja — dilihat lewat **Expo Go**.

| | |
|---|---|
| Nama | Bintang |
| NIM | 233510676 |
| Kelas | 6C |
| Prodi | Teknik Informatika — Universitas Islam Riau |

---

## 📋 Deskripsi

Aplikasi **Sistem Jadwal Kuliah** berisi tiga halaman yang masing-masing mendemonstrasikan teknik rendering list berbeda di React Native — `.map()`, `FlatList`, dan `SectionList` — dalam satu proyek. Seluruh data bersumber dari **array statis (hardcode)** di `src/data/jadwalData.js`.

## ✅ Pemenuhan Syarat Tugas

| Syarat | Implementasi | Lokasi |
|---|---|---|
| Halaman ringkasan matkul dengan `.map()` | `mataKuliah.map()` di `ScrollView`, menampilkan nama, kode, SKS, dosen | `src/app/(tabs)/index.jsx` |
| Key unik pada `.map()` | `key={mk.id}` dari data statis | `src/app/(tabs)/index.jsx` |
| `FlatList` minimal 10 item | 15 pertemuan (matkul, pertemuan ke-, topik, tanggal) | `src/app/(tabs)/pertemuan.jsx` |
| `keyExtractor` | `(item) => item.id` | `src/app/(tabs)/pertemuan.jsx` |
| `ItemSeparatorComponent` | Garis tipis + shuriken kecil di tengah | `src/app/(tabs)/pertemuan.jsx` |
| `ListHeaderComponent` | Banner gradient "Papan Misi" + total pertemuan | `src/app/(tabs)/pertemuan.jsx` |
| `ListEmptyComponent` | Shuriken berputar + teks "Belum ada gulungan misi" | `src/app/(tabs)/pertemuan.jsx` |
| `SectionList` dikelompokkan per hari | Sections Senin/Selasa/Rabu (matkul, ruangan, jam) | `src/app/(tabs)/jadwal.jsx` |
| Header seksi bergaya beda dari item | Header "ikat kepala ninja" + kanji hari vs kartu gulungan krem, **sticky** | `src/components/HeadbandHeader.jsx` |
| Data dari array statis | 3 array hardcode: `mataKuliah`, `pertemuan`, `jadwalMingguan` | `src/data/jadwalData.js` |

## ✨ Tema & Efek Visual "Shinobi UI"

- **Kartu gulungan misi** — krem dengan batang gulungan berwarna per mata kuliah.
- **Header ikat kepala** — plat kanji hari Jepang (月 Senin · 火 Selasa · 水 Rabu), menempel di atas saat scroll.
- **Banner gradient chakra** — oranye → merah dengan ornamen spiral SVG.
- **Shuriken spinner** — bintang 4 sisi berputar (Reanimated) pada empty state.
- **Entrance stagger** — kartu muncul berurutan dengan `FadeInDown`.
- **Haptic feedback** — getaran halus saat kartu ditekan (`expo-haptics`).
- **Badge chakra SKS** — 3 SKS = oranye (api), 2 SKS = biru (air).
- **Font Potta One** — gaya kuas Jepang untuk judul (Google Fonts).

> Semua elemen visual digambar sendiri sebagai bentuk generik (SVG) — tanpa gambar karakter, logo, atau aset resmi apa pun.

## 🛠 Teknologi

Expo SDK 54 · TypeScript · Expo Router (tab navigation) · React Native Reanimated · `expo-linear-gradient` · `react-native-svg` · `expo-haptics` · `@expo/vector-icons` · `@expo-google-fonts/potta-one`

Semua paket **bundled di Expo Go** — tidak perlu development build.

## 📂 Struktur Proyek

```
jadwal-shinobi/
├── src/
│   ├── app/
│   │   ├── _layout.tsx           → root: muat font + Stack
│   │   └── (tabs)/
│   │       ├── _layout.tsx       → 3 tab (ikon shuriken/gulungan/kalender)
│   │       ├── index.tsx         → Halaman A: Ringkasan Matkul (.map)
│   │       ├── pertemuan.tsx     → Halaman B: Daftar Pertemuan (FlatList)
│   │       └── jadwal.tsx        → Halaman C: Jadwal per Hari (SectionList)
│   ├── components/               → GradientHeader, ScrollCard, HeadbandHeader,
│   │                               ShurikenSpinner, ChakraBadge (semua .tsx)
│   ├── constants/theme.ts        → palet warna & font tema shinobi
│   └── data/jadwalData.ts        → SEMUA DATA STATIS di sini (+ interface TypeScript)
├── docs/
│   ├── PROJECT_PLAN.md           → rencana proyek
│   └── screenshots/              → letakkan screenshot di sini
├── app.json
├── tsconfig.json
└── package.json
```

## 🚀 Cara Menjalankan (Expo Go)

1. Pastikan **Node.js LTS** terpasang di laptop.
2. Install **Expo Go** di HP — [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) / App Store.
3. Di folder proyek:

   ```bash
   npm install
   npx expo start
   ```

4. Scan QR code — Android: dari dalam aplikasi Expo Go · iOS: dari kamera bawaan.
5. HP dan laptop harus berada di **jaringan Wi-Fi yang sama**. Kalau jaringan memblokir (misal Wi-Fi kampus), jalankan:

   ```bash
   npx expo start --tunnel
   ```

## 🧪 Demo `ListEmptyComponent`

Buka `src/app/(tabs)/pertemuan.tsx`, ubah saklar di bagian atas file:

```js
const TAMPILKAN_EMPTY_STATE = true; // ← ubah ke true
```

Halaman Pertemuan akan menampilkan shuriken berputar + pesan kosong. Screenshot untuk bukti, lalu kembalikan ke `false`.

## 📸 Screenshot

| Halaman A — `.map()` | Halaman B — FlatList | Halaman C — SectionList | Empty State |
|---|---|---|---|
| ![Ringkasan](docs/screenshots/halaman-a.png) | ![Pertemuan](docs/screenshots/halaman-b.png) | ![Jadwal](docs/screenshots/halaman-c.png) | ![Empty](docs/screenshots/empty-state.png) |

> Simpan screenshot dari Expo Go ke `docs/screenshots/` dengan nama file di atas.

## 📤 Upload ke GitHub

```bash
git init
git add .
git commit -m "feat: sistem jadwal kuliah - map, FlatList, SectionList (tema shinobi)"
git branch -M main
git remote add origin https://github.com/USERNAME/jadwal-shinobi.git
git push -u origin main
```

> Disarankan commit bertahap per fitur selama pengembangan agar riwayat pekerjaan terlihat jelas.
