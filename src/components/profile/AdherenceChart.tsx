'use client';

import { CheckRecord, Medication } from '@/lib/types';

interface AdherenceChartProps {
  checkRecords: CheckRecord[];
  medications: Medication[];
}

function getLast7Days(): string[] {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

const dayLabels = ['一', '二', '三', '四', '五', '六', '日'];

export default function AdherenceChart({ checkRecords, medications }: AdherenceChartProps) {
  const days = getLast7Days();
  const activeMeds = medications.filter((m) => m.isActive);
  const totalPerDay = activeMeds.reduce((sum, m) => sum + m.times.length, 0);

  const stats = days.map((date, idx) => {
    const dayRecords = checkRecords.filter((r) => r.date === date && r.checked);
    const rate = totalPerDay === 0 ? 0 : Math.min(1, dayRecords.length / totalPerDay);
    const d = new Date(date);
    return {
      date,
      rate,
      percent: Math.round(rate * 100),
      label: dayLabels[d.getDay() === 0 ? 6 : d.getDay() - 1],
      isToday: idx === 6,
    };
  });

  const avgRate = Math.round(stats.reduce((s, d) => s + d.percent, 0) / 7);

  return (
    <div className="app-card px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-[#1A1A1A]">本周服药依从率</span>
        <span
          className="text-lg font-bold"
          style={{ color: avgRate >= 80 ? '#52C41A' : avgRate >= 60 ? '#FAAD14' : '#FF4D4F' }}
        >
          {avgRate}%
        </span>
      </div>

      {/* Bar chart */}
      <div className="flex items-end justify-between gap-1.5 h-20 mb-2">
        {stats.map((s) => (
          <div key={s.date} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] text-[#999]">
              {s.percent > 0 ? `${s.percent}%` : ''}
            </span>
            <div className="w-full flex items-end" style={{ height: '48px' }}>
              <div
                className="w-full rounded-t-sm transition-all duration-500"
                style={{
                  height: `${Math.max(4, s.rate * 48)}px`,
                  background: s.isToday
                    ? 'var(--mt-yellow)'
                    : s.rate >= 0.8
                    ? '#52C41A'
                    : s.rate >= 0.6
                    ? '#FAAD14'
                    : s.rate === 0
                    ? '#F0F0F0'
                    : '#FF7875',
                  borderRadius: '3px 3px 0 0',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Day labels */}
      <div className="flex justify-between gap-1.5">
        {stats.map((s) => (
          <div key={s.date} className="flex-1 text-center">
            <span
              className="text-[11px] font-medium"
              style={{ color: s.isToday ? 'var(--mt-dark)' : '#999' }}
            >
              {s.isToday ? '今' : s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: '1px solid #F5F5F5' }}>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: '#52C41A' }} />
          <span className="text-[10px] text-[#999]">≥80% 优秀</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: '#FAAD14' }} />
          <span className="text-[10px] text-[#999]">60-80% 良好</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: '#FF7875' }} />
          <span className="text-[10px] text-[#999]">&lt;60% 需改善</span>
        </div>
      </div>
    </div>
  );
}
