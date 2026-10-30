import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { phraseSeconds, useVoice, VoiceProvider, type SceneVoice } from "../lib/voice";
import { visuals } from "../scenes";
import { LEAD_IN } from "../theme";
import type { Scene, Story } from "../types";

// Satu narasi (satu klip VO) dibagi menjadi beberapa adegan.
// Setiap adegan mulai saat frasa-nya diucapkan, dengan perpindahan halus.
const SHOT_TRANSITION = 18;

// Waktu kata digeser supaya cue di dalam adegan tetap tepat
const shiftVoice = (voice: SceneVoice, seconds: number): SceneVoice => ({
  ...voice,
  words: voice.words.map((w) => ({ ...w, start: w.start - seconds, end: w.end - seconds })),
});

const ShotFade: React.FC<{ fade: boolean; children: React.ReactNode }> = ({ fade, children }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, SHOT_TRANSITION], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={fade ? { opacity: t } : undefined}>
      {children}
    </AbsoluteFill>
  );
};

export const ShotSeries: React.FC<{
  scene: Scene;
  story: Story;
  showSubscribe: boolean;
}> = ({ scene, story, showSubscribe }) => {
  const voice = useVoice();
  const { fps, durationInFrames } = useVideoConfig();
  const shots = [
    { start: 0, scene },
    ...(scene.shots ?? []).map((shot) => ({
      start: Math.max(1, Math.round((LEAD_IN + phraseSeconds(voice, shot.phrase)) * fps) - 6),
      scene: {
        ...scene,
        visual: shot.visual,
        ants: shot.ants ?? scene.ants,
        card: shot.card ?? scene.card,
      },
    })),
  ];

  return (
    <>
      {shots.map((shot, i) => {
        const end = i + 1 < shots.length ? shots[i + 1].start + SHOT_TRANSITION : durationInFrames;
        const Visual = visuals[shot.scene.visual].component;
        const content = <Visual scene={shot.scene} story={story} showSubscribe={showSubscribe} />;
        return (
          <Sequence key={i} name={`Adegan ${i + 1}: ${shot.scene.visual}`} from={shot.start} durationInFrames={end - shot.start}>
            <VoiceProvider voice={shiftVoice(voice, shot.start / fps)}>
              <ShotFade fade={i > 0}>
                {content}
              </ShotFade>
            </VoiceProvider>
          </Sequence>
        );
      })}
    </>
  );
};
