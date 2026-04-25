import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import TabBar from '@/components/layout/TabBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '慢病用药小管家',
  description: '您的专属慢性病用药管理助手',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="h-full flex items-center justify-center"
        style={{ background: '#E8E8E8' }}
      >
        {/* Desktop: shows as phone; Mobile: full screen */}
        <div
          className="phone-shell shadow-2xl"
          style={{
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          }}
        >
          {/* Status bar (decorative on desktop) */}
          <div
            className="flex items-center justify-between px-5 shrink-0"
            style={{
              height: '44px',
              background: 'var(--mt-yellow)',
              paddingTop: 'env(safe-area-inset-top, 0px)',
            }}
          >
            <span className="text-xs font-semibold text-[#1A1A1A]">9:41</span>
            <span className="text-[10px] font-medium text-[#1A1A1A] opacity-70">
              美团买药
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-[#1A1A1A]">●●●</span>
            </div>
          </div>

          {/* Page content */}
          <main className="page-content page-enter">{children}</main>

          {/* Bottom tab bar */}
          <TabBar />
        </div>
      </body>
    </html>
  );
}
