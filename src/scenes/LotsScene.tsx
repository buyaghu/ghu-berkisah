import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Rain, Sea, Sky, stormSea } from "../components/nature";
import { usePhraseFrame } from "../lib/voice";
import { colors, titleFont } from "../theme";
import { clamp, type SceneProps } from "./common";

// Undian di antara para penumpang: satu kartu terbuka dengan nama Yunus
const LotCard: React.FC<{
  revealAt: number | null;
  dimAt: number;
  index: number;
}> = ({ revealAt, dimAt, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - 10 - index * 6, fps, config: { damping: 14 } });
  const flip =
    revealAt === null ? 0 : interpolate(frame, [revealAt - 8, revealAt + 4], [0, 180], clamp);
  const pop = spring({ frame: frame - (revealAt ?? 0), fps, config: { damping: 8 } });
  // Kartu yang tidak terpilih meredup saat nama terungkap
  const fadeOthers =
    revealAt === null ? interpolate(frame, [dimAt, dimAt + 15], [1, 0.4], clamp) : 1;
  const showFront = flip > 90;

  return (
    <div
      style={{
        width: 380,
        height: 500,
        perspective: 1200,
        translate: `0px ${(1 - enter) * 700}px`,
        scale: `${1 + (revealAt !== null && frame > revealAt ? (1 - pop) * 0.15 : 0)}`,
        opacity: fadeOthers,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 30,
          rotate: `y ${flip}deg`,
          background: showFront ? colors.cream : "#C98B4E",
          border: `10px solid ${showFront ? colors.gold : "#8C5A3C"}`,
          boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: titleFont,
        }}
      >
        {showFront ? (
          <div style={{ rotate: "y 180deg", textAlign: "center" }}>
            <div style={{ fontSize: 92, fontWeight: 700, color: colors.ink, marginTop: 20 }}>Yunus</div>
          </div>
        ) : (
          <div style={{ fontSize: 200, fontWeight: 700, color: "#F6D79B" }}>?</div>
        )}
      </div>
    </div>
  );
};

export const LotsScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const revealAt = usePhraseFrame("ternyata");
  const reveals = [null, revealAt, null];
  const sadarAt = usePhraseFrame("beliaulah");

  return (
    <AbsoluteFill>
      <Sky top="#1D2340" bottom="#4B5875" />
      <Sea layers={stormSea(760)} speed={2} />
      <Rain count={80} opacity={0.35} />
      <AbsoluteFill style={{ background: "rgba(10,15,35,0.45)" }} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 70,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 120,
        }}
      >
        {reveals.map((r, i) => (
          <LotCard key={i} revealAt={r} dimAt={revealAt} index={i} />
        ))}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle, ${colors.gold}55, transparent 60%)`,
          opacity: interpolate(frame, [sadarAt, sadarAt + 30], [0, 1], clamp),
        }}
      />
    </AbsoluteFill>
  );
};
