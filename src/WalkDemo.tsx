import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { GhuWalker } from "./components/Ghu";
import { IslamicPattern } from "./components/nature";
import { bodyFont, colors, titleFont } from "./theme";

// Demo gerakan Ghu: berjalan (menoleh ke arah jalan) lalu berhenti bercerita
const STOPS = [
  { at: 0, x: 150 },
  { at: 75, x: 1250 },
  { at: 165, x: 1250 },
  { at: 240, x: 350 },
];

const STEPS: { from: number; to: number; title: string; note: string }[] = [
  { from: 0, to: 75, title: "Berjalan ke kanan →", note: "Badan tegak, kaki melangkah, wajah menoleh ke kanan" },
  { from: 75, to: 165, title: "Berhenti & bercerita", note: "Wajah kembali menghadap penonton, tangan bergerak" },
  { from: 165, to: 240, title: "← Berjalan ke kiri", note: "Wajah menoleh ke kiri" },
  { from: 240, to: 330, title: "Berhenti & bercerita", note: "Menghadap penonton lagi" },
];

export const WalkDemo: React.FC = () => (
  <AbsoluteFill style={{ background: `linear-gradient(${colors.cream}, ${colors.pinkSoft})` }}>
    <IslamicPattern color={colors.hijabDark} opacity={0.1} />
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 120,
        background: "#EBD3C2",
      }}
    />
    {STEPS.map((s) => (
      <Sequence key={s.from} from={s.from} durationInFrames={s.to - s.from} layout="none">
        <div style={{ position: "absolute", top: 60, width: "100%", textAlign: "center" }}>
          <div style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 84, color: colors.maroon }}>
            {s.title}
          </div>
          <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 44, color: colors.ink, marginTop: 10 }}>
            {s.note}
          </div>
        </div>
      </Sequence>
    ))}
    <GhuWalker stops={STOPS} size={300} bottom={70} talking />
  </AbsoluteFill>
);
