import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { bodyFont, colors, LEAD_IN, titleFont } from "../theme";
import { useVoice } from "../lib/voice";
import type { WordTiming } from "../types";

// Kelompokkan kata menjadi potongan pendek (maks. 7 kata) agar mudah dibaca anak
const chunkWords = (words: WordTiming[]) => {
  const chunks: WordTiming[][] = [];
  let current: WordTiming[] = [];
  for (const w of words) {
    current.push(w);
    const endsSentence = /[.,!?]$/.test(w.text);
    if (current.length >= 7 || (endsSentence && current.length >= 3)) {
      chunks.push(current);
      current = [];
    }
  }
  if (current.length) chunks.push(current);
  return chunks;
};

export const Captions: React.FC<{
  accent: string;
  left?: number;
  right?: number;
  bottom?: number;
  fontSize?: number;
}> = ({ accent, left = 330, right = 120, bottom = 70, fontSize = 50 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const voice = useVoice();
  const t = frame / fps - LEAD_IN;
  const chunks = useMemo(() => chunkWords(voice.words), [voice.words]);

  const last = voice.words[voice.words.length - 1];
  if (!last || t < -0.1 || t > last.end + 0.6) return null;

  const active =
    [...chunks].reverse().find((c) => c[0].start <= t) ?? chunks[0];

  return (
    <div
      style={{
        position: "absolute",
        left,
        right,
        bottom,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.94)",
          borderRadius: 40,
          padding: "22px 40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          fontFamily: bodyFont,
          fontWeight: 800,
          fontSize,
          lineHeight: 1.25,
          color: colors.ink,
          maxWidth: 1350,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: 22,
        }}
      >
        {active.map((w, i) => {
          const isNow = t >= w.start && t <= w.end + 0.05;
          const spoken = t > w.end;
          return (
            <span
              key={i}
              style={{
                color: isNow ? accent : spoken ? colors.ink : "#8A86A3",
                scale: isNow ? "1.05" : "1",
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const SceneLabel: React.FC<{ text: string; accent: string }> = ({
  text,
  accent,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        left: 90,
        background: accent,
        color: colors.white,
        fontFamily: titleFont,
        fontWeight: 600,
        fontSize: 46,
        padding: "14px 36px",
        borderRadius: 999,
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        translate: interpolate(frame, [5, 25], ["-800px 0px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {text}
    </div>
  );
};

// Label dalil di pojok kanan atas, mis. "QS. An-Naml: 18"
export const SourceBadge: React.FC<{ text: string; accent: string }> = ({
  text,
  accent,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        right: 90,
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "rgba(255,255,255,0.92)",
        color: colors.ink,
        fontFamily: bodyFont,
        fontWeight: 800,
        fontSize: 34,
        padding: "12px 30px 12px 18px",
        borderRadius: 999,
        border: `4px solid ${accent}`,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        opacity: interpolate(frame, [15, 30], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {/* Ikon kitab terbuka */}
      <svg width={44} height={34} viewBox="0 0 44 34">
        <path d="M22 6 C16 1 7 1 2 3 L2 31 C7 29 16 29 22 33 Z" fill={accent} />
        <path d="M22 6 C28 1 37 1 42 3 L42 31 C37 29 28 29 22 33 Z" fill={accent} opacity={0.7} />
      </svg>
      {text}
    </div>
  );
};
