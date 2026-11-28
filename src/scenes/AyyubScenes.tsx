import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Clouds, LightRays, Moon, Rain, Stars, Sun } from "../components/nature";
import { Footprint } from "../components/objects";
import { colors } from "../theme";
import { clamp, type SceneProps } from "./common";

// Kisah Nabi Ayyub 'alaihissalam. Adab (CLAUDE.md): Nabi Ayyub, keluarga beliau, dan manusia lain
// TIDAK digambar — termasuk siluet, bayangan, tangan, dan kaki. Kehadiran beliau cukup lewat
// lingkungan: kebun yang layu lalu bersemi, malam berbintang, mata air yang memancar, jejak kaki,
// dan belalang emas (hewan). Tanpa zoom/geser kamera: gerak hanya pada ornamen.

// ---------- Ornamen ----------

// Pohon sederhana. wither: 0 = hijau rimbun, 1 = layu (daun cokelat & menipis)
const Tree: React.FC<{ w?: number; wither?: number; seed: string; sway?: number }> = ({ w = 360, wither = 0, seed, sway = 0 }) => {
  const leaf = (i: number) => {
    const g = [96 - wither * 10, 170 - wither * 70, 90 - wither * 50];
    const shade = random(`${seed}c${i}`) * 30;
    return `rgb(${g[0] + shade + wither * 90}, ${g[1] + shade * 0.5}, ${g[2]})`;
  };
  const blobs = [
    [60, 70, 90],
    [130, 40, 100],
    [200, 75, 85],
    [95, 120, 80],
    [170, 120, 85],
    [130, 95, 70],
  ];
  return (
    <svg width={w} height={w * 1.25} viewBox="0 0 260 325" style={{ overflow: "visible" }}>
      <path d="M118 320 C122 250 116 200 124 150 L138 150 C146 200 140 250 146 320 Z" fill="#7A4A2A" />
      <path d="M128 200 C108 180 96 168 84 150" stroke="#7A4A2A" strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M136 186 C156 170 170 160 182 144" stroke="#7A4A2A" strokeWidth={10} fill="none" strokeLinecap="round" />
      <g transform={`rotate(${sway} 130 300)`}>
        {blobs.map(([x, y, r], i) => {
          const keep = random(`${seed}k${i}`) > wither * 0.7;
          return keep ? <circle key={i} cx={x} cy={y} r={r * (1 - wither * 0.25)} fill={leaf(i)} /> : null;
        })}
      </g>
    </svg>
  );
};

// Bunga kecil yang mekar (grow 0..1)
const Flower: React.FC<{ grow: number; color: string }> = ({ grow, color }) => (
  <svg width={60} height={90} viewBox="0 0 60 90" style={{ overflow: "visible" }}>
    <path d={`M30 90 L30 ${90 - 55 * grow}`} stroke="#4E9A4A" strokeWidth={5} strokeLinecap="round" />
    <g transform={`translate(30 ${90 - 55 * grow}) scale(${grow})`}>
      {new Array(5).fill(0).map((_, i) => (
        <circle key={i} cx={Math.cos((i * 2 * Math.PI) / 5) * 11} cy={Math.sin((i * 2 * Math.PI) / 5) * 11} r={9} fill={color} />
      ))}
      <circle r={7} fill={colors.gold} />
    </g>
  </svg>
);

// Daun yang berguguran
const FallingLeaves: React.FC<{ n?: number; seed: string; color?: string }> = ({ n = 14, seed, color = "#B9853F" }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {new Array(n).fill(0).map((_, i) => {
        const speed = 1.2 + random(`${seed}s${i}`) * 1.6;
        const y = ((random(`${seed}y${i}`) * 900 + frame * speed) % 900) + 120;
        const x = 420 + random(`${seed}x${i}`) * 1300 + Math.sin(frame / 20 + i) * 40;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 26,
              height: 14,
              borderRadius: "50% 0 50% 0",
              background: color,
              rotate: `${frame * 3 + i * 40}deg`,
              opacity: 0.85,
            }}
          />
        );
      })}
    </>
  );
};

// Kilau kecil
const Twinkle: React.FC<{ n?: number; seed: string; color?: string; top?: number; height?: number; left?: number; width?: number }> = ({
  n = 10,
  seed,
  color = colors.gold,
  top = 100,
  height = 400,
  left = 420,
  width = 1300,
}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {new Array(n).fill(0).map((_, i) => {
        const tw = 0.5 + 0.5 * Math.sin(frame / 9 + i * 1.7);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: left + random(`${seed}x${i}`) * width,
              top: top + random(`${seed}y${i}`) * height,
              fontSize: 34,
              color,
              opacity: tw,
              scale: `${0.6 + tw * 0.6}`,
            }}
          >
            ✦
          </div>
        );
      })}
    </>
  );
};

