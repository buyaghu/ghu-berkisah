import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Clouds, Gulls, LightRays, Moon, Stars, Sun } from "../components/nature";
import { Bird } from "../components/objects";
import { colors } from "../theme";
import { clamp, type SceneProps } from "./common";

// Kisah Nabi Yusuf 'alaihissalam. Adab (CLAUDE.md): TIDAK ada nabi, saudara, raja, pembesar,
// maupun manusia lain yang digambar — termasuk siluet, bayangan, dan tangan. Kehadiran mereka
// cukup lewat benda (sumur, baju, karung, timbangan), hewan (unta, sapi), kota, dan cahaya.
// Tanpa zoom/geser kamera: gerak hanya pada ornamen (bintang berkedip, debu melayang,
// bulir bergoyang, cahaya berdenyut).

const ACCENT = "#C7873F";

// ---------- Ornamen ----------

const Twinkle: React.FC<{
  n?: number;
  seed: string;
  color?: string;
  top?: number;
  height?: number;
  left?: number;
  width?: number;
}> = ({ n = 10, seed, color = colors.gold, top = 100, height = 400, left = 120, width = 1680 }) => {
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

// Debu padang pasir yang mengambang
const Dust: React.FC<{ count?: number; seed?: string; top?: number; height?: number }> = ({
  count = 22,
  seed = "d",
  top = 760,
  height = 260,
}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {new Array(count).fill(0).map((_, i) => {
        const span = 2300;
        const x = ((random(`${seed}x${i}`) * span + frame * (1.4 + random(`${seed}s${i}`) * 2.4)) % span) - 190;
        const y = top + random(`${seed}y${i}`) * height + Math.sin(frame / 18 + i) * 10;
        const s = 6 + random(`${seed}r${i}`) * 12;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: s,
              height: s * 0.45,
              borderRadius: "50%",
              background: "rgba(173,126,70,0.38)",
            }}
          />
        );
      })}
    </>
  );
};

// Bintang bersudut delapan (dipakai untuk mimpi sebelas bintang)
const StarShape: React.FC<{ size?: number; color?: string; opacity?: number }> = ({
  size = 90,
  color = "#FFE9A3",
  opacity = 1,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity, overflow: "visible" }}>
    <path
      d="M50 2 L61 34 L95 34 L67 54 L78 88 L50 67 L22 88 L33 54 L5 34 L39 34 Z"
      fill={color}
      stroke="#FFF7DC"
      strokeWidth={3}
    />
  </svg>
);

// Unta bermuatan (hewan boleh digambar; TANPA penunggang)
const Camel: React.FC<{ w?: number; step?: number; load?: boolean; color?: string }> = ({
  w = 300,
  step = 0,
  load = true,
  color = "#D7A062",
}) => {
  const sway = Math.sin(step) * 6;
  const legA = Math.sin(step) * 16;
  const legB = Math.sin(step + Math.PI) * 16;
  return (
    <svg width={w} height={w * 0.82} viewBox="0 0 220 180" style={{ overflow: "visible" }}>
      {/* kaki belakang & depan */}
      <g stroke={color} strokeWidth={11} strokeLinecap="round">
        <path d={`M72 118 L${66 + legA * 0.5} 166`} />
        <path d={`M92 118 L${98 + legB * 0.5} 166`} />
        <path d={`M150 116 L${146 + legB * 0.5} 166`} />
        <path d={`M166 116 L${172 + legA * 0.5} 166`} />
      </g>
      {/* badan */}
      <path
        d="M58 118 C44 108 46 86 64 80 C78 56 104 56 116 76 C130 54 158 56 168 80 C186 86 188 108 174 118 Z"
        fill={color}
      />
      {/* punuk */}
      <path d="M78 80 C86 50 112 50 118 78 Z" fill="#C68F52" />
      <path d="M124 78 C132 52 158 54 164 80 Z" fill="#C68F52" />
      {/* leher & kepala */}
      <path
        d={`M172 96 C196 92 200 60 196 ${40 + sway * 0.4} C194 26 206 22 212 ${30 + sway * 0.4} C216 40 210 52 206 62 C202 82 196 102 180 110 Z`}
        fill={color}
      />
      <ellipse cx={208} cy={30 + sway * 0.4} rx={13} ry={10} fill="#E0AE73" />
      <circle cx={204} cy={26 + sway * 0.4} r={2.8} fill={colors.ink} />
      <path d={`M198 ${20 + sway * 0.4} L204 ${12 + sway * 0.4} L208 ${20 + sway * 0.4} Z`} fill="#C68F52" />
      {/* ekor */}
      <path d="M58 100 C44 104 42 118 48 128" stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" />
      {/* muatan karung */}
      {load && (
        <>
          <rect x={86} y={52} width={66} height={34} rx={12} fill="#9C6A33" />
          <rect x={96} y={40} width={46} height={26} rx={10} fill="#B8814A" />
          <path d="M86 68 L152 68" stroke="#7A4F24" strokeWidth={5} />
        </>
      )}
    </svg>
  );
};

