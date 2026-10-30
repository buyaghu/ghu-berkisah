import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { usePhraseFrame, useVoice } from "../lib/voice";
import { arabicFont, bodyFont, colors, LEAD_IN, titleFont } from "../theme";
import { clamp, type SceneProps } from "./common";

// Kata-kata yang menyala satu per satu mengikuti suara Ghu
const Karaoke: React.FC<{ text: string; count: number; lit: string; dim: string; mark: string }> = ({
  text,
  count,
  lit,
  dim,
  mark,
}) => (
  <>
    {text.split(" ").map((w, i) => (
      <React.Fragment key={i}>
        <span
          style={{
            color: i < count ? lit : dim,
            background: i === count - 1 ? mark : "transparent",
            borderRadius: 12,
            padding: "0 6px",
          }}
        >
          {w}
        </span>{" "}
      </React.Fragment>
    ))}
  </>
);

export const DoaScene: React.FC<SceneProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const artiAt = usePhraseFrame("Artinya");
  const answeredAt = usePhraseFrame(scene.doa?.glowPhrase ?? "Artinya");
  const doa = scene.doa;
  if (!doa) throw new Error(`Scene ${scene.id} butuh data "doa"`);
  // Doa yang panjang (mis. doa Nabi Sulaiman) memakai huruf lebih kecil
  const long = doa.arab.length > 80;
  // Layar sempit (versi Shorts/Reels vertikal): huruf lebih kecil
  const narrow = width < 1300;

  const warm = interpolate(frame, [answeredAt, answeredAt + 40], [0, 1], clamp);

  // Kemajuan bacaan: bagian latin (sebelum "Artinya") dan bagian arti
  const voice = useVoice();
  const t = frame / fps - LEAD_IN;
  const artIdx = Math.max(1, voice.words.findIndex((w) => w.text.startsWith("Artinya")));
  const spoken = voice.words.filter((w) => w.start <= t);
  const latinFrac = Math.min(1, spoken.filter((_, i) => i < artIdx).length / artIdx);
  const latinWords = doa.latin.split(" ").length;
  const arabWords = doa.arab.split(" ").length;
  const artiCount = Math.max(0, spoken.length - artIdx - 1);
  const isWarm = warm > 0.5;
  const fadeIn = (start: number) =>
    interpolate(frame, [start, start + 20], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #1F2A6B, #070A1F)" }}>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #FFE8A8, #F7B267 70%)", opacity: warm }} />
      {/* Sinar cahaya berputar pelan */}
      <div
        style={{
          position: "absolute",
          left: width / 2 - 1100,
          top: height * 0.4 - 1100,
          width: 2200,
          height: 2200,
          borderRadius: "50%",
          background: `repeating-conic-gradient(from ${frame * 0.3}deg, rgba(255,214,110,0.10) 0deg 8deg, transparent 8deg 24deg)`,
          opacity: 0.8,
        }}
      />
      {/* Partikel cahaya naik (tasbih) */}
      {new Array(50).fill(0).map((_, i) => {
        const y = height - ((random(`d${i}`) * height + frame * (1 + random(`ds${i}`) * 2)) % height);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: random(`dx${i}`) * width,
              top: y,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: colors.gold,
              opacity: 0.25 + 0.5 * Math.abs(Math.sin(frame / 15 + i)),
              boxShadow: `0 0 12px ${colors.gold}`,
            }}
          />
        );
      })}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: narrow ? 30 : long ? 200 : 170, paddingLeft: narrow ? 50 : 140, paddingRight: narrow ? 50 : 140 }}>
        <div
          dir="rtl"
          style={{
            fontFamily: arabicFont,
            fontSize: narrow ? 58 : long ? 70 : 104,
            lineHeight: long ? 1.75 : 1.7,
            textAlign: "center",
            color: warm > 0.5 ? colors.ink : "#FFF3C4",
            textShadow: `0 0 30px ${colors.gold}88`,
            opacity: fadeIn(5),
          }}
        >
          <Karaoke
            text={doa.arab}
            count={Math.round(latinFrac * arabWords)}
            lit={isWarm ? colors.ink : "#FFF3C4"}
            dim={isWarm ? "#7A6A55" : "#8C93C9"}
            mark="rgba(255,201,74,0.25)"
          />
        </div>
        <div
          style={{
            fontFamily: titleFont,
            fontStyle: "italic",
            fontSize: narrow ? 34 : long ? 40 : 54,
            marginTop: long ? 10 : 20,
            maxWidth: 1600,
            textAlign: "center",
            color: warm > 0.5 ? "#7A3E12" : colors.gold,
            opacity: fadeIn(20),
          }}
        >
          <Karaoke
            text={doa.latin}
            count={Math.round(latinFrac * latinWords)}
            lit={isWarm ? "#7A3E12" : colors.gold}
            dim={isWarm ? "#B08A6A" : "#7F86B8"}
            mark="rgba(255,201,74,0.3)"
          />
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: narrow ? 33 : long ? 38 : 44,
            marginTop: long ? 24 : 30,
            maxWidth: 1400,
            textAlign: "center",
            color: warm > 0.5 ? colors.ink : colors.white,
            opacity: fadeIn(artiAt),
          }}
        >
          “
          <Karaoke
            text={doa.arti}
            count={artiCount}
            lit={isWarm ? colors.ink : colors.white}
            dim={isWarm ? "#8A7A6A" : "#9AA0CF"}
            mark="rgba(255,201,74,0.3)"
          />
          ”
          <div style={{ fontSize: 34, marginTop: 14, opacity: 0.8 }}>({doa.sumber})</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
