import { AppData } from './types';
import { mockData } from './mock-data';

const STORAGE_KEY = 'medicine-manager-v1';

export function getData(): AppData {
  if (typeof window === 'undefined') return mockData;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
      return mockData;
    }
    return JSON.parse(stored) as AppData;
  } catch {
    return mockData;
  }
}

export function setData(data: AppData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetData(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
}

export function getTodayStr(): string {
  return new Date().toISOString().split('T')[0];
}

export function getDateStr(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function isPastDate(dateStr: string): boolean {
  return daysUntil(dateStr) < 0;
}
