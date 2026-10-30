import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { IslamicPattern } from "../components/nature";
import { bodyFont, colors, titleFont } from "../theme";
import { clamp, type SceneProps } from "./common";

// Kitab terbuka dengan halaman yang dibalik, untuk memperkenalkan hadits / ayat
export const BookScene: React.FC<SceneProps> = ({ scene, story }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const open = spring({ frame, fps, config: { damping: 14 } });
  const flip = interpolate(frame, [20, 45], [0, 180], clamp);
  const textIn = spring({ frame: frame - 40, fps, config: { damping: 12 } });
  const card = scene.card;

  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 40%, #FFF4DC, #F4D9A8 70%, #E2B97A)` }}>
      <IslamicPattern color="#B5763D" opacity={0.12} />
      {/* Debu cahaya */}
      {new Array(30).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: random(`k${i}`) * width,
            top: 1080 - ((frame * (0.8 + random(`ks${i}`)) + random(`ky${i}`) * 1080) % 1080),
            width: 10,
            height: 10,
            borderRadius: 5,
            background: colors.gold,
            opacity: 0.5,
            boxShadow: `0 0 12px ${colors.gold}`,
          }}
        />
      ))}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 40, paddingBottom: 160 }}>
        <div style={{ position: "relative", width: 1300, height: 620, scale: `${0.5 + open * 0.35}`, perspective: 2000 }}>
          {/* Sampul */}
          <div style={{ position: "absolute", inset: -24, borderRadius: 30, background: story.accent, boxShadow: "0 30px 50px rgba(0,0,0,0.3)" }} />
          {/* Halaman kiri & kanan */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 650, height: 620, background: "#FFFBF0", borderRadius: "20px 0 0 20px" }} />
          <div style={{ position: "absolute", left: 650, top: 0, width: 650, height: 620, background: "#FFF8E6", borderRadius: "0 20px 20px 0" }} />
          {/* Halaman yang dibalik */}
          <div
            style={{
              position: "absolute",
              left: 650,
              top: 0,
              width: 650,
              height: 620,
              background: "#FFF3D6",
              transformOrigin: "left center",
              rotate: `y ${-flip}deg`,
              borderRadius: "0 20px 20px 0",
              opacity: flip < 179 ? 1 : 0,
            }}
          />
          {/* Isi halaman */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 80px",
              textAlign: "center",
              opacity: textIn,
              scale: `${0.9 + textIn * 0.1}`,
            }}
          >
            <div style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 88, color: colors.maroon, lineHeight: 1.1 }}>
              {card?.title}
            </div>
            {card?.subtitle && (
              <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 44, color: colors.ink, marginTop: 30 }}>
                {card.subtitle}
              </div>
            )}
          </div>
          <div style={{ position: "absolute", left: 646, top: 0, width: 8, height: 620, background: "rgba(0,0,0,0.12)" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
