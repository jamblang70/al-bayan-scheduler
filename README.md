# Al-Bayan Scheduler

Aplikasi jadwal mingguan kelas berbasis React + Vite untuk menampilkan kegiatan belajar per hari, dengan tampilan mobile-friendly dan dukungan update data via JSON.

## Fungsi Aplikasi

- Menampilkan jadwal pelajaran per hari (`Senin` sampai `Jumat`).
- Menandai sesi tertentu sebagai highlight (mis. agenda penting).
- Menyimpan perubahan jadwal ke `localStorage` agar data tetap ada saat browser di-refresh.
- Memudahkan update jadwal mingguan lewat proses import JSON.

## Fitur Utama

- Navigasi hari dengan tab horizontal.
- Kartu jadwal per sesi (jam + nama mapel + ikon kategori).
- Ringkasan agenda khusus untuk `Upacara` (Senin), `Pramuka` (Rabu), dan `Renang` (Kamis).
- Tombol salin data jadwal aktif ke clipboard (format JSON).
- Tombol reset jadwal kembali ke default.
- Tombol import jadwal baru dari JSON.
- Modal import JSON dengan validasi format dasar (`pekan` dan `hari` wajib ada).
- Tombol WhatsApp floating untuk kontak cepat.

## Struktur Data JSON

Format minimal yang diterima saat import:

```json
{
  "pekan": "XI (5 - 9 April 2026)",
  "hari": {
    "Senin": [
      {
        "jam": "07:00 - 07:10",
        "mapel": "Ikrar & Shalat Dhuha",
        "type": "faith"
      }
    ]
  }
}
```

Catatan:
- Properti `highlight` bersifat opsional (`true/false`).
- Properti `special` opsional untuk sesi khusus seperti `pramuka` atau `renang`.

## Teknologi

- React
- Vite
- Tailwind CSS v4
- Lucide React (ikon)

## Menjalankan Project

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## Penyimpanan Lokal

- Key `localStorage`: `al_bayan_schedule_v3`
- Reset default akan mengembalikan data ke bawaan aplikasi (Pekan XI, 5-9 April 2026).
