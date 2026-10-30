import React from "react";
import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { channelDefaults } from "./ChannelArt";
import { Captions } from "./components/Captions";
import { GhuFull } from "./components/Ghu";
import { IslamicPattern } from "./components/nature";
import { Ant, HikmahIconSvg } from "./components/objects";
import { ShotSeries } from "./components/ShotSeries";
import { SceneSfx } from "./Episode";
import type { EpisodeData } from "./lib/metadata";
import { usePhraseFrame, VoiceProvider, type SceneVoice } from "./lib/voice";
import { SHORT_OUTRO_ID, shortIntroId, type ShortDef } from "./shorts";
import { bodyFont, colors, LEAD_IN, titleFont, TRANSITION_FRAMES } from "./theme";
import type { Scene, Story } from "./types";

// Video vertikal 1080×1920. Tata letak (dari atas):
// judul → "layar" adegan kartun → label dalil → subtitle → Ghu bercerita.
// Bagian penting berada di area aman YouTube Shorts & Instagram Reels.

const WINDOW = { left: 40, top: 360, width: 1000 };
const WINDOW_H = (WINDOW.width / 1920) * 1080;

export type ShortProps = {
  story: Story;
  short: ShortDef;
  data: EpisodeData | null;
  channelName: string;
  instagram: string;
  sfxVolume: number;
};

const Header: React.FC<{ story: Story; title: string }> = ({ story, title }) => (
  <div style={{ position: "absolute", top: 130, left: 40, right: 40, textAlign: "center" }}>
    <div
      style={{
        display: "inline-block",
        background: story.accent,
        color: colors.white,
        fontFamily: bodyFont,
        fontWeight: 800,
        fontSize: 38,
        padding: "8px 32px",
        borderRadius: 999,
      }}
    >
      {story.title}
    </div>
    <div
      style={{
        fontFamily: titleFont,
        fontWeight: 700,
        fontSize: 86,
        lineHeight: 1.05,
        color: colors.maroon,
        marginTop: 14,
        textShadow: `4px 4px 0 ${colors.white}`,
      }}
    >
      {title}
    </div>
  </div>
);

const ShortScene: React.FC<{
  scene: Scene;
  story: Story;
  data: EpisodeData;
  sfxVolume: number;
}> = ({ scene, story, data, sfxVolume }) => {
  const voice = data.voices[scene.id];
  const frames = data.sceneFrames[scene.id];
  const isDoa = scene.visual === "doa";

  return (
    <VoiceProvider voice={voice}>
      {isDoa ? (
        // Doa ditampilkan penuh lebar agar tulisannya besar
        <div style={{ position: "absolute", left: 0, top: 350, width: 1080, height: 1110, overflow: "hidden" }}>
          <Sequence width={1080} height={1110} durationInFrames={frames}>
            <ShotSeries scene={scene} story={story} showSubscribe={false} />
          </Sequence>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            left: WINDOW.left,
            top: WINDOW.top,
            width: WINDOW.width,
            height: WINDOW_H,
            borderRadius: 40,
            overflow: "hidden",
            border: `10px solid ${colors.white}`,
            boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ width: 1920, height: 1080, scale: `${WINDOW.width / 1920}`, transformOrigin: "top left" }}>
            <Sequence width={1920} height={1080} durationInFrames={frames}>
              <ShotSeries scene={scene} story={story} showSubscribe={false} />
            </Sequence>
          </div>
        </div>
      )}
      {scene.sumber && !isDoa && (
        <div
          style={{
            position: "absolute",
            top: WINDOW.top + WINDOW_H + 30,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 32,
            color: colors.ink,
          }}
        >
          <span style={{ background: colors.white, border: `4px solid ${story.accent}`, borderRadius: 999, padding: "6px 24px" }}>
            {scene.sumber}
          </span>
        </div>
      )}
      {!isDoa && <Captions accent={story.accent} left={50} right={50} bottom={660} fontSize={56} />}
      <div style={{ position: "absolute", left: isDoa ? 440 : 405, bottom: 10 }}>
        <GhuFull size={isDoa ? 200 : 270} pose="bercerita" />
      </div>
      <VoiceAudio voice={voice} />
      <SceneSfx scene={scene} voice={voice} available={data.availableSfx} sceneFrames={frames} sfxVolume={sfxVolume} />
    </VoiceProvider>
  );
};

