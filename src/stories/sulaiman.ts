import type { Story } from "../types";
import { pembuka } from "./common";

// Kisah Nabi Sulaiman 'alaihissalam dan Semut
//
// Pedoman sumber: hanya Al-Qur'an dan hadits shahih.
// - Inti kisah: QS. An-Naml: 15–19 (terjemahan mengikuti Kemenag).
// - HR. Bukhari no. 3019 & Muslim no. 2241: seorang nabi (tidak disebut namanya)
//   ditegur Allah karena membakar sarang semut, "umat yang bertasbih".
// - HR. Abu Dawud no. 5267 (dishahihkan Al-Albani): larangan membunuh semut,
//   lebah, burung hud-hud, dan burung shurad.
// Tidak memakai detail israiliyyat (nama semut, ratu semut, letak lembah,
// percakapan panjang Nabi Sulaiman dengan semut, dll.).
//
// Catatan adab: Nabi Sulaiman, manusia, dan jin tidak digambarkan.
// Pasukan ditampilkan lewat panji-panji, debu, dan kawanan burung.

export const sulaiman: Story = {
  id: "sulaiman",
  title: "Nabi Sulaiman & Semut",
  subtitle: "Raja yang Bersyukur",
  titlePhrase: "Nabi Sulaiman",
  introHook: {
    phrase: "Teman-teman pernah melihat",
    art: "ants",
    cardPhrase: "An-Naml",
    cardTitle: "Surat An-Naml = Semut",
    cardArab: "النَّمْل",
  },
  accent: "#E8853D",
  sources: [
    "QS. An-Naml: 15–19",
    "QS. Shad: 30 (Nabi Sulaiman sebaik-baik hamba)",
    "QS. Al-Isra: 44 (segala sesuatu bertasbih kepada Allah)",
    "HR. Bukhari no. 3019 & Muslim no. 2241: seorang nabi ditegur karena membakar sarang semut",
    "HR. Abu Dawud no. 5267 (dishahihkan Al-Albani): larangan membunuh semut",
  ],
  scenes: [
    {
      id: "01-intro",
      visual: "intro",
      text:
        pembuka("Nabi Sulaiman 'alaihissalam dan seekor semut kecil") +
        "Teman-teman pernah melihat semut berbaris? Semut itu kecil sekali, ya. " +
        "Tapi tahukah kamu, ada seekor semut yang kisahnya diabadikan di dalam Al-Qur'an! " +
        "Bahkan ada surat yang bernama An-Naml, artinya semut. Yuk, kita simak kisahnya!",
      sfx: [
        { sound: "ding", at: 0.3, volume: 0.5 },
        { sound: "sparkle", at: { phrase: "Nabi Sulaiman" }, volume: 0.6 },
      ],
    },
    {
      id: "02-kerajaan",
      visual: "kingdom",
      label: "Raja yang Berilmu",
      sumber: "QS. An-Naml: 15–16 · Shad: 30",
      text:
        "Nabi Sulaiman adalah putra Nabi Dawud 'alaihissalam. " +
        "Allah memberikan kepada keduanya ilmu yang sangat banyak. " +
        "Nabi Sulaiman mewarisi Nabi Dawud, dan menjadi raja yang memimpin kerajaan yang besar. " +
        "Masya Allah, Allah juga mengajarkan kepada Nabi Sulaiman bahasa burung, " +
        "dan memberinya segala sesuatu. " +
        "Tapi Nabi Sulaiman tidak sombong. Beliau berkata, sungguh, semua ini benar-benar karunia yang nyata. " +
        "Nabi Dawud dan Nabi Sulaiman juga berkata, Alhamdulillah, segala puji bagi Allah. " +
        "Di dalam Al-Qur'an, Allah memuji Nabi Sulaiman sebagai sebaik-baik hamba, karena beliau sangat taat dan selalu kembali kepada Allah.",
      shots: [
        { phrase: "Masya Allah, Allah juga", visual: "birds" },
        { phrase: "Tapi Nabi Sulaiman tidak sombong", visual: "kingdom" },
      ],
      sfx: [
        { sound: "angin", at: 0, volume: 0.2, loop: true },
        { sound: "burung", at: { phrase: "bahasa burung" }, volume: 0.6 },
        { sound: "sparkle", at: { phrase: "karunia yang nyata" }, volume: 0.6 },
      ],
    },
    {
      id: "03-pasukan",
      visual: "army",
      label: "Bala Tentara",
      sumber: "QS. An-Naml: 17",
      text:
        "Nabi Sulaiman memiliki bala tentara yang luar biasa. " +
        "Tentaranya bukan hanya manusia, tapi juga jin, dan burung-burung! " +
        "Semuanya dikumpulkan, lalu berbaris dengan sangat tertib dan teratur. " +
        "Suatu hari, Nabi Sulaiman berjalan bersama bala tentaranya. Barisannya panjang sekali!",
      shots: [{ phrase: "Suatu hari", visual: "road" }],
      sfx: [
        { sound: "derap", at: 0, volume: 0.4, loop: true },
        { sound: "pop", at: { phrase: "manusia" }, volume: 0.5 },
        { sound: "pop", at: { phrase: "jin" }, volume: 0.5 },
        { sound: "burung", at: { phrase: "burung-burung" }, volume: 0.5 },
      ],
    },
    {
      id: "04-lembah",
      visual: "ants",
      ants: "busy",
      label: "Lembah Semut",
      sumber: "QS. An-Naml: 18",
      text:
        "Sampailah mereka di sebuah lembah. Lembah itu adalah lembah semut! " +
        "Di sana tinggal banyak sekali semut. " +
        "Ada yang membawa makanan, ada yang berjalan beriringan menuju sarangnya. " +
        "Semut-semut itu bekerja bersama-sama dengan rajin.",
      shots: [{ phrase: "Ada yang membawa", visual: "ants", ants: "closeup" }],
      sfx: [
        { sound: "angin", at: 0, volume: 0.2, loop: true },
        { sound: "burung", at: 1, volume: 0.25 },
      ],
    },
    {
      id: "05-seruan",
      visual: "ants",
      ants: "warning",
      label: "Seruan Seekor Semut",
      sumber: "QS. An-Naml: 18",
      text:
        "Tiba-tiba, seekor semut berseru kepada teman-temannya. " +
        "Wahai semut-semut! Masuklah ke dalam sarang-sarangmu, " +
        "agar kamu tidak diinjak oleh Sulaiman dan bala tentaranya, sedangkan mereka tidak menyadarinya!",
      sfx: [
        { sound: "derap", at: 0, volume: 0.3, loop: true },
        { sound: "pop", at: { phrase: "Wahai semut-semut" }, volume: 0.7 },
      ],
    },
    {
      id: "06-renungan",
      visual: "ants",
      ants: "reflect",
      label: "Semut yang Baik Hati",
      text:
        "Coba perhatikan, teman-teman. " +
        "Semut itu tidak hanya menyelamatkan dirinya sendiri. Ia memperingatkan semua temannya. " +
        "Para ulama tafsir juga menjelaskan, semut itu berbaik sangka. " +
        "Ia berkata, mereka tidak menyadarinya. " +
        "Seolah-olah semut itu yakin, Nabi Sulaiman dan pasukannya tidak mungkin sengaja menginjak semut.",
      points: [
        { icon: "heart", title: "Peduli kepada teman", phrase: "memperingatkan" },
        { icon: "light", title: "Berbaik sangka", phrase: "berbaik sangka" },
      ],
      shots: [{ phrase: "Seolah-olah", visual: "ants", ants: "nest" }],
      sfx: [
        { sound: "ding", at: { phrase: "memperingatkan" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "berbaik sangka" }, volume: 0.6 },
      ],
    },
    {
      id: "07-tersenyum",
      visual: "ants",
      ants: "safe",
      label: "Nabi Sulaiman Tersenyum",
      sumber: "QS. An-Naml: 19",
      text:
        "Dengan izin Allah, Nabi Sulaiman mendengar perkataan semut itu. " +
        "Maka Nabi Sulaiman tersenyum, lalu tertawa karena mendengar perkataan semut itu. " +
        "Nabi Sulaiman adalah raja yang hebat, tapi beliau tidak meremehkan semut kecil. " +
        "Beliau justru teringat akan nikmat Allah yang begitu banyak. Lalu Nabi Sulaiman berdoa.",
      shots: [{ phrase: "Beliau justru teringat", visual: "garden" }],
      sfx: [
        { sound: "sparkle", at: { phrase: "tersenyum" }, volume: 0.6 },
        { sound: "angin", at: 0, volume: 0.2, loop: true },
      ],
    },
    {
      id: "08-doa",
      visual: "doa",
      label: "Doa Nabi Sulaiman",
      text:
        "Rabbi auzi'nii an asykura ni'matakallatii an'amta 'alayya wa 'alaa waalidayya, " +
        "wa an a'mala shaalihan tardhaahu, wa adkhilnii birahmatika fii 'ibaadikash shaalihiin. " +
        "Artinya: Ya Tuhanku, anugerahkanlah aku ilham untuk tetap mensyukuri nikmat-Mu, " +
        "yang telah Engkau anugerahkan kepadaku dan kepada kedua orang tuaku, " +
        "dan agar aku mengerjakan kebajikan yang Engkau ridhai. " +
        "Dan masukkanlah aku dengan rahmat-Mu, ke dalam golongan hamba-hamba-Mu yang saleh. " +
        "Masya Allah, walaupun punya kerajaan yang besar, Nabi Sulaiman tetap rendah hati dan bersyukur.",
      doa: {
        arab: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ",
        latin:
          "Rabbi auzi'nii an asykura ni'matakallatii an'amta 'alayya wa 'alaa waalidayya wa an a'mala shaalihan tardhaahu wa adkhilnii birahmatika fii 'ibaadikash-shaalihiin",
        arti:
          "Ya Tuhanku, anugerahkanlah aku ilham untuk tetap mensyukuri nikmat-Mu yang telah Engkau anugerahkan kepadaku dan kepada kedua orang tuaku, dan agar aku mengerjakan kebajikan yang Engkau ridhai; dan masukkanlah aku dengan rahmat-Mu ke dalam golongan hamba-hamba-Mu yang saleh.",
        sumber: "QS. An-Naml: 19",
        glowPhrase: "Masya Allah",
      },
      sfx: [{ sound: "sparkle", at: { phrase: "Masya Allah" }, volume: 0.7 }],
    },
    {
      id: "09-hadits",
      visual: "book",
      card: { title: "Hadits Rasulullah", subtitle: "HR. Bukhari no. 3019 & Muslim no. 2241" },
      ants: "tasbih",
      label: "Semut pun Bertasbih",
      sumber: "HR. Bukhari 3019 & Muslim 2241 · QS. Al-Isra: 44",
      text:
        "Teman-teman, semut juga disebut dalam hadits Rasulullah shallallahu 'alaihi wa sallam. " +
        "Rasulullah bercerita, ada seorang nabi dari nabi-nabi terdahulu yang digigit seekor semut. " +
        "Lalu nabi itu memerintahkan agar sarang semut itu dibakar. " +
        "Maka Allah menegurnya: Apakah karena seekor semut menggigitmu, engkau membinasakan satu umat yang bertasbih? " +
        "Masya Allah, ternyata semut-semut itu juga bertasbih, memuji Allah. " +
        "Allah berfirman di dalam Al-Qur'an, tidak ada sesuatu pun, melainkan bertasbih dengan memuji-Nya, " +
        "tetapi kita tidak mengerti tasbih mereka.",
      shots: [
        { phrase: "Rasulullah bercerita", visual: "ants", ants: "tasbih" },
        {
          phrase: "Allah berfirman",
          visual: "tasbihWorld",
          card: {
            title:
              "“Tidak ada sesuatu pun melainkan bertasbih dengan memuji-Nya, tetapi kamu tidak mengerti tasbih mereka.”",
            subtitle: "QS. Al-Isra: 44",
          },
        },
      ],
      sfx: [
        { sound: "dung", at: { phrase: "Maka Allah menegurnya" }, volume: 0.5 },
        { sound: "sparkle", at: { phrase: "juga bertasbih" }, volume: 0.6 },
      ],
    },
    {
      id: "10-hikmah",
      visual: "hikmah",
      sumber: "HR. Abu Dawud no. 5267, shahih",
      text:
        "Nah, teman-teman, apa saja hikmah dari kisah Nabi Sulaiman dan semut? " +
        "Pertama, peduli kepada teman. Semut itu tidak memikirkan dirinya sendiri, tapi menyelamatkan teman-temannya. " +
        "Kalau ada teman yang butuh bantuan, yuk kita tolong! " +
        "Kedua, berbaik sangka kepada orang lain, seperti semut yang berkata, mereka tidak menyadarinya. " +
        "Kalau ada teman yang tidak sengaja menyenggol kita, jangan langsung marah, ya. Mungkin dia tidak sengaja. " +
        "Ketiga, selalu bersyukur dan rendah hati. Nabi Sulaiman punya segalanya, tapi tetap berdoa agar pandai bersyukur. " +
        "Beliau juga mendoakan kedua orang tuanya. " +
        "Dan keempat, sayangi hewan, walaupun kecil. " +
        "Rasulullah shallallahu 'alaihi wa sallam melarang membunuh semut, lebah, burung hud-hud, dan burung shurad.",
      hikmah: [
        { icon: "heart", title: "Peduli kepada teman", phrase: "Pertama" },
        { icon: "light", title: "Berbaik sangka kepada orang lain", phrase: "Kedua" },
        { icon: "hands", title: "Bersyukur & rendah hati", phrase: "Ketiga" },
        { icon: "sprout", title: "Sayangi hewan, walaupun kecil", phrase: "keempat" },
      ],
      sfx: [
        { sound: "ding", at: { phrase: "Pertama" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Kedua" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Ketiga" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "keempat" }, volume: 0.6 },
      ],
    },
    {
      id: "11-tebak",
      visual: "quiz",
      label: "Ayo Tebak!",
      text:
        "Sekarang, ayo kita main tebak-tebakan! " +
        "Surat di dalam Al-Qur'an yang artinya semut, namanya surat apa, ya? " +
        "Apakah surat Al-Fil, surat An-Naml, atau surat An-Nahl? " +
        "Coba tebak dulu, teman-teman... " +
        "Jawabannya adalah, surat An-Naml! Hebat! " +
        "Surat Al-Fil artinya gajah, dan surat An-Nahl artinya lebah. " +
        "Masya Allah, banyak hewan yang disebut di dalam Al-Qur'an, ya!",
      quiz: {
        question: "Surat yang artinya semut?",
        options: ["Al-Fil", "An-Naml", "An-Nahl"],
        answer: 1,
        revealPhrase: "Jawabannya adalah",
      },
      sfx: [
        { sound: "pop", at: { phrase: "Al-Fil" }, volume: 0.5 },
        { sound: "pop", at: { phrase: "An-Naml" }, volume: 0.5 },
        { sound: "pop", at: { phrase: "An-Nahl" }, volume: 0.5 },
        { sound: "yay", at: { phrase: "Hebat" }, volume: 0.5 },
      ],
    },
    {
      id: "12-penutup",
      visual: "outro",
      text:
        "Yuk, kita hafalkan doa Nabi Sulaiman, supaya kita menjadi anak yang pandai bersyukur. " +
        "Nanti, kalau teman-teman melihat semut, ingatlah: semut juga bertasbih kepada Allah. " +
        "Jangan lupa, sayangi teman, dan sayangi hewan-hewan di sekitar kita, ya! " +
        "Semoga kita menjadi anak yang peduli, berbaik sangka, dan pandai bersyukur. Aamiin. " +
        "Sampai jumpa di kisah nabi berikutnya, bersama Ghu! " +
        "Wassalamu'alaikum warahmatullahi wabarakatuh!",
      sfx: [
        { sound: "sparkle", at: { phrase: "Aamiin" }, volume: 0.6 },
        { sound: "ding", at: { phrase: "Sampai jumpa" }, volume: 0.5 },
      ],
    },
  ],
};
