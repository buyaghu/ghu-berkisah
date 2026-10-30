import type { Scene, Story } from "../types";

export type SceneProps = {
  scene: Scene;
  story: Story;
  showSubscribe?: boolean;
};

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