// Belalang emas (hewan; boleh digambar)
const GoldLocust: React.FC<{ size?: number; flap?: number }> = ({ size = 110, flap = 0 }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 120 72" style={{ overflow: "visible" }}>
    <ellipse cx={60} cy={44} rx={40} ry={12} fill="#E9B83A" stroke="#B9851E" strokeWidth={3} />
    <circle cx={100} cy={40} r={11} fill="#F2C94C" stroke="#B9851E" strokeWidth={3} />
    <circle cx={104} cy={37} r={2.6} fill={colors.ink} />
    <path d="M104 30 C112 14 120 10 124 8" stroke="#B9851E" strokeWidth={2.5} fill="none" />
    <path d="M96 30 C100 14 106 8 110 4" stroke="#B9851E" strokeWidth={2.5} fill="none" />
    <path d="M70 50 L84 66 L92 52" stroke="#B9851E" strokeWidth={4} fill="none" strokeLinejoin="round" />
    <path d="M42 50 L36 66" stroke="#B9851E" strokeWidth={4} fill="none" />
    <g transform={`rotate(${-12 + flap * 18} 70 38)`}>
      <ellipse cx={46} cy={28} rx={32} ry={10} fill="rgba(255,236,160,0.85)" stroke="#D9A441" strokeWidth={2} />
    </g>
  </svg>
);

// Mata air yang memancar dari celah batu (power 0..1)
const SpringWater: React.FC<{ power: number; w?: number }> = ({ power, w = 520 }) => {
  const frame = useCurrentFrame();
  const h = 320 * power;
  return (
    <div style={{ position: "relative", width: w, height: 460 }}>
      {/* pancaran */}
      {power > 0.02 && (
        <svg width={w} height={460} viewBox={`0 0 ${w} 460`} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <path
            d={`M${w / 2 - 22} 400 C${w / 2 - 30 + Math.sin(frame / 4) * 6} ${400 - h * 0.6} ${w / 2 - 10} ${400 - h} ${w / 2} ${400 - h}
               C${w / 2 + 10} ${400 - h} ${w / 2 + 30 + Math.sin(frame / 5) * 6} ${400 - h * 0.6} ${w / 2 + 22} 400 Z`}
            fill="rgba(130,205,240,0.9)"
          />
          <path d={`M${w / 2 - 6} 400 L${w / 2} ${404 - h} L${w / 2 + 6} 400 Z`} fill="rgba(255,255,255,0.7)" />
          {/* tetesan yang memercik */}
          {new Array(14).fill(0).map((_, i) => {
            const t = ((frame * 0.035 + i / 14) % 1);
            const dir = i % 2 ? 1 : -1;
            const spread = 40 + random(`sp${i}`) * 140;
            const x = w / 2 + dir * spread * t;
            const y = 400 - h + h * 0.15 - Math.sin(t * Math.PI) * 70 * power + t * h * 0.95;
            return <circle key={i} cx={x} cy={y} r={7 - t * 3} fill="rgba(170,225,250,0.9)" />;
          })}
        </svg>
      )}
      {/* kolam kecil */}
      <div
        style={{
          position: "absolute",
          left: w / 2 - (90 + 150 * power),
          top: 380,
          width: 2 * (90 + 150 * power),
          height: 60 + 20 * power,
          borderRadius: "50%",
          background: power > 0.02 ? "linear-gradient(#9FDDF5, #5DB3DB)" : "#8B6A47",
          border: "6px solid #8C7A68",
        }}
      />
      {/* riak */}
      {power > 0.02 &&
        [0, 1, 2].map((i) => {
          const t = (frame / 40 + i / 3) % 1;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: w / 2 - 40 - t * 140,
                top: 398 - t * 10,
                width: 80 + t * 280,
                height: 24 + t * 30,
                borderRadius: "50%",
                border: `3px solid rgba(255,255,255,${0.7 * (1 - t)})`,
              }}
            />
          );
        })}
    </div>
  );
};

