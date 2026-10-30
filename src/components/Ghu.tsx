import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, LEAD_IN } from "../theme";
import { isSpeakingAt, useVoice } from "../lib/voice";

// Ghu: narator kartun, anak perempuan berkhimar putih dengan rok marun (sesuai foto Ghu).
// Tanpa hidung. Mulutnya bergerak mengikuti waktu kata-kata VO (dari ElevenLabs).
//
// - <GhuFull>   : badan penuh, untuk scene saat Ghu bercerita di layar
// - <Ghu>       : setengah badan
// - <GhuAvatar> : wajah saja dalam lingkaran, untuk scene kisah

type FaceState = { mouthOpen: number; eyeScale: number };

// talking: paksa mulut bergerak (mis. di lembar karakter); default mengikuti VO
const useGhuFace = (talking?: boolean): FaceState => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const voice = useVoice();
  const speaking = talking ?? isSpeakingAt(voice, frame / fps - LEAD_IN);
  const mouthOpen = speaking
    ? 0.35 + 0.65 * Math.abs(Math.sin(frame * 0.85) * Math.cos(frame * 0.31))
    : 0;
  // Kedip setiap ~3,3 detik
  const eyeScale = frame % 100 > 94 ? 0.1 : 1;
  return { mouthOpen, eyeScale };
};

