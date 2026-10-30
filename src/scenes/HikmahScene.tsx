import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GhuWalker } from "../components/Ghu";
import { IslamicPattern } from "../components/nature";
import { HikmahIconSvg } from "../components/objects";
import { usePhraseFrame, useVoice, phraseSeconds } from "../lib/voice";
import { colors, LEAD_IN, titleFont } from "../theme";
import type { HikmahIcon, HikmahItem } from "../types";
import { clamp, type SceneProps } from "./common";

// Hikmah dibagi dua bagian. Bagian 1: kartu di kanan, Ghu berdiri di kiri.
// Bagian 2: kartu lama keluar, Ghu berjalan ke kanan, kartu baru muncul di kiri.
const GHU_LEFT = 60;
const GHU_RIGHT = 1480;
const WALK_FRAMES = 55;

// Ikon kartu ikut bergerak supaya tidak diam
const iconMotion = (icon: HikmahIcon, frame: number): React.CSSProperties => {
  if (icon === "heart") return { scale: `${1 + Math.abs(Math.sin(frame / 8)) * 0.12}` };
  if (icon === "light") return { rotate: `${frame * 1.5}deg` };
  if (icon === "sprout") return { rotate: `${Math.sin(frame / 12) * 8}deg`, transformOrigin: "bottom center" };
  return { translate: `0px ${Math.sin(frame / 10) * 6}px` };
};

const HikmahCard: React.FC<{
  item: HikmahItem;
  index: number;
  accent: string;
  showAt: number;
  hideAt: number;
}> = ({ item, index, accent, showAt, hideAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - showAt, fps, config: { damping: 11 } });
  const out = interpolate(frame, [hideAt, hideAt + 15], [0, 1], clamp);
  if (frame < showAt) return null;
  return (
    <div
      style={{
        width: 1120,
        height: 230,
        background: colors.white,
        borderRadius: 44,
        border: `8px solid ${accent}`,
        boxShadow: "0 16px 30px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: 34,
        padding: "0 44px",
        scale: `${s}`,
        opacity: 1 - out,
        translate: `${out * 400}px 0px`,
      }}
    >
      <div style={{ flexShrink: 0, position: "relative" }}>
        <div style={iconMotion(item.icon, frame)}>
          <HikmahIconSvg icon={item.icon} size={150} />
        </div>
        <div
          style={{
            position: "absolute",
            top: -18,
            left: -18,
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: accent,
            color: colors.white,
            fontFamily: titleFont,
            fontWeight: 700,
            fontSize: 42,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {index + 1}
        </div>
      </div>
      <div style={{ fontFamily: titleFont, fontWeight: 600, fontSize: 64, lineHeight: 1.1, color: colors.ink }}>
        {item.title}
      </div>
    </div>
  );
};

export const HikmahScene: React.FC<SceneProps> = ({ scene, story }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const voice = useVoice();
  const items = scene.hikmah ?? [];
  const half = Math.ceil(items.length / 2);
  const at = (phrase: string) => Math.round((LEAD_IN + phraseSeconds(voice, phrase)) * fps);
  const second = items[half];

  // Ghu mulai berjalan sesaat sebelum hikmah bagian kedua disebut
  const swapStart = second ? at(second.phrase) - WALK_FRAMES - 10 : durationInFrames;
  const arrived = swapStart + WALK_FRAMES;
  const stops = [
    { at: 0, x: GHU_LEFT },
    ...(second
      ? [
          { at: swapStart, x: GHU_LEFT },
          { at: arrived, x: GHU_RIGHT },
        ]
      : []),
  ];
  const titleIn = spring({ frame, fps, config: { damping: 12 } });
  const firstPhrase = usePhraseFrame(items[0]?.phrase ?? scene.text.split(" ")[0]);

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.cream}, #DDF4F6)` }}>
      <IslamicPattern color={story.accent} opacity={0.14} />
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 140,
          fontFamily: titleFont,
          fontWeight: 700,
          fontSize: 92,
          color: story.accent,
          scale: `${titleIn}`,
        }}
      >
        Hikmah Kisah
      </div>
      {/* Bagian 1: kanan */}
      <div style={{ position: "absolute", top: 220, left: 640, display: "flex", flexDirection: "column", gap: 40 }}>
        {items.slice(0, half).map((item, i) => (
          <HikmahCard
            key={item.title}
            item={item}
            index={i}
            accent={story.accent}
            showAt={Math.max(at(item.phrase), firstPhrase)}
            hideAt={swapStart - 20}
          />
        ))}
      </div>
      {/* Bagian 2: kiri, setelah Ghu sampai di kanan */}
      <div style={{ position: "absolute", top: 220, left: 140, display: "flex", flexDirection: "column", gap: 40 }}>
        {items.slice(half).map((item, i) => (
          <HikmahCard
            key={item.title}
            item={item}
            index={half + i}
            accent={story.accent}
            showAt={Math.max(at(item.phrase), arrived)}
            hideAt={durationInFrames + 100}
          />
        ))}
      </div>
      <GhuWalker stops={stops} size={300} bottom={20} />
    </AbsoluteFill>
  );
};
