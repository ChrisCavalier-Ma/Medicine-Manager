'use client';

import { Medication, CheckRecord, MedTime } from '@/lib/types';
import MedCheckCard from './MedCheckCard';
import { Sun, Coffee, Moon } from 'lucide-react';

interface TimeSlot {
  time: MedTime;
  label: string;
  timeStr: string;
  icon: React.ReactNode;
  bgColor: string;
  isPast: boolean;
}

function getTimeSlots(): TimeSlot[] {
  const hour = new Date().getHours();
  return [
    {
      time: 'morning',
      label: '早',
      timeStr: '07:00',
      icon: <Sun size={13} />,
      bgColor: '#FFF7E0',
      isPast: hour >= 10,
    },
    {
      time: 'noon',
      label: '中',
      timeStr: '12:00',
      icon: <Coffee size={13} />,
      bgColor: '#F0FFF4',
      isPast: hour >= 14,
    },
    {
      time: 'evening',
      label: '晚',
      timeStr: '19:00',
      icon: <Moon size={13} />,
      bgColor: '#EFF6FF',
      isPast: hour >= 21,
    },
  ];
}

interface MedicationTimelineProps {
  medications: Medication[];
  todayRecords: CheckRecord[];
  onToggle: (medId: string, time: MedTime) => void;
}

export default function MedicationTimeline({ medications, todayRecords, onToggle }: MedicationTimelineProps) {
  const slots = getTimeSlots();
  const activeMeds = medications.filter((m) => m.isActive);

  const isChecked = (medId: string, time: MedTime) =>
    todayRecords.some((r) => r.medId === medId && r.time === time && r.checked);

  return (
    <div className="px-4 mt-4 space-y-3">
      <div className="section-header">今日服药</div>

      {slots.map((slot) => {
        const slotMeds = activeMeds.filter((m) => m.times.includes(slot.time));
        if (slotMeds.length === 0) return null;

        const checkedCount = slotMeds.filter((m) => isChecked(m.id, slot.time)).length;
        const allChecked = checkedCount === slotMeds.length;

        return (
          <div key={slot.time} className="app-card overflow-hidden">
            {/* Slot header */}
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ background: slot.bgColor }}
            >
              <div className="flex items-center gap-1.5">
                <span style={{ color: '#888' }}>{slot.icon}</span>
                <span className="text-sm font-semibold text-[#333]">
                  {slot.label}上 · {slot.timeStr}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[#999]">
                  {checkedCount}/{slotMeds.length}
                </span>
                {allChecked && (
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                    style={{ background: '#52C41A20', color: '#389E0D' }}
                  >
                    已完成
                  </span>
                )}
              </div>
            </div>

            {/* Med list */}
            <div className="px-4">
              {slotMeds.map((med) => (
                <MedCheckCard
                  key={`${med.id}-${slot.time}`}
                  med={med}
                  time={slot.time}
                  checked={isChecked(med.id, slot.time)}
                  onToggle={onToggle}
                  isPast={slot.isPast}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
