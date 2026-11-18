import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Clouds, LightRays, Moon, Sea, Stars, Sun, calmSea, Gulls } from "../components/nature";
import { Banner, Footprint } from "../components/objects";
import { colors } from "../theme";
import { clamp, type SceneProps } from "./common";

// Kisah Nabi Musa & laut yang terbelah. Adab: tidak ada manusia/nabi yang digambar,
// begitu pula Fir'aun dan pasukannya (cukup panji, debu, derap). Tongkat tidak digambar
// dipegang siapa pun; pukulan ke laut berupa kilatan cahaya. Tanpa zoom/geser kamera.

// ---------- Ornamen ----------

const Sparkles: React.FC<{ n?: number; seed: string; color?: string; top?: number; height?: number }> = ({
  n = 12,
  seed,
  color = colors.gold,
  top = 100,
  height = 450,
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
              left: 120 + random(`${seed}x${i}`) * 1680,
              top: top + random(`${seed}y${i}`) * height,
              fontSize: 36,
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

const Pyramid: React.FC<{ x: number; y: number; w: number; dark?: boolean }> = ({ x, y, w, dark }) => (
  <svg width={w} height={w * 0.62} viewBox="0 0 100 62" style={{ position: "absolute", left: x, top: y - w * 0.62 }}>
    <path d="M0 62 L50 0 L100 62 Z" fill={dark ? "#8A6A48" : "#E2B56B"} />
    <path d="M50 0 L100 62 L60 62 Z" fill="#000" opacity={0.15} />
    {[14, 28, 42].map((h) => (
      <line key={h} x1={50 - (h * 50) / 62} y1={h} x2={50 + (h * 50) / 62} y2={h} stroke="#000" strokeOpacity={0.08} strokeWidth={0.8} />
    ))}
  </svg>
);

// Istana bertiang tinggi (bangunan saja, tanpa orang)
const PillarPalace: React.FC<{ x: number; y: number; dark?: boolean }> = ({ x, y, dark }) => {
  const wall = dark ? "#6E5A7A" : "#F1DDB0";
  const pillar = dark ? "#857095" : "#FFF1CF";
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 640, height: 50, background: dark ? "#5A4766" : "#D9B878", borderRadius: 8 }} />
      <div style={{ position: "absolute", left: 30, top: -60, width: 580, height: 70, background: wall, clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }} />
      {new Array(7).fill(0).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: 30 + i * 92, top: 50, width: 44, height: 300, background: pillar, borderRadius: 6, boxShadow: "inset -10px 0 0 rgba(0,0,0,0.08)" }} />
      ))}
      <div style={{ position: "absolute", left: -20, top: 350, width: 680, height: 40, background: dark ? "#5A4766" : "#D9B878", borderRadius: 8 }} />
    </div>
  );
};

const DustCloud: React.FC<{ x: number; y: number; scale?: number; seed: string }> = ({ x, y, scale = 1, seed }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: x, top: y, scale: `${scale}` }}>
      {new Array(9).fill(0).map((_, i) => {
        const r = 70 + random(`${seed}r${i}`) * 70;
        const puff = Math.sin(frame / 12 + i) * 10;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: i * 70 - r / 2,
              top: -r / 2 + Math.sin(i * 2.1) * 30 + puff,
              width: r + puff,
              height: r + puff,
              borderRadius: "50%",
              background: "rgba(205,170,120,0.7)",
            }}
          />
        );
      })}
    </div>
  );
};

const BannerRow: React.FC<{ y: number; scale: number; count: number; colorsList: string[]; drift: number }> = ({
  y,
  scale,
  count,
  colorsList,
  drift,
}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {new Array(count).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 120 + i * (1700 / count) + drift,
            top: y + Math.abs(Math.sin(frame / 5 + i)) * -8,
            scale: `${scale}`,
            transformOrigin: "0 100%",
          }}
        >
          <Banner color={colorsList[i % colorsList.length]} wave={Math.sin(frame / 6 + i) * 10} />
        </div>
      ))}
    </>
  );
};

