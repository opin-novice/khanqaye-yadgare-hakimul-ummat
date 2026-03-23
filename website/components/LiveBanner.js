'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import { Radio } from 'lucide-react';

export default function LiveBanner() {
  const [isLive, setIsLive] = useState(false);

  const checkLive = async () => {
    try {
      const response = await fetch('/api/live-status');
      const data = await response.json();
      setIsLive(!!data?.isLive);
    } catch (e) {
      console.error("Live banner fetch error", e);
    }
  };

  useEffect(() => {
    checkLive();
    const interval = setInterval(checkLive, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isLive) return null;

  return (
    <Link
      href="/live"
      className="block w-full bg-gradient-to-r from-[#0F1419] via-[#7F1D1D] to-[#0F1419] py-3 shadow-[0_0_24px_rgba(220,38,38,0.5)] hover:shadow-[0_0_32px_rgba(220,38,38,0.7)] border-y border-red-900/40 hover:brightness-110 transition-all group"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 text-white">
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
          <span className="font-bold text-lg">🎙️ সরাসরি বয়ান চলছে — এখনই শুনুন</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 bg-red-500/20 border border-red-500/40 px-4 py-1 rounded-full text-sm font-bold group-hover:scale-105 transition-transform">
          সরাসরি শুনুন →
        </div>
      </div>
    </Link>
  );
}