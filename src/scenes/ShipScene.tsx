import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Ship } from "../components/objects";
import { Clouds, Gulls, Sea, Sky, Sun, calmSea } from "../components/nature";
import { usePhraseFrame } from "../lib/voice";
import { clamp, type SceneProps } from "./common";

export const ShipScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const sailAt = usePhraseFrame("Kapal mulai berlayar");
  const gullsAt = usePhraseFrame("burung camar");
  const x = interpolate(frame, [0, sailAt, durationInFrames], [1150, 1100, 500], clamp);
  const sea = calmSea(740);

  return (
    <AbsoluteFill>
      <Sky top="#7CCBF2" bottom="#D8F2FF" />
      <Sun x={350} y={220} r={110} />
      <Clouds count={6} speed={0.6} />
      <Sea layers={sea.slice(0, 2)} speed={1} />
      <div
        style={{
          position: "absolute",
          left: x - 310,
          top: 330 + Math.sin(frame / 15) * 12,
          rotate: `${Math.sin(frame / 20) * 3}deg`,
        }}
      >
        <Ship />
      </div>
      <Sea layers={sea.slice(2)} speed={1} />
      <AbsoluteFill style={{ opacity: interpolate(frame, [gullsAt - 20, gullsAt], [0, 1], clamp) }}>
        <Gulls count={5} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
