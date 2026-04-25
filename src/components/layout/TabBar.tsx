'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CalendarDays, Stethoscope, User } from 'lucide-react';

const tabs = [
  { href: '/', label: '首页', icon: Home },
  { href: '/plan', label: '计划', icon: CalendarDays },
  { href: '/revisit', label: '复诊', icon: Stethoscope },
  { href: '/profile', label: '我的', icon: User },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-50 flex items-center border-t"
      style={{
        height: 'var(--mt-tab-height)',
        background: '#FFFFFF',
        borderColor: '#EBEBEB',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {tabs.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-opacity active:opacity-70"
          >
            <Icon
              size={22}
              strokeWidth={isActive ? 2.2 : 1.7}
              style={{ color: isActive ? 'var(--mt-yellow-dark)' : '#999999' }}
            />
            <span
              className="text-[10px] font-medium"
              style={{ color: isActive ? 'var(--mt-dark)' : '#999999' }}
            >
              {label}
            </span>
            {isActive && (
              <span
                className="absolute bottom-0 block h-[2px] w-8 rounded-full"
                style={{ background: 'var(--mt-yellow)' }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