const VoiceAudio: React.FC<{ voice: SceneVoice }> = ({ voice }) => {
  const { fps } = useVideoConfig();
  if (!voice.audioFile) return null;
  return (
    <Sequence from={Math.round(LEAD_IN * fps)} layout="none">
      <Audio src={staticFile(voice.audioFile)} />
    </Sequence>
  );
};

// Layar judul + VO pembuka Ghu (seperti di video panjang)
const ShortIntro: React.FC<{ story: Story; short: ShortDef; available: string[] }> = ({
  story,
  short,
  available,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const introduceAt = usePhraseFrame("Perkenalkan");
  const pop = (d: number) => spring({ frame: frame - d, fps, config: { damping: 10 } });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 30%, ${colors.cream}, ${colors.pinkSoft} 65%, ${colors.lavender})` }}>
      <IslamicPattern color={colors.hijabDark} opacity={0.12} />
      <div style={{ position: "absolute", top: 230, left: 50, right: 50, textAlign: "center", scale: `${pop(0)}` }}>
        <div
          style={{
            display: "inline-block",
            background: story.accent,
            color: colors.white,
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 44,
            padding: "10px 36px",
            borderRadius: 999,
          }}
        >
          {story.title}
        </div>
        <div
          style={{
            fontFamily: titleFont,
            fontWeight: 700,
            fontSize: 130,
            lineHeight: 1.02,
            marginTop: 24,
            color: colors.maroon,
            textShadow: `6px 6px 0 ${colors.white}`,
          }}
        >
          {short.title}
        </div>
      </div>
      {/* Ilustrasi judul */}
      <div style={{ position: "absolute", top: 700, left: 0, right: 0, height: 260, scale: `${pop(12)}` }}>
        {short.art === "ants" ? (
          new Array(5).fill(0).map((_, i) => (
            <div key={i} style={{ position: "absolute", left: ((i * 230 + frame * 2.5) % 1250) - 170, top: 60 + (i % 2) * 30 }}>
              <Ant size={170} walk={frame + i * 4} carrying={i % 2 === 0} />
            </div>
          ))
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: 250,
                height: 250,
                borderRadius: "50%",
                background: `radial-gradient(circle, #FFF6CF, ${colors.gold}88 60%, transparent 72%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                scale: `${1 + Math.sin(frame / 12) * 0.05}`,
              }}
            >
              <HikmahIconSvg icon="hands" size={180} />
            </div>
          </div>
        )}
      </div>
      <Captions accent={story.accent} left={50} right={50} bottom={660} fontSize={56} />
      <div style={{ position: "absolute", left: 395, bottom: 10 }}>
        <GhuFull size={290} pose={frame < introduceAt ? "melambai" : "bercerita"} />
      </div>
      {available.includes("ding") && <Audio src={staticFile("sfx/ding.mp3")} volume={0.5} />}
    </AbsoluteFill>
  );
};

