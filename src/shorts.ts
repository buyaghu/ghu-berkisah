// Potongan video vertikal (YouTube Shorts / Instagram Reels) dari video panjang.
// Memakai VO & adegan yang sama, ditambah VO pembuka (per Shorts) dan VO penutup (dipakai bersama).
import { pembuka } from "./stories/common";

export type ShortDef = {
  id: string;
  storyId: string;
  title: string;
  // Ilustrasi di layar judul
  art: "ants" | "doa";
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
];

export const shortIntroId = (short: ShortDef) => `${short.id}-intro`;

export const shortIntroText = (short: ShortDef) => pembuka(short.introTopic) + "Yuk, kita simak!";

export const SHORT_OUTRO_ID = "short-outro";
export const SHORT_OUTRO_TEXT =
  "Jangan lupa follow akun aku ini, dan subscribe juga channel aku, " +
  "serta jangan lupa nonton video full-nya juga, ya. " +
  "Sampai jumpa lagi teman-teman, ilal liqo!";