// Sapi (untuk mimpi raja): gemuk atau kurus
const Cow: React.FC<{ w?: number; thin?: boolean; bob?: number }> = ({ w = 170, thin, bob = 0 }) => {
  const body = thin ? "#CFC6B4" : "#F6E3BE";
  const spot = thin ? "#B6AC98" : "#D9B98A";
  return (
    <svg width={w} height={w * 0.78} viewBox="0 0 170 132" style={{ overflow: "visible" }}>
      <g stroke={body} strokeWidth={thin ? 7 : 11} strokeLinecap="round">
        <path d={`M48 ${thin ? 86 : 92} L46 124`} />
        <path d={`M70 ${thin ? 86 : 92} L72 124`} />
        <path d={`M112 ${thin ? 86 : 92} L110 124`} />
        <path d={`M130 ${thin ? 86 : 92} L134 124`} />
      </g>
      {thin ? (
        <path d="M40 70 C40 50 70 44 90 46 C116 44 140 50 142 70 C142 86 118 90 90 90 C62 90 40 86 40 70 Z" fill={body} />
      ) : (
        <ellipse cx={92} cy={66} rx={56} ry={34} fill={body} />
      )}
      {/* tulang rusuk saat kurus */}
      {thin &&
        [0, 1, 2].map((i) => (
          <path key={i} d={`M${66 + i * 16} 54 L${64 + i * 16} 82`} stroke={spot} strokeWidth={4} opacity={0.8} />
        ))}
      {!thin && (
        <>
          <ellipse cx={74} cy={56} rx={16} ry={11} fill={spot} />
          <ellipse cx={110} cy={74} rx={13} ry={9} fill={spot} />
        </>
      )}
      {/* kepala */}
      <g style={{ transformOrigin: "34px 64px", rotate: `${Math.sin(bob) * 4}deg` }}>
        <ellipse cx={30} cy={62} rx={22} ry={thin ? 16 : 19} fill={body} />
        <ellipse cx={16} cy={68} rx={12} ry={9} fill="#FFD7C2" />
        <circle cx={26} cy={54} r={3.2} fill={colors.ink} />
        <path d="M44 46 C50 38 56 40 54 50 Z" fill="#EAD9B6" />
        <path d="M16 46 C10 38 4 40 8 50 Z" fill="#EAD9B6" />
      </g>
      {/* ekor */}
      <path d="M148 56 C160 60 162 76 156 86" stroke={body} strokeWidth={5} fill="none" strokeLinecap="round" />
    </svg>
  );
};

// Bulir gandum: hijau & segar, atau kering
const GrainEar: React.FC<{ h?: number; dry?: boolean; bend?: number }> = ({ h = 190, dry, bend = 0 }) => {
  const stem = dry ? "#C2A368" : "#6CB85C";
  const grain = dry ? "#D8BE86" : "#8FD36F";
  return (
    <svg
      width={h * 0.4}
      height={h}
      viewBox="0 0 60 150"
      style={{ overflow: "visible", transformOrigin: "30px 150px", rotate: `${bend}deg` }}
    >
      <path d="M30 150 L30 60" stroke={stem} strokeWidth={6} strokeLinecap="round" />
      {new Array(6).fill(0).map((_, i) => {
        const y = 24 + i * 16;
        return (
          <g key={i}>
            <ellipse cx={18} cy={y} rx={11} ry={8} fill={grain} transform={`rotate(-28 18 ${y})`} />
            <ellipse cx={42} cy={y} rx={11} ry={8} fill={grain} transform={`rotate(28 42 ${y})`} />
          </g>
        );
      })}
      <ellipse cx={30} cy={14} rx={10} ry={13} fill={grain} />
      {!dry && <path d="M30 70 C14 64 10 50 16 42" stroke={stem} strokeWidth={5} fill="none" strokeLinecap="round" />}
    </svg>
  );
};

