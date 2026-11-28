import type { Story } from "../types";
import { pembuka } from "./common";

// Kisah Nabi Ayyub 'alaihissalam
//
// Pedoman sumber: alur kisah hanya dari Al-Qur'an (QS. Al-Anbiya: 83–84, QS. Shad: 41–44,
// QS. An-Nisa: 163, QS. Al-An'am: 84) dan hadits shahih:
//   - HR. Bukhari no. 5641 & Muslim no. 2573: sakit dan lelah seorang muslim menghapus kesalahannya.
//   - HR. Bukhari no. 279 & 3391: belalang-belalang emas yang jatuh kepada Nabi Ayyub, dan jawaban beliau
//     "aku tidak pernah merasa cukup dari berkah-Mu".
//
// Detail israiliyyat TIDAK dipakai: lama sakit (7/13/18 tahun), jenis penyakit, ulat, harta yang habis,
// anak-anak yang wafat, nama dan kisah istri beliau, serta kisah sumpah dan seikat rumput (QS. Shad: 44
// bagian awal) yang tafsirnya menyangkut rincian rumah tangga, sehingga tidak diceritakan untuk anak.
// Al-Qur'an tidak menyebut berapa lama beliau sakit; naskah menyebut hal itu terang-terangan.
//
// Satu penjelasan ulama disebut terang di naskah: adab doa Nabi Ayyub yang tidak menuntut, hanya
// mengadukan keadaan dan memuji Allah (QS. Al-Anbiya: 83).
//
// Catatan adab: Nabi Ayyub TIDAK digambarkan (tanpa wajah, tubuh, siluet, bayangan, tangan, kaki).
// Keluarga beliau dan manusia lain juga tidak digambar. Kehadiran beliau cukup lewat narasi dan
// lingkungan: kebun yang layu lalu bersemi, malam berbintang, mata air yang memancar, jejak kaki,
// rumah yang bercahaya, dan belalang emas. Satu-satunya karakter yang digambar adalah Ghu sang narator.

