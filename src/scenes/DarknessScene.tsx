import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BigFish } from "../components/objects";
import { Bubbles, Moon, Stars } from "../components/nature";
import { usePhraseFrame } from "../lib/voice";
import { colors, titleFont } from "../theme";
import { clamp, type SceneProps } from "./common";

// Tiga kegelapan: malam, dasar laut, perut ikan — lalu cahaya harapan
const Panel: React.FC<{
  at: number;
  num: number;
  label: string;
  bg: string;
  children: React.ReactNode;
}> = ({ at, num, label, bg, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 15 } });
  return (
    <div
      style={{
        position: "relative",
        width: 520,
        height: 620,
        borderRadius: 40,
        overflow: "hidden",
        background: bg,
        border: "6px solid rgba(255,255,255,0.25)",
        opacity: s,
        translate: `0px ${(1 - s) * 120}px`,
      }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: titleFont,
          color: colors.white,
          fontSize: 52,
          fontWeight: 600,
        }}
      >
        <span style={{ color: colors.gold }}>{num}.</span> {label}
      </div>
    </div>
  );
};

export const DarknessScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = usePhraseFrame("Gelapnya malam");
  const b = usePhraseFrame("Gelapnya dasar");
  const c = usePhraseFrame("gelapnya perut");
  const lonelyAt = usePhraseFrame("Sunyi sekali");
  const hopeAt = usePhraseFrame("masih ada Allah");

  const panelsOut = interpolate(frame, [lonelyAt, lonelyAt + 25], [1, 0], clamp);
  const glow = spring({ frame: frame - hopeAt, fps, config: { damping: 30 } });

  return (
    <AbsoluteFill style={{ background: "#05060F" }}>
      <AbsoluteFill
        style={{
          flexDirection: "row",
          gap: 50,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 140,
          opacity: panelsOut,
        }}
      >
        <Panel at={a} num={1} label="Gelapnya malam" bg="linear-gradient(#0B0F2E, #232A5C)">
          <Stars count={30} seed="p1" />
          <Moon x={260} y={220} r={90} />
        </Panel>
        <Panel at={b} num={2} label="Dasar laut" bg="linear-gradient(#08304D, #020B16)">
          <Bubbles count={14} seed="p2" />
        </Panel>
        <Panel at={c} num={3} label="Perut ikan" bg="#120914">
          <div style={{ position: "absolute", left: -120, top: 140, opacity: 0.6 }}>
            <BigFish width={760} />
          </div>
          <AbsoluteFill style={{ background: "rgba(10,0,10,0.55)" }} />
        </Panel>
      </AbsoluteFill>

      {/* Cahaya harapan: Allah Maha Mendengar */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 160,
          opacity: glow,
        }}
      >
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: `radial-gradient(circle, #FFF6CF, ${colors.gold} 45%, transparent 70%)`,
            scale: `${0.6 + glow * 0.6 + Math.sin(frame / 12) * 0.04}`,
            boxShadow: `0 0 200px 80px ${colors.gold}55`,
          }}
        />
        <div
          style={{
            marginTop: 70,
            fontFamily: titleFont,
            fontSize: 84,
            fontWeight: 600,
            color: colors.gold,
          }}
        >
          Allah Maha Mendengar
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
