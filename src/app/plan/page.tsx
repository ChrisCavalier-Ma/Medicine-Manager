'use client';

import { useState, useEffect, useCallback } from 'react';
import { AppData, Medication } from '@/lib/types';
import { getData, setData } from '@/lib/storage';
import DrugCard from '@/components/plan/DrugCard';
import AddDrugDialog from '@/components/plan/AddDrugDialog';
import { Plus, Pill } from 'lucide-react';

export default function PlanPage() {
  const [data, setAppData] = useState<AppData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMed, setEditMed] = useState<Medication | null>(null);

  useEffect(() => {
    setAppData(getData());
  }, []);

  const handleSave = useCallback((med: Medication) => {
    setAppData((prev) => {
      if (!prev) return prev;
      const meds = prev.medications.some((m) => m.id === med.id)
        ? prev.medications.map((m) => (m.id === med.id ? med : m))
        : [...prev.medications, med];
      const updated = { ...prev, medications: meds };
      setData(updated);
      return updated;
    });
    setEditMed(null);
  }, []);

  const handleEdit = useCallback((med: Medication) => {
    setEditMed(med);
    setDialogOpen(true);
  }, []);

  const handleToggleActive = useCallback((medId: string) => {
    setAppData((prev) => {
      if (!prev) return prev;
      const meds = prev.medications.map((m) =>
        m.id === medId ? { ...m, isActive: !m.isActive } : m
      );
      const updated = { ...prev, medications: meds };
      setData(updated);
      return updated;
    });
  }, []);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditMed(null);
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="text-sm text-[#999]">加载中...</div>
      </div>
    );
  }

  const activeMeds = data.medications.filter((m) => m.isActive);
  const inactiveMeds = data.medications.filter((m) => !m.isActive);

  return (
    <div style={{ background: 'var(--mt-page-bg)', minHeight: '100%' }}>
      {/* Header */}
      <div
        className="px-4 pt-4 pb-4 flex items-center justify-between"
        style={{
          background: 'linear-gradient(135deg, #FFD100 0%, #FFBC00 100%)',
        }}
      >
        <div>
          <h1 className="text-base font-bold text-[#1A1A1A]">我的药品</h1>
          <p className="text-xs text-[#555] mt-0.5">
            共 {activeMeds.length} 种在用药品
          </p>
        </div>
        <button
          onClick={() => { setEditMed(null); setDialogOpen(true); }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#1A1A1A] text-white active:opacity-80"
        >
          <Plus size={14} />
          添加药品
        </button>
      </div>

      <div className="px-4 mt-4 space-y-2.5">
        {/* Active medications */}
        {activeMeds.length === 0 ? (
          <div className="app-card py-12 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center">
              <Pill size={28} color="#CCC" />
            </div>
            <p className="text-sm text-[#999]">暂无在用药品</p>
            <button
              onClick={() => setDialogOpen(true)}
              className="text-sm font-semibold px-5 py-2 rounded-full"
              style={{ background: 'var(--mt-yellow)', color: '#1A1A1A' }}
            >
              立即添加
            </button>
          </div>
        ) : (
          activeMeds.map((med) => (
            <DrugCard
              key={med.id}
              med={med}
              onEdit={handleEdit}
              onToggleActive={handleToggleActive}
            />
          ))
        )}

        {/* Inactive medications */}
        {inactiveMeds.length > 0 && (
          <>
            <div className="pt-2 pb-1">
              <span className="text-xs font-medium text-[#999]">已停用药品</span>
            </div>
            {inactiveMeds.map((med) => (
              <DrugCard
                key={med.id}
                med={med}
                onEdit={handleEdit}
                onToggleActive={handleToggleActive}
              />
            ))}
          </>
        )}
      </div>

      <div className="h-4" />

      <AddDrugDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        editMed={editMed}
      />
    </div>
  );
}
