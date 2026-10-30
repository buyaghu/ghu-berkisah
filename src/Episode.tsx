import React from "react";
import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Captions, SceneLabel, SourceBadge } from "./components/Captions";
import { GhuAvatar } from "./components/Ghu";
import { ShotSeries } from "./components/ShotSeries";
import type { EpisodeData } from "./lib/metadata";
import { phraseSeconds, VoiceProvider, type SceneVoice } from "./lib/voice";
import { visuals } from "./scenes";
import { LEAD_IN, TRANSITION_FRAMES } from "./theme";
import type { Scene, Story } from "./types";

export type EpisodeProps = {
  story: Story;
  data: EpisodeData | null;
  showSubscribe: boolean;
  sfxVolume: number;
};

export const SceneSfx: React.FC<{
  scene: Scene;
  voice: SceneVoice;
  available: string[];
  sceneFrames: number;
  sfxVolume: number;
}> = ({ scene, voice, available, sceneFrames, sfxVolume }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {(scene.sfx ?? [])
        .filter((cue) => available.includes(cue.sound))
        .map((cue, i) => {
          const seconds =
            typeof cue.at === "number"
              ? cue.at
              : LEAD_IN + phraseSeconds(voice, cue.at.phrase);
          const from = Math.round(seconds * fps);
          const length = sceneFrames - from;
          const vol = (cue.volume ?? 0.6) * sfxVolume;
          return (
            <Sequence
              key={i}
              name={`SFX ${cue.sound}`}
              from={from}
              durationInFrames={cue.loop ? length : undefined}
              layout="none"
            >
              <Audio
                src={staticFile(`sfx/${cue.sound}.mp3`)}
                loop={cue.loop}
                volume={
                  cue.loop
                    ? (f) =>
                        vol *
                        interpolate(f, [0, 15, length - 20, length], [0, 1, 1, 0], {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        })
                    : vol
                }
              />
            </Sequence>
          );
        })}
    </>
  );
};

export const Episode: React.FC<EpisodeProps> = ({
  story,
  data,
  showSubscribe,
  sfxVolume,
}) => {
  const { fps } = useVideoConfig();
  if (!data) return null;

  return (
    <AbsoluteFill style={{ background: "black" }}>
      <TransitionSeries>
        {story.scenes.flatMap((scene, i) => {
          const voice = data.voices[scene.id];
          const frames = data.sceneFrames[scene.id];
          const config = visuals[scene.visual];
          const items = [
            <TransitionSeries.Sequence
              key={scene.id}
              name={scene.id}
              durationInFrames={frames}
            >
              <VoiceProvider voice={voice}>
                <AbsoluteFill>
                  <ShotSeries scene={scene} story={story} showSubscribe={showSubscribe} />
                  {scene.label && <SceneLabel text={scene.label} accent={story.accent} />}
                  {scene.sumber && <SourceBadge text={scene.sumber} accent={story.accent} />}
                  {config.avatar && (
                    <div style={{ position: "absolute", left: 80, bottom: 50 }}>
                      <GhuAvatar />
                    </div>
                  )}
                  {config.captionsLeft !== null && (
                    <Captions
                      accent={story.accent}
                      left={config.captionsLeft}
                      right={config.ghuStage ? 520 : 120}
                    />
                  )}
                </AbsoluteFill>
                {voice.audioFile && (
                  <Sequence name="VO Ghu" from={Math.round(LEAD_IN * fps)} layout="none">
                    <Audio src={staticFile(voice.audioFile)} />
                  </Sequence>
                )}
                <SceneSfx
                  scene={scene}
                  voice={voice}
                  available={data.availableSfx}
                  sceneFrames={frames}
                  sfxVolume={sfxVolume}
                />
              </VoiceProvider>
            </TransitionSeries.Sequence>,
          ];
          if (i < story.scenes.length - 1) {
            items.push(
              <TransitionSeries.Transition
                key={`${scene.id}-t`}
                presentation={i % 3 === 2 ? slide({ direction: "from-right" }) : fade()}
                timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
              />,
            );
          }
          return items;
        })}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
