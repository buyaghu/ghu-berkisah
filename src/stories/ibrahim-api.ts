import type { Story } from "../types";
import { pembuka } from "./common";

// Kisah Nabi Ibrahim 'alaihissalam & api yang menjadi dingin
//
// Pedoman sumber: alur kisah mengikuti Al-Qur'an (QS. Al-Anbiya: 51–71, Ash-Shaffat: 95–98)
// dan hadits shahih (HR. Bukhari no. 4563: "hasbunallah wa ni'mal wakil" diucapkan Nabi Ibrahim
// ketika dilemparkan ke dalam api). Bagian yang hanya berasal dari penjelasan ulama tafsir
// disebut terang-terangan di naskah. Detail israiliyyat (nama raja, lama api dinyalakan,
// alat pelontar, kisah malaikat, taman di dalam api, dsb.) TIDAK dipakai.
//
// Catatan adab: para nabi TIDAK digambarkan, begitu pula kaumnya. Patung digambar sebagai
// batu polos tanpa wajah. Visual hanya: kota, kuil batu, langit, api, cahaya.
// Yang tampil sebagai karakter hanya narator: Ghu.

export const ibrahimApi: Story = {
  id: "ibrahim-api",
  title: "Kisah Nabi Ibrahim",
  subtitle: "Api yang Menjadi Dingin",
  titlePhrase: "Nabi Ibrahim",
  introHook: {
    phrase: "Nabi Ibrahim pernah",
    art: "fire",
    cardPhrase: "api itu menjadi dingin",
    cardTitle: "Api yang dingin",
  },
  accent: "#E07A2E",
  sources: [
    "QS. Al-Anbiya: 51–71",
    "QS. Ash-Shaffat: 95–98",
    "QS. Ali 'Imran: 173",
    "QS. Ath-Thalaq: 3",
    "QS. An-Nahl: 120",
    "HR. Bukhari no. 4563: Ibnu Abbas berkata, \"Hasbunallah wa ni'mal wakil\" diucapkan Nabi Ibrahim ketika dilemparkan ke dalam api",
  ],
  scenes: [
    {
      id: "01-intro",
      visual: "intro",
      text:
        pembuka("Nabi Ibrahim 'alaihissalam") +
        "Nabi Ibrahim pernah dilemparkan ke dalam api yang sangat besar. " +
        "Tapi dengan perintah Allah, api itu menjadi dingin dan tidak mencelakakan beliau. Yuk, kita simak kisahnya!",
      sfx: [
        { sound: "ding", at: 0.3, volume: 0.5 },
        { sound: "sparkle", at: { phrase: "Nabi Ibrahim pernah" }, volume: 0.6 },
        { sound: "sparkle", at: { phrase: "api itu menjadi dingin" }, volume: 0.5 },
      ],
    },
    {
      id: "02-kaum",
      visual: "city",
      label: "Kaum Nabi Ibrahim",
      sumber: "QS. Al-Anbiya: 51–52 · Ash-Shaffat: 95",
      text:
        "Dahulu kala, Allah telah memberikan petunjuk kepada Nabi Ibrahim, sejak beliau masih muda. " +
        "Saat itu, kaum Nabi Ibrahim, juga ayahnya, menyembah patung-patung. " +
        "Patung-patung itu mereka pahat sendiri dari batu, dengan tangan mereka. " +
        "Lalu mereka tekun menyembahnya, padahal patung itu hanyalah batu yang diam.",
      shots: [
        { phrase: "menyembah patung-patung", visual: "idols" },
        { phrase: "padahal patung itu", visual: "idolsClose" },
      ],
      sfx: [
        { sound: "angin", at: 0, volume: 0.25, loop: true },
        { sound: "burung", at: 0.5, volume: 0.3 },
        { sound: "dung", at: { phrase: "menyembah patung-patung" }, volume: 0.5 },
        { sound: "pop", at: { phrase: "mereka pahat" }, volume: 0.5 },
      ],
    },
    {
      id: "03-tanya",
      visual: "idols",
      label: "Nabi Ibrahim Bertanya",
      sumber: "QS. Al-Anbiya: 52–56",
      text:
        "Nabi Ibrahim bertanya kepada ayah dan kaumnya, patung-patung apakah ini, yang kalian tekun menyembahnya? " +
        "Mereka menjawab, kami mendapati bapak-bapak kami menyembahnya. " +
        "Nabi Ibrahim berkata, sungguh, kalian dan bapak-bapak kalian berada dalam kesesatan yang nyata. " +
        "Tuhan kalian adalah Tuhan langit dan bumi, yang telah menciptakannya. " +
        "Dan aku termasuk orang yang bersaksi atas hal itu.",
      shots: [
        { phrase: "Mereka menjawab", visual: "city" },
        { phrase: "Tuhan kalian adalah", visual: "skyEarth" },
      ],
      sfx: [
        { sound: "angin", at: 0, volume: 0.2, loop: true },
        { sound: "ding", at: { phrase: "patung-patung apakah" }, volume: 0.4 },
        { sound: "sparkle", at: { phrase: "Tuhan kalian adalah" }, volume: 0.6 },
      ],
    },
    {
      id: "04-hancur",
      visual: "idols",
      label: "Patung Dihancurkan",
      sumber: "QS. Al-Anbiya: 57–58",
      text:
        "Nabi Ibrahim berkata, demi Allah, aku akan melakukan sesuatu terhadap patung-patung kalian, setelah kalian pergi meninggalkannya. " +
        "Ketika kaumnya telah pergi, Nabi Ibrahim menghancurkan patung-patung itu, hingga berkeping-keping. Brak! " +
        "Kecuali patung yang paling besar. Patung itu dibiarkan tetap berdiri, " +
        "agar mereka kembali, untuk bertanya kepadanya.",
      shots: [
        { phrase: "Ketika kaumnya telah pergi", visual: "cityEmpty" },
        { phrase: "Nabi Ibrahim menghancurkan", visual: "idolsBroken" },
      ],
      sfx: [
        { sound: "angin", at: 0, volume: 0.2, loop: true },
        { sound: "langkah", at: { phrase: "Ketika kaumnya" }, volume: 0.35 },
        { sound: "dung", at: { phrase: "Brak" }, volume: 0.8 },
        { sound: "pop", at: { phrase: "Kecuali patung" }, volume: 0.5 },
      ],
    },
    {
      id: "05-siapa",
      visual: "idolsBroken",
      label: "Siapa yang Melakukannya?",
      sumber: "QS. Al-Anbiya: 59–61",
      text:
        "Ketika kaumnya kembali dan melihat patung-patung itu, mereka berkata, " +
        "siapakah yang melakukan ini terhadap tuhan-tuhan kami? Sungguh, dia termasuk orang yang zalim! " +
        "Sebagian dari mereka berkata, kami mendengar ada seorang pemuda yang mencela patung-patung ini, namanya Ibrahim. " +
        "Mereka pun berkata, bawalah dia ke hadapan orang banyak, agar mereka menyaksikan.",
      shots: [
        { phrase: "Sebagian dari mereka", visual: "city" },
        { phrase: "bawalah dia", visual: "idolsAsk" },
      ],
      sfx: [
        { sound: "dung", at: { phrase: "siapakah yang melakukan" }, volume: 0.6 },
        { sound: "langkah", at: { phrase: "bawalah dia" }, volume: 0.4 },
      ],
    },
    {
      id: "06-jawab",
      visual: "idolsAsk",
      label: "Tanyakan kepada Patung",
      sumber: "QS. Al-Anbiya: 62–63",
      text:
        "Mereka bertanya, apakah engkau yang melakukan ini terhadap tuhan-tuhan kami, wahai Ibrahim? " +
        "Nabi Ibrahim menjawab, sebenarnya patung yang besar itulah yang melakukannya. " +
        "Maka tanyakanlah kepada mereka, jika mereka dapat berbicara. " +
        "Para ulama tafsir menjelaskan, Nabi Ibrahim berkata begitu agar kaumnya berpikir, " +
        "bahwa patung tidak bisa berbicara, apalagi menolong.",
      shots: [{ phrase: "Para ulama tafsir", visual: "book", card: { title: "Patung tidak bisa berbicara", subtitle: "apalagi menolong" } }],
      sfx: [
        { sound: "pop", at: { phrase: "patung yang besar" }, volume: 0.5 },
        { sound: "ding", at: { phrase: "jika mereka dapat berbicara" }, volume: 0.5 },
      ],
    },
    {
      id: "07-sadar",
      visual: "idolsAsk",
      label: "Tidak Memberi Manfaat",
      sumber: "QS. Al-Anbiya: 64–67",
      text:
        "Mereka pun kembali kepada kesadaran mereka, lalu berkata, sungguh, kalianlah yang zalim. " +
        "Tapi kemudian mereka menundukkan kepala, dan berkata, engkau tahu, patung-patung itu tidak dapat berbicara. " +
        "Nabi Ibrahim berkata, mengapa kalian menyembah selain Allah, sesuatu yang tidak dapat memberi manfaat sedikit pun, " +
        "dan tidak pula mendatangkan bahaya kepada kalian? Tidakkah kalian mengerti?",
      shots: [
        {
          phrase: "Nabi Ibrahim berkata, mengapa",
          visual: "book",
          card: { title: "Hanya Allah yang menolong", subtitle: "patung tidak memberi manfaat, tidak pula bahaya" },
        },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "kembali kepada kesadaran" }, volume: 0.4 },
        { sound: "sparkle", at: { phrase: "Nabi Ibrahim berkata, mengapa" }, volume: 0.5 },
      ],
    },
    {
      id: "08-api",
      visual: "fire",
      label: "Api yang Besar",
      sumber: "QS. Al-Anbiya: 68 · Ash-Shaffat: 97",
      text:
        "Lalu mereka berkata, bakarlah dia, dan bantulah tuhan-tuhan kalian, jika kalian benar-benar hendak bertindak. " +
        "Mereka berkata, buatlah sebuah bangunan untuknya, lalu lemparkan dia ke dalam api yang menyala-nyala. " +
        "Api yang sangat besar pun dinyalakan. Wusss! " +
        "Lalu Nabi Ibrahim dilemparkan ke dalam api itu.",
      shots: [
        { phrase: "buatlah sebuah bangunan", visual: "fireBuild" },
        { phrase: "Api yang sangat besar", visual: "fire" },
      ],
      sfx: [
        { sound: "angin", at: 0, volume: 0.3, loop: true },
        { sound: "dung", at: { phrase: "bakarlah dia" }, volume: 0.5 },
        { sound: "angin", at: { phrase: "Wusss" }, volume: 0.7 },
        { sound: "badai", at: { phrase: "Api yang sangat besar" }, volume: 0.25 },
      ],
    },
    {
      id: "09-doa",
      visual: "doa",
      label: "Kalimat Tawakal",
      text:
        "Dalam Shahih Bukhari, sahabat Ibnu Abbas menceritakan, ketika Nabi Ibrahim dilemparkan ke dalam api, beliau mengucapkan: " +
        "Hasbunallaah wa ni'mal wakiil. " +
        "Artinya: Cukuplah Allah bagi kami, dan Dia sebaik-baik pelindung. " +
        "Yuk, kita ucapkan kalimat ini, saat kita merasa takut, atau sedang menghadapi kesulitan.",
      doa: {
        arab: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
        latin: "Hasbunallaah wa ni'mal wakiil",
        arti: "Cukuplah Allah (menjadi penolong) bagi kami, dan Dia sebaik-baik pelindung.",
        sumber: "HR. Bukhari no. 4563 · QS. Ali 'Imran: 173",
        glowPhrase: "Yuk, kita ucapkan",
      },
      sfx: [
        { sound: "sparkle", at: { phrase: "Yuk, kita ucapkan" }, volume: 0.7 },
      ],
    },
    {
      id: "10-dingin",
      visual: "fire",
      label: "Api Menjadi Dingin",
      sumber: "QS. Al-Anbiya: 69",
      text:
        "Lalu Allah berfirman: Yaa naaru kuunii bardan wa salaaman 'alaa ibraahiim. " +
        "Wahai api! Jadilah engkau dingin, dan keselamatan bagi Ibrahim. " +
        "Masya Allah! Api yang panas itu pun menjadi dingin, dan tidak mencelakakan Nabi Ibrahim. " +
        "Api adalah ciptaan Allah. Ia tidak bisa membakar, kecuali dengan izin Allah.",
      shots: [
        { phrase: "Wahai api", visual: "fireCool" },
        { phrase: "Api adalah ciptaan Allah", visual: "skyEarth" },
      ],
      sfx: [
        { sound: "badai", at: 0, volume: 0.2 },
        { sound: "sparkle", at: { phrase: "Wahai api" }, volume: 0.8 },
        { sound: "yay", at: { phrase: "Masya Allah" }, volume: 0.4 },
        { sound: "ding", at: { phrase: "Api adalah ciptaan" }, volume: 0.5 },
      ],
    },
    {
      id: "11-selamat",
      visual: "fireCool",
      label: "Allah Menyelamatkan",
      sumber: "QS. Al-Anbiya: 70–71 · Ath-Thalaq: 3",
      text:
        "Mereka hendak berbuat jahat kepada Nabi Ibrahim, tetapi Allah menjadikan mereka orang-orang yang paling rugi. " +
        "Allah menyelamatkan Nabi Ibrahim, dan membawanya ke negeri yang diberkahi. Alhamdulillah! " +
        "Allah berfirman, siapa yang bertawakal kepada Allah, niscaya Allah akan mencukupkan keperluannya.",
      shots: [
        { phrase: "Allah menyelamatkan", visual: "garden" },
        { phrase: "Allah berfirman, siapa", visual: "skyEarth" },
      ],
      sfx: [
        { sound: "sparkle", at: { phrase: "Allah menyelamatkan" }, volume: 0.6 },
        { sound: "yay", at: { phrase: "Alhamdulillah" }, volume: 0.5 },
        { sound: "burung", at: { phrase: "Alhamdulillah" }, volume: 0.3 },
      ],
    },
    {
      id: "12-hikmah",
      visual: "hikmah",
      text:
        "Nah, teman-teman, apa saja hikmah yang bisa kita petik dari kisah Nabi Ibrahim? " +
        "Pertama, hanya Allah yang pantas disembah, karena hanya Allah yang menciptakan dan menolong kita. " +
        "Kedua, berani menyampaikan kebenaran, dengan cara yang membuat orang mau berpikir. " +
        "Ketiga, bertawakal kepada Allah, dengan mengucapkan hasbunallah wa ni'mal wakil. " +
        "Dan keempat, semua ciptaan Allah, bahkan api, taat kepada perintah Allah.",
      hikmah: [
        { icon: "star", title: "Hanya Allah yang disembah", phrase: "Pertama" },
        { icon: "light", title: "Berani menyampaikan kebenaran", phrase: "Kedua" },
        { icon: "hands", title: "Bertawakal kepada Allah", phrase: "Ketiga" },
        { icon: "sprout", title: "Semua ciptaan taat kepada Allah", phrase: "keempat" },
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
        "Saat Nabi Ibrahim dilemparkan ke dalam api, Allah memerintahkan api itu menjadi apa? " +
        "Pilihannya: Panas sekali. Dingin dan selamat. Padam dan gelap. " +
        "Coba tebak dulu, teman-teman... " +
        "Jawabannya adalah, dingin dan selamat! Hebat! " +
        "Firman Allah ini ada di surat Al-Anbiya, ayat enam puluh sembilan.",
      quiz: {
        question: "Allah memerintahkan api menjadi apa?",
        options: ["Panas sekali", "Dingin dan selamat", "Padam dan gelap"],
        answer: 1,
        revealPhrase: "Jawabannya adalah",
      },
      sfx: [
        { sound: "pop", at: { phrase: "Panas sekali" }, volume: 0.5 },
        { sound: "pop", at: { phrase: "Dingin dan selamat" }, volume: 0.5 },
        { sound: "pop", at: { phrase: "Padam dan gelap" }, volume: 0.5 },
        { sound: "yay", at: { phrase: "Hebat" }, volume: 0.5 },
      ],
    },
    {
      id: "14-penutup",
      visual: "outro",
      sumber: "QS. An-Nahl: 120",
      text:
        "Allah berfirman, sungguh, Ibrahim adalah seorang teladan, yang patuh kepada Allah, lurus, " +
        "dan bukan termasuk orang yang menyekutukan Allah. " +
        "Semoga kita semua menjadi anak yang berani, jujur, dan selalu bertawakal kepada Allah. Aamiin. " +
        "Sampai jumpa di kisah nabi berikutnya, bersama Ghu! " +
        "Wassalamu'alaikum warahmatullahi wabarakatuh!",
      sfx: [
        { sound: "sparkle", at: { phrase: "Aamiin" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Sampai jumpa" }, volume: 0.5 },
      ],
    },
  ],
};
