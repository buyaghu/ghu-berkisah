import type { Story } from "../types";
import { pembuka } from "./common";

// Kisah Nabi Musa 'alaihissalam & Khidir
//
// Pedoman sumber: alur kisah mengikuti Al-Qur'an (QS. Al-Kahfi: 60–82) dan hadits shahih
// tentang kisah ini (HR. Bukhari no. 122, 3401, 4725; Muslim no. 2380): pertanyaan "siapa yang paling
// berilmu", ikan di keranjang sebagai tanda, air yang melengkung seperti terowongan, perahu tanpa upah,
// burung yang mematuk air laut, papan perahu yang dicabut, dan sabda Nabi ﷺ "semoga Allah merahmati Musa".
// Nama "Khidir" disebut dalam hadits shahih; status kenabiannya adalah pendapat banyak ulama (disebut di naskah).
// Penjelasan bahwa perbuatan Khidir khusus atas wahyu & tidak boleh ditiru disebut sebagai penjelasan ulama.
// Detail israiliyyat (lokasi pasti dua laut, nama raja, dsb.) TIDAK dipakai.
//
// Catatan adab: para nabi TIDAK digambarkan, begitu pula pemuda, anak, penduduk negeri, dan pemilik perahu.
// Kehadiran mereka cukup lewat jejak kaki, perahu, dinding, rumah, dan narasi. Satu-satunya karakter: Ghu.

