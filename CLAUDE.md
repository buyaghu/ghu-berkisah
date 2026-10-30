# Pedoman Proyek "Ghu Berkisah"

Animasi kisah nabi untuk anak (Remotion). Pedoman ini **wajib** diikuti untuk setiap episode,
Shorts, thumbnail, dan aset channel.

## Syariat (tidak boleh dilanggar)

1. **Tidak menggambarkan nabi dan rasul** dalam bentuk apa pun: wajah, tubuh, siluet, bayangan,
   tangan, maupun karakter pengganti yang mewakili beliau.
   - Kehadiran nabi cukup lewat **narasi Ghu, teks, dan lingkungan**: alam, benda, hewan, kota, kapal,
     cahaya, jejak kaki, panji-panji.
   - Sebagai kehati-hatian, **sahabat, malaikat, manusia, dan jin di dalam kisah juga tidak digambar**.
     Pasukan cukup digambarkan lewat panji, debu, dan suara derap.
   - Satu-satunya karakter manusia adalah **Ghu sebagai narator**, dan hanya muncul di adegan narator
     (pembuka, hikmah, tebak-tebakan, penutup, Shorts), tidak di dalam adegan kisah.
2. **Sumber hanya Al-Qur'an dan hadits shahih.** Tanpa israiliyyat atau detail tanpa dalil.
   Bagian yang hanya dari penjelasan ulama tafsir disebut terang-terangan di naskah.
   Setiap scene kisah mencantumkan dalilnya (`sumber`) dan setiap kisah daftar `sources`.
3. Terjemahan ayat mengikuti terjemahan Kemenag; naskah dicek ustadz/ustadzah sebelum VO dibuat.

## Gaya visual

- **Tanpa zoom/geser kamera.** Variasi dibuat dengan memperbanyak adegan (`shots`) dan ornamen animasi.
- Ghu hanya berjalan saat isi layar pindah sisi; selebihnya berdiri bercerita dengan gerakan tangan.
- Karakter Ghu: tanpa hidung, khimar & baju putih, rok & lengan marun (`src/components/Ghu.tsx`).
- Setiap video dibuka dengan: "Bismillah. Assalamu'alaikum warahmatullahi wabarakatuh. Perkenalkan,
  nama saya Ghu. Kali ini, saya ingin berkisah tentang …" (`src/stories/common.ts`).

## Akun resmi

- YouTube: **Ghu Berkisah** · Instagram: **@buyaaghu** (`channelDefaults` di `src/ChannelArt.tsx`).
  Cantumkan keduanya di deskripsi video, caption, dan kartu penutup Shorts/Reels.

## Privasi Ghu

Jangan memakai foto asli, nama lengkap, nama sekolah, atau kota Ghu di video maupun channel.
Repo ini **publik**: rekaman suara Ghu (`public/voiceover/`) dan video (`rilis/`) **tidak boleh** di-commit di sini.
Keduanya disimpan di repo privat `buyaghu/claude-proyek` (lihat `produksi/PROSEDUR.md`).
