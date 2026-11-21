import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Clouds, Gulls, LightRays, Moon, Sea, Stars, Sun, calmSea } from "../components/nature";
import { Banner, Bird } from "../components/objects";
import { colors } from "../theme";
import { clamp, type SceneProps } from "./common";

// Kisah Nabi Musa & Khidir. Adab: tidak ada manusia/nabi yang digambar (termasuk pemuda, anak,
// penduduk, pemilik perahu). Kehadiran mereka lewat perahu, dinding, rumah, dan jejak.
// Tanpa zoom/geser kamera; gerak hanya pada ornamen (ombak, ikan, burung, kilau).

// ---------- Ornamen ----------

const Twinkle: React.FC<{ n?: number; seed: string; color?: string; top?: number; height?: number; left?: number; width?: number }> = ({
  n = 10,
  seed,
  color = colors.gold,
  top = 100,
  height = 400,
  left = 120,
  width = 1680,
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

export const Fish: React.FC<{ w?: number; color?: string; fin?: string; tail?: number }> = ({
  w = 160,
  color = "#FFB347",
  fin = "#FF8C1A",
  tail = 0,
}) => (
  <svg width={w} height={w * 0.55} viewBox="0 0 100 55">
    <ellipse cx={42} cy={27} rx={36} ry={19} fill={color} />
    <path d={`M74 27 L98 ${10 + tail} L98 ${44 - tail} Z`} fill={fin} />
    <path d="M36 9 Q46 0 56 10 Z" fill={fin} />
    <path d="M30 30 Q40 40 50 32" stroke={fin} strokeWidth={3} fill="none" opacity={0.6} />
    <circle cx={20} cy={22} r={5} fill="#fff" />
    <circle cx={19} cy={22} r={2.6} fill="#2A2A3A" />
  </svg>
);

const Basket: React.FC<{ w?: number }> = ({ w = 360 }) => (
  <svg width={w} height={w * 0.6} viewBox="0 0 200 120">
    <path d="M10 30 L190 30 L172 116 L28 116 Z" fill="#C9904E" />
    {[0, 1, 2, 3].map((r) => (
      <path key={r} d={`M${14 + r * 4} ${46 + r * 18} L${186 - r * 4} ${46 + r * 18}`} stroke="#9C6A33" strokeWidth={5} />
    ))}
    {new Array(9).fill(0).map((_, i) => (
      <path key={i} d={`M${24 + i * 19} 32 L${34 + i * 17} 114`} stroke="#A8743C" strokeWidth={4} />
    ))}
    <rect x={4} y={22} width={192} height={16} rx={8} fill="#B07A3E" />
  </svg>
);

// Batu besar di tepi laut
const BigRock: React.FC<{ x: number; y: number; w?: number }> = ({ x, y, w = 460 }) => (
  <svg width={w} height={w * 0.55} viewBox="0 0 200 110" style={{ position: "absolute", left: x, top: y }}>
    <path d="M8 108 C0 70 30 30 70 22 C100 4 150 10 172 40 C196 64 200 90 192 108 Z" fill="#8E8AA0" />
    <path d="M70 22 C100 4 150 10 172 40 C150 34 110 30 80 44 Z" fill="#A9A5BA" />
    <path d="M30 90 C60 80 90 84 120 96" stroke="#6F6B82" strokeWidth={4} fill="none" />
    <ellipse cx={140} cy={70} rx={14} ry={8} fill="#7C7890" />
  </svg>
);

// Dua laut yang bertemu: kiri biru muda, kanan biru tua, garis pertemuan berkilau
const TwoSeasWater: React.FC<{ y: number }> = ({ y }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const wave = (offset: number, amp: number, x0: number, x1: number) => {
    let d = `M${x0} ${height} L${x0} ${y}`;
    for (let x = x0; x <= x1; x += 40) d += ` L${x} ${y + Math.sin(x / 70 + frame / 14 + offset) * amp}`;
    return d + ` L${x1} ${height} Z`;
  };
  return (
    <svg width={width} height={height} style={{ position: "absolute", left: 0, top: 0 }}>
      <path d={wave(0, 10, 0, 980)} fill="#7FD8E8" />
      <path d={wave(2, 12, 940, width)} fill="#2A7FB8" />
      <path d={wave(1, 14, 0, 980).replace(`L0 ${y}`, `L0 ${y + 90}`)} fill="#5CC6DC" opacity={0.7} />
      <path d={wave(3, 14, 940, width).replace(`L940 ${y}`, `L940 ${y + 90}`)} fill="#1D6698" opacity={0.7} />
      {/* garis pertemuan */}
      {new Array(9).fill(0).map((_, i) => (
        <ellipse
          key={i}
          cx={960 + Math.sin(frame / 10 + i) * 14}
          cy={y + 30 + i * 42}
          rx={46 - i * 2}
          ry={7}
          fill="#FFFFFF"
          opacity={0.45 + 0.3 * Math.sin(frame / 8 + i)}
        />
      ))}
    </svg>
  );
};

// ---------- Adegan ----------

// Tempat bertemunya dua laut, dengan batu besar
export const TwoSeasScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#8ED3F5, #E6F7FF 70%)" }} />
      <Sun x={1560} y={200} r={95} />
      <LightRays color="rgba(255,240,190,0.18)" />
      <Clouds count={4} speed={0.4} seed="ts" maxY={240} />
      <TwoSeasWater y={520} />
      {/* daratan & batu di kiri bawah */}
      <div style={{ position: "absolute", left: -260, top: 830, width: 1200, height: 500, borderRadius: "50%", background: colors.sand }} />
      <BigRock x={260} y={640} w={480} />
      <Gulls count={3} />
      {/* ikan kecil berenang di kedua laut */}
      {[0, 1, 2].map((i) => {
        const t = ((frame * 1.6 + i * 300) % 900) / 900;
        return (
          <div key={i} style={{ position: "absolute", left: 1000 + t * 800, top: 760 + i * 80, opacity: 0.55, scale: "-1 1" }}>
            <Fish w={70} color="#9FE3FF" fin="#5CC6DC" />
          </div>
        );
      })}
      <Twinkle n={8} seed="ts" top={540} height={200} left={860} width={200} color="#FFFFFF" />
    </AbsoluteFill>
  );
};

