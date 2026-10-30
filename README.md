# Kisah Nabi bersama Ghu 🌙

Animasi kartun *motion graphic* (Remotion) untuk kanal YouTube anak:
**Ghu** bercerita tentang kisah para nabi, dan setiap akhir kisah ditutup dengan **hikmah** yang bisa dipetik.
VO memakai suara **Ghu** dari ElevenLabs.

| Episode | Composition | Dalil utama |
| --- | --- | --- |
| 1. **Nabi Sulaiman & Semut**: Raja yang Bersyukur | `Kisah-sulaiman` | QS. An-Naml: 15–19 · HR. Bukhari 3019 & Muslim 2241 · HR. Abu Dawud 5267 |
| 2. **Kisah Nabi Yunus**: Doa dari Dalam Perut Ikan | `Kisah-yunus` | QS. Al-Anbiya: 87–88 · As-Saffat: 139–148 · Yunus: 98 · HR. Tirmidzi 3505 |

Setiap episode ±5–6,5 menit, 1920×1080, berisi pembuka → kisah → doa → hikmah → tebak-tebakan → penutup.

Setiap video dibuka dengan kalimat baku (diatur di `src/stories/common.ts`):
> *"Bismillah. Perkenalkan, nama saya Ghu. Kali ini, saya ingin berkisah tentang …"*

## Pedoman konten

1. **Sumber hanya dari Al-Qur'an dan hadits shahih** (Bukhari, Muslim, atau yang dishahihkan ulama hadits).
   Setiap scene menampilkan label dalilnya di pojok kanan atas, dan daftar sumber ada di `naskah/<kisah>.md`
   (cocok untuk deskripsi video YouTube).
2. **Tidak memakai israiliyyat** atau detail tanpa dalil (nama tokoh tambahan, angka, dialog karangan).
   Jika sebuah bagian hanya berasal dari penjelasan ulama tafsir, naskah menyebutnya terang-terangan
   ("para ulama tafsir menjelaskan...").
3. **Nabi dan rasul tidak digambarkan** dalam bentuk apa pun (wajah, tubuh, siluet, bayangan, maupun
   karakter pengganti). Sebagai kehati-hatian, sahabat, malaikat, manusia, dan jin dalam kisah juga tidak
   digambar. Pedoman lengkap ada di `CLAUDE.md`.
   Visual memakai alam, benda, hewan, panji-panji, jejak kaki, dan cahaya. Yang tampil sebagai karakter
   hanya narator, yaitu Ghu.
4. **Gaya visual:** tanpa zoom/geser kamera (bikin pusing). Variasi dibuat dengan **memperbanyak adegan**
   (`shots`) dan **ornamen animasi**. Ghu hanya berjalan saat isi layar pindah sisi; selebihnya berdiri
   bercerita dengan gerakan tangan.
5. Terjemahan ayat mengikuti terjemahan Kemenag. Sebaiknya naskah dicek ustadz/ustadzah sebelum VO dibuat.

## Dua repo

- **Repo ini (publik)**: kode animasi, naskah, pedoman, jadwal produksi.
- **`buyaghu/claude-proyek` (privat)**: rekaman suara Ghu dan file video. Suara asli anak tidak dipublikasikan
  agar tidak bisa diunduh atau ditiru. Salin ke proyek dengan `npm run vo:ambil` (repo privat di `../claude-proyek`).

## Cara pakai

```bash
npm install
npm run vo:ambil            # salin suara Ghu dari repo privat
cp .env.example .env        # lalu isi ELEVENLABS_API_KEY
npm run voiceover           # buat VO suara Ghu untuk tiap scene
npm run sfx                 # buat efek suara (ombak, petir, gelembung, dll.)
npm run dev                 # buka Remotion Studio untuk preview
npm run render:sulaiman     # hasil: out/kisah-nabi-sulaiman.mp4
npm run render:yunus        # hasil: out/kisah-nabi-yunus.mp4
```

- Sebelum VO dibuat, video tetap bisa dipreview. Durasinya diperkirakan dari panjang naskah, dan subtitle tetap jalan.
- `npm run voiceover` hanya membuat ulang scene yang naskahnya **berubah**, supaya kredit ElevenLabs hemat.
  Untuk mengulang satu scene saja: `npm run voiceover -- --scene 07-ditelan`.
