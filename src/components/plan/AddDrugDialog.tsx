'use client';

import { useState } from 'react';
import { Medication, MedTime, MedFrequency } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface AddDrugDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (med: Medication) => void;
  editMed?: Medication | null;
}

const COLORS = ['#1677FF', '#00B4B4', '#FF7A45', '#9254DE', '#52C41A', '#FAAD14'];

const freqOptions: { value: MedFrequency; times: MedTime[] }[] = [
  { value: '每日一次', times: ['morning'] },
  { value: '每日两次', times: ['morning', 'evening'] },
  { value: '每日三次', times: ['morning', 'noon', 'evening'] },
];

const timeLabels: Record<MedTime, string> = {
  morning: '早',
  noon: '中',
  evening: '晚',
};

export default function AddDrugDialog({ open, onClose, onSave, editMed }: AddDrugDialogProps) {
  const [form, setForm] = useState<{
    name: string;
    spec: string;
    dosage: string;
    frequency: MedFrequency;
    times: MedTime[];
    amountPerDose: number;
    stockDays: number;
    totalDays: number;
    unit: string;
    color: string;
    indication: string;
  }>(
    editMed
      ? {
          name: editMed.name,
          spec: editMed.spec,
          dosage: editMed.dosage,
          frequency: editMed.frequency,
          times: editMed.times,
          amountPerDose: editMed.amountPerDose,
          stockDays: editMed.stockDays,
          totalDays: editMed.totalDays,
          unit: editMed.unit,
          color: editMed.color,
          indication: editMed.indication || '',
        }
      : {
          name: '',
          spec: '',
          dosage: '',
          frequency: '每日一次',
          times: ['morning'],
          amountPerDose: 1,
          stockDays: 30,
          totalDays: 30,
          unit: '片',
          color: COLORS[0],
          indication: '',
        }
  );

  const handleFreqChange = (freq: MedFrequency) => {
    const opt = freqOptions.find((o) => o.value === freq);
    setForm((f) => ({ ...f, frequency: freq, times: opt?.times || ['morning'] }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    const med: Medication = {
      id: editMed?.id || `med-${Date.now()}`,
      name: form.name.trim(),
      spec: form.spec.trim(),
      dosage: form.dosage.trim(),
      frequency: form.frequency,
      times: form.times,
      amountPerDose: form.amountPerDose,
      stockDays: form.stockDays,
      totalDays: form.totalDays,
      unit: form.unit,
      color: form.color,
      isActive: editMed?.isActive ?? true,
      indication: form.indication.trim() || undefined,
    };
    onSave(med);
    onClose();
  };

  const inputClass =
    'w-full rounded-lg border border-[#EBEBEB] px-3 py-2.5 text-sm text-[#1A1A1A] bg-[#FAFAFA] focus:outline-none focus:border-[#FFD100] transition-colors';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[90vw] rounded-2xl p-0 gap-0 border-0"
        style={{ maxWidth: '440px', maxHeight: '90dvh', overflowY: 'auto' }}
      >
        <DialogHeader className="px-5 pt-5 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base font-semibold text-[#1A1A1A]">
              {editMed ? '编辑药品' : '添加药品'}
            </DialogTitle>
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F5F5F5] active:bg-[#EEE]">
              <X size={15} color="#666" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-5 py-4 space-y-4">
          {/* Drug name */}
          <div>
            <label className="block text-xs font-medium text-[#555] mb-1.5">
              药品名称 <span className="text-[#FF4D4F]">*</span>
            </label>
            <input
              className={inputClass}
              placeholder="如：厄贝沙坦片"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>

          {/* Spec + dosage */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#555] mb-1.5">规格</label>
              <input
                className={inputClass}
                placeholder="如：0.15g×14片"
                value={form.spec}
                onChange={(e) => setForm((f) => ({ ...f, spec: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#555] mb-1.5">单次剂量</label>
              <input
                className={inputClass}
                placeholder="如：150mg"
                value={form.dosage}
                onChange={(e) => setForm((f) => ({ ...f, dosage: e.target.value }))}
              />
            </div>
          </div>

          {/* Indication */}
          <div>
            <label className="block text-xs font-medium text-[#555] mb-1.5">适应症（可选）</label>
            <input
              className={inputClass}
              placeholder="如：高血压"
              value={form.indication}
              onChange={(e) => setForm((f) => ({ ...f, indication: e.target.value }))}
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-xs font-medium text-[#555] mb-1.5">服药频次</label>
            <div className="flex gap-2">
              {freqOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleFreqChange(opt.value)}
                  className="flex-1 py-2 text-xs font-medium rounded-lg border transition-all"
                  style={{
                    borderColor: form.frequency === opt.value ? '#FFD100' : '#EBEBEB',
                    background: form.frequency === opt.value ? '#FFF7D0' : '#FAFAFA',
                    color: form.frequency === opt.value ? '#A07D00' : '#666',
                  }}
                >
                  {opt.value}
                </button>
              ))}
            </div>
          </div>

          {/* Times chips */}
          <div>
            <label className="block text-xs font-medium text-[#555] mb-1.5">服药时段</label>
            <div className="flex gap-2">
              {(['morning', 'noon', 'evening'] as MedTime[]).map((t) => (
                <div
                  key={t}
                  className="px-4 py-2 rounded-lg text-xs font-medium"
                  style={{
                    background: form.times.includes(t) ? '#FFD10030' : '#F5F5F5',
                    color: form.times.includes(t) ? '#A07D00' : '#999',
                    border: `1px solid ${form.times.includes(t) ? '#FFD100' : 'transparent'}`,
                  }}
                >
                  {timeLabels[t]}
                </div>
              ))}
            </div>
          </div>

          {/* Amount per dose + unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#555] mb-1.5">每次用量</label>
              <input
                className={inputClass}
                type="number"
                min={0.5}
                step={0.5}
                value={form.amountPerDose}
                onChange={(e) =>
                  setForm((f) => ({ ...f, amountPerDose: parseFloat(e.target.value) || 1 }))
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#555] mb-1.5">单位</label>
              <input
                className={inputClass}
                placeholder="片 / 粒 / mg"
                value={form.unit}
                onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
              />
            </div>
          </div>

          {/* Stock + total days */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#555] mb-1.5">当前库存（天）</label>
              <input
                className={inputClass}
                type="number"
                min={1}
                value={form.stockDays}
                onChange={(e) =>
                  setForm((f) => ({ ...f, stockDays: parseInt(e.target.value) || 1 }))
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#555] mb-1.5">疗程（天）</label>
              <input
                className={inputClass}
                type="number"
                min={1}
                value={form.totalDays}
                onChange={(e) =>
                  setForm((f) => ({ ...f, totalDays: parseInt(e.target.value) || 30 }))
                }
              />
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label className="block text-xs font-medium text-[#555] mb-1.5">卡片颜色</label>
            <div className="flex gap-2.5">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setForm((f) => ({ ...f, color: c }))}
                  className="w-7 h-7 rounded-full transition-transform active:scale-90"
                  style={{
                    background: c,
                    transform: form.color === c ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: form.color === c ? `0 0 0 2px white, 0 0 0 3.5px ${c}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="px-5 pb-5 pt-0">
          <button
            onClick={handleSubmit}
            disabled={!form.name.trim()}
            className="w-full py-3 rounded-xl text-sm font-bold text-[#1A1A1A] transition-opacity"
            style={{
              background: form.name.trim() ? 'var(--mt-yellow)' : '#F5F5F5',
              color: form.name.trim() ? '#1A1A1A' : '#CCC',
            }}
          >
            {editMed ? '保存修改' : '添加药品'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