// Ikan di dalam keranjang (bekal perjalanan)
export const FishBasketScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 10, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#FFE7B8, #FFF6E0 70%)" }} />
      <Sun x={1600} y={200} r={90} />
      <LightRays color="rgba(255,236,170,0.2)" />
      <div style={{ position: "absolute", left: -200, top: 820, width: 2400, height: 400, background: "#E9C98B" }} />
      {/* kain alas */}
      <div style={{ position: "absolute", left: 640, top: 810, width: 760, height: 70, borderRadius: "50%", background: "#E07BA6", opacity: 0.5 }} />
      <div style={{ position: "absolute", left: 780, top: 460 - pop * 40 + Math.sin(frame / 12) * 4, rotate: `${Math.sin(frame / 18) * 4}deg`, opacity: pop }}>
        <Fish w={300} tail={Math.sin(frame / 6) * 2} />
      </div>
      <div style={{ position: "absolute", left: 720, top: 560 }}>
        <Basket w={520} />
      </div>
      <Twinkle n={10} seed="fb" top={300} height={300} left={600} width={800} />
    </AbsoluteFill>
  );
};

// Ikan melompat ke laut; air melengkung seperti terowongan di jalannya
export const FishJumpScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [10, 70], [0, 1], clamp);
  const fx = 520 + t * 760;
  const fy = 640 - Math.sin(t * Math.PI) * 300;
  const arch = interpolate(frame, [60, 110], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#8ED3F5, #E6F7FF 70%)" }} />
      <Sun x={1600} y={190} r={90} />
      <Clouds count={3} speed={0.4} seed="fj" maxY={220} />
      <Sea layers={calmSea(600)} speed={0.8} />
      <div style={{ position: "absolute", left: -320, top: 800, width: 1100, height: 500, borderRadius: "50%", background: colors.sand }} />
      <BigRock x={120} y={620} w={420} />
      {/* lengkungan air seperti terowongan */}
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, opacity: arch }}>
        <path d="M1150 860 C1150 560 1650 560 1650 860 L1580 860 C1580 640 1220 640 1220 860 Z" fill="#7FD8E8" stroke="#FFFFFF" strokeWidth={8} />
        <path d="M1220 860 C1220 640 1580 640 1580 860 Z" fill="#0F5E86" opacity={0.55} />
      </svg>
      {arch > 0 && <Twinkle n={10} seed="fj" top={560} height={200} left={1150} width={500} color="#FFFFFF" />}
      {/* ikan */}
      {t < 1 && (
        <div style={{ position: "absolute", left: fx, top: fy, rotate: `${interpolate(t, [0, 1], [-30, 40])}deg`, scale: "-1 1" }}>
          <Fish w={170} tail={Math.sin(frame / 3) * 4} />
        </div>
      )}
      {/* percikan */}
      {frame > 66 &&
        new Array(10).fill(0).map((_, i) => {
          const p = interpolate(frame, [66, 100], [0, 1], clamp);
          const ang = (i / 10) * Math.PI;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 1290 + Math.cos(ang) * 140 * p,
                top: 640 - Math.sin(ang) * 160 * p + p * p * 120,
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "#FFFFFF",
                opacity: 1 - p,
              }}
            />
          );
        })}
    </AbsoluteFill>
  );
};