- VO dibuat dengan *timestamp* per huruf, jadi **subtitle karaoke**, **gerak mulut Ghu**, **SFX**, dan
  animasi muncul tepat saat kata tertentu diucapkan.
- `npm run naskah` menyimpan naskah ke `naskah/<kisah>.md`, cocok untuk latihan bercerita (misalnya untuk lomba).

## Struktur

| Folder / file | Isi |
| --- | --- |
| `src/stories/*.ts` | **Naskah**, dalil, label, SFX, doa, hikmah, dan tebak-tebakan. Ubah cerita di sini. |
| `src/scenes/` | Visual tiap scene (kerajaan, pasukan, lembah semut, kota, kapal, ikan besar, doa, hikmah, tebak-tebakan, dll.) |
| `src/components/Ghu.tsx` | Karakter Ghu sesuai fotonya (khimar putih, rok marun, tanpa hidung): badan penuh yang berjalan & bercerita (`GhuWalker`), dan avatar wajah untuk scene kisah. Lihat composition `Karakter-Ghu`. |
| `src/components/nature.tsx` | Langit, awan, laut, hujan, petir, gelembung, bintang, pola Islami |
| `src/components/objects.tsx` | Semut, sarang semut, istana, burung, panji-panji, kapal, ikan besar, kota, pohon labu, ikon |
| `scripts/` | Pembuat VO, SFX, dan naskah (ElevenLabs) |
| `public/voiceover`, `public/sfx` | Hasil audio |

### Menambah pergantian adegan di dalam satu narasi

Narasi yang panjang bisa dibagi menjadi beberapa adegan. Latar berganti tepat saat frasa diucapkan,
dan suara tetap satu klip (tidak perlu membuat VO baru):

```ts
shots: [
  { phrase: "Masya Allah, Allah juga", visual: "birds" },        // pohon burung
  { phrase: "Tapi Nabi Sulaiman tidak sombong", visual: "kingdom" },
  { phrase: "Allah berfirman", visual: "tasbihWorld", card: { title: "…", subtitle: "QS. Al-Isra: 44" } },
]
```

Latar yang tersedia ada di `src/scenes/index.ts` (mis. `birds`, `road`, `garden`, `book`, `tasbihWorld`,
`ants` dengan mode `busy`/`closeup`/`nest`/`tasbih`, dan latar kisah Nabi Yunus).

### Shorts / Reels (vertikal 1080×1920)

Potongan vertikal didefinisikan di `src/shorts.ts` (pilih scene dari video panjang). Hasilnya:
judul di atas, adegan kartun di tengah, subtitle besar, Ghu bercerita di bawah, dan kartu ajakan di akhir.
Teks caption untuk YouTube & Instagram ada di `naskah/<kisah>-shorts.md`.

### Mengatur SFX di naskah

```ts
sfx: [
  { sound: "petir", at: { phrase: "Petir menyambar" }, volume: 0.8 }, // diputar saat frasa diucapkan
  { sound: "ombak", at: 0, volume: 0.35, loop: true },                // ambience sepanjang scene
]
```

Nama `sound` = nama file di `public/sfx/` (tanpa `.mp3`). Daftar SFX dan prompt-nya ada di `scripts/generate-sfx.ts`.
Kamu juga bisa menaruh SFX `.mp3` buatan sendiri di `public/sfx/`, lalu jalankan `npm run sfx` agar terdaftar.

### Menambah kisah nabi berikutnya

1. Salin `src/stories/sulaiman.ts` menjadi misalnya `nuh.ts`, lalu tulis naskahnya sesuai pedoman konten
   (isi `sumber` di tiap scene dan `sources` di kisah).
2. Daftarkan di `src/stories/index.ts`.
3. Pakai visual yang sudah ada, atau tambahkan scene baru di `src/scenes/` dan daftarkan di `src/scenes/index.ts`.
4. `npm run voiceover -- --story nuh`, lalu render `npx remotion render Kisah-nuh out/kisah-nabi-nuh.mp4`.

## Pengaturan di Studio

Di panel *props* Remotion Studio: `showSubscribe` (tombol subscribe di akhir video, matikan untuk versi lomba)
dan `sfxVolume` (0–1).

Font: Fredoka, Nunito, Amiri (SIL Open Font License), disimpan lokal di `public/fonts`.
