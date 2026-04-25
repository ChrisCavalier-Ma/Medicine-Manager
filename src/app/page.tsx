'use client';

import { useState, useEffect, useCallback } from 'react';
import { AppData, MedTime } from '@/lib/types';
import { getData, setData, getTodayStr } from '@/lib/storage';
import GreetingHeader from '@/components/home/GreetingHeader';
import MedicationTimeline from '@/components/home/MedicationTimeline';
import LowStockBanner from '@/components/home/LowStockBanner';
import RevisitCountdownCard from '@/components/home/RevisitCountdownCard';

export default function HomePage() {
  const [data, setAppData] = useState<AppData | null>(null);

  useEffect(() => {
    setAppData(getData());
  }, []);

  const handleToggle = useCallback((medId: string, time: MedTime) => {
    setAppData((prev) => {
      if (!prev) return prev;
      const today = getTodayStr();
      const records = [...prev.checkRecords];
      const idx = records.findIndex(
        (r) => r.date === today && r.medId === medId && r.time === time
      );
      if (idx >= 0) {
        records[idx] = { ...records[idx], checked: !records[idx].checked };
      } else {
        records.push({ date: today, medId, time, checked: true });
      }
      const updated = { ...prev, checkRecords: records };
      setData(updated);
      return updated;
    });
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="text-sm text-[#999]">加载中...</div>
      </div>
    );
  }

  const today = getTodayStr();
  const todayRecords = data.checkRecords.filter((r) => r.date === today);
  const activeMeds = data.medications.filter((m) => m.isActive);

  // Count total doses today
  const totalToday = activeMeds.reduce((sum, m) => sum + m.times.length, 0);
  const checkedToday = todayRecords.filter((r) => r.checked).length;

  return (
    <div style={{ background: 'var(--mt-page-bg)', minHeight: '100%' }}>
      {/* Header with yellow gradient */}
      <GreetingHeader
        user={data.user}
        checkedToday={checkedToday}
        totalToday={totalToday}
      />

      {/* Low stock warning */}
      <LowStockBanner medications={data.medications} />

      {/* Revisit countdown */}
      <RevisitCountdownCard revisit={data.revisit} />

      {/* Medication timeline */}
      <MedicationTimeline
        medications={data.medications}
        todayRecords={todayRecords}
        onToggle={handleToggle}
      />

      <div className="h-4" />
    </div>
  );
}
