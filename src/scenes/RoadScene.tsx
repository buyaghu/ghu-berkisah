import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Banner, Bird } from "../components/objects";
import { Clouds, Sky, Sun, wavePath } from "../components/nature";
import type { SceneProps } from "./common";

// Barisan panji berjalan menjauh di jalan yang berkelok menuju bukit
const ROAD_TOP = 470;
const BOTTOM = 1080;

// Posisi di jalan untuk p (0 = dekat kamera, 1 = cakrawala)
const roadAt = (p: number) => {
  const y = BOTTOM - (BOTTOM - ROAD_TOP) * Math.pow(p, 0.6);
  const x = 960 + Math.sin(p * Math.PI * 1.6) * 260 * (1 - p);
  const scale = 1.1 - p * 0.95;
  return { x, y, scale };
};

export const RoadScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const colors3 = ["#5B7FD6", "#E8853D", "#3EA87A"];
  const road = new Array(40).fill(0).map((_, i) => roadAt(i / 39));
  const left = road.map((r) => `${r.x - 330 * r.scale},${r.y}`).join(" ");
  const right = [...road].reverse().map((r) => `${r.x + 330 * r.scale},${r.y}`).join(" ");

  return (
    <AbsoluteFill>
      <Sky top="#9AD8F5" bottom="#FFEFD0" />
      <Sun x={1500} y={260} r={100} />
      <Clouds count={4} speed={0.3} maxY={200} />
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <path d={wavePath(width, height, ROAD_TOP - 30, 40, 900, 1)} fill="#B7DC8A" />
        <path d={wavePath(width, height, ROAD_TOP + 60, 30, 700, 2.5)} fill="#9BD67A" />
        <polygon points={`${left} ${right}`} fill="#E9D49A" />
      </svg>
      {/* Panji-panji berbaris rapi menjauh */}
      {new Array(18).fill(0)
        .map((_, i) => {
          const p = ((i / 18 + frame * 0.0015) % 1);
          return { i, p, ...roadAt(p) };
        })
        .sort((a, b) => b.p - a.p)
        .map(({ i, x, y, scale }) =>
          [-1, 1].map((side) => (
            <div
              key={`${i}${side}`}
              style={{
                position: "absolute",
                left: x + side * 150 * scale - 12 * scale,
                top: y - 260 * scale + Math.abs(Math.sin(frame / 5 + i)) * 6 * scale,
                scale: `${scale}`,
                transformOrigin: "left top",
              }}
            >
              <Banner color={colors3[i % 3]} wave={Math.sin(frame / 8 + i) * 10} />
            </div>
          )),
        )}
      {/* Kawanan burung terbang searah barisan */}
      {new Array(8).fill(0).map((_, i) => (
        <div
          key={`b${i}`}
          style={{
            position: "absolute",
            left: 700 + (i % 4) * 130 + Math.sin(frame / 20 + i) * 20,
            top: 180 + Math.floor(i / 4) * 80 - ((frame * 0.6) % 120),
            scale: `${0.7 - ((frame * 0.6) % 120) / 400}`,
          }}
        >
          <Bird size={70} flap={frame * 0.6 + i} color={i % 2 ? "#FFC94A" : "#7CC6F2"} />
        </div>
      ))}
    </AbsoluteFill>
  );
};
