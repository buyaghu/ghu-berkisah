import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Ark, Mountain } from "../components/objects";
import { Clouds, LightRays, Lightning, Rain, Sea, Sky, Sun, calmSea, stormSea } from "../components/nature";
import { colors } from "../theme";
import { clamp, type SceneProps } from "./common";

// Bahtera dibangun di daratan: papan demi papan muncul (tanpa menggambar orang).
export const ArkBuildScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const build = interpolate(frame, [20, durationInFrames * 0.8], [0.05, 1], clamp);
  const tuk = Math.max(0, Math.sin(frame / 3)) * (build < 1 ? 1 : 0);
  return (
    <AbsoluteFill>
      <Sky top="#8FD0F2" bottom="#E8F6FF" />
      <Sun x={1600} y={170} r={110} />
      <Clouds count={4} speed={0.4} />
      {/* bukit jauh */}
      <div style={{ position: "absolute", left: -100, bottom: 250, width: 1100, height: 330, borderRadius: "50% 50% 0 0", background: "#8FD08A" }} />
      <div style={{ position: "absolute", left: 800, bottom: 250, width: 1300, height: 280, borderRadius: "50% 50% 0 0", background: "#7CC47A" }} />
      <AbsoluteFill style={{ background: colors.leaf, top: 760 }} />
      <div style={{ position: "absolute", left: 600, top: 215 + tuk * -4 }}>
        <Ark width={1050} build={build} />
      </div>
      {/* Tumpukan papan di tanah */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 330 + i * 18,
            top: 800 - i * 22,
            width: 230,
            height: 20,
            borderRadius: 6,
            background: i % 2 ? "#C98B4E" : "#B5763D",
            opacity: 1 - build * 0.6,
          }}
        />
      ))}
      <AbsoluteFill style={{ background: colors.leafDark, top: 930, opacity: 0.6 }} />
    </AbsoluteFill>
  );
};

// Air bah: hujan deras, air naik, bahtera terombang-ambing di atas gelombang.
export const FloodScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const level = interpolate(frame, [0, durationInFrames], [800, 560], clamp);
  const sea = stormSea(level);
  const flash = [Math.round(durationInFrames * 0.2), Math.round(durationInFrames * 0.55), Math.round(durationInFrames * 0.85)];
  return (
    <AbsoluteFill>
      <Sky top="#1D2340" bottom="#55627C" />
      <Clouds count={9} color="#3A4258" speed={2} seed="flood" maxY={260} />
      {/* puncak bukit yang perlahan tenggelam */}
      <div style={{ position: "absolute", left: 80, top: level - 170, opacity: interpolate(frame, [0, durationInFrames * 0.7], [1, 0], clamp) }}>
        <Mountain width={420} color="#5E6A5A" />
      </div>
      <Sea layers={sea.slice(0, 2)} speed={2.2} />
      <div
        style={{
          position: "absolute",
          left: 560,
          top: level - 470 + Math.sin(frame / 12) * 22,
          rotate: `${Math.sin(frame / 16) * 5}deg`,
        }}
      >
        <Ark width={820} />
      </div>
      <Sea layers={sea.slice(2)} speed={2.6} />
      <Rain count={200} opacity={0.6} />
      <Lightning flashFrames={flash} />
    </AbsoluteFill>
  );
};

// Air surut, bahtera berlabuh di atas gunung Judi, langit cerah.
export const JudiScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const bright = interpolate(frame, [0, 60], [0, 1], clamp);
  const water = interpolate(frame, [0, durationInFrames * 0.7], [560, 900], clamp);
  return (
    <AbsoluteFill>
      <Sky top="#6A7A9A" bottom="#C9D4E4" />
      <AbsoluteFill style={{ opacity: bright }}>
        <Sky top="#7ECBF2" bottom="#FFF1D0" />
      </AbsoluteFill>
      <Sun x={1500} y={190} r={120} color="#FFC94A" />
      <AbsoluteFill style={{ opacity: bright * 0.6 }}>
        <LightRays />
      </AbsoluteFill>
      <Clouds count={4} speed={0.3} />
      <div style={{ position: "absolute", left: 500, top: 260 }}>
        <Mountain width={1000} snow />
      </div>
      <div style={{ position: "absolute", left: 880, top: 95 + interpolate(frame, [0, 60], [60, 0], clamp) }}>
        <Ark width={480} />
      </div>
      <Sea layers={calmSea(water)} speed={0.7} />
    </AbsoluteFill>
  );
};
