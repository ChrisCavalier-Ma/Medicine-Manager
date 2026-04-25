'use client';

import { FamilyAccount } from '@/lib/types';
import { UserPlus, Phone } from 'lucide-react';

interface FamilyAccountCardProps {
  accounts: FamilyAccount[];
}

const relationColors: Record<string, string> = {
  儿子: '#1677FF',
  女儿: '#FF7A45',
  老伴: '#9254DE',
  孙子: '#52C41A',
  孙女: '#00B4B4',
};

export default function FamilyAccountCard({ accounts }: FamilyAccountCardProps) {
  return (
    <div className="app-card px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-[#1A1A1A]">亲情账号</span>
        <button className="flex items-center gap-1 text-xs font-medium text-[#00B4B4] active:opacity-70">
          <UserPlus size={13} />
          添加家属
        </button>
      </div>

      {accounts.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-xs text-[#999]">暂无关联家属</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {accounts.map((acc) => {
            const color = relationColors[acc.relation] || '#999';
            return (
              <div key={acc.id} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ background: color }}
                >
                  {acc.name.slice(-1)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#1A1A1A]">
                    {acc.name}
                    <span
                      className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: `${color}18`, color }}
                    >
                      {acc.relation}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-[#999]">
                    <Phone size={10} />
                    {acc.phone}
                  </div>
                </div>
                <button className="text-xs text-[#1677FF] active:opacity-70 font-medium">
                  查看
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
