'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Send, ShoppingCart, Package, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  drugs?: DrugSuggestion[];
  time: string;
}

interface DrugSuggestion {
  name: string;
  spec: string;
  price: number;
  indication: string;
}

function now() {
  return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}

const QUICK_QUESTIONS = [
  { label: '💊 药快吃完了，需要续方吗？', key: 'refill' },
  { label: '📈 血压最近偏高怎么办？', key: 'bp' },
  { label: '🤔 二甲双胍和其他药能一起吃吗？', key: 'compat' },
];

const AI_RESPONSES: Record<string, { content: string; drugs?: DrugSuggestion[] }> = {
  refill: {
    content:
      '根据您的用药记录，**二甲双胍缓释片** 目前库存仅剩约 6 天，建议您尽快补充。\n\n您持有 2026-06-20 前有效的处方，可以直接续方购药，无需再次就诊。',
    drugs: [
      { name: '二甲双胍缓释片', spec: '0.5g × 60片/瓶', price: 22.0, indication: '2型糖尿病' },
      { name: '厄贝沙坦片', spec: '0.15g × 14片/盒', price: 28.5, indication: '高血压' },
    ],
  },
  bp: {
    content:
      '根据您近14天的血压记录，收缩压在 138～156 mmHg 之间波动，属于**轻度偏高**。\n\n建议：\n• 坚持按时服用厄贝沙坦片，不要自行停药\n• 低盐饮食，每日钠摄入 < 5g\n• 情绪稳定，避免剧烈运动\n• 如持续≥160 mmHg，请及时联系张建华医生',
    drugs: [],
  },
  compat: {
    content:
      '您目前服用的四种药物（厄贝沙坦、二甲双胍、阿司匹林、瑞舒伐他汀）**均可同时服用**，是慢性病管理的常见联合用药方案。\n\n注意事项：\n• 二甲双胍建议**随餐服用**，可减少胃肠道不适\n• 阿司匹林建议**早餐后**服用，避免空腹\n• 瑞舒伐他汀建议**晚上**服用，效果更佳',
    drugs: [],
  },
};

