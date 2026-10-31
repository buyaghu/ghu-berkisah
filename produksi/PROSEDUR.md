# Prosedur Produksi & Posting Mingguan "Ghu Berkisah"

Dibaca oleh sesi terjadwal Claude Code. Semua waktu dalam **WIB (UTC+7)**.
Pedoman wajib (syariat, sumber shahih, gaya visual, privasi) ada di `CLAUDE.md` — baca dulu.

Jadwal tugas (scheduled tasks) Claude Code: produksi Sabtu 09.00, posting Sabtu 16.25, Minggu 08.55, Rabu 15.55
(agar tayang ±16.30 / ±09.00 / ±16.00). Setiap tugas butuh konektor **Composio** dan **ElevenLabs** di pengaturan tugasnya.

| Kapan | Sesi | Hasil |
| --- | --- | --- |
| Sabtu 09.00 | **Produksi** | Paket **berikutnya** (tayang Sabtu depan): 1 video panjang + 2 Shorts/Reels, diunggah *private*, laporan & minta approve |
| Sabtu 16.30 | **Posting 1** | Video panjang tayang di YouTube (jika sudah approved) |
| Minggu 09.00 | **Posting 2** | Shorts 1 tayang di YouTube Shorts + Instagram Reels @buyaaghu |
| Rabu 16.00 | **Posting 3** | Shorts 2 tayang di YouTube Shorts + Instagram Reels @buyaaghu |

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

- **Sesi produksi** mengerjakan **paket pertama di antrian yang belum diproduksi** (status `antri` atau `naskah_ada`).
  Paket itu tayang sesuai tanggal di antrian, biasanya **Sabtu depan**, sehingga ada waktu seminggu untuk approve.
- **Sesi posting** memposting paket yang `tayang.long`-nya jatuh pada **Sabtu minggu ini**
  (untuk posting Shorts: paket yang `tayang.short1` / `tayang.short2`-nya jatuh **hari ini**).

Akun:
- YouTube: channel **Ghu Berkisah** di Composio (`youtube`); Instagram: **@buyaaghu** di Composio (`instagram`).
  ID akun Composio ada di `produksi/akun.md` (repo privat). Selalu pilih akun secara eksplisit dan pastikan
  nama channel/akun benar sebelum upload.
- ElevenLabs: suara **Ghu** `ucmsMSAaGjMUJ5LRZJIt`, model `eleven_v4`.

## 1. Sesi Produksi (Sabtu 09.00)

1. Pilih paket pertama berstatus `antri`/`naskah_ada`. Jika tidak ada (semua sudah diproduksi), laporkan dan selesai.
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
   `claude-proyek`. File > 25 MB dipecah dulu agar workbench tidak kehabisan memori:
   `split -b 20000000 -d -a 1 long.mp4 parts/long.mp4.part` (simpan `sha256sum`). Tulis juga
   `rilis/<tgl>/youtube-meta.json` (`{long|short1|short2: {title, description, tags}}`). Commit & push di sana.
8. **Upload YouTube (private)** lewat `COMPOSIO_REMOTE_WORKBENCH`:
   - unduh tiap pecahan dari GitHub: `git ls-tree` memberi `sha` blob, lalu satu sel per 1–2 pecahan:
     `proxy_execute("GET", "/repos/buyaghu/claude-proyek/git/blobs/<sha>", "github")` → base64 decode → tambahkan
     (append) ke `/home/user/rilis/<tgl>/long.mp4` (bukan `/mnt/files`), `del` + `gc.collect()`; cocokkan sha256;
   - `upload_local_file(path)` → `s3key`;
   - `YOUTUBE_MULTIPART_UPLOAD_VIDEO` (`privacyStatus: "private"`, `categoryId: "27"`, judul/deskripsi/tag dari naskah);
   - set "dibuat untuk anak": `proxy_execute("PUT", "/videos", "youtube", query_params={"part": "status"}, body={"id": ..., "status": {"privacyStatus": "private", "selfDeclaredMadeForKids": true, "embeddable": true, "publicStatsViewable": true, "license": "youtube"}})`
     (endpoint relatif tanpa `/youtube/v3`; sertakan semua kolom status karena PUT menimpa nilai lama).
   Lakukan untuk long + short-1 + short-2. Simpan videoId di `antrian.json` (`youtube.long/short1/short2`).
9. Set status `menunggu_approve`, commit & push.
10. **Laporan ke Kakak** (bahasa Indonesia): link YouTube Studio ketiga video private, ringkasan naskah & daftar
    dalil, durasi, kredit ElevenLabs terpakai, dan hal yang perlu dicek (mis. pelafalan Arab).
    Minta balasan **"approved"** di sesi ini sebelum tanggal tayangnya. Saat Kakak membalas "approved": ubah status ke
    `approved`, commit & push. Jika ada revisi: perbaiki, render & upload ulang (hapus/ganti video lama), lapor lagi.

## 2. Sesi Posting

1. Persiapan (langkah 0) lalu cari paket minggu ini.
2. **Jika status belum `approved` (atau setelahnya): JANGAN posting.** Laporkan ke Kakak bahwa posting ditunda
   karena belum di-approve, dan apa yang perlu dilakukan.
3. **Sabtu (long)**: `YOUTUBE_UPDATE_VIDEO` `privacy_status: "public"` untuk `youtube.long`. Status → `tayang_long`.
4. **Minggu (short1) / Rabu (short2)**:
   - YouTube: `YOUTUBE_UPDATE_VIDEO` `privacy_status: "public"` untuk `youtube.short1` / `short2`.
   - Instagram Reels @buyaaghu (akun Composio `instagram_facade-arhar`; cek dulu username `buyaaghu` dengan
     INSTAGRAM_GET_USER_INFO, kalau bukan, berhenti). Cek 5 media terakhir agar tidak posting ganda.
     Ambil `rilis/<tgl>/short-1.mp4` (atau `short-2.mp4`) dari repo privat ke workbench seperti langkah 1.8 →
     `upload_local_file` → `INSTAGRAM_POST_IG_USER_MEDIA` dengan `media_type: "REELS"`,
     `video_file: {name, mimetype: "video/mp4", s3key}`, `share_to_feed: true`, `thumb_offset: 2000`
     (frame judul), caption apa adanya dari `naskah/<kisah>-shorts.md` (jangan ubah `#` jadi `%23`) →
     `INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH` (`max_wait_seconds: 300`). Simpan permalink.
   - Simpan id di `antrian.json`, status → `tayang_short1` / `selesai`. Commit & push.
5. Laporan singkat ke Kakak: link video yang tayang, atau kendala yang terjadi.

## Aturan keamanan

- Tidak pernah memposting tanpa status `approved`.
- Tidak pernah mengunggah video atau suara Ghu ke layanan publik pihak ketiga maupun repo publik;
  transfer file hanya lewat repo privat `claude-proyek`.
- Jika ada keraguan dalil/isi, berhenti dan tanyakan ke Kakak.
- Jika YouTube menjawab `quotaExceeded` / `Video Uploads per day` (kuota harian aplikasi Composio bersama, reset
  ±14.00 WIB), jangan mengulang terus: simpan `s3key` di `/home/user/rilis/<tgl>/s3.json`, laporkan ke Kakak,
  dan jadwalkan percobaan ulang (`send_later`) sekitar 14.05 WIB.
