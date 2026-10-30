// Membuat VO suara Ghu untuk setiap scene memakai ElevenLabs.
//
//   npm run voiceover                     -> semua kisah
//   npm run voiceover -- --story yunus    -> satu kisah
//   npm run voiceover -- --scene 03-pergi -> satu scene saja
//   npm run voiceover -- --force          -> buat ulang semua
//
// Scene yang naskahnya tidak berubah dilewati (hemat kredit ElevenLabs).
// Hasil: public/voiceover/<story>/<scene>.mp3 + manifest.json (durasi & waktu tiap kata).

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { stories } from "../src/stories";
import { hashText, splitWords } from "../src/lib/text";
import type { VoiceoverManifest, WordTiming } from "../src/types";
import { argValue, requireApiKey } from "./env";

// Suara "Ghu" (cloned voice di akun ElevenLabs)
const DEFAULT_VOICE_ID = "ucmsMSAaGjMUJ5LRZJIt";

const apiKey = requireApiKey();
const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
const modelId = process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";
const onlyStory = argValue("story");
const onlyScene = argValue("scene");
const force = process.argv.includes("--force");

type Alignment = {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
};

const alignmentToWords = (text: string, a: Alignment): WordTiming[] => {
  const words: WordTiming[] = [];
  let current = "";
  let start = 0;
  let end = 0;
  a.characters.forEach((ch, i) => {
    if (/\s/.test(ch)) {
      if (current) words.push({ text: current, start, end });
      current = "";
      return;
    }
    if (!current) start = a.character_start_times_seconds[i];
    current += ch;
    end = a.character_end_times_seconds[i];
  });
  if (current) words.push({ text: current, start, end });

  // Pastikan jumlah kata sama dengan naskah (dipakai untuk subtitle & cue)
  const expected = splitWords(text);
  if (words.length !== expected.length) {
    console.warn(`  ! jumlah kata berbeda (${words.length} vs ${expected.length}), disesuaikan`);
    const last = words[words.length - 1]?.end ?? 1;
    return expected.map((w, i) => ({
      text: w,
      start: (i / expected.length) * last,
      end: ((i + 1) / expected.length) * last,
    }));
  }
  return expected.map((w, i) => ({ ...words[i], text: w }));
};

const probeDuration = (file: string, fallback: number) => {
  try {
    const out = execFileSync(
      "npx",
      ["remotion", "ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file],
      { encoding: "utf8" },
    );
    const d = parseFloat(out.trim());
    return Number.isFinite(d) ? d : fallback;
  } catch {
    return fallback;
  }
};

const run = async () => {
  for (const story of stories) {
    if (onlyStory && story.id !== onlyStory) continue;
    const dir = `public/voiceover/${story.id}`;
    mkdirSync(dir, { recursive: true });
    const manifestPath = `${dir}/manifest.json`;
    const manifest: VoiceoverManifest = existsSync(manifestPath)
      ? JSON.parse(readFileSync(manifestPath, "utf8"))
      : { voiceId, clips: {} };
    manifest.voiceId = voiceId;

    console.log(`\n📖 ${story.title}`);
    for (const [i, scene] of story.scenes.entries()) {
      if (onlyScene && scene.id !== onlyScene) continue;
      const file = `voiceover/${story.id}/${scene.id}.mp3`;
      const hash = hashText(scene.text);
      const existing = manifest.clips[scene.id];
      if (!force && !onlyScene && existing?.textHash === hash && existsSync(`public/${file}`)) {
        console.log(`  ✓ ${scene.id} (tidak berubah)`);
        continue;
      }
      console.log(`  🎙  ${scene.id} ...`);
      const res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`,
        {
          method: "POST",
          headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
          body: JSON.stringify({
            text: scene.text,
            model_id: modelId,
            language_code: "id",
            // Konteks kalimat sebelum/sesudah agar intonasi antar-scene nyambung
            previous_text: story.scenes[i - 1]?.text,
            next_text: story.scenes[i + 1]?.text,
            voice_settings: {
              stability: 0.45,
              similarity_boost: 0.85,
              style: 0.35,
              use_speaker_boost: true,
              speed: 0.95,
            },
          }),
        },
      );
      if (!res.ok) {
        console.error(`  ✗ Gagal (${res.status}): ${await res.text()}`);
        process.exit(1);
      }
      const json = (await res.json()) as { audio_base64: string; alignment: Alignment };
      writeFileSync(`public/${file}`, Buffer.from(json.audio_base64, "base64"));
      const words = alignmentToWords(scene.text, json.alignment);
      const duration = probeDuration(`public/${file}`, (words[words.length - 1]?.end ?? 0) + 0.3);
      manifest.clips[scene.id] = { file, duration, textHash: hash, words };
      writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      console.log(`     ${duration.toFixed(1)} detik`);
    }
    const total = Object.values(manifest.clips).reduce((s, c) => s + c.duration, 0);
    console.log(`  Total VO: ${(total / 60).toFixed(1)} menit`);
  }
};

run();