// Kepala Ghu dalam koordinat 400×340 (dipakai semua versi)
// look: -1 = menoleh ke kiri, 0 = menghadap penonton, 1 = menoleh ke kanan
const GhuHead: React.FC<FaceState & { happy: boolean; tilt: number; look?: number }> = ({
  mouthOpen,
  eyeScale,
  happy,
  tilt,
  look = 0,
}) => (
  <g style={{ transformOrigin: "200px 300px", rotate: `${tilt}deg` }}>
    {/* Khimar putih */}
    <ellipse
      cx={200}
      cy={180}
      rx={135}
      ry={145}
      fill={colors.khimar}
      stroke={colors.khimarLine}
      strokeWidth={4}
    />
    <path d="M65 180 C65 300 120 330 200 330 C280 330 335 300 335 180 Z" fill={colors.khimar} />
    <path
      d="M65 180 C65 302 120 332 200 332 C280 332 335 302 335 180"
      fill="none"
      stroke={colors.khimarLine}
      strokeWidth={4}
    />
    {/* Wajah (tanpa hidung). Saat menoleh, wajah & mata bergeser ke arah tolehan */}
    <g style={{ translate: `${look * 26}px 0px` }}>
      <ellipse cx={200} cy={190} rx={92 - Math.abs(look) * 6} ry={98} fill={colors.skin} />
    {/* Ciput di dahi */}
    <path
      d="M105 160 C120 80 280 80 295 160 C270 120 130 120 105 160 Z"
      fill={colors.khimarShade}
    />
      <g
        style={{
          translate: `${look * 24}px 0px`,
          scale: `${1 - Math.abs(look) * 0.14} 1`,
          transformOrigin: "200px 200px",
        }}
      >
    {/* Pipi */}
    <ellipse cx={142} cy={222} rx={18} ry={11} fill={colors.cheek} opacity={0.7} />
    <ellipse cx={258} cy={222} rx={18} ry={11} fill={colors.cheek} opacity={0.7} />
    {/* Alis */}
    <path d="M140 150 Q160 140 178 150" stroke={colors.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M222 150 Q240 140 260 150" stroke={colors.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    {/* Mata */}
    {happy ? (
      <>
        <path d="M140 190 Q160 170 180 190" stroke={colors.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d="M220 190 Q240 170 260 190" stroke={colors.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
      </>
    ) : (
      <g>
        {[160, 240].map((cx) => (
          <g key={cx} style={{ transformOrigin: `${cx}px 188px`, scale: `1 ${eyeScale}` }}>
            <ellipse cx={cx} cy={188} rx={16} ry={20} fill={colors.ink} />
            <circle cx={cx + 5} cy={181} r={6} fill={colors.white} />
            <circle cx={cx - 5} cy={195} r={3} fill={colors.white} />
          </g>
        ))}
      </g>
    )}
    {/* Mulut */}
    {mouthOpen > 0 ? (
      <g>
        <ellipse cx={200} cy={240} rx={16 + mouthOpen * 4} ry={4 + mouthOpen * 14} fill="#B8455C" />
        <ellipse cx={200} cy={246 + mouthOpen * 6} rx={9} ry={3 + mouthOpen * 3} fill="#FF8E9E" />
      </g>
    ) : (
      <path d="M180 236 Q200 256 220 236" stroke="#B8455C" strokeWidth={6} fill="none" strokeLinecap="round" />
    )}
      </g>
    </g>
  </g>
);

const Hand: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <>
    <ellipse cx={x} cy={y - 16} rx={22} ry={14} fill={colors.maroon} />
    <circle cx={x} cy={y} r={23} fill={colors.skin} />
  </>
);

type GhuProps = {
  size?: number;
  wave?: boolean; // melambaikan tangan
  headOnly?: boolean; // untuk avatar bulat kecil
  happy?: boolean;
  talking?: boolean;
};

export const Ghu: React.FC<GhuProps> = ({
  size = 500,
  wave = false,
  headOnly = false,
  happy = false,
  talking,
}) => {
  const frame = useCurrentFrame();
  const face = useGhuFace(talking);
  const bob = Math.sin(frame / 14) * 6;
  const tilt = Math.sin(frame / 37) * 2.5;
  const waveAngle = wave ? Math.sin(frame / 5) * 18 : 0;

  return (
    <svg
      viewBox={headOnly ? "70 40 260 260" : "0 0 400 500"}
      width={size}
      height={headOnly ? size : size * 1.25}
      style={{ overflow: "visible" }}
    >
      <g style={{ translate: `0px ${bob}px` }}>
        {!headOnly && (
          <>
            {/* Rok marun */}
            <path d="M100 520 L125 400 L275 400 L300 520 Z" fill={colors.maroon} />
            <path d="M170 440 L160 520 M230 440 L240 520" stroke={colors.maroonDark} strokeWidth={5} opacity={0.5} />
            {/* Khimar putih panjang menutupi badan */}
            <path
              d="M75 320 C64 375 70 410 88 432 C150 452 250 452 312 432 C330 410 336 375 325 320 Z"
              fill={colors.khimar}
              stroke={colors.khimarLine}
              strokeWidth={4}
            />
            <path d="M135 385 C150 415 170 428 200 434" stroke={colors.khimarShade} strokeWidth={8} fill="none" strokeLinecap="round" />
            <path d="M265 385 C250 415 230 428 200 434" stroke={colors.khimarShade} strokeWidth={8} fill="none" strokeLinecap="round" />
            <Hand x={102} y={440} />
            <g style={{ transformOrigin: "300px 430px", rotate: `${waveAngle}deg` }}>
              {wave ? (
                <>
                  <rect x={300} y={330} width={40} height={110} rx={20} fill={colors.maroon} transform="rotate(25 300 430)" />
                  <circle cx={352} cy={330} r={28} fill={colors.skin} />
                </>
              ) : (
                <Hand x={298} y={440} />
              )}
            </g>
          </>
        )}
        <GhuHead {...face} happy={happy} tilt={tilt} />
      </g>
    </svg>
  );
};

export type GhuPose = "diam" | "bercerita" | "melambai";

// Ghu badan penuh (viewBox 400×900): khimar putih, tas punggung pastel,
// rok marun panjang, sepatu putih. Tinggi = size × 2,25.
// walking: kaki melangkah bergantian, badan naik-turun, rok berayun.
export const GhuFull: React.FC<{
  size?: number;
  pose?: GhuPose;
  happy?: boolean;
  talking?: boolean;
  walking?: boolean;
  look?: number;
}> = ({ size = 380, pose = "diam", happy = false, talking, walking = false, look = 0 }) => {
  const frame = useCurrentFrame();
  const face = useGhuFace(talking);
  const step = frame * 0.38;
  // Saat berjalan badan tetap tegak: hanya naik-turun mengikuti langkah
  const bob = walking ? Math.abs(Math.sin(step)) * 10 : Math.abs(Math.sin(frame / 14)) * 6;
  const sway = walking ? 0 : Math.sin(frame / 20) * 1.5;
  const tilt = walking ? 0 : Math.sin(frame / 37) * 2.5;
  // Posisi sepatu saat melangkah (kiri & kanan bergantian)
  const stride = walking ? Math.sin(step) * 26 : 0;
  const liftL = walking ? Math.max(0, Math.cos(step)) * 14 : 0;
  const liftR = walking ? Math.max(0, -Math.cos(step)) * 14 : 0;
  const waveAngle = Math.sin(frame / 5) * 20;
  // Tangan "bercerita": naik-turun pelan seperti sedang menjelaskan
  const gesture = Math.sin(frame / 9) * 14;

  return (
    <svg viewBox="0 0 400 900" width={size} height={size * 2.25} style={{ overflow: "visible" }}>
      {/* Bayangan di lantai */}
      <ellipse cx={200} cy={885} rx={150 - bob * 2} ry={14} fill="rgba(0,0,0,0.12)" />
      {/* Sepatu putih */}
      <ellipse cx={160 + stride} cy={866 - liftL} rx={44} ry={22} fill="#EEEBFA" stroke="#C9C3E8" strokeWidth={4} />
      <ellipse cx={240 - stride} cy={866 - liftR} rx={44} ry={22} fill="#EEEBFA" stroke="#C9C3E8" strokeWidth={4} />

      <g style={{ translate: `0px ${-bob}px` }}>
        {/* Rok marun panjang */}
        <g style={{ transformOrigin: "200px 520px", rotate: `${sway}deg` }}>
          <path d="M118 520 C106 650 90 770 78 852 Q200 874 322 852 C310 770 294 650 282 520 Z" fill={colors.maroon} />
          <path
            d="M165 600 L150 855 M235 600 L250 855 M200 620 L200 855"
            stroke={colors.maroonDark}
            strokeWidth={5}
            opacity={0.45}
            strokeLinecap="round"
          />
        </g>
        {/* Tas punggung (mengintip di samping) */}
        <rect x={78} y={360} width={244} height={210} rx={50} fill="#DCD6F7" stroke="#C3BAEE" strokeWidth={4} />
        {/* Khimar putih panjang */}
        <path
          d="M112 290 C78 360 58 470 66 588 C140 620 260 620 334 588 C342 470 322 360 288 290 Z"
          fill={colors.khimar}
          stroke={colors.khimarLine}
          strokeWidth={4}
        />
        <path d="M120 420 C128 490 150 550 178 600" stroke={colors.khimarShade} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M280 420 C272 490 250 550 222 600" stroke={colors.khimarShade} strokeWidth={8} fill="none" strokeLinecap="round" />
        {/* Tali tas */}
        <path d="M142 330 C134 400 130 470 132 545" stroke="#C3BAEE" strokeWidth={20} fill="none" strokeLinecap="round" />
        <path d="M258 330 C266 400 270 470 268 545" stroke="#C3BAEE" strokeWidth={20} fill="none" strokeLinecap="round" />

        {/* Tangan kiri selalu memegang tali tas */}
        <Hand x={134} y={470} />

        {/* Tangan kanan sesuai pose */}
        {pose === "diam" && <Hand x={266} y={470} />}
        {pose === "bercerita" && (
          <g style={{ transformOrigin: "268px 480px", rotate: `${-gesture}deg` }}>
            <path d="M268 480 L318 410" stroke={colors.maroon} strokeWidth={38} strokeLinecap="round" />
            <circle cx={324} cy={398} r={24} fill={colors.skin} />
          </g>
        )}
        {pose === "melambai" && (
          <g style={{ transformOrigin: "290px 450px", rotate: `${waveAngle}deg` }}>
            <path d="M290 450 L372 330" stroke={colors.maroon} strokeWidth={38} strokeLinecap="round" />
            <circle cx={380} cy={314} r={26} fill={colors.skin} />
          </g>
        )}

        <GhuHead {...face} happy={happy} tilt={tilt} look={look} />
      </g>
    </svg>
  );
};

// Avatar bulat kecil di pojok saat Ghu bercerita di scene kisah
export const GhuAvatar: React.FC<{ size?: number }> = ({ size = 210 }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 50% 40%, ${colors.cream}, ${colors.pinkSoft})`,
        border: `8px solid ${colors.white}`,
        boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        scale: interpolate(frame, [0, 12], [0.6, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <Ghu headOnly size={size * 1.05} />
    </div>
  );
};

export type GhuStop = { at: number; x: number };

// Ghu berjalan di antara titik-titik (frame, posisi x dalam px).
// Saat berjalan: badan tegak, kaki melangkah, wajah menoleh ke arah jalan.
// Saat berhenti: wajah kembali menghadap penonton dan bercerita dengan `pose`.
export const GhuWalker: React.FC<{
  stops: GhuStop[];
  bottom?: number;
  size?: number;
  pose?: GhuPose;
  happy?: boolean;
  talking?: boolean;
}> = ({ stops, bottom = 30, size = 300, pose = "bercerita", happy = false, talking }) => {
  const frame = useCurrentFrame();
  const xAt = (f: number) =>
    interpolate(f, stops.map((s) => s.at), stops.map((s) => s.x), {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      // Mulai & berhenti pelan-pelan, sehingga tolehan wajah juga halus
      easing: Easing.inOut(Easing.quad),
    });
  const x = xAt(frame);
  const velocity = xAt(frame + 1) - x;
  const walking = Math.abs(velocity) > 0.6;
  const look = Math.max(-1, Math.min(1, velocity / 3));
  return (
    <div style={{ position: "absolute", left: x, bottom }}>
      <GhuFull
        size={size}
        pose={walking ? "diam" : pose}
        happy={happy}
        walking={walking}
        look={look}
        talking={talking === undefined ? undefined : talking && !walking}
      />
    </div>
  );
};
