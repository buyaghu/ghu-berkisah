import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { City } from "../components/objects";
import { Clouds, Moon, Sea, Stars, Sun, calmSea } from "../components/nature";
import { usePhraseFrameOr } from "../lib/voice";
import { clamp, type SceneProps } from "./common";

// Negeri Ninawa di tepi sungai. Saat Nabi Yunus "mengajak", siang-malam berganti cepat.
export const CityScene: React.FC<SceneProps> = ({ story }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width } = useVideoConfig();
  const rejectAt = usePhraseFrameOr(story.id === "nuh" ? "Tapi mereka menutup" : "Tapi mereka tidak mau");
  const yearsAt = usePhraseFrameOr(story.id === "nuh" ? "Beliau mengajak mereka siang" : "Nabi Yunus mengajak");

  // Siklus hari: 0 = siang, 1 = malam
  const cycles = interpolate(frame, [yearsAt, durationInFrames], [0, 4], clamp);
  const night = frame < yearsAt ? 0 : (1 - Math.cos(cycles * Math.PI * 2)) / 2;
  const gloom = interpolate(frame, [rejectAt, rejectAt + 30], [0, 0.35], clamp);
  const sunAngle = cycles * Math.PI * 2;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#FFB88C, #FFE3B3)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(#141A45, #3A3F7A)", opacity: night }} />
      <AbsoluteFill style={{ opacity: night }}>
        <Stars />
      </AbsoluteFill>
      {frame < yearsAt ? (
        <Sun x={1450} y={260} r={120} color="#FFD36B" />
      ) : (
        <>
          <Sun x={width / 2 + Math.sin(sunAngle) * 800} y={300 - Math.cos(sunAngle) * 180} r={100} color="#FFD36B" />
          <Moon x={width / 2 - Math.sin(sunAngle) * 800} y={300 + Math.cos(sunAngle) * 180} />
        </>
      )}
      <Clouds count={5} color="#FFF1E0" speed={0.5} />
      <AbsoluteFill style={{ background: "#4A4A6A", opacity: gloom, mixBlendMode: "multiply" }} />
      <div style={{ position: "absolute", left: 0, bottom: 170 }}>
        <City windowGlow={0.3 + night * 0.7} />
      </div>
      <Sea layers={calmSea(900).slice(0, 3)} speed={0.6} />
    </AbsoluteFill>
  );
};
