'use client';

import { useState, useEffect } from 'react';
import { AppData, Prescription } from '@/lib/types';
import { getData } from '@/lib/storage';
import NextRevisitCard from '@/components/revisit/NextRevisitCard';
import PrescriptionCard from '@/components/revisit/PrescriptionCard';
import RefillDialog from '@/components/revisit/RefillDialog';
import { FileText } from 'lucide-react';

export default function RevisitPage() {
  const [data, setData] = useState<AppData | null>(null);
  const [refillTarget, setRefillTarget] = useState<Prescription | null>(null);

  useEffect(() => {
    setData(getData());
  }, []);

  const handleRefill = (prescriptionId: string) => {
    const p = data?.prescriptions.find((x) => x.id === prescriptionId) ?? null;
    setRefillTarget(p);
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="text-sm text-[#999]">加载中...</div>
      </div>
    );
  }

  const validPrescriptions = data.prescriptions.filter(
    (p) => new Date(p.expireDate) >= new Date()
  );
  const expiredPrescriptions = data.prescriptions.filter(
    (p) => new Date(p.expireDate) < new Date()
  );

  return (
    <div style={{ background: 'var(--mt-page-bg)', minHeight: '100%' }}>
      <div
        className="px-4 pt-4 pb-3"
        style={{ background: 'linear-gradient(135deg, #FFD100 0%, #FFBC00 100%)' }}
      >
        <h1 className="text-base font-bold text-[#1A1A1A]">复诊管理</h1>
        <p className="text-xs text-[#555] mt-0.5">按时复诊，持续健康管理</p>
      </div>

      <NextRevisitCard revisit={data.revisit} />

      <div className="px-4 mt-5">
        <div className="section-header mb-3">历史处方</div>

        {validPrescriptions.length > 0 && (
          <div className="space-y-2.5 mb-3">
            {validPrescriptions.map((p) => (
              <PrescriptionCard key={p.id} prescription={p} onRefill={handleRefill} />
            ))}
          </div>
        )}

        {expiredPrescriptions.length > 0 && (
          <>
            <div className="text-xs text-[#999] font-medium mb-2 mt-3">过期处方</div>
            <div className="space-y-2.5">
              {expiredPrescriptions.map((p) => (
                <PrescriptionCard key={p.id} prescription={p} onRefill={handleRefill} />
              ))}
            </div>
          </>
        )}

        {data.prescriptions.length === 0 && (
          <div className="app-card py-12 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center">
              <FileText size={28} color="#CCC" />
            </div>
            <p className="text-sm text-[#999]">暂无处方记录</p>
          </div>
        )}
      </div>

      <div
        className="mx-4 mt-4 mb-4 rounded-xl px-4 py-3"
        style={{ background: '#F0FFFE', border: '1px solid #B5F5EC' }}
      >
        <p className="text-xs text-[#00807A] leading-5">
          <span className="font-semibold">温馨提示：</span>
          处方有效期通常为3个月，过期需重新就诊。如有续方需求，请提前7天预约。
        </p>
      </div>

      <div className="h-4" />

      {/* Refill Dialog */}
      <RefillDialog
        open={!!refillTarget}
        prescription={refillTarget}
        onClose={() => setRefillTarget(null)}
      />
    </div>
  );
}
