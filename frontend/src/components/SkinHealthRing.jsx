import React from "react";

/**
 * SkinHealthRing — the signature visual motif of AI Skin Intelligence.
 * A frosted circular gauge used anywhere a score/status is shown:
 * platform health (admin), client skin score (consultant), risk level (dermatologist).
 *
 * value: 0-100
 * tone: "sage" | "ocean" | "clay" | "danger" — maps to score meaning
 * size: px diameter (default 96)
 */
const TONE_MAP = {
  sage: "#2D8065",
  ocean: "#2F6FA8",
  clay: "#C15C3B",
  danger: "#B4453F",
};

export default function SkinHealthRing({
  value = 0,
  tone = "sage",
  size = 96,
  label,
  sublabel,
}) {
  const stroke = size * 0.08;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;
  const color = TONE_MAP[tone] || TONE_MAP.sage;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(28,61,92,0.08)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono font-medium text-ink-primary" style={{ fontSize: size * 0.22 }}>
            {Math.round(value)}
          </span>
        </div>
      </div>
      {label && <span className="text-xs font-medium text-ink-primary">{label}</span>}
      {sublabel && <span className="text-[11px] text-ink-secondary -mt-1">{sublabel}</span>}
    </div>
  );
}
