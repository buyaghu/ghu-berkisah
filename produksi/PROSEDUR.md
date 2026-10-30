# Prosedur Produksi & Posting Mingguan "Ghu Berkisah"

Dibaca oleh sesi terjadwal Claude Code. Semua waktu dalam **WIB (UTC+7)**.
Pedoman wajib (syariat, sumber shahih, gaya visual, privasi) ada di `CLAUDE.md` — baca dulu.

Jadwal tugas (scheduled tasks) Claude Code: produksi Sabtu 09.00, posting Sabtu/Senin/Kamis mulai 16.25
(agar tayang ±16.30). Setiap tugas butuh konektor **Composio** dan **ElevenLabs** di pengaturan tugasnya.

| Kapan | Sesi | Hasil |
| --- | --- | --- |
| Sabtu 09.00 | **Produksi** | 1 video panjang + 2 Shorts/Reels, diunggah *private* ke YouTube, laporan & minta approve |
| Sabtu 16.30 | **Posting 1** | Video panjang tayang di YouTube (jika sudah approved) |
| Senin 16.30 | **Posting 2** | Shorts 1 tayang di YouTube Shorts + Instagram Reels @buyaaghu |
| Kamis 16.30 | **Posting 3** | Shorts 2 tayang di YouTube Shorts + Instagram Reels @buyaaghu |

Antrian episode & status ada di `produksi/antrian.json` (repo publik). Status:
`antri` → `naskah_ada` → `siap_rilis` → `menunggu_approve` → `approved` → `tayang_long` → `tayang_short1` → `selesai`.

## 0. Persiapan (semua sesi)

Proyek memakai **dua repo**:
- **`buyaghu/ghu-berkisah`** (publik, branch `main`): kode, naskah, pedoman, jadwal. Semua pekerjaan di sini.
- **`buyaghu/claude-proyek`** (privat, branch `claude/youtube-nabi-stories-animation-k5hzrv`): rekaman suara Ghu
  (`public/voiceover/`), file video `rilis/`, dan catatan akun (`produksi/akun.md`). **Suara Ghu tidak boleh
  masuk repo publik.**

```bash
# clone keduanya berdampingan (tambahkan dengan add_repo bila belum ada di sesi)
git clone https://github.com/buyaghu/ghu-berkisah
git clone -b claude/youtube-nabi-stories-animation-k5hzrv https://github.com/buyaghu/claude-proyek
cd ghu-berkisah && npm ci && npm run vo:ambil   # salin VO dari repo privat
```

VO baru: simpan di `public/voiceover/` repo privat (commit & push di sana), lalu `npm run vo:ambil`.

Paket minggu ini = entri `antrian.json` yang `tayang.long`-nya jatuh pada **Sabtu minggu ini**
(untuk posting Senin/Kamis: Sabtu terakhir sebelum hari ini).

Akun:
- YouTube: channel **Ghu Berkisah** di Composio (`youtube`); Instagram: **@buyaaghu** di Composio (`instagram`).
  ID akun Composio ada di `produksi/akun.md` (repo privat). Selalu pilih akun secara eksplisit dan pastikan
  nama channel/akun benar sebelum upload.
- ElevenLabs: suara **Ghu** `ucmsMSAaGjMUJ5LRZJIt`, model `eleven_v4`.

## 1. Sesi Produksi (Sabtu 09.00)

1. Jika status paket `siap_rilis` (sudah diproduksi), lompat ke langkah 6.
2. **Naskah** (`src/stories/<kisah>.ts`) bila belum ada: ikuti `CLAUDE.md` (hanya Al-Qur'an & hadits shahih,
   `sumber` tiap scene, `sources`, pembuka baku `pembuka()`, hikmah, doa jika ada, tebak-tebakan, penutup).
   Durasi 5–8 menit (±650–750 kata). **Tidak menggambar nabi/rasul, sahabat, malaikat, manusia, jin.**
3. **Visual**: banyak adegan (`shots`) + ornamen animasi, **tanpa zoom/geser kamera**. Buat scene baru di
   `src/scenes/` bila perlu, daftarkan di `src/scenes/index.ts`. Cek dengan render still di beberapa titik.
4. **Suara**: buat VO tiap scene dengan ElevenLabs (satu flow per episode), unduh ke
   `public/voiceover/<kisah>/`, transkripsi dengan Scribe untuk timing kata, tulis `manifest.json`
   (format sama dengan `public/voiceover/sulaiman/manifest.json`). SFX baru hanya jika belum ada di `public/sfx/`.