// Batu-batu besar di kiri & kanan mata air
const Rocks: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 560, top: 720, width: 300, height: 200, borderRadius: "60% 50% 20% 20%", background: "#9C8B78" }} />
    <div style={{ position: "absolute", left: 640, top: 760, width: 170, height: 120, borderRadius: "60% 50% 20% 20%", background: "#B4A391" }} />
    <div style={{ position: "absolute", left: 1320, top: 700, width: 340, height: 220, borderRadius: "50% 60% 20% 20%", background: "#9C8B78" }} />
    <div style={{ position: "absolute", left: 1400, top: 750, width: 160, height: 120, borderRadius: "50% 60% 20% 20%", background: "#B4A391" }} />
  </>
);

// ---------- Adegan ----------

// Kebun: cloudyGarden (mendung), witheredGarden (layu, daun gugur), bloomGarden (bersemi kembali)
export const AyyubGardenScene: React.FC<SceneProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mode = scene.visual;
  const bloom = mode === "bloomGarden";
  const wither =
    mode === "witheredGarden"
      ? interpolate(frame, [0, 90], [0.3, 1], clamp)
      : mode === "cloudyGarden"
        ? 0.3
        : interpolate(frame, [0, 70], [1, 0], clamp);
  const sway = Math.sin(frame / 25) * 2;
  const sky = bloom
    ? "linear-gradient(#9ED8F2, #E9F7E4 70%)"
    : mode === "witheredGarden"
      ? "linear-gradient(#A7A39C, #D9D0BE 70%)"
      : "linear-gradient(#B5C2C9, #E2E2D6 70%)";
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: sky }} />
      {bloom ? <Sun x={1600} y={190} r={92} /> : null}
      {bloom ? <LightRays color="rgba(255,240,180,0.2)" /> : null}
      <Clouds count={bloom ? 3 : 6} speed={0.3} seed={`ag${mode}`} maxY={260} />
      {bloom && frame < 70 ? <Rain count={60} opacity={interpolate(frame, [0, 20, 70], [0.6, 0.6, 0], clamp)} /> : null}
      {/* tanah */}
      <div
        style={{
          position: "absolute",
          left: -300,
          top: 760,
          width: 2600,
          height: 600,
          borderRadius: "50%",
          background: bloom ? "#8CC56B" : `rgb(${150 + wither * 40}, ${170 - wither * 40}, ${100 - wither * 20})`,
        }}
      />
      {/* pohon-pohon */}
      {[
        [520, 330, 340],
        [900, 280, 400],
        [1330, 320, 360],
      ].map(([x, y, w], i) => (
        <div key={i} style={{ position: "absolute", left: x, top: y }}>
          <Tree w={w} wither={wither} seed={`t${i}`} sway={sway * (i % 2 ? 1 : -1)} />
        </div>
      ))}
      {/* bunga */}
      {new Array(9).fill(0).map((_, i) => {
        const g = bloom ? spring({ frame: frame - 30 - i * 6, fps, config: { damping: 12 } }) : Math.max(0, 0.5 - wither * 0.5);
        return (
          <div key={i} style={{ position: "absolute", left: 480 + i * 140, top: 860 + (i % 2) * 30 }}>
            <Flower grow={g} color={["#F28CA8", "#F7D154", "#C79BE8"][i % 3]} />
          </div>
        );
      })}
      {mode === "witheredGarden" ? <FallingLeaves seed="wl" /> : null}
      {bloom ? <Twinkle seed="bg" n={10} top={150} height={500} /> : null}
    </AbsoluteFill>
  );
};

// Malam berbintang di kebun: sabar, mengingat Allah
export const NightGardenScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const glow = 0.55 + 0.45 * Math.sin(frame / 18);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#141B3C, #34406E 70%)" }} />
      <Stars count={70} seed="ang" />
      <Moon x={1560} y={190} r={80} />
      <div style={{ position: "absolute", left: -300, top: 780, width: 2600, height: 600, borderRadius: "50%", background: "#26334F" }} />
      {[
        [520, 360, 320],
        [1340, 340, 340],
      ].map(([x, y, w], i) => (
        <div key={i} style={{ position: "absolute", left: x, top: y, filter: "brightness(0.45)" }}>
          <Tree w={w} wither={0.5} seed={`n${i}`} />
        </div>
      ))}
      {/* pelita kecil di rumah */}
      <div style={{ position: "absolute", left: 870, top: 560, width: 360, height: 260 }}>
        <div style={{ position: "absolute", left: 0, top: 90, width: 360, height: 170, background: "#5A4A3E", borderRadius: 10 }} />
        <div style={{ position: "absolute", left: -20, top: 20, width: 0, height: 0, borderLeft: "200px solid transparent", borderRight: "200px solid transparent", borderBottom: "80px solid #6E3B3B" }} />
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 130,
            width: 80,
            height: 90,
            borderRadius: "40px 40px 6px 6px",
            background: `rgba(255,214,120,${0.6 + glow * 0.4})`,
            boxShadow: `0 0 ${40 + glow * 40}px rgba(255,214,120,0.8)`,
          }}
        />
      </div>
      <Twinkle seed="ngt" n={8} top={120} height={360} color="#FFF1C2" />
    </AbsoluteFill>
  );
};

