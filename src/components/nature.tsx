import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const wavePath = (
  width: number,
  height: number,
  y: number,
  amplitude: number,
  wavelength: number,
  phase: number,
) => {
  let d = `M0 ${height} L0 ${y}`;
  for (let x = 0; x <= width + 40; x += 40) {
    const yy = y + Math.sin((x / wavelength) * Math.PI * 2 + phase) * amplitude;
    d += ` L${x} ${yy.toFixed(1)}`;
  }
  return `${d} L${width + 40} ${height} Z`;
};

export const Sky: React.FC<{ top: string; bottom: string }> = ({
  top,
  bottom,
}) => (
  <AbsoluteFill style={{ background: `linear-gradient(${top}, ${bottom})` }} />
);

export const Sun: React.FC<{
  x: number;
  y: number;
  r?: number;
  color?: string;
}> = ({ x, y, r = 110, color = colors.gold }) => {
  const frame = useCurrentFrame();
  const glow = 1 + Math.sin(frame / 20) * 0.04;
  return (
    <div
      style={{
        position: "absolute",
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 ${80 * glow}px ${30 * glow}px ${color}AA`,
      }}
    />
  );
};

export const Moon: React.FC<{ x: number; y: number; r?: number }> = ({
  x,
  y,
  r = 80,
}) => (
  <svg
    style={{ position: "absolute", left: x - r, top: y - r }}
    width={r * 2}
    height={r * 2}
    viewBox="0 0 100 100"
  >
    <defs>
      <mask id="moon-cut">
        <rect width={100} height={100} fill="white" />
        <circle cx={68} cy={38} r={38} fill="black" />
      </mask>
    </defs>
    <circle cx={50} cy={50} r={46} fill="#FFF3C4" mask="url(#moon-cut)" />
  </svg>
);

const Cloud: React.FC<{ scale: number; color: string }> = ({
  scale,
  color,
}) => (
  <svg width={320 * scale} height={140 * scale} viewBox="0 0 320 140">
    <g fill={color}>
      <ellipse cx={90} cy={90} rx={80} ry={48} />
      <ellipse cx={170} cy={65} rx={90} ry={62} />
      <ellipse cx={240} cy={95} rx={70} ry={42} />
      <rect x={60} y={90} width={210} height={48} rx={24} />
    </g>
  </svg>
);

export const Clouds: React.FC<{
  count?: number;
  color?: string;
  speed?: number;
  seed?: string;
  maxY?: number;
}> = ({ count = 5, color = "#FFFFFF", speed = 0.6, seed = "c", maxY = 380 }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  return (
    <AbsoluteFill>
      {new Array(count).fill(0).map((_, i) => {
        const scale = 0.6 + random(`${seed}s${i}`) * 0.9;
        const span = width + 600;
        const x =
          ((random(`${seed}x${i}`) * span + frame * speed * (0.5 + scale)) %
            span) -
          400;
        const y = 40 + random(`${seed}y${i}`) * maxY;
        return (
          <div
            key={i}
            style={{ position: "absolute", left: x, top: y, opacity: 0.92 }}
          >
            <Cloud scale={scale} color={color} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Stars: React.FC<{ count?: number; seed?: string }> = ({
  count = 70,
  seed = "st",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill>
      {new Array(count).fill(0).map((_, i) => {
        const tw = 0.5 + 0.5 * Math.sin(frame / 10 + random(`${seed}${i}`) * 20);
        const s = 3 + random(`${seed}r${i}`) * 5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: random(`${seed}x${i}`) * width,
              top: random(`${seed}y${i}`) * height * 0.65,
              width: s,
              height: s,
              borderRadius: "50%",
              background: "#FFF6D5",
              opacity: 0.3 + tw * 0.7,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export type SeaLayer = { color: string; y: number; amp: number; len: number };

export const Sea: React.FC<{
  layers: SeaLayer[];
  speed?: number;
}> = ({ layers, speed = 1 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill>
      <svg width={width} height={height}>
        {layers.map((l, i) => (
          <path
            key={i}
            d={wavePath(
              width,
              height,
              l.y,
              l.amp,
              l.len,
              (frame / 18) * speed * (i % 2 ? -1 : 1) + i,
            )}
            fill={l.color}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

export const calmSea = (y = 720): SeaLayer[] => [
  { color: "#7FD3EA", y, amp: 10, len: 420 },
  { color: colors.sea, y: y + 50, amp: 14, len: 360 },
  { color: "#1E86AE", y: y + 130, amp: 16, len: 500 },
  { color: colors.seaDeep, y: y + 230, amp: 18, len: 440 },
];

export const stormSea = (y = 700): SeaLayer[] => [
  { color: "#3D6E86", y, amp: 45, len: 380 },
  { color: "#2B5770", y: y + 70, amp: 55, len: 320 },
  { color: "#1C3F55", y: y + 170, amp: 60, len: 460 },
  { color: "#10293A", y: y + 280, amp: 50, len: 400 },
];

export const Rain: React.FC<{ count?: number; opacity?: number }> = ({
  count = 140,
  opacity = 0.55,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ opacity }}>
      {new Array(count).fill(0).map((_, i) => {
        const speed = 28 + random(`rs${i}`) * 18;
        const y = ((random(`ry${i}`) * height + frame * speed) % (height + 100)) - 100;
        const x = (random(`rx${i}`) * (width + 300) - frame * 6) % (width + 300);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x < 0 ? x + width + 300 : x,
              top: y,
              width: 3,
              height: 46,
              background: "#CFE6F5",
              borderRadius: 3,
              rotate: "12deg",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Kilatan petir: flashFrames = frame-frame saat petir menyambar
export const Lightning: React.FC<{ flashFrames: number[] }> = ({
  flashFrames,
}) => {
  const frame = useCurrentFrame();
  const intensity = Math.max(
    0,
    ...flashFrames.map((f) =>
      interpolate(frame, [f, f + 2, f + 4, f + 6, f + 16], [0, 1, 0.3, 0.8, 0], clamp),
    ),
  );
  const bolt = flashFrames.find((f) => frame >= f && frame < f + 10);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {bolt !== undefined && (
        <svg
          width={300}
          height={600}
          viewBox="0 0 100 200"
          style={{
            position: "absolute",
            left: 400 + random(`b${bolt}`) * 1000,
            top: 0,
            opacity: intensity,
          }}
        >
          <path
            d="M60 0 L30 90 L55 90 L25 200 L80 70 L52 70 L75 0 Z"
            fill="#FFF7B0"
          />
        </svg>
      )}
      <AbsoluteFill style={{ background: "#FFFFFF", opacity: intensity * 0.55 }} />
    </AbsoluteFill>
  );
};

export const Bubbles: React.FC<{ count?: number; seed?: string }> = ({
  count = 40,
  seed = "bb",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill>
      {new Array(count).fill(0).map((_, i) => {
        const r = 6 + random(`${seed}r${i}`) * 22;
        const speed = 1.5 + random(`${seed}s${i}`) * 3;
        const y = height + 60 - ((random(`${seed}y${i}`) * height + frame * speed) % (height + 120));
        const x = random(`${seed}x${i}`) * width + Math.sin(frame / 15 + i) * 12;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: r,
              height: r,
              borderRadius: "50%",
              border: "3px solid rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.12)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const LightRays: React.FC<{ color?: string; opacity?: number }> = ({
  color = "rgba(190,240,255,0.18)",
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 200 + i * 360,
            top: -200,
            width: 140 + (i % 2) * 80,
            height: 1500,
            background: `linear-gradient(${color}, transparent)`,
            rotate: `${18 + Math.sin(frame / 40 + i) * 4}deg`,
            transformOrigin: "top center",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

export const Gulls: React.FC<{ count?: number }> = ({ count = 4 }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  return (
    <AbsoluteFill>
      {new Array(count).fill(0).map((_, i) => {
        const flap = Math.sin(frame / 4 + i) * 10;
        const x = ((random(`gx${i}`) * width + frame * (2 + i * 0.4)) % (width + 200)) - 100;
        const y = 150 + random(`gy${i}`) * 250 + Math.sin(frame / 25 + i) * 20;
        return (
          <svg
            key={i}
            width={70}
            height={40}
            viewBox="0 0 70 40"
            style={{ position: "absolute", left: x, top: y }}
          >
            <path
              d={`M5 ${20 - flap} Q20 ${10 - flap / 2} 35 22 Q50 ${10 - flap / 2} 65 ${20 - flap}`}
              stroke="#FFFFFF"
              strokeWidth={5}
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        );
      })}
    </AbsoluteFill>
  );
};

// Pola bintang segi-8 khas ornamen Islami untuk latar intro/hikmah
export const IslamicPattern: React.FC<{ color: string; opacity?: number }> = ({
  color,
  opacity = 0.18,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="star8"
            width={160}
            height={160}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${frame * 0.4} ${frame * 0.2})`}
          >
            <g transform="translate(80 80)" fill="none" stroke={color} strokeWidth={4}>
              <rect x={-36} y={-36} width={72} height={72} />
              <rect x={-36} y={-36} width={72} height={72} transform="rotate(45)" />
              <circle r={14} />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#star8)" />
      </svg>
    </AbsoluteFill>
  );
};
