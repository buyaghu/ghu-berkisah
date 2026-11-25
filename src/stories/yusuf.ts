import type { Story } from "../types";
import { pembuka } from "./common";

// Kisah Nabi Yusuf 'alaihissalam
//
// Pedoman sumber: seluruh alur kisah mengikuti Al-Qur'an, surat Yusuf (QS. Yusuf: 4–101).
// Tidak ada satu pun detail israiliyyat yang dipakai: nama-nama saudara, nama wanita di
// rumah pembesar Mesir, nama raja, umur Nabi Yusuf saat dibuang, jenis binatang yang
// dituduhkan, dan sejenisnya TIDAK disebut karena tidak ada dalilnya.
//
// Dua hal disebut terang-terangan di naskah sebagai penjelasan ulama tafsir:
//   1. Sebelas bintang = sebelas saudara, matahari & bulan = ayah dan ibu
//      (disandarkan pada QS. Yusuf: 100 yang menyebut mimpi itu menjadi nyata).
//   2. Tujuh sapi & tujuh bulir dalam mimpi raja = tujuh tahun, sebagaimana ditakwilkan
//      Nabi Yusuf sendiri di QS. Yusuf: 47–49.
//
// Peristiwa fitnah di rumah pembesar Mesir (QS. Yusuf: 23–35) hanya disebut secara umum
// ("dituduh dengan tuduhan dusta, lalu dimasukkan ke penjara padahal tidak bersalah")
// tanpa rincian apa pun, karena penonton adalah anak-anak.
//
// Catatan adab: para nabi TIDAK digambarkan, begitu pula saudara-saudara Nabi Yusuf,
// pembesar Mesir, raja, dan penduduk negeri. Kehadiran mereka cukup lewat narasi dan
// lingkungan: langit berbintang, sumur, kafilah unta, istana, jendela penjara, karung
// gandum, baju, dan cahaya. Satu-satunya karakter yang digambar adalah Ghu sang narator.

