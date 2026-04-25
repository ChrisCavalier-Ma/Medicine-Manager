'use client';

import { RevisitInfo } from '@/lib/types';
import { daysUntil } from '@/lib/storage';
import { CalendarDays, MapPin, User } from 'lucide-react';

interface NextRevisitCardProps {
  revisit: RevisitInfo;
}

export default function NextRevisitCard({ revisit }: NextRevisitCardProps) {
  const days = daysUntil(revisit.nextDate);
  const isPast = days < 0;
  const isUrgent = !isPast && days <= 7;

  const dateObj = new Date(revisit.nextDate);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][dateObj.getDay()];

  return (
    <div
      className="mx-4 mt-4 rounded-2xl overflow-hidden"
      style={{
        background: isPast
          ? 'linear-gradient(135deg, #FF4D4F 0%, #FF7875 100%)'
          : isUrgent
          ? 'linear-gradient(135deg, #FAAD14 0%, #FFC53D 100%)'
          : 'linear-gradient(135deg, #00B4B4 0%, #36CFC9 100%)',
        boxShadow: isPast
          ? '0 4px 20px rgba(255,77,79,0.3)'
          : isUrgent
          ? '0 4px 20px rgba(250,173,20,0.3)'
          : '0 4px 20px rgba(0,180,180,0.3)',
      }}
    >
      <div className="px-5 py-5">
        {/* Status label */}
        <div className="text-xs font-medium text-white/80 mb-1">
          {isPast ? '复诊已过期，请尽快预约' : '下次复诊'}
        </div>

        {/* Main countdown */}
        <div className="flex items-end gap-2 mb-4">
          {isPast ? (
            <span className="text-3xl font-bold text-white">逾期 {Math.abs(days)} 天</span>
          ) : (
            <>
              <span className="text-5xl font-bold text-white leading-none">{days}</span>
              <span className="text-lg font-medium text-white/80 pb-1">天后</span>
            </>
          )}
        </div>

        {/* Date info */}
        <div className="flex items-center gap-4 text-sm text-white/90">
          <div className="flex items-center gap-1.5">
            <CalendarDays size={14} />
            <span>{month}月{day}日 {weekday}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={14} />
            <span>{revisit.doctor} · {revisit.department}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 text-sm text-white/80">
          <MapPin size={13} />
          <span>{revisit.hospital}</span>
        </div>
      </div>

      {/* Action bar */}
      <div
        className="px-5 py-3 flex gap-3"
        style={{ background: 'rgba(0,0,0,0.12)' }}
      >
        <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-white/90 text-[#1A1A1A] active:opacity-80">
          修改复诊日期
        </button>
        <button className="flex-1 py-2 rounded-xl text-xs font-semibold text-white border border-white/40 active:opacity-80">
          预约挂号
        </button>
      </div>
    </div>
  );
}
