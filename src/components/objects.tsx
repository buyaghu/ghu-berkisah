import React from "react";
import { random } from "remotion";
import { colors } from "../theme";
import type { HikmahIcon } from "../types";

// Kapal kayu dengan layar. Tanpa penumpang yang digambar.
export const Ship: React.FC<{ width?: number; sailColor?: string }> = ({
  width = 620,
  sailColor = "#FFF4DD",
}) => (
  <svg width={width} height={width * 0.85} viewBox="0 0 400 340">
    {/* Tiang */}
    <rect x={192} y={20} width={12} height={240} rx={4} fill="#7A4A2A" />
    {/* Bendera */}
    <path d="M204 22 L250 34 L204 46 Z" fill={colors.pink} />
    {/* Layar */}
    <path d="M206 50 C290 90 300 180 206 230 Z" fill={sailColor} stroke="#E3D3B3" strokeWidth={4} />
    <path d="M188 70 C120 110 115 190 188 225 Z" fill={sailColor} stroke="#E3D3B3" strokeWidth={4} />
    {/* Muatan */}
    <rect x={90} y={215} width={50} height={40} rx={6} fill="#C98B4E" />
    <rect x={250} y={210} width={46} height={46} rx={6} fill="#B5763D" />
    <rect x={145} y={225} width={40} height={30} rx={6} fill="#D9A066" />
    {/* Lambung kapal */}
    <path
      d="M20 250 L380 250 C365 310 320 330 200 330 C80 330 35 310 20 250 Z"
      fill="#9C5B31"
    />
    <path d="M28 262 L372 262" stroke="#7A4A2A" strokeWidth={6} />
    <path d="M45 292 L355 292" stroke="#7A4A2A" strokeWidth={5} />
    {[80, 140, 200, 260, 320].map((x) => (
      <circle key={x} cx={x} cy={277} r={6} fill="#F6D79B" />
    ))}
  </svg>
);

// Ikan yang sangat besar (bergaya paus kartun yang lembut)
export const BigFish: React.FC<{
  width?: number;
  mouthOpen?: number; // 0..1
  tailAngle?: number;
}> = ({ width = 900, mouthOpen = 0, tailAngle = 0 }) => {
  const jaw = mouthOpen * 26;
  return (
    <svg width={width} height={width * 0.55} viewBox="0 0 600 330" style={{ overflow: "visible" }}>
      {/* Ekor */}
      <g style={{ transformOrigin: "520px 165px", rotate: `${tailAngle}deg` }}>
        <path d="M500 165 C540 120 570 70 600 60 C585 120 585 210 600 270 C570 260 540 210 500 165 Z" fill="#3E6FB0" />
      </g>
      {/* Badan atas */}
      <path
        d="M40 150 C40 60 200 20 330 30 C450 40 530 110 520 165 L40 165 Z"
        fill="#4C83C9"
      />
      {/* Rahang bawah (bisa terbuka) */}
      <g style={{ transformOrigin: "300px 165px", rotate: `${jaw}deg` }}>
        <path
          d="M40 165 L520 165 C520 230 430 290 300 290 C170 290 60 250 40 165 Z"
          fill="#BFE3F7"
        />
        {[100, 160, 220, 280].map((x) => (
          <path key={x} d={`M${x} 200 C${x + 40} 215 ${x + 80} 215 ${x + 120} 200`} stroke="#9CCDE8" strokeWidth={6} fill="none" />
        ))}
      </g>
      {/* Bagian dalam mulut */}
      {mouthOpen > 0.05 && (
        <path
          d={`M44 165 L300 165 C230 ${170 + jaw * 2.5} 100 ${170 + jaw * 2.5} 44 165 Z`}
          fill="#2A1630"
        />
      )}
      {/* Sirip */}
      <path d="M260 175 C300 230 360 240 380 220 C350 210 320 190 300 170 Z" fill="#3E6FB0" />
      {/* Mata */}
      <circle cx={140} cy={110} r={20} fill={colors.white} />
      <circle cx={144} cy={112} r={11} fill={colors.ink} />
      <circle cx={148} cy={107} r={4} fill={colors.white} />
      {/* Bintik */}
      {[[230, 70], [270, 95], [320, 65], [370, 90]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={8} fill="#6A9CD8" />
      ))}
    </svg>
  );
};

