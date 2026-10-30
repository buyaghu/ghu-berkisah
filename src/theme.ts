import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Font disimpan di public/fonts (lisensi SIL Open Font License),
// supaya render tetap jalan tanpa internet.
export const titleFont = "Fredoka";
export const bodyFont = "Nunito";
export const arabicFont = "Amiri";

loadFont({ family: titleFont, url: staticFile("fonts/Fredoka.woff2"), weight: "300 700" });
loadFont({ family: bodyFont, url: staticFile("fonts/Nunito.woff2"), weight: "200 1000" });
loadFont({ family: arabicFont, url: staticFile("fonts/Amiri-Arabic.woff2"), weight: "400" });

export const colors = {
  ink: "#2E2A47",
  cream: "#FFF8EC",
  pink: "#FF8FB1",
  pinkSoft: "#FFD3E1",
  // Pakaian Ghu (sesuai foto): khimar & baju putih, rok & lengan marun
  khimar: "#FFFFFF",
  khimarShade: "#E4EAF3",
  khimarLine: "#C3CEDF",
  maroon: "#7B2236",
  maroonDark: "#5E1828",
  hijab: "#F7A1C4",
  hijabDark: "#E07BA6",
  skin: "#FFD9BF",
  cheek: "#FFAFA8",
  sky: "#9ED9F5",
  skyDeep: "#5BB8E8",
  sea: "#2BA6C9",
  seaDeep: "#0F5E86",
  sand: "#F6D79B",
  leaf: "#6CC56F",
  leafDark: "#3E9E52",
  gold: "#FFC94A",
  lavender: "#B9A7F5",
  night: "#1B1F4A",
  white: "#FFFFFF",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
// Jeda sebelum & sesudah VO di setiap scene (detik)
export const LEAD_IN = 0.5;
export const TAIL = 1.2;
// Panjang transisi antar-scene (frame) — harus lebih pendek dari TAIL
export const TRANSITION_FRAMES = 18;
