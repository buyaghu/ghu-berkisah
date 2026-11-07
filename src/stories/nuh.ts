import type { Story } from "../types";
import { pembuka } from "./common";

// Kisah Nabi Nuh 'alaihissalam
//
// Pedoman sumber: alur kisah mengikuti Al-Qur'an dan hadits shahih.
// Bagian yang hanya berasal dari penjelasan ulama tafsir disebut terang-terangan di naskah.
// Detail israiliyyat (ukuran kapal, jenis kayu, nama istri/anak, jumlah penumpang, dsb.) TIDAK dipakai.
//
// Catatan adab: para nabi TIDAK digambarkan wajah/tubuhnya, begitu pula kaumnya.
// Visual hanya menampilkan alam, kota, kapal, air, gunung, hujan, dan cahaya.
// Yang tampil sebagai karakter hanya narator: Ghu.

export const nuh: Story = {
  id: "nuh",
  title: "Kisah Nabi Nuh",
  subtitle: "Kapal Besar yang Menyelamatkan",
  titlePhrase: "Nabi Nuh",
  introHook: {
    phrase: "Nabi Nuh pernah",
    art: "ark",
    cardPhrase: "menyelamatkan orang-orang",
    cardTitle: "Kapal penyelamat",
  },
  accent: "#3A8DBF",
  sources: [
    "QS. Hud: 25–49",
    "QS. Nuh: 1–28",
    "QS. Al-Ankabut: 14",
    "QS. Al-Qamar: 9–15",
    "QS. Al-Mu'minun: 23–30",
    "QS. Al-Isra: 3",
    "HR. Bukhari no. 3340 & Muslim no. 194: Nabi Nuh adalah rasul pertama yang diutus kepada penduduk bumi",
  ],
  scenes: [
    {
      id: "01-intro",
      visual: "intro",
      text:
        pembuka("Nabi Nuh 'alaihissalam") +
        "Nabi Nuh pernah membuat sebuah kapal yang sangat besar, atas perintah Allah. " +
        "Kapal itu menyelamatkan orang-orang yang beriman. Yuk, kita simak kisahnya!",
      sfx: [
        { sound: "ding", at: 0.3, volume: 0.5 },
        { sound: "sparkle", at: { phrase: "Nabi Nuh pernah" }, volume: 0.6 },
      ],
    },
    {
      id: "02-kaum",
      visual: "city",
      label: "Kaum Nabi Nuh",
      sumber: "QS. Nuh: 1–7 · Al-Ankabut: 14",
      text:
        "Dahulu kala, Allah mengutus Nabi Nuh kepada kaumnya. " +
        "Dalam sebuah hadits shahih, Nabi Nuh adalah rasul pertama yang Allah utus kepada penduduk bumi. " +
        "Nabi Nuh mengajak kaumnya menyembah Allah saja. Beliau mengajak mereka siang dan malam, dengan sabar. " +
        "Tapi mereka menutup telinga mereka dengan jari-jari, dan menolak ajakan itu. " +
        "Al-Qur'an menceritakan, Nabi Nuh tinggal bersama kaumnya selama seribu tahun kurang lima puluh tahun. " +
        "Lama sekali, ya! Namun hanya sedikit dari mereka yang beriman.",
      sfx: [
        { sound: "angin", at: 0, volume: 0.25, loop: true },
        { sound: "burung", at: 0.5, volume: 0.3 },
        { sound: "dung", at: { phrase: "menutup telinga" }, volume: 0.5 },
      ],
    },
    {
      id: "03-perintah",
      visual: "arkBuild",
      label: "Membuat Kapal",
      sumber: "QS. Hud: 36–37 · Al-Qamar: 13",
      text:
        "Lalu, Allah memberi tahu Nabi Nuh, bahwa tidak akan ada lagi yang beriman dari kaumnya, selain yang sudah beriman. " +
        "Allah pun memerintahkan, buatlah sebuah kapal, di bawah pengawasan dan petunjuk dari Kami. " +
        "Nabi Nuh pun mulai membuat kapal itu. Al-Qur'an menyebutkan, kapal itu dibuat dari papan-papan dan paku. " +
        "Tuk, tuk, tuk! Sedikit demi sedikit, kapal itu pun jadi.",
      sfx: [
        { sound: "angin", at: 0, volume: 0.2, loop: true },
        { sound: "pop", at: { phrase: "Tuk, tuk, tuk" }, volume: 0.7 },
        { sound: "pop", at: { phrase: "Sedikit demi sedikit" }, volume: 0.5 },
      ],
    },
    {
      id: "04-ejekan",
      visual: "arkBuild",
      label: "Diejek Kaumnya",
      sumber: "QS. Hud: 38–39",
      text:
        "Setiap kali para pembesar kaumnya lewat, mereka mengejek Nabi Nuh. " +
        "Nabi Nuh pun menjawab dengan tenang, kalian boleh mengejek kami sekarang, " +
        "nanti kami pun akan menertawakan kalian, dan kalian akan tahu siapa yang akan mendapat azab. " +
        "Nabi Nuh tidak marah, dan tidak berhenti membuat kapal.",
      shots: [{ phrase: "Nabi Nuh pun menjawab", visual: "city" }, { phrase: "tidak berhenti", visual: "arkBuild" }],
      sfx: [
        { sound: "angin", at: 0, volume: 0.2, loop: true },
        { sound: "pop", at: { phrase: "tidak berhenti" }, volume: 0.6 },
      ],
    },
    {
      id: "05-naik",
      visual: "arkBuild",
      label: "Tanda dari Allah",
      sumber: "QS. Hud: 40 · Al-Mu'minun: 27",
      text:
        "Hingga tibalah perintah Allah. Air memancar dari tanur. Para ulama tafsir berbeda pendapat tentang makna tanur, jadi kita ikuti saja kata Al-Qur'an. " +
        "Allah berfirman kepada Nabi Nuh, bawalah ke dalam kapal itu, sepasang dari setiap jenis hewan, " +
        "juga keluargamu, dan orang-orang yang beriman. " +
        "Al-Qur'an menyebutkan, orang yang beriman bersama Nabi Nuh hanya sedikit. " +
        "Satu per satu, mereka naik ke dalam kapal.",
      shots: [
        { phrase: "Air memancar", visual: "flood" },
        { phrase: "Satu per satu", visual: "arkBuild" },
      ],
      sfx: [
        { sound: "tumbuh", at: { phrase: "Air memancar" }, volume: 0.5 },
        { sound: "langkah", at: { phrase: "Satu per satu" }, volume: 0.4 },
        { sound: "sparkle", at: { phrase: "orang-orang yang beriman" }, volume: 0.5 },
      ],
    },
    {
      id: "06-banjir",
      visual: "flood",
      label: "Air Bah",
      sumber: "QS. Al-Qamar: 11–14 · Hud: 42–43",
      text:
        "Lalu Allah membuka pintu-pintu langit, dengan air yang tercurah deras. " +
        "Allah juga menjadikan bumi memancarkan mata air. Air pun bertemu, sesuai dengan ketetapan Allah. " +
        "Kapal itu berlayar membawa mereka, di tengah gelombang yang tinggi seperti gunung. " +
        "Tapi kapal itu berjalan di bawah penjagaan Allah. " +
        "Salah satu putra Nabi Nuh tidak mau ikut naik. Ia mengira, gunung bisa melindunginya. " +
        "Tetapi hari itu, tidak ada yang bisa melindungi, kecuali Allah. Gelombang pun memisahkan mereka.",
      shots: [{ phrase: "Salah satu putra", visual: "storm" }, { phrase: "Gelombang pun memisahkan", visual: "flood" }],
      sfx: [
        { sound: "badai", at: 0, volume: 0.45, loop: true },
        { sound: "petir", at: { phrase: "pintu-pintu langit" }, volume: 0.7 },
        { sound: "ombak", at: { phrase: "gelombang yang tinggi" }, volume: 0.5 },
        { sound: "petir", at: { phrase: "Gelombang pun" }, volume: 0.5 },
      ],
    },
    {
      id: "07-doa",
      visual: "doa",
      label: "Doa Nabi Nuh",
      text:
        "Saat kapal berlayar, Nabi Nuh berkata, naiklah kalian ke dalam kapal ini. " +
        "Bismillaahi majraahaa wa mursaahaa, inna rabbii laghafuurur rahiim. " +
        "Artinya: Dengan nama Allah, di waktu berlayar dan berlabuhnya. " +
        "Sungguh, Tuhanku benar-benar Maha Pengampun, Maha Penyayang. " +
        "Yuk, kita ingat doa ini, setiap kali kita memulai perjalanan, dengan menyebut nama Allah.",
      doa: {
        arab: "بِسْمِ اللَّهِ مَجْرَاهَا وَمُرْسَاهَا إِنَّ رَبِّي لَغَفُورٌ رَحِيمٌ",
        latin: "Bismillaahi majraahaa wa mursaahaa, inna rabbii laghafuurur rahiim",
        arti: "Dengan nama Allah di waktu berlayar dan berlabuhnya. Sungguh, Tuhanku benar-benar Maha Pengampun, Maha Penyayang.",
        sumber: "QS. Hud: 41",
        glowPhrase: "Yuk, kita ingat",
      },
      sfx: [
        { sound: "ombak", at: 0, volume: 0.15, loop: true },
        { sound: "sparkle", at: { phrase: "Yuk, kita ingat" }, volume: 0.7 },
      ],
    },
    {
      id: "08-surut",
      visual: "flood",
      label: "Gunung Judi",
      sumber: "QS. Hud: 44 · 48",
      text:
        "Setelah itu, Allah berfirman, wahai bumi, telanlah airmu! Dan wahai langit, berhentilah! " +
        "Air pun surut, dan urusan itu selesai atas izin Allah. " +
        "Kapal itu berlabuh di atas gunung Judi. " +
        "Lalu Allah berfirman, wahai Nuh, turunlah dengan selamat sejahtera, dan penuh keberkahan dari Kami, " +
        "untukmu dan untuk orang-orang beriman yang bersamamu. Alhamdulillah!",
      shots: [
        { phrase: "Air pun surut", visual: "judi" },
        { phrase: "Alhamdulillah", visual: "garden" },
      ],
      sfx: [
        { sound: "badai", at: 0, volume: 0.3 },
        { sound: "sparkle", at: { phrase: "Air pun surut" }, volume: 0.6 },
        { sound: "ombak", at: { phrase: "Kapal itu berlabuh" }, volume: 0.3 },
        { sound: "yay", at: { phrase: "Alhamdulillah" }, volume: 0.5 },
      ],
    },
    {
      id: "09-hikmah",
      visual: "hikmah",
      text:
        "Nah, teman-teman, apa saja hikmah yang bisa kita petik dari kisah Nabi Nuh? " +
        "Pertama, kita harus sabar dan tidak mudah putus asa, seperti Nabi Nuh yang mengajak kebaikan bertahun-tahun. " +
        "Kedua, taat kepada perintah Allah, walaupun orang lain mengejek kita. " +
        "Ketiga, Allah pasti menolong orang-orang yang beriman. " +
        "Dan keempat, Allah menyebut Nabi Nuh sebagai hamba yang banyak bersyukur. " +
        "Yuk, kita juga belajar bersyukur setiap hari.",
      hikmah: [
        { icon: "sprout", title: "Sabar & tidak putus asa", phrase: "Pertama" },
        { icon: "hands", title: "Taat walau diejek", phrase: "Kedua" },
        { icon: "light", title: "Allah menolong orang beriman", phrase: "Ketiga" },
        { icon: "heart", title: "Menjadi hamba yang bersyukur", phrase: "keempat" },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Pertama" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Kedua" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Ketiga" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "keempat" }, volume: 0.6 },
      ],
    },
    {
      id: "10-tebak",
      visual: "quiz",
      label: "Ayo Tebak!",
      text:
        "Sekarang, ayo kita main tebak-tebakan! " +
        "Di gunung apakah, kapal Nabi Nuh berlabuh? " +
        "Apakah gunung Uhud, gunung Judi, atau gunung Tsur? " +
        "Coba tebak dulu, teman-teman... " +
        "Jawabannya adalah, gunung Judi! Hebat! " +
        "Nama gunung itu disebutkan langsung di dalam Al-Qur'an, pada surat Hud ayat empat puluh empat.",
      quiz: {
        question: "Di gunung apa kapal berlabuh?",
        options: ["Uhud", "Judi", "Tsur"],
        answer: 1,
        revealPhrase: "Jawabannya adalah",
      },
      sfx: [
        { sound: "pop", at: { phrase: "Uhud" }, volume: 0.5 },
        { sound: "pop", at: { phrase: "gunung Judi, atau" }, volume: 0.5 },
        { sound: "pop", at: { phrase: "Tsur" }, volume: 0.5 },
        { sound: "yay", at: { phrase: "Hebat" }, volume: 0.5 },
      ],
    },
    {
      id: "11-penutup",
      visual: "outro",
      sumber: "QS. Al-Isra: 3",
      text:
        "Allah berfirman tentang Nabi Nuh, sesungguhnya dia adalah hamba Allah yang banyak bersyukur. " +
        "Semoga kita semua menjadi anak yang sabar, taat kepada Allah, dan pandai bersyukur. Aamiin. " +
        "Sampai jumpa di kisah nabi berikutnya, bersama Ghu! " +
        "Wassalamu'alaikum warahmatullahi wabarakatuh!",
      sfx: [
        { sound: "sparkle", at: { phrase: "Aamiin" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Sampai jumpa" }, volume: 0.5 },
      ],
    },
  ],
};