// Kota Ninawa: rumah-rumah datar bergaya Mesopotamia kuno
export const City: React.FC<{
  width?: number;
  windowGlow?: number; // 0..1 lampu jendela
  wallColor?: string;
}> = ({ width = 1920, windowGlow = 0.6, wallColor = "#E9B98A" }) => {
  const houses = new Array(16).fill(0).map((_, i) => ({
    x: i * 120 + random(`hx${i}`) * 30,
    w: 110 + random(`hw${i}`) * 70,
    h: 120 + random(`hh${i}`) * 200,
    shade: random(`hs${i}`),
  }));
  return (
    <svg width={width} height={width * 0.28} viewBox="0 0 1920 540" preserveAspectRatio="xMidYMax meet">
      {/* Menara bertingkat di tengah */}
      <g fill="#D79D6B">
        <rect x={820} y={120} width={280} height={420} />
        <rect x={860} y={60} width={200} height={70} />
        <rect x={900} y={10} width={120} height={60} />
      </g>
      {houses.map((h, i) => (
        <g key={i}>
          <rect
            x={h.x}
            y={540 - h.h}
            width={h.w}
            height={h.h}
            rx={6}
            fill={h.shade > 0.5 ? wallColor : "#DDA877"}
          />
          <rect x={h.x + h.w / 2 - 14} y={540 - 50} width={28} height={50} rx={14} fill="#8C5A3C" />
          {[0, 1].map((r) =>
            h.h > 160 + r * 80 ? (
              <rect
                key={r}
                x={h.x + 18}
                y={540 - h.h + 30 + r * 70}
                width={h.w - 36}
                height={24}
                rx={8}
                fill={windowGlow > 0.05 ? `rgba(255,214,110,${windowGlow})` : "#8C5A3C"}
              />
            ) : null,
          )}
        </g>
      ))}
    </svg>
  );
};

// Jejak kaki: memberi kesan seseorang berjalan, tanpa menggambar sosoknya
export const Footprint: React.FC<{ flip?: boolean; size?: number }> = ({
  flip,
  size = 40,
}) => (
  <svg width={size} height={size * 1.6} viewBox="0 0 40 64" style={{ scale: flip ? "-1 1" : "1 1" }}>
    <ellipse cx={20} cy={40} rx={12} ry={20} fill="rgba(110,70,40,0.55)" />
    {[6, 14, 22, 30].map((x, i) => (
      <circle key={x} cx={x + 2} cy={12 - (i === 1 || i === 2 ? 3 : 0)} r={4} fill="rgba(110,70,40,0.55)" />
    ))}
  </svg>
);

// Batang & daun pohon labu (yaqthin) yang tumbuh: progress 0..1
export const GourdPlant: React.FC<{ progress: number; width?: number }> = ({
  progress,
  width = 900,
}) => {
  const stemLen = 1400;
  const leaves = [
    { x: 160, y: 300, r: -20, at: 0.3 },
    { x: 300, y: 180, r: 15, at: 0.45 },
    { x: 450, y: 120, r: -10, at: 0.55 },
    { x: 600, y: 160, r: 20, at: 0.65 },
    { x: 720, y: 260, r: -15, at: 0.75 },
    { x: 380, y: 260, r: 30, at: 0.8 },
    { x: 540, y: 250, r: -25, at: 0.85 },
  ];
  const leafScale = (at: number) => Math.min(1, Math.max(0, (progress - at) / 0.12));
  return (
    <svg width={width} height={width * 0.6} viewBox="0 0 900 540" style={{ overflow: "visible" }}>
      {/* Tiang kayu penopang */}
      <g stroke="#8C5A3C" strokeWidth={14} strokeLinecap="round" opacity={Math.min(1, progress * 4)}>
        <line x1={120} y1={540} x2={120} y2={200} />
        <line x1={780} y1={540} x2={780} y2={200} />
      </g>
      <path
        d="M120 540 C120 400 160 300 250 220 C350 130 520 90 650 150 C740 190 790 260 780 330"
        stroke={colors.leafDark}
        strokeWidth={14}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={stemLen}
        strokeDashoffset={stemLen * (1 - Math.min(1, progress * 1.4))}
      />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}>
          <g style={{ scale: `${leafScale(l.at)}` }}>
            <path d="M0 0 C-90 -40 -110 -140 0 -150 C110 -140 90 -40 0 0 Z" fill={i % 2 ? colors.leaf : "#58B65C"} />
            <path d="M0 -10 L0 -130" stroke={colors.leafDark} strokeWidth={5} />
          </g>
        </g>
      ))}
      {[{ x: 330, y: 300 }, { x: 600, y: 300 }].map((g, i) => (
        <g key={i} style={{ scale: `${leafScale(0.88 + i * 0.04)}`, transformOrigin: `${g.x}px ${g.y}px` }}>
          <ellipse cx={g.x} cy={g.y + 50} rx={42} ry={56} fill="#C7D96B" />
          <path d={`M${g.x} ${g.y} L${g.x} ${g.y - 10}`} stroke={colors.leafDark} strokeWidth={6} />
        </g>
      ))}
    </svg>
  );
};