5. **Shorts**: tambahkan 2 Shorts di `src/shorts.ts` (bagian paling menarik + bagian doa/hikmah),
   buat VO pembuka Shorts (`public/voiceover/shorts/manifest.json`). VO penutup `short-outro` dipakai ulang.
   Tulis `naskah/<kisah>-youtube.md` dan `naskah/<kisah>-shorts.md` (judul, deskripsi + timestamp, sumber,
   tag, caption IG, "📸 Instagram: @buyaaghu").
6. **Render**: video panjang `Kisah-<kisah>` dan kedua Shorts, lalu normalisasi suara:
   `ffmpeg -i in.mp4 -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k out.mp4`.
   Video panjang harus **< 95 MB** (batas GitHub); jika lebih, encode ulang
   `-c:v libx264 -crf 24 -preset slow`.
7. **Paket rilis**: salin ke `rilis/<tanggal-sabtu>/long.mp4`, `short-1.mp4`, `short-2.mp4` di **repo privat**
   `claude-proyek`, commit & push di sana (repo privat menjadi tempat transfer file ke Composio).
8. **Upload YouTube (private)** lewat `COMPOSIO_REMOTE_WORKBENCH`:
   - unduh file dari GitHub: `proxy_execute("GET", "/repos/buyaghu/claude-proyek/contents/rilis/<tgl>/long.mp4?ref=claude/youtube-nabi-stories-animation-k5hzrv", "github")`
     untuk mendapatkan `sha`, lalu blob `GET /repos/buyaghu/claude-proyek/git/blobs/<sha>` (base64) → simpan di `/mnt/files/rilis/<tgl>/`;
   - `upload_local_file(path)` → `s3key`;
   - `YOUTUBE_MULTIPART_UPLOAD_VIDEO` (`privacyStatus: "private"`, `categoryId: "27"`, judul/deskripsi/tag dari naskah);
   - set "dibuat untuk anak": `proxy_execute("PUT", "/youtube/v3/videos?part=status", "youtube", body={"id": ..., "status": {"privacyStatus": "private", "selfDeclaredMadeForKids": true}})`.
   Lakukan untuk long + short-1 + short-2. Simpan videoId di `antrian.json` (`youtube.long/short1/short2`).
9. Set status `menunggu_approve`, commit & push.
10. **Laporan ke Kakak** (bahasa Indonesia): link YouTube Studio ketiga video private, ringkasan naskah & daftar
    dalil, durasi, kredit ElevenLabs terpakai, dan hal yang perlu dicek (mis. pelafalan Arab).
    Minta balasan **"approved"** di sesi ini sebelum 16.30. Saat Kakak membalas "approved": ubah status ke
    `approved`, commit & push. Jika ada revisi: perbaiki, render & upload ulang (hapus/ganti video lama), lapor lagi.

## 2. Sesi Posting

1. Persiapan (langkah 0) lalu cari paket minggu ini.
2. **Jika status belum `approved` (atau setelahnya): JANGAN posting.** Laporkan ke Kakak bahwa posting ditunda
   karena belum di-approve, dan apa yang perlu dilakukan.
3. **Sabtu (long)**: `YOUTUBE_UPDATE_VIDEO` `privacy_status: "public"` untuk `youtube.long`. Status → `tayang_long`.
4. **Senin (short1) / Kamis (short2)**:
   - YouTube: `YOUTUBE_UPDATE_VIDEO` `privacy_status: "public"` untuk `youtube.short1` / `short2`.
   - Instagram Reels @buyaaghu: ambil `rilis/<tgl>/short-1.mp4` (atau `short-2.mp4`) dari GitHub ke workbench
     seperti langkah 1.8 → `upload_local_file` → `INSTAGRAM_POST_IG_USER_MEDIA` (Reels, caption dari
     `naskah/<kisah>-shorts.md`) → tunggu proses → `INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH`. Cek skema tool dulu.
   - Simpan id di `antrian.json`, status → `tayang_short1` / `selesai`. Commit & push.
5. Laporan singkat ke Kakak: link video yang tayang, atau kendala yang terjadi.

## Aturan keamanan

- Tidak pernah memposting tanpa status `approved`.
- Tidak pernah mengunggah video atau suara Ghu ke layanan publik pihak ketiga maupun repo publik;
  transfer file hanya lewat repo privat `claude-proyek`.
- Jika ada keraguan dalil/isi, berhenti dan tanyakan ke Kakak.
