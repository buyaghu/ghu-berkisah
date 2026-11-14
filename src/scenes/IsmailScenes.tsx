import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Clouds, LightRays, Moon, Stars, Sun } from "../components/nature";
import { Footprint, Mountain } from "../components/objects";
import { colors } from "../theme";
import { clamp, type SceneProps } from "./common";

// Kisah Nabi Ibrahim & Nabi Ismail. Adab: tidak ada manusia/nabi yang digambar,
// tidak ada pisau atau adegan penyembelihan. Visual: padang pasir, jejak kaki, tenda,
// langit malam, bukit fajar, cahaya, dan seekor domba. Tanpa zoom/geser kamera.

// ---------- Ornamen ----------

const Dunes: React.FC<{ tint?: string; dark?: number }> = ({ tint = "#E8C27A", dark = 0 }) => (
  <>
    <div style={{ position: "absolute", left: -300, top: 640, width: 1500, height: 700, borderRadius: "50%", background: "#D9A95E" }} />
    <div style={{ position: "absolute", left: 700, top: 600, width: 1700, height: 760, borderRadius: "50%", background: tint }} />
    <div style={{ position: "absolute", left: -200, top: 820, width: 2400, height: 600, borderRadius: "50%", background: "#F0D08E" }} />
    {dark > 0 && <AbsoluteFill style={{ background: `rgba(20,24,70,${dark})` }} />}
  </>
);

