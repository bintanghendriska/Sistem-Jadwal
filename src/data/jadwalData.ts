// ============================================================
// SUMBER DATA STATIS (HARDCODE) — syarat utama tugas:
// "Data seluruh aplikasi bersumber dari array statis yang
//  didefinisikan di dalam proyek."
// Setiap item memiliki field `id` unik → dipakai sebagai key.
// ============================================================

import { COLORS } from '../constants/theme';

export interface MataKuliah {
  id: string;
  nama: string;
  kode: string;
  sks: number;
  dosen: string;
}

export interface Pertemuan {
  id: string;
  matkul: string;
  ke: number;
  topik: string;
  tanggal: string;
}

export interface JadwalItem {
  id: string;
  matkul: string;
  ruangan: string;
  jam: string;
}

export interface JadwalSeksi {
  title: string;
  kanji: string;
  data: JadwalItem[];
}

// ------------------------------------------------------------
// A. Mata kuliah semester ini (5 matkul)
//    Dipakai Halaman Ringkasan (.map)
// ------------------------------------------------------------
export const mataKuliah: MataKuliah[] = [
  { id: 'MK1', nama: 'Pemrograman Mobile', kode: 'IF-401', sks: 3, dosen: 'Dr. Ahmad Fauzi' },
  { id: 'MK2', nama: 'Basis Data Lanjut', kode: 'IF-312', sks: 3, dosen: 'Dr. Sari Dewi' },
  { id: 'MK3', nama: 'Kecerdasan Buatan', kode: 'IF-405', sks: 3, dosen: 'Dr. Rizal Hakim' },
  { id: 'MK4', nama: 'Jaringan Komputer', kode: 'IF-308', sks: 2, dosen: 'Dr. Putri Indah' },
  { id: 'MK5', nama: 'Rekayasa Perangkat Lunak', kode: 'IF-402', sks: 3, dosen: 'Dr. Hendra Putra' },
];

// Warna aksen per mata kuliah (untuk batang gulungan di kartu)
export const WARNA_MATKUL: Record<string, string> = {
  'Pemrograman Mobile': COLORS.naruOrange,
  'Basis Data Lanjut': COLORS.chakraBlue,
  'Kecerdasan Buatan': COLORS.akaRed,
  'Jaringan Komputer': COLORS.goldSeal,
  'Rekayasa Perangkat Lunak': COLORS.scrollRoll,
};

// ------------------------------------------------------------
// B. Daftar pertemuan — 15 item (syarat minimum: 10)
//    Dipakai Halaman Daftar Pertemuan (FlatList), urut tanggal
// ------------------------------------------------------------
export const pertemuan: Pertemuan[] = [
  { id: 'P01', matkul: 'Pemrograman Mobile', ke: 1, topik: 'Pengenalan React Native & Expo', tanggal: '4 Sep 2025' },
  { id: 'P02', matkul: 'Basis Data Lanjut', ke: 1, topik: 'Review SQL Dasar', tanggal: '5 Sep 2025' },
  { id: 'P03', matkul: 'Kecerdasan Buatan', ke: 1, topik: 'Intro AI & Machine Learning', tanggal: '6 Sep 2025' },
  { id: 'P04', matkul: 'Jaringan Komputer', ke: 1, topik: 'Model OSI & TCP/IP', tanggal: '8 Sep 2025' },
  { id: 'P05', matkul: 'Rekayasa Perangkat Lunak', ke: 1, topik: 'SDLC & Model Proses', tanggal: '9 Sep 2025' },
  { id: 'P06', matkul: 'Pemrograman Mobile', ke: 2, topik: 'Komponen & Props', tanggal: '11 Sep 2025' },
  { id: 'P07', matkul: 'Basis Data Lanjut', ke: 2, topik: 'Normalisasi & ERD Lanjut', tanggal: '12 Sep 2025' },
  { id: 'P08', matkul: 'Kecerdasan Buatan', ke: 2, topik: 'Metode Pencarian & Heuristik', tanggal: '13 Sep 2025' },
  { id: 'P09', matkul: 'Jaringan Komputer', ke: 2, topik: 'Subnetting IPv4', tanggal: '15 Sep 2025' },
  { id: 'P10', matkul: 'Rekayasa Perangkat Lunak', ke: 2, topik: 'Analisis Kebutuhan Perangkat Lunak', tanggal: '16 Sep 2025' },
  { id: 'P11', matkul: 'Pemrograman Mobile', ke: 3, topik: 'State, Event & Styling', tanggal: '18 Sep 2025' },
  { id: 'P12', matkul: 'Basis Data Lanjut', ke: 3, topik: 'Stored Procedure & Trigger', tanggal: '19 Sep 2025' },
  { id: 'P13', matkul: 'Kecerdasan Buatan', ke: 3, topik: 'Representasi Pengetahuan', tanggal: '20 Sep 2025' },
  { id: 'P14', matkul: 'Jaringan Komputer', ke: 3, topik: 'VLAN & Inter-VLAN Routing', tanggal: '22 Sep 2025' },
  { id: 'P15', matkul: 'Rekayasa Perangkat Lunak', ke: 3, topik: 'Diagram UML: Use Case & Activity', tanggal: '23 Sep 2025' },
];

// ------------------------------------------------------------
// C. Jadwal mingguan — dikelompokkan per hari
//    Bentuknya SENGAJA mengikuti format `sections` SectionList
//    ({ title, data }) sehingga tidak perlu transformasi.
//    Field `kanji` = kanji hari Jepang untuk header "ikat kepala".
// ------------------------------------------------------------
export const jadwalMingguan: JadwalSeksi[] = [
  {
    title: 'Senin',
    kanji: '月',
    data: [
      { id: 'J1', matkul: 'Pemrograman Mobile', ruangan: 'Ruang A201', jam: '08.00 – 10.30' },
      { id: 'J2', matkul: 'Kecerdasan Buatan', ruangan: 'Ruang B102', jam: '13.00 – 15.30' },
    ],
  },
  {
    title: 'Selasa',
    kanji: '火',
    data: [
      { id: 'J3', matkul: 'Basis Data Lanjut', ruangan: 'Ruang C301', jam: '09.00 – 11.30' },
      { id: 'J4', matkul: 'Jaringan Komputer', ruangan: 'Lab Jaringan', jam: '13.00 – 14.40' },
    ],
  },
  {
    title: 'Rabu',
    kanji: '水',
    data: [
      { id: 'J5', matkul: 'Rekayasa Perangkat Lunak', ruangan: 'Ruang A301', jam: '10.00 – 12.30' },
    ],
  },
];
