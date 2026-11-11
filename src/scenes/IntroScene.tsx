import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GhuWalker } from "../components/Ghu";
import { Bubbles, Clouds, IslamicPattern } from "../components/nature";
import { Ant, Ark, BigFish } from "../components/objects";
import { usePhraseFrame } from "../lib/voice";
import { arabicFont, bodyFont, colors, titleFont } from "../theme";
import { clamp, type SceneProps } from "./common";
import { BigFire } from "./IbrahimScenes";

// Pembuka. Bagian 1: Ghu di kiri, judul di kanan.
// Bagian 2 (introHook): judul hilang, Ghu berjalan ke kanan, lalu ilustrasi & kartu muncul di kiri.
const GHU_LEFT = 140;
const GHU_RIGHT = 1420;
const WALK_FRAMES = 60;

const MarchingAnts: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <svg width={1200} height={120} style={{ position: "absolute", left: 80, top: 690 }}>
        <path
          d="M0 60 C200 20 400 100 600 60 C800 20 1000 100 1200 60"
          stroke="#C98B4E"
          strokeWidth={8}
          strokeDasharray="4 22"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {new Array(9).fill(0).map((_, i) => {
        const x = ((i * 140 + frame * 2.2) % 1260) - 60;
        const y = 690 + Math.sin((x / 1200) * Math.PI * 4) * 20;
        return (
          <div key={i} style={{ position: "absolute", left: 80 + x, top: y - 40 }}>
            <Ant size={110} walk={frame + i * 3} carrying={i % 2 === 0} />
          </div>
        );
      })}
    </>
  );
};

const FloatingArk: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 520,
          width: 1260,
          height: 330,
          borderRadius: 60,
          background: "linear-gradient(#9ADCF0, #2A8FB8)",
          overflow: "hidden",
        }}
      >
        <Bubbles count={10} seed="intro-ark" />
      </div>
      <div
        style={{
          position: "absolute",
          left: 270,
          top: 400 + Math.sin(frame / 18) * 14,
          rotate: `${Math.sin(frame / 25) * 2.5}deg`,
        }}
      >
        <Ark width={780} />
      </div>
    </>
  );
};

const SwimmingFish: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 520,
          width: 1260,
          height: 330,
          borderRadius: 60,
          background: "linear-gradient(#7FD3EA, #1E86AE)",
          overflow: "hidden",
        }}
      >
        <Bubbles count={16} seed="intro" />
      </div>
      <div
        style={{
          position: "absolute",
          left: 300 + Math.sin(frame / 40) * 120,
          top: 560 + Math.sin(frame / 18) * 12,
        }}
      >
        <BigFish width={560} tailAngle={Math.sin(frame / 8) * 12} />
      </div>
    </>
  );
};