// Penutup: ajakan menonton kisah lengkap
const CallToAction: React.FC<{
  story: Story;
  channelName: string;
  instagram: string;
  available: string[];
}> = ({ story, channelName, instagram, available }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = (d: number) => spring({ frame: frame - d, fps, config: { damping: 10 } });
  return (
    <AbsoluteFill style={{ background: `linear-gradient(${colors.cream}, ${colors.pinkSoft})` }}>
      <IslamicPattern color={colors.hijabDark} opacity={0.12} />
      <div style={{ position: "absolute", top: 260, width: "100%", textAlign: "center", scale: `${pop(0)}` }}>
        <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 52, color: colors.ink }}>
          Kisah lengkap {story.title}
        </div>
        <div style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 52, color: colors.ink, marginTop: 8 }}>
          ada di YouTube
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 470,
          width: "100%",
          textAlign: "center",
          fontFamily: titleFont,
          fontWeight: 700,
          fontSize: 120,
          color: colors.maroon,
          textShadow: `6px 6px 0 ${colors.white}`,
          scale: `${pop(8)}`,
        }}
      >
        {channelName}
      </div>
      <div
        style={{
          position: "absolute",
          top: 660,
          width: "100%",
          textAlign: "center",
          fontFamily: titleFont,
          fontWeight: 600,
          fontSize: 54,
          color: story.accent,
          opacity: interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        Yuk, tonton & ikuti!
      </div>
      {/* Akun Instagram resmi */}
      <div
        style={{
          position: "absolute",
          top: 760,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          scale: `${pop(30)}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: "linear-gradient(90deg, #F58529, #DD2A7B, #8134AF)",
            color: colors.white,
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 46,
            padding: "14px 36px",
            borderRadius: 999,
          }}
        >
          <svg width={48} height={48} viewBox="0 0 48 48">
            <rect x={4} y={4} width={40} height={40} rx={12} fill="none" stroke="#FFFFFF" strokeWidth={4} />
            <circle cx={24} cy={24} r={9} fill="none" stroke="#FFFFFF" strokeWidth={4} />
            <circle cx={35} cy={13} r={3} fill="#FFFFFF" />
          </svg>
          {instagram}
        </div>
      </div>
      <Captions accent={story.accent} left={50} right={50} bottom={660} fontSize={56} />
      <div style={{ position: "absolute", left: 395, bottom: 10 }}>
        <GhuFull size={290} pose="melambai" />
      </div>
      {available.includes("ding") && <Audio src={staticFile("sfx/ding.mp3")} volume={0.6} />}
    </AbsoluteFill>
  );
};

export const Short: React.FC<ShortProps> = ({ story, short, data, channelName, instagram, sfxVolume }) => {
  if (!data) return null;
  const introId = shortIntroId(short);
  const scenes = short.sceneIds.map((id) => {
    const scene = story.scenes.find((s) => s.id === id);
    if (!scene) throw new Error(`Scene ${id} tidak ada di kisah ${story.id}`);
    return scene;
  });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(${colors.cream}, #E9F6FB 55%, ${colors.pinkSoft})` }}>
      <IslamicPattern color={story.accent} opacity={0.1} />
      <Header story={story} title={short.title} />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Judul & pembuka" durationInFrames={data.sceneFrames[introId]}>
          <VoiceProvider voice={data.voices[introId]}>
            <ShortIntro story={story} short={short} available={data.availableSfx} />
            <VoiceAudio voice={data.voices[introId]} />
          </VoiceProvider>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />
        {scenes.flatMap((scene) => [
          <TransitionSeries.Sequence key={scene.id} name={scene.id} durationInFrames={data.sceneFrames[scene.id]}>
            <ShortScene scene={scene} story={story} data={data} sfxVolume={sfxVolume} />
          </TransitionSeries.Sequence>,
          <TransitionSeries.Transition
            key={`${scene.id}-t`}
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
          />,
        ])}
        <TransitionSeries.Sequence name="Ajakan & penutup" durationInFrames={data.sceneFrames[SHORT_OUTRO_ID]}>
          <VoiceProvider voice={data.voices[SHORT_OUTRO_ID]}>
            <CallToAction
              story={story}
              channelName={channelName}
              instagram={instagram}
              available={data.availableSfx}
            />
            <VoiceAudio voice={data.voices[SHORT_OUTRO_ID]} />
          </VoiceProvider>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

export const shortDefaults = {
  channelName: channelDefaults.name,
  instagram: channelDefaults.instagram,
  sfxVolume: 1,
};
