import { staticFile } from "remotion";
import { FPS, LEAD_IN, TAIL, TRANSITION_FRAMES } from "../theme";
import type { Story, VoiceoverManifest } from "../types";
import { estimateVoice, type SceneVoice } from "./voice";

export type EpisodeData = {
  voices: Record<string, SceneVoice>;
  sceneFrames: Record<string, number>;
  availableSfx: string[];
};

const fetchJson = async <T,>(path: string): Promise<T | null> => {
  try {
    const res = await fetch(staticFile(path));
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
};

// Membaca hasil generate VO & SFX. Kalau belum ada, durasi diperkirakan
// dari panjang naskah sehingga video tetap bisa dipreview tanpa suara.
export const loadEpisodeData = async (story: Story): Promise<EpisodeData> => {
  const manifest = await fetchJson<VoiceoverManifest>(
    `voiceover/${story.id}/manifest.json`,
  );
  const sfx = await fetchJson<{ sounds: string[] }>("sfx/manifest.json");

  const voices: Record<string, SceneVoice> = {};
  const sceneFrames: Record<string, number> = {};
  for (const scene of story.scenes) {
    const clip = manifest?.clips[scene.id];
    voices[scene.id] = clip
      ? {
          text: scene.text,
          duration: clip.duration,
          words: clip.words,
          audioFile: clip.file,
        }
      : estimateVoice(scene.text);
    sceneFrames[scene.id] = Math.ceil(
      (LEAD_IN + voices[scene.id].duration + TAIL) * FPS,
    );
  }
  return { voices, sceneFrames, availableSfx: sfx?.sounds ?? [] };
};

export const totalFrames = (story: Story, data: EpisodeData) =>
  story.scenes.reduce((sum, s) => sum + data.sceneFrames[s.id], 0) -
  TRANSITION_FRAMES * (story.scenes.length - 1);

// VO tambahan di luar naskah kisah (mis. pembuka & penutup Shorts) dari manifest lain
export const loadExtraVoices = async (
  manifestPath: string,
  items: { id: string; text: string }[],
): Promise<Pick<EpisodeData, "voices" | "sceneFrames">> => {
  const manifest = await fetchJson<VoiceoverManifest>(manifestPath);
  const voices: Record<string, SceneVoice> = {};
  const sceneFrames: Record<string, number> = {};
  for (const { id, text } of items) {
    const clip = manifest?.clips[id];
    voices[id] = clip
      ? { text, duration: clip.duration, words: clip.words, audioFile: clip.file }
      : estimateVoice(text);
    sceneFrames[id] = Math.ceil((LEAD_IN + voices[id].duration + TAIL) * FPS);
  }
  return { voices, sceneFrames };
};
