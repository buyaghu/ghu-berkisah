import React from "react";
import { AbsoluteFill } from "remotion";
import { Ghu, GhuFull } from "./components/Ghu";
import { IslamicPattern } from "./components/nature";
import { Ant, BigFish, Ship } from "./components/objects";
import { bodyFont, colors, titleFont } from "./theme";

// Aset channel YouTube: foto profil (800×800) & banner (2560×1440).
// Nama & tagline bisa diganti lewat props di Remotion Studio.

export type ChannelArtProps = { name: string; tagline: string; instagram: string };

export const channelDefaults: ChannelArtProps = {
  name: "Ghu Berkisah",
  tagline: "Kisah Nabi & Hikmah untuk Anak",
  // Akun Instagram resmi
  instagram: "@buyaaghu",
};

const background = `radial-gradient(circle at 50% 45%, ${colors.cream}, ${colors.pinkSoft} 60%, ${colors.lavender})`;

export const ChannelAvatar: React.FC = () => (
  <AbsoluteFill style={{ background }}>
    <IslamicPattern color={colors.hijabDark} opacity={0.12} />
    {/* Lingkaran aman: YouTube memotong foto profil menjadi bulat */}
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 20 }}>
      <Ghu headOnly happy size={520} talking={false} />
    </AbsoluteFill>
  </AbsoluteFill>
);

// Area aman banner YouTube (tampil di semua perangkat): 1546×423 di tengah
const SAFE = { width: 1546, height: 423 };

export const ChannelBanner: React.FC<ChannelArtProps> = ({ name, tagline, instagram }) => (
  <AbsoluteFill style={{ background }}>
    <IslamicPattern color={colors.hijabDark} opacity={0.12} />
    {/* Hiasan di luar area aman (hanya terlihat di TV/desktop lebar) */}
    <div style={{ position: "absolute", left: 120, top: 760, opacity: 0.9 }}>
      <Ship width={360} />
    </div>
    <div style={{ position: "absolute", right: 80, top: 540, opacity: 0.9 }}>
      <BigFish width={420} />
    </div>
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: SAFE.width,
          height: SAFE.height,
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 40,
        }}
      >
        <div style={{ position: "relative", width: 300, height: SAFE.height }}>
          <div style={{ position: "absolute", left: 40, top: -10 }}>
            <GhuFull size={190} pose="melambai" happy talking={false} />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: titleFont,
              fontWeight: 700,
              fontSize: 150,
              lineHeight: 1,
              color: colors.maroon,
              textShadow: `6px 6px 0 ${colors.white}`,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 800,
              fontSize: 56,
              color: colors.ink,
              marginTop: 24,
            }}
          >
            {tagline}
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 30 }}>
            {["Kisah Nabi", "Doa", "Hikmah", "Tebak-tebakan"].map((t) => (
              <div
                key={t}
                style={{
                  fontFamily: titleFont,
                  fontWeight: 600,
                  fontSize: 36,
                  color: colors.white,
                  background: "#2BB3C0",
                  padding: "8px 28px",
                  borderRadius: 999,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 38, color: colors.maroon, marginTop: 22 }}>
            Instagram {instagram}
          </div>
        </div>
        <div style={{ position: "absolute", right: 10, bottom: 10 }}>
          <Ant size={170} carrying />
        </div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