const Palm: React.FC<{ x: number; y: number; h?: number; seed?: number }> = ({ x, y, h = 300, seed = 0 }) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame / 25 + seed) * 4;
  return (
    <div style={{ position: "absolute", left: x, top: y - h }}>
      <div style={{ position: "absolute", left: 0, top: 40, width: 26, height: h, background: "#8B5A2B", borderRadius: 12, rotate: "4deg" }} />
      <div style={{ position: "absolute", left: 13, top: 40, rotate: `${sway}deg`, transformOrigin: "0 0" }}>
        {[-150, -110, -60, -20, 20, 60, 110, 150].map((a) => (
          <div
            key={a}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 150,
              height: 34,
              borderRadius: "0 60px 0 60px",
              background: a % 20 === 0 ? colors.leafDark : "#5BAE5F",
              rotate: `${a}deg`,
              transformOrigin: "0 50%",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Tent: React.FC<{ x: number; y: number; w?: number; color?: string; glow?: number }> = ({
  x,
  y,
  w = 420,
  color = "#B5651D",
  glow = 0,
}) => (
  <div style={{ position: "absolute", left: x, top: y }}>
    <svg width={w} height={w * 0.62} viewBox="0 0 420 260" style={{ overflow: "visible" }}>
      {/* tenda lebar (kain di atas tiang), bukan bangunan */}
      <line x1={70} y1={120} x2={70} y2={260} stroke="#6B4423" strokeWidth={8} />
      <line x1={350} y1={120} x2={350} y2={260} stroke="#6B4423" strokeWidth={8} />
      <path d="M0 250 L30 130 Q110 70 210 110 Q310 70 390 130 L420 250 Z" fill={color} />
      <path d="M210 110 Q310 70 390 130 L420 250 L330 250 Z" fill="#000" opacity={0.13} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${60 + i * 100} 118 L${50 + i * 105} 250`} stroke="#F3D9A8" strokeWidth={7} opacity={0.45} />
      ))}
      <path d="M160 250 Q210 150 260 250 Z" fill={glow > 0 ? `rgba(255,214,120,${0.4 + glow * 0.6})` : "#5A3210"} />
      <path d="M0 250 L420 250" stroke="#7A4A1E" strokeWidth={6} />
    </svg>
    {glow > 0 && (
      <div
        style={{
          position: "absolute",
          left: w / 2 - 120,
          top: w * 0.62 - 120,
          width: 240,
          height: 160,
          borderRadius: "50%",
          background: "radial-gradient(rgba(255,210,120,0.55), rgba(255,210,120,0))",
          opacity: glow,
        }}
      />
    )}
  </div>
);

const Twinkles: React.FC<{ n?: number; seed: string; color?: string; top?: number; height?: number }> = ({
  n = 14,
  seed,
  color = colors.gold,
  top = 100,
  height = 450,
}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {new Array(n).fill(0).map((_, i) => {
        const tw = 0.5 + 0.5 * Math.sin(frame / 9 + i * 1.9);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 150 + random(`${seed}x${i}`) * 1600,
              top: top + random(`${seed}y${i}`) * height,
              fontSize: 38,
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

// Domba (kibasy) besar dengan bulu bergelombang, tanpa adegan sembelihan
export const Ram: React.FC<{ size?: number }> = ({ size = 520 }) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 14) * 4;
  const blink = frame % 110 < 5 ? 0.15 : 1;
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 500 400" style={{ overflow: "visible", translate: `0px ${bob}px` }}>
      {/* kaki */}
      {[140, 190, 320, 370].map((x) => (
        <rect key={x} x={x} y={280} width={26} height={100} rx={12} fill="#5B4636" />
      ))}
      {/* badan berbulu */}
      {new Array(14).fill(0).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return <circle key={i} cx={260 + Math.cos(a) * 130} cy={210 + Math.sin(a) * 75} r={58} fill="#FBF6EC" />;
      })}
      <ellipse cx={260} cy={210} rx={150} ry={95} fill="#FFFDF7" />
      {/* kepala */}
      <ellipse cx={95} cy={170} rx={62} ry={74} fill="#E9DCCB" />
      {/* tanduk melingkar */}
      <path d="M120 120 C175 95 190 175 140 185 C110 190 105 160 128 155" stroke="#B08A5E" strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d="M70 118 C40 100 25 150 50 165" stroke="#9C7A52" strokeWidth={18} fill="none" strokeLinecap="round" />
      {/* mata & hidung domba */}
      <ellipse cx={78} cy={160} rx={8} ry={9 * blink} fill="#3B2A1E" />
      <ellipse cx={62} cy={210} rx={12} ry={7} fill="#B98F77" />
      {/* telinga */}
      <ellipse cx={150} cy={140} rx={30} ry={13} fill="#D8C6B0" transform="rotate(25 150 140)" />
    </svg>
  );
};

// ---------- Adegan ----------

// Padang pasir luas, matahari, angin membawa pasir
export const DesertScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#7EC8F0, #F6E3B4 75%)" }} />
      <Sun x={1500} y={220} r={110} />
      <LightRays color="rgba(255,236,170,0.18)" />
      <Clouds count={3} speed={0.3} seed="ds" maxY={220} />
      <div style={{ position: "absolute", left: 120, top: 360, opacity: 0.55 }}>
        <Mountain width={700} color="#A99BB0" />
      </div>
      <Dunes />
      <Palm x={1500} y={760} h={320} seed={1} />
      <Palm x={1640} y={790} h={260} seed={2} />
      {/* butiran pasir terbawa angin */}
      {new Array(30).fill(0).map((_, i) => {
        const x = ((frame * (3 + random(`sx${i}`) * 3) + random(`s0${i}`) * 2200) % 2200) - 150;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: 650 + random(`sy${i}`) * 380,
              width: 8,
              height: 3,
              borderRadius: 2,
              background: "rgba(150,100,50,0.45)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Jejak kaki muncul satu per satu di pasir, menuju cakrawala bercahaya
export const FootprintsScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const steps = 12;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#FFD9A0, #F6E3B4 60%)" }} />
      <Sun x={1450} y={430} r={150} color="#FFE6A0" />
      <LightRays color="rgba(255,240,190,0.25)" />
      <Dunes />
      {new Array(steps).fill(0).map((_, i) => {
        const t = i / (steps - 1);
        const appear = interpolate(frame, [i * 10, i * 10 + 10], [0, 1], clamp);
        const x = 520 + t * 880 + (i % 2) * 40;
        const y = 850 - t * 260;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, opacity: appear, scale: `${1 - t * 0.55}`, rotate: "65deg" }}>
            <Footprint flip={i % 2 === 1} size={60} />
          </div>
        );
      })}
      <Twinkles n={8} seed="fp" top={250} height={300} />
    </AbsoluteFill>
  );
};

// Tenda di oase: siang, malam berbintang, atau fajar
export const TentScene: React.FC<SceneProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const mode = scene.visual; // tent | tentNight | tentDawn
  const night = mode === "tentNight";
  const dawn = mode === "tentDawn";
  const sky = night
    ? "linear-gradient(#141A46, #2F3A7A 70%)"
    : dawn
      ? "linear-gradient(#5E6BB0, #F4A97A 55%, #FFE2A6 80%)"
      : "linear-gradient(#7EC8F0, #E9F6FF 75%)";
  const sunY = interpolate(frame, [0, 240], [600, 470], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: sky }} />
      {night && <Stars count={70} seed="tn" />}
      {night && <Moon x={1520} y={200} />}
      {dawn && <Sun x={1450} y={sunY} r={120} color="#FFD27A" />}
      {!night && !dawn && <Sun x={1600} y={180} r={95} />}
      {!night && <Clouds count={3} speed={0.3} seed="tt" maxY={240} />}
      <Dunes dark={night ? 0.55 : dawn ? 0.15 : 0} />
      {/* air oase */}
      <div
        style={{
          position: "absolute",
          left: 1080,
          top: 860,
          width: 560,
          height: 110,
          borderRadius: "50%",
          background: night ? "#2E4C8C" : "#6CC3E0",
          boxShadow: `inset 0 0 30px rgba(255,255,255,${0.25 + Math.sin(frame / 12) * 0.1})`,
        }}
      />
      <Palm x={1120} y={850} h={330} seed={3} />
      <Palm x={1560} y={870} h={280} seed={4} />
      <Tent x={420} y={560} w={460} color={night ? "#7A4A1E" : "#B5651D"} glow={night ? 1 : dawn ? 0.4 : 0} />
      <Tent x={800} y={640} w={300} color={night ? "#6B5030" : "#C98B3E"} />
      {night && <Twinkles n={10} seed="tnw" color="#FFF4C2" top={60} height={380} />}
      {!night && !dawn && (
        // burung kecil terbang
        <>
          {[0, 1, 2].map((i) => {
            const x = ((frame * 2.2 + i * 220) % 2300) - 200;
            const flap = Math.sin(frame / 4 + i) * 10;
            return (
              <svg key={i} width={60} height={30} style={{ position: "absolute", left: x, top: 260 + i * 40 }} viewBox="0 0 60 30">
                <path d={`M0 15 Q15 ${5 + flap} 30 15 Q45 ${5 + flap} 60 15`} stroke="#3B3B5A" strokeWidth={4} fill="none" />
              </svg>
            );
          })}
        </>
      )}
    </AbsoluteFill>
  );
};

// Langit malam penuh bintang, bulan sabit, awan lembut: suasana mimpi
export const NightDreamScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 35%, #3B3F8F, #12163E 75%)" }} />
      <Stars count={110} seed="nd" />
      <Moon x={960} y={300} r={110} />
      {/* lingkaran cahaya lembut di sekitar bulan */}
      {[0, 1, 2].map((i) => {
        const p = ((frame / 90 + i / 3) % 1);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 960 - 120 - p * 260,
              top: 300 - 120 - p * 260,
              width: 240 + p * 520,
              height: 240 + p * 520,
              borderRadius: "50%",
              border: "4px solid rgba(255,240,190,0.5)",
              opacity: 1 - p,
            }}
          />
        );
      })}
      {/* awan malam melayang */}
      {[0, 1, 2, 3].map((i) => {
        const x = ((frame * 0.6 + i * 560) % 2400) - 300;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: 560 + (i % 2) * 90,
              width: 360,
              height: 90,
              borderRadius: 60,
              background: "rgba(200,205,255,0.18)",
            }}
          />
        );
      })}
      <div style={{ position: "absolute", left: -200, top: 820, width: 2400, height: 600, borderRadius: "50%", background: "#1E2452" }} />
      <Tent x={760} y={700} w={380} color="#3A2A4A" glow={0.8} />
      <Twinkles n={12} seed="ndw" color="#FFF4C2" top={80} height={420} />
    </AbsoluteFill>
  );
};

// Bukit di waktu fajar: matahari terbit perlahan, cahaya lembut
export const DawnHillsScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sunY = interpolate(frame, [0, 300], [760, 520], clamp);
  const flowers = spring({ frame: frame - 20, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#6C7BC4, #F7B48A 50%, #FFE7B0 75%)" }} />
      <Sun x={960} y={sunY} r={140} color="#FFD27A" />
      <LightRays color="rgba(255,230,170,0.22)" />
      <Clouds count={3} speed={0.25} seed="dh" maxY={260} />
      <div style={{ position: "absolute", left: -150, top: 420, opacity: 0.8 }}>
        <Mountain width={900} color="#9C7F8E" />
      </div>
      <div style={{ position: "absolute", left: 1100, top: 470, opacity: 0.8, scale: "-1 1" }}>
        <Mountain width={850} color="#8E7486" />
      </div>
      <div style={{ position: "absolute", left: -300, top: 740, width: 1500, height: 700, borderRadius: "50%", background: "#8DBB6E" }} />
      <div style={{ position: "absolute", left: 800, top: 760, width: 1600, height: 700, borderRadius: "50%", background: "#7DB363" }} />
      {new Array(18).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 120 + random(`fl${i}`) * 1700,
            top: 840 + random(`fly${i}`) * 180,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: i % 3 === 0 ? "#FFF3B0" : i % 3 === 1 ? "#FFC0CB" : "#FFFFFF",
            scale: `${flowers}`,
            boxShadow: "0 0 0 6px rgba(255,255,255,0.35)",
          }}
        />
      ))}
      <Twinkles n={8} seed="dhw" top={160} height={300} color="#FFF8D8" />
    </AbsoluteFill>
  );
};

// Cahaya dari langit: berkas sinar & lingkaran cahaya (tanpa sosok apa pun)
export const CallLightScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const open = spring({ frame, fps, config: { damping: 20 } });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#2E5AA8, #8FC7F0 55%, #FFF3D6 90%)" }} />
      <Clouds count={4} speed={0.3} seed="cl" maxY={300} />
      {new Array(9).fill(0).map((_, i) => {
        const a = -40 + i * 10;
        const pulse = 0.5 + 0.5 * Math.sin(frame / 15 + i);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 960 - 40,
              top: -100,
              width: 80,
              height: 1300 * open,
              background: "linear-gradient(rgba(255,248,220,0.85), rgba(255,248,220,0))",
              rotate: `${a}deg`,
              transformOrigin: "50% 0",
              opacity: 0.25 + pulse * 0.3,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 960 - 160,
          top: 60,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(#FFFFFF, rgba(255,240,190,0))",
          scale: `${open * (1 + Math.sin(frame / 20) * 0.05)}`,
        }}
      />
      <div style={{ position: "absolute", left: -200, top: 840, width: 2400, height: 600, borderRadius: "50%", background: "#8DBB6E" }} />
      <Twinkles n={18} seed="clw" top={120} height={600} color="#FFFFFF" />
    </AbsoluteFill>
  );
};

// Seekor domba besar di padang rumput yang bercahaya
export const RamScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 6, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#8FD0F5, #EAF7FF 70%)" }} />
      <Sun x={1600} y={190} r={100} />
      <LightRays color="rgba(255,240,190,0.2)" />
      <Clouds count={3} speed={0.35} seed="rm" maxY={260} />
      <div style={{ position: "absolute", left: -300, top: 660, width: 1500, height: 700, borderRadius: "50%", background: "#8DCB72" }} />
      <div style={{ position: "absolute", left: 700, top: 620, width: 1700, height: 760, borderRadius: "50%", background: "#7CC47A" }} />
      <div
        style={{
          position: "absolute",
          left: 960 - 330,
          top: 380,
          width: 660,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(rgba(255,245,200,0.8), rgba(255,245,200,0))",
          opacity: pop,
        }}
      />
      <div style={{ position: "absolute", left: 960 - 280, top: 430, scale: `${pop}`, transformOrigin: "50% 100%" }}>
        <Ram size={560} />
      </div>
      {new Array(10).fill(0).map((_, i) => {
        const x = 300 + random(`gr${i}`) * 1400;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: 900 + random(`gry${i}`) * 100,
              width: 0,
              height: 0,
              borderLeft: "14px solid transparent",
              borderRight: "14px solid transparent",
              borderBottom: `${40 + Math.sin(frame / 10 + i) * 4}px solid #5DA453`,
            }}
          />
        );
      })}
      <Twinkles n={12} seed="rmw" top={300} height={350} />
    </AbsoluteFill>
  );
};
