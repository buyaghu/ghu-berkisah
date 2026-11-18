import type { Story } from "../types";
import { pembuka } from "./common";

// Kisah Nabi Musa 'alaihissalam & laut yang terbelah
//
// Pedoman sumber: alur kisah mengikuti Al-Qur'an (QS. Thaha: 24–36, 43–47, 56, 77–78;
// QS. Asy-Syu'ara: 52–67; QS. Al-Qashash: 4; QS. An-Nazi'at: 24; QS. Al-Baqarah: 50)
// dan hadits shahih tentang puasa Asyura (HR. Bukhari no. 2004, Muslim no. 1130).
// Detail israiliyyat (jumlah jalan di laut, nama-nama, ukuran pasukan, dsb.) TIDAK dipakai.
//
// Catatan adab: para nabi TIDAK digambarkan, begitu pula Fir'aun, Bani Israil, dan pasukan.
// Pasukan hanya lewat panji, debu, dan derap. Tongkat tidak digambar dipegang siapa pun;
// pukulan ke laut cukup berupa kilatan cahaya. Yang tampil sebagai karakter hanya narator: Ghu.

export const musaLaut: Story = {
  id: "musa-laut",
  title: "Kisah Nabi Musa & Laut",
  subtitle: "Laut yang Terbelah",
  titlePhrase: "Nabi Musa 'alaihissalam",
  introHook: {
    phrase: "Laut yang luas",
    art: "sea",
    cardPhrase: "jalan yang kering",
    cardTitle: "Laut menjadi jalan!",
  },
  accent: "#2B7BB9",
  sources: [
    "QS. Thaha: 24–36, 43–47, 56, 77–78",
    "QS. Asy-Syu'ara: 52–67",
    "QS. Al-Qashash: 4 · An-Nazi'at: 24",
    "QS. Al-Baqarah: 50",
    "HR. Bukhari no. 2004 & Muslim no. 1130 (puasa Asyura, hari Allah menyelamatkan Nabi Musa)",
  ],
  scenes: [
    {
      id: "01-intro",
      visual: "intro",
      text:
        pembuka("Nabi Musa 'alaihissalam, dan laut yang terbelah") +
        "Laut yang luas, bisa terbelah menjadi jalan yang kering! " +
        "Masya Allah, bagaimana bisa terjadi? Yuk, kita simak kisahnya!",
      sfx: [
        { sound: "ding", at: 0.3, volume: 0.5 },
        { sound: "ombak", at: { phrase: "Laut yang luas" }, volume: 0.35 },
        { sound: "sparkle", at: { phrase: "jalan yang kering" }, volume: 0.6 },
      ],
    },
    {
      id: "02-firaun",
      visual: "egypt",
      label: "Raja yang Sombong",
      sumber: "QS. Al-Qashash: 4 · An-Nazi'at: 24",
      text:
        "Dahulu kala, di negeri Mesir, ada seorang raja yang sangat sombong. Namanya Fir'aun. " +
        "Fir'aun berbuat zalim. Ia menindas Bani Israil, dan membuat mereka sangat menderita. " +
        "Bahkan Fir'aun berkata, akulah tuhan kalian yang paling tinggi. Na'udzubillah!",
      shots: [
        { phrase: "Fir'aun berbuat zalim", visual: "egyptDark" },
        {
          phrase: "Bahkan Fir'aun",
          visual: "book",
          card: { title: "Fir'aun sangat sombong", subtitle: "QS. An-Nazi'at: 24" },
        },
      ],
      sfx: [
        { sound: "angin", at: 0, volume: 0.2, loop: true },
        { sound: "dung", at: { phrase: "Fir'aun berbuat zalim" }, volume: 0.5 },
        { sound: "dung", at: { phrase: "Na'udzubillah" }, volume: 0.4 },
      ],
    },
    {
      id: "03-diutus",
      visual: "callLight",
      label: "Nabi Musa Diutus",
      sumber: "QS. Thaha: 24",
      text:
        "Lalu Allah mengutus Nabi Musa 'alaihissalam. " +
        "Allah berfirman: Pergilah kepada Fir'aun. Sesungguhnya dia telah melampaui batas. " +
        "Tugas ini sangat berat. Fir'aun adalah raja yang besar dan kejam.",
      shots: [{ phrase: "Tugas ini sangat berat", visual: "egypt" }],
      sfx: [
        { sound: "sparkle", at: { phrase: "Lalu Allah mengutus" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Pergilah kepada" }, volume: 0.4 },
      ],
    },
    {
      id: "04-doa",
      visual: "doa",
      label: "Doa Nabi Musa",
      text:
        "Maka Nabi Musa berdoa kepada Allah: " +
        "Rabbisy rahlii shadrii, wa yassir lii amrii. " +
        "Artinya: Ya Tuhanku, lapangkanlah dadaku, dan mudahkanlah untukku urusanku. " +
        "Yuk, kita hafalkan doa ini, dan kita baca saat akan belajar, atau saat menghadapi hal yang sulit.",
      doa: {
        arab: "رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي",
        latin: "Rabbisy rahlii shadrii, wa yassir lii amrii",
        arti: "Ya Tuhanku, lapangkanlah dadaku, dan mudahkanlah untukku urusanku.",
        sumber: "QS. Thaha: 25–26",
        glowPhrase: "Yuk, kita hafalkan",
      },
      sfx: [{ sound: "sparkle", at: { phrase: "Yuk, kita hafalkan" }, volume: 0.7 }],
    },
    {
      id: "05-mengajak",
      visual: "egypt",
      label: "Mengajak Fir'aun",
      sumber: "QS. Thaha: 29–36, 43–47, 56",
      text:
        "Nabi Musa juga memohon, agar saudaranya, Nabi Harun, menemaninya. Dan Allah mengabulkannya. " +
        "Allah berpesan, berbicaralah kepada Fir'aun dengan kata-kata yang lemah lembut. " +
        "Keduanya pun mengajak Fir'aun menyembah Allah saja, dan meminta agar Bani Israil dibebaskan. " +
        "Allah telah memperlihatkan banyak tanda kebesaran-Nya. Tetapi Fir'aun tetap sombong, dan menolak.",
      shots: [
        {
          phrase: "Allah berpesan",
          visual: "book",
          card: { title: "Berbicara dengan lemah lembut", subtitle: "QS. Thaha: 44" },
        },
        { phrase: "Keduanya pun mengajak", visual: "egypt" },
        { phrase: "Tetapi Fir'aun tetap sombong", visual: "egyptDark" },
      ],
      sfx: [
        { sound: "sparkle", at: { phrase: "Allah mengabulkannya" }, volume: 0.5 },
        { sound: "ding", at: { phrase: "Allah berpesan" }, volume: 0.4 },
        { sound: "dung", at: { phrase: "dan menolak" }, volume: 0.5 },
      ],
    },
    {
      id: "06-malam",
      visual: "nightRoad",
      label: "Berangkat Malam Hari",
      sumber: "QS. Asy-Syu'ara: 52",
      text:
        "Lalu Allah mewahyukan kepada Nabi Musa: Pergilah pada malam hari, membawa hamba-hamba-Ku. " +
        "Sesungguhnya kalian akan dikejar. " +
        "Maka pada malam yang sunyi, Nabi Musa dan Bani Israil pun berangkat, meninggalkan negeri Mesir.",
      shots: [{ phrase: "Maka pada malam", visual: "nightRoad" }],
      sfx: [
        { sound: "sparkle", at: { phrase: "Lalu Allah mewahyukan" }, volume: 0.5 },
        { sound: "langkah", at: { phrase: "pun berangkat" }, volume: 0.4 },
      ],
    },
    {
      id: "07-kejar",
      visual: "dustArmy",
      label: "Dikejar Fir'aun",
      sumber: "QS. Asy-Syu'ara: 53–60",
      text:
        "Fir'aun pun mengirim orang ke kota-kota, untuk mengumpulkan bala tentaranya. " +
        "Lalu Fir'aun dan pasukannya mengejar mereka, " +
        "dan berhasil menyusul mereka, pada waktu matahari terbit.",
      shots: [
        { phrase: "Fir'aun pun mengirim", visual: "egyptDark" },
        { phrase: "Lalu Fir'aun dan pasukannya", visual: "dustArmy" },
      ],
      sfx: [
        { sound: "derap", at: { phrase: "Lalu Fir'aun dan pasukannya" }, volume: 0.45, loop: true },
        { sound: "dung", at: { phrase: "matahari terbit" }, volume: 0.4 },
      ],
    },
    {
      id: "08-tepi",
      visual: "seaShore",
      label: "Di Tepi Laut",
      sumber: "QS. Asy-Syu'ara: 61–62",
      text:
        "Di depan mereka, terbentang laut yang luas. Di belakang, pasukan Fir'aun semakin dekat. " +
        "Para pengikut Nabi Musa ketakutan, dan berkata: kita pasti akan tersusul! " +
        "Tetapi Nabi Musa menjawab dengan yakin: Kallaa, inna ma'iya rabbii sayahdiin. " +
        "Sekali-kali tidak! Sesungguhnya Tuhanku bersamaku. Dia akan memberi petunjuk kepadaku.",
      shots: [
        { phrase: "Di belakang, pasukan", visual: "dustArmy" },
        { phrase: "Para pengikut", visual: "seaShore" },
        {
          phrase: "Sekali-kali tidak",
          visual: "book",
          card: { title: "Kallaa, inna ma'iya rabbii sayahdiin", subtitle: "Tuhanku bersamaku · QS. Asy-Syu'ara: 62" },
        },
      ],
      sfx: [
        { sound: "ombak", at: 0, volume: 0.3, loop: true },
        { sound: "derap", at: { phrase: "Di belakang, pasukan" }, volume: 0.35 },
        { sound: "sparkle", at: { phrase: "Kallaa" }, volume: 0.7 },
      ],
    },
    {
      id: "09-tongkat",
      visual: "seaStrike",
      label: "Pukullah Laut Itu",
      sumber: "QS. Asy-Syu'ara: 63",
      text:
        "Lalu Allah mewahyukan kepada Nabi Musa: Pukullah laut itu dengan tongkatmu! " +
        "Maka terbelahlah laut itu. " +
        "Setiap belahan airnya, seperti gunung yang besar. Masya Allah! Allahu Akbar!",
      shots: [{ phrase: "Maka terbelahlah", visual: "seaSplit" }],
      sfx: [
        { sound: "ombak", at: 0, volume: 0.35, loop: true },
        { sound: "sparkle", at: { phrase: "Pukullah laut" }, volume: 0.7 },
        { sound: "splash", at: { phrase: "Maka terbelahlah" }, volume: 0.7 },
        { sound: "yay", at: { phrase: "Masya Allah" }, volume: 0.35 },
      ],
    },
    {
      id: "10-jalan",
      visual: "seaPath",
      label: "Jalan yang Kering",
      sumber: "QS. Thaha: 77 · Asy-Syu'ara: 65",
      text:
        "Allah membuat jalan yang kering, di tengah laut. " +
        "Allah berfirman, tidak perlu takut akan tersusul, dan tidak perlu khawatir. " +
        "Nabi Musa dan semua pengikutnya pun berjalan menyeberangi laut, sampai selamat di seberang. Alhamdulillah!",
      shots: [
        {
          phrase: "Allah berfirman, tidak",
          visual: "book",
          card: { title: "Jangan takut, jangan khawatir", subtitle: "QS. Thaha: 77" },
        },
        { phrase: "Nabi Musa dan semua", visual: "seaPath" },
        { phrase: "sampai selamat", visual: "farShore" },
      ],
      sfx: [
        { sound: "angin", at: 0, volume: 0.2, loop: true },
        { sound: "langkah", at: { phrase: "pun berjalan" }, volume: 0.4 },
        { sound: "yay", at: { phrase: "Alhamdulillah" }, volume: 0.5 },
      ],
    },
    {
      id: "11-tenggelam",
      visual: "seaPath",
      label: "Akhir Orang yang Sombong",
      sumber: "QS. Thaha: 78 · Asy-Syu'ara: 66 · Al-Baqarah: 50",
      text:
        "Fir'aun dan bala tentaranya ikut mengejar, masuk ke jalan di tengah laut itu. " +
        "Lalu air laut kembali menutup, dan Fir'aun bersama pasukannya pun tenggelam. " +
        "Begitulah akhir orang yang sombong dan zalim.",
      shots: [
        { phrase: "Lalu air laut", visual: "seaClose" },
        { phrase: "Begitulah akhir", visual: "seaCalm" },
      ],
      sfx: [
        { sound: "derap", at: 0, volume: 0.3 },
        { sound: "ombak", at: { phrase: "Lalu air laut" }, volume: 0.7 },
        { sound: "dung", at: { phrase: "Begitulah akhir" }, volume: 0.4 },
      ],
    },
    {
      id: "12-asyura",
      visual: "farShore",
      label: "Hari Asyura",
      sumber: "QS. Asy-Syu'ara: 67 · HR. Bukhari no. 2004, Muslim no. 1130",
      text:
        "Sungguh, pada kisah ini terdapat tanda kebesaran Allah. " +
        "Hari ketika Allah menyelamatkan Nabi Musa, adalah hari Asyura, yaitu tanggal sepuluh Muharram. " +
        "Nabi Musa berpuasa pada hari itu, sebagai tanda syukur kepada Allah. " +
        "Dan Nabi Muhammad shallallahu 'alaihi wasallam juga berpuasa pada hari Asyura, dan menyuruh kaum muslimin berpuasa.",
      shots: [
        { phrase: "Hari ketika Allah", visual: "seaCalm" },
        {
          phrase: "Nabi Musa berpuasa",
          visual: "book",
          card: { title: "Puasa Asyura, 10 Muharram", subtitle: "HR. Bukhari & Muslim" },
        },
      ],
      sfx: [
        { sound: "sparkle", at: { phrase: "tanda kebesaran Allah" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "hari Asyura" }, volume: 0.5 },
        { sound: "burung", at: { phrase: "Nabi Muhammad" }, volume: 0.3 },
      ],
    },
    {
      id: "13-hikmah",
      visual: "hikmah",
      text:
        "Nah, teman-teman, apa saja hikmah yang bisa kita petik dari kisah ini? " +
        "Pertama, yakin bahwa Allah selalu bersama kita, seperti Nabi Musa yang berkata, inna ma'iya rabbii. " +
        "Kedua, jangan sombong seperti Fir'aun. Orang yang sombong pasti merugi. " +
        "Ketiga, bersyukur kepada Allah atas setiap pertolongan-Nya. " +
        "Dan keempat, berdoa saat menghadapi hal yang sulit, rabbisy rahlii shadrii, wa yassir lii amrii.",
      hikmah: [
        { icon: "star", title: "Allah selalu bersama kita", phrase: "Pertama" },
        { icon: "heart", title: "Jangan sombong", phrase: "Kedua" },
        { icon: "sprout", title: "Bersyukur kepada Allah", phrase: "Ketiga" },
        { icon: "hands", title: "Berdoa saat ada kesulitan", phrase: "keempat" },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Pertama" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Kedua" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Ketiga" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "keempat" }, volume: 0.6 },
      ],
    },
    {
      id: "14-tebak",
      visual: "quiz",
      label: "Ayo Tebak!",
      text:
        "Sekarang, ayo kita main tebak-tebakan! " +
        "Allah memerintahkan Nabi Musa memukul laut, dengan apa? " +
        "Pilihannya: Batu. Tongkat. Tangan. " +
        "Coba tebak dulu, teman-teman... " +
        "Jawabannya adalah, tongkat! Hebat! " +
        "Kisah ini ada di surat Asy-Syu'ara, ayat enam puluh tiga.",
      quiz: {
        question: "Nabi Musa memukul laut dengan…?",
        options: ["Batu", "Tongkat", "Tangan"],
        answer: 1,
        revealPhrase: "Jawabannya adalah",
      },
      sfx: [
        { sound: "pop", at: { phrase: "Batu" }, volume: 0.5 },
        { sound: "pop", at: { phrase: "Tongkat." }, volume: 0.5 },
        { sound: "pop", at: { phrase: "Tangan" }, volume: 0.5 },
        { sound: "yay", at: { phrase: "Hebat" }, volume: 0.5 },
      ],
    },
    {
      id: "15-penutup",
      visual: "outro",
      text:
        "Semoga Allah menjadikan kita semua anak-anak yang yakin kepada Allah, rendah hati, " +
        "dan pandai bersyukur. Aamiin. " +
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