// Dinding air yang tinggi seperti gunung (satu sisi)
const WaterWall: React.FC<{ side: "left" | "right"; open: number }> = ({ side, open }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const edge = interpolate(open, [0, 1], [width / 2, side === "left" ? 690 : 1230]);
  const pts: string[] = [];
  for (let yy = 120; yy <= 1080; yy += 40) {
    const wob = Math.sin(yy / 60 + frame / 8) * 14;
    pts.push(`${edge + (side === "left" ? wob : -wob)},${yy}`);
  }
  const outerX = side === "left" ? 0 : width;
  const points = `${outerX},120 ${pts.join(" ")} ${outerX},1080`;
  const id = `ww-${side}`;
  return (
    <svg width={width} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8FE0F2" />
          <stop offset="0.35" stopColor={colors.sea} />
          <stop offset="1" stopColor={colors.seaDeep} />
        </linearGradient>
      </defs>
      <polygon points={points} fill={`url(#${id})`} />
      {/* buih di puncak dinding air */}
      {new Array(10).fill(0).map((_, i) => {
        const x = side === "left" ? (i / 10) * edge : edge + (i / 10) * (width - edge);
        return <circle key={i} cx={x + 20} cy={128 + Math.sin(frame / 6 + i) * 6} r={22} fill="#FFFFFF" opacity={0.85} />;
      })}
    </svg>
  );
};

const WallFish: React.FC<{ side: "left" | "right"; open: number }> = ({ side, open }) => {
  const frame = useCurrentFrame();
  if (open < 0.6) return null;
  return (
    <>
      {[0, 1, 2, 3].map((i) => {
        const range = side === "left" ? [60, 560] : [1360, 1860];
        const t = ((frame * 1.4 + i * 140) % (range[1] - range[0]));
        const x = range[0] + t;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: 330 + i * 150, opacity: interpolate(open, [0.6, 1], [0, 0.9], clamp) }}>
            <svg width={70} height={36} viewBox="0 0 70 36">
              <ellipse cx={30} cy={18} rx={26} ry={13} fill={i % 2 ? "#FFB347" : "#FFE07A"} />
              <path d="M54 18 L70 6 L70 30 Z" fill={i % 2 ? "#FF9A1F" : "#F5C842"} />
              <circle cx={16} cy={15} r={3} fill="#2A2A3A" />
            </svg>
          </div>
        );
      })}
    </>
  );
};

const SeaFloorPath: React.FC<{ open: number; steps?: number; stepFrom?: number }> = ({ open, steps = 0, stepFrom = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 960 - 280 * open,
          top: 120,
          width: 560 * open,
          height: 960,
          background: "linear-gradient(#F0D9A6, #E2BE7E)",
          clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)",
        }}
      />
      {new Array(steps).fill(0).map((_, i) => {
        const t = i / Math.max(1, steps - 1);
        const appear = interpolate(frame, [stepFrom + i * 8, stepFrom + i * 8 + 8], [0, 1], clamp);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 940 + (i % 2 ? 26 : -26) * (1 - t * 0.6),
              top: 1000 - t * 820,
              opacity: appear,
              scale: `${1 - t * 0.7}`,
            }}
          >
            <Footprint flip={i % 2 === 1} size={50} />
          </div>
        );
      })}
    </>
  );
};

// ---------- Adegan ----------

// Negeri Mesir: piramida, istana bertiang, sungai, pohon kurma (egypt / egyptDark)
export const EgyptScene: React.FC<SceneProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const dark = scene.visual === "egyptDark";
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: dark ? "linear-gradient(#3B2E5A, #9A6B6B 70%)" : "linear-gradient(#7EC8F0, #FBE7B8 75%)" }} />
      {!dark && <Sun x={1620} y={190} r={95} />}
      {dark && <Stars count={30} seed="eg" />}
      <Clouds count={3} speed={0.3} seed={dark ? "egd" : "eg"} maxY={240} />
      {dark && (
        // awan gelap bergerak lambat
        <>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: ((frame * 0.8 + i * 700) % 2400) - 400,
                top: 120 + i * 60,
                width: 520,
                height: 120,
                borderRadius: 80,
                background: "rgba(40,30,60,0.5)",
              }}
            />
          ))}
        </>
      )}
      <Pyramid x={1100} y={720} w={520} dark={dark} />
      <Pyramid x={1450} y={740} w={360} dark={dark} />
      <PillarPalace x={260} y={360} dark={dark} />
      <div style={{ position: "absolute", left: -200, top: 740, width: 2400, height: 500, background: dark ? "#6B5040" : colors.sand }} />
      {/* sungai berkilau */}
      <div style={{ position: "absolute", left: -100, top: 900, width: 2200, height: 90, background: dark ? "#2E4C8C" : "#5FB8DC", borderRadius: 40 }} />
      {new Array(12).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: ((frame * 2 + i * 180) % 2200) - 100,
            top: 925 + (i % 3) * 16,
            width: 60,
            height: 6,
            borderRadius: 3,
            background: "rgba(255,255,255,0.6)",
          }}
        />
      ))}
      {/* panji di atap istana berkibar */}
      {[0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", left: 300 + i * 520, top: 160, scale: "0.7" }}>
          <Banner color={dark ? "#7A2E3A" : "#C0392B"} wave={Math.sin(frame / 6 + i) * 10} />
        </div>
      ))}
      {!dark && <Sparkles n={6} seed="egs" top={150} height={200} color="#FFF4C2" />}
    </AbsoluteFill>
  );
};

