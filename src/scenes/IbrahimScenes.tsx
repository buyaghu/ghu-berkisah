import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Clouds, IslamicPattern, LightRays, Moon, Stars, Sun } from "../components/nature";
import { arabicFont, colors, titleFont } from "../theme";
import { clamp, type SceneProps } from "./common";

// Kisah Nabi Ibrahim & api. Adab: tidak ada manusia/nabi yang digambar.
// Patung digambar sebagai batu polos TANPA wajah. Tanpa zoom/geser kamera:
// variasi lewat adegan berbeda & ornamen animasi.

// ---------- Ornamen ----------

// Satu lidah api (SVG), bergoyang sendiri
export const Flame: React.FC<{
  size: number;
  seed?: number;
  cool?: number; // 0 = api panas (oranye), 1 = cahaya sejuk (biru-putih)
}> = ({ size, seed = 0, cool = 0 }) => {
  const frame = useCurrentFrame();
  const f = frame + seed * 17;
  const sx = 1 + Math.sin(f / 4.3) * 0.06;
  const sy = 1 + Math.sin(f / 3.1 + seed) * 0.1;
  const lean = Math.sin(f / 7 + seed) * 6;
  const outer = cool > 0 ? mix("#FF6A2B", "#8FD8FF", cool) : "#FF6A2B";
  const mid = cool > 0 ? mix("#FFA53A", "#C8F0FF", cool) : "#FFA53A";
  const inner = cool > 0 ? mix("#FFE36B", "#FFFFFF", cool) : "#FFE36B";
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 100 140"
      style={{ overflow: "visible", transformOrigin: "50% 100%", scale: `${sx} ${sy}`, rotate: `${lean}deg` }}
    >
      <path d="M50 0 C70 40 98 60 92 100 C88 128 66 140 50 140 C34 140 12 128 8 100 C2 60 30 40 50 0 Z" fill={outer} />
      <path d="M50 35 C64 62 82 78 78 106 C75 126 62 134 50 134 C38 134 25 126 22 106 C18 78 36 62 50 35 Z" fill={mid} />
      <path d="M50 70 C58 88 68 98 66 114 C64 126 57 130 50 130 C43 130 36 126 34 114 C32 98 42 88 50 70 Z" fill={inner} />
    </svg>
  );
};

const mix = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
};

// Api unggun besar: banyak lidah api + percikan
export const BigFire: React.FC<{ width: number; cool?: number; seed?: string }> = ({ width, cool = 0, seed = "bf" }) => {
  const frame = useCurrentFrame();
  const n = 9;
  return (
    <div style={{ position: "relative", width, height: width * 0.75, isolation: "isolate" }}>
      {new Array(n).fill(0).map((_, i) => {
        const t = i / (n - 1);
        const center = 1 - Math.abs(t - 0.5) * 2;
        const size = width * (0.22 + center * 0.28);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: t * width * 0.82 - size * 0.5 + width * 0.09,
              bottom: 0,
              zIndex: Math.round(center * 10),
            }}
          >
            <Flame size={size} seed={i * 3 + random(`${seed}${i}`) * 5} cool={cool} />
          </div>
        );
      })}
      {/* percikan */}
      {new Array(22).fill(0).map((_, i) => {
        const life = 60 + random(`${seed}l${i}`) * 50;
        const p = ((frame + random(`${seed}p${i}`) * life) % life) / life;
        const x = width * (0.2 + random(`${seed}x${i}`) * 0.6) + Math.sin(frame / 9 + i) * 20;
        return (
          <div
            key={`s${i}`}
            style={{
              position: "absolute",
              left: x,
              bottom: width * 0.25 + p * width * 0.7,
              width: 10,
              height: 10,
              borderRadius: 5,
              background: cool > 0.5 ? "#E6FAFF" : "#FFD25A",
              boxShadow: `0 0 12px ${cool > 0.5 ? "#9EE4FF" : "#FF9A3A"}`,
              opacity: 1 - p,
              zIndex: 20,
            }}
          />
        );
      })}
    </div>
  );
};

