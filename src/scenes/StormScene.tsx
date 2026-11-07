import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Ship } from "../components/objects";
import { Clouds, Lightning, Rain, Sea, Sky, stormSea } from "../components/nature";
import { usePhraseFrameOr } from "../lib/voice";
import { clamp, type SceneProps } from "./common";

export const StormScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const bolt1 = usePhraseFrameOr("ombak besar", 200);
  const bolt2 = usePhraseFrameOr("Para penumpang", 330);
  const rockAt = usePhraseFrameOr("bergoyang", 150);

  const darken = interpolate(frame, [0, 40], [0, 1], clamp);
  const rock = interpolate(frame, [0, rockAt, rockAt + 20], [4, 8, 16], clamp);
  const shake = frame > bolt1 && frame < bolt1 + 12 ? Math.sin(frame * 3) * 12 : 0;
  const sea = stormSea(680);

  return (
    <AbsoluteFill style={{ translate: `${shake}px ${shake / 2}px`, scale: "1.04" }}>
      <Sky top="#7CCBF2" bottom="#D8F2FF" />
      <AbsoluteFill style={{ opacity: darken }}>
        <Sky top="#1D2340" bottom="#4B5875" />
      </AbsoluteFill>
      <Clouds count={9} color="#3A4258" speed={2.2} seed="storm" maxY={250} />
      <Sea layers={sea.slice(0, 2)} speed={2.4} />
      <div
        style={{
          position: "absolute",
          left: 650,
          top: 300 + Math.sin(frame / 7) * 30,
          rotate: `${Math.sin(frame / 9) * rock}deg`,
        }}
      >
        <Ship sailColor="#E8DCC4" />
      </div>
      <Sea layers={sea.slice(2)} speed={2.8} />
      <Rain />
      <Lightning flashFrames={[bolt1, bolt2, Math.round(durationInFrames * 0.85)]} />
    </AbsoluteFill>
  );
};