// Ikon sederhana untuk kartu hikmah
export const HikmahIconSvg: React.FC<{ icon: HikmahIcon; size?: number }> = ({
  icon,
  size = 130,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    {icon === "sprout" && (
      <g>
        <path d="M50 92 L50 45" stroke={colors.leafDark} strokeWidth={7} strokeLinecap="round" />
        <path d="M50 55 C20 55 12 30 18 20 C40 18 52 35 50 55 Z" fill={colors.leaf} />
        <path d="M50 48 C80 48 88 22 82 12 C60 10 48 28 50 48 Z" fill="#58B65C" />
        <rect x={25} y={86} width={50} height={10} rx={5} fill="#B5763D" />
      </g>
    )}
    {icon === "hands" && (
      <g fill={colors.skin} stroke="#E0A988" strokeWidth={3}>
        <path d="M18 85 C10 60 14 30 26 22 C34 22 36 30 36 40 L40 70 L46 88 Z" />
        <path d="M82 85 C90 60 86 30 74 22 C66 22 64 30 64 40 L60 70 L54 88 Z" />
        <circle cx={50} cy={20} r={8} fill={colors.gold} stroke="none" />
      </g>
    )}
    {icon === "light" && (
      <g>
        <circle cx={50} cy={50} r={36} fill={colors.gold} opacity={0.3} />
        <circle cx={50} cy={50} r={22} fill={colors.gold} />
        {new Array(8).fill(0).map((_, i) => (
          <line
            key={i}
            x1={50}
            y1={8}
            x2={50}
            y2={18}
            stroke={colors.gold}
            strokeWidth={6}
            strokeLinecap="round"
            transform={`rotate(${i * 45} 50 50)`}
          />
        ))}
      </g>
    )}
    {icon === "heart" && (
      <path
        d="M50 88 C20 66 8 48 12 32 C16 16 38 12 50 30 C62 12 84 16 88 32 C92 48 80 66 50 88 Z"
        fill={colors.pink}
      />
    )}
    {icon === "star" && (
      <path
        d="M50 8 L61 38 L93 38 L67 57 L77 88 L50 70 L23 88 L33 57 L7 38 L39 38 Z"
        fill={colors.gold}
      />
    )}
  </svg>
);

// Semut kartun (tampak samping). walk = fase langkah (pakai frame).
export const Ant: React.FC<{
  size?: number;
  walk?: number;
  carrying?: boolean;
  antennaWave?: number; // derajat ayunan antena
  mouthOpen?: boolean;
  color?: string;
}> = ({
  size = 120,
  walk = 0,
  carrying = false,
  antennaWave = 0,
  mouthOpen = false,
  color = "#B4533A",
}) => {
  const leg = (i: number) => Math.sin(walk * 0.6 + i * 2.1) * 10;
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 150 120" style={{ overflow: "visible" }}>
      {/* Kaki */}
      {[40, 70, 95].map((x, i) => (
        <g key={x} stroke={colors.ink} strokeWidth={5} strokeLinecap="round" fill="none">
          <path d={`M${x} 78 L${x - 10 + leg(i)} 100 L${x - 16 + leg(i)} 112`} />
          <path d={`M${x + 4} 78 L${x + 12 - leg(i)} 100 L${x + 18 - leg(i)} 112`} opacity={0.6} />
        </g>
      ))}
      {/* Perut */}
      <ellipse cx={38} cy={68} rx={34} ry={27} fill={color} />
      <ellipse cx={30} cy={60} rx={10} ry={6} fill="#FFFFFF" opacity={0.25} />
      {/* Dada */}
      <ellipse cx={82} cy={72} rx={16} ry={13} fill={color} />
      {/* Kepala */}
      <circle cx={116} cy={58} r={26} fill={color} />
      {/* Antena */}
      <g
        stroke={colors.ink}
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        style={{ transformOrigin: "116px 36px", rotate: `${antennaWave}deg` }}
      >
        <path d="M110 36 C104 16 96 10 88 8" />
        <path d="M122 36 C126 14 134 8 142 6" />
        <circle cx={88} cy={8} r={4} fill={colors.ink} />
        <circle cx={142} cy={6} r={4} fill={colors.ink} />
      </g>
      {/* Mata & pipi */}
      <ellipse cx={126} cy={54} rx={7} ry={9} fill={colors.white} />
      <circle cx={128} cy={55} r={5} fill={colors.ink} />
      <circle cx={130} cy={52} r={2} fill={colors.white} />
      <ellipse cx={124} cy={70} rx={6} ry={4} fill={colors.cheek} opacity={0.7} />
      {mouthOpen ? (
        <ellipse cx={136} cy={70} rx={5} ry={6} fill="#6B1F2A" />
      ) : (
        <path d="M130 68 Q136 74 141 66" stroke={colors.ink} strokeWidth={3} fill="none" strokeLinecap="round" />
      )}
      {/* Remah makanan */}
      {carrying && (
        <ellipse cx={92} cy={34} rx={20} ry={14} fill="#F2D27A" stroke="#D9A94A" strokeWidth={3} />
      )}
    </svg>
  );
};

