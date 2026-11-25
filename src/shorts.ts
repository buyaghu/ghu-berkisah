// Potongan video vertikal (YouTube Shorts / Instagram Reels) dari video panjang.
// Memakai VO & adegan yang sama, ditambah VO pembuka (per Shorts) dan VO penutup (dipakai bersama).
import { pembuka } from "./stories/common";

export type ShortDef = {
  id: string;
  storyId: string;
  title: string;
  // Ilustrasi di layar judul
  art: "ants" | "doa" | "stars";
  // Melengkapi kalimat pembuka: "Kali ini, saya ingin berkisah tentang …"
  introTopic: string;
  sceneIds: string[];
};

export const shorts: ShortDef[] = [
  {
    id: "Short-sulaiman-1-semut-peduli",
    storyId: "sulaiman",
    title: "Semut yang Peduli Teman",
    art: "ants",
    introTopic: "seekor semut kecil yang sangat peduli kepada teman-temannya, dari kisah Nabi Sulaiman 'alaihissalam",
    sceneIds: ["05-seruan", "06-renungan"],
  },
  {
    id: "Short-sulaiman-2-doa",
    storyId: "sulaiman",
    title: "Doa Nabi Sulaiman",
    art: "doa",
    introTopic: "doa Nabi Sulaiman 'alaihissalam, doa agar kita pandai bersyukur",
    sceneIds: ["07-tersenyum", "08-doa"],
  },
  {
    id: "Short-yunus-1-kegelapan",
    storyId: "yunus",
    title: "Berdoa di Dalam Kegelapan",
    art: "doa",
    introTopic: "Nabi Yunus 'alaihissalam yang berdoa di dalam kegelapan",
    sceneIds: ["07-ditelan", "08-gelap"],
  },
  {
    id: "Short-yunus-2-doa",
    storyId: "yunus",
    title: "Doa Nabi Yunus",
    art: "doa",
    introTopic: "doa Nabi Yunus 'alaihissalam, doa saat kita sedih dan sedang kesulitan",
    sceneIds: ["09-doa", "10-pantai"],
  },
  {
    id: "Short-nuh-1-kapal",
    storyId: "nuh",
    title: "Nabi Nuh Membuat Kapal",
    art: "doa",
    introTopic: "Nabi Nuh 'alaihissalam yang sabar membuat kapal besar, walaupun diejek kaumnya",
    sceneIds: ["03-perintah", "04-ejekan"],
  },
  {
    id: "Short-nuh-2-doa",
    storyId: "nuh",
    title: "Doa Nabi Nuh Saat Berlayar",
    art: "doa",
    introTopic: "doa Nabi Nuh 'alaihissalam saat berlayar, doa agar perjalanan kita diberkahi",
    sceneIds: ["07-doa", "08-surut"],
  },
  {
    id: "Short-ibrahim-api-1-api-dingin",
    storyId: "ibrahim-api",
    title: "Api yang Menjadi Dingin",
    art: "doa",
    introTopic: "api besar yang menjadi dingin, dari kisah Nabi Ibrahim 'alaihissalam",
    sceneIds: ["08-api", "10-dingin"],
  },
  {
    id: "Short-ibrahim-api-2-tawakal",
    storyId: "ibrahim-api",
    title: "Kalimat Tawakal",
    art: "doa",
    introTopic: "kalimat tawakal Nabi Ibrahim 'alaihissalam, yang bisa kita ucapkan saat merasa takut",
    sceneIds: ["09-doa", "11-selamat"],
  },
  {
    id: "Short-ibrahim-ismail-1-anak-sabar",
    storyId: "ibrahim-ismail",
    title: "Anak yang Sabar & Taat",
    art: "doa",
    introTopic: "Nabi Ismail 'alaihissalam, anak yang sangat sabar dan taat kepada Allah",
    sceneIds: ["06-tanya", "07-jawab"],
  },
  {
    id: "Short-ibrahim-ismail-2-doa",
    storyId: "ibrahim-ismail",
    title: "Doa Minta Anak Saleh",
    art: "doa",
    introTopic: "doa Nabi Ibrahim 'alaihissalam, doa agar kita menjadi anak yang saleh",
    sceneIds: ["03-doa", "04-kabar"],
  },
  {
    id: "Short-musa-laut-1-laut-terbelah",
    storyId: "musa-laut",
    title: "Laut yang Terbelah",
    art: "doa",
    introTopic: "laut yang terbelah menjadi jalan, dari kisah Nabi Musa 'alaihissalam",
    sceneIds: ["08-tepi", "09-tongkat", "10-jalan"],
  },
  {
    id: "Short-musa-laut-2-doa",
    storyId: "musa-laut",
    title: "Doa Nabi Musa",
    art: "doa",
    introTopic: "doa Nabi Musa 'alaihissalam, doa saat kita akan belajar, atau menghadapi hal yang sulit",
    sceneIds: ["03-diutus", "04-doa"],
  },
  {
    id: "Short-musa-khidir-1-ikan",
    storyId: "musa-khidir",
    title: "Ikan yang Menjadi Tanda",
    art: "doa",
    introTopic: "seekor ikan yang menjadi tanda, dari kisah Nabi Musa 'alaihissalam dan Khidir",
    sceneIds: ["04-ikan", "05-kembali"],
  },
  {
    id: "Short-musa-khidir-2-doa",
    storyId: "musa-khidir",
    title: "Doa Agar Ilmu Bertambah",
    art: "doa",
    introTopic: "doa agar ilmu kita bertambah, dari kisah Nabi Musa 'alaihissalam yang semangat menuntut ilmu",
    sceneIds: ["07-perahu", "13-doa"],
  },
  {
    id: "Short-yusuf-1-mimpi",
    storyId: "yusuf",
    title: "Mimpi Sebelas Bintang",
    art: "stars",
    introTopic: "mimpi Nabi Yusuf 'alaihissalam, sebelas bintang yang akhirnya menjadi nyata",
    sceneIds: ["02-mimpi", "11-terwujud"],
  },
  {
    id: "Short-yusuf-2-doa",
    storyId: "yusuf",
    title: "Memaafkan & Doa Nabi Yusuf",
    art: "doa",
    introTopic: "Nabi Yusuf 'alaihissalam yang memaafkan saudara-saudaranya, dan doa beliau di dalam Al-Qur'an",
    sceneIds: ["10-maaf", "12-doa"],
  },
];

export const shortIntroId = (short: ShortDef) => `${short.id}-intro`;

export const shortIntroText = (short: ShortDef) => pembuka(short.introTopic) + "Yuk, kita simak!";

export const SHORT_OUTRO_ID = "short-outro";
export const SHORT_OUTRO_TEXT =
  "Jangan lupa follow akun aku ini, dan subscribe juga channel aku, " +
  "serta jangan lupa nonton video full-nya juga, ya. " +
  "Sampai jumpa lagi teman-teman, ilal liqo!";