// Karung gandum
const Sack: React.FC<{ w?: number; open?: boolean }> = ({ w = 190, open }) => (
  <svg width={w} height={w * 0.95} viewBox="0 0 190 180">
    <path d="M30 176 C18 120 24 70 50 44 L140 44 C166 70 172 120 160 176 Z" fill="#CBA06A" />
    <path d="M50 44 C62 28 128 28 140 44 Z" fill="#B8884F" />
    <path d="M44 120 C80 110 112 110 148 120" stroke="#A87B46" strokeWidth={6} fill="none" />
    <path d="M40 150 C78 140 114 140 152 150" stroke="#A87B46" strokeWidth={6} fill="none" />
    {open && (
      <>
        <ellipse cx={95} cy={40} rx={46} ry={14} fill="#F0D79B" />
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={i} cx={64 + i * 16} cy={34 + (i % 2) * 6} rx={7} ry={5} fill="#E6C47E" />
        ))}
      </>
    )}
  </svg>
);

// ---------- Adegan ----------

// Mimpi sebelas bintang, matahari, dan bulan yang menunduk (QS. Yusuf: 4)
export const StarsDreamScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  // semua perlahan turun sedikit: isyarat sujud, tanpa figur apa pun
  const bow = interpolate(frame, [30, 140], [0, 1], clamp);
  const starPos = [
    [250, 250],
    [430, 170],
    [620, 300],
    [800, 190],
    [1010, 150],
    [1180, 290],
    [1360, 200],
    [1520, 330],
    [340, 430],
    [760, 460],
    [1250, 470],
  ];
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(${colors.night}, #3A2E6B 60%, #6B4A7A 100%)` }} />
      <Stars count={70} seed="yd" />
      {/* bukit pasir gelap di bawah */}
      <div style={{ position: "absolute", left: -300, top: 860, width: 1600, height: 500, borderRadius: "50%", background: "#3B2F57" }} />
      <div style={{ position: "absolute", left: 800, top: 900, width: 1600, height: 500, borderRadius: "50%", background: "#332850" }} />
      {/* matahari kecil & bulan */}
      <div style={{ position: "absolute", left: 0, top: bow * 70 }}>
        <Sun x={640} y={620} r={70} color="#FFC94A" />
      </div>
      <div style={{ position: "absolute", left: 0, top: bow * 70 }}>
        <Moon x={1280} y={610} r={72} />
      </div>
      {/* sebelas bintang */}
      {starPos.map(([x, y], i) => {
        const tw = 0.6 + 0.4 * Math.sin(frame / 8 + i * 1.3);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y + bow * (60 + i * 4) + Math.sin(frame / 16 + i) * 6,
              opacity: 0.75 + tw * 0.25,
              scale: `${0.85 + tw * 0.25}`,
            }}
          >
            <StarShape size={86} />
          </div>
        );
      })}
      {/* kilau lembut */}
      <Twinkle n={14} seed="ydt" top={120} height={520} color="#FFF3C4" />
      <LightRays color="rgba(255,235,170,0.12)" />
    </AbsoluteFill>
  );
};

