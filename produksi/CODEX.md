# Serah-terima antar agen (Claude ⇄ Codex)

`PROSEDUR.md` ditulis untuk tugas terjadwal Claude Code. Dokumen ini membuat agen lain, terutama **Codex**,
bisa melanjutkan pekerjaan yang sama bila Claude terhenti (batas pemakaian habis, sesi gagal), dan sebaliknya.
Pedoman wajib tetap di `CLAUDE.md`; di sini hanya cara berpindah tangan dengan aman.

## Apa yang netral, apa yang bergantung alat

| Bagian | Netral (agen apa pun) | Bergantung alat |
| --- | --- | --- |
| Naskah, adegan, render, lint | ya: Node, Remotion, `ffmpeg` | butuh `npm ci`, `ffmpeg` |
| Suara Ghu (VO) dan SFX | skrip `npm run voiceover` / `npm run sfx` | butuh `ELEVENLABS_API_KEY` (atau konektor ElevenLabs) |
| Video dan suara dari repo privat | `git clone` biasa | butuh akses **baca dan tulis** ke `buyaghu/claude-proyek` |
| Unggah YouTube dan Reels Instagram | langkah dan aturan di `PROSEDUR.md` §2 | butuh **konektor Composio** (akun YouTube Ghu Berkisah dan Instagram @buyaaghu) |
| Penjadwalan otomatis | tidak ada di repo | Claude memakai tugas terjadwal; Codex dijalankan manual oleh Kakak dengan prompt di bawah |

Nama alat di `PROSEDUR.md` (mis. `YOUTUBE_MULTIPART_UPLOAD_VIDEO`, `INSTAGRAM_POST_IG_USER_MEDIA`) adalah
nama tool **Composio**. Bila Codex tersambung ke Composio, pakai nama yang sama. Bila tidak tersambung,
kerjakan hanya bagian netral (produksi, render, commit) dan siapkan panduan unggah manual untuk Kakak.
**Jangan mencari jalan pintas** (host file publik, kunci pihak ketiga, akun lain).

## Protokol serah-terima

1. `git pull` di kedua repo. Baca `produksi/antrian.json`, `git log -10`, dan `catatan` tiap paket.
2. Cek tanggal dengan `TZ=Asia/Jakarta date`. Tentukan item yang **jatuh tempo atau tertinggal**: tanggal `tayang`
   sudah tiba tetapi belum ada ID video (`youtube`) atau permalink (`instagram`).
3. **Cocokkan antrian dengan kenyataan sebelum bertindak.** Antrian bisa tertinggal dari kenyataan (sesi
   sebelumnya bisa terhenti setelah mengunggah tetapi sebelum mencatat). Cek daftar video channel (`mine`),
   judul yang sama, dan 5 media Instagram terakhir. Sudah ada = catat ID-nya, jangan unggah lagi.
4. Kerjakan sesuai `PROSEDUR.md`. Satu langkah, satu commit. Tulis ID video atau permalink ke `antrian.json`
   **segera** setelah aksi eksternal.
5. Setiap kali berhenti, tambahkan satu kalimat ke `catatan` paket: tanggal dan jam, siapa (Codex/Claude),
   apa yang selesai, apa yang tersisa. Contoh: `"7 Nov 15.10 WIB (Codex): long diunggah private (ID ...), Shorts 1 belum."`
   Catatan ini dibaca agen berikutnya, jadi tulis fakta, bukan niat.
6. Bila terhenti oleh kuota, token, atau limit, catat penyebabnya dan **berhenti**. Jangan mengulang dalam
   loop. Lapor ke Kakak apa yang belum selesai.

## Kendala yang sudah diketahui (dari catatan paket Nov 2026)

- **Kuota harian YouTube** (aplikasi Composio dipakai bersama) bisa habis: `quotaExceeded` / `Video Uploads per day`.
  Simpan `s3key` bila ada, berhenti, lapor. Unggah manual lewat YouTube Studio tidak memakai kuota ini.
- **Token Instagram** bisa ditolak (`OAuth 190`). Berhenti, lapor; Kakak yang menyambungkan ulang akunnya.
- **`publishAt` dan "dibuat untuk anak"** pernah **tidak bisa diatur lewat tool Composio**. Bila terjadi:
  biarkan video *private*, catat di `catatan`, dan minta Kakak mengaturnya di YouTube Studio
  ("Penonton: Ya, dibuat untuk anak-anak", lalu Publik atau Jadwalkan 16.30 WIB). Jangan memaksa lewat akun lain.
- File video besar: pecah per ±20 MB (`split -b 20000000`) dan catat `sha256` agar workbench tidak kehabisan memori.
  Rakit ulang dan cocokkan `sha256` sebelum mengunggah.

## Prompt siap pakai untuk Codex

Kakak tinggal salin ke Codex (repo `buyaghu/ghu-berkisah`, dengan repo privat di `../claude-proyek`).

**Produksi paket berikutnya** (Sabtu dan Rabu sekitar 11.53 WIB):

> Baca `AGENTS.md`, `CLAUDE.md`, `produksi/PROSEDUR.md`, dan `produksi/CODEX.md`. Ikuti protokol serah-terima.
> Kerjakan Sesi Produksi (`PROSEDUR.md` §1) untuk paket pertama berstatus `antri` atau `naskah_ada`: naskah, adegan,
> VO, 2 Shorts, render, simpan di `rilis/<tanggal-long>/` repo privat, isi `rilis_dir`, status `siap_rilis`.
> **Jangan mengunggah.** Ragu soal dalil: tandai `perlu_cek` dan lapor. Tulis catatan serah-terima di paket.

**Unggah YouTube** (setiap hari sekitar 15.01 WIB) **dan Reels Instagram** (sekitar 16.30 WIB):

> Baca `AGENTS.md`, `CLAUDE.md`, `produksi/PROSEDUR.md`, dan `produksi/CODEX.md`. Ikuti protokol serah-terima.
> Kerjakan `PROSEDUR.md` §2 untuk item yang jatuh tempo hari ini (tanggal Asia/Jakarta): cek duplikat dulu, unggah
> YouTube sebagai *private* dengan `publishAt` 16.30 WIB, lalu Reels Instagram untuk Shorts. Lewati paket `perlu_cek`.
> Bila kuota atau token menolak, berhenti dan buat panduan unggah manual (file, judul, deskripsi, tag, pengaturan Studio).
> Catat ID atau permalink di `antrian.json` dan tulis catatan serah-terima.

## Saat Claude kembali

Tugas terjadwal Claude membaca `antrian.json` dan `catatan` yang sama. Selama catatan dan ID selalu diperbarui
dengan protokol di atas, Claude melanjutkan dari titik terakhir tanpa mengulang apa pun. Tidak perlu mematikan
tugas terjadwalnya; cek duplikat di langkah 3 mencegah posting ganda.
