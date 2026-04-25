'use client';

import { useState } from 'react';
import { HealthRecord } from '@/lib/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface HealthTrendChartProps {
  records: HealthRecord[];
}

type Tab = 'bp' | 'sugar';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

const CustomTooltip = ({ active, payload, label, tab }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-3 py-2 text-xs shadow-lg"
      style={{ background: '#1A1A1A', color: '#fff' }}
    >
      <p className="font-medium mb-1">{label}</p>
      {tab === 'bp' ? (
        <>
          <p style={{ color: '#FF7A7A' }}>收缩压：{payload[0]?.value} mmHg</p>
          <p style={{ color: '#82C4FF' }}>舒张压：{payload[1]?.value} mmHg</p>
        </>
      ) : (
        <p style={{ color: '#FFD100' }}>空腹血糖：{payload[0]?.value} mmol/L</p>
      )}
    </div>
  );
};

export default function HealthTrendChart({ records }: HealthTrendChartProps) {
  const [tab, setTab] = useState<Tab>('bp');

  // Show last 14 days
  const chartData = records.slice(-14).map((r) => ({
    date: formatDate(r.date),
    systolic: r.systolic,
    diastolic: r.diastolic,
    bloodSugar: r.bloodSugar,
  }));

  const latestBP = records[records.length - 1];
  const bpStatus =
    latestBP?.systolic >= 160
      ? { label: '偏高', color: '#FF4D4F' }
      : latestBP?.systolic >= 140
      ? { label: '轻度偏高', color: '#FAAD14' }
      : { label: '正常', color: '#52C41A' };

  const sugarStatus =
    latestBP?.bloodSugar >= 9
      ? { label: '偏高', color: '#FF4D4F' }
      : latestBP?.bloodSugar >= 7
      ? { label: '轻度偏高', color: '#FAAD14' }
      : { label: '正常', color: '#52C41A' };

  return (
    <div className="app-card px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-[#1A1A1A]">健康趋势（近14天）</span>
        {/* Tab switcher */}
        <div
          className="flex rounded-lg overflow-hidden text-xs font-medium"
          style={{ border: '1px solid #EBEBEB', background: '#F5F5F5' }}
        >
          <button
            onClick={() => setTab('bp')}
            className="px-3 py-1.5 transition-all"
            style={{
              background: tab === 'bp' ? '#1A1A1A' : 'transparent',
              color: tab === 'bp' ? '#FFD100' : '#999',
            }}
          >
            血压
          </button>
          <button
            onClick={() => setTab('sugar')}
            className="px-3 py-1.5 transition-all"
            style={{
              background: tab === 'sugar' ? '#1A1A1A' : 'transparent',
              color: tab === 'sugar' ? '#FFD100' : '#999',
            }}
          >
            血糖
          </button>
        </div>
      </div>

      {/* Current value summary */}
      {tab === 'bp' ? (
        <div className="flex items-center gap-3 mb-3 px-1">
          <div>
            <span className="text-2xl font-bold text-[#1A1A1A]">
              {latestBP?.systolic}
            </span>
            <span className="text-sm text-[#999] ml-0.5">/{latestBP?.diastolic}</span>
            <span className="text-xs text-[#999] ml-1">mmHg</span>
          </div>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${bpStatus.color}18`, color: bpStatus.color }}
          >
            {bpStatus.label}
          </span>
          <span className="text-xs text-[#999] ml-auto">今日最新</span>
        </div>
      ) : (
        <div className="flex items-center gap-3 mb-3 px-1">
          <div>
            <span className="text-2xl font-bold text-[#1A1A1A]">
              {latestBP?.bloodSugar?.toFixed(1)}
            </span>
            <span className="text-xs text-[#999] ml-1">mmol/L</span>
          </div>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${sugarStatus.color}18`, color: sugarStatus.color }}
          >
            {sugarStatus.label}
          </span>
          <span className="text-xs text-[#999] ml-auto">空腹血糖</span>
        </div>
      )}

      {/* Chart */}
      <div style={{ height: 140 }}>
        <ResponsiveContainer width="100%" height="100%">
          {tab === 'bp' ? (
            <LineChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#CCC' }}
                tickLine={false}
                axisLine={false}
                interval={3}
              />
              <YAxis
                domain={[70, 170]}
                tick={{ fontSize: 10, fill: '#CCC' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip tab="bp" />} />
              <ReferenceLine y={140} stroke="#FAAD1460" strokeDasharray="4 4" />
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#FF7A7A"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#FF4D4F' }}
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#82C4FF"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#1677FF' }}
              />
            </LineChart>
          ) : (
            <LineChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#CCC' }}
                tickLine={false}
                axisLine={false}
                interval={3}
              />
              <YAxis
                domain={[5, 11]}
                tick={{ fontSize: 10, fill: '#CCC' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip tab="sugar" />} />
              <ReferenceLine y={7.0} stroke="#FAAD1460" strokeDasharray="4 4" />
              <Line
                type="monotone"
                dataKey="bloodSugar"
                stroke="#FFB800"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: '#FFD100' }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      {tab === 'bp' && (
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 rounded bg-[#FF7A7A]" />
            <span className="text-[10px] text-[#999]">收缩压</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 rounded bg-[#82C4FF]" />
            <span className="text-[10px] text-[#999]">舒张压</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-px border-t border-dashed border-[#FAAD14]" />
            <span className="text-[10px] text-[#999]">140 参考线</span>
          </div>
        </div>
      )}
      {tab === 'sugar' && (
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 rounded bg-[#FFB800]" />
            <span className="text-[10px] text-[#999]">空腹血糖</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-px border-t border-dashed border-[#FAAD14]" />
            <span className="text-[10px] text-[#999]">7.0 参考线</span>
          </div>
        </div>
      )}
    </div>
  );
}
