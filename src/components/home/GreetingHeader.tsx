'use client';

import { User } from '@/lib/types';
import ProgressRing from './ProgressRing';
import { Bell } from 'lucide-react';

interface GreetingHeaderProps {
  user: User;
  checkedToday: number;
  totalToday: number;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return '早上好';
  if (hour < 18) return '下午好';
  return '晚上好';
}

const conditionColors: Record<string, string> = {
  高血压: '#1677FF',
  '2型糖尿病': '#00B4B4',
  糖尿病: '#00B4B4',
  冠心病: '#FF7A45',
  高血脂: '#9254DE',
};

export default function GreetingHeader({ user, checkedToday, totalToday }: GreetingHeaderProps) {
  const allDone = checkedToday === totalToday && totalToday > 0;

  return (
    <div
      className="relative px-4 pt-4 pb-5"
      style={{
        background: 'linear-gradient(135deg, #FFD100 0%, #FFBC00 100%)',
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-base font-semibold text-[#1A1A1A]">
              {getGreeting()}，{user.name}
            </span>
            {allDone && (
              <span className="text-xs bg-[#1A1A1A] text-[#FFD100] px-2 py-0.5 rounded-full font-medium">
                全打完啦
              </span>
            )}
          </div>
          <div className="text-xs text-[#555] mb-2">{user.age}岁 · {user.hospital}</div>
          {/* Disease tags */}
          <div className="flex flex-wrap gap-1.5">
            {user.conditions.map((c) => (
              <span
                key={c}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  color: conditionColors[c] || '#333',
                  border: `1px solid ${conditionColors[c] || '#ccc'}40`,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Right side: ring + bell */}
        <div className="flex flex-col items-end gap-2">
          <button className="w-8 h-8 rounded-full flex items-center justify-center bg-black/10 active:bg-black/20">
            <Bell size={15} color="#1A1A1A" />
          </button>
          <ProgressRing checked={checkedToday} total={totalToday} size={78} />
        </div>
      </div>

      {/* Bottom summary */}
      <div className="text-xs text-[#444] font-medium">
        今日服药：
        <span className="font-bold text-[#1A1A1A]">{checkedToday}</span>
        <span className="text-[#666]"> / {totalToday} 次</span>
        {!allDone && totalToday > checkedToday && (
          <span className="ml-1 text-[#333]">
            · 还有 {totalToday - checkedToday} 次待服
          </span>
        )}
      </div>
    </div>
  );
}
