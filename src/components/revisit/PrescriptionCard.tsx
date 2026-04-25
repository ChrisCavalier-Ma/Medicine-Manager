'use client';

import { Prescription } from '@/lib/types';
import { isPastDate, daysUntil } from '@/lib/storage';
import { FileText, ShoppingCart, ChevronRight, AlertTriangle } from 'lucide-react';

interface PrescriptionCardProps {
  prescription: Prescription;
  onRefill: (prescriptionId: string) => void;
}

export default function PrescriptionCard({ prescription, onRefill }: PrescriptionCardProps) {
  const expired = isPastDate(prescription.expireDate);
  const daysLeft = daysUntil(prescription.expireDate);
  const soonExpiring = !expired && daysLeft <= 30;

  const dateObj = new Date(prescription.date);
  const dateStr = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;

  return (
    <div className="app-card px-4 py-3.5">
      {/* Header */}
      <div className="flex items-start justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: expired ? '#F5F5F5' : '#00B4B418',
            }}
          >
            <FileText size={17} style={{ color: expired ? '#CCC' : '#00B4B4' }} />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#1A1A1A]">
              {prescription.hospital}处方
            </div>
            <div className="text-xs text-[#999] mt-0.5">
              {dateStr} · {prescription.doctor}医生
            </div>
          </div>
        </div>

        {expired ? (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F5F5F5] text-[#999]">
            已过期
          </span>
        ) : (
          <span
            className="text-[11px] px-2 py-0.5 rounded-full font-medium"
            style={{
              background: soonExpiring ? '#FFFBE6' : '#F0FFFE',
              color: soonExpiring ? '#D48806' : '#00B4B4',
            }}
          >
            {soonExpiring ? `${daysLeft}天后到期` : '有效'}
          </span>
        )}
      </div>

      {/* Medication list */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {prescription.medicationNames.map((name) => (
          <span
            key={name}
            className="text-[11px] px-2 py-0.5 rounded-md"
            style={{ background: '#F5F5F5', color: '#555' }}
          >
            {name}
          </span>
        ))}
      </div>

      {/* Expiry + action */}
      <div className="flex items-center justify-between pt-2.5" style={{ borderTop: '1px solid #F5F5F5' }}>
        <div className="flex items-center gap-1 text-xs">
          {!expired && soonExpiring && (
            <AlertTriangle size={12} color="#FAAD14" />
          )}
          <span style={{ color: expired ? '#CCC' : soonExpiring ? '#D48806' : '#999' }}>
            {expired ? `已于 ${prescription.expireDate} 过期` : `有效期至 ${prescription.expireDate}`}
          </span>
        </div>

        {!expired && (
          <button
            onClick={() => onRefill(prescription.id)}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg active:opacity-80"
            style={{ background: 'var(--mt-yellow)', color: '#1A1A1A' }}
          >
            <ShoppingCart size={12} />
            一键续方
          </button>
        )}
      </div>
    </div>
  );
}
