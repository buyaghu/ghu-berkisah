// Membuat efek suara (SFX) dengan ElevenLabs Sound Effects.
//
//   npm run sfx            -> buat SFX yang belum ada
//   npm run sfx -- --force -> buat ulang semua
//
// Hasil: public/sfx/<nama>.mp3 + public/sfx/manifest.json
// Nama SFX dipakai di naskah (src/stories/*.ts) pada bagian `sfx`.

import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { requireApiKey } from "./env";

const SOUNDS: Record<string, { prompt: string; seconds: number; loop?: boolean }> = {
  ding: { prompt: "soft magical chime ding, cute, children's cartoon", seconds: 1.5 },
  sparkle: { prompt: "gentle magical sparkle twinkle shimmer, cartoon", seconds: 2 },
  pop: { prompt: "cartoon pop reveal sound, playful", seconds: 1 },
  yay: { prompt: "small group of children cheering happily, short", seconds: 2.5 },
  angin: { prompt: "soft desert breeze ambience, calm, no music", seconds: 10, loop: true },
  burung: { prompt: "small birds chirping in the morning, calm", seconds: 4 },
  langkah: { prompt: "slow footsteps walking on sand and dirt path", seconds: 5 },
  ombak: { prompt: "calm ocean waves gently lapping, seaside ambience", seconds: 10, loop: true },
  camar: { prompt: "seagulls calling over the sea", seconds: 4 },
  badai: { prompt: "heavy storm at sea, strong wind and rain, waves crashing on wooden ship", seconds: 10, loop: true },
  petir: { prompt: "loud thunder crack and rumble", seconds: 4 },
  splash: { prompt: "big water splash, something falling into the sea", seconds: 2 },
  "bawah-air": { prompt: "deep underwater ambience, muffled, bubbles, calm", seconds: 10, loop: true },
  paus: { prompt: "whale song call underwater, gentle and deep", seconds: 4 },
  gulp: { prompt: "big cartoon gulp swallow sound, underwater", seconds: 1.5 },
  dung: { prompt: "deep soft cinematic boom, dark mysterious, subtle", seconds: 2.5 },
  derap: { prompt: "large orderly army marching in the distance, many footsteps, soft rumble, no voices", seconds: 10, loop: true },
  tumbuh: { prompt: "magical plant growing sound, soft rustling leaves with sparkles", seconds: 3 },
};

const apiKey = requireApiKey();
const force = process.argv.includes("--force");
const dir = "public/sfx";
mkdirSync(dir, { recursive: true });

const run = async () => {
  for (const [name, s] of Object.entries(SOUNDS)) {
    const file = `${dir}/${name}.mp3`;
    if (!force && existsSync(file)) {
      console.log(`✓ ${name} (sudah ada)`);
      continue;
    }
    console.log(`🔊 ${name} ...`);
    const res = await fetch("https://api.elevenlabs.io/v1/sound-generation", {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        text: s.prompt,
        duration_seconds: s.seconds,
        prompt_influence: 0.5,
        loop: s.loop ?? false,
      }),
    });
    if (!res.ok) {
      console.error(`✗ ${name} gagal (${res.status}): ${await res.text()}`);
      continue;
    }
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  // Manifest = semua mp3 yang ada (termasuk SFX buatan sendiri)
  const sounds = readdirSync(dir)
    .filter((f) => f.endsWith(".mp3"))
    .map((f) => f.replace(/\.mp3$/, ""));
  writeFileSync(`${dir}/manifest.json`, JSON.stringify({ sounds }, null, 2));
  console.log(`\nSFX tersedia: ${sounds.join(", ")}`);
};

run();
