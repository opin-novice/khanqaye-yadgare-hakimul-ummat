'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import { Radio } from 'lucide-react';

export default function LiveBanner() {
  const [isLive, setIsLive] = useState(false);

  const checkLive = async () => {
    try {
      const data = await client.fetch(`*[_type == "siteSettings"][0] { isLive }`);
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
      className="block w-full bg-[#10B981] py-3 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:brightness-110 transition-all group"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 text-white">
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </div>
          <span className="font-bold text-lg">🎙️ সরাসরি বয়ান চলছে — এখনই শুনুন</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 bg-white/20 px-4 py-1 rounded-full text-sm font-bold group-hover:scale-105 transition-transform">
          সরাসরি শুনুন →
        </div>
      </div>
    </Link>
  );
}
