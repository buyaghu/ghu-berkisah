import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GhuWalker } from "../components/Ghu";
import { Clouds, IslamicPattern } from "../components/nature";
import { usePhraseFrame } from "../lib/voice";
import { colors, titleFont } from "../theme";
import { clamp, type SceneProps } from "./common";

export const OutroScene: React.FC<SceneProps> = ({
  story,
  showSubscribe = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const byeAt = usePhraseFrame("Sampai jumpa");
  const bye = spring({ frame: frame - byeAt, fps, config: { damping: 10 } });
  const sub = spring({ frame: frame - byeAt - 20, fps, config: { damping: 10 } });
  const click = frame > byeAt + 60;
  // Doa yang dihafalkan diambil dari scene doa di kisah ini
  const doa = story.scenes.find((s) => s.doa)?.doa;
  const longDoa = (doa?.latin.length ?? 0) > 80;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, ${colors.cream}, ${colors.pinkSoft} 60%, ${colors.lavender})`,
      }}
    >
      <IslamicPattern color={colors.hijabDark} />
      <Clouds count={4} speed={0.4} maxY={200} />
      <GhuWalker
        stops={[{ at: 0, x: 140 }]}
        size={330}
        bottom={20}
        pose={frame > byeAt ? "melambai" : "bercerita"}
        happy={frame > byeAt + 40}
      />
      <div
        style={{
          position: "absolute",
          left: 820,
          right: 100,
          top: 150,
          textAlign: "center",
          fontFamily: titleFont,
          opacity: interpolate(frame, [0, 20], [0, 1], clamp),
        }}
      >
        <div style={{ fontSize: 60, color: story.accent, fontWeight: 600 }}>Yuk, hafalkan doanya!</div>
        {doa && (
          <div style={{ fontSize: longDoa ? 34 : 46, lineHeight: 1.3, color: colors.ink, marginTop: 14 }}>
            {doa.latin}
          </div>
        )}
      </div>
      {frame >= byeAt && (
        <div
          style={{
            position: "absolute",
            left: 820,
            right: 100,
            top: longDoa ? 470 : 420,
            textAlign: "center",
            fontFamily: titleFont,
            fontWeight: 700,
            fontSize: 100,
            color: colors.hijabDark,
            scale: `${bye}`,
          }}
        >
          Sampai jumpa!
        </div>
      )}
      {showSubscribe && frame >= byeAt + 20 && (
        <div
          style={{
            position: "absolute",
            left: 1120,
            top: longDoa ? 620 : 580,
            scale: `${sub * (click && frame < byeAt + 66 ? 0.92 : 1)}`,
            background: click ? "#8A8A8A" : "#E62117",
            color: colors.white,
            fontFamily: titleFont,
            fontWeight: 700,
            fontSize: 56,
            padding: "20px 56px",
            borderRadius: 20,
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          }}
        >
          {click ? "Subscribed ✓" : "Subscribe"}
        </div>
      )}
    </AbsoluteFill>
  );
};
