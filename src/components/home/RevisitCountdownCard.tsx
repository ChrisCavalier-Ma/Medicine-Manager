'use client';

import { RevisitInfo } from '@/lib/types';
import { daysUntil } from '@/lib/storage';
import { CalendarDays, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface RevisitCountdownCardProps {
  revisit: RevisitInfo;
}

export default function RevisitCountdownCard({ revisit }: RevisitCountdownCardProps) {
  const days = daysUntil(revisit.nextDate);
  const isUrgent = days <= 7;
  const isPast = days < 0;

  return (
    <div className="px-4 mt-3 mb-4">
      <Link href="/revisit">
        <div
          className="app-card px-4 py-3.5 flex items-center gap-3 active:opacity-90"
          style={{
            background: isPast
              ? 'linear-gradient(135deg, #FFF1F0 0%, #FFF7F0 100%)'
              : isUrgent
              ? 'linear-gradient(135deg, #FFF7E0 0%, #FFFBE6 100%)'
              : 'linear-gradient(135deg, #F0FFFE 0%, #F6FFFF 100%)',
            border: `1px solid ${isPast ? '#FFCCC7' : isUrgent ? '#FFE58F' : '#B5F5EC'}`,
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: isPast ? '#FF4D4F20' : isUrgent ? '#FAAD1420' : '#00B4B420',
            }}
          >
            <CalendarDays
              size={20}
              style={{ color: isPast ? '#FF4D4F' : isUrgent ? '#D48806' : '#00B4B4' }}
            />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#1A1A1A]">
              {isPast ? '复诊已逾期' : `距下次复诊`}
              {!isPast && (
                <span
                  className="ml-1 font-bold"
                  style={{ color: isUrgent ? '#D48806' : '#00B4B4' }}
                >
                  {days} 天
                </span>
              )}
            </div>
            <div className="text-xs text-[#999] mt-0.5">
              {revisit.hospital} · {revisit.department} · {revisit.doctor}
            </div>
          </div>
          <ChevronRight size={16} color="#CCC" />
        </div>
      </Link>
    </div>
  );
}
