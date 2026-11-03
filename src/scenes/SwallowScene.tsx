import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { BigFish } from "../components/objects";
import { Bubbles, LightRays, wavePath } from "../components/nature";
import { usePhraseFrame } from "../lib/voice";
import { clamp, type SceneProps } from "./common";

export const SwallowScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const fishAt = usePhraseFrame("datanglah seekor");
  const openAt = usePhraseFrame("membuka mulutnya");
  const gulpAt = usePhraseFrame("menelan");
  const calmAt = usePhraseFrame("Tapi dengan izin Allah");

  // Kamera turun dari permukaan ke dalam laut
  const dive = interpolate(frame, [20, 80], [0, 1], clamp);
  const fishX = interpolate(frame, [fishAt - 10, openAt], [width + 100, 700], clamp);
  const mouth =
    interpolate(frame, [openAt, openAt + 15], [0, 1], clamp) *
    interpolate(frame, [gulpAt + 4, gulpAt + 10], [1, 0], clamp);
  const leave = interpolate(frame, [calmAt + 30, Math.max(durationInFrames, calmAt + 31)], [0, -500], clamp);
  const gulpSquash = frame > gulpAt + 8 && frame < gulpAt + 20 ? 1 + Math.sin((frame - gulpAt) * 0.6) * 0.04 : 1;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(#3FB6DA, #0C4A72 ${60 - dive * 30}%, #04203A)` }} />
      <LightRays opacity={1 - dive * 0.5} />
      {/* Percikan di permukaan */}
      <AbsoluteFill style={{ opacity: 1 - dive }}>
        <svg width={width} height={height}>
          <path d={wavePath(width, 400, 120, 14, 380, frame / 10)} fill="#8FDCF0" opacity={0.6} transform="translate(0 -100)" />
        </svg>
        {new Array(24).fill(0).map((_, i) => {
          const a = random(`sp${i}`) * Math.PI;
          const t = frame / 20;
          const x = width / 2 + Math.cos(a) * 400 * t;
          const y = 120 - Math.sin(a) * 300 * t + 300 * t * t;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "#DFF6FF",
                opacity: interpolate(frame, [0, 25], [1, 0], clamp),
              }}
            />
          );
        })}
      </AbsoluteFill>
      <Bubbles />
      <div
        style={{
          position: "absolute",
          left: fishX - 450 + leave,
          top: 300 + Math.sin(frame / 20) * 20,
          scale: `${gulpSquash}`,
        }}
      >
        <BigFish mouthOpen={mouth} tailAngle={Math.sin(frame / 8) * 12} />
      </div>
    </AbsoluteFill>
  );
};