export const ayyub: Story = {
  id: "ayyub",
  title: "Kisah Nabi Ayyub yang Sangat Sabar",
  subtitle: "Sabar Saat Sakit, Mengadu Hanya kepada Allah",
  titlePhrase: "Nabi Ayyub 'alaihissalam",
  introHook: {
    phrase: "Hentakkanlah kakimu",
    art: "spring",
    cardPhrase: "air yang sejuk",
    cardTitle: "Air sejuk penyembuh!",
  },
  accent: "#3E9A8C",
  sources: [
    "QS. An-Nisa: 163 & QS. Al-An'am: 84 (Nabi Ayyub termasuk para nabi)",
    "QS. Al-Anbiya: 83 & QS. Shad: 41 (ujian sakit dan doa Nabi Ayyub)",
    "QS. Shad: 42 (hentakkan kakimu, inilah air yang sejuk)",
    "QS. Al-Anbiya: 84 & QS. Shad: 43 (disembuhkan dan keluarganya dikembalikan)",
    "QS. Shad: 44 (sungguh, Kami dapati dia seorang yang sabar)",
    "HR. Bukhari no. 5641 & Muslim no. 2573 (sakit menghapus kesalahan)",
    "HR. Bukhari no. 279 & 3391 (belalang-belalang emas)",
  ],
  scenes: [
    {
      id: "01-intro",
      visual: "intro",
      text:
        pembuka("Nabi Ayyub 'alaihissalam, nabi yang sangat sabar") +
        "Hentakkanlah kakimu. Itulah perintah Allah kepada Nabi Ayyub, setelah beliau diuji dengan sakit. " +
        "Lalu memancarlah air yang sejuk dari tanah! Apa yang terjadi? " +
        "Yuk, kita simak kisahnya!",
      sfx: [
        { sound: "ding", at: 0.3, volume: 0.5 },
        { sound: "sparkle", at: { phrase: "Hentakkanlah kakimu" }, volume: 0.6 },
        { sound: "sparkle", at: { phrase: "air yang sejuk" }, volume: 0.6 },
      ],
    },
    {
      id: "02-hamba",
      visual: "garden",
      label: "Hamba Allah yang Saleh",
      sumber: "QS. An-Nisa: 163, QS. Al-An'am: 84",
      text:
        "Teman-teman, Nabi Ayyub 'alaihissalam adalah salah satu nabi yang diutus Allah. " +
        "Nama beliau disebut di dalam Al-Qur'an, bersama para nabi yang lain, seperti Nabi Yunus, Nabi Yusuf, dan Nabi Musa. " +
        "Nabi Ayyub adalah hamba Allah yang saleh. Beliau rajin beribadah, dan selalu taat kepada Allah. " +
        "Tetapi teman-teman, Allah ingin menguji beliau dengan ujian yang sangat berat.",
      shots: [
        {
          phrase: "Nama beliau disebut",
          visual: "book",
          card: { title: "Ayyub, termasuk para nabi", subtitle: "QS. An-Nisa: 163 · QS. Al-An'am: 84" },
        },
        { phrase: "Nabi Ayyub adalah hamba", visual: "homeLight" },
        { phrase: "Tetapi teman-teman", visual: "cloudyGarden" },
      ],
      sfx: [
        { sound: "burung", at: 0, volume: 0.3 },
        { sound: "ding", at: { phrase: "Nama beliau disebut" }, volume: 0.45 },
        { sound: "sparkle", at: { phrase: "selalu taat" }, volume: 0.5 },
        { sound: "dung", at: { phrase: "ujian yang sangat berat" }, volume: 0.4 },
      ],
    },
    {
      id: "03-sakit",
      visual: "cloudyGarden",
      label: "Ujian Sakit",
      sumber: "QS. Al-Anbiya: 83, QS. Shad: 41",
      text:
        "Nabi Ayyub ditimpa penyakit. Badan beliau terasa sangat payah dan sakit. " +
        "Al-Qur'an tidak menyebutkan berapa lama beliau sakit, tetapi ujian itu sungguh berat. " +
        "Seperti kebun yang tadinya hijau, lalu daun-daunnya berguguran. " +
        "Teman-teman, Nabi Muhammad shallallahu 'alaihi wa sallam bersabda: " +
        "tidaklah seorang muslim tertimpa lelah, sakit, atau sedih, melainkan Allah menghapus kesalahan-kesalahannya karena itu. " +
        "Jadi, sakit bukan berarti Allah tidak sayang, ya.",
      shots: [
        { phrase: "Al-Qur'an tidak menyebutkan", visual: "cloudyGarden" },
        { phrase: "Seperti kebun yang tadinya hijau", visual: "witheredGarden" },
        {
          phrase: "Teman-teman, Nabi Muhammad",
          visual: "book",
          card: { title: "Sakit menghapus kesalahan", subtitle: "HR. Bukhari & Muslim" },
        },
      ],
      sfx: [
        { sound: "angin", at: 0, volume: 0.25, loop: true },
        { sound: "dung", at: { phrase: "ditimpa penyakit" }, volume: 0.45 },
        { sound: "ding", at: { phrase: "Teman-teman, Nabi Muhammad" }, volume: 0.45 },
        { sound: "sparkle", at: { phrase: "menghapus kesalahan-kesalahannya" }, volume: 0.5 },
      ],
    },
    {
      id: "04-sabar",
      visual: "nightGarden",
      label: "Tetap Sabar",
      sumber: "QS. Shad: 41, 44",
      text:
        "Walaupun sakit, Nabi Ayyub tetap sabar. Beliau tidak berputus asa, dan tetap taat kepada Allah. " +
        "Beliau selalu kembali dan mengingat Allah. " +
        "Ketika beliau mengadu, beliau hanya mengadu kepada Allah. " +
        "Beliau berkata kepada Tuhannya: sesungguhnya aku diganggu setan dengan kepayahan dan penderitaan. " +
        "Masya Allah, teman-teman. Sabar itu bukan berarti tidak boleh sedih. " +
        "Sabar artinya kita tetap taat, dan menceritakan kesedihan kita kepada Allah.",
      shots: [
        { phrase: "Beliau selalu kembali", visual: "nightGarden" },
        {
          phrase: "Beliau berkata kepada Tuhannya",
          visual: "book",
          card: { title: "Mengadu hanya kepada Allah", subtitle: "QS. Shad: 41" },
        },
        { phrase: "Masya Allah, teman-teman", visual: "nightGarden" },
      ],
      sfx: [
        { sound: "sparkle", at: { phrase: "tetap sabar" }, volume: 0.5 },
        { sound: "ding", at: { phrase: "Beliau berkata kepada Tuhannya" }, volume: 0.45 },
        { sound: "sparkle", at: { phrase: "Masya Allah" }, volume: 0.55 },
      ],
    },
    {
      id: "05-doa",
      visual: "doa",
      label: "Doa Nabi Ayyub",
      text:
        "Lalu Nabi Ayyub berdoa dengan doa yang sangat indah. Doa ini diabadikan di dalam Al-Qur'an: " +
        "Annii massaniyadh dhurru wa anta arhamur raahimiin. " +
        "Artinya: sungguh, aku telah ditimpa penyakit, padahal Engkau Tuhan Yang Maha Penyayang dari semua yang penyayang. " +
        "Para ulama menjelaskan, lihatlah adab Nabi Ayyub. Beliau tidak menuntut, hanya menceritakan keadaannya, lalu memuji kasih sayang Allah. " +
        "Yuk, kita hafalkan doa ini, untuk dibaca saat kita sakit.",
      doa: {
        arab: "أَنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ",
        latin: "Annii massaniyadh dhurru wa anta arhamur raahimiin",
        arti: "Sungguh, aku telah ditimpa penyakit, padahal Engkau Tuhan Yang Maha Penyayang dari semua yang penyayang.",
        sumber: "QS. Al-Anbiya: 83",
        glowPhrase: "Yuk, kita hafalkan",
      },
      sfx: [
        { sound: "sparkle", at: { phrase: "Annii" }, volume: 0.5 },
        { sound: "sparkle", at: { phrase: "Yuk, kita hafalkan" }, volume: 0.7 },
      ],
    },
    {
      id: "06-hentak",
      visual: "springRock",
      label: "Hentakkan Kakimu",
      sumber: "QS. Shad: 42",
      text:
        "Allah Maha Mendengar. Allah mengabulkan doa Nabi Ayyub. " +
        "Allah berfirman: hentakkanlah kakimu. Inilah air yang sejuk, untuk mandi dan untuk minum. " +
        "Nabi Ayyub pun menghentakkan kakinya ke tanah. " +
        "Dan masya Allah! Dari tanah itu, memancarlah air yang jernih dan sejuk! " +
        "Teman-teman, air itu muncul karena perintah Allah. Bagi Allah, tidak ada yang sulit.",
      shots: [
        {
          phrase: "Allah berfirman",
          visual: "book",
          card: { title: "Hentakkanlah kakimu", subtitle: "QS. Shad: 42" },
        },
        { phrase: "Nabi Ayyub pun menghentakkan", visual: "footprints" },
        { phrase: "Dan masya Allah", visual: "spring" },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Allah mengabulkan" }, volume: 0.5 },
        { sound: "dung", at: { phrase: "menghentakkan kakinya" }, volume: 0.55 },
        { sound: "sparkle", at: { phrase: "Dan masya Allah" }, volume: 0.7 },
        { sound: "splash", at: { phrase: "memancarlah air" }, volume: 0.4 },
      ],
    },
    {
      id: "07-sembuh",
      visual: "spring",
      label: "Disembuhkan Allah",
      sumber: "QS. Al-Anbiya: 84",
      text:
        "Nabi Ayyub mandi dan minum dari air itu. " +
        "Maka Allah melenyapkan penyakit yang ada pada beliau. Badan beliau kembali sehat dan kuat. Alhamdulillah! " +
        "Seperti kebun yang layu, lalu disiram hujan, dan bersemi kembali. " +
        "Teman-teman, setelah kesulitan, Allah datangkan kemudahan.",
      shots: [
        { phrase: "Maka Allah melenyapkan", visual: "spring" },
        { phrase: "Seperti kebun yang layu", visual: "bloomGarden" },
        {
          phrase: "Teman-teman, setelah kesulitan",
          visual: "book",
          card: { title: "Allah melenyapkan penyakitnya", subtitle: "QS. Al-Anbiya: 84" },
        },
      ],
      sfx: [
        { sound: "ombak", at: 0, volume: 0.2 },
        { sound: "sparkle", at: { phrase: "Alhamdulillah" }, volume: 0.7 },
        { sound: "tumbuh", at: { phrase: "bersemi kembali" }, volume: 0.5 },
      ],
    },
    {
      id: "08-keluarga",
      visual: "homeLight",
      label: "Keluarga Dikembalikan",
      sumber: "QS. Al-Anbiya: 84, QS. Shad: 43",
      text:
        "Bukan hanya itu, teman-teman. Allah juga mengembalikan keluarga Nabi Ayyub kepadanya, " +
        "bahkan Allah melipatgandakan jumlah mereka. " +
        "Allah berfirman, semua itu adalah rahmat dari Allah, dan pelajaran bagi orang-orang yang berpikir. " +
        "Rumah Nabi Ayyub kembali ramai dan penuh kebahagiaan.",
      shots: [
        { phrase: "bahkan Allah melipatgandakan", visual: "village" },
        {
          phrase: "Allah berfirman",
          visual: "book",
          card: { title: "Rahmat dari Kami", subtitle: "QS. Shad: 43" },
        },
        { phrase: "Rumah Nabi Ayyub", visual: "homeLight" },
      ],
      sfx: [
        { sound: "sparkle", at: { phrase: "mengembalikan keluarga" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Allah berfirman" }, volume: 0.45 },
        { sound: "burung", at: { phrase: "Rumah Nabi Ayyub" }, volume: 0.3 },
      ],
    },
    {
      id: "09-belalang",
      visual: "goldLocusts",
      label: "Belalang Emas",
      sumber: "HR. Bukhari no. 279",
      text:
        "Nabi Muhammad shallallahu 'alaihi wa sallam juga menceritakan kisah ini. " +
        "Suatu hari, ketika Nabi Ayyub sedang mandi, berjatuhanlah belalang-belalang dari emas! " +
        "Nabi Ayyub pun mengumpulkannya. " +
        "Allah bertanya: wahai Ayyub, bukankah Aku telah mencukupkanmu? " +
        "Beliau menjawab: benar, wahai Tuhanku. Tetapi aku tidak pernah merasa cukup dari berkah-Mu. " +
        "Masya Allah. Nabi Ayyub selalu ingin dekat dengan kebaikan dari Allah.",
      shots: [
        { phrase: "Allah bertanya", visual: "goldLocusts" },
        {
          phrase: "Beliau menjawab",
          visual: "book",
          card: { title: "Tak pernah cukup dari berkah-Mu", subtitle: "HR. Bukhari no. 279" },
        },
      ],
      sfx: [
        { sound: "sparkle", at: { phrase: "belalang-belalang dari emas" }, volume: 0.7 },
        { sound: "pop", at: { phrase: "mengumpulkannya" }, volume: 0.5 },
        { sound: "ding", at: { phrase: "Beliau menjawab" }, volume: 0.45 },
      ],
    },
    {
      id: "10-sebaikhamba",
      visual: "bloomGarden",
      label: "Sebaik-baik Hamba",
      sumber: "QS. Shad: 44",
      text:
        "Teman-teman, lihatlah pujian Allah untuk Nabi Ayyub di dalam Al-Qur'an. " +
        "Allah berfirman: sungguh, Kami dapati dia seorang yang sabar. " +
        "Dialah sebaik-baik hamba. Sungguh, dia sangat taat kepada Allah. " +
        "Masya Allah! Karena kesabarannya, Nabi Ayyub mendapat pujian dari Allah, yang tetap dibaca sampai hari ini.",
      shots: [
        {
          phrase: "Allah berfirman",
          visual: "book",
          card: { title: "Sebaik-baik hamba", subtitle: "QS. Shad: 44" },
        },
        { phrase: "Masya Allah", visual: "spring" },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Allah berfirman" }, volume: 0.5 },
        { sound: "sparkle", at: { phrase: "sebaik-baik hamba" }, volume: 0.6 },
        { sound: "sparkle", at: { phrase: "Masya Allah" }, volume: 0.6 },
      ],
    },
    {
      id: "11-hikmah",
      visual: "hikmah",
      text:
        "Nah, teman-teman, apa saja hikmah yang bisa kita petik dari kisah ini? " +
        "Pertama, sabar saat sakit, karena sakit menghapus kesalahan kita. " +
        "Kedua, mengadu dan berdoa hanya kepada Allah. " +
        "Ketiga, setelah kesulitan, Allah datangkan kemudahan. " +
        "Dan keempat, selalu bersyukur dan mengharap berkah dari Allah.",
      hikmah: [
        { icon: "sprout", title: "Sabar saat sakit", phrase: "Pertama" },
        { icon: "hands", title: "Berdoa hanya kepada Allah", phrase: "Kedua" },
        { icon: "light", title: "Setelah sulit ada mudah", phrase: "Ketiga" },
        { icon: "heart", title: "Selalu bersyukur", phrase: "keempat" },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Pertama" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Kedua" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Ketiga" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "keempat" }, volume: 0.6 },
      ],
    },
    {
      id: "12-tebak",
      visual: "quiz",
      label: "Ayo Tebak!",
      text:
        "Sekarang, ayo kita main tebak-tebakan! " +
        "Apa yang memancar dari tanah, ketika Nabi Ayyub menghentakkan kakinya? " +
        "Pilihannya: Api. Air. Emas. " +
        "Coba tebak dulu, teman-teman... " +
        "Jawabannya adalah, air yang sejuk! Hebat! " +
        "Kisah ini ada di dalam surat Shad, ayat empat puluh dua.",
      quiz: {
        question: "Apa yang memancar saat Nabi Ayyub menghentakkan kaki?",
        options: ["Api", "Air", "Emas"],
        answer: 1,
        revealPhrase: "Jawabannya adalah",
      },
      sfx: [
        { sound: "pop", at: { phrase: "Api." }, volume: 0.5 },
        { sound: "pop", at: { phrase: "Air." }, volume: 0.5 },
        { sound: "pop", at: { phrase: "Emas." }, volume: 0.5 },
        { sound: "yay", at: { phrase: "Hebat" }, volume: 0.5 },
      ],
    },
    {
      id: "13-penutup",
      visual: "outro",
      text:
        "Semoga Allah menjadikan kita anak-anak yang sabar, rajin berdoa, dan pandai bersyukur. Aamiin. " +
        "Teman-teman, kalau ada keluarga kita yang sedang sakit, yuk doakan mereka, ya. " +
        "Sampai jumpa di kisah nabi berikutnya, bersama Ghu! " +
        "Wassalamu'alaikum warahmatullahi wabarakatuh!",
      sfx: [
        { sound: "sparkle", at: { phrase: "Aamiin" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Sampai jumpa" }, volume: 0.5 },
      ],
    },
  ],
};
