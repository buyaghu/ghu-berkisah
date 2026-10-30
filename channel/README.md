# Paket Channel YouTube

**Akun resmi:** YouTube **Ghu Berkisah** · Instagram **[@buyaaghu](https://instagram.com/buyaaghu)**

## 1. Nama channel

| Pilihan | Handle (@) | Kesan |
| --- | --- | --- |
| ⭐ **Ghu Berkisah** (rekomendasi) | `@GhuBerkisah` | Pendek, mudah diingat, sama dengan kalimat pembuka "saya ingin berkisah". Masih cocok kalau nanti ada kisah sahabat atau kisah dari hadits. |
| Kisah Nabi bersama Ghu | `@KisahNabiBersamaGhu` | Langsung jelas isinya; sudah dipakai sebagai label di dalam video. |
| Ghu & Kisah Hikmah | `@GhuKisahHikmah` | Menonjolkan hikmah di setiap akhir kisah. |
| Cerita Hikmah Ghu | `@CeritaHikmahGhu` | Terasa hangat, seperti cerita sebelum tidur. |
| Ghu Bercerita | `@GhuBercerita` | Lebih umum, mudah dicari. |

> Ketersediaan handle baru bisa dicek saat membuat channel. Kalau `@GhuBerkisah` sudah dipakai,
> coba `@GhuBerkisah.id` atau `@GhuBerkisahID`.

**Tagline:** Kisah Nabi & Hikmah untuk Anak

## 2. Deskripsi channel (bagian "Tentang")

> Assalamu'alaikum, teman-teman! 👋
>
> Di channel ini, Ghu berkisah tentang para nabi dan rasul dalam Islam: kisah yang penuh hikmah,
> diceritakan dengan bahasa anak-anak dan animasi yang ceria.
>
> Setiap video berisi:
> 📖 Kisah nabi dari Al-Qur'an dan hadits shahih
> 🤲 Doa yang bisa dihafalkan
> 🌱 Hikmah yang bisa dipraktikkan sehari-hari
> 🎯 Tebak-tebakan seru di akhir video
>
> Semua kisah hanya mengambil dari Al-Qur'an dan hadits shahih, dan para nabi tidak digambarkan
> wajah maupun tubuhnya.
>
> Video baru setiap pekan, insya Allah. Yuk, belajar dan berkisah bersama Ghu!
>
> 📸 Instagram: @buyaaghu

## 3. Kata kunci channel

kisah nabi, kisah nabi untuk anak, cerita islami anak, kisah 25 nabi, animasi islami, dongeng anak muslim, hikmah, doa anak, belajar islam anak, Ghu Berkisah

## 4. Playlist

1. **Kisah Para Nabi**: semua episode
2. **Doa-doa dari Kisah Nabi**: potongan pendek bagian doa (bisa jadi Shorts)
3. **Ayo Tebak!**: potongan tebak-tebakan (Shorts)
4. **Hikmah untuk Anak**: potongan bagian hikmah (Shorts)

## 5. Ide episode berikutnya (dalil kuat, tanpa menggambar nabi)

| Episode | Dalil utama | Hikmah |
| --- | --- | --- |
| Nabi Yunus & Ikan Besar ✅ (sudah dibuat) | QS. Al-Anbiya: 87–88, As-Saffat: 139–148 | Sabar, bertaubat, Allah mendengar doa |
| Nabi Nuh & Kapal Besar | QS. Hud: 25–49, Nuh | Sabar berdakwah, taat kepada Allah |
| Nabi Ibrahim & Api yang Dingin | QS. Al-Anbiya: 51–70 | Berani membela kebenaran, tauhid |
| Nabi Ibrahim, Ismail & Ketaatan | QS. As-Saffat: 99–111 | Taat kepada Allah & orang tua |
| Nabi Musa & Laut yang Terbelah | QS. Asy-Syu'ara: 52–68 | Tawakal, Allah menolong orang beriman |
| Nabi Musa & Nabi Khidir | QS. Al-Kahfi: 60–82, HR. Bukhari & Muslim | Rendah hati dalam belajar, sabar |
| Nabi Yusuf & Mimpi yang Indah | QS. Yusuf | Pemaaf, jujur, sabar |
| Nabi Ayyub yang Sangat Sabar | QS. Al-Anbiya: 83–84, Shad: 41–44 | Sabar saat sakit |
| Nabi Sulaiman & Burung Hud-hud | QS. An-Naml: 20–44 | Jujur, berani menyampaikan kebenaran |
| Nabi Dawud & Jalut | QS. Al-Baqarah: 249–251 | Berani, percaya pertolongan Allah |

## 6. Jadwal & format

- **Upload:** 1 video panjang per pekan (mis. Jumat sore) + 2–3 Shorts dari potongan video yang sama.
- **Format judul:** `Kisah Nabi [Nama] | [Judul Kecil] | Ghu Berkisah`
- **Thumbnail:** Ghu (wajah senang) + benda ikon kisah (semut, ikan, kapal) + 2–4 kata besar,
  mis. "SEMUT BERBICARA?". Bisa dibuat dari composition Remotion.

## 7. Pengaturan penting (konten anak)

- **Pemilik akun = orang tua.** YouTube mewajibkan pemilik akun minimal 13 tahun; Ghu tampil sebagai
  karakter dan suara, akunnya dikelola Ayah/Bunda.
- Di setiap video dan di pengaturan channel pilih **"Ya, dibuat untuk anak-anak"**. Konsekuensinya:
  komentar dimatikan, tidak ada iklan yang dipersonalisasi, dan sebagian fitur (mis. lonceng
  notifikasi) terbatas. Ini wajib menurut aturan YouTube/COPPA untuk konten anak.
- **Jaga privasi Ghu:** jangan cantumkan nama lengkap, nama sekolah, kota, atau foto asli.
  Foto MPLS yang ada nama sekolahnya sebaiknya tidak dipakai di channel. Karakter kartun sudah cukup.
- Cantumkan **sumber dalil** di deskripsi setiap video (sudah disiapkan di `naskah/*-youtube.md`).

## 8. Aset gambar

| File | Ukuran | Dipakai untuk |
| --- | --- | --- |
| `channel/foto-profil.png` | 800×800 | Foto profil channel (YouTube memotongnya jadi lingkaran) |
| `channel/banner.png` | 2560×1440 | Banner channel; teks & Ghu berada di area aman 1546×423 sehingga tampil di HP, tablet, dan TV |

Untuk mengganti nama atau tagline di banner, buka composition **Channel-Banner** di Remotion Studio
(`npm run dev`), ubah props `name` / `tagline`, lalu render ulang:

```bash
npx remotion still Channel-Banner channel/banner.png
npx remotion still Channel-FotoProfil channel/foto-profil.png
```
