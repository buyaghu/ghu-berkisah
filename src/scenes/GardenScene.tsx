import React from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";
import { Clouds, Sky, Sun, wavePath } from "../components/nature";
import { colors } from "../theme";
import type { SceneProps } from "./common";

// Taman penuh nikmat Allah: sungai, pohon buah, bunga, kupu-kupu
const FruitTree: React.FC<{ x: number; frame: number; fruit: string }> = ({ x, frame, fruit }) => (
  <div style={{ position: "absolute", left: x, top: 330 }}>
    <div style={{ position: "absolute", left: 120, top: 200, width: 60, height: 260, background: "#8C5A3C", borderRadius: 20 }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 300, height: 260, borderRadius: "50%", background: colors.leaf }} />
    {[[60, 80], [170, 60], [110, 150], [210, 150], [40, 170]].map(([fx, fy], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: fx,
          top: fy + Math.sin(frame / 10 + i) * 4,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: fruit,
          boxShadow: "inset -6px -6px 0 rgba(0,0,0,0.12)",
        }}
      />
    ))}
  </div>
);

const Butterfly: React.FC<{ i: number; frame: number; width: number }> = ({ i, frame, width }) => {
  const flap = Math.abs(Math.sin(frame / 3 + i));
  const x = (random(`bx${i}`) * width + frame * 2 + Math.sin(frame / 20 + i) * 60) % width;
  const y = 380 + random(`by${i}`) * 300 + Math.sin(frame / 15 + i) * 40;
  const c = ["#FF9FB8", "#FFC94A", "#B9A7F5", "#7CC6F2"][i % 4];
  return (
    <svg width={70} height={50} viewBox="0 0 70 50" style={{ position: "absolute", left: x, top: y }}>
      <ellipse cx={35 - 16 * flap} cy={20} rx={16 * flap + 2} ry={18} fill={c} />
      <ellipse cx={35 + 16 * flap} cy={20} rx={16 * flap + 2} ry={18} fill={c} />
      <rect x={32} y={8} width={6} height={34} rx={3} fill={colors.ink} />
    </svg>
  );
};

export const GardenScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sky top="#7FD0F5" bottom="#FFF6DA" />
      {/* Sinar matahari */}
      <div
        style={{
          position: "absolute",
          left: 1500 - 900,
          top: 160 - 900,
          width: 1800,
          height: 1800,
          borderRadius: "50%",
          background: `repeating-conic-gradient(from ${frame * 0.25}deg, rgba(255,230,140,0.25) 0deg 10deg, transparent 10deg 30deg)`,
        }}
      />
      <Sun x={1500} y={160} r={100} />
      <Clouds count={4} speed={0.4} maxY={180} />
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <path d={wavePath(width, height, 600, 30, 900, 0.3)} fill="#9BD67A" />
      </svg>
      <FruitTree x={120} frame={frame} fruit="#FF7A7A" />
      <FruitTree x={1500} frame={frame + 20} fruit="#FFB347" />
      {/* Sungai yang mengalir */}
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <path d="M0 820 C500 760 900 900 1920 800 L1920 960 C900 1040 500 920 0 980 Z" fill="#5BC0E8" />
        {new Array(8).fill(0).map((_, i) => {
          const x = ((i * 260 + frame * 3) % 2100) - 100;
          return <path key={i} d={`M${x} ${870 + (i % 3) * 25} q30 -12 60 0`} stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={0.7} />;
        })}
      </svg>
      {/* Bunga bergoyang */}
      {new Array(14).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 60 + i * 135,
            top: 700 + (i % 2) * 30,
            transformOrigin: "bottom center",
            rotate: `${Math.sin(frame / 15 + i) * 8}deg`,
          }}
        >
          <div style={{ width: 8, height: 70, background: colors.leafDark, marginLeft: 21 }} />
          <div
            style={{
              position: "absolute",
              top: -20,
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: ["#FF9FB8", "#FFC94A", "#FFFFFF", "#B9A7F5"][i % 4],
              border: `10px solid ${["#FF6F91", "#FFA62B", "#FFD3E1", "#8F7AE8"][i % 4]}`,
            }}
          />
        </div>
      ))}
      {new Array(5).fill(0).map((_, i) => (
        <Butterfly key={i} i={i} frame={frame} width={width} />
      ))}
    </AbsoluteFill>
  );
};
