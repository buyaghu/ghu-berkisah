import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Ant, Anthill, Banner, HikmahIconSvg } from "../components/objects";
import { Clouds, Sky, Stars, Sun } from "../components/nature";
import { usePhraseFrame, useVoice } from "../lib/voice";
import { bodyFont, colors, titleFont } from "../theme";
import type { AntMode, HikmahItem } from "../types";
import { clamp, type SceneProps } from "./common";

// Lembah semut, dari sudut pandang semut. Satu komponen, lima suasana:
// busy (sibuk bekerja), warning (seruan semut), reflect (renungan),
// safe (Nabi Sulaiman tersenyum), tasbih (hadits semut bertasbih).

const GROUND_Y = 800;
const HOLES = [520, 1380];

const Ground: React.FC<{ night?: boolean }> = ({ night }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  return (
    <>
      {/* Rumput tinggi di latar belakang */}
      {new Array(40).fill(0).map((_, i) => {
        const h = 160 + random(`gh${i}`) * 260;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: (i / 40) * width + random(`gx${i}`) * 30,
              top: GROUND_Y - h + 10,
              width: 26,
              height: h,
              borderRadius: "50% 50% 0 0",
              background: night ? "#2E5A4A" : i % 2 ? colors.leaf : "#58B65C",
              transformOrigin: "bottom center",
              rotate: `${Math.sin(frame / 25 + i) * 4}deg`,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: GROUND_Y,
          width: "100%",
          height: 1080 - GROUND_Y,
          background: night ? "#5A3D2B" : "linear-gradient(#C98B4E, #9C6234)",
        }}
      />
      {HOLES.map((x) => (
        <div key={x} style={{ position: "absolute", left: x - 210, top: GROUND_Y - 200 }}>
          <Anthill />
        </div>
      ))}
    </>
  );
};

type AntData = { lane: number; speed: number; dir: 1 | -1; offset: number; carrying: boolean };

const ANTS: AntData[] = new Array(14).fill(0).map((_, i) => ({
  lane: i % 3,
  speed: 2 + random(`as${i}`) * 2,
  dir: i % 2 ? 1 : -1,
  offset: random(`ao${i}`) * 2200,
  carrying: i % 3 !== 1,
}));

const WalkingAnts: React.FC<{ rushAt: number | null; speedScale?: number }> = ({
  rushAt,
  speedScale = 1,
}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {ANTS.map((a, i) => {
        const span = 2200;
        const walkX = ((a.offset + a.dir * frame * a.speed * speedScale) % span + span) % span - 140;
        const y = GROUND_Y - 70 + a.lane * 40;
        let x = walkX;
        let dir = a.dir;
        let opacity = 1;
        let scale = 0.8 + a.lane * 0.15;
        if (rushAt !== null && frame > rushAt) {
          // Bergegas ke lubang sarang terdekat lalu menghilang
          const start = rushAt + (i % 5) * 3;
          const fromX = ((a.offset + a.dir * start * a.speed) % span + span) % span - 140;
          const hole = HOLES.reduce((b, h) => (Math.abs(h - fromX) < Math.abs(b - fromX) ? h : b));
          const p = interpolate(frame, [start, start + 35], [0, 1], clamp);
          x = fromX + (hole - 60 - fromX) * p;
          dir = hole > fromX ? 1 : -1;
          opacity = interpolate(p, [0.8, 1], [1, 0], clamp);
          scale *= 1 - p * 0.4;
        }
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              opacity,
              scale: `${dir * scale} ${scale}`,
            }}
          >
            <Ant size={120} walk={frame * (rushAt !== null && frame > rushAt ? 2.5 : 1)} carrying={a.carrying} />
          </div>
        );
      })}
    </>
  );
};

const PointCard: React.FC<{ item: HikmahItem; accent: string }> = ({ item, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = usePhraseFrame(item.phrase);
  const s = spring({ frame: frame - at, fps, config: { damping: 11 } });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        background: colors.white,
        border: `8px solid ${accent}`,
        borderRadius: 40,
        padding: "20px 40px 20px 24px",
        boxShadow: "0 16px 30px rgba(0,0,0,0.18)",
        opacity: frame >= at ? 1 : 0,
        scale: `${s}`,
        translate: `${(1 - s) * 200}px 0px`,
      }}
    >
      <HikmahIconSvg icon={item.icon} size={110} />
      <div style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 60, color: colors.ink }}>
        {item.title}
      </div>
    </div>
  );
};

