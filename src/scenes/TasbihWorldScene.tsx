import React from "react";
import { AbsoluteFill, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Ant, Bird, BigFish } from "../components/objects";
import { Moon, Sky, Stars, wavePath } from "../components/nature";
import { bodyFont, colors } from "../theme";
import type { SceneProps } from "./common";

// Malam yang tenang: pohon, burung, ikan, dan semut bersinar (semuanya bertasbih)
const Glow: React.FC<{ x: number; y: number; seed: string; spread?: number }> = ({ x, y, seed, spread = 160 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {new Array(14).fill(0).map((_, i) => {
        const t = (frame * (1 + random(`${seed}s${i}`)) + random(`${seed}t${i}`) * 300) % 300;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + Math.sin(t / 30 + i) * spread * (t / 300) + (random(`${seed}x${i}`) - 0.5) * spread,
              top: y - t,
              width: 10,
              height: 10,
              borderRadius: 5,
              background: colors.gold,
              boxShadow: `0 0 14px 4px ${colors.gold}`,
              opacity: Math.sin((t / 300) * Math.PI),
            }}
          />
        );
      })}
    </>
  );
};

export const TasbihWorldScene: React.FC<SceneProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const cardIn = spring({ frame: frame - 20, fps, config: { damping: 12 } });
  const fishJump = (frame % 120) / 120;

  return (
    <AbsoluteFill>
      <Sky top="#141A45" bottom="#4B3F7A" />
      <Stars count={90} />
      <Moon x={1650} y={170} r={80} />
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <path d={wavePath(width, height, 700, 30, 900, 0.5)} fill="#2E5A4A" />
        <ellipse cx={1320} cy={930} rx={420} ry={90} fill="#2B6C9C" />
      </svg>
      {/* Pohon & burung */}
      <div style={{ position: "absolute", left: 230, top: 520, width: 60, height: 260, background: "#5A3D2B", borderRadius: 20 }} />
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 360,
          width: 340,
          height: 240,
          borderRadius: "50%",
          background: "#3E7A55",
          rotate: `${Math.sin(frame / 30) * 2}deg`,
        }}
      />
      <div style={{ position: "absolute", left: 280, top: 330 }}>
        <Bird size={80} flap={frame * 0.3} color="#FFC94A" />
      </div>
      <Glow x={260} y={480} seed="tree" />
      {/* Ikan melompat di kolam */}
      <div
        style={{
          position: "absolute",
          left: 1150 + fishJump * 300,
          top: 880 - Math.sin(fishJump * Math.PI) * 220,
          rotate: `${(fishJump - 0.5) * 60}deg`,
        }}
      >
        <BigFish width={180} tailAngle={Math.sin(frame / 4) * 15} />
      </div>
      <Glow x={1320} y={900} seed="pond" spread={300} />
      {/* Semut */}
      {[600, 760, 900].map((x, i) => (
        <div key={x} style={{ position: "absolute", left: x + ((frame * 1.2) % 120), top: 790 + i * 10 }}>
          <Ant size={110} walk={frame + i * 4} carrying={i !== 1} />
        </div>
      ))}
      <Glow x={780} y={800} seed="ants" />
      {/* Kartu ayat */}
      {scene.card && (
        <div
          style={{
            position: "absolute",
            left: 330,
            right: 330,
            top: 175,
            textAlign: "center",
            background: "rgba(255,255,255,0.95)",
            borderRadius: 40,
            border: `6px solid ${colors.gold}`,
            padding: "28px 44px",
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 46,
            lineHeight: 1.3,
            color: colors.ink,
            scale: `${cardIn}`,
          }}
        >
          {scene.card.title}
          {scene.card.subtitle && (
            <div style={{ fontSize: 34, marginTop: 10, color: colors.leafDark }}>{scene.card.subtitle}</div>
          )}
        </div>
      )}
    </AbsoluteFill>
  );
};
