import React, { createContext, useContext } from "react";
import { useVideoConfig } from "remotion";
import type { WordTiming } from "../types";
import { LEAD_IN } from "../theme";
import { estimateDuration, splitWords } from "./text";

export type SceneVoice = {
  text: string;
  duration: number; // durasi VO (detik)
  words: WordTiming[];
  audioFile: string | null; // null = VO belum dibuat
};

// Bila VO belum ada, sebar kata secara merata sesuai panjang hurufnya
export const estimateVoice = (text: string): SceneVoice => {
  const duration = estimateDuration(text);
  const words = splitWords(text);
  const total = words.reduce((s, w) => s + w.length + 1, 0);
  let t = 0;
  return {
    text,
    duration,
    audioFile: null,
    words: words.map((w) => {
      const d = ((w.length + 1) / total) * duration;
      const timing = { text: w, start: t, end: t + d };
      t += d;
      return timing;
    }),
  };
};

const VoiceContext = createContext<SceneVoice>(estimateVoice("..."));

export const VoiceProvider: React.FC<{
  voice: SceneVoice;
  children: React.ReactNode;
}> = ({ voice, children }) => (
  <VoiceContext.Provider value={voice}>{children}</VoiceContext.Provider>
);

export const useVoice = () => useContext(VoiceContext);

// Detik (relatif terhadap awal VO) saat sebuah frasa mulai diucapkan
export const phraseSeconds = (voice: SceneVoice, phrase: string) => {
  const idx = voice.text.indexOf(phrase);
  if (idx < 0) {
    throw new Error(`Frasa "${phrase}" tidak ditemukan di naskah scene`);
  }
  const wordIndex = splitWords(voice.text.slice(0, idx + 1)).length - 1;
  return voice.words[Math.min(wordIndex, voice.words.length - 1)]?.start ?? 0;
};

// Frame (relatif terhadap awal scene) saat frasa diucapkan
export const usePhraseFrame = (phrase: string) => {
  const voice = useVoice();
  const { fps } = useVideoConfig();
  return Math.round((LEAD_IN + phraseSeconds(voice, phrase)) * fps);
};

// Apakah Ghu sedang mengucapkan sebuah kata pada detik t (untuk gerak mulut)
export const isSpeakingAt = (voice: SceneVoice, t: number) =>
  voice.words.some((w) => t >= w.start && t <= w.end - 0.03);

// Seperti usePhraseFrame, tapi bila frasa tidak ada di naskah (adegan dipakai sebagai shot
// di scene lain) hasilnya `fallback`.
export const usePhraseFrameOr = (phrase: string, fallback = 0) => {
  const voice = useVoice();
  const { fps } = useVideoConfig();
  if (voice.text.indexOf(phrase) < 0) return fallback;
  return Math.round((LEAD_IN + phraseSeconds(voice, phrase)) * fps);
};
