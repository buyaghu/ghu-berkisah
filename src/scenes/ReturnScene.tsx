import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { City } from "../components/objects";
import { Clouds, Sea, Sky, Sun, calmSea } from "../components/nature";
import { usePhraseFrame } from "../lib/voice";
import { colors, titleFont } from "../theme";
import { clamp, type SceneProps } from "./common";

// Langit muram di atas Ninawa -> kaum bertaubat -> azab diangkat -> 100.000+ beriman
export const ReturnScene: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const forgiveAt = usePhraseFrame("Allah menghilangkan azab");
  const countAt = usePhraseFrame("seratus ribu");
  const hamdAt = usePhraseFrame("Alhamdulillah");

  const dark = interpolate(frame, [forgiveAt, forgiveAt + 40], [1, 0], clamp);
  const count = Math.round(
    interpolate(frame, [countAt, countAt + 50], [0, 100000], clamp),
  );
  const hamd = spring({ frame: frame - hamdAt, fps, config: { damping: 9 } });

  return (
    <AbsoluteFill>
      <Sky top="#8ED6F7" bottom="#FFF0D2" />
      <Sun x={1500} y={230} r={110} />
      <Clouds count={4} speed={0.4} />
      {/* Langit muram, lalu cerah saat azab diangkat */}
      <AbsoluteFill style={{ opacity: dark }}>
        <Sky top="#2C2F45" bottom="#6B6680" />
        <Clouds count={10} color="#3B3A50" speed={1.2} seed="azab" maxY={300} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, bottom: 170 }}>
        <City windowGlow={0.4 + (1 - dark) * 0.4} />
      </div>
      <Sea layers={calmSea(900).slice(0, 3)} speed={0.6} />

      {/* Lentera-lentera kecil tanda penduduk yang beriman */}
      {new Array(60).fill(0).map((_, i) => {
        const at = countAt + i * 0.8;
        const s = spring({ frame: frame - at, fps, config: { damping: 12 } });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 60 + random(`lx${i}`) * (width - 120),
              top: 560 + random(`ly${i}`) * 220 - s * 40 - Math.sin(frame / 20 + i) * 6,
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: colors.gold,
              boxShadow: `0 0 20px 6px ${colors.gold}AA`,
              opacity: s,
            }}
          />
        );
      })}

      {frame >= countAt && (
        <div
          style={{
            position: "absolute",
            top: 170,
            width: "100%",
            textAlign: "center",
            fontFamily: titleFont,
            fontWeight: 700,
            fontSize: 130,
            color: colors.white,
            textShadow: "0 4px 18px rgba(30,20,60,0.75), 0 8px 0 rgba(0,0,0,0.2)",
          }}
        >
          {count.toLocaleString("id-ID")}
          {count >= 100000 ? "+" : ""}
          <div style={{ fontSize: 56, fontWeight: 500 }}>orang beriman kepada Allah</div>
        </div>
      )}
      {frame >= hamdAt && (
        <div
          style={{
            position: "absolute",
            top: 480,
            width: "100%",
            textAlign: "center",
            fontFamily: titleFont,
            fontWeight: 700,
            fontSize: 110,
            color: colors.gold,
            textShadow: "0 6px 0 #B5763D",
            scale: `${hamd}`,
          }}
        >
          Alhamdulillah!
        </div>
      )}
    </AbsoluteFill>
  );
};
