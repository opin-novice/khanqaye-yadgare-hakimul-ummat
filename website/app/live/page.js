'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import LiveAudioPlayer from '@/components/LiveAudioPlayer';

export default function LivePage() {
  const [settings, setSettings] = useState(null);
  const [status, setStatus] = useState('loading');

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/live-status', { cache: 'no-store' });
      const data = await res.json();
      console.log("Live status check:", data);
      
      if (data && data.isLive === true && data.livePlaybackUrl) {
        setSettings(data);
        setStatus('online');
      } else {
        setStatus('offline');
      }
    } catch (e) {
      console.error("Fetch error:", e);
      setStatus('offline');
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#0F1419]">
        <div className="w-12 h-12 border-4 border-[#c4a962]/20 border-t-[#c4a962] rounded-full animate-spin mb-4"></div>
        <p className="text-[#F0F4F8] text-lg">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (status === 'online') {
    return (
      <div className="min-h-[80vh] bg-[#0F1419] flex flex-col items-center justify-center p-4">
        {/* Load HLS script from CDN for broad compatibility */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/hls.js@latest" 
          strategy="beforeInteractive"
        />
        
        <LiveAudioPlayer playbackUrl={settings.livePlaybackUrl} />
        
        <p className="mt-8 text-[#8899A6] text-sm italic">
          সরাসরি বয়ান শেষ হলে পেজটি স্বাভাবিক অবস্থায় ফিরে আসবে
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-[#0F1419] flex flex-col items-center justify-center text-center p-6">
      <div className="text-8xl mb-8 opacity-20">🕌</div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#F0F4F8] mb-4">
        এখন সরাসরি কোনো অনুষ্ঠান নেই
      </h1>
      <Link href="/bayans" className="bg-[#c4a962] text-[#1f4e3d] px-8 py-3 rounded-2xl font-bold transition-all shadow-xl">
        রেকর্ড করা বয়ান শুনুন →
      </Link>
    </div>
  );
}