// Perahu kecil tanpa penumpang yang digambar
const Boat: React.FC<{ w?: number; hole?: boolean; dark?: boolean }> = ({ w = 640, hole, dark }) => (
  <svg width={w} height={w * 0.7} viewBox="0 0 300 210">
    <rect x={146} y={10} width={8} height={140} rx={3} fill="#7A4A2A" />
    <path d="M154 18 C220 50 226 120 154 146 Z" fill={dark ? "#B9AFC7" : "#FFF4DD"} stroke="#E3D3B3" strokeWidth={3} />
    {dark && <path d="M154 12 L190 22 L154 32 Z" fill="#3B2E4A" />}
    <path d="M10 150 L290 150 C276 196 240 206 150 206 C60 206 24 196 10 150 Z" fill={dark ? "#6E4A35" : "#A9653A"} />
    {[164, 180].map((y) => (
      <path key={y} d={`M${18 + (y - 160)} ${y} L${282 - (y - 160)} ${y}`} stroke="#7A4A2A" strokeWidth={4} />
    ))}
    {hole && (
      <>
        <rect x={180} y={158} width={40} height={20} fill="#2B1C14" rx={3} />
        <rect x={178} y={156} width={44} height={4} fill="#7A4A2A" />
      </>
    )}
  </svg>
);

