import type React from "react";
import type { VisualKey } from "../types";
import type { SceneProps } from "./common";
import { AntsScene } from "./AntsScene";
import { BirdsScene } from "./BirdsScene";
import { BookScene } from "./BookScene";
import { GardenScene } from "./GardenScene";
import { RoadScene } from "./RoadScene";
import { TasbihWorldScene } from "./TasbihWorldScene";
import { ArmyScene } from "./ArmyScene";
import { CityScene } from "./CityScene";
import { DarknessScene } from "./DarknessScene";
import { DoaScene } from "./DoaScene";
import { HikmahScene } from "./HikmahScene";
import { IntroScene } from "./IntroScene";
import { KingdomScene } from "./KingdomScene";
import { LeavingScene } from "./LeavingScene";
import { LotsScene } from "./LotsScene";
import { OutroScene } from "./OutroScene";
import { QuizScene } from "./QuizScene";
import { ReturnScene } from "./ReturnScene";
import { ShipScene } from "./ShipScene";
import { ShoreScene } from "./ShoreScene";
import { ArkBuildScene, FloodScene, JudiScene } from "./ArkScenes";
import { CityEmptyScene, FireBuildScene, FireScene, IdolsCloseScene, IdolsScene, SkyEarthScene } from "./IbrahimScenes";
import { CallLightScene, DawnHillsScene, DesertScene, FootprintsScene, NightDreamScene, RamScene, TentScene } from "./IsmailScenes";
import { StormScene } from "./StormScene";
import { SwallowScene } from "./SwallowScene";

type VisualConfig = {
  component: React.FC<SceneProps>;
  // Avatar Ghu kecil di pojok kiri bawah (untuk scene kisah)
  avatar: boolean;
  // Posisi kiri teks subtitle; null = subtitle disembunyikan
  captionsLeft: number | null;
  // Scene dengan Ghu badan penuh: subtitle di tengah, Ghu bisa di kiri atau kanan
  ghuStage?: boolean;
};

export const visuals: Record<VisualKey, VisualConfig> = {
  intro: { component: IntroScene, avatar: false, captionsLeft: 520, ghuStage: true },
  kingdom: { component: KingdomScene, avatar: true, captionsLeft: 330 },
  birds: { component: BirdsScene, avatar: true, captionsLeft: 330 },
  road: { component: RoadScene, avatar: true, captionsLeft: 330 },
  garden: { component: GardenScene, avatar: true, captionsLeft: 330 },
  book: { component: BookScene, avatar: true, captionsLeft: 330 },
  tasbihWorld: { component: TasbihWorldScene, avatar: true, captionsLeft: 330 },
  army: { component: ArmyScene, avatar: true, captionsLeft: 330 },
  ants: { component: AntsScene, avatar: true, captionsLeft: 330 },
  city: { component: CityScene, avatar: true, captionsLeft: 330 },
  leaving: { component: LeavingScene, avatar: true, captionsLeft: 330 },
  ship: { component: ShipScene, avatar: true, captionsLeft: 330 },
  storm: { component: StormScene, avatar: true, captionsLeft: 330 },
  lots: { component: LotsScene, avatar: true, captionsLeft: 330 },
  swallow: { component: SwallowScene, avatar: true, captionsLeft: 330 },
  darkness: { component: DarknessScene, avatar: true, captionsLeft: 330 },
  arkBuild: { component: ArkBuildScene, avatar: true, captionsLeft: 330 },
  flood: { component: FloodScene, avatar: true, captionsLeft: 330 },
  judi: { component: JudiScene, avatar: true, captionsLeft: 330 },
  idols: { component: IdolsScene, avatar: true, captionsLeft: 330 },
  idolsClose: { component: IdolsCloseScene, avatar: true, captionsLeft: 330 },
  idolsBroken: { component: IdolsScene, avatar: true, captionsLeft: 330 },
  idolsAsk: { component: IdolsScene, avatar: true, captionsLeft: 330 },
  cityEmpty: { component: CityEmptyScene, avatar: true, captionsLeft: 330 },
  skyEarth: { component: SkyEarthScene, avatar: true, captionsLeft: 330 },
  fire: { component: FireScene, avatar: true, captionsLeft: 330 },
  fireBuild: { component: FireBuildScene, avatar: true, captionsLeft: 330 },
  fireCool: { component: FireScene, avatar: true, captionsLeft: 330 },
  desert: { component: DesertScene, avatar: true, captionsLeft: 330 },
  footprints: { component: FootprintsScene, avatar: true, captionsLeft: 330 },
  tent: { component: TentScene, avatar: true, captionsLeft: 330 },
  tentNight: { component: TentScene, avatar: true, captionsLeft: 330 },
  tentDawn: { component: TentScene, avatar: true, captionsLeft: 330 },
  nightDream: { component: NightDreamScene, avatar: true, captionsLeft: 330 },
  dawnHills: { component: DawnHillsScene, avatar: true, captionsLeft: 330 },
  callLight: { component: CallLightScene, avatar: true, captionsLeft: 330 },
  ram: { component: RamScene, avatar: true, captionsLeft: 330 },
  doa: { component: DoaScene, avatar: false, captionsLeft: null },
  shore: { component: ShoreScene, avatar: true, captionsLeft: 330 },
  return: { component: ReturnScene, avatar: true, captionsLeft: 330 },
  hikmah: { component: HikmahScene, avatar: false, captionsLeft: 520, ghuStage: true },
  quiz: { component: QuizScene, avatar: false, captionsLeft: 520, ghuStage: true },
  outro: { component: OutroScene, avatar: false, captionsLeft: 520, ghuStage: true },
};
