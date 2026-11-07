// Tipe data untuk satu episode "Kisah Nabi bersama Ghu".
// Satu episode = beberapa scene. Setiap scene punya satu klip VO (suara Ghu)
// dan satu jenis visual (lihat src/scenes/index.ts).

export type SfxCue = {
  // Nama file di public/sfx tanpa ekstensi, mis. "whoosh", "ombak"
  sound: string;
  // Kapan SFX dimainkan: detik dari awal scene, atau frasa di naskah
  // (SFX diputar tepat saat Ghu mengucapkan frasa itu).
  at: number | { phrase: string };
  volume?: number;
  loop?: boolean;
};

export type HikmahIcon = "sprout" | "hands" | "light" | "heart" | "star";

export type HikmahItem = {
  icon: HikmahIcon;
  title: string;
  // Frasa di naskah VO saat kartu ini muncul
  phrase: string;
};

export type Scene = {
  id: string;
  visual: VisualKey;
  // Naskah yang dibacakan Ghu (dikirim ke ElevenLabs)
  text: string;
  // Judul kecil di pojok layar (opsional)
  label?: string;
  sfx?: SfxCue[];
  // Khusus scene hikmah
  hikmah?: HikmahItem[];
  // Dalil scene ini, tampil di pojok kanan atas, mis. "QS. An-Naml: 18"
  sumber?: string;
  // Khusus scene doa. glowPhrase = frasa saat layar berubah terang.
  doa?: {
    arab: string;
    latin: string;
    arti: string;
    sumber: string;
    glowPhrase: string;
  };
  // Khusus scene tebak-tebakan
  quiz?: {
    question: string;
    options: string[]; // teks pilihan, harus muncul di naskah (untuk cue)
    answer: number; // index jawaban benar
    revealPhrase: string; // frasa saat jawaban diumumkan
  };
  // Khusus scene semut
  ants?: AntMode;
  // Poin renungan yang muncul di samping visual (format sama dengan hikmah)
  points?: HikmahItem[];
  // Kartu teks untuk visual "book" / "tasbihWorld"
  card?: ShotCard;
  // Pergantian adegan di dalam satu narasi: saat `phrase` diucapkan,
  // latar berganti ke `visual` lain (suara tetap satu klip)
  shots?: Shot[];
};

export type ShotCard = { title: string; subtitle?: string };

export type Shot = {
  phrase: string;
  visual: VisualKey;
  ants?: AntMode;
  card?: ShotCard;
};

export type AntMode = "busy" | "warning" | "reflect" | "safe" | "tasbih" | "closeup" | "nest";

export type Story = {
  id: string;
  title: string;
  subtitle: string;
  // Frasa di naskah intro saat judul episode muncul
  titlePhrase: string;
  // Bagian kedua pembuka: saat `phrase` diucapkan, judul hilang, Ghu pindah ke kanan,
  // lalu ilustrasi (`art`) dan kartu muncul di kiri
  introHook?: {
    phrase: string;
    art: "ants" | "fish" | "ark";
    cardPhrase: string;
    cardTitle: string;
    cardArab?: string;
  };
  // Dalil utama kisah (Al-Qur'an & hadits shahih), untuk naskah & deskripsi YouTube
  sources: string[];
  // Warna aksen episode
  accent: string;
  scenes: Scene[];
};

export type VisualKey =
  | "intro"
  | "kingdom"
  | "birds"
  | "road"
  | "garden"
  | "book"
  | "tasbihWorld"
  | "army"
  | "ants"
  | "city"
  | "leaving"
  | "ship"
  | "storm"
  | "lots"
  | "swallow"
  | "darkness"
  | "doa"
  | "shore"
  | "arkBuild"
  | "flood"
  | "judi"
  | "return"
  | "hikmah"
  | "quiz"
  | "outro";

// Hasil scripts/generate-voiceover.ts -> public/voiceover/<storyId>/manifest.json
export type WordTiming = { text: string; start: number; end: number };

export type VoiceoverClip = {
  file: string; // relatif ke public/
  duration: number; // detik
  textHash: string;
  words: WordTiming[];
};

export type VoiceoverManifest = {
  voiceId: string;
  clips: Record<string, VoiceoverClip>;
};
