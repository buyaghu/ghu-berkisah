import { existsSync, readFileSync } from "node:fs";

// Baca file .env sederhana (KEY=VALUE) tanpa dependensi tambahan
export const loadEnv = () => {
  if (!existsSync(".env")) return;
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
};

export const requireApiKey = () => {
  loadEnv();
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    console.error(
      "ELEVENLABS_API_KEY belum diisi. Salin .env.example menjadi .env lalu isi API key ElevenLabs.",
    );
    process.exit(1);
  }
  return key;
};

export const argValue = (name: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
};