export default function ConsultPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'ai',
      content:
        '您好，王阿姨！我是您的 AI 健康助手 🌿\n\n我已了解您的用药记录和健康档案，可以为您解答用药疑问、分析健康趋势、协助续方购药。\n\n请问今天有什么想咨询的吗？',
      time: now(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [typing, setTyping] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [cartToast, setCartToast] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string, key?: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      time: now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setTyping(true);

    setTimeout(() => {
      const responseKey = key ?? 'refill';
      const resp = AI_RESPONSES[responseKey] ?? AI_RESPONSES.refill;
      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'ai',
        content: resp.content,
        drugs: resp.drugs,
        time: now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, 1200);
  };

  const addToCart = (name: string) => {
    setCart((prev) => [...prev, name]);
    setCartToast(`${name} 已加入购药清单`);
    setTimeout(() => setCartToast(''), 2500);
  };

  // Render message content with simple markdown (bold, newlines)
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className={i > 0 ? 'mt-1' : ''}>
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j}>{part}</strong>
            ) : (
              <span key={j}>{part}</span>
            )
          )}
        </p>
      );
    });
  };

  return (
    <div
      className="flex flex-col"
      style={{ height: '100%', background: '#F2F3F5' }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 shrink-0"
        style={{ background: 'linear-gradient(135deg, #FFD100 0%, #FFBC00 100%)' }}
      >
        <Link href="/profile">
          <button className="w-8 h-8 rounded-full flex items-center justify-center bg-black/10 active:bg-black/20">
            <ChevronLeft size={18} color="#1A1A1A" />
          </button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} color="#1A1A1A" />
            <span className="text-sm font-bold text-[#1A1A1A]">AI 智能问诊</span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
              style={{ background: '#1A1A1A', color: '#FFD100' }}
            >
              免费
            </span>
          </div>
          <p className="text-[11px] text-[#555]">7×24小时 · 已了解您的健康档案</p>
        </div>
        {cart.length > 0 && (
          <div className="relative">
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-black/10">
              <ShoppingCart size={16} color="#1A1A1A" />
            </button>
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold text-white"
              style={{ background: '#FF4D4F' }}
            >
              {cart.length}
            </span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            {msg.role === 'ai' && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'linear-gradient(135deg, #00B4B4, #36CFC9)' }}
              >
                <Sparkles size={14} color="#fff" />
              </div>
            )}

            <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              {/* Bubble */}
              <div
                className="rounded-2xl px-3.5 py-2.5 text-sm leading-6"
                style={
                  msg.role === 'user'
                    ? { background: '#FFD100', color: '#1A1A1A', borderBottomRightRadius: '4px' }
                    : { background: '#fff', color: '#1A1A1A', borderBottomLeftRadius: '4px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }
                }
              >
                {renderContent(msg.content)}
              </div>

              {/* Drug recommendation cards */}
              {msg.drugs && msg.drugs.length > 0 && (
                <div className="space-y-2 w-full mt-1">
                  {msg.drugs.map((drug) => {
                    const inCart = cart.includes(drug.name);
                    return (
                      <div
                        key={drug.name}
                        className="rounded-xl px-3 py-2.5 flex items-center gap-2.5"
                        style={{ background: '#fff', border: '1px solid #F0F0F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: '#F5F5F5' }}
                        >
                          <Package size={15} color="#888" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#1A1A1A]">{drug.name}</p>
                          <p className="text-[11px] text-[#999]">{drug.spec}</p>
                          <p className="text-[11px] font-bold" style={{ color: '#FF4D4F' }}>
                            ¥{drug.price.toFixed(2)}/盒
                          </p>
                        </div>
                        <button
                          onClick={() => !inCart && addToCart(drug.name)}
                          className="shrink-0 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all"
                          style={{
                            background: inCart ? '#F6FFED' : 'var(--mt-yellow)',
                            color: inCart ? '#52C41A' : '#1A1A1A',
                          }}
                        >
                          {inCart ? '已加入' : '加入清单'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <span className="text-[10px] text-[#CCC] px-1">{msg.time}</span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #00B4B4, #36CFC9)' }}
            >
              <Sparkles size={14} color="#fff" />
            </div>
            <div
              className="rounded-2xl px-4 py-3 flex items-center gap-1"
              style={{ background: '#fff', borderBottomLeftRadius: '4px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#CCC]"
                  style={{ animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quick questions (shown before any user message) */}
        {messages.length === 1 && !typing && (
          <div className="space-y-2 mt-1">
            <p className="text-xs text-[#999] text-center">快速提问</p>
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q.key}
                onClick={() => sendMessage(q.label.replace(/^[^\s]+ /, ''), q.key)}
                className="w-full text-left rounded-xl px-4 py-3 text-sm transition-opacity active:opacity-70"
                style={{ background: '#fff', border: '1px solid #EBEBEB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
              >
                {q.label}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Toast */}
      {cartToast && (
        <div
          className="fixed left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium text-white z-50"
          style={{ background: '#1A1A1A', bottom: '84px', animation: 'fadeUp 0.2s ease' }}
        >
          {cartToast}
        </div>
      )}

      {/* Input bar */}
      <div
        className="px-4 py-3 flex items-center gap-2 shrink-0"
        style={{ background: '#fff', borderTop: '1px solid #F0F0F0' }}
      >
        <input
          className="flex-1 rounded-full px-4 py-2 text-sm text-[#1A1A1A] bg-[#F5F5F5] focus:outline-none"
          placeholder="输入您的问题..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputText)}
        />
        <button
          onClick={() => sendMessage(inputText)}
          disabled={!inputText.trim() || typing}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-opacity disabled:opacity-40"
          style={{ background: 'var(--mt-yellow)' }}
        >
          <Send size={16} color="#1A1A1A" />
        </button>
      </div>
    </div>
  );
}
