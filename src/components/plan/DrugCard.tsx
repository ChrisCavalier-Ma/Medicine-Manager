'use client';

import { Medication } from '@/lib/types';
import { Pill, MoreVertical } from 'lucide-react';

interface DrugCardProps {
  med: Medication;
  onEdit: (med: Medication) => void;
  onToggleActive: (medId: string) => void;
}

const timeLabels: Record<string, string> = {
  morning: '早',
  noon: '中',
  evening: '晚',
};

export default function DrugCard({ med, onEdit, onToggleActive }: DrugCardProps) {
  const stockPercent = Math.min(100, Math.round((med.stockDays / med.totalDays) * 100));
  const isLow = med.stockDays <= 7;

  return (
    <div
      className="app-card px-4 py-3.5"
      style={{ opacity: med.isActive ? 1 : 0.55 }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${med.color}18` }}
          >
            <Pill size={18} style={{ color: med.color }} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-[#1A1A1A]">{med.name}</span>
              {!med.isActive && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#999]">
                  已停用
                </span>
              )}
              {med.indication && (
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full"
                  style={{ background: `${med.color}18`, color: med.color }}
                >
                  {med.indication}
                </span>
              )}
            </div>
            <div className="text-xs text-[#999] mt-0.5">{med.spec}</div>
          </div>
        </div>
        <button
          onClick={() => onEdit(med)}
          className="w-7 h-7 rounded-full flex items-center justify-center active:bg-[#F5F5F5]"
        >
          <MoreVertical size={16} color="#CCC" />
        </button>
      </div>

      {/* Details row */}
      <div className="flex items-center gap-3 mb-2.5 text-xs text-[#777]">
        <span className="font-medium">{med.dosage}</span>
        <span>·</span>
        <span>{med.frequency}</span>
        <span>·</span>
        <span>
          {med.times.map((t) => timeLabels[t]).join('/')}餐
        </span>
        <span>·</span>
        <span>每次 {med.amountPerDose} {med.unit}</span>
      </div>

      {/* Stock progress */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[#F0F0F0]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${stockPercent}%`,
              background: isLow
                ? 'linear-gradient(90deg, #FF4D4F, #FF7A7A)'
                : `linear-gradient(90deg, ${med.color}, ${med.color}BB)`,
            }}
          />
        </div>
        <span
          className="text-xs font-semibold shrink-0"
          style={{ color: isLow ? '#FF4D4F' : '#555' }}
        >
          剩余 {med.stockDays} 天
          {isLow && ' ⚠'}
        </span>
      </div>
    </div>
  );
}
