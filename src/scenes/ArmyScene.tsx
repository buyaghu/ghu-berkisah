import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Banner, Bird } from "../components/objects";
import { Clouds, Sky, Sun, wavePath } from "../components/nature";
import { usePhraseFrame } from "../lib/voice";
import { colors, titleFont } from "../theme";
import { clamp, type SceneProps } from "./common";

// Barisan panji-panji yang tertib + kawanan burung. Manusia & jin tidak digambar.
const ROWS = [
  { y: 430, scale: 0.55, color: "#5B7FD6", speed: 2.2 },
  { y: 520, scale: 0.75, color: "#E8853D", speed: 2.8 },
  { y: 630, scale: 1, color: "#3EA87A", speed: 3.4 },
];

const Chip: React.FC<{ at: number; text: string; color: string }> = ({ at, text, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 10 } });
  return (
    <div
      style={{
        background: color,
        color: colors.white,
        fontFamily: titleFont,
        fontWeight: 700,
        fontSize: 60,
        padding: "14px 44px",
        borderRadius: 999,
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        opacity: frame >= at ? 1 : 0,
        scale: `${s}`,
      }}
    >
      {text}
    </div>
  );
};

export const ArmyScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const humanAt = usePhraseFrame("manusia");
  const jinAt = usePhraseFrame("jin");
  const birdAt = usePhraseFrame("burung-burung");
  const marchAt = usePhraseFrame("berjalan bersama");
  const march = interpolate(frame, [marchAt - 30, marchAt], [0, 1], clamp);

  return (
    <AbsoluteFill>
      <Sky top="#9AD8F5" bottom="#FFEFD0" />
      <Sun x={300} y={200} r={90} />
      <Clouds count={4} speed={0.3} />
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <path d={wavePath(width, height, 560, 30, 1000, 1)} fill="#C9E49B" />
        <path d={wavePath(width, height, 760, 20, 800, 3)} fill="#E9D49A" />
      </svg>
      {ROWS.map((row, r) => (
        <div key={r}>
          {new Array(14).fill(0).map((_, i) => {
            // Barisan tertib: jarak sama rata, bergerak bersama
            const spacing = 200 * row.scale + 40;
            const x =
              ((i * spacing + frame * row.speed * (0.4 + march)) % (14 * spacing)) - spacing;
            const bob = Math.abs(Math.sin(frame / 6 + i)) * 6 * row.scale;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: row.y - bob,
                  scale: `${row.scale}`,
                  transformOrigin: "left bottom",
                }}
              >
                <Banner color={row.color} wave={Math.sin(frame / 8 + i) * 10} />
              </div>
            );
          })}
          {/* Debu langkah */}
          {new Array(10).fill(0).map((_, i) => (
            <div
              key={`d${i}`}
              style={{
                position: "absolute",
                left: ((random(`dx${r}${i}`) * width + frame * row.speed) % (width + 200)) - 100,
                top: row.y + 250 * row.scale - 10,
                width: 120 * row.scale,
                height: 50 * row.scale,
                borderRadius: "50%",
                background: "rgba(210,180,130,0.45)",
                scale: `${1 + Math.sin(frame / 10 + i) * 0.2}`,
              }}
            />
          ))}
        </div>
      ))}
      {/* Kawanan burung */}
      {new Array(12).fill(0).map((_, i) => {
        const s = spring({ frame: frame - birdAt - i * 2, fps, config: { damping: 14 } });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: ((i % 6) * 150 + frame * 3) % (width + 200) - 100,
              top: 120 + Math.floor(i / 6) * 90 + Math.sin(frame / 10 + i) * 10,
              opacity: s,
            }}
          >
            <Bird size={70} flap={frame * 0.6 + i} color={i % 2 ? "#FFC94A" : "#7CC6F2"} />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          top: 200,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <Chip at={humanAt} text="Manusia" color="#E8853D" />
        <Chip at={jinAt} text="Jin" color="#7B5BD6" />
        <Chip at={birdAt} text="Burung" color="#2BA6C9" />
      </div>
    </AbsoluteFill>
  );
};