// Sarang semut: gundukan tanah dengan lubang pintu
export const Anthill: React.FC<{ width?: number }> = ({ width = 420 }) => (
  <svg width={width} height={width * 0.5} viewBox="0 0 420 210">
    <path d="M0 210 C60 120 140 40 210 40 C280 40 360 120 420 210 Z" fill="#C98B4E" />
    <path d="M60 210 C110 140 160 90 210 90 C260 90 310 140 360 210 Z" fill="#B5763D" opacity={0.6} />
    {[[150, 150], [270, 140], [210, 100]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={8} fill="#E0B07A" opacity={0.7} />
    ))}
    <ellipse cx={210} cy={196} rx={42} ry={22} fill="#4A2C1A" />
  </svg>
);

// Istana dengan menara, kubah emas, dan lengkungan (tanpa sosok manusia)
export const Palace: React.FC<{ width?: number }> = ({ width = 1100 }) => (
  <svg width={width} height={width * 0.5} viewBox="0 0 1100 550">
    <g fill="#F4E6CF" stroke="#D9C3A0" strokeWidth={4}>
      <rect x={60} y={200} width={120} height={350} />
      <rect x={920} y={200} width={120} height={350} />
      <rect x={220} y={260} width={660} height={290} />
      <rect x={400} y={150} width={300} height={400} />
    </g>
    <g fill={colors.gold}>
      <path d="M60 200 C60 120 180 120 180 200 Z" />
      <path d="M920 200 C920 120 1040 120 1040 200 Z" />
      <path d="M400 150 C400 10 700 10 700 150 Z" />
    </g>
    {/* Lengkungan & jendela */}
    {[260, 330, 760, 830].map((x) => (
      <path key={x} d={`M${x} 480 L${x} 380 C${x} 340 ${x + 50} 340 ${x + 50} 380 L${x + 50} 480 Z`} fill="#9FD3E8" />
    ))}
    <path d="M490 550 L490 400 C490 320 610 320 610 400 L610 550 Z" fill="#C98B4E" />
    {[90, 950].map((x) => (
      <g key={x}>
        <rect x={x + 20} y={260} width={20} height={50} rx={10} fill="#9FD3E8" />
        <rect x={x + 60} y={260} width={20} height={50} rx={10} fill="#9FD3E8" />
      </g>
    ))}
    <rect x={0} y={530} width={1100} height={20} fill="#D9C3A0" />
  </svg>
);

// Burung bulat kecil yang mengepakkan sayap
export const Bird: React.FC<{ size?: number; flap?: number; color?: string }> = ({
  size = 90,
  flap = 0,
  color = "#7CC6F2",
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: "visible" }}>
    <ellipse cx={50} cy={55} rx={30} ry={26} fill={color} />
    <g style={{ transformOrigin: "45px 50px", rotate: `${-20 + Math.sin(flap) * 35}deg` }}>
      <ellipse cx={35} cy={40} rx={20} ry={11} fill={colors.white} opacity={0.85} />
    </g>
    <circle cx={64} cy={46} r={6} fill={colors.white} />
    <circle cx={66} cy={46} r={3.5} fill={colors.ink} />
    <path d="M78 52 L94 56 L78 61 Z" fill={colors.gold} />
  </svg>
);

// Panji-panji pasukan (melambangkan barisan, tanpa menggambar orang)
export const Banner: React.FC<{ color: string; wave?: number; height?: number }> = ({
  color,
  wave = 0,
  height = 260,
}) => (
  <svg width={110} height={height} viewBox={`0 0 110 ${height}`} style={{ overflow: "visible" }}>
    <rect x={8} y={0} width={8} height={height} rx={4} fill="#7A4A2A" />
    <circle cx={12} cy={0} r={9} fill={colors.gold} />
    <path
      d={`M16 12 C50 ${12 + wave} 70 ${4 - wave} 104 14 L104 84 C70 ${74 - wave} 50 ${82 + wave} 16 84 Z`}
      fill={color}
    />
    <circle cx={58} cy={48} r={12} fill={colors.white} opacity={0.5} />
  </svg>
);
