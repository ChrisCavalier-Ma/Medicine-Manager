'use client';

import { Medication } from '@/lib/types';
import { AlertTriangle, ShoppingCart } from 'lucide-react';

interface LowStockBannerProps {
  medications: Medication[];
}

const LOW_STOCK_THRESHOLD = 7;

export default function LowStockBanner({ medications }: LowStockBannerProps) {
  const lowStockMeds = medications.filter(
    (m) => m.isActive && m.stockDays <= LOW_STOCK_THRESHOLD
  );

  if (lowStockMeds.length === 0) return null;

  return (
    <div className="px-4 mt-3">
      <div
        className="rounded-xl px-4 py-3 flex items-center gap-3"
        style={{
          background: 'linear-gradient(135deg, #FFF1F0 0%, #FFF7F0 100%)',
          border: '1px solid #FFCCC7',
        }}
      >
        <AlertTriangle size={18} color="#FF4D4F" className="shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-[#CF1322] mb-0.5">药品库存不足</div>
          <div className="text-xs text-[#777] leading-5">
            {lowStockMeds.map((m, i) => (
              <span key={m.id}>
                <span className="font-medium text-[#555]">{m.name}</span>
                {' '}还剩 {m.stockDays} 天
                {i < lowStockMeds.length - 1 && '，'}
              </span>
            ))}
          </div>
        </div>
        <button
          className="shrink-0 flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: '#FF4D4F', color: '#fff' }}
        >
          <ShoppingCart size={13} />
          去购买
        </button>
      </div>
    </div>
  );
}
