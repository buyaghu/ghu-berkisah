// Menyimpan naskah setiap kisah ke naskah/<story>.md
// Berguna untuk latihan bercerita (mis. untuk lomba) tanpa membuka kode.

import { mkdirSync, writeFileSync } from "node:fs";
import { stories } from "../src/stories";
import { estimateDuration } from "../src/lib/text";

mkdirSync("naskah", { recursive: true });
for (const story of stories) {
  const words = story.scenes.reduce((s, sc) => s + sc.text.split(/\s+/).length, 0);
  const minutes = story.scenes.reduce((s, sc) => s + estimateDuration(sc.text), 0) / 60;
  let md = `# ${story.title}\n_${story.subtitle}_\n\n`;
  md += `> ${words} kata · perkiraan ${minutes.toFixed(1)} menit (tempo bercerita anak)\n\n`;
  md += `**Sumber:**\n${story.sources.map((src) => `- ${src}`).join("\n")}\n\n`;
  for (const scene of story.scenes) {
    md += `## ${scene.label ?? (scene.visual === "hikmah" ? "Hikmah Kisah" : scene.visual === "intro" ? "Pembukaan" : "Penutup")}\n\n`;
    if (scene.sumber) md += `_Dalil: ${scene.sumber}_\n\n`;
    md += `${scene.text}\n\n`;
    if (scene.doa) {
      md += `> **${scene.doa.arab}**\n>\n> _${scene.doa.latin}_\n>\n> “${scene.doa.arti}” (${scene.doa.sumber})\n\n`;
    }
    if (scene.hikmah) {
      md += scene.hikmah.map((h, i) => `${i + 1}. **${h.title}**`).join("\n") + "\n\n";
    }
  }
  writeFileSync(`naskah/${story.id}.md`, md);
  console.log(`naskah/${story.id}.md — ${words} kata, ±${minutes.toFixed(1)} menit`);
}
