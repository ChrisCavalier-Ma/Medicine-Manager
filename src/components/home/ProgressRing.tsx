'use client';

interface ProgressRingProps {
  checked: number;
  total: number;
  size?: number;
}

export default function ProgressRing({ checked, total, size = 80 }: ProgressRingProps) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total === 0 ? 0 : checked / total;
  const strokeDashoffset = circumference * (1 - progress);
  const percent = Math.round(progress * 100);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={6}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-white leading-none">{percent}%</span>
        <span className="text-[10px] text-white/80 mt-0.5">
          {checked}/{total}
        </span>
      </div>
    </div>
  );
}