// Malam hari: jejak kaki berjalan menjauh di bawah bintang
export const NightRoadScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const steps = 16;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#0F1440, #2C3477 75%)" }} />
      <Stars count={90} seed="nr" />
      <Moon x={1500} y={190} r={80} />
      <div style={{ position: "absolute", left: -300, top: 700, width: 1500, height: 700, borderRadius: "50%", background: "#3A3560" }} />
      <div style={{ position: "absolute", left: 600, top: 680, width: 1900, height: 760, borderRadius: "50%", background: "#443D6B" }} />
      {/* pyramid kecil di kejauhan (Mesir ditinggalkan) */}
      <div style={{ opacity: 0.5 }}>
        <Pyramid x={180} y={720} w={240} dark />
      </div>
      {new Array(steps).fill(0).map((_, i) => {
        const t = i / (steps - 1);
        const appear = interpolate(frame, [i * 9, i * 9 + 9], [0, 1], clamp);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 420 + t * 1100 + (i % 2) * 34,
              top: 960 - t * 230,
              opacity: appear * 0.85,
              scale: `${1 - t * 0.55}`,
              rotate: "75deg",
              filter: "brightness(1.6)",
            }}
          >
            <Footprint flip={i % 2 === 1} size={56} />
          </div>
        );
      })}
      <Sparkles n={10} seed="nrs" color="#FFF4C2" top={60} height={380} />
    </AbsoluteFill>
  );
};

// Pasukan mengejar: hanya debu, panji-panji, dan matahari terbit
export const DustArmyScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const sunY = interpolate(frame, [0, 300], [640, 470], clamp);
  const drift = interpolate(frame, [0, 400], [-120, 120], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#6C6FB8, #F4A97A 55%, #FFE2A6 80%)" }} />
      <Sun x={1500} y={sunY} r={120} color="#FFD27A" />
      <LightRays color="rgba(255,230,170,0.2)" />
      <div style={{ position: "absolute", left: -200, top: 640, width: 2400, height: 600, background: "#D9A95E" }} />
      <DustCloud x={160 + drift} y={590} scale={1.2} seed="d1" />
      <DustCloud x={900 + drift} y={610} scale={1} seed="d2" />
      <BannerRow y={430} scale={0.55} count={9} colorsList={["#7A2E3A", "#4A3A6A", "#8A5A2A"]} drift={drift} />
      <BannerRow y={520} scale={0.75} count={7} colorsList={["#A53B3B", "#5B4A8A"]} drift={drift * 1.3} />
      <DustCloud x={-100 + drift * 1.5} y={760} scale={1.6} seed="d3" />
      <DustCloud x={1100 + drift * 1.5} y={790} scale={1.4} seed="d4" />
      {/* butiran pasir beterbangan */}
      {new Array(26).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: ((frame * (4 + random(`da${i}`) * 3) + random(`db${i}`) * 2200) % 2200) - 150,
            top: 620 + random(`dc${i}`) * 400,
            width: 9,
            height: 4,
            borderRadius: 2,
            background: "rgba(140,90,40,0.5)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

// Tepi laut saat fajar: jejak kaki berhenti di pantai, debu di kejauhan
export const SeaShoreScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#5E6BB0, #F4A97A 50%, #FFE2A6 75%)" }} />
      <Sun x={1400} y={400} r={110} color="#FFD27A" />
      <Gulls count={3} />
      <Sea layers={calmSea(470)} speed={1.2} />
      {/* pantai pasir di bawah */}
      <div style={{ position: "absolute", left: -300, top: 800, width: 2600, height: 600, borderRadius: "50%", background: colors.sand }} />
      {/* buih ombak di bibir pantai */}
      {new Array(8).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: i * 260 + Math.sin(frame / 15 + i) * 20,
            top: 810 + Math.sin(frame / 10 + i) * 8,
            width: 200,
            height: 22,
            borderRadius: 11,
            background: "rgba(255,255,255,0.75)",
          }}
        />
      ))}
      {new Array(10).fill(0).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: 820 + (i % 2) * 40, top: 1050 - i * 22, scale: `${1 - i * 0.05}`, opacity: 0.8 }}>
          <Footprint flip={i % 2 === 1} size={44} />
        </div>
      ))}
      {/* debu pasukan di kejauhan kiri */}
      <div style={{ opacity: 0.75 }}>
        <DustCloud x={-80 + Math.sin(frame / 30) * 20} y={780} scale={0.9} seed="sh" />
      </div>
    </AbsoluteFill>
  );
};

