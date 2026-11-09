# Penjaga otomatis: Codex menyelesaikan tugas yang gagal dikerjakan Claude

Tujuan: bila tugas terjadwal Claude tidak selesai (batas pemakaian habis, sesi gagal, kuota), Codex menyelesaikannya
**tanpa perintah manual**. Penjaga adalah tugas berulang di Codex yang memeriksa `produksi/antrian.json` beberapa
menit setelah jam tugas Claude. Protokol kerjanya ada di [`CODEX.md`](CODEX.md); dokumen ini hanya aturan kapan
penjaga bertindak.

## Prinsip

- Penjaga **tidak menebak** apakah Claude kena limit. Ia membaca akibatnya: item sudah jatuh tempo, tetapi belum ada
  ID video, permalink, atau status selesai di `antrian.json`.
- Patuhi `AGENTS.md` dan `CLAUDE.md`. **Cek duplikat di platform** (daftar video channel, 5 media Instagram terakhir)
  sebelum aksi apa pun; itu pengaman utama bila Claude dan penjaga sama-sama jalan.
- Dua mode, ditentukan Kakak saat memasang penjaga:
  - **LAPOR**: hanya melaporkan apa yang *akan* dikerjakan. Tidak mengunggah, memposting, atau mengubah file.
  - **KERJA**: mengerjakan dan mencatat. Pakai LAPOR selama pekan pertama, lalu pindah ke KERJA bila laporannya benar.

## Jadwal pemeriksaan (WIB)

| Pemeriksaan | Setelah tugas Claude | Yang dicari |
| --- | --- | --- |
| **12.40**, hanya Sabtu dan Rabu | Produksi 11.53 | Paket yang `tayang.long`-nya **hari ini** dan statusnya masih `antri` atau `naskah_ada` |
| **15.25**, setiap hari kecuali Selasa | Upload YouTube 15.01 | Item (long, short1, short2) yang `tayang`-nya **hari ini** dan belum punya video ID di `youtube` |
| **16.50**, hari Shorts (Minggu, Senin, Kamis, Jumat) | Reels Instagram 16.27 | Short yang `tayang`-nya **hari ini** dan belum punya entri di `instagram` |

Item yang tertinggal dari hari-hari sebelumnya (jatuh tempo, belum selesai) juga dihitung.

## Aturan keputusan (setiap pemeriksaan)

1. `git pull` kedua repo. Cek tanggal dengan `TZ=Asia/Jakarta date`.
2. Cari item sesuai tabel. Tidak ada: **berhenti**, tulis satu baris laporan, jangan mengubah apa pun.
3. Ada item, tetapi Claude kelihatan **sedang atau baru bekerja**: ada commit dalam 20 menit terakhir yang
   **menyentuh** `produksi/antrian.json`, `produksi/bukti/`, `rilis/`, atau `public/voiceover/` (repo publik **dan**
   privat), atau `STATUS TERBARU` dari Claude dalam 20 menit. Commit lain (dokumentasi, kode, naskah yang tidak
   terkait item itu) **tidak dihitung**. Bila ya: tunggu 15 menit, cek ulang **sekali**, lalu lanjut.
   Untuk repo privat, penjaga hanya membaca riwayat commit (waktu, pesan, nama file) dan daftar file; isi video
   atau suara tidak diambil.
4. `catatan` hari ini menyebut `quotaExceeded` atau token Instagram ditolak: **jangan mengulang**. Lapor ke Kakak.
   Penjaga tidak bisa memperbaiki kuota atau token.
5. Paket berstatus `perlu_cek`: jangan disentuh.
6. Mode LAPOR: tulis laporan, selesai. Mode KERJA: **klaim** dulu dengan menulis
   `STATUS TERBARU: Codex mulai <jam> mengerjakan <item>` ke `catatan`, commit, push, lalu kerjakan sesuai `CODEX.md`.
7. Setelah selesai: berkas bukti di `produksi/bukti/`, `STATUS TERBARU` diperbarui, laporan ke Kakak.

## Aturan khusus produksi (12.40)

- Paket `naskah_ada`: Codex boleh memproduksi sampai `siap_rilis`.
- Paket `antri` (belum ada naskah): Codex boleh menulis naskah, tetapi statusnya **`perlu_cek`**, tidak diunggah
  otomatis, dan dilaporkan. Dalil dari AI cadangan belum dicek manusia. Kakak boleh mengubah aturan ini.
- Video harus tersimpan sebelum **14.30**. Bila tidak sempat, jangan menyimpan hasil setengah jadi sebagai
  `siap_rilis`; catat dan lapor.

## Item tertinggal

Tugas Claude hanya mengerjakan item yang jatuh tempo **hari itu**. Item yang tanggalnya sudah lewat dan belum selesai
tidak akan diambil Claude lagi. Itu justru tugas penjaga: tiap pemeriksaan mencakup semua item tertinggal, bukan
hanya yang hari ini. Item tertinggal yang jamnya sudah lewat dikerjakan **sekarang** (YouTube langsung diunggah,
Reels langsung diposting), bukan dijadwalkan ulang, kecuali Kakak memutuskan lain.

## Rekonsiliasi catatan

Bila kenyataan di platform berbeda dari `antrian.json` (mis. video sudah public padahal catatan masih menyebut
private), **perbaiki catatan dan status** supaya cocok dengan kenyataan. Jangan mengunggah ulang.

## Memasang penjaga (sekali, oleh Kakak, di Codex)

> Pasang penjaga otomatis untuk Ghu Berkisah, **mode LAPOR**. Baca `AGENTS.md`, `produksi/CODEX.md`, dan
> `produksi/PENJAGA.md`. Buat tugas berulang pada jam yang tertera di tabel jadwal (WIB), masing-masing menjalankan
> aturan keputusan di `PENJAGA.md`. Repo: `buyaghu/ghu-berkisah` dan repo privat `buyaghu/claude-proyek`.
> Sebelum membuat, periksa tugas penjaga yang sudah ada agar tidak dobel. Beri tahu saya nama dan jam tiap tugas.

Bila Codex tidak mendukung tugas **berulang**, pakai tugas sekali-jalan yang membuat tugas sekali-jalan berikutnya di
akhir tiap pemeriksaan (pola yang sudah terbukti di repo `warungkomen`). Pindah ke mode KERJA dengan perintah:
"Ubah penjaga Ghu Berkisah ke mode KERJA."

Penjaga aman dibiarkan menyala saat Claude sudah pulih: pemeriksaan hanya bertindak bila item benar-benar tertinggal.
Kakak boleh menonaktifkannya kapan saja untuk menghemat pemakaian Codex.
