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
];

export const shortIntroId = (short: ShortDef) => `${short.id}-intro`;

export const shortIntroText = (short: ShortDef) => pembuka(short.introTopic) + "Yuk, kita simak!";

export const SHORT_OUTRO_ID = "short-outro";
export const SHORT_OUTRO_TEXT =
  "Jangan lupa follow akun aku ini, dan subscribe juga channel aku, " +
  "serta jangan lupa nonton video full-nya juga, ya. " +
  "Sampai jumpa lagi teman-teman, ilal liqo!";