// Kilatan cahaya memukul laut, gelombang melingkar (seaStrike) / laut mulai terbelah (seaSplit)
export const SeaStrikeScene: React.FC<SceneProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const split = scene.visual === "seaSplit";
  const open = split ? spring({ frame: frame - 5, fps, config: { damping: 30, mass: 3 } }) : 0;
  const flash = split ? 0 : interpolate(frame, [20, 28, 60], [0, 1, 0], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#5E8FD0, #FFE2A6 80%)" }} />
      <Sun x={1500} y={260} r={100} color="#FFE08A" />
      <LightRays color="rgba(255,240,190,0.22)" />
      {!split && (
        <>
          <Sea layers={calmSea(430)} speed={1.4} />
          {/* lingkaran gelombang dari titik pukulan */}
          {[0, 1, 2, 3].map((i) => {
            const p = ((frame - 24) / 70 + i / 4) % 1;
            if (frame < 24) return null;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 960 - 60 - p * 500,
                  top: 640 - 20 - p * 120,
                  width: 120 + p * 1000,
                  height: 40 + p * 240,
                  borderRadius: "50%",
                  border: "6px solid rgba(255,255,255,0.8)",
                  opacity: 1 - p,
                }}
              />
            );
          })}
          {/* berkas cahaya turun ke laut */}
          <div
            style={{
              position: "absolute",
              left: 960 - 30,
              top: 0,
              width: 60,
              height: 640,
              background: "linear-gradient(rgba(255,255,255,0), rgba(255,250,220,0.95))",
              opacity: flash,
            }}
          />
          <AbsoluteFill style={{ background: "#FFFFFF", opacity: flash * 0.35 }} />
        </>
      )}
      {split && (
        <>
          <SeaFloorPath open={open} />
          <WaterWall side="left" open={open} />
          <WaterWall side="right" open={open} />
          <WallFish side="left" open={open} />
          <WallFish side="right" open={open} />
        </>
      )}
      <Sparkles n={14} seed={split ? "ss" : "st"} top={80} height={360} color="#FFFFFF" />
    </AbsoluteFill>
  );
};

// Jalan kering di antara dua dinding air, jejak kaki berjalan menyeberang (seaPath)
export const SeaPathScene: React.FC<SceneProps> = () => (
  <AbsoluteFill>
    <AbsoluteFill style={{ background: "linear-gradient(#6FB2E8, #FFF0C8 80%)" }} />
    <Sun x={960} y={150} r={80} color="#FFE08A" />
    <LightRays color="rgba(255,240,190,0.25)" />
    <SeaFloorPath open={1} steps={16} stepFrom={10} />
    <WaterWall side="left" open={1} />
    <WaterWall side="right" open={1} />
    <WallFish side="left" open={1} />
    <WallFish side="right" open={1} />
    <Sparkles n={10} seed="sp" top={60} height={200} color="#FFFFFF" />
  </AbsoluteFill>
);