// Patung batu polos tanpa wajah
const Idol: React.FC<{ w: number; h: number; tone?: string }> = ({ w, h, tone = "#9A938A" }) => (
  <div style={{ position: "relative", width: w, height: h + 40 }}>
    <div
      style={{
        position: "absolute",
        left: w * 0.12,
        top: 0,
        width: w * 0.76,
        height: h,
        borderRadius: `${w * 0.38}px ${w * 0.38}px ${w * 0.08}px ${w * 0.08}px`,
        background: `linear-gradient(90deg, ${tone}, #B9B2A7 45%, ${tone})`,
        boxShadow: "inset -10px -8px 0 rgba(0,0,0,0.12)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: h - 4, width: w, height: 44, borderRadius: 8, background: "#7C6A55" }} />
  </div>
);

// Pecahan batu
const Shard: React.FC<{ s: number; rot: number }> = ({ s, rot }) => (
  <div
    style={{
      width: s,
      height: s * 0.7,
      background: "#A39C92",
      clipPath: "polygon(0 30%, 40% 0, 100% 20%, 85% 100%, 20% 90%)",
      rotate: `${rot}deg`,
    }}
  />
);

const DustMotes: React.FC<{ seed: string; color?: string; count?: number }> = ({ seed, color = "#FFE9B8", count = 26 }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  return (
    <AbsoluteFill>
      {new Array(count).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: random(`${seed}x${i}`) * width + Math.sin(frame / 30 + i) * 30,
            top: 120 + ((random(`${seed}y${i}`) * 800 - frame * (0.3 + random(`${seed}v${i}`) * 0.5) + 2000) % 800),
            width: 8,
            height: 8,
            borderRadius: 4,
            background: color,
            opacity: 0.55,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const OilLamp: React.FC<{ x: number; y: number; seed: number }> = ({ x, y, seed }) => (
  <div style={{ position: "absolute", left: x, top: y }}>
    <div style={{ position: "absolute", left: 6, top: -46 }}>
      <Flame size={34} seed={seed} />
    </div>
    <div style={{ width: 46, height: 20, borderRadius: "0 0 24px 24px", background: "#8B5A2B" }} />
  </div>
);

// Kuil batu: latar untuk adegan patung
const Temple: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: "linear-gradient(#F7C98B, #FBE6C2)" }} />
    <div style={{ position: "absolute", left: 160, top: 120, width: 1600, height: 90, background: "#C9A97A", borderRadius: 10 }} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        style={{ position: "absolute", left: 200 + i * 300, top: 200, width: 90, height: 560, background: "linear-gradient(90deg,#C9A97A,#E3C99C,#C9A97A)" }}
      />
    ))}
    <AbsoluteFill style={{ top: 760, background: "#D9B57E" }} />
    <AbsoluteFill style={{ top: 900, background: "#C79E64" }} />
    <IslamicPattern color="#8B5A2B" opacity={0.05} />
  </>
);

const smallIdols = [
  { x: 240, w: 150, h: 200 },
  { x: 470, w: 170, h: 250 },
  { x: 1290, w: 170, h: 240 },
  { x: 1530, w: 150, h: 190 },
];

// ---------- Adegan ----------

