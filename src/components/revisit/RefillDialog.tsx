'use client';

import { useState, useEffect } from 'react';
import { Prescription } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ShoppingCart, Plus, Minus, CheckCircle, X, Package } from 'lucide-react';

interface RefillDialogProps {
  open: boolean;
  prescription: Prescription | null;
  onClose: () => void;
}

const DRUG_PRICES: Record<string, { price: number; unit: string }> = {
  厄贝沙坦片: { price: 28.5, unit: '盒' },
  二甲双胍缓释片: { price: 22.0, unit: '瓶' },
  阿司匹林肠溶片: { price: 8.5, unit: '盒' },
  瑞舒伐他汀钙片: { price: 45.0, unit: '盒' },
};

type OrderState = 'cart' | 'paying' | 'success';

export default function RefillDialog({ open, prescription, onClose }: RefillDialogProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [orderState, setOrderState] = useState<OrderState>('cart');

  useEffect(() => {
    if (prescription) {
      const q: Record<string, number> = {};
      prescription.medicationNames.forEach((name) => {
        q[name] = 1;
      });
      setQuantities(q);
      setOrderState('cart');
    }
  }, [prescription]);

  if (!prescription) return null;

  const total = prescription.medicationNames.reduce((sum, name) => {
    const p = DRUG_PRICES[name]?.price ?? 0;
    return sum + p * (quantities[name] ?? 1);
  }, 0);

  const handleCheckout = () => {
    setOrderState('paying');
    setTimeout(() => setOrderState('success'), 1500);
  };

  const orderNo = `MT${Date.now().toString().slice(-10)}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[92vw] rounded-2xl p-0 gap-0 border-0"
        style={{ maxWidth: '440px' }}
      >
        {orderState === 'success' ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center px-6 py-10 gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: '#F6FFED', animation: 'checkPop 0.4s ease' }}
            >
              <CheckCircle size={36} color="#52C41A" />
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-[#1A1A1A]">订单提交成功</p>
              <p className="text-xs text-[#999] mt-1">美团买药将尽快为您配送</p>
              <p className="text-xs text-[#CCC] mt-2">订单号：{orderNo}</p>
            </div>
            <div
              className="w-full rounded-xl px-4 py-3 mt-2"
              style={{ background: '#FAFAFA', border: '1px solid #F0F0F0' }}
            >
              {prescription.medicationNames.map((name) => (
                <div key={name} className="flex justify-between text-xs py-1">
                  <span className="text-[#555]">{name} × {quantities[name] ?? 1}</span>
                  <span className="text-[#1A1A1A] font-medium">
                    ¥{((DRUG_PRICES[name]?.price ?? 0) * (quantities[name] ?? 1)).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-bold pt-2 mt-1" style={{ borderTop: '1px solid #EEE' }}>
                <span>合计</span>
                <span style={{ color: '#FF4D4F' }}>¥{total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl text-sm font-bold text-[#1A1A1A]"
              style={{ background: 'var(--mt-yellow)' }}
            >
              完成
            </button>
          </div>
        ) : (
          /* ── Cart state ── */
          <>
            <DialogHeader className="px-5 pt-5 pb-0">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-base font-semibold text-[#1A1A1A]">
                  一键续方购药
                </DialogTitle>
                <button
                  onClick={onClose}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F5F5F5]"
                >
                  <X size={15} color="#666" />
                </button>
              </div>
              <p className="text-xs text-[#999] mt-1">
                {prescription.hospital} · {prescription.doctor}医生 · {prescription.date}
              </p>
            </DialogHeader>

            <div className="px-5 py-4 space-y-3">
              {prescription.medicationNames.map((name) => {
                const info = DRUG_PRICES[name];
                const qty = quantities[name] ?? 1;
                return (
                  <div
                    key={name}
                    className="flex items-center gap-3 rounded-xl px-3 py-3"
                    style={{ background: '#FAFAFA', border: '1px solid #F0F0F0' }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: '#F0F0F0' }}
                    >
                      <Package size={17} color="#888" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1A1A1A]">{name}</p>
                      <p className="text-xs text-[#FF4D4F] font-semibold mt-0.5">
                        ¥{info?.price.toFixed(2)}/{info?.unit ?? '盒'}
                      </p>
                    </div>
                    {/* Quantity stepper */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() =>
                          setQuantities((q) => ({ ...q, [name]: Math.max(1, qty - 1) }))
                        }
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-[#E0E0E0] active:bg-[#F0F0F0]"
                      >
                        <Minus size={12} color="#666" />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-[#1A1A1A]">
                        {qty}
                      </span>
                      <button
                        onClick={() =>
                          setQuantities((q) => ({ ...q, [name]: qty + 1 }))
                        }
                        className="w-7 h-7 rounded-full flex items-center justify-center active:opacity-80"
                        style={{ background: 'var(--mt-yellow)' }}
                      >
                        <Plus size={12} color="#1A1A1A" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ borderTop: '1px solid #F5F5F5' }}
            >
              <div className="flex-1">
                <span className="text-xs text-[#999]">合计 </span>
                <span className="text-lg font-bold" style={{ color: '#FF4D4F' }}>
                  ¥{total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={orderState === 'paying'}
                className="flex items-center gap-1.5 px-6 py-3 rounded-xl text-sm font-bold text-[#1A1A1A] active:opacity-80 disabled:opacity-60"
                style={{ background: 'var(--mt-yellow)' }}
              >
                <ShoppingCart size={15} />
                {orderState === 'paying' ? '提交中...' : '去结算'}
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
