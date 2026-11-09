# Prosedur Produksi & Posting Mingguan "Ghu Berkisah"

Dibaca oleh sesi terjadwal Claude Code. Semua waktu dalam **WIB (UTC+7)**.
Pedoman wajib (syariat, sumber shahih, gaya visual, privasi) ada di `CLAUDE.md` — baca dulu.
Agen lain (mis. Codex) atau pengambilalihan saat Claude terkena batas pemakaian: baca `AGENTS.md` dan `produksi/CODEX.md`.

Jadwal tugas (scheduled tasks) Claude Code, **2 seri per pekan, tanpa langkah approval** (keputusan Kakak, 3 Nov 2026).
Setiap paket: long = hari H (Sabtu/Rabu), short1 = H+1, short2 = H+2, semuanya pukul **16.30 WIB**.
Tugas butuh konektor **Composio** dan **ElevenLabs** di pengaturan tugasnya.

| Kapan | Sesi | Hasil |
| --- | --- | --- |
| Sabtu & Rabu ±11.53 | **Produksi** | Paket berikutnya: render long + 2 Shorts, simpan di `rilis/<tanggal-long>/` repo privat, status `siap_rilis`. **Tidak mengunggah.** |
| Setiap hari 15.01 | **Upload YouTube** | Untuk video yang jatuh tempo hari itu: unggah *private* + `publishAt` 16.30 WIB (tayang otomatis) |
| 16.30 | **Reels Instagram** | Untuk Shorts yang jatuh tempo: posting Reels @buyaaghu (akun Composio `instagram_chiral-havage`) |

Status: `antri` → `naskah_ada` → `siap_rilis` → `tayang_long` → `tayang_short1` → `selesai`.
Status `perlu_cek` = **jangan diunggah otomatis** (ada keraguan dalil/isi); tunggu keputusan Kakak.
Kakak dapat membatalkan/menyunting di YouTube Studio sebelum jam tayang.

Antrian episode & status ada di `produksi/antrian.json` (repo publik).

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
  Paket itu tayang sesuai tanggal di antrian, biasanya **Sabtu depan**, tanpa langkah approval.
- **Sesi posting** memposting paket yang `tayang.long`-nya jatuh pada **Sabtu minggu ini**
  (untuk posting Shorts: paket yang `tayang.short1` / `tayang.short2`-nya jatuh **hari ini**).

Akun:
- YouTube: channel **Ghu Berkisah** di Composio (`youtube`); Instagram: **@buyaaghu** di Composio (`instagram`).
  ID akun Composio ada di `produksi/akun.md` (repo privat). Selalu pilih akun secara eksplisit dan pastikan
  nama channel/akun benar sebelum upload.
- ElevenLabs: suara **Ghu** `ucmsMSAaGjMUJ5LRZJIt`, model `eleven_v4`.

## 1. Sesi Produksi (Sabtu & Rabu ±11.53)

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
8. **Berhenti di `siap_rilis`**: sesi produksi **tidak** mengunggah. Isi `rilis_dir` di `antrian.json`, commit & push.
9. **Laporan ke Kakak** (bahasa Indonesia): ringkasan naskah & dalil, durasi, kredit ElevenLabs terpakai, hal yang
   perlu dicek (mis. pelafalan Arab). Tidak perlu menunggu approval; tayang otomatis sesuai jadwal.

## 2. Sesi Upload YouTube & Reels

1. Persiapan (langkah 0), lalu cari video yang `tayang`-nya jatuh tempo hari ini (long/short1/short2).
2. **Status `perlu_cek`: jangan diunggah.** Laporkan ke Kakak.
3. **Upload YouTube (15.01)**: ambil file dari `rilis_dir` repo privat ke workbench (pecahan blob GitHub, cocokkan sha256),
   `upload_local_file` → `YOUTUBE_MULTIPART_UPLOAD_VIDEO` (`privacyStatus: "private"`, `categoryId: "27"`, judul/deskripsi/tag
   dari `youtube-meta.json`), set `publishAt` 16.30 WIB, lalu "dibuat untuk anak":
   `proxy_execute("PUT", "/videos", "youtube", query_params={"part": "status"}, body={"id": ..., "status": {"privacyStatus": "private", "publishAt": "<ISO>", "selfDeclaredMadeForKids": true, "embeddable": true, "publicStatsViewable": true, "license": "youtube"}})`.
   Simpan videoId di `antrian.json`; status → `tayang_long` / `tayang_short1` / `selesai`.
4. **Reels Instagram (16.30)** untuk Shorts: akun Composio `instagram_chiral-havage` (cek username `buyaaghu` dengan
   INSTAGRAM_GET_USER_INFO, kalau bukan, berhenti). Cek 5 media terakhir agar tidak posting ganda, unggah
   `short-1.mp4`/`short-2.mp4` (`INSTAGRAM_POST_IG_USER_MEDIA`, `REELS`, `share_to_feed: true`, `thumb_offset: 2000`,
   caption dari `naskah/<kisah>-shorts.md`) lalu `INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH`. Simpan permalink.
5. Laporan singkat ke Kakak, atau kendala yang terjadi.

## Aturan keamanan

- Tidak pernah memposting video berstatus `perlu_cek`; Kakak dapat membatalkan di YouTube Studio.
- Tidak pernah mengunggah video atau suara Ghu ke layanan publik pihak ketiga maupun repo publik;
  transfer file hanya lewat repo privat `claude-proyek`.
- Jika ada keraguan dalil/isi, berhenti dan tanyakan ke Kakak.
- Jika YouTube menjawab `quotaExceeded` / `Video Uploads per day` (kuota harian aplikasi Composio bersama, reset
  ±15.00 WIB), jangan mengulang terus: simpan `s3key` di `/home/user/rilis/<tgl>/s3.json`, laporkan ke Kakak,
  dan jadwalkan percobaan ulang (`send_later`) sekitar 15.05 WIB.
