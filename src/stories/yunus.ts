import type { Story } from "../types";
import { pembuka } from "./common";

// Kisah Nabi Yunus 'alaihissalam
//
// Pedoman sumber: alur kisah mengikuti Al-Qur'an dan hadits shahih.
// Bagian yang hanya berasal dari penjelasan ulama tafsir (bukan nash) disebut
// terang-terangan di naskah ("para ulama tafsir menjelaskan"), dan detail
// israiliyyat tidak dipakai.
//
// Catatan adab: para nabi TIDAK digambarkan wajah/tubuhnya.
// Visual hanya menampilkan alam, kapal, ikan, kota, jejak kaki, dan cahaya.
// Yang tampil sebagai karakter hanya narator: Ghu.

export const yunus: Story = {
  id: "yunus",
  title: "Kisah Nabi Yunus",
  subtitle: "Doa dari Dalam Perut Ikan",
  titlePhrase: "Nabi Yunus",
  introHook: {
    phrase: "Nabi Yunus pernah",
    art: "fish",
    cardPhrase: "Allah selalu mendengar",
    cardTitle: "Allah selalu mendengar",
  },
  accent: "#2BB3C0",
  sources: [
    "QS. Al-Anbiya: 87–88",
    "QS. As-Saffat: 139–148",
    "QS. Al-Qalam: 48–50",
    "QS. Yunus: 98",
    "HR. Tirmidzi no. 3505 (dishahihkan Al-Albani): keutamaan doa Nabi Yunus",
  ],
  scenes: [
    {
      id: "01-intro",
      visual: "intro",
      text:
        pembuka("Nabi Yunus 'alaihissalam") +
        "Nabi Yunus pernah berada di tempat yang sangat gelap. Gelap sekali! " +
        "Tapi beliau tidak putus asa, karena beliau tahu Allah selalu mendengar. Yuk, kita simak kisahnya!",
      sfx: [
        { sound: "ding", at: 0.3, volume: 0.5 },
        { sound: "sparkle", at: { phrase: "Nabi Yunus" }, volume: 0.6 },
      ],
    },
    {
      id: "02-ninawa",
      visual: "city",
      label: "Negeri Ninawa",
      sumber: "QS. As-Saffat: 139",
      text:
        "Dahulu kala, Allah mengutus Nabi Yunus kepada sebuah kaum yang jumlahnya sangat banyak. " +
        "Para ulama tafsir menjelaskan, negeri mereka bernama Ninawa. " +
        "Nabi Yunus mengajak mereka beriman dan menyembah Allah saja. " +
        "Tapi mereka tidak mau mendengar. Mereka menolak ajakan Nabi Yunus.",
      sfx: [
        { sound: "angin", at: 0, volume: 0.25, loop: true },
        { sound: "burung", at: 0.5, volume: 0.3 },
      ],
    },
    {
      id: "03-pergi",
      visual: "leaving",
      label: "Meninggalkan Ninawa",
      sumber: "QS. Al-Anbiya: 87 · As-Saffat: 140",
      text:
        "Al-Qur'an menceritakan, Nabi Yunus pergi dalam keadaan marah. " +
        "Beliau meninggalkan kaumnya. Para ulama tafsir menjelaskan, saat itu Allah belum mengizinkan beliau untuk pergi. " +
        "Nabi Yunus pun terus pergi, sampai tiba di tepi laut.",
      sfx: [
        { sound: "langkah", at: { phrase: "terus pergi" }, volume: 0.5 },
        { sound: "ombak", at: { phrase: "tepi laut" }, volume: 0.4 },
      ],
    },
    {
      id: "04-kapal",
      visual: "ship",
      label: "Naik Kapal",
      sumber: "QS. As-Saffat: 140",
      text:
        "Di sana, ada sebuah kapal yang penuh dengan muatan. " +
        "Nabi Yunus pun naik ke kapal itu. " +
        "Kapal mulai berlayar di atas laut yang luas sekali.",
      sfx: [
        { sound: "ombak", at: 0, volume: 0.35, loop: true },
        { sound: "camar", at: { phrase: "laut yang luas" }, volume: 0.4 },
      ],
    },
    {
      id: "05-badai",
      visual: "storm",
      label: "Kapal dalam Bahaya",
      text:
        "Di tengah laut, kapal itu menghadapi bahaya. " +
        "Para ulama tafsir menjelaskan, ombak besar datang menghantam, dan kapal yang penuh muatan itu hampir tenggelam. " +
        "Kapal itu bergoyang ke kanan dan ke kiri. Para penumpang ketakutan!",
      sfx: [
        { sound: "badai", at: 0, volume: 0.45, loop: true },
        { sound: "petir", at: { phrase: "ombak besar" }, volume: 0.7 },
        { sound: "petir", at: { phrase: "Para penumpang" }, volume: 0.5 },
      ],
    },
    {
      id: "06-undian",
      visual: "lots",
      label: "Undian",
      sumber: "QS. As-Saffat: 141",
      text:
        "Para penumpang lalu mengadakan undian, untuk menentukan siapa yang harus turun dari kapal. " +
        "Nabi Yunus ikut dalam undian itu, dan ternyata, beliaulah yang kalah dalam undian.",
      sfx: [
        { sound: "badai", at: 0, volume: 0.2, loop: true },
        { sound: "pop", at: { phrase: "ternyata" }, volume: 0.7 },
      ],
    },
    {
      id: "07-ditelan",
      visual: "swallow",
      label: "Ikan yang Sangat Besar",
      sumber: "QS. As-Saffat: 142",
      text:
        "Byuuur! Nabi Yunus turun ke laut yang luas dan dalam. " +
        "Lalu, datanglah seekor ikan yang sangaaat besar. " +
        "Ikan itu membuka mulutnya lebar-lebar, dan menelan Nabi Yunus! " +
        "Tapi dengan izin Allah, Nabi Yunus tetap hidup di dalam perut ikan itu.",
      sfx: [
        { sound: "splash", at: 0.2, volume: 0.7 },
        { sound: "bawah-air", at: 1.2, volume: 0.4, loop: true },
        { sound: "paus", at: { phrase: "seekor ikan" }, volume: 0.6 },
        { sound: "gulp", at: { phrase: "menelan" }, volume: 0.7 },
      ],
    },
    {
      id: "08-gelap",
      visual: "darkness",
      label: "Dalam Kegelapan",
      sumber: "QS. Al-Anbiya: 87",
      text:
        "Coba bayangkan, teman-teman. Al-Qur'an menceritakan, Nabi Yunus berdoa di dalam kegelapan. " +
        "Para ulama tafsir menjelaskan, ada tiga kegelapan. " +
        "Gelapnya malam. Gelapnya dasar laut. Dan gelapnya perut ikan. " +
        "Sunyi sekali. Tidak ada seorang pun yang bisa menolong. " +
        "Tapi Nabi Yunus tahu, masih ada Allah yang Maha Mendengar. " +
        "Lalu, Nabi Yunus berdoa dengan sepenuh hati.",
      sfx: [
        { sound: "bawah-air", at: 0, volume: 0.3, loop: true },
        { sound: "dung", at: { phrase: "Gelapnya malam" }, volume: 0.6 },
        { sound: "dung", at: { phrase: "Gelapnya dasar" }, volume: 0.6 },
        { sound: "dung", at: { phrase: "gelapnya perut" }, volume: 0.6 },
      ],
    },
    {
      id: "09-doa",
      visual: "doa",
      label: "Doa Nabi Yunus",
      text:
        "Laa ilaaha illaa anta, subhaanaka, innii kuntu minazh zhaalimiin. " +
        "Artinya: Tidak ada Tuhan selain Engkau, Maha Suci Engkau. " +
        "Sungguh, aku termasuk orang-orang yang zalim. " +
        "Di dalam Al-Qur'an, Allah berfirman, seandainya Nabi Yunus bukan termasuk orang yang banyak bertasbih, " +
        "niscaya ia akan tetap tinggal di perut ikan itu sampai hari kiamat. " +
        "Dan Allah, Yang Maha Penyayang, mendengar doa itu, lalu mengabulkannya.",
      doa: {
        arab: "لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
        latin: "Laa ilaaha illaa anta, subhaanaka, innii kuntu minazh-zhaalimiin",
        arti: "Tidak ada Tuhan selain Engkau, Maha Suci Engkau. Sungguh, aku termasuk orang-orang yang zalim.",
        sumber: "QS. Al-Anbiya: 87–88 · As-Saffat: 143–144",
        glowPhrase: "mengabulkannya",
      },
      sfx: [
        { sound: "bawah-air", at: 0, volume: 0.15, loop: true },
        { sound: "sparkle", at: { phrase: "mengabulkannya" }, volume: 0.7 },
      ],
    },
    {
      id: "10-pantai",
      visual: "shore",
      label: "Pohon Labu",
      sumber: "QS. As-Saffat: 145–146",
      text:
        "Dengan izin Allah, ikan besar itu mengeluarkan Nabi Yunus ke daratan. " +
        "Nabi Yunus terdampar di pantai, dalam keadaan sakit dan sangat lemah. " +
        "Lalu, Allah menumbuhkan sebatang pohon di dekatnya. " +
        "Para ulama tafsir menjelaskan, itu adalah pohon labu, yang daunnya lebar dan menaungi beliau. " +
        "Sedikit demi sedikit, Nabi Yunus pun sehat kembali. Masya Allah! " +
        "Begitulah Allah menyelamatkan orang-orang yang beriman.",
      shots: [{ phrase: "Begitulah Allah menyelamatkan", visual: "garden" }],
      sfx: [
        { sound: "ombak", at: 0, volume: 0.35, loop: true },
        { sound: "splash", at: 0.3, volume: 0.4 },
        { sound: "tumbuh", at: { phrase: "menumbuhkan" }, volume: 0.6 },
        { sound: "sparkle", at: { phrase: "Masya Allah" }, volume: 0.6 },
      ],
    },
    {
      id: "11-kembali",
      visual: "return",
      label: "Kaum yang Bertaubat",
      sumber: "QS. Yunus: 98 · As-Saffat: 147–148",
      text:
        "Lalu, bagaimana dengan penduduk Ninawa? " +
        "Al-Qur'an menceritakan, kaum Nabi Yunus akhirnya beriman. " +
        "Mereka bertaubat dan memohon ampun kepada Allah. " +
        "Maka Allah menghilangkan azab dari mereka, dan memberi mereka kenikmatan hidup. " +
        "Nabi Yunus diutus kepada seratus ribu orang, atau lebih, dan mereka semua beriman kepada Allah. " +
        "Alhamdulillah!",
      shots: [{ phrase: "Alhamdulillah", visual: "garden" }],
      sfx: [
        { sound: "angin", at: 0, volume: 0.25 },
        { sound: "sparkle", at: { phrase: "Allah menghilangkan azab" }, volume: 0.6 },
        { sound: "yay", at: { phrase: "Alhamdulillah" }, volume: 0.5 },
      ],
    },
    {
      id: "12-hikmah",
      visual: "hikmah",
      text:
        "Nah, teman-teman, apa saja hikmah yang bisa kita petik dari kisah Nabi Yunus? " +
        "Pertama, kita harus sabar, dan tidak boleh mudah marah atau putus asa. " +
        "Kedua, kalau kita berbuat salah, segeralah mengaku salah dan meminta ampun kepada Allah. " +
        "Ketiga, Allah selalu mendengar doa kita, di mana pun kita berada, bahkan di tempat yang paling gelap sekalipun. " +
        "Dan keempat, Allah Maha Pengampun. Selama kita mau bertaubat, pintu ampunan Allah selalu terbuka. " +
        "Seperti penduduk Ninawa, yang diampuni Allah karena mereka mau bertaubat.",
      hikmah: [
        { icon: "sprout", title: "Sabar, jangan mudah marah & putus asa", phrase: "Pertama" },
        { icon: "hands", title: "Akui kesalahan & minta ampun", phrase: "Kedua" },
        { icon: "light", title: "Allah selalu mendengar doa kita", phrase: "Ketiga" },
        { icon: "heart", title: "Allah Maha Pengampun", phrase: "keempat" },
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
        "Setelah Nabi Yunus keluar dari perut ikan, Allah menumbuhkan pohon apa di dekat beliau? " +
        "Apakah pohon kurma, pohon labu, atau pohon zaitun? " +
        "Coba tebak dulu, teman-teman... " +
        "Jawabannya adalah, pohon labu! Hebat! " +
        "Menurut para ulama tafsir, Allah menumbuhkan pohon labu, sehingga Nabi Yunus bisa beristirahat sampai sehat kembali.",
      quiz: {
        question: "Pohon apa yang Allah tumbuhkan?",
        options: ["kurma", "labu", "zaitun"],
        answer: 1,
        revealPhrase: "Jawabannya adalah",
      },
      sfx: [
        { sound: "pop", at: { phrase: "kurma" }, volume: 0.5 },
        { sound: "pop", at: { phrase: "pohon labu" }, volume: 0.5 },
        { sound: "pop", at: { phrase: "zaitun" }, volume: 0.5 },
        { sound: "yay", at: { phrase: "Hebat" }, volume: 0.5 },
      ],
    },
    {
      id: "14-penutup",
      visual: "outro",
      sumber: "HR. Tirmidzi no. 3505, shahih",
      text:
        "Rasulullah shallallahu 'alaihi wa sallam bersabda, tidaklah seorang muslim berdoa dengan doa Nabi Yunus ini, " +
        "untuk suatu urusan, kecuali Allah akan mengabulkannya. " +
        "Yuk, kita hafalkan doanya, dan kita baca saat kita sedih atau sedang kesulitan. " +
        "Semoga kita semua menjadi anak yang sabar, dan selalu dekat dengan Allah. Aamiin. " +
        "Sampai jumpa di kisah nabi berikutnya, bersama Ghu! " +
        "Wassalamu'alaikum warahmatullahi wabarakatuh!",
      sfx: [
        { sound: "sparkle", at: { phrase: "Aamiin" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Sampai jumpa" }, volume: 0.5 },
      ],
    },
  ],
};