export const musaKhidir: Story = {
  id: "musa-khidir",
  title: "Kisah Nabi Musa & Khidir",
  subtitle: "Belajar dengan Sabar",
  titlePhrase: "Nabi Musa 'alaihissalam",
  introHook: {
    phrase: "Seekor ikan",
    art: "basket",
    cardPhrase: "Itulah tanda",
    cardTitle: "Ikan menjadi tanda!",
  },
  accent: "#2E9C8F",
  sources: [
    "QS. Al-Kahfi: 60–82",
    "HR. Bukhari no. 122, 3401, 4725 & Muslim no. 2380 (kisah Nabi Musa dan Khidir)",
    "QS. Thaha: 114 (doa Rabbi zidnii 'ilmaa)",
  ],
  scenes: [
    {
      id: "01-intro",
      visual: "intro",
      text:
        pembuka("Nabi Musa 'alaihissalam, yang berguru kepada Khidir") +
        "Seekor ikan di dalam keranjang, tiba-tiba masuk ke laut! " +
        "Itulah tanda tempat bertemunya dua hamba Allah yang mulia. Yuk, kita simak kisahnya!",
      sfx: [
        { sound: "ding", at: 0.3, volume: 0.5 },
        { sound: "splash", at: { phrase: "masuk ke laut" }, volume: 0.5 },
        { sound: "sparkle", at: { phrase: "Itulah tanda" }, volume: 0.6 },
      ],
    },
    {
      id: "02-ilmu",
      visual: "callLight",
      label: "Siapa yang Paling Berilmu?",
      sumber: "HR. Bukhari no. 122 · Muslim no. 2380",
      text:
        "Suatu hari, Nabi Musa 'alaihissalam berkhutbah di hadapan Bani Israil. " +
        "Lalu beliau ditanya: siapakah orang yang paling berilmu? Nabi Musa menjawab: aku. " +
        "Allah pun menegur Nabi Musa, karena beliau tidak menyandarkan ilmu itu kepada Allah. " +
        "Allah mewahyukan: ada seorang hamba-Ku, di tempat bertemunya dua laut, yang lebih berilmu darimu.",
      shots: [
        {
          phrase: "Lalu beliau ditanya",
          visual: "book",
          card: { title: "Siapa yang paling berilmu?", subtitle: "HR. Bukhari & Muslim" },
        },
        { phrase: "Allah pun menegur", visual: "callLight" },
        { phrase: "Allah mewahyukan", visual: "twoSeas" },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Lalu beliau ditanya" }, volume: 0.4 },
        { sound: "dung", at: { phrase: "Allah pun menegur" }, volume: 0.4 },
        { sound: "sparkle", at: { phrase: "Allah mewahyukan" }, volume: 0.6 },
        { sound: "ombak", at: { phrase: "dua laut" }, volume: 0.3 },
      ],
    },
    {
      id: "03-berangkat",
      visual: "fishBasket",
      label: "Ikan di Dalam Keranjang",
      sumber: "QS. Al-Kahfi: 60 · HR. Bukhari no. 122",
      text:
        "Allah memerintahkan beliau membawa seekor ikan di dalam keranjang. " +
        "Di tempat ikan itu hilang, di situlah hamba Allah itu berada. " +
        "Maka Nabi Musa berangkat, bersama seorang pemuda yang membantunya. " +
        "Nabi Musa berkata: aku tidak akan berhenti berjalan, sampai aku tiba di tempat bertemunya dua laut.",
      shots: [
        { phrase: "Maka Nabi Musa berangkat", visual: "footprints" },
        {
          phrase: "Nabi Musa berkata",
          visual: "book",
          card: { title: "Aku tidak akan berhenti berjalan", subtitle: "QS. Al-Kahfi: 60" },
        },
      ],
      sfx: [
        { sound: "pop", at: { phrase: "seekor ikan" }, volume: 0.5 },
        { sound: "langkah", at: { phrase: "berangkat" }, volume: 0.4 },
        { sound: "ding", at: { phrase: "Nabi Musa berkata" }, volume: 0.4 },
      ],
    },
    {
      id: "04-ikan",
      visual: "twoSeas",
      label: "Ikan yang Masuk ke Laut",
      sumber: "QS. Al-Kahfi: 61 · HR. Bukhari no. 4725",
      text:
        "Sampailah mereka di dekat sebuah batu besar. Mereka beristirahat di sana. " +
        "Lalu, ikan itu bergerak, dan melompat masuk ke laut! Masya Allah. " +
        "Air laut membentuk lengkungan seperti terowongan, di jalan yang dilalui ikan itu. " +
        "Tetapi pemuda itu lupa menceritakannya kepada Nabi Musa.",
      shots: [
        { phrase: "Lalu, ikan itu", visual: "fishJump" },
        { phrase: "Tetapi pemuda", visual: "twoSeas" },
      ],
      sfx: [
        { sound: "ombak", at: 0, volume: 0.25, loop: true },
        { sound: "splash", at: { phrase: "melompat masuk" }, volume: 0.6 },
        { sound: "sparkle", at: { phrase: "Masya Allah" }, volume: 0.6 },
        { sound: "dung", at: { phrase: "lupa menceritakannya" }, volume: 0.35 },
      ],
    },
    {
      id: "05-kembali",
      visual: "desert",
      label: "Kembali Mengikuti Jejak",
      sumber: "QS. Al-Kahfi: 62–64",
      text:
        "Keesokan harinya, Nabi Musa merasa lapar dan lelah. " +
        "Beliau berkata: bawalah kemari makanan kita. " +
        "Pemuda itu menjawab: ketika kita beristirahat di batu itu, aku lupa menceritakan tentang ikan itu. Ikan itu masuk ke laut dengan cara yang aneh. " +
        "Nabi Musa berkata: itulah tempat yang kita cari! Lalu keduanya kembali, mengikuti jejak langkah mereka.",
      shots: [
        { phrase: "Pemuda itu menjawab", visual: "fishBasket" },
        { phrase: "Lalu keduanya kembali", visual: "footprints" },
      ],
      sfx: [
        { sound: "angin", at: 0, volume: 0.2, loop: true },
        { sound: "splash", at: { phrase: "tentang ikan itu" }, volume: 0.5 },
        { sound: "ding", at: { phrase: "itulah tempat" }, volume: 0.5 },
        { sound: "langkah", at: { phrase: "Lalu keduanya kembali" }, volume: 0.4 },
      ],
    },
    {
      id: "06-bertemu",
      visual: "twoSeas",
      label: "Bertemu Khidir",
      sumber: "QS. Al-Kahfi: 65–70 · HR. Bukhari no. 122",
      text:
        "Di sana, mereka bertemu seorang hamba Allah, yang telah Allah beri rahmat dan ilmu. " +
        "Namanya Khidir. Banyak ulama berpendapat, beliau juga seorang nabi. " +
        "Nabi Musa bertanya: bolehkah aku mengikutimu, agar engkau mengajariku ilmu yang benar? " +
        "Khidir menjawab: engkau tidak akan sanggup sabar bersamaku. " +
        "Nabi Musa berkata: Satajidunii insyaa Allahu shaabiraa. Engkau akan mendapatiku, insya Allah, sebagai orang yang sabar. " +
        "Khidir pun berpesan: janganlah engkau bertanya tentang sesuatu, sampai aku sendiri yang menjelaskannya.",
      shots: [
        {
          phrase: "Nabi Musa bertanya",
          visual: "book",
          card: { title: "Bolehkah aku mengikutimu?", subtitle: "QS. Al-Kahfi: 66" },
        },
        {
          phrase: "Nabi Musa berkata: Satajidunii",
          visual: "book",
          card: { title: "Satajidunii insyaa Allahu shaabiraa", subtitle: "Insya Allah aku sabar · QS. Al-Kahfi: 69" },
        },
        { phrase: "Khidir pun berpesan", visual: "seaShore" },
      ],
      sfx: [
        { sound: "sparkle", at: { phrase: "rahmat dan ilmu" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Nabi Musa bertanya" }, volume: 0.4 },
        { sound: "sparkle", at: { phrase: "Satajidunii" }, volume: 0.6 },
        { sound: "ombak", at: { phrase: "Khidir pun berpesan" }, volume: 0.25 },
      ],
    },
    {
      id: "07-perahu",
      visual: "seaShore",
      label: "Naik Perahu",
      sumber: "QS. Al-Kahfi: 71 · HR. Bukhari no. 122",
      text:
        "Keduanya lalu berjalan di tepi pantai, dan menaiki sebuah perahu. " +
        "Lalu datang seekor burung kecil, hinggap di tepi perahu, dan mematuk air laut dengan paruhnya. " +
        "Khidir berkata: ilmuku dan ilmumu, dibandingkan ilmu Allah, hanyalah seperti air yang diambil burung ini dari lautan.",
      shots: [
        { phrase: "dan menaiki sebuah perahu", visual: "boat" },
        { phrase: "Lalu datang seekor burung", visual: "boatBird" },
        {
          phrase: "Khidir berkata",
          visual: "book",
          card: { title: "Ilmu Allah sangat luas", subtitle: "HR. Bukhari no. 122" },
        },
      ],
      sfx: [
        { sound: "ombak", at: 0, volume: 0.25, loop: true },
        { sound: "camar", at: { phrase: "Lalu datang seekor burung" }, volume: 0.35 },
        { sound: "pop", at: { phrase: "mematuk" }, volume: 0.4 },
        { sound: "sparkle", at: { phrase: "Khidir berkata" }, volume: 0.6 },
      ],
    },
    {
      id: "08-lubang",
      visual: "boatHole",
      label: "Perahu yang Dilubangi",
      sumber: "QS. Al-Kahfi: 71–73",
      text:
        "Tiba-tiba, Khidir mencabut sebuah papan perahu itu, sehingga perahu itu berlubang. " +
        "Nabi Musa terkejut, dan berkata: mengapa engkau melubanginya? " +
        "Khidir menjawab: bukankah sudah aku katakan, engkau tidak akan sanggup sabar bersamaku? " +
        "Nabi Musa berkata: maafkan aku, karena aku lupa.",
      shots: [
        {
          phrase: "Khidir menjawab",
          visual: "book",
          card: { title: "Bukankah sudah aku katakan?", subtitle: "QS. Al-Kahfi: 72" },
        },
        { phrase: "maafkan aku", visual: "boat" },
      ],
      sfx: [
        { sound: "dung", at: { phrase: "mencabut" }, volume: 0.5 },
        { sound: "splash", at: { phrase: "berlubang" }, volume: 0.4 },
        { sound: "ding", at: { phrase: "Khidir menjawab" }, volume: 0.4 },
      ],
    },
    {
      id: "09-anak",
      visual: "meadow",
      label: "Seorang Anak",
      sumber: "QS. Al-Kahfi: 74–76",
      text:
        "Lalu keduanya berjalan lagi, dan bertemu seorang anak laki-laki. Khidir mengambil nyawa anak itu. " +
        "Nabi Musa sangat terkejut, dan berkata: mengapa engkau melakukan itu? " +
        "Khidir kembali mengingatkan: bukankah sudah aku katakan, engkau tidak akan sanggup sabar? " +
        "Nabi Musa berkata: jika aku bertanya lagi, maka jangan lagi engkau izinkan aku menyertaimu.",
      shots: [
        {
          phrase: "Nabi Musa sangat terkejut",
          visual: "book",
          card: { title: "Nabi Musa sangat terkejut", subtitle: "QS. Al-Kahfi: 74" },
        },
        { phrase: "Khidir kembali", visual: "meadow" },
      ],
      sfx: [
        { sound: "angin", at: 0, volume: 0.2, loop: true },
        { sound: "dung", at: { phrase: "Nabi Musa sangat terkejut" }, volume: 0.45 },
      ],
    },
    {
      id: "10-dinding",
      visual: "village",
      label: "Dinding yang Hampir Roboh",
      sumber: "QS. Al-Kahfi: 77–78",
      text:
        "Keduanya berjalan lagi, hingga tiba di sebuah negeri. " +
        "Mereka meminta makanan, tetapi penduduknya tidak mau menjamu mereka. " +
        "Di sana, mereka mendapati sebuah dinding yang hampir roboh. " +
        "Lalu Khidir menegakkan dinding itu. " +
        "Nabi Musa berkata: kalau engkau mau, engkau bisa meminta upah untuk itu. " +
        "Khidir menjawab: inilah perpisahan antara aku dan engkau. Aku akan menjelaskan rahasianya kepadamu.",
      shots: [
        { phrase: "Di sana, mereka mendapati", visual: "wallLean" },
        { phrase: "Lalu Khidir menegakkan", visual: "wallFixed" },
        {
          phrase: "Khidir menjawab",
          visual: "book",
          card: { title: "Inilah perpisahan kita", subtitle: "QS. Al-Kahfi: 78" },
        },
      ],
      sfx: [
        { sound: "langkah", at: 0, volume: 0.35 },
        { sound: "dung", at: { phrase: "tidak mau menjamu" }, volume: 0.4 },
        { sound: "tumbuh", at: { phrase: "Lalu Khidir menegakkan" }, volume: 0.5 },
        { sound: "ding", at: { phrase: "Khidir menjawab" }, volume: 0.4 },
      ],
    },
    {
      id: "11-rahasia",
      visual: "boatHole",
      label: "Inilah Rahasianya",
      sumber: "QS. Al-Kahfi: 79–82",
      text:
        "Inilah rahasianya. Perahu itu milik orang-orang miskin yang bekerja di laut. " +
        "Di depan mereka ada seorang raja, yang merampas setiap perahu. Perahu yang rusak, tidak akan diambil. " +
        "Adapun anak itu, kedua orang tuanya adalah orang yang beriman. " +
        "Dikhawatirkan, kelak ia akan menyusahkan kedua orang tuanya, dengan kedurhakaan dan kekafiran. " +
        "Allah ingin menggantinya, dengan anak yang lebih baik, dan lebih sayang kepada orang tuanya. " +
        "Dan dinding itu milik dua anak yatim. Di bawahnya ada harta simpanan untuk mereka, dan ayah mereka orang yang saleh. " +
        "Allah ingin keduanya dewasa, lalu mengambil harta itu, sebagai rahmat dari-Nya. " +
        "Khidir berkata: aku tidak melakukannya menurut kemauanku sendiri.",
      shots: [
        { phrase: "Di depan mereka", visual: "kingBoats" },
        { phrase: "Adapun anak itu", visual: "homeLight" },
        { phrase: "Dan dinding itu", visual: "wallTreasure" },
        {
          phrase: "Khidir berkata",
          visual: "book",
          card: { title: "Bukan menurut kemauanku sendiri", subtitle: "QS. Al-Kahfi: 82" },
        },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Inilah rahasianya" }, volume: 0.5 },
        { sound: "derap", at: { phrase: "Di depan mereka" }, volume: 0.3 },
        { sound: "sparkle", at: { phrase: "Allah ingin menggantinya" }, volume: 0.5 },
        { sound: "sparkle", at: { phrase: "harta simpanan" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Khidir berkata" }, volume: 0.4 },
      ],
    },
    {
      id: "12-pelajaran",
      visual: "seaCalm",
      label: "Pelajaran Berharga",
      sumber: "HR. Bukhari no. 122 · Muslim no. 2380",
      text:
        "Para ulama menjelaskan, semua itu dilakukan Khidir atas wahyu dari Allah, khusus untuk beliau. Kita tidak boleh menirunya. " +
        "Kisah ini mengajarkan, di balik kejadian yang tampak buruk, bisa jadi ada kebaikan yang hanya Allah ketahui. " +
        "Nabi Muhammad shallallahu 'alaihi wasallam bersabda: semoga Allah merahmati Musa. " +
        "Seandainya beliau bersabar, tentu Allah akan menceritakan kepada kita lebih banyak lagi kisah mereka.",
      shots: [
        {
          phrase: "Kisah ini mengajarkan",
          visual: "book",
          card: { title: "Ada kebaikan yang Allah ketahui", subtitle: "Pelajaran dari QS. Al-Kahfi: 60–82" },
        },
        { phrase: "Nabi Muhammad", visual: "farShore" },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Para ulama" }, volume: 0.4 },
        { sound: "sparkle", at: { phrase: "Kisah ini mengajarkan" }, volume: 0.6 },
        { sound: "burung", at: { phrase: "Nabi Muhammad" }, volume: 0.3 },
      ],
    },
    {
      id: "13-doa",
      visual: "doa",
      label: "Doa Agar Ilmu Bertambah",
      text:
        "Teman-teman, Allah mengajarkan sebuah doa di dalam Al-Qur'an, agar ilmu kita bertambah: " +
        "Rabbi zidnii 'ilmaa. Artinya: Ya Tuhanku, tambahkanlah ilmu kepadaku. " +
        "Yuk, kita hafalkan doa ini, dan kita baca setiap kali akan belajar.",
      doa: {
        arab: "رَّبِّ زِدْنِي عِلْمًا",
        latin: "Rabbi zidnii 'ilmaa",
        arti: "Ya Tuhanku, tambahkanlah ilmu kepadaku.",
        sumber: "QS. Thaha: 114",
        glowPhrase: "Yuk, kita hafalkan",
      },
      sfx: [{ sound: "sparkle", at: { phrase: "Yuk, kita hafalkan" }, volume: 0.7 }],
    },
    {
      id: "14-hikmah",
      visual: "hikmah",
      text:
        "Nah, teman-teman, apa saja hikmah yang bisa kita petik dari kisah ini? " +
        "Pertama, semangat menuntut ilmu, walaupun jauh. " +
        "Kedua, rendah hati, karena ilmu Allah sangat luas. " +
        "Ketiga, sabar saat belajar, dan mendengarkan guru. " +
        "Dan keempat, yakin bahwa ketentuan Allah pasti ada hikmahnya.",
      hikmah: [
        { icon: "light", title: "Semangat menuntut ilmu", phrase: "Pertama" },
        { icon: "heart", title: "Rendah hati", phrase: "Kedua" },
        { icon: "sprout", title: "Sabar saat belajar", phrase: "Ketiga" },
        { icon: "star", title: "Yakin pada ketentuan Allah", phrase: "keempat" },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Pertama" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Kedua" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Ketiga" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "keempat" }, volume: 0.6 },
      ],
    },
    {
      id: "15-tebak",
      visual: "quiz",
      label: "Ayo Tebak!",
      text:
        "Sekarang, ayo kita main tebak-tebakan! " +
        "Hewan apa yang menjadi tanda, tempat Nabi Musa bertemu Khidir? " +
        "Pilihannya: Burung. Ikan. Unta. " +
        "Coba tebak dulu, teman-teman... " +
        "Jawabannya adalah, ikan! Hebat! " +
        "Kisah ini ada di surat Al-Kahfi, ayat enam puluh satu.",
      quiz: {
        question: "Hewan apa yang menjadi tanda?",
        options: ["Burung", "Ikan", "Unta"],
        answer: 1,
        revealPhrase: "Jawabannya adalah",
      },
      sfx: [
        { sound: "pop", at: { phrase: "Burung" }, volume: 0.5 },
        { sound: "pop", at: { phrase: "Ikan." }, volume: 0.5 },
        { sound: "pop", at: { phrase: "Unta" }, volume: 0.5 },
        { sound: "yay", at: { phrase: "Hebat" }, volume: 0.5 },
      ],
    },
    {
      id: "16-penutup",
      visual: "outro",
      text:
        "Semoga Allah menjadikan kita semua anak-anak yang semangat menuntut ilmu, sabar, dan rendah hati. Aamiin. " +
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
