'use client';

import { useState } from 'react';
import { Medication, MedTime } from '@/lib/types';
import { Check, Pill } from 'lucide-react';

interface MedCheckCardProps {
  med: Medication;
  time: MedTime;
  checked: boolean;
  onToggle: (medId: string, time: MedTime) => void;
  isPast?: boolean;
}

export default function MedCheckCard({ med, time, checked, onToggle, isPast }: MedCheckCardProps) {
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    if (!checked) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 600);
    }
    onToggle(med.id, time);
  };

  return (
    <div
      className="flex items-center gap-3 py-3 px-1"
      style={{
        borderBottom: '1px solid #F5F5F5',
        opacity: isPast && !checked ? 0.5 : 1,
      }}
    >
      {/* Color icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${med.color}18` }}
      >
        <Pill size={17} style={{ color: med.color }} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-semibold text-[#1A1A1A] truncate">{med.name}</span>
          <span className="text-xs text-[#999] shrink-0">{med.dosage}</span>
        </div>
        <div className="text-xs text-[#999] mt-0.5">
          {med.amountPerDose}{med.unit} · 随餐服用
        </div>
      </div>

      {/* Check button with animation */}
      <div className="relative shrink-0">
        {/* Ripple ring */}
        {animating && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              animation: 'checkRipple 0.5s ease-out forwards',
              border: `2px solid ${med.color}`,
            }}
          />
        )}
        <button
          onClick={handleClick}
          className="check-btn"
          style={{
            borderColor: checked ? 'var(--mt-success)' : '#D0D0D0',
            background: checked ? 'var(--mt-success)' : 'transparent',
            animation: animating ? 'checkPop 0.3s ease' : 'none',
          }}
          aria-label={checked ? '取消打卡' : '打卡'}
        >
          {checked && <Check size={14} color="#fff" strokeWidth={3} />}
        </button>
      </div>

      {/* "已服" label fades in */}
      {checked && (
        <span
          className="text-[11px] font-medium shrink-0"
          style={{ color: 'var(--mt-success)', animation: 'fadeIn 0.3s ease' }}
        >
          已服
        </span>
      )}
    </div>
  );
}