const SpeechBubble: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 9 } });
  if (frame < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 520,
        top: 190,
        maxWidth: 900,
        background: colors.white,
        borderRadius: 50,
        padding: "34px 50px",
        fontFamily: titleFont,
        fontWeight: 700,
        fontSize: 64,
        lineHeight: 1.15,
        color: colors.ink,
        boxShadow: "0 14px 30px rgba(0,0,0,0.2)",
        scale: `${s}`,
        transformOrigin: "left bottom",
      }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          left: 40,
          bottom: -40,
          width: 0,
          height: 0,
          borderLeft: "30px solid transparent",
          borderRight: "30px solid transparent",
          borderTop: `50px solid ${colors.white}`,
          rotate: "20deg",
        }}
      />
    </div>
  );
};

const Hearts: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  return (
    <>
      {new Array(16).fill(0).map((_, i) => {
        const y = GROUND_Y - ((frame * (1.5 + random(`hs${i}`)) + random(`hy${i}`) * 700) % 700);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: random(`hx${i}`) * width + Math.sin(frame / 15 + i) * 20,
              top: y,
              opacity: interpolate(GROUND_Y - y, [0, 80, 600, 700], [0, 0.9, 0.9, 0]),
            }}
          >
            <HikmahIconSvg icon="heart" size={50} />
          </div>
        );
      })}
    </>
  );
};

const TasbihGlow: React.FC<{ strongAt: number }> = ({ strongAt }) => {
  const frame = useCurrentFrame();
  const strong = interpolate(frame, [strongAt, strongAt + 30], [0.4, 1], clamp);
  return (
    <>
      {new Array(60).fill(0).map((_, i) => {
        const hole = HOLES[i % 2];
        const t = (frame * (1 + random(`ts${i}`)) + random(`tt${i}`) * 500) % 500;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: hole + Math.sin(t / 40 + i) * (40 + t * 0.4),
              top: GROUND_Y - 20 - t,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: colors.gold,
              boxShadow: `0 0 16px 4px ${colors.gold}`,
              opacity: strong * interpolate(t, [0, 50, 400, 500], [0, 1, 1, 0]),
            }}
          />
        );
      })}
    </>
  );
};