export const yusuf: Story = {
  id: "yusuf",
  title: "Kisah Nabi Yusuf & Mimpi yang Indah",
  subtitle: "Sabar, Memaafkan, dan Janji Allah",
  titlePhrase: "Nabi Yusuf 'alaihissalam",
  introHook: {
    phrase: "Sebelas bintang",
    art: "stars",
    cardPhrase: "mimpi itu menjadi nyata",
    cardTitle: "Mimpi yang menjadi nyata!",
  },
  accent: "#C7873F",
  sources: [
    "QS. Yusuf: 4–6 (mimpi sebelas bintang, matahari, dan bulan)",
    "QS. Yusuf: 8–18 (saudara-saudaranya dan sumur)",
    "QS. Yusuf: 19–22 (kafilah dan negeri Mesir)",
    "QS. Yusuf: 33–35 (tuduhan dusta dan penjara)",
    "QS. Yusuf: 43–49 (mimpi raja: tujuh sapi dan tujuh bulir)",
    "QS. Yusuf: 54–57 (diberi kedudukan di negeri Mesir)",
    "QS. Yusuf: 87–93 (jangan berputus harapan, dan memaafkan)",
    "QS. Yusuf: 96–101 (keluarga bersatu, mimpi menjadi nyata, dan doa Nabi Yusuf)",
  ],
  scenes: [
    {
      id: "01-intro",
      visual: "intro",
      text:
        pembuka("Nabi Yusuf 'alaihissalam, dan mimpinya yang indah") +
        "Sebelas bintang, matahari, dan bulan, semuanya tunduk kepada seorang anak laki-laki. " +
        "Itu hanya sebuah mimpi. Tetapi bertahun-tahun kemudian, mimpi itu menjadi nyata! " +
        "Yuk, kita simak kisahnya!",
      sfx: [
        { sound: "ding", at: 0.3, volume: 0.5 },
        { sound: "sparkle", at: { phrase: "Sebelas bintang" }, volume: 0.6 },
        { sound: "sparkle", at: { phrase: "mimpi itu menjadi nyata" }, volume: 0.6 },
      ],
    },
    {
      id: "02-mimpi",
      visual: "starsDream",
      label: "Mimpi Sebelas Bintang",
      sumber: "QS. Yusuf: 4–6",
      text:
        "Teman-teman, Nabi Yusuf 'alaihissalam adalah putra Nabi Ya'qub 'alaihissalam. " +
        "Suatu malam, Nabi Yusuf bermimpi. Dalam mimpinya, beliau melihat sebelas bintang, matahari, dan bulan, " +
        "semuanya sujud kepada beliau. Masya Allah. " +
        "Pagi-pagi, beliau menceritakan mimpi itu kepada ayahnya. " +
        "Para ulama menjelaskan, sebelas bintang itu adalah sebelas saudaranya, sedangkan matahari dan bulan adalah ayah dan ibunya. " +
        "Nabi Ya'qub berpesan: jangan engkau ceritakan mimpi ini kepada saudara-saudaramu. " +
        "Beliau tahu, Allah akan memilih Yusuf dan mengajarinya ilmu yang tinggi.",
      shots: [
        {
          phrase: "Pagi-pagi",
          visual: "book",
          card: { title: "Aku melihat sebelas bintang", subtitle: "QS. Yusuf: 4" },
        },
        { phrase: "Para ulama menjelaskan", visual: "starsDream" },
        {
          phrase: "Nabi Ya'qub berpesan",
          visual: "book",
          card: { title: "Jangan ceritakan mimpimu", subtitle: "QS. Yusuf: 5" },
        },
      ],
      sfx: [
        { sound: "sparkle", at: { phrase: "sebelas bintang" }, volume: 0.6 },
        { sound: "sparkle", at: { phrase: "Masya Allah" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Nabi Ya'qub berpesan" }, volume: 0.4 },
      ],
    },
    {
      id: "03-saudara",
      visual: "desert",
      label: "Saudara yang Cemburu",
      sumber: "QS. Yusuf: 8–10",
      text:
        "Ternyata, saudara-saudara Nabi Yusuf merasa cemburu. " +
        "Mereka berkata: ayah lebih menyayangi Yusuf daripada kita. " +
        "Lalu mereka bersepakat untuk menjauhkan Nabi Yusuf dari ayahnya. " +
        "Salah satu dari mereka mengusulkan: jangan kalian bunuh, tetapi masukkan saja dia ke dalam sumur. " +
        "Teman-teman, cemburu itu memang berat, ya. Karena itu, mari kita belajar ikut senang saat saudara kita mendapat kebaikan.",
      shots: [
        { phrase: "Lalu mereka bersepakat", visual: "footprints" },
        { phrase: "Salah satu dari mereka", visual: "well" },
        {
          phrase: "Teman-teman, cemburu itu",
          visual: "book",
          card: { title: "Ikut senang, bukan cemburu", subtitle: "Pelajaran dari QS. Yusuf: 8" },
        },
      ],
      sfx: [
        { sound: "angin", at: 0, volume: 0.2, loop: true },
        { sound: "dung", at: { phrase: "merasa cemburu" }, volume: 0.4 },
        { sound: "langkah", at: { phrase: "Lalu mereka bersepakat" }, volume: 0.4 },
        { sound: "ding", at: { phrase: "Teman-teman, cemburu itu" }, volume: 0.4 },
      ],
    },
    {
      id: "04-sumur",
      visual: "well",
      label: "Di Dalam Sumur",
      sumber: "QS. Yusuf: 15–18",
      text:
        "Maka Nabi Yusuf pun dimasukkan ke dalam sumur yang gelap. " +
        "Tetapi Allah tidak pernah meninggalkan beliau. Allah mewahyukan kepada Nabi Yusuf, bahwa kelak beliau akan selamat. " +
        "Saudara-saudaranya lalu pulang membawa baju Nabi Yusuf, dan berkata bahwa Yusuf dimakan binatang buas. " +
        "Nabi Ya'qub sangat sedih. Tetapi beliau berkata: fashabrun jamiil. Maka kesabaran yang baik itulah kesabaranku. " +
        "Dan hanya kepada Allah beliau meminta pertolongan.",
      shots: [
        { phrase: "Tetapi Allah tidak pernah", visual: "well" },
        { phrase: "Saudara-saudaranya lalu pulang", visual: "shirtLight" },
        {
          phrase: "Tetapi beliau berkata",
          visual: "book",
          card: { title: "Fashabrun jamiil", subtitle: "Kesabaran yang baik · QS. Yusuf: 18" },
        },
      ],
      sfx: [
        { sound: "dung", at: { phrase: "sumur yang gelap" }, volume: 0.45 },
        { sound: "sparkle", at: { phrase: "Tetapi Allah tidak pernah" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Tetapi beliau berkata" }, volume: 0.5 },
      ],
    },
    {
      id: "05-kafilah",
      visual: "caravan",
      label: "Kafilah ke Mesir",
      sumber: "QS. Yusuf: 19–22",
      text:
        "Beberapa waktu kemudian, datanglah sebuah kafilah yang mencari air. " +
        "Mereka menemukan Nabi Yusuf di dalam sumur, lalu membawa beliau pergi. " +
        "Nabi Yusuf pun dijual, hingga akhirnya sampai di negeri Mesir, di rumah seorang pembesar. " +
        "Pembesar itu berkata kepada istrinya: perlakukanlah dia dengan baik. " +
        "Begitulah Allah menjaga Nabi Yusuf. Dan ketika beliau dewasa, Allah memberi beliau ilmu dan hikmah. " +
        "Sebab, begitulah Allah membalas orang-orang yang berbuat baik.",
      shots: [
        { phrase: "Mereka menemukan Nabi Yusuf", visual: "well" },
        { phrase: "hingga akhirnya sampai di negeri Mesir", visual: "egypt" },
        {
          phrase: "Begitulah Allah menjaga",
          visual: "book",
          card: { title: "Allah memberinya ilmu & hikmah", subtitle: "QS. Yusuf: 22" },
        },
      ],
      sfx: [
        { sound: "derap", at: 0, volume: 0.3 },
        { sound: "pop", at: { phrase: "Mereka menemukan Nabi Yusuf" }, volume: 0.5 },
        { sound: "ding", at: { phrase: "negeri Mesir" }, volume: 0.4 },
        { sound: "sparkle", at: { phrase: "Begitulah Allah menjaga" }, volume: 0.6 },
      ],
    },
    {
      id: "06-penjara",
      visual: "prison",
      label: "Dipenjara Padahal Tidak Bersalah",
      sumber: "QS. Yusuf: 33–35",
      text:
        "Di rumah itu, Nabi Yusuf diuji dengan ujian yang berat. " +
        "Beliau diminta melakukan sesuatu yang dilarang Allah. Tetapi beliau menolak, dan memilih taat kepada Allah. " +
        "Nabi Yusuf berdoa: wahai Tuhanku, penjara lebih aku sukai daripada memenuhi ajakan mereka. " +
        "Beliau pun dituduh dengan tuduhan dusta, lalu dimasukkan ke dalam penjara, padahal beliau tidak bersalah. " +
        "Masya Allah, teman-teman. Di dalam penjara pun Nabi Yusuf tetap berbuat baik, dan mengajak orang-orang menyembah Allah saja.",
      shots: [
        {
          phrase: "Nabi Yusuf berdoa",
          visual: "book",
          card: { title: "Penjara lebih aku sukai", subtitle: "QS. Yusuf: 33" },
        },
        { phrase: "Beliau pun dituduh", visual: "prison" },
      ],
      sfx: [
        { sound: "dung", at: { phrase: "ujian yang berat" }, volume: 0.4 },
        { sound: "ding", at: { phrase: "Nabi Yusuf berdoa" }, volume: 0.5 },
        { sound: "burung", at: { phrase: "tetap berbuat baik" }, volume: 0.3 },
      ],
    },
    {
      id: "07-mimpiraja",
      visual: "dreamCows",
      label: "Mimpi Raja",
      sumber: "QS. Yusuf: 43–49",
      text:
        "Bertahun-tahun kemudian, raja Mesir bermimpi. " +
        "Beliau melihat tujuh sapi yang gemuk dimakan oleh tujuh sapi yang kurus. " +
        "Beliau juga melihat tujuh bulir gandum yang hijau, dan tujuh bulir yang kering. " +
        "Tidak ada seorang pun yang bisa menjelaskan mimpi itu. " +
        "Lalu teringatlah seseorang kepada Nabi Yusuf di dalam penjara. " +
        "Nabi Yusuf pun menjelaskan: tujuh sapi gemuk dan bulir hijau adalah tujuh tahun yang subur. " +
        "Tujuh sapi kurus dan bulir kering adalah tujuh tahun paceklik, yaitu masa sulit mencari makanan. " +
        "Maka simpanlah makanan di tahun-tahun yang subur, untuk menghadapi tahun-tahun yang sulit.",
      shots: [
        { phrase: "Tidak ada seorang pun", visual: "egypt" },
        { phrase: "Lalu teringatlah seseorang", visual: "prison" },
        { phrase: "Nabi Yusuf pun menjelaskan", visual: "dreamCows" },
        {
          phrase: "Maka simpanlah makanan",
          visual: "book",
          card: { title: "Simpan di masa subur", subtitle: "QS. Yusuf: 47–49" },
        },
      ],
      sfx: [
        { sound: "sparkle", at: 0.3, volume: 0.4 },
        { sound: "dung", at: { phrase: "tujuh sapi yang kurus" }, volume: 0.4 },
        { sound: "ding", at: { phrase: "Lalu teringatlah seseorang" }, volume: 0.5 },
        { sound: "tumbuh", at: { phrase: "tujuh tahun yang subur" }, volume: 0.5 },
      ],
    },
    {
      id: "08-gudang",
      visual: "granary",
      label: "Penjaga Gudang Makanan",
      sumber: "QS. Yusuf: 54–57",
      text:
        "Raja sangat kagum. Nabi Yusuf pun dibebaskan, dan diberi kedudukan yang tinggi di negeri Mesir. " +
        "Beliau berkata: jadikanlah aku penjaga gudang-gudang makanan, karena aku orang yang pandai menjaga dan berilmu. " +
        "Maka Nabi Yusuf mengatur makanan seluruh negeri. Beliau amanah, dan tidak pernah berkhianat. " +
        "Teman-teman, dari sumur yang gelap, Allah mengangkat Nabi Yusuf menjadi pemimpin yang dipercaya. " +
        "Itulah balasan bagi orang yang sabar dan bertakwa.",
      shots: [
        {
          phrase: "Beliau berkata",
          visual: "book",
          card: { title: "Aku pandai menjaga & berilmu", subtitle: "QS. Yusuf: 55" },
        },
        { phrase: "Maka Nabi Yusuf mengatur", visual: "granary" },
        { phrase: "Itulah balasan", visual: "egypt" },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Beliau berkata" }, volume: 0.4 },
        { sound: "pop", at: { phrase: "mengatur makanan" }, volume: 0.4 },
        { sound: "sparkle", at: { phrase: "Itulah balasan" }, volume: 0.6 },
      ],
    },
    {
      id: "09-saudaradatang",
      visual: "granary",
      label: "Saudara-saudara Datang",
      sumber: "QS. Yusuf: 58, 87–90",
      text:
        "Lalu datanglah masa paceklik. Makanan menjadi sulit. " +
        "Saudara-saudara Nabi Yusuf pun datang ke Mesir untuk meminta makanan. " +
        "Mereka tidak mengenali beliau, tetapi Nabi Yusuf mengenali mereka. " +
        "Di kampungnya, Nabi Ya'qub tetap berharap kepada Allah. Beliau berpesan: jangan berputus harapan dari rahmat Allah. " +
        "Akhirnya, Nabi Yusuf memberi tahu: akulah Yusuf, dan ini saudaraku. " +
        "Sungguh, Allah tidak menyia-siakan pahala orang-orang yang berbuat baik.",
      shots: [
        { phrase: "Saudara-saudara Nabi Yusuf pun datang", visual: "caravan" },
        {
          phrase: "Beliau berpesan",
          visual: "book",
          card: { title: "Jangan berputus harapan", subtitle: "QS. Yusuf: 87" },
        },
        { phrase: "Akhirnya, Nabi Yusuf memberi tahu", visual: "granary" },
      ],
      sfx: [
        { sound: "angin", at: 0, volume: 0.2, loop: true },
        { sound: "derap", at: { phrase: "datang ke Mesir" }, volume: 0.3 },
        { sound: "ding", at: { phrase: "Beliau berpesan" }, volume: 0.45 },
        { sound: "sparkle", at: { phrase: "akulah Yusuf" }, volume: 0.6 },
      ],
    },
    {
      id: "10-maaf",
      visual: "shirtLight",
      label: "Memaafkan Saudaranya",
      sumber: "QS. Yusuf: 92–96",
      text:
        "Nah, teman-teman, inilah bagian yang paling indah. " +
        "Saudara-saudaranya mengakui kesalahan mereka. " +
        "Dan tahukah kalian apa kata Nabi Yusuf? Beliau berkata: tidak ada cercaan terhadap kalian hari ini. " +
        "Semoga Allah mengampuni kalian. Masya Allah! Beliau memaafkan, padahal beliau pernah dibuang ke dalam sumur. " +
        "Lalu Nabi Yusuf berkata: bawalah bajuku ini, dan letakkanlah ke wajah ayahku. " +
        "Ketika baju itu sampai, Nabi Ya'qub dapat melihat kembali. Alhamdulillah.",
      shots: [
        {
          phrase: "Beliau berkata: tidak ada cercaan",
          visual: "book",
          card: { title: "Tidak ada cercaan hari ini", subtitle: "QS. Yusuf: 92" },
        },
        { phrase: "Lalu Nabi Yusuf berkata", visual: "shirtLight" },
        { phrase: "Ketika baju itu sampai", visual: "homeLight" },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "inilah bagian yang paling indah" }, volume: 0.45 },
        { sound: "sparkle", at: { phrase: "Masya Allah" }, volume: 0.6 },
        { sound: "sparkle", at: { phrase: "dapat melihat kembali" }, volume: 0.7 },
      ],
    },
    {
      id: "11-terwujud",
      visual: "starsDream",
      label: "Mimpi Itu Menjadi Nyata",
      sumber: "QS. Yusuf: 99–100",
      text:
        "Akhirnya, seluruh keluarga Nabi Yusuf pindah ke Mesir. " +
        "Ayah, ibu, dan saudara-saudaranya berkumpul kembali, setelah bertahun-tahun berpisah. " +
        "Mereka semua tunduk dengan penuh hormat kepada Nabi Yusuf. " +
        "Dan Nabi Yusuf berkata kepada ayahnya: inilah mimpiku dahulu, dan Allah telah menjadikannya nyata. " +
        "Sebelas bintang, matahari, dan bulan. Subhanallah, janji Allah selalu benar. " +
        "Hanya saja, kadang Allah menepatinya setelah kita bersabar lebih lama.",
      shots: [
        { phrase: "Ayah, ibu, dan saudara", visual: "homeLight" },
        { phrase: "Dan Nabi Yusuf berkata", visual: "starsDream" },
        {
          phrase: "Subhanallah, janji Allah",
          visual: "book",
          card: { title: "Janji Allah selalu benar", subtitle: "QS. Yusuf: 100" },
        },
      ],
      sfx: [
        { sound: "sparkle", at: { phrase: "berkumpul kembali" }, volume: 0.6 },
        { sound: "sparkle", at: { phrase: "Sebelas bintang" }, volume: 0.7 },
        { sound: "ding", at: { phrase: "Subhanallah" }, volume: 0.5 },
      ],
    },
    {
      id: "12-doa",
      visual: "doa",
      label: "Doa Nabi Yusuf",
      text:
        "Teman-teman, di akhir kisahnya, Nabi Yusuf 'alaihissalam berdoa kepada Allah. " +
        "Doa beliau diabadikan di dalam Al-Qur'an: " +
        "Tawaffanii muslimaa wa alhiqnii bish shaalihiin. " +
        "Artinya: matikanlah aku dalam keadaan Islam, dan gabungkanlah aku dengan orang-orang yang saleh. " +
        "Yuk, kita hafalkan doa ini bersama, agar kita hidup dan kembali kepada Allah sebagai muslim.",
      doa: {
        arab: "تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ",
        latin: "Tawaffanii muslimaa wa alhiqnii bish shaalihiin",
        arti: "Matikanlah aku dalam keadaan Islam dan gabungkanlah aku dengan orang-orang yang saleh.",
        sumber: "QS. Yusuf: 101",
        glowPhrase: "Yuk, kita hafalkan",
      },
      sfx: [{ sound: "sparkle", at: { phrase: "Yuk, kita hafalkan" }, volume: 0.7 }],
    },
    {
      id: "13-hikmah",
      visual: "hikmah",
      text:
        "Nah, teman-teman, apa saja hikmah yang bisa kita petik dari kisah ini? " +
        "Pertama, sabar saat diuji, karena Allah selalu menjaga kita. " +
        "Kedua, memaafkan itu jauh lebih indah daripada membalas. " +
        "Ketiga, menjadi orang yang amanah dan bisa dipercaya. " +
        "Dan keempat, jangan pernah berputus harapan dari rahmat Allah.",
      hikmah: [
        { icon: "sprout", title: "Sabar saat diuji", phrase: "Pertama" },
        { icon: "heart", title: "Memaafkan itu indah", phrase: "Kedua" },
        { icon: "hands", title: "Amanah & bisa dipercaya", phrase: "Ketiga" },
        { icon: "star", title: "Jangan putus harapan", phrase: "keempat" },
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
        "Berapa jumlah bintang yang Nabi Yusuf lihat di dalam mimpinya? " +
        "Pilihannya: Tujuh. Sembilan. Sebelas. " +
        "Coba tebak dulu, teman-teman... " +
        "Jawabannya adalah, sebelas! Hebat! " +
        "Kisah ini ada di dalam surat Yusuf, ayat empat.",
      quiz: {
        question: "Berapa bintang dalam mimpi Nabi Yusuf?",
        options: ["Tujuh", "Sembilan", "Sebelas"],
        answer: 2,
        revealPhrase: "Jawabannya adalah",
      },
      sfx: [
        { sound: "pop", at: { phrase: "Tujuh." }, volume: 0.5 },
        { sound: "pop", at: { phrase: "Sembilan." }, volume: 0.5 },
        { sound: "pop", at: { phrase: "Sebelas." }, volume: 0.5 },
        { sound: "yay", at: { phrase: "Hebat" }, volume: 0.5 },
      ],
    },
    {
      id: "15-penutup",
      visual: "outro",
      text:
        "Semoga Allah menjadikan kita anak-anak yang sabar, amanah, dan mudah memaafkan. Aamiin. " +
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