// Kuil dengan deretan patung batu yang diam
export const IdolsScene: React.FC<SceneProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mode = scene.visual;
  const broken = mode === "idolsBroken" || mode === "idolsAsk";
  const breakAt = mode === "idolsBroken" && scene.id === "04-hancur" ? 20 : -100;
  const shake = mode === "idolsBroken" ? Math.max(0, 1 - Math.abs(frame - breakAt) / 12) * Math.sin(frame * 2.5) * 10 : 0;
  return (
    <AbsoluteFill style={{ translate: `${shake}px 0px` }}>
      <Temple />
      <OilLamp x={120} y={720} seed={1} />
      <OilLamp x={1760} y={720} seed={4} />
      {/* patung besar di tengah */}
      <div style={{ position: "absolute", left: 790, top: 300 }}>
        <Idol w={340} h={430} tone="#8C857C" />
      </div>
      {smallIdols.map((s, i) => {
        const fall = broken ? interpolate(frame, [breakAt + i * 4, breakAt + i * 4 + 14], [0, 1], clamp) : 0;
        return (
          <React.Fragment key={i}>
            <div style={{ position: "absolute", left: s.x, top: 730 - s.h, opacity: 1 - fall }}>
              <Idol w={s.w} h={s.h} />
            </div>
            {broken &&
              new Array(6).fill(0).map((_, j) => {
                const tx = (random(`sh${i}${j}`) - 0.5) * 260;
                const land = 770 + random(`sy${i}${j}`) * 90;
                const y = interpolate(fall, [0, 1], [730 - s.h + j * 30, land]);
                return (
                  <div key={j} style={{ position: "absolute", left: s.x + s.w / 2 + tx * fall - 30, top: y, opacity: fall }}>
                    <Shard s={50 + random(`ss${i}${j}`) * 40} rot={random(`sr${i}${j}`) * 360 * fall} />
                  </div>
                );
              })}
          </React.Fragment>
        );
      })}
      {/* debu saat pecah */}
      {mode === "idolsBroken" &&
        new Array(14).fill(0).map((_, i) => {
          const p = interpolate(frame, [breakAt, breakAt + 70], [0, 1], clamp);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: smallIdols[i % 4].x + 40 + random(`dx${i}`) * 120 - p * 60,
                top: 640 - p * 120 * random(`dy${i}`),
                width: 90 + p * 120,
                height: 90 + p * 120,
                borderRadius: "50%",
                background: "#E8DCC6",
                opacity: (1 - p) * 0.7 * (p > 0 ? 1 : 0),
              }}
            />
          );
        })}
      {/* tanda tanya di sekitar patung besar */}
      {mode === "idolsAsk" &&
        [0, 1, 2].map((i) => {
          const s = spring({ frame: frame - 15 - i * 25, fps, config: { damping: 9 } });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: [700, 1170, 960][i],
                top: [260, 230, 150][i] + Math.sin(frame / 14 + i) * 12,
                fontFamily: titleFont,
                fontWeight: 700,
                fontSize: 130,
                color: [colors.maroon, "#E07A2E", colors.ink][i],
                scale: `${s}`,
              }}
            >
              ?
            </div>
          );
        })}
      {mode === "idolsAsk" && (
        <div
          style={{
            position: "absolute",
            left: 1120,
            top: 380,
            padding: "20px 40px",
            borderRadius: 40,
            background: colors.white,
            fontFamily: titleFont,
            fontSize: 70,
            color: "#B0A89C",
            opacity: interpolate(Math.sin(frame / 20), [-1, 1], [0.3, 1]),
            boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
          }}
        >
          . . .
        </div>
      )}
      <DustMotes seed={`im${mode}`} />
    </AbsoluteFill>
  );
};

// Patung lebih dekat (komposisi berbeda, bukan zoom): batu diam, sarang laba-laba, debu
export const IdolsCloseScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#E9B97A, #F8DFB5)" }} />
      <IslamicPattern color="#8B5A2B" opacity={0.06} />
      <AbsoluteFill style={{ top: 860, background: "#C79E64" }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 300 + i * 480, top: 860 - [520, 640, 500][i] - 40 }}>
          <Idol w={[300, 360, 290][i]} h={[520, 640, 500][i]} tone={["#9A938A", "#8C857C", "#A1998F"][i]} />
        </div>
      ))}
      {/* sarang laba-laba */}
      <svg width={260} height={260} style={{ position: "absolute", left: 1460, top: 120 }}>
        {[40, 80, 120, 160].map((r) => (
          <path key={r} d={`M0 ${r} Q ${r * 0.7} ${r * 0.7} ${r} 0`} stroke="#FFFFFF" strokeWidth={3} fill="none" opacity={0.7} />
        ))}
        {[0, 30, 60, 90].map((a) => (
          <line key={a} x1={0} y1={0} x2={Math.cos((a * Math.PI) / 180) * 200} y2={Math.sin((a * Math.PI) / 180) * 200} stroke="#FFFFFF" strokeWidth={3} opacity={0.7} />
        ))}
      </svg>
      {/* "zzz" diam */}
      {[0, 1, 2].map((i) => {
        const p = ((frame + i * 30) % 90) / 90;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 1020 + p * 120,
              top: 170 - p * 120,
              fontFamily: titleFont,
              fontWeight: 700,
              fontSize: 60 + i * 10,
              color: "#8C857C",
              opacity: 1 - p,
            }}
          >
            z
          </div>
        );
      })}
      <DustMotes seed="ic" count={34} />
    </AbsoluteFill>
  );
};