export const BoatScene: React.FC<SceneProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bird = scene.visual === "boatBird";
  const hole = scene.visual === "boatHole";
  const sea = calmSea(700);
  const bob = Math.sin(frame / 15) * 10;
  // burung kecil terbang turun ke tepi perahu lalu mematuk air
  const land = spring({ frame: frame - 15, fps, config: { damping: 14 } });
  const peck = Math.max(0, Math.sin(Math.max(0, frame - 50) / 6));
  const plankT = interpolate(frame, [15, 45], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: hole ? "linear-gradient(#9DBFD8, #E1EEF5 70%)" : "linear-gradient(#7CCBF2, #D8F2FF 70%)" }} />
      <Sun x={350} y={210} r={100} />
      <Clouds count={5} speed={0.5} seed="bt" maxY={260} />
      {!bird && <Gulls count={3} />}
      <Sea layers={sea.slice(0, 2)} speed={0.9} />
      <div style={{ position: "absolute", left: 640, top: 330 + bob, rotate: `${Math.sin(frame / 20) * 2.5}deg` }}>
        <Boat w={640} hole={hole} />
      </div>
      <Sea layers={sea.slice(2)} speed={0.9} />
      {hole && (
        <>
          {/* papan yang dicabut, mengapung */}
          <div
            style={{
              position: "absolute",
              left: 1120 + plankT * 260,
              top: 760 + Math.sin(frame / 10) * 8 - Math.sin(plankT * Math.PI) * 80,
              width: 160,
              height: 24,
              borderRadius: 6,
              background: "#A9653A",
              rotate: `${plankT * 25}deg`,
            }}
          />
          <Twinkle n={4} seed="bh" top={560} height={80} left={980} width={140} color="#FFFFFF" />
        </>
      )}
      {bird && (
        <>
          <div
            style={{
              position: "absolute",
              left: interpolate(land, [0, 1], [1500, 1170]),
              top: interpolate(land, [0, 1], [180, 470 + bob]) + peck * 30,
              rotate: `${peck * 35}deg`,
            }}
          >
            <Bird size={90} flap={land < 0.95 ? Math.sin(frame / 2) : 0} color="#5B7FD6" />
          </div>
          {/* tetes air di paruh */}
          {peck > 0.8 && (
            <div style={{ position: "absolute", left: 1205, top: 600 + bob, width: 14, height: 18, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: "#BFF0FF" }} />
          )}
          {/* lingkaran riak kecil */}
          {[0, 1].map((i) => {
            const r = ((frame - 50 + i * 20) % 40) / 40;
            return frame > 50 ? (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 1215 - r * 60,
                  top: 712 - r * 12,
                  width: r * 120,
                  height: r * 24,
                  borderRadius: "50%",
                  border: "3px solid rgba(255,255,255,0.8)",
                  opacity: 1 - r,
                }}
              />
            ) : null;
          })}
        </>
      )}
    </AbsoluteFill>
  );
};

// Perahu-perahu dengan panji gelap: tanda raja yang merampas perahu (tanpa orang)
export const KingBoatsScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const sea = calmSea(640);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#5C5F8E, #C9A9B8 70%)" }} />
      <Clouds count={5} speed={0.3} seed="kb" maxY={300} />
      <Sea layers={sea.slice(0, 2)} speed={0.7} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 980 + i * 300, top: 380 + i * 30 + Math.sin(frame / 14 + i) * 8, scale: `${0.7 - i * 0.12}` }}>
          <Boat w={420} dark />
          <div style={{ position: "absolute", left: 220, top: -70 }}>
            <Banner color="#3B2E4A" wave={Math.sin(frame / 6 + i) * 10} />
          </div>
        </div>
      ))}
      {/* perahu kecil berlubang yang dibiarkan */}
      <div style={{ position: "absolute", left: 220, top: 500 + Math.sin(frame / 15) * 8 }}>
        <Boat w={380} hole />
      </div>
      <Sea layers={sea.slice(2)} speed={0.7} />
    </AbsoluteFill>
  );
};

// Padang rumput yang sunyi (tanpa sosok)
export const MeadowScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#F3B88A, #FCE3C2 65%)" }} />
      <Sun x={1450} y={430} r={120} color="#FFD27A" />
      <Clouds count={3} speed={0.3} seed="md" maxY={260} />
      <div style={{ position: "absolute", left: -300, top: 600, width: 1400, height: 600, borderRadius: "50%", background: "#8FCB7E" }} />
      <div style={{ position: "absolute", left: 700, top: 640, width: 1700, height: 600, borderRadius: "50%", background: "#7CBB6C" }} />
      {/* jalan setapak */}
      <div style={{ position: "absolute", left: 760, top: 640, width: 400, height: 460, background: "#E6C98F", clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)" }} />
      {/* rumput bergoyang */}
      {new Array(40).fill(0).map((_, i) => {
        const x = random(`mg${i}`) * 1920;
        const y = 760 + random(`mh${i}`) * 300;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 6,
              height: 34,
              borderRadius: 3,
              background: "#4E9C4A",
              transformOrigin: "50% 100%",
              rotate: `${Math.sin(frame / 14 + i) * 12}deg`,
            }}
          />
        );
      })}
      {/* kupu-kupu kecil */}
      {[0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", left: 400 + i * 900 + Math.sin(frame / 25 + i) * 120, top: 520 + Math.cos(frame / 18 + i) * 60, fontSize: 40, color: i ? colors.pink : colors.lavender }}>
          {Math.sin(frame / 3 + i) > 0 ? "ᐯ" : "ᐱ"}
        </div>
      ))}
    </AbsoluteFill>
  );
};