export const IntroScene: React.FC<SceneProps> = ({ story }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const hook = story.introHook;
  const titleAt = usePhraseFrame(story.titlePhrase);
  const hookAt = usePhraseFrame(hook?.phrase ?? story.titlePhrase);
  const cardAt = usePhraseFrame(hook?.cardPhrase ?? story.titlePhrase);
  const titleIn = spring({ frame: frame - titleAt, fps, config: { damping: 10 } });

  // Ghu hanya berjalan saat masuk dan saat isi layar pindah sisi
  const swapStart = hook ? hookAt - 15 : durationInFrames;
  const arrived = swapStart + WALK_FRAMES;
  const stops = [
    { at: 0, x: -420 },
    { at: 50, x: GHU_LEFT },
    ...(hook
      ? [
          { at: swapStart, x: GHU_LEFT },
          { at: arrived, x: GHU_RIGHT },
        ]
      : []),
  ];
  const titleOut = interpolate(frame, [swapStart - 20, swapStart], [1, 0], clamp);
  const artIn = spring({ frame: frame - arrived, fps, config: { damping: 14 } });
  const cardFrame = Math.max(cardAt, arrived + 10);
  const cardIn = spring({ frame: frame - cardFrame, fps, config: { damping: 10 } });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 30% 40%, ${colors.cream}, ${colors.pinkSoft} 60%, ${colors.lavender})`,
      }}
    >
      <IslamicPattern color={colors.hijabDark} />
      <Clouds count={4} speed={0.4} maxY={200} />

      {/* Gelembung pembuka */}
      <div
        style={{
          position: "absolute",
          left: 780,
          top: 180,
          background: colors.white,
          borderRadius: 50,
          padding: "30px 50px",
          fontFamily: titleFont,
          fontWeight: 600,
          fontSize: 72,
          color: colors.hijabDark,
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          opacity: interpolate(frame, [10, 20, titleAt - 10, titleAt], [0, 1, 1, 0], clamp),
          scale: interpolate(frame, [10, 22], [0.5, 1], {
            ...clamp,
            easing: Easing.out(Easing.back(2)),
          }),
        }}
      >
        Bismillah
      </div>

      {/* Judul episode (kanan) */}
      <div
        style={{
          position: "absolute",
          left: 780,
          right: 100,
          top: 200,
          textAlign: "center",
          opacity: frame >= titleAt ? titleOut : 0,
          scale: `${titleIn}`,
          translate: `${(1 - titleOut) * 300}px 0px`,
        }}
      >
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 48,
            color: colors.white,
            background: story.accent,
            display: "inline-block",
            padding: "10px 40px",
            borderRadius: 999,
          }}
        >
          Kisah Nabi bersama Ghu
        </div>
        <div
          style={{
            fontFamily: titleFont,
            fontWeight: 700,
            fontSize: 150,
            lineHeight: 1.05,
            marginTop: 30,
            color: colors.ink,
            textShadow: `6px 6px 0 ${colors.white}`,
          }}
        >
          {story.title}
        </div>
        <div style={{ fontFamily: titleFont, fontWeight: 500, fontSize: 66, color: colors.hijabDark, marginTop: 20 }}>
          {story.subtitle}
        </div>
      </div>

      {/* Bagian 2: ilustrasi & kartu di kiri, setelah Ghu sampai di kanan */}
      {hook && frame >= arrived && (
        <div style={{ position: "absolute", inset: 0, opacity: artIn, translate: `${(artIn - 1) * 200}px 0px` }}>
          {hook.art === "ants" ? (
            <MarchingAnts />
          ) : hook.art === "ark" ? (
            <FloatingArk />
          ) : hook.art === "fire" ? (
            <div style={{ position: "absolute", left: 290, top: 380 }}>
              <BigFire width={800} cool={interpolate(frame, [arrived + 60, arrived + 140], [0, 1], clamp)} seed="intro" />
            </div>
          ) : (
            <SwimmingFish />
          )}
        </div>
      )}
      {hook && frame >= cardFrame && (
        <div
          style={{
            position: "absolute",
            left: 160,
            top: 150,
            width: 1100,
            textAlign: "center",
            background: colors.white,
            borderRadius: 50,
            border: `8px solid ${story.accent}`,
            padding: "30px 40px",
            boxShadow: "0 16px 30px rgba(0,0,0,0.15)",
            scale: `${cardIn}`,
          }}
        >
          {hook.cardArab && (
            <div dir="rtl" style={{ fontFamily: arabicFont, fontSize: 110, lineHeight: 1.3, color: colors.maroon }}>
              {hook.cardArab}
            </div>
          )}
          <div style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 80, color: colors.ink }}>
            {hook.cardTitle}
          </div>
        </div>
      )}

      <GhuWalker
        stops={stops}
        size={330}
        bottom={20}
        pose={frame < titleAt ? "melambai" : "bercerita"}
        happy={frame > titleAt + 20 && frame < titleAt + 50}
      />
    </AbsoluteFill>
  );
};