// Laut kembali menutup: dinding air runtuh, panji-panji hanyut (tanpa sosok)
export const SeaCloseScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const close = spring({ frame: frame - 5, fps, config: { damping: 30, mass: 3 } });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#5B6E9A, #C9D6E8 80%)" }} />
      <Clouds count={4} speed={0.5} seed="sc" maxY={260} />
      <SeaFloorPath open={1 - close} />
      <WaterWall side="left" open={1 - close} />
      <WaterWall side="right" open={1 - close} />
      {/* percikan besar di tengah */}
      {new Array(14).fill(0).map((_, i) => {
        const p = interpolate(frame, [15, 70], [0, 1], clamp);
        const a = (i / 14) * Math.PI;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 960 + Math.cos(a) * 420 * p - 20,
              top: 520 - Math.sin(a) * 300 * p + p * p * 200,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.85)",
              opacity: 1 - p,
            }}
          />
        );
      })}
      {/* panji-panji hanyut terbawa ombak */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 560 + i * 380 + Math.sin(frame / 20 + i) * 30,
            top: interpolate(frame, [30, 160], [500, 760], clamp) + Math.sin(frame / 10 + i) * 12,
            rotate: `${70 + i * 15}deg`,
            opacity: interpolate(frame, [30, 60, 160, 200], [0, 0.9, 0.9, 0], clamp),
            scale: "0.6",
          }}
        >
          <Banner color={["#7A2E3A", "#4A3A6A", "#8A5A2A"][i]} />
        </div>
      ))}
      <div style={{ opacity: close }}>
        <Sea layers={calmSea(760)} speed={2} />
      </div>
    </AbsoluteFill>
  );
};

// Laut tenang kembali, matahari terang, burung camar (seaCalm) / pantai seberang yang aman (farShore)
export const SeaCalmScene: React.FC<SceneProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const far = scene.visual === "farShore";
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#69BDF0, #EAF7FF 75%)" }} />
      <Sun x={far ? 1600 : 960} y={far ? 180 : 230} r={100} />
      <LightRays color="rgba(255,240,190,0.2)" />
      <Clouds count={3} speed={0.35} seed={far ? "fs" : "cs"} maxY={240} />
      <Gulls count={4} />
      <Sea layers={calmSea(far ? 520 : 600)} speed={0.8} />
      {far && (
        <>
          <div style={{ position: "absolute", left: 700, top: 760, width: 1800, height: 700, borderRadius: "50%", background: colors.sand }} />
          {new Array(12).fill(0).map((_, i) => {
            const appear = interpolate(frame, [i * 8, i * 8 + 8], [0, 1], clamp);
            return (
              <div key={i} style={{ position: "absolute", left: 1000 + i * 70, top: 900 + (i % 2) * 30 - i * 6, opacity: appear, rotate: "80deg" }}>
                <Footprint flip={i % 2 === 1} size={46} />
              </div>
            );
          })}
          {/* pohon kurma di seberang */}
          <div style={{ position: "absolute", left: 1640, top: 560, width: 24, height: 260, background: "#8B5A2B", borderRadius: 12 }} />
          {[-140, -100, -50, 0, 50, 100, 140].map((a) => (
            <div
              key={a}
              style={{
                position: "absolute",
                left: 1652,
                top: 565,
                width: 140,
                height: 30,
                borderRadius: "0 60px 0 60px",
                background: "#5BAE5F",
                rotate: `${a + Math.sin(frame / 25) * 4}deg`,
                transformOrigin: "0 50%",
              }}
            />
          ))}
        </>
      )}
      <Sparkles n={10} seed={far ? "fss" : "css"} top={300} height={250} color="#FFF8D8" />
    </AbsoluteFill>
  );
};

// Ilustrasi kecil untuk pembuka: laut terbelah dengan jalan di tengah
export const SplitSeaArt: React.FC = () => {
  const frame = useCurrentFrame();
  const wob = (i: number) => Math.sin(frame / 8 + i) * 8;
  return (
    <svg width={760} height={520} viewBox="0 0 760 520" style={{ overflow: "visible" }}>
      <rect x={0} y={60} width={760} height={460} rx={40} fill="#BFE6F5" />
      <path d={`M0 520 L0 100 Q120 ${80 + wob(1)} 300 100 L320 520 Z`} fill={colors.sea} />
      <path d={`M760 520 L760 100 Q640 ${80 + wob(2)} 460 100 L440 520 Z`} fill={colors.sea} />
      <path d="M320 520 L360 100 L400 100 L440 520 Z" fill="#F0D9A6" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={40 + i * 60} cy={100 + wob(i)} r={18} fill="#FFF" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={480 + i * 60} cy={100 + wob(i + 3)} r={18} fill="#FFF" />
      ))}
    </svg>
  );
};