// Sumur batu di padang pasir (QS. Yusuf: 10, 15) — tanpa seorang pun digambar
export const WellScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const glow = 0.6 + 0.4 * Math.sin(frame / 14);
  const rope = Math.sin(frame / 22) * 3;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#F2C98E, #FDEBC8 68%)" }} />
      <Sun x={1620} y={190} r={92} />
      <LightRays color="rgba(255,236,170,0.2)" />
      <Clouds count={3} speed={0.35} seed="yw" maxY={210} />
      {/* bukit pasir */}
      <div style={{ position: "absolute", left: -320, top: 700, width: 1500, height: 560, borderRadius: "50%", background: "#EBC88C" }} />
      <div style={{ position: "absolute", left: 900, top: 740, width: 1500, height: 560, borderRadius: "50%", background: "#E0B97C" }} />
      <div style={{ position: "absolute", left: -200, top: 900, width: 2400, height: 300, background: "#D9AE72" }} />
      {/* tiang & palang kayu */}
      <div style={{ position: "absolute", left: 700, top: 420, width: 20, height: 300, borderRadius: 6, background: "#7A4A2A" }} />
      <div style={{ position: "absolute", left: 1180, top: 420, width: 20, height: 300, borderRadius: 6, background: "#7A4A2A" }} />
      <div style={{ position: "absolute", left: 670, top: 400, width: 560, height: 22, borderRadius: 8, background: "#8A5530" }} />
      {/* tali & timba */}
      <div
        style={{
          position: "absolute",
          left: 946,
          top: 418,
          width: 7,
          height: 180,
          background: "#C9A06A",
          transformOrigin: "50% 0%",
          rotate: `${rope}deg`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 906 + rope * 3,
          top: 592,
          width: 92,
          height: 74,
          borderRadius: "8px 8px 16px 16px",
          background: "#9C6A33",
          border: "6px solid #7A4F24",
          rotate: `${rope}deg`,
        }}
      />
      {/* mulut sumur */}
      <div style={{ position: "absolute", left: 660, top: 640, width: 580, height: 330 }}>
        {/* lubang gelap */}
        <div style={{ position: "absolute", left: 90, top: 40, width: 400, height: 150, borderRadius: "50%", background: "#3A2A1E" }} />
        {/* cahaya masuk ke mulut sumur */}
        <div
          style={{
            position: "absolute",
            left: 150,
            top: 50,
            width: 280,
            height: 120,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,232,160,${0.55 * glow}), transparent 70%)`,
          }}
        />
        {/* dinding bata sumur */}
        <div style={{ position: "absolute", left: 60, top: 120, width: 460, height: 190, borderRadius: "0 0 40px 40px", background: "#B98E5E", overflow: "hidden" }}>
          {new Array(4).fill(0).map((_, r) =>
            new Array(6).fill(0).map((__, c) => (
              <div
                key={`${r}-${c}`}
                style={{
                  position: "absolute",
                  left: c * 84 - (r % 2) * 42,
                  top: r * 48,
                  width: 78,
                  height: 42,
                  borderRadius: 5,
                  background: (r + c) % 3 ? "#C79A66" : "#B2865A",
                }}
              />
            )),
          )}
        </div>
        <div style={{ position: "absolute", left: 50, top: 104, width: 480, height: 46, borderRadius: 24, background: "#A87B46" }} />
      </div>
      <Twinkle n={8} seed="ywt" top={620} height={140} left={720} width={460} color="#FFF3C4" />
      <Dust count={16} seed="yw" />
    </AbsoluteFill>
  );
};

// Kafilah dagang menuju Mesir (QS. Yusuf: 19) — unta bermuatan, tanpa manusia
export const CaravanScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#F6CF93, #FFF0D2 70%)" }} />
      <Sun x={300} y={210} r={100} color="#FFD36E" />
      <Clouds count={3} speed={0.3} seed="yc" maxY={200} />
      {/* bukit pasir berlapis */}
      <div style={{ position: "absolute", left: -400, top: 560, width: 1700, height: 620, borderRadius: "50%", background: "#F0CB90" }} />
      <div style={{ position: "absolute", left: 800, top: 620, width: 1700, height: 620, borderRadius: "50%", background: "#E7BE7E" }} />
      <div style={{ position: "absolute", left: -200, top: 880, width: 2400, height: 320, background: "#DCAF6D" }} />
      {/* jalur kafilah */}
      <div style={{ position: "absolute", left: 0, top: 880, width: 1920, height: 120, background: "#D2A361", opacity: 0.6 }} />
      {/* unta berjalan di tempat masing-masing (tanpa geser kamera) */}
      {[0, 1, 2, 3].map((i) => {
        const step = frame / 7 + i * 1.6;
        const x = 140 + i * 420;
        return (
          <div key={i} style={{ position: "absolute", left: x + Math.sin(step) * 10, top: 580 + i * 22 + Math.sin(step) * 5 }}>
            <Camel w={360 - i * 18} step={step} load={i !== 2} />
          </div>
        );
      })}
      <Dust count={26} seed="yc" top={820} height={240} />
      {/* pohon palem kecil di kejauhan */}
      {[1700, 1820].map((x, i) => (
        <div key={x} style={{ position: "absolute", left: x, top: 640 }}>
          <svg width={120} height={240} viewBox="0 0 60 120">
            <path d="M30 120 C26 80 28 50 30 40" stroke="#8A5530" strokeWidth={7} fill="none" />
            {[-50, -20, 20, 50].map((a) => (
              <path
                key={a}
                d={`M30 40 C${30 + a * 0.5} ${28 + Math.sin(frame / 20 + i) * 2} ${30 + a} ${26 + Math.sin(frame / 18 + a) * 3} ${30 + a * 1.2} 36`}
                stroke="#4E9C4A"
                strokeWidth={8}
                fill="none"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>
      ))}
    </AbsoluteFill>
  );
};

// Penjara: dinding batu, jendela berjeruji, cahaya masuk, dua burung di luar (QS. Yusuf: 33–42)
export const PrisonScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = 0.55 + 0.45 * Math.sin(frame / 16);
  const land = spring({ frame: frame - 20, fps, config: { damping: 15 } });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#6E6480, #9A8A96 70%)" }} />
      {/* dinding batu */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        {new Array(12).fill(0).map((_, r) =>
          new Array(13).fill(0).map((__, c) => (
            <div
              key={`${r}-${c}`}
              style={{
                position: "absolute",
                left: c * 160 - (r % 2) * 80,
                top: r * 92,
                width: 152,
                height: 84,
                borderRadius: 8,
                background: (r + c) % 3 ? "#8C8294" : "#7E7488",
              }}
            />
          )),
        )}
      </AbsoluteFill>
      {/* berkas cahaya dari jendela */}
      <div
        style={{
          position: "absolute",
          left: 620,
          top: 240,
          width: 760,
          height: 840,
          background: `linear-gradient(170deg, rgba(255,238,180,${0.4 * glow}), transparent 70%)`,
          clipPath: "polygon(22% 0, 72% 0, 100% 100%, 0 100%)",
        }}
      />
      {/* jendela berjeruji */}
      <div style={{ position: "absolute", left: 740, top: 200, width: 440, height: 400 }}>
        <div style={{ position: "absolute", inset: -22, borderRadius: 24, background: "#6A6076" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "linear-gradient(#BFE4FF, #FFF3C9)" }} />
        {/* langit kecil di luar jendela */}
        <div style={{ position: "absolute", left: 40, top: 60, width: 120, height: 50, borderRadius: 25, background: "#FFFFFF", opacity: 0.85 }} />
        <div style={{ position: "absolute", left: 250, top: 120, width: 140, height: 56, borderRadius: 28, background: "#FFFFFF", opacity: 0.7 }} />
        {/* jeruji */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ position: "absolute", left: 50 + i * 110, top: -8, width: 18, height: 416, borderRadius: 9, background: "#5A5168" }} />
        ))}
        <div style={{ position: "absolute", left: -8, top: 180, width: 456, height: 18, borderRadius: 9, background: "#5A5168" }} />
      </div>
      {/* dua burung kecil di luar jendela (di balik jeruji, di langit) */}
      <div style={{ position: "absolute", left: 800 + land * 30, top: 250 + Math.sin(frame / 14) * 10 }}>
        <Bird size={86} flap={Math.sin(frame / 4)} color="#7CC6F2" />
      </div>
      <div style={{ position: "absolute", left: 1010 - land * 20, top: 310 + Math.sin(frame / 12 + 1) * 10 }}>
        <Bird size={74} flap={Math.sin(frame / 4 + 1.5)} color="#F2A6C2" />
      </div>
      {/* kendi & piring kecil di lantai: benda saja */}
      <div style={{ position: "absolute", left: 420, top: 860 }}>
        <svg width={170} height={200} viewBox="0 0 85 100">
          <path d="M30 20 L55 20 L58 34 C74 44 76 76 58 92 L27 92 C9 76 11 44 27 34 Z" fill="#A9683C" />
          <rect x={32} y={10} width={21} height={12} rx={4} fill="#8A5530" />
          <path d="M58 46 C74 48 74 70 58 74" stroke="#8A5530" strokeWidth={6} fill="none" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 1320, top: 930, width: 220, height: 44, borderRadius: "50%", background: "#8C7B64" }} />
      <Twinkle n={8} seed="ypr" top={620} height={240} left={700} width={560} color="#FFF3C4" />
    </AbsoluteFill>
  );
};

// Mimpi raja: tujuh sapi gemuk & tujuh kurus, tujuh bulir hijau & tujuh kering (QS. Yusuf: 43–49)
export const DreamCowsScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  // bagian kedua (bulir) muncul setelah sapi
  const earsIn = interpolate(frame, [70, 120], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#3E3270, #6B5AA8 55%, #A58AC4 100%)" }} />
      <Stars count={46} seed="ydc" />
      {/* gelembung awan mimpi */}
      {new Array(7).fill(0).map((_, i) => {
        const t = ((frame + i * 40) % 280) / 280;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 80 + i * 260 + Math.sin(frame / 24 + i) * 24,
              top: 60 + random(`yb${i}`) * 120 - t * 40,
              width: 200 + random(`yc${i}`) * 120,
              height: 110 + random(`yd${i}`) * 60,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.14)",
            }}
          />
        );
      })}
      {/* baris 1: tujuh sapi gemuk (kiri) & tujuh sapi kurus (kanan) */}
      <div style={{ position: "absolute", left: 40, top: 280 }}>
        {new Array(7).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: (i % 4) * 214 + (i >= 4 ? 108 : 0),
              top: (i >= 4 ? 128 : 0) + Math.sin(frame / 15 + i) * 7,
            }}
          >
            <Cow w={196} bob={frame / 15 + i} />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 1010, top: 280 }}>
        {new Array(7).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: (i % 4) * 212 + (i >= 4 ? 106 : 0),
              top: (i >= 4 ? 128 : 0) + Math.sin(frame / 13 + i + 2) * 7,
            }}
          >
            <Cow w={190} thin bob={frame / 13 + i} />
          </div>
        ))}
      </div>
      {/* pemisah lembut di tengah */}
      <div style={{ position: "absolute", left: 952, top: 250, width: 10, height: 650, borderRadius: 6, background: "rgba(255,255,255,0.22)" }} />
      {/* baris 2: tujuh bulir hijau & tujuh bulir kering */}
      <div style={{ position: "absolute", left: 120, top: 686, opacity: earsIn }}>
        {new Array(7).fill(0).map((_, i) => (
          <div key={i} style={{ position: "absolute", left: i * 110, top: 0 }}>
            <GrainEar h={196} bend={Math.sin(frame / 18 + i) * 5} />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 1080, top: 686, opacity: earsIn }}>
        {new Array(7).fill(0).map((_, i) => (
          <div key={i} style={{ position: "absolute", left: i * 108, top: 0 }}>
            <GrainEar h={186} dry bend={Math.sin(frame / 16 + i + 1) * 7} />
          </div>
        ))}
      </div>
      <Twinkle n={16} seed="ydct" top={120} height={720} color="#E6D9FF" />
    </AbsoluteFill>
  );
};

// Gudang makanan Mesir (QS. Yusuf: 55–57): karung, bulir, timbangan, pilar
export const GranaryScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const tilt = Math.sin(frame / 26) * 3;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#F3DDB2, #FFF4DC 70%)" }} />
      <LightRays color="rgba(255,228,150,0.22)" />
      {/* pilar bergaya Mesir */}
      {[90, 1620].map((x, i) => (
        <div key={x} style={{ position: "absolute", left: x, top: 90 }}>
          <svg width={210} height={840} viewBox="0 0 105 420">
            <rect x={18} y={40} width={70} height={350} fill="#E7CE9C" />
            {new Array(7).fill(0).map((_, r) => (
              <rect key={r} x={18} y={66 + r * 46} width={70} height={10} fill="#D5B679" />
            ))}
            <path d="M6 40 C6 10 99 10 99 40 Z" fill={ACCENT} />
            <rect x={4} y={28} width={97} height={16} rx={6} fill="#B9783A" />
            <rect x={8} y={388} width={89} height={26} rx={6} fill="#D5B679" />
            <circle cx={52} cy={120 + i * 20} r={11} fill="#B9783A" opacity={0.6} />
          </svg>
        </div>
      ))}
      {/* lantai */}
      <div style={{ position: "absolute", left: -200, top: 860, width: 2400, height: 300, background: "#E0C294" }} />
      <div style={{ position: "absolute", left: -200, top: 860, width: 2400, height: 14, background: "#CBA86F" }} />
      {/* tumpukan karung */}
      <div style={{ position: "absolute", left: 330, top: 700 }}>
        <Sack w={230} open />
      </div>
      <div style={{ position: "absolute", left: 540, top: 720 }}>
        <Sack w={210} />
      </div>
      <div style={{ position: "absolute", left: 420, top: 560 }}>
        <Sack w={190} />
      </div>
      <div style={{ position: "absolute", left: 1320, top: 710 }}>
        <Sack w={220} />
      </div>
      <div style={{ position: "absolute", left: 1500, top: 740 }}>
        <Sack w={190} open />
      </div>
      {/* bulir gandum di lantai */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{ position: "absolute", left: 800 + i * 76, top: 790 }}>
          <GrainEar h={150} bend={Math.sin(frame / 17 + i) * 6} />
        </div>
      ))}
      {/* timbangan sederhana */}
      <div style={{ position: "absolute", left: 880, top: 380 }}>
        <div style={{ position: "absolute", left: 136, top: 120, width: 16, height: 300, borderRadius: 8, background: "#9C6A33" }} />
        <div style={{ position: "absolute", left: 60, top: 400, width: 170, height: 24, borderRadius: 12, background: "#8A5530" }} />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 110,
            width: 290,
            height: 14,
            borderRadius: 7,
            background: "#B9783A",
            transformOrigin: "50% 50%",
            rotate: `${tilt}deg`,
          }}
        />
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: i ? 236 : -12,
              top: 168 + (i ? -tilt : tilt) * 2.6,
              width: 110,
              height: 56,
              borderRadius: "0 0 50px 50px",
              background: "#E2B666",
              border: "5px solid #B9783A",
            }}
          >
            {i === 0 && (
              <div style={{ position: "absolute", left: 18, top: -12, width: 70, height: 24, borderRadius: 14, background: "#F0D79B" }} />
            )}
          </div>
        ))}
      </div>
      <Twinkle n={12} seed="ygr" top={300} height={420} left={700} width={700} />
      <Dust count={12} seed="ygd" top={860} height={180} />
    </AbsoluteFill>
  );
};

// Baju Nabi Yusuf yang dibawa kepada ayahnya (QS. Yusuf: 93–96) — benda saja, bercahaya hangat
export const ShirtLightScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = 0.55 + 0.45 * Math.sin(frame / 13);
  const rise = spring({ frame: frame - 12, fps, config: { damping: 16 } });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#E9B978, #F7DCAE 68%)" }} />
      <Sun x={1640} y={170} r={86} />
      <LightRays color="rgba(255,228,150,0.26)" />
      <Clouds count={3} speed={0.3} seed="ysl" maxY={190} />
      {/* meja/alas kain */}
      <div style={{ position: "absolute", left: -200, top: 820, width: 2400, height: 400, background: "#C99A62" }} />
      {/* kain alas di bawah baju */}
      <div style={{ position: "absolute", left: 420, top: 740, width: 1080, height: 190, borderRadius: "50%", background: "#B2628C", opacity: 0.75 }} />
      <div style={{ position: "absolute", left: 520, top: 772, width: 880, height: 140, borderRadius: "50%", background: "#C97BA4", opacity: 0.85 }} />
      {/* lingkaran cahaya di belakang baju */}
      <div
        style={{
          position: "absolute",
          left: 660,
          top: 300,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,240,180,${0.55 * glow}), transparent 68%)`,
        }}
      />
      {/* baju terlipat */}
      <div style={{ position: "absolute", left: 700, top: 470 - rise * 26 + Math.sin(frame / 20) * 5 }}>
        <svg width={520} height={420} viewBox="0 0 260 210">
          {/* lipatan bawah */}
          <path d="M18 170 L242 170 L236 198 L24 198 Z" fill="#E8D0A4" stroke="#B9783A" strokeWidth={4} />
          <path d="M26 148 L234 148 L240 172 L20 172 Z" fill="#F6E7C8" stroke="#B9783A" strokeWidth={4} />
          {/* badan baju */}
          <path d="M60 60 L200 60 L214 150 L46 150 Z" fill="#FFFDF6" stroke="#B9783A" strokeWidth={5} />
          {/* lengan terlipat */}
          <path d="M60 62 L26 96 L46 118 L72 92 Z" fill="#F4E8D2" stroke="#B9783A" strokeWidth={4} />
          <path d="M200 62 L234 96 L214 118 L188 92 Z" fill="#F4E8D2" stroke="#B9783A" strokeWidth={4} />
          {/* kerah */}
          <path d="M104 60 L130 86 L156 60 L140 52 L120 52 Z" fill="#E4CEA4" stroke="#B9783A" strokeWidth={3} />
          {/* sulaman kecil */}
          <path d="M80 118 L180 118" stroke={ACCENT} strokeWidth={5} opacity={0.6} />
          <path d="M92 132 L168 132" stroke={ACCENT} strokeWidth={4} opacity={0.4} />
        </svg>
      </div>
      {/* kilau & hati kecil: kabar gembira */}
      <Twinkle n={14} seed="yslt" top={320} height={420} left={620} width={680} />
      {new Array(5).fill(0).map((_, i) => {
        const t = ((frame + i * 30) % 150) / 150;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 780 + i * 90 + Math.sin(frame / 18 + i) * 18,
              top: 470 - t * 240,
              fontSize: 40,
              color: colors.pink,
              opacity: Math.sin(t * Math.PI) * 0.9,
            }}
          >
            ♥
          </div>
        );
      })}
      <Gulls count={2} />
    </AbsoluteFill>
  );
};

