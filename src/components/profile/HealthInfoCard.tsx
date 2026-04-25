'use client';

import { User } from '@/lib/types';
import { UserCircle, ChevronRight } from 'lucide-react';

interface HealthInfoCardProps {
  user: User;
}

const conditionColors: Record<string, { bg: string; text: string }> = {
  高血压: { bg: '#EBF5FF', text: '#1677FF' },
  '2型糖尿病': { bg: '#F0FFFE', text: '#00807A' },
  糖尿病: { bg: '#F0FFFE', text: '#00807A' },
  冠心病: { bg: '#FFF2EB', text: '#D4380D' },
  高血脂: { bg: '#F3EEFF', text: '#7B3FE4' },
};

export default function HealthInfoCard({ user }: HealthInfoCardProps) {
  return (
    <div className="app-card px-4 py-4">
      {/* Avatar + basic info */}
      <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: '1px solid #F5F5F5' }}>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #FFD100 0%, #FFBC00 100%)' }}
        >
          <UserCircle size={32} color="#1A1A1A" />
        </div>
        <div className="flex-1">
          <div className="text-base font-bold text-[#1A1A1A]">{user.name}</div>
          <div className="text-xs text-[#999] mt-0.5">{user.age}岁</div>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {user.conditions.map((c) => {
              const color = conditionColors[c] || { bg: '#F5F5F5', text: '#555' };
              return (
                <span
                  key={c}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{ background: color.bg, color: color.text }}
                >
                  {c}
                </span>
              );
            })}
          </div>
        </div>
        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F5F5F5] active:bg-[#EEE]">
          <ChevronRight size={15} color="#CCC" />
        </button>
      </div>

      {/* Doctor info */}
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-3 rounded-xl" style={{ background: '#F8F9FA' }}>
          <div className="text-xs text-[#999] mb-1">主治医生</div>
          <div className="text-sm font-semibold text-[#1A1A1A]">{user.doctor}</div>
        </div>
        <div className="text-center p-3 rounded-xl" style={{ background: '#F8F9FA' }}>
          <div className="text-xs text-[#999] mb-1">就诊医院</div>
          <div className="text-sm font-semibold text-[#1A1A1A] truncate">{user.hospital.replace('医院', '')}</div>
        </div>
      </div>
    </div>
  );
}
