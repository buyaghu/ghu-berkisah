import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GhuWalker } from "../components/Ghu";
import { IslamicPattern } from "../components/nature";
import { usePhraseFrame } from "../lib/voice";
import { colors, titleFont } from "../theme";
import { clamp, type SceneProps } from "./common";

const LETTERS = ["A", "B", "C", "D"];

const Option: React.FC<{
  text: string;
  index: number;
  correct: boolean;
  revealAt: number;
  accent: string;
}> = ({ text, index, correct, revealAt, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = usePhraseFrame(text);
  const s = spring({ frame: frame - at, fps, config: { damping: 11 } });
  const revealed = frame >= revealAt;
  const pop = spring({ frame: frame - revealAt, fps, config: { damping: 8 } });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 30,
        width: 900,
        padding: "14px 30px",
        borderRadius: 40,
        background: revealed && correct ? colors.leaf : colors.white,
        border: `8px solid ${revealed && correct ? colors.leafDark : accent}`,
        boxShadow: "0 12px 26px rgba(0,0,0,0.15)",
        opacity: frame < at ? 0 : revealed && !correct ? 0.45 : 1,
        scale: `${s * (revealed && correct ? 1 + (1 - pop) * 0.2 + 0.04 : 1)}`,
      }}
    >
      <div
        style={{
          width: 76,
          height: 76,
          borderRadius: 38,
          background: revealed && correct ? colors.white : accent,
          color: revealed && correct ? colors.leafDark : colors.white,
          fontFamily: titleFont,
          fontWeight: 700,
          fontSize: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {LETTERS[index]}
      </div>
      <div
        style={{
          fontFamily: titleFont,
          fontWeight: 700,
          fontSize: 60,
          color: revealed && correct ? colors.white : colors.ink,
          textTransform: "capitalize",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const QuizScene: React.FC<SceneProps> = ({ scene, story }) => {
  const frame = useCurrentFrame();
  const quiz = scene.quiz;
  const revealAt = usePhraseFrame(scene.quiz?.revealPhrase ?? scene.text.split(" ")[0]);
  const thinkAt = usePhraseFrame("Coba tebak");
  if (!quiz) throw new Error(`Scene ${scene.id} butuh data "quiz"`);

  // Jawaban disorot sedikit setelah "Jawabannya adalah" diucapkan
  const revealFrame = revealAt + 25;
  const thinking = frame >= thinkAt && frame < revealFrame;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #FFF3DF, ${colors.pinkSoft})` }}>
      <IslamicPattern color={story.accent} opacity={0.14} />
      {/* Pilihan jawaban tidak berpindah, jadi Ghu cukup berdiri bercerita */}
      <GhuWalker stops={[{ at: 0, x: 60 }]} size={300} bottom={20} happy={frame > revealFrame + 5} />
      <div
        style={{
          position: "absolute",
          left: 600,
          right: 80,
          top: 140,
          fontFamily: titleFont,
          fontWeight: 700,
          fontSize: 68,
          lineHeight: 1.1,
          color: colors.ink,
          opacity: interpolate(frame, [10, 25], [0, 1], clamp),
        }}
      >
        {quiz.question}
      </div>
      <div
        style={{
          position: "absolute",
          left: 600,
          top: 370,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {quiz.options.map((o, i) => (
          <Option
            key={o}
            text={o}
            index={i}
            correct={i === quiz.answer}
            revealAt={revealFrame}
            accent={story.accent}
          />
        ))}
      </div>
      {/* Tanda "berpikir" */}
      {thinking && (
        <div style={{ position: "absolute", left: 1560, top: 420, display: "flex", gap: 22 }}>
          {[0, 1, 2].map((d) => (
            <div
              key={d}
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                background: story.accent,
                translate: `0px ${Math.sin(frame / 5 - d) * 14}px`,
              }}
            />
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};
