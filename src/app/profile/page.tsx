'use client';

import { useState, useEffect } from 'react';
import { AppData } from '@/lib/types';
import { getData } from '@/lib/storage';
import HealthInfoCard from '@/components/profile/HealthInfoCard';
import AdherenceChart from '@/components/profile/AdherenceChart';
import FamilyAccountCard from '@/components/profile/FamilyAccountCard';
import { MessageCircle, ChevronRight, Settings, Bell, Shield } from 'lucide-react';

export default function ProfilePage() {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    setData(getData());
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="text-sm text-[#999]">加载中...</div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--mt-page-bg)', minHeight: '100%' }}>
      {/* Header */}
      <div
        className="px-4 pt-4 pb-4 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #FFD100 0%, #FFBC00 100%)' }}
      >
        <div>
          <h1 className="text-base font-bold text-[#1A1A1A]">健康档案</h1>
          <p className="text-xs text-[#555] mt-0.5">管理您的个人健康信息</p>
        </div>
        <button className="w-8 h-8 rounded-full flex items-center justify-center bg-black/10 active:bg-black/20">
          <Settings size={16} color="#1A1A1A" />
        </button>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {/* Health info */}
        <HealthInfoCard user={data.user} />

        {/* Adherence chart */}
        <AdherenceChart checkRecords={data.checkRecords} medications={data.medications} />

        {/* Family accounts */}
        <FamilyAccountCard accounts={data.familyAccounts} />

        {/* AI consultation entry */}
        <button
          className="w-full app-card px-4 py-4 flex items-center gap-3 active:opacity-90 text-left"
          onClick={() => alert('AI问诊功能即将上线，敬请期待！\n（演示模拟）')}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #00B4B4 0%, #36CFC9 100%)' }}
          >
            <MessageCircle size={20} color="#fff" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#1A1A1A]">AI 智能问诊</div>
            <div className="text-xs text-[#999] mt-0.5">7×24小时用药咨询，快速解答</div>
          </div>
          <div
            className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: '#F0FFFE', color: '#00807A' }}
          >
            免费
          </div>
          <ChevronRight size={16} color="#CCC" />
        </button>

        {/* Settings list */}
        <div className="app-card overflow-hidden">
          {[
            { icon: Bell, label: '用药提醒设置', sub: '早 07:00 · 中 12:00 · 晚 19:00' },
            { icon: Shield, label: '隐私与安全', sub: '数据加密保护' },
          ].map(({ icon: Icon, label, sub }, idx) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-[#F9F9F9] text-left"
              style={{
                borderTop: idx > 0 ? '1px solid #F5F5F5' : 'none',
              }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#F5F5F5]">
                <Icon size={16} color="#666" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[#1A1A1A]">{label}</div>
                <div className="text-xs text-[#999] mt-0.5">{sub}</div>
              </div>
              <ChevronRight size={15} color="#CCC" />
            </button>
          ))}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
