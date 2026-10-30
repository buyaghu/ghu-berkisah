import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BigFish, GourdPlant } from "../components/objects";
import { Clouds, Sea, Sky, Sun, calmSea } from "../components/nature";
import { usePhraseFrame } from "../lib/voice";
import { colors } from "../theme";
import { clamp, type SceneProps } from "./common";

export const ShoreScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const growAt = usePhraseFrame("menumbuhkan");
  const shadeAt = usePhraseFrame("meneduhkan");
  const healthyAt = usePhraseFrame("sehat kembali");

  const fishX = interpolate(frame, [0, 60, 120], [700, 650, -900], clamp);
  const grow = interpolate(frame, [growAt, shadeAt + 30], [0, 1], clamp);
  const bright = interpolate(frame, [healthyAt, healthyAt + 40], [0, 1], clamp);
  const heat = interpolate(frame, [0, growAt, shadeAt + 30], [0.35, 0.35, 0], clamp);

  return (
    <AbsoluteFill>
      <Sky top="#FFB55E" bottom="#FFE7B0" />
      <AbsoluteFill style={{ opacity: bright }}>
        <Sky top="#86D3F6" bottom="#E3F7FF" />
      </AbsoluteFill>
      <Sun x={1650} y={170} r={120} color="#FFC94A" />
      <Clouds count={3} speed={0.3} />
      {/* Laut di kiri, pantai di kanan */}
      <div style={{ position: "absolute", left: -900, top: 0, width: 1920, height: 1080 }}>
        <Sea layers={calmSea(620)} speed={0.7} />
      </div>
      <div style={{ position: "absolute", left: fishX, top: 560, scale: "0.55", transformOrigin: "left top" }}>
        <BigFish tailAngle={Math.sin(frame / 8) * 12} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 700,
          right: -200,
          bottom: 0,
          height: 520,
          background: colors.sand,
          borderTopLeftRadius: "60% 100%",
        }}
      />
      <div style={{ position: "absolute", left: 880, bottom: 230 }}>
        <GourdPlant progress={grow} width={880} />
      </div>
      {/* Bayangan teduh di bawah pohon labu */}
      <div
        style={{
          position: "absolute",
          left: 960,
          bottom: 190,
          width: 760,
          height: 90,
          borderRadius: "50%",
          background: "rgba(60,110,50,0.35)",
          opacity: grow,
        }}
      />
      <AbsoluteFill style={{ background: "#FF9A3C", opacity: heat, mixBlendMode: "multiply" }} />
      {/* kilau kecil saat sehat kembali */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 68% 55%, ${colors.gold}66, transparent 40%)`,
          opacity: bright * (0.7 + Math.sin(frame / 10) * 0.3),
        }}
      />
    </AbsoluteFill>
  );
};