// Rumah dengan jendela bercahaya: keluarga yang beriman (tanpa sosok)
export const HomeLightScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const glow = 0.7 + 0.3 * Math.sin(frame / 15);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(${colors.night}, #3F4A8A 70%)` }} />
      <Stars count={50} seed="hl" />
      <Moon x={1550} y={200} r={70} />
      <div style={{ position: "absolute", left: -200, top: 820, width: 2400, height: 400, background: "#2F5A4A" }} />
      <div style={{ position: "absolute", left: 700, top: 470 }}>
        <div style={{ position: "absolute", left: 0, top: 120, width: 520, height: 260, background: "#E9C79A", borderRadius: 10 }} />
        <div style={{ position: "absolute", left: -40, top: 0, width: 600, height: 140, background: "#9C4A3A", clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }} />
        {[60, 360].map((x) => (
          <div key={x} style={{ position: "absolute", left: x, top: 180, width: 100, height: 90, background: "#FFE08A", borderRadius: 8, boxShadow: `0 0 ${60 * glow}px ${20 * glow}px rgba(255,220,120,0.6)` }} />
        ))}
        <div style={{ position: "absolute", left: 215, top: 230, width: 90, height: 150, background: "#7A4A2A", borderRadius: "45px 45px 0 0" }} />
      </div>
      {/* hati-hati kecil melayang: kasih sayang */}
      {new Array(6).fill(0).map((_, i) => {
        const t = ((frame + i * 25) % 150) / 150;
        return (
          <div key={i} style={{ position: "absolute", left: 760 + i * 80 + Math.sin(frame / 20 + i) * 20, top: 470 - t * 260, fontSize: 40, color: colors.pink, opacity: Math.sin(t * Math.PI) }}>
            ♥
          </div>
        );
      })}
      <Twinkle n={8} seed="hl2" top={120} height={300} />
    </AbsoluteFill>
  );
};