// Kota saat sepi: senja, jejak langkah menjauh
export const CityEmptyScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const dusk = interpolate(frame, [0, durationInFrames], [0, 0.6], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#FF9E6B, #FFD9A8)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(#3B2E6B, #A0618A)", opacity: dusk }} />
      <Sun x={1500} y={330 + dusk * 300} r={120} color="#FFB347" />
      <Clouds count={4} color="#FFE6CC" speed={0.4} seed="ce" />
      {/* rumah-rumah datar */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 60 + i * 270,
            bottom: 300,
            width: 220,
            height: 160 + (i % 3) * 60,
            background: ["#E2B88A", "#D9A877", "#EAC79E"][i % 3],
            borderRadius: 6,
          }}
        >
          <div style={{ position: "absolute", left: 80, bottom: 0, width: 60, height: 90, borderRadius: "30px 30px 0 0", background: "#8B5A2B" }} />
        </div>
      ))}
      <AbsoluteFill style={{ top: 780, background: "#D9B57E" }} />
      {/* jejak langkah menjauh, memudar */}
      {new Array(10).fill(0).map((_, i) => {
        const appear = interpolate(frame, [i * 8, i * 8 + 10], [0, 1], clamp);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 300 + i * 140,
              top: 880 + (i % 2) * 40,
              width: 34,
              height: 54,
              borderRadius: "50%",
              background: "#B58A55",
              opacity: appear * (1 - i * 0.07),
              rotate: "80deg",
            }}
          />
        );
      })}
      <DustMotes seed="ce" color="#FFF2D6" count={18} />
    </AbsoluteFill>
  );
};

// Langit & bumi ciptaan Allah: matahari, bulan, bintang, bukit, pohon
export const SkyEarthScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grow = spring({ frame, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(90deg, #1B1F4A 0%, #3A3F7A 35%, #7ECBF2 60%, #E8F6FF 100%)" }} />
      <AbsoluteFill style={{ clipPath: "inset(0 55% 0 0)" }}>
        <Stars count={50} seed="se" />
      </AbsoluteFill>
      <Moon x={330} y={230} />
      <Sun x={1560} y={220} r={120} />
      <Clouds count={3} speed={0.4} seed="se" maxY={200} />
      <LightRays color="rgba(255,240,190,0.18)" />
      <div style={{ position: "absolute", left: -200, top: 640, width: 1300, height: 700, borderRadius: "50%", background: "#7CC47A" }} />
      <div style={{ position: "absolute", left: 800, top: 600, width: 1500, height: 760, borderRadius: "50%", background: "#6CC56F" }} />
      {[260, 620, 1180, 1520].map((x, i) => (
        <div key={x} style={{ position: "absolute", left: x, top: 560 + (i % 2) * 40, scale: `${grow}`, transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", left: 50, top: 120, width: 30, height: 120, background: "#8B5A2B", borderRadius: 8 }} />
          <div style={{ width: 130, height: 150, borderRadius: "50%", background: colors.leafDark }} />
        </div>
      ))}
      {new Array(16).fill(0).map((_, i) => {
        const tw = 0.5 + 0.5 * Math.sin(frame / 8 + i * 1.7);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 200 + random(`sp${i}`) * 1500,
              top: 120 + random(`spy${i}`) * 450,
              fontSize: 40,
              color: colors.gold,
              opacity: tw,
              scale: `${0.6 + tw * 0.6}`,
            }}
          >
            ✦
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Bangunan untuk api: batu ditumpuk & kayu bakar (tanpa orang)
const Wall: React.FC<{ rows: number }> = ({ rows }) => (
  <div style={{ position: "relative", width: 1100, height: 300 }}>
    {new Array(5).fill(0).map((_, r) =>
      new Array(9).fill(0).map((__, c) => {
        const vis = r < rows ? 1 : 0;
        return (
          <div
            key={`${r}-${c}`}
            style={{
              position: "absolute",
              left: c * 122 + (r % 2) * 60 - 30,
              bottom: r * 58,
              width: 116,
              height: 54,
              borderRadius: 8,
              background: (r + c) % 2 ? "#8D7F6E" : "#9E8F7C",
              opacity: vis,
            }}
          />
        );
      }),
    )}
  </div>
);

const Logs: React.FC<{ n: number }> = ({ n }) => (
  <div style={{ position: "relative", width: 700, height: 160 }}>
    {new Array(n).fill(0).map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: 60 + (i % 5) * 110,
          bottom: Math.floor(i / 5) * 34,
          width: 200,
          height: 34,
          borderRadius: 17,
          background: i % 2 ? "#8B5A2B" : "#A0682F",
          rotate: `${(i % 3) * 8 - 8}deg`,
        }}
      />
    ))}
  </div>
);

export const FireBuildScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const rows = Math.floor(interpolate(frame, [10, durationInFrames * 0.75], [1, 5.99], clamp));
  const logs = Math.floor(interpolate(frame, [10, durationInFrames * 0.8], [2, 15], clamp));
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#E58A4E, #F7C98B)" }} />
      <Sun x={1600} y={260} r={110} color="#FFB347" />
      <Clouds count={4} color="#FFE0C2" speed={0.5} seed="fb" />
      <AbsoluteFill style={{ top: 780, background: "#C79E64" }} />
      <div style={{ position: "absolute", left: 410, top: 540 }}>
        <Wall rows={rows} />
      </div>
      <div style={{ position: "absolute", left: 610, top: 700 }}>
        <Logs n={logs} />
      </div>
      <DustMotes seed="fb" color="#FFE2BF" count={20} />
    </AbsoluteFill>
  );
};