// Ilustrasi pembuka & judul Shorts: sebelas bintang + bulan + matahari kecil
export const StarsArt: React.FC = () => {
  const frame = useCurrentFrame();
  const pos = [
    [30, 60],
    [150, 10],
    [270, 70],
    [390, 20],
    [70, 180],
    [200, 140],
    [330, 185],
    [440, 120],
    [110, 290],
    [250, 265],
    [390, 300],
  ];
  return (
    <div style={{ position: "relative", width: 560, height: 480 }}>
      {pos.map(([x, y], i) => {
        const tw = 0.55 + 0.45 * Math.sin(frame / 8 + i * 1.4);
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y + Math.sin(frame / 15 + i) * 6, opacity: 0.7 + tw * 0.3, scale: `${0.8 + tw * 0.3}` }}>
            <StarShape size={76} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 60, top: 360 }}>
        <svg width={120} height={120} viewBox="0 0 100 100">
          <circle cx={50} cy={50} r={34} fill={colors.gold} stroke="#E09C2A" strokeWidth={3} />
          {new Array(8).fill(0).map((_, i) => (
            <rect
              key={i}
              x={47}
              y={2}
              width={6}
              height={16}
              rx={3}
              fill={colors.gold}
              transform={`rotate(${i * 45 + Math.sin(frame / 20) * 6} 50 50)`}
            />
          ))}
        </svg>
      </div>
      <div style={{ position: "absolute", left: 330, top: 360 }}>
        <svg width={120} height={120} viewBox="0 0 100 100">
          <defs>
            <mask id="yusuf-moon-cut">
              <rect width={100} height={100} fill="white" />
              <circle cx={68} cy={38} r={38} fill="black" />
            </mask>
          </defs>
          <circle cx={50} cy={50} r={40} fill="#FFE9A3" stroke="#D9A441" strokeWidth={4} mask="url(#yusuf-moon-cut)" />
        </svg>
      </div>
    </div>
  );
};
