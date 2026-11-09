# AGENTS.md — Ghu Berkisah

Berlaku untuk agen AI mana pun (Codex, Claude Code, dll.). Proyek: animasi kisah nabi untuk anak
(Remotion), channel YouTube **Ghu Berkisah** dan Instagram **@buyaaghu**.

## Baca urut sebelum bekerja

1. [`CLAUDE.md`](CLAUDE.md): pedoman syariat dan gaya visual. **Wajib**, berlaku untuk semua agen.
2. [`produksi/PROSEDUR.md`](produksi/PROSEDUR.md): jadwal dan langkah produksi, unggah, dan posting.
3. [`produksi/CODEX.md`](produksi/CODEX.md): **protokol serah-terima** bila kamu mengambil alih pekerjaan
   dari agen lain (mis. Claude kehabisan batas pemakaian). Baca juga bila kamu yang diambil alih.
4. [`produksi/antrian.json`](produksi/antrian.json): **satu-satunya sumber status** tiap paket.

## Aturan yang tidak boleh dilanggar (ringkas; rincian di `CLAUDE.md`)

- **Jangan menggambarkan nabi dan rasul** dalam bentuk apa pun (wajah, tubuh, siluet, bayangan, tangan, karakter
  pengganti). Sahabat, malaikat, manusia, dan jin dalam kisah juga tidak digambar. Satu-satunya karakter manusia
  adalah narator **Ghu**, hanya di adegan narator.
- **Sumber hanya Al-Qur'an dan hadits shahih.** Tanpa israiliyyat atau detail tanpa dalil. Bagian yang hanya dari
  penjelasan ulama tafsir disebut terang-terangan di naskah. Setiap scene kisah mencantumkan `sumber`.
- **Ragu soal dalil atau isi: berhenti.** Tandai paket `perlu_cek` dan laporkan ke Kakak. Jangan mengarang dalil.
- **Tanpa zoom atau geser kamera.** Variasi lewat `shots` dan ornamen animasi.
- **Privasi Ghu:** repo ini **publik**. Rekaman suara (`public/voiceover/`) dan video (`rilis/`) **tidak boleh**
  di-commit di sini, dan tidak boleh diunggah ke layanan pihak ketiga. Keduanya hanya hidup di repo **privat**
  `buyaghu/claude-proyek`. Jangan memakai foto asli, nama lengkap, sekolah, atau kota Ghu.
- **Jangan menulis kunci API, token, atau kata sandi** ke repo, antrian, catatan, atau log. Kunci hanya lewat
  variabel lingkungan atau konektor.
- **Jangan memposting paket berstatus `perlu_cek`**, dan **selalu cek duplikat** sebelum mengunggah atau memposting.
- **Jangan menaruh tautan unduhan** (mis. tautan berbagi Composio) ke video atau suara Ghu di repo publik, catatan,
  atau log. Bukti posting cukup berupa ID, permalink publik, waktu, dan hash.
- Akun Composio lain di luar proyek ini (mis. channel lain milik pemilik) **bukan** bagian dari pekerjaan ini.

## Perintah

```bash
npm ci                  # pasang dependensi (Node ^20.19 / ^22.13 / >=24)
npm run vo:ambil        # salin suara Ghu dari repo privat (../claude-proyek)
npm run lint            # eslint src && tsc, harus bersih sebelum commit
npm run dev             # Remotion Studio untuk preview
npx remotion render Kisah-<kisah> out/kisah-nabi-<kisah>.mp4   # video panjang
npm run voiceover -- --story <kisah>   # VO ElevenLabs (butuh ELEVENLABS_API_KEY di .env)
```

Struktur singkat: naskah di `src/stories/*.ts`, adegan di `src/scenes/`, Shorts di `src/shorts.ts`,
caption dan deskripsi di `naskah/`. README memuat panduan lengkapnya.

## Cara bekerja

- Kerjakan di branch `main` kecuali diminta lain. `git pull` dulu, commit kecil per langkah, lalu push.
- Perbarui `produksi/antrian.json` **segera setelah tiap aksi eksternal** (unggah, posting) agar agen berikutnya
  tidak mengulang pekerjaan yang sama. Kalimat pertama `catatan` paket: `STATUS TERBARU: ...`. Bukti posting
  ditulis ke `produksi/bukti/` (lihat `produksi/CODEX.md`).
- Bahasa naskah, catatan, dan laporan: **Indonesia**. Sapa pemilik channel dengan "Kakak".
