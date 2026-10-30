import React from "react";
import { Composition, Still, type CalculateMetadataFunction } from "remotion";
import { ChannelAvatar, ChannelBanner, channelDefaults } from "./ChannelArt";
import { CharacterSheet } from "./CharacterSheet";
import { Episode, type EpisodeProps } from "./Episode";
import { WalkDemo } from "./WalkDemo";
import { Short, shortDefaults, type ShortProps } from "./Short";
import {
  SHORT_OUTRO_ID,
  SHORT_OUTRO_TEXT,
  shortIntroId,
  shortIntroText,
  shorts,
} from "./shorts";
import { loadEpisodeData, loadExtraVoices, totalFrames } from "./lib/metadata";
import { stories } from "./stories";
import { FPS, HEIGHT, TRANSITION_FRAMES, WIDTH } from "./theme";

const calculateMetadata: CalculateMetadataFunction<EpisodeProps> = async ({
  props,
}) => {
  const data = await loadEpisodeData(props.story);
  return {
    durationInFrames: totalFrames(props.story, data),
    props: { ...props, data },
  };
};

const calculateShortMetadata: CalculateMetadataFunction<ShortProps> = async ({ props }) => {
  const episode = await loadEpisodeData(props.story);
  // VO pembuka (khusus Shorts ini) & penutup (dipakai bersama semua Shorts)
  const extra = await loadExtraVoices("voiceover/shorts/manifest.json", [
    { id: shortIntroId(props.short), text: shortIntroText(props.short) },
    { id: SHORT_OUTRO_ID, text: SHORT_OUTRO_TEXT },
  ]);
  const data = {
    ...episode,
    voices: { ...episode.voices, ...extra.voices },
    sceneFrames: { ...episode.sceneFrames, ...extra.sceneFrames },
  };
  const ids = [shortIntroId(props.short), ...props.short.sceneIds, SHORT_OUTRO_ID];
  const frames = ids.reduce((sum, id) => sum + data.sceneFrames[id], 0);
  return {
    durationInFrames: frames - TRANSITION_FRAMES * (ids.length - 1),
    props: { ...props, data },
  };
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Karakter-Ghu"
        component={CharacterSheet}
        durationInFrames={FPS * 6}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Still id="Channel-FotoProfil" component={ChannelAvatar} width={800} height={800} />
      <Still
        id="Channel-Banner"
        component={ChannelBanner}
        width={2560}
        height={1440}
        defaultProps={channelDefaults}
      />
      <Composition
        id="Ghu-Berjalan"
        component={WalkDemo}
        durationInFrames={330}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      {shorts.map((short) => (
        <Composition
          key={short.id}
          id={short.id}
          component={Short}
          durationInFrames={FPS * 60}
          fps={FPS}
          width={1080}
          height={1920}
          defaultProps={{
            story: stories.find((s) => s.id === short.storyId)!,
            short,
            data: null,
            ...shortDefaults,
          }}
          calculateMetadata={calculateShortMetadata}
        />
      ))}
      {stories.map((story) => (
        <Composition
          key={story.id}
          id={`Kisah-${story.id}`}
          component={Episode}
          durationInFrames={FPS * 60}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{
            story,
            data: null,
            showSubscribe: true,
            sfxVolume: 1,
          }}
          calculateMetadata={calculateMetadata}
        />
      ))}
    </>
  );
};
