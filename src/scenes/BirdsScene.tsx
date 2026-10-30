import React from "react";
import { AbsoluteFill, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Bird } from "../components/objects";
import { Clouds, Sky, Sun } from "../components/nature";
import { colors } from "../theme";
import type { SceneProps } from "./common";

// Pohon besar penuh burung yang saling "bercakap" (bahasa burung)
const PERCH = [
  [980, 330], [1180, 260], [1380, 330], [1540, 430], [860, 470],
  [1080, 470], [1300, 480], [1480, 560], [1000, 610], [1240, 640],
];
const BIRD_COLORS = ["#7CC6F2", "#FF9FB8", "#FFC94A", "#9BE38C", "#B9A7F5"];

export const BirdsScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sky top="#8FD6F7" bottom="#E8F8FF" />
      <Sun x={300} y={180} r={90} />
      <Clouds count={5} speed={0.5} maxY={250} />
      {/* Tanah & pohon */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 200, background: colors.leaf }} />
      <div style={{ position: "absolute", left: 1150, top: 560, width: 110, height: 420, background: "#8C5A3C", borderRadius: 30 }} />
      {[[1200, 430, 420], [950, 470, 260], [1450, 480, 270], [1200, 260, 260]].map(([x, y, r], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x - r,
            top: y - r * 0.7,
            width: r * 2,
            height: r * 1.4,
            borderRadius: "50%",
            background: i % 2 ? "#58B65C" : colors.leaf,
            scale: `${1 + Math.sin(frame / 30 + i) * 0.01}`,
          }}
        />
      ))}
      {/* Burung bertengger, bergantian "berbicara" */}
      {PERCH.map(([x, y], i) => {
        const s = spring({ frame: frame - i * 5, fps, config: { damping: 12 } });
        const talking = Math.floor(frame / 18 + i * 2) % 5 === 0;
        const hop = talking ? Math.abs(Math.sin(frame / 3)) * 12 : 0;
        return (
          <div key={i} style={{ position: "absolute", left: x - 45, top: y - 45 - hop, scale: `${s}` }}>
            <Bird size={90} flap={talking ? frame * 0.8 : 0} color={BIRD_COLORS[i % BIRD_COLORS.length]} />
            {talking && (
              <div
                style={{
                  position: "absolute",
                  left: 60,
                  top: -50,
                  background: colors.white,
                  borderRadius: 20,
                  padding: "8px 16px",
                  display: "flex",
                  gap: 6,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
              >
                {[0, 1, 2].map((d) => (
                  <div key={d} style={{ width: 12, height: 12, borderRadius: 6, background: BIRD_COLORS[(i + d) % 5] }} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      {/* Burung yang terbang melintas */}
      {new Array(5).fill(0).map((_, i) => (
        <div
          key={`f${i}`}
          style={{
            position: "absolute",
            left: ((random(`bf${i}`) * width + frame * (4 + i)) % (width + 200)) - 100,
            top: 120 + i * 60 + Math.sin(frame / 10 + i) * 15,
          }}
        >
          <Bird size={70} flap={frame * 0.7 + i} color={BIRD_COLORS[(i + 2) % 5]} />
        </div>
      ))}
    </AbsoluteFill>
  );
};
