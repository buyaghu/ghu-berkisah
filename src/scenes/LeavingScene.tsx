import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { City, Footprint } from "../components/objects";
import { Clouds, Sea, Sky, Sun, calmSea } from "../components/nature";
import { usePhraseFrame } from "../lib/voice";
import { colors } from "../theme";
import { clamp, type SceneProps } from "./common";

// Jejak kaki berjalan dari kota menuju laut. Kamera bergeser ke kanan.
const STEPS = 26;

export const LeavingScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const walkAt = usePhraseFrame("Nabi Yunus pergi");
  const seaAt = usePhraseFrame("tepi laut");

  const pan = interpolate(frame, [walkAt, seaAt + 20], [0, -1920], clamp);
  const stepsShown = interpolate(frame, [walkAt, seaAt], [0, STEPS], clamp);

  return (
    <AbsoluteFill>
      <Sky top="#FFC8A2" bottom="#FFEBD0" />
      <Sun x={1500} y={240} r={100} color="#FFCF66" />
      <Clouds count={4} color="#FFF4E8" speed={0.3} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 3840, height: 1080, translate: `${pan}px 0px` }}>
        {/* Kota di kejauhan (kiri) */}
        <div style={{ position: "absolute", left: -100, bottom: 360, scale: "0.6", transformOrigin: "left bottom", opacity: 0.85 }}>
          <City windowGlow={0.15} />
        </div>
        {/* Tanah */}
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 3000, height: 400, background: colors.sand, borderTopRightRadius: 400 }} />
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 3200, height: 250, background: "#EFC983", borderTopRightRadius: 300 }} />
        {/* Laut di kanan */}
        <div style={{ position: "absolute", left: 2600, top: 0, width: 1920, height: 1080 }}>
          <Sea layers={calmSea(700)} speed={0.8} />
        </div>
        {/* Jejak kaki */}
        {new Array(STEPS).fill(0).map((_, i) => {
          const x = 500 + i * 85;
          const y = 820 - Math.sin(i / 3) * 30 + (i % 2 ? 26 : -26);
          const op = interpolate(stepsShown - i, [0, 1], [0, 1], clamp);
          return (
            <div key={i} style={{ position: "absolute", left: x, top: y, opacity: op, rotate: "90deg" }}>
              <Footprint flip={i % 2 === 1} size={34} />
            </div>
          );
        })}
      </div>
      {/* Langit sedikit kelabu menandakan hati yang sedih */}
      <AbsoluteFill
        style={{
          background: "#6B6B8A",
          mixBlendMode: "multiply",
          opacity: interpolate(frame, [0, 30, durationInFrames - 40, durationInFrames], [0.25, 0.25, 0.1, 0.1], clamp),
        }}
      />
    </AbsoluteFill>
  );
};