// Api yang sangat besar. Untuk "fireCool": api berubah menjadi cahaya sejuk.
export const FireScene: React.FC<SceneProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const coolMode = scene.visual === "fireCool";
  const ignite = coolMode ? 1 : interpolate(frame, [0, 40], [0.35, 1], clamp);
  const cool = coolMode ? interpolate(frame, [10, 80], [0, 1], clamp) : 0;
  const cardIn = coolMode ? spring({ frame: frame - 70, fps, config: { damping: 13 } }) : 0;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#2A1430, #7A2E2E 70%, #C2552E)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(#173A66, #4FA3D9 70%, #CFEFFF)", opacity: cool }} />
      <AbsoluteFill style={{ opacity: 0.4 + cool * 0.6 }}>
        <Stars count={40} seed="fs" />
      </AbsoluteFill>
      {cool > 0 && (
        <AbsoluteFill style={{ opacity: cool * 0.8 }}>
          <LightRays color="rgba(220,250,255,0.22)" />
        </AbsoluteFill>
      )}
      {/* asap */}
      {new Array(8).fill(0).map((_, i) => {
        const p = ((frame * 0.6 + i * 40) % 320) / 320;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 700 + random(`sm${i}`) * 500 + p * 100,
              top: 420 - p * 420,
              width: 160 + p * 200,
              height: 160 + p * 200,
              borderRadius: "50%",
              background: cool > 0.5 ? "#FFFFFF" : "#5A3A3A",
              opacity: (1 - p) * 0.35 * (1 - cool * 0.6),
            }}
          />
        );
      })}
      {/* cahaya */}
      <div
        style={{
          position: "absolute",
          left: width / 2 - 600,
          top: 280,
          width: 1200,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(${cool > 0.5 ? "rgba(200,245,255,0.6)" : "rgba(255,170,60,0.55)"}, transparent 65%)`,
          opacity: 0.8 + Math.sin(frame / 5) * 0.1,
        }}
      />
      {/* tembok bangunan */}
      <div style={{ position: "absolute", left: 410, top: 640 }}>
        <Wall rows={3} />
      </div>
      <div style={{ position: "absolute", left: width / 2 - 450, top: 900 - 900 * 0.75 * ignite, transformOrigin: "50% 100%" }}>
        <BigFire width={900 * ignite} cool={cool} seed={coolMode ? "fc" : "ff"} />
      </div>
      <AbsoluteFill style={{ top: 900, background: cool > 0.5 ? "#5E7F8F" : "#4A2A20" }} />
      {/* butiran sejuk */}
      {coolMode &&
        new Array(30).fill(0).map((_, i) => {
          const y = ((frame * (1 + random(`cy${i}`)) + random(`cz${i}`) * 1080) % 1080) - 40;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: random(`cx${i}`) * width + Math.sin(frame / 20 + i) * 20,
                top: y,
                fontSize: 30 + random(`cs${i}`) * 20,
                color: "#FFFFFF",
                opacity: cool * 0.8,
              }}
            >
              ❄
            </div>
          );
        })}
      {coolMode && (
        <div
          style={{
            position: "absolute",
            left: width / 2 - 560,
            top: 120,
            width: 1120,
            textAlign: "center",
            background: "rgba(255,255,255,0.92)",
            borderRadius: 40,
            border: "6px solid #6FC3F0",
            padding: "16px 30px",
            scale: `${cardIn}`,
          }}
        >
          <div dir="rtl" style={{ fontFamily: arabicFont, fontSize: 64, lineHeight: 1.5, color: colors.maroon }}>
            يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ
          </div>
          <div style={{ fontFamily: titleFont, fontWeight: 600, fontSize: 36, color: colors.ink }}>
            “Wahai api, jadilah dingin dan keselamatan bagi Ibrahim”
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