// Negeri kecil: rumah-rumah tertutup (penduduk tidak digambar)
export const VillageScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#A9D8F0, #F7E6C4 70%)" }} />
      <Sun x={300} y={200} r={90} />
      <Clouds count={4} speed={0.4} seed="vl" maxY={240} />
      <div style={{ position: "absolute", left: -200, top: 760, width: 2400, height: 400, background: "#E2C08A" }} />
      {new Array(7).fill(0).map((_, i) => {
        const w = 200 + random(`vw${i}`) * 80;
        const h = 180 + random(`vh${i}`) * 120;
        const x = 80 + i * 260;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: 780 - h, width: w, height: h, background: i % 2 ? "#E8B987" : "#D9A574", borderRadius: 8 }}>
            <div style={{ position: "absolute", left: w / 2 - 30, top: h - 100, width: 60, height: 100, background: "#7A4A2A", borderRadius: "30px 30px 0 0" }} />
            <div style={{ position: "absolute", left: 20, top: 30, width: 46, height: 40, background: "#8A6A4A", borderRadius: 6 }} />
            <div style={{ position: "absolute", left: -10, top: -16, width: w + 20, height: 22, background: "#B47E4E", borderRadius: 6 }} />
          </div>
        );
      })}
      {/* debu jalan */}
      {new Array(16).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: ((frame * (2 + random(`vd${i}`) * 2) + random(`ve${i}`) * 2200) % 2200) - 150,
            top: 820 + random(`vf${i}`) * 200,
            width: 8,
            height: 3,
            borderRadius: 2,
            background: "rgba(140,90,40,0.45)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

// Dinding: miring (wallLean), tegak kembali (wallFixed), harta di bawahnya (wallTreasure)
export const WallScene: React.FC<SceneProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mode = scene.visual;
  const fix = mode === "wallLean" ? 0 : mode === "wallFixed" ? spring({ frame: frame - 15, fps, config: { damping: 15 } }) : 1;
  const lean = interpolate(fix, [0, 1], [-9, 0]) + (mode === "wallLean" ? Math.sin(frame / 10) * 0.6 : 0);
  const treasure = mode === "wallTreasure";
  const glow = 0.6 + 0.4 * Math.sin(frame / 10);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: treasure ? "linear-gradient(#F5C98A, #FFF1D6 70%)" : "linear-gradient(#A9D8F0, #F7E6C4 70%)" }} />
      <Sun x={1550} y={200} r={90} />
      <Clouds count={3} speed={0.4} seed="wl" maxY={240} />
      <div style={{ position: "absolute", left: -200, top: 760, width: 2400, height: 400, background: "#D9B57E" }} />
      {/* tanah di bawah dinding, terbuka saat menunjukkan harta */}
      {treasure && (
        <>
          <div style={{ position: "absolute", left: 640, top: 800, width: 640, height: 220, borderRadius: 30, background: "#B48A58" }} />
          <div style={{ position: "absolute", left: 830, top: 850, width: 260, height: 140 }}>
            <div style={{ position: "absolute", inset: 0, background: "#9C5B31", borderRadius: 14, border: "8px solid #E8B64A" }} />
            <div style={{ position: "absolute", left: -8, top: -40, width: 276, height: 60, background: "#B06A3A", borderRadius: "40px 40px 8px 8px", border: "8px solid #E8B64A" }} />
            <div style={{ position: "absolute", left: 110, top: 30, width: 40, height: 46, background: "#FFD24A", borderRadius: 8 }} />
            <div style={{ position: "absolute", left: -60, top: -80, width: 380, height: 260, borderRadius: "50%", background: `rgba(255,220,110,${0.25 * glow})` }} />
          </div>
          <Twinkle n={12} seed="wt" top={760} height={220} left={680} width={560} />
        </>
      )}
      {/* dinding bata */}
      <div
        style={{
          position: "absolute",
          left: 560,
          top: treasure ? 380 : 400,
          width: 800,
          height: treasure ? 380 : 360,
          transformOrigin: "0% 100%",
          rotate: `${lean}deg`,
          background: "#C98A5A",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {new Array(9).fill(0).map((_, r) =>
          new Array(9).fill(0).map((__, c) => (
            <div
              key={`${r}-${c}`}
              style={{
                position: "absolute",
                left: c * 100 - (r % 2) * 50,
                top: r * 44,
                width: 94,
                height: 38,
                background: (r + c) % 3 ? "#D99C6A" : "#C8875A",
                borderRadius: 4,
              }}
            />
          )),
        )}
        {mode === "wallLean" && <div style={{ position: "absolute", left: 300, top: 60, width: 8, height: 200, background: "#5E3A22", rotate: "20deg" }} />}
      </div>
      {mode === "wallFixed" && fix > 0.8 && <Twinkle n={10} seed="wf" top={340} height={420} left={560} width={800} />}
    </AbsoluteFill>
  );
};

// Ilustrasi pembuka: ikan melompat keluar dari keranjang
export const FishBasketArt: React.FC = () => {
  const frame = useCurrentFrame();
  const jump = Math.abs(Math.sin(frame / 22));
  return (
    <div style={{ position: "relative", width: 560, height: 520 }}>
      <div style={{ position: "absolute", left: 150, top: 200 - jump * 150, rotate: `${-20 + jump * 30}deg` }}>
        <Fish w={240} tail={Math.sin(frame / 4) * 3} />
      </div>
      <div style={{ position: "absolute", left: 40, top: 260 }}>
        <Basket w={460} />
      </div>
      <Twinkle n={6} seed="fba" top={0} height={250} left={0} width={500} />
    </div>
  );
};
