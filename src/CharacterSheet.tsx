import React from "react";
import { AbsoluteFill } from "remotion";
import { Ghu, GhuFull, type GhuPose } from "./components/Ghu";
import { IslamicPattern } from "./components/nature";
import { colors, titleFont } from "./theme";

// Lembar karakter Ghu untuk ditinjau sebelum dipakai di video
const POSES: {
  pose: GhuPose;
  label: string;
  happy?: boolean;
  talking?: boolean;
  walking?: boolean;
}[] = [
  { pose: "diam", label: "Diam" },
  { pose: "bercerita", label: "Bercerita", talking: true },
  { pose: "melambai", label: "Melambai", talking: true },
  { pose: "diam", label: "Senang", happy: true },
  { pose: "diam", label: "Berjalan", walking: true, talking: true },
];

export const CharacterSheet: React.FC = () => (
  <AbsoluteFill
    style={{ background: `linear-gradient(135deg, ${colors.cream}, ${colors.pinkSoft})` }}
  >
    <IslamicPattern color={colors.hijabDark} opacity={0.1} />
    <div
      style={{
        position: "absolute",
        top: 40,
        width: "100%",
        textAlign: "center",
        fontFamily: titleFont,
        fontWeight: 700,
        fontSize: 72,
        color: colors.ink,
      }}
    >
      Karakter Ghu
    </div>
    <div
      style={{
        position: "absolute",
        top: 170,
        left: 60,
        right: 60,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end",
      }}
    >
      {POSES.map((p) => (
        <div key={p.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <GhuFull
            size={290}
            pose={p.pose}
            happy={p.happy}
            talking={p.talking ?? false}
            walking={p.walking}
          />
          <div style={{ fontFamily: titleFont, fontWeight: 600, fontSize: 44, color: colors.maroon, marginTop: 6 }}>
            {p.label}
          </div>
        </div>
      ))}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: "50%",
            overflow: "hidden",
            border: "8px solid white",
            background: colors.pinkSoft,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 200,
          }}
        >
          <Ghu headOnly size={270} talking={false} />
        </div>
        <div style={{ fontFamily: titleFont, fontWeight: 600, fontSize: 44, color: colors.maroon }}>
          Wajah (avatar)
        </div>
      </div>
    </div>
  </AbsoluteFill>
);
