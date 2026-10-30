import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Bird, Palace } from "../components/objects";
import { Clouds, Sky, Sun, wavePath } from "../components/nature";
import { usePhraseFrame } from "../lib/voice";
import { arabicFont, bodyFont, colors, titleFont } from "../theme";
import { clamp, type SceneProps } from "./common";

// Hiasan yang muncul mengikuti kalimat Ghu, supaya scene panjang ini terus bergerak
const Book: React.FC<{ color: string }> = ({ color }) => (
  <svg width={110} height={90} viewBox="0 0 110 90">
    <path d="M55 15 C40 5 15 5 5 10 L5 80 C15 75 40 75 55 85 Z" fill={color} />
    <path d="M55 15 C70 5 95 5 105 10 L105 80 C95 75 70 75 55 85 Z" fill={color} opacity={0.8} />
    <path d="M55 15 L55 85" stroke="#FFFFFF" strokeWidth={3} />
    {[25, 40, 55].map((y) => (
      <path key={y} d={`M18 ${y} L45 ${y + 3} M65 ${y + 3} L92 ${y}`} stroke="#FFFFFF" strokeWidth={3} opacity={0.7} />
    ))}
  </svg>
);

const Crown: React.FC = () => (
  <svg width={160} height={112} viewBox="0 0 200 140">
    <path d="M20 120 L10 30 L60 75 L100 10 L140 75 L190 30 L180 120 Z" fill={colors.gold} stroke="#E0A526" strokeWidth={6} />
    {[[10, 30], [100, 10], [190, 30]].map(([x, y]) => (
      <circle key={x} cx={x} cy={y} r={12} fill={colors.pink} />
    ))}
    <rect x={20} y={105} width={160} height={20} rx={8} fill="#E0A526" />
  </svg>
);

const Gift: React.FC<{ kind: number }> = ({ kind }) => (
  <svg width={80} height={80} viewBox="0 0 80 80">
    {kind === 0 && <path d="M40 5 L70 30 L40 75 L10 30 Z" fill="#7CC6F2" stroke="#4C83C9" strokeWidth={4} />}
    {kind === 1 && <path d="M40 5 L49 30 L76 30 L54 46 L62 72 L40 56 L18 72 L26 46 L4 30 L31 30 Z" fill={colors.gold} />}
    {kind === 2 && (
      <g>
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx={40} cy={22} rx={12} ry={18} fill={colors.pink} transform={`rotate(${r} 40 40)`} />
        ))}
        <circle cx={40} cy={40} r={10} fill={colors.gold} />
      </g>
    )}
    {kind === 3 && (
      <g>
        <circle cx={40} cy={46} r={28} fill="#FF7A7A" />
        <path d="M40 18 C40 10 48 6 54 8" stroke={colors.leafDark} strokeWidth={5} fill="none" />
      </g>
    )}
  </svg>
);

