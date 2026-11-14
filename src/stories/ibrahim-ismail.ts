import type { Story } from "../types";
import { pembuka } from "./common";

// Kisah Nabi Ibrahim, Nabi Ismail 'alaihimassalam & ketaatan
//
// Pedoman sumber: alur kisah mengikuti Al-Qur'an (QS. Ash-Shaffat: 99–112) dengan
// tambahan QS. Al-Anbiya: 71 dan QS. Al-Hajj: 37. Bagian yang hanya berasal dari
// penjelasan ulama tafsir disebut terang-terangan di naskah:
//  - anak yang disembelih adalah Ismail (dalil: kabar gembira Ishaq baru datang di ayat 112),
//  - mimpi para nabi adalah wahyu,
//  - "sembelihan yang besar" adalah seekor domba.
// Detail israiliyyat (tempat penyembelihan, setan melempar, pisau tidak memotong, dsb.) TIDAK dipakai.
//
// Catatan adab: para nabi TIDAK digambarkan, begitu pula manusia lain. Tidak ada pisau
// atau adegan penyembelihan. Visual hanya: padang pasir, jejak kaki, tenda, langit malam,
// bukit fajar, cahaya, dan seekor domba. Yang tampil sebagai karakter hanya narator: Ghu.

export const ibrahimIsmail: Story = {
  id: "ibrahim-ismail",
  title: "Kisah Nabi Ibrahim & Ismail",
  subtitle: "Anak yang Sabar dan Taat",
  titlePhrase: "Nabi Ibrahim dan putranya",
  introHook: {
    phrase: "Nabi Ibrahim pernah",
    art: "ram",
    cardPhrase: "anak yang sangat sabar",
    cardTitle: "Anak yang sabar & taat",
  },
  accent: "#3E9C8F",
  sources: [
    "QS. Ash-Shaffat: 99–112",
    "QS. Al-Anbiya: 71",
    "QS. Al-Hajj: 37",
    "Penjelasan ulama tafsir (disebut terang di naskah): anak itu Ismail, mimpi para nabi adalah wahyu, sembelihan yang besar adalah seekor domba",
  ],
  scenes: [
    {
      id: "01-intro",
      visual: "intro",
      text:
        pembuka("Nabi Ibrahim dan putranya, Nabi Ismail 'alaihimassalam") +
        "Nabi Ibrahim pernah mendapat ujian yang sangat berat dari Allah. " +
        "Dan Nabi Ismail adalah anak yang sangat sabar, dan taat kepada Allah. Yuk, kita simak kisahnya!",
      sfx: [
        { sound: "ding", at: 0.3, volume: 0.5 },
        { sound: "sparkle", at: { phrase: "Nabi Ibrahim pernah" }, volume: 0.6 },
        { sound: "sparkle", at: { phrase: "anak yang sangat sabar" }, volume: 0.5 },
      ],
    },
    {
      id: "02-pergi",
      visual: "desert",
      label: "Pergi Menuju Tuhannya",
      sumber: "QS. Ash-Shaffat: 98–99 · Al-Anbiya: 71",
      text:
        "Teman-teman masih ingat kisah Nabi Ibrahim dan api yang menjadi dingin? " +
        "Setelah Allah menyelamatkan Nabi Ibrahim dari api yang besar itu, beliau berkata, " +
        "sesungguhnya aku akan pergi menuju Tuhanku. Dia akan memberi petunjuk kepadaku. " +
        "Nabi Ibrahim pun pergi meninggalkan kaumnya, menuju negeri yang diberkahi Allah. " +
        "Beliau berjalan dengan hati yang tenang, karena yakin Allah selalu membimbingnya.",
      shots: [
        { phrase: "Nabi Ibrahim pun pergi", visual: "footprints" },
        { phrase: "Beliau berjalan", visual: "desert" },
      ],
      sfx: [
        { sound: "angin", at: 0, volume: 0.25, loop: true },
        { sound: "sparkle", at: { phrase: "Dia akan memberi petunjuk" }, volume: 0.5 },
        { sound: "langkah", at: { phrase: "Nabi Ibrahim pun pergi" }, volume: 0.4 },
      ],
    },
    {
      id: "03-doa",
      visual: "doa",
      label: "Doa Nabi Ibrahim",
      text:
        "Lalu Nabi Ibrahim berdoa kepada Allah: " +
        "Rabbi hab lii minash shaalihiin. " +
        "Artinya: Ya Tuhanku, anugerahkanlah kepadaku anak yang termasuk orang-orang yang saleh. " +
        "Yuk, kita hafalkan doa ini, dan kita minta kepada Allah, agar kita menjadi anak-anak yang saleh.",
      doa: {
        arab: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
        latin: "Rabbi hab lii minash shaalihiin",
        arti: "Ya Tuhanku, anugerahkanlah kepadaku (seorang anak) yang termasuk orang-orang yang saleh.",
        sumber: "QS. Ash-Shaffat: 100",
        glowPhrase: "Yuk, kita hafalkan",
      },
      sfx: [{ sound: "sparkle", at: { phrase: "Yuk, kita hafalkan" }, volume: 0.7 }],
    },
    {
      id: "04-kabar",
      visual: "tent",
      label: "Kabar Gembira",
      sumber: "QS. Ash-Shaffat: 101 · 112",
      text:
        "Allah mengabulkan doa Nabi Ibrahim. " +
        "Allah memberinya kabar gembira, dengan seorang anak yang sangat sabar. Masya Allah! " +
        "Para ulama tafsir menjelaskan, anak itu adalah Nabi Ismail. " +
        "Sebab, setelah kisah ini, barulah Allah memberi kabar gembira lagi, tentang kelahiran Nabi Ishaq.",
      shots: [
        { phrase: "Allah memberinya kabar gembira", visual: "tentNight" },
        {
          phrase: "Para ulama tafsir",
          visual: "book",
          card: { title: "Anak yang sangat sabar", subtitle: "Nabi Ismail 'alaihissalam" },
        },
      ],
      sfx: [
        { sound: "burung", at: 0.3, volume: 0.3 },
        { sound: "sparkle", at: { phrase: "kabar gembira" }, volume: 0.6 },
        { sound: "yay", at: { phrase: "Masya Allah" }, volume: 0.4 },
      ],
    },
    {
      id: "05-mimpi",
      visual: "tent",
      label: "Sebuah Mimpi",
      sumber: "QS. Ash-Shaffat: 102",
      text:
        "Nabi Ismail pun tumbuh. Ketika ia sudah cukup besar, dan bisa berjalan bersama ayahnya, " +
        "Nabi Ibrahim bermimpi. Dalam mimpi itu, beliau menyembelih putranya sendiri. " +
        "Para ulama menjelaskan, mimpi para nabi adalah wahyu, yaitu perintah dari Allah. " +
        "Masya Allah, ini adalah ujian yang sangat berat.",
      shots: [
        { phrase: "Nabi Ibrahim bermimpi", visual: "nightDream" },
        { phrase: "Para ulama menjelaskan", visual: "book", card: { title: "Mimpi para nabi adalah wahyu", subtitle: "penjelasan para ulama" } },
        { phrase: "Masya Allah, ini", visual: "nightDream" },
      ],
      sfx: [
        { sound: "langkah", at: { phrase: "bisa berjalan" }, volume: 0.35 },
        { sound: "sparkle", at: { phrase: "Nabi Ibrahim bermimpi" }, volume: 0.4 },
        { sound: "dung", at: { phrase: "ujian yang sangat berat" }, volume: 0.5 },
      ],
    },
    {
      id: "06-tanya",
      visual: "nightDream",
      label: "Wahai Anakku",
      sumber: "QS. Ash-Shaffat: 102",
      text:
        "Nabi Ibrahim pun berbicara kepada putranya: " +
        "Wahai anakku! Sesungguhnya aku melihat dalam mimpi, bahwa aku menyembelihmu. " +
        "Maka pikirkanlah, bagaimana pendapatmu? " +
        "Lihat, teman-teman. Nabi Ibrahim berbicara dengan lembut, dan menanyakan pendapat putranya.",
      shots: [
        { phrase: "Maka pikirkanlah", visual: "tentDawn" },
        { phrase: "Lihat, teman-teman", visual: "book", card: { title: "Berbicara dengan lembut", subtitle: "dan menanyakan pendapat" } },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Wahai anakku" }, volume: 0.4 },
        { sound: "pop", at: { phrase: "bagaimana pendapatmu" }, volume: 0.4 },
      ],
    },
    {
      id: "07-jawab",
      visual: "tentDawn",
      label: "Jawaban Nabi Ismail",
      sumber: "QS. Ash-Shaffat: 102",
      text:
        "Nabi Ismail menjawab: Wahai ayahku! Lakukanlah apa yang diperintahkan Allah kepadamu. " +
        "Insya Allah, engkau akan mendapatiku termasuk orang-orang yang sabar. " +
        "Masya Allah! Nabi Ismail masih muda, tetapi ia sangat taat kepada Allah, " +
        "dan sangat berbakti kepada ayahnya.",
      shots: [
        {
          phrase: "Insya Allah, engkau",
          visual: "book",
          card: { title: "Insya Allah, aku termasuk orang yang sabar", subtitle: "QS. Ash-Shaffat: 102" },
        },
        { phrase: "Masya Allah! Nabi Ismail", visual: "dawnHills" },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Wahai ayahku" }, volume: 0.4 },
        { sound: "sparkle", at: { phrase: "Insya Allah" }, volume: 0.6 },
        { sound: "burung", at: { phrase: "Masya Allah" }, volume: 0.3 },
      ],
    },
    {
      id: "08-berserah",
      visual: "dawnHills",
      label: "Berserah Diri",
      sumber: "QS. Ash-Shaffat: 103",
      text:
        "Ketika keduanya telah berserah diri kepada Allah, " +
        "Nabi Ibrahim membaringkan putranya, untuk melaksanakan perintah Allah. " +
        "Keduanya sama-sama taat. Mereka yakin, perintah Allah pasti membawa kebaikan.",
      shots: [{ phrase: "Keduanya sama-sama taat", visual: "skyEarth" }],
      sfx: [
        { sound: "angin", at: 0, volume: 0.2, loop: true },
        { sound: "sparkle", at: { phrase: "Keduanya sama-sama taat" }, volume: 0.5 },
      ],
    },
    {
      id: "09-panggil",
      visual: "callLight",
      label: "Allah Memanggil",
      sumber: "QS. Ash-Shaffat: 104–106",
      text:
        "Lalu Allah memanggilnya: Wahai Ibrahim! Sungguh, engkau telah membenarkan mimpi itu. " +
        "Demikianlah Allah memberi balasan kepada orang-orang yang berbuat baik. " +
        "Sungguh, ini benar-benar suatu ujian yang nyata.",
      shots: [
        {
          phrase: "Demikianlah Allah",
          visual: "book",
          card: { title: "Balasan bagi orang yang berbuat baik", subtitle: "QS. Ash-Shaffat: 105" },
        },
        { phrase: "Sungguh, ini benar-benar", visual: "callLight" },
      ],
      sfx: [
        { sound: "sparkle", at: { phrase: "Wahai Ibrahim" }, volume: 0.8 },
        { sound: "ding", at: { phrase: "Demikianlah" }, volume: 0.5 },
      ],
    },
    {
      id: "10-tebusan",
      visual: "ram",
      label: "Sembelihan yang Besar",
      sumber: "QS. Ash-Shaffat: 107",
      text:
        "Dan Allah menebus Nabi Ismail, dengan seekor sembelihan yang besar. " +
        "Nabi Ismail selamat. Alhamdulillah! " +
        "Para ulama tafsir menjelaskan, sembelihan yang besar itu adalah seekor domba.",
      shots: [
        { phrase: "Nabi Ismail selamat", visual: "garden" },
        { phrase: "Para ulama tafsir", visual: "ram" },
      ],
      sfx: [
        { sound: "sparkle", at: { phrase: "Dan Allah menebus" }, volume: 0.7 },
        { sound: "yay", at: { phrase: "Alhamdulillah" }, volume: 0.5 },
        { sound: "burung", at: { phrase: "Alhamdulillah" }, volume: 0.3 },
      ],
    },
    {
      id: "11-pujian",
      visual: "skyEarth",
      label: "Salam bagi Ibrahim",
      sumber: "QS. Ash-Shaffat: 108–111 · Al-Hajj: 37",
      text:
        "Allah mengabadikan pujian untuk Nabi Ibrahim, di kalangan orang-orang yang datang kemudian: " +
        "Salaamun 'alaa ibraahiim. Selamat sejahtera bagi Ibrahim. " +
        "Sungguh, beliau termasuk hamba-hamba Allah yang beriman. " +
        "Setiap hari raya Idul Adha, kaum muslimin menyembelih hewan kurban. " +
        "Allah berfirman, daging dan darahnya tidak akan sampai kepada Allah, tetapi yang sampai kepada-Nya adalah ketakwaan kalian.",
      shots: [
        { phrase: "Salaamun", visual: "callLight" },
        { phrase: "Setiap hari raya", visual: "ram" },
        {
          phrase: "Allah berfirman, daging",
          visual: "book",
          card: { title: "Yang sampai kepada Allah adalah takwa", subtitle: "QS. Al-Hajj: 37" },
        },
      ],
      sfx: [
        { sound: "sparkle", at: { phrase: "Salaamun" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Setiap hari raya" }, volume: 0.5 },
      ],
    },
    {
      id: "12-hikmah",
      visual: "hikmah",
      text:
        "Nah, teman-teman, apa saja hikmah yang bisa kita petik dari kisah ini? " +
        "Pertama, taat kepada perintah Allah, walaupun terasa berat. Allah pasti memberi yang terbaik. " +
        "Kedua, sabar dan berbakti kepada ayah dan ibu, seperti Nabi Ismail. Kalau ayah dan ibu meminta tolong, kita jawab dengan kata-kata yang baik. " +
        "Ketiga, berbicara dengan lembut di dalam keluarga, dan saling bertanya pendapat. " +
        "Dan keempat, rajin berdoa agar menjadi anak yang saleh, seperti doa Nabi Ibrahim, rabbi hab lii minash shaalihiin.",
      hikmah: [
        { icon: "star", title: "Taat kepada Allah", phrase: "Pertama" },
        { icon: "heart", title: "Sabar & berbakti kepada orang tua", phrase: "Kedua" },
        { icon: "light", title: "Berbicara dengan lembut", phrase: "Ketiga" },
        { icon: "hands", title: "Berdoa menjadi anak saleh", phrase: "keempat" },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Pertama" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Kedua" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Ketiga" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "keempat" }, volume: 0.6 },
      ],
    },
    {
      id: "13-tebak",
      visual: "quiz",
      label: "Ayo Tebak!",
      text:
        "Sekarang, ayo kita main tebak-tebakan! " +
        "Nabi Ismail berkata kepada ayahnya, insya Allah, engkau akan mendapatiku termasuk orang-orang yang apa? " +
        "Pilihannya: Kuat. Sabar. Pintar. " +
        "Coba tebak dulu, teman-teman... " +
        "Jawabannya adalah, sabar! Hebat! " +
        "Jawaban Nabi Ismail ini ada di surat Ash-Shaffat, ayat seratus dua.",
      quiz: {
        question: "Nabi Ismail termasuk orang-orang yang…?",
        options: ["Kuat", "Sabar", "Pintar"],
        answer: 1,
        revealPhrase: "Jawabannya adalah",
      },
      sfx: [
        { sound: "pop", at: { phrase: "Kuat" }, volume: 0.5 },
        { sound: "pop", at: { phrase: "Sabar." }, volume: 0.5 },
        { sound: "pop", at: { phrase: "Pintar" }, volume: 0.5 },
        { sound: "yay", at: { phrase: "Hebat" }, volume: 0.5 },
      ],
    },
    {
      id: "14-penutup",
      visual: "outro",
      sumber: "QS. Ash-Shaffat: 100",
      text:
        "Semoga Allah menjadikan kita semua anak-anak yang saleh, sabar, taat kepada Allah, " +
        "dan berbakti kepada ayah dan ibu. Aamiin. " +
        "Teman-teman, jangan lupa ajak ayah dan ibu menonton kisah ini bersama, ya. " +
        "Sampai jumpa di kisah nabi berikutnya, bersama Ghu! " +
        "Wassalamu'alaikum warahmatullahi wabarakatuh!",
      sfx: [
        { sound: "sparkle", at: { phrase: "Aamiin" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Sampai jumpa" }, volume: 0.5 },
      ],
    },
  ],
};