// Mata air: springRock (tanah berbatu, air belum muncul lalu memancar) dan spring (air sejuk mengalir)
export const SpringScene: React.FC<SceneProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rock = scene.visual === "springRock";
  const power = rock ? spring({ frame: frame - 150, fps, config: { damping: 14 } }) : 1;
  const shake = rock && frame > 120 && frame < 150 ? Math.sin(frame * 2.2) * 4 : 0;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#A8DDF2, #F4EBD3 70%)" }} />
      <Sun x={1620} y={180} r={88} />
      <LightRays color="rgba(255,240,190,0.18)" />
      <Clouds count={3} speed={0.35} seed="spr" maxY={220} />
      <div style={{ position: "absolute", left: -300, top: 760, width: 2600, height: 600, borderRadius: "50%", background: rock ? "#C9AE85" : "#A9CF86" }} />
      <Rocks />
      {/* retakan tanah */}
      {rock && (
        <svg width={300} height={60} style={{ position: "absolute", left: 960 + shake, top: 850 }}>
          <path d="M10 30 L70 20 L110 40 L160 18 L210 36 L290 24" stroke="#7E6040" strokeWidth={5} fill="none" opacity={interpolate(frame, [100, 140], [0, 1], clamp)} />
        </svg>
      )}
      <div style={{ position: "absolute", left: 850 + shake, top: 450 }}>
        <SpringWater power={power} />
      </div>
      {/* rerumputan di tepi */}
      {!rock &&
        new Array(12).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 480 + i * 115,
              top: 910 + (i % 3) * 14,
              width: 14,
              height: 46,
              borderRadius: 8,
              background: "#5DA857",
              rotate: `${Math.sin(frame / 15 + i) * 8}deg`,
              transformOrigin: "50% 100%",
            }}
          />
        ))}
      {power > 0.3 ? <Twinkle seed="spt" n={10} top={360} height={400} left={760} width={700} color="#FFFFFF" /> : null}
    </AbsoluteFill>
  );
};

// Belalang-belalang emas berjatuhan (HR. Bukhari no. 279)
export const GoldLocustsScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#F6D99A, #FFF4DA 70%)" }} />
      <LightRays color="rgba(255,226,140,0.3)" />
      <Clouds count={3} speed={0.3} seed="gl" maxY={200} />
      <div style={{ position: "absolute", left: -300, top: 780, width: 2600, height: 600, borderRadius: "50%", background: "#B9D88C" }} />
      <Rocks />
      <div style={{ position: "absolute", left: 850, top: 450 }}>
        <SpringWater power={0.7} />
      </div>
      {/* belalang emas turun dari langit */}
      {new Array(12).fill(0).map((_, i) => {
        const delay = i * 12;
        const t = Math.max(0, frame - delay);
        const fall = Math.min(1, t / 110);
        const landY = 860 + (i % 3) * 22;
        const y = interpolate(fall, [0, 1], [-140 - random(`gy${i}`) * 200, landY - 60]);
        const x = 540 + random(`gx${i}`) * 1120 + Math.sin(t / 14 + i) * 30 * (1 - fall);
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, rotate: `${(1 - fall) * Math.sin(t / 9 + i) * 20}deg` }}>
            <GoldLocust size={96} flap={fall < 1 ? Math.sin(t / 2) : 0} />
          </div>
        );
      })}
      <Twinkle seed="glt" n={16} top={120} height={700} />
    </AbsoluteFill>
  );
};

// Jejak kaki di tanah berbatu, dekat mata air (tanpa kaki/tubuh)
export const StompArt: React.FC = () => (
  <div style={{ position: "relative", width: 560, height: 480 }}>
    <div style={{ position: "absolute", left: 20, top: 20 }}>
      <SpringWater power={1} w={520} />
    </div>
    <div style={{ position: "absolute", left: 120, top: 420, opacity: 0.6 }}>
      <Footprint size={60} />
    </div>
  </div>
);