// Close-up: semut-semut besar mengangkut makanan
const AntsCloseup: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Sky top="#BFE8FB" bottom="#FFF4DA" />
      {/* Rumput besar (sudut pandang semut) */}
      {new Array(16).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: i * 125 - 20,
            top: 80 + (i % 3) * 60,
            width: 70,
            height: 900,
            borderRadius: "50% 50% 0 0",
            background: i % 2 ? "#7BCB6E" : "#5FB55F",
            opacity: 0.85,
            transformOrigin: "bottom center",
            rotate: `${Math.sin(frame / 30 + i) * 3}deg`,
          }}
        />
      ))}
      <div style={{ position: "absolute", left: 0, top: 760, width: "100%", height: 320, background: "linear-gradient(#C98B4E, #9C6234)" }} />
      {/* Daun besar */}
      <div style={{ position: "absolute", left: 1350, top: 640, width: 420, height: 170, borderRadius: "50%", background: "#6CC56F", rotate: "-12deg" }} />
      {[0, 1, 2, 3].map((i) => {
        const x = ((i * 520 + frame * 3.2) % 2300) - 380;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: 470 + (i % 2) * 40 }}>
            <Ant size={330} walk={frame * 1.2 + i * 5} carrying antennaWave={Math.sin(frame / 8 + i) * 6} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Penampang sarang: semut aman di dalam lorong, pasukan lewat di atas
const AntsNest: React.FC = () => {
  const frame = useCurrentFrame();
  const chambers = [
    [300, 560, 300], [820, 520, 340], [1380, 580, 320], [560, 820, 300], [1120, 830, 340], [1620, 820, 240],
  ];
  return (
    <AbsoluteFill>
      <Sky top="#A6E1FA" bottom="#FFF4DA" />
      {/* Pasukan lewat di atas (panji kecil) */}
      {new Array(10).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: ((i * 220 + frame * 2.5) % 2300) - 300,
            top: 170 + Math.abs(Math.sin(frame / 6 + i)) * 4,
            scale: "0.5",
            transformOrigin: "left top",
          }}
        >
          <Banner color={["#5B7FD6", "#E8853D", "#3EA87A"][i % 3]} wave={Math.sin(frame / 8 + i) * 10} />
        </div>
      ))}
      <div style={{ position: "absolute", left: 0, top: 300, width: "100%", height: 40, background: colors.leaf }} />
      <div style={{ position: "absolute", left: 0, top: 340, width: "100%", height: 740, background: "linear-gradient(#B5763D, #7A4A2A)" }} />
      {/* Lorong */}
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <path
          d="M960 340 C960 420 820 460 820 520 M820 520 C700 540 400 520 300 560 M820 520 C1000 540 1300 540 1380 580 M300 560 C380 700 500 760 560 820 M1380 580 C1300 700 1180 760 1120 830 M1120 830 C1350 840 1500 830 1620 820"
          stroke="#5A3520"
          strokeWidth={60}
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      {chambers.map(([x, y, w], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x - w / 2,
            top: y - 70,
            width: w,
            height: 140,
            borderRadius: "50%",
            background: "#5A3520",
            boxShadow: "inset 0 10px 20px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ position: "absolute", left: w / 2 - 70, top: 30 }}>
            <Ant size={140} walk={0} antennaWave={Math.sin(frame / 15 + i) * 8} />
          </div>
        </div>
      ))}
      {/* Butiran tanah jatuh karena derap langkah di atas */}
      {new Array(20).fill(0).map((_, i) => (
        <div
          key={`d${i}`}
          style={{
            position: "absolute",
            left: random(`nd${i}`) * 1920,
            top: 345 + ((frame * 3 + random(`ny${i}`) * 300) % 300),
            width: 8,
            height: 8,
            borderRadius: 4,
            background: "#D9A066",
            opacity: 0.7,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

export const AntsScene: React.FC<SceneProps> = ({ scene, story }) => {
  const frame = useCurrentFrame();
  const voice = useVoice();
  const mode: AntMode = scene.ants ?? "busy";

  // Cue yang dipakai mode tertentu (frasa harus ada di naskah scene)
  const firstPhrase = voice.text.split(" ").slice(0, 2).join(" ");
  const shoutAt = usePhraseFrame(mode === "warning" ? "Wahai semut-semut" : firstPhrase);
  const rushAt = usePhraseFrame(mode === "warning" ? "Masuklah" : firstPhrase);
  const quoteAt = usePhraseFrame(mode === "tasbih" ? "Apakah karena" : firstPhrase);
  const strongAt = usePhraseFrame(mode === "tasbih" ? "juga bertasbih" : firstPhrase);
  const biteAt = usePhraseFrame(mode === "tasbih" ? "digigit" : firstPhrase);
  const burnAt = usePhraseFrame(mode === "tasbih" ? "dibakar" : firstPhrase);
  const rebukeAt = usePhraseFrame(mode === "tasbih" ? "Maka Allah menegurnya" : firstPhrase);
  const verseAt = usePhraseFrame(mode === "tasbih" ? "Allah berfirman" : firstPhrase);
  const { fps } = useVideoConfig();
  const smileAt = usePhraseFrame(mode === "safe" ? "tersenyum" : firstPhrase);

  if (mode === "closeup") return <AntsCloseup />;
  if (mode === "nest") return <AntsNest />;

  const night = mode === "tasbih";
  const rumble = mode === "warning" ? Math.sin(frame * 1.7) * 3 : 0;
  const bannersX = interpolate(frame, [0, 200], [-900, -200], clamp);
  const warm = mode === "safe" ? interpolate(frame, [smileAt, smileAt + 40], [0, 1], clamp) : 0;

  return (
    <AbsoluteFill style={{ translate: `${rumble}px ${rumble / 2}px` }}>
      {night ? <Sky top="#1E1B4B" bottom="#6C4C8C" /> : <Sky top="#A6E1FA" bottom="#FFF4DA" />}
      {night ? <Stars count={60} /> : <Sun x={1600} y={170} r={90} />}
      {!night && <Clouds count={4} speed={0.4} maxY={200} />}
      <AbsoluteFill
        style={{
          background: "radial-gradient(circle at 80% 15%, #FFE7A0, transparent 60%)",
          opacity: warm,
        }}
      />

      {/* Panji-panji pasukan di kejauhan (hanya saat seruan semut) */}
      {mode === "warning" &&
        new Array(8).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: bannersX + i * 110,
              top: GROUND_Y - 420 + Math.abs(Math.sin(frame / 6 + i)) * 4,
              scale: "0.45",
              transformOrigin: "left bottom",
              opacity: 0.8,
            }}
          >
            <Banner color={["#5B7FD6", "#E8853D", "#3EA87A"][i % 3]} wave={Math.sin(frame / 8 + i) * 10} />
          </div>
        ))}

      <Ground night={night} />

      {mode !== "reflect" && (
        <WalkingAnts rushAt={mode === "warning" ? rushAt : null} speedScale={mode === "safe" ? 0.5 : 1} />
      )}

      {mode === "warning" && (
        <>
          <div style={{ position: "absolute", left: 160, top: 470 }}>
            <Ant
              size={380}
              walk={0}
              antennaWave={frame >= shoutAt ? Math.sin(frame / 2) * 14 : Math.sin(frame / 10) * 5}
              mouthOpen={frame >= shoutAt && Math.floor(frame / 4) % 2 === 0}
            />
          </div>
          <SpeechBubble at={shoutAt}>Masuklah ke dalam sarang-sarangmu!</SpeechBubble>
        </>
      )}

      {mode === "reflect" && (
        <>
          <div style={{ position: "absolute", left: 140, top: 450 }}>
            <Ant size={460} walk={0} antennaWave={Math.sin(frame / 12) * 6} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 820,
              top: 260,
              display: "flex",
              flexDirection: "column",
              gap: 40,
            }}
          >
            {(scene.points ?? []).map((p) => (
              <PointCard key={p.title} item={p} accent={story.accent} />
            ))}
          </div>
        </>
      )}

      {mode === "safe" && frame > smileAt && <Hearts />}

      {mode === "tasbih" && (
        <>
          <TasbihGlow strongAt={strongAt} />
          {/* "digigit seekor semut": seekor semut besar dengan tanda seru */}
          {frame >= biteAt && frame < rebukeAt + 15 && (
            <div
              style={{
                position: "absolute",
                left: 760,
                top: 330,
                opacity: interpolate(frame, [biteAt, biteAt + 10, rebukeAt, rebukeAt + 15], [0, 1, 1, 0], clamp),
                scale: `${spring({ frame: frame - biteAt, fps, config: { damping: 9 } })}`,
              }}
            >
              <Ant size={360} antennaWave={Math.sin(frame / 3) * 12} />
              <div
                style={{
                  position: "absolute",
                  right: -40,
                  top: -60,
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  background: colors.gold,
                  color: colors.ink,
                  fontFamily: titleFont,
                  fontWeight: 700,
                  fontSize: 70,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  rotate: `${Math.sin(frame / 4) * 10}deg`,
                }}
              >
                !
              </div>
            </div>
          )}
          {/* "dibakar": sarang semut berpendar jingga (tanpa menggambar api) */}
          <AbsoluteFill
            style={{
              background: "radial-gradient(ellipse at 50% 85%, rgba(255,120,40,0.55), transparent 60%)",
              opacity: interpolate(frame, [burnAt, burnAt + 15, rebukeAt, rebukeAt + 20], [0, 1, 1, 0], clamp),
            }}
          />
          {/* Ayat: QS. Al-Isra: 44 */}
          {frame >= verseAt && (
            <div
              style={{
                position: "absolute",
                left: 260,
                right: 260,
                top: 160,
                textAlign: "center",
                background: "rgba(255,255,255,0.95)",
                borderRadius: 40,
                padding: "30px 50px",
                border: `6px solid ${colors.leaf}`,
                fontFamily: bodyFont,
                fontWeight: 800,
                fontSize: 48,
                lineHeight: 1.3,
                color: colors.ink,
                scale: `${spring({ frame: frame - verseAt, fps, config: { damping: 12 } })}`,
              }}
            >
              “Tidak ada sesuatu pun melainkan bertasbih dengan memuji-Nya, tetapi kamu tidak mengerti tasbih mereka.”
              <div style={{ fontSize: 34, marginTop: 10, color: colors.leafDark }}>QS. Al-Isra: 44</div>
            </div>
          )}
          {frame >= quoteAt && frame < verseAt && (
            <div
              style={{
                position: "absolute",
                left: 260,
                right: 260,
                top: 180,
                textAlign: "center",
                background: "rgba(255,255,255,0.95)",
                borderRadius: 40,
                padding: "34px 50px",
                border: `6px solid ${colors.gold}`,
                fontFamily: bodyFont,
                fontWeight: 800,
                fontSize: 50,
                lineHeight: 1.3,
                color: colors.ink,
                opacity: interpolate(frame, [quoteAt, quoteAt + 15], [0, 1], clamp),
              }}
            >
              “Apakah karena seekor semut menggigitmu, engkau membinasakan satu umat yang bertasbih?”
            </div>
          )}
        </>
      )}
    </AbsoluteFill>
  );
};