const KingdomBeats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const ilmuAt = usePhraseFrame("ilmu yang sangat");
  const rajaAt = usePhraseFrame("menjadi raja");
  const segalaAt = usePhraseFrame("segala sesuatu");
  const sombongAt = usePhraseFrame("tidak sombong");
  const hamdAt = usePhraseFrame("Alhamdulillah");
  const hambaAt = usePhraseFrame("sebaik-baik hamba");
  // Hiasan yang waktunya di luar adegan ini (b <= a) tidak ditampilkan
  const visible = (a: number, b: number) =>
    b <= a + 15 ? 0 : interpolate(frame, [a, a + 15, b, b + 15], [0, 1, 1, 0], clamp);
  const pop = (a: number) => spring({ frame: frame - a, fps, config: { damping: 9 } });

  return (
    <>
      {/* Ilmu: buku-buku melayang */}
      <AbsoluteFill style={{ opacity: visible(ilmuAt, rajaAt) }}>
        {[
          [330, 260, "#E8853D"],
          [1450, 230, "#2BB3C0"],
          [250, 520, "#7B5BD6"],
          [1560, 500, "#E8853D"],
          [900, 120, "#3EA87A"],
        ].map(([x, y, c], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x as number,
              top: (y as number) + Math.sin(frame / 15 + i) * 18,
              rotate: `${Math.sin(frame / 20 + i) * 10}deg`,
              scale: `${pop(ilmuAt + i * 4)}`,
            }}
          >
            <Book color={c as string} />
          </div>
        ))}
      </AbsoluteFill>
      {/* Raja: mahkota di atas istana */}
      <div
        style={{
          position: "absolute",
          left: 880,
          top: 150 + Math.sin(frame / 14) * 8,
          width: 160,
          opacity: visible(rajaAt, hamdAt - 15),
          scale: `${pop(rajaAt)}`,
        }}
      >
        <Crown />
      </div>
      {/* Segala sesuatu: hadiah mengelilingi istana */}
      <AbsoluteFill style={{ opacity: visible(segalaAt, sombongAt + 30) }}>
        {new Array(8).fill(0).map((_, i) => {
          const a = frame / 50 + (i / 8) * Math.PI * 2;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 920 + Math.cos(a) * 640,
                top: 440 + Math.sin(a) * 230,
                scale: `${pop(segalaAt + i * 3)}`,
              }}
            >
              <Gift kind={i % 4} />
            </div>
          );
        })}
      </AbsoluteFill>
      {/* Alhamdulillah */}
      <div
        style={{
          position: "absolute",
          top: 190,
          width: "100%",
          textAlign: "center",
          fontFamily: titleFont,
          fontWeight: 700,
          fontSize: 130,
          color: colors.gold,
          textShadow: "0 8px 0 #B5763D, 0 0 40px rgba(255,255,255,0.9)",
          opacity: visible(hamdAt, hambaAt - 20),
          scale: `${pop(hamdAt)}`,
        }}
      >
        Alhamdulillah
      </div>
      {/* Sebaik-baik hamba (QS. Shad: 30) */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 460,
          width: 1000,
          textAlign: "center",
          background: "rgba(255,255,255,0.95)",
          borderRadius: 44,
          border: `6px solid ${colors.gold}`,
          padding: "20px 30px",
          opacity: visible(hambaAt, durationInFrames),
          scale: `${pop(hambaAt)}`,
        }}
      >
        <div dir="rtl" style={{ fontFamily: arabicFont, fontSize: 76, lineHeight: 1.5, color: colors.maroon }}>
          نِعْمَ الْعَبْدُ ۖ إِنَّهُ أَوَّابٌ
        </div>
        <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 40, color: colors.ink }}>
          “Sebaik-baik hamba, sungguh ia sangat taat.” (QS. Shad: 30)
        </div>
      </div>
    </>
  );
};

// Kerajaan Nabi Sulaiman: istana, bukit hijau, dan burung-burung
export const KingdomScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const birdsAt = usePhraseFrame("bahasa burung");
  const giftAt = usePhraseFrame("karunia yang nyata");
  const glow = interpolate(frame, [giftAt, giftAt + 30], [0, 1], clamp);

  return (
    <AbsoluteFill>
      <Sky top="#8FD6F7" bottom="#FFF3D6" />
      <Sun x={1600} y={200} r={100} />
      <Clouds count={5} speed={0.4} />
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <path d={wavePath(width, height, 690, 40, 900, 0.5)} fill="#9BD67A" />
      </svg>
      <div style={{ position: "absolute", left: (width - 1100) / 2, top: 230 }}>
        <Palace />
      </div>
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <path d={wavePath(width, height, 800, 30, 700, 2)} fill={colors.leaf} />
        <path d={wavePath(width, height, 900, 25, 600, 4)} fill="#58B65C" />
      </svg>
      {/* Burung-burung: muncul saat "bahasa burung" */}
      {new Array(7).fill(0).map((_, i) => {
        const s = spring({ frame: frame - birdsAt - i * 5, fps, config: { damping: 12 } });
        const angle = frame / 40 + (i / 7) * Math.PI * 2;
        const x = width / 2 + Math.cos(angle) * (520 + (i % 2) * 120) - 45;
        const y = 300 + Math.sin(angle) * 140 - 45;
        const talking = Math.floor((frame - birdsAt) / 20 + i) % 3 === 0;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, opacity: s, scale: `${s}` }}>
            <Bird
              flap={frame * 0.5 + i}
              color={["#7CC6F2", "#FF9FB8", "#FFC94A", "#9BE38C"][i % 4]}
            />
            {talking && frame > birdsAt && (
              <div
                style={{
                  position: "absolute",
                  left: 70,
                  top: -40,
                  background: colors.white,
                  borderRadius: 20,
                  padding: "6px 14px",
                  display: "flex",
                  gap: 6,
                }}
              >
                {[0, 1, 2].map((d) => (
                  <div key={d} style={{ width: 10, height: 10, borderRadius: 5, background: colors.ink }} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      {/* Kilau karunia */}
      <AbsoluteFill style={{ opacity: glow }}>
        {new Array(30).fill(0).map((_, i) => {
          const tw = Math.abs(Math.sin(frame / 8 + i));
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 300 + random(`kg${i}`) * 1300,
                top: 150 + random(`ky${i}`) * 500,
                width: 14,
                height: 14,
                rotate: "45deg",
                background: colors.gold,
                opacity: tw,
                scale: `${0.5 + tw}`,
              }}
            />
          );
        })}
      </AbsoluteFill>
      <KingdomBeats />
    </AbsoluteFill>
  );
};
