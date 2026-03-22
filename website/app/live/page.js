'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LiveAudioPlayer from '@/components/LiveAudioPlayer';

export default function LivePage() {
  const [settings, setSettings] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'online' | 'offline'

  const fetchStatus = async () => {
    try {
      console.log("Checking live server status...");
      const response = await fetch('/api/live-status', { cache: 'no-store' });
      const data = await response.json();
      console.log("Server response:", data);
      
      if (data && data.isLive === true && data.livePlaybackUrl) {
        setSettings(data);
        setStatus('online');
      } else {
        setSettings(data);
        setStatus('offline');
      }
    } catch (e) {
      console.error("Status check failed:", e);
      setStatus('offline'); // Default to offline on error
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // LOADING STATE
  if (status === 'loading') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#0F1419] text-center p-4">
        <div className="w-12 h-12 border-4 border-[#c4a962]/20 border-t-[#c4a962] rounded-full animate-spin mb-4"></div>
        <p className="text-[#F0F4F8] text-xl font-bold">সার্ভার চেক করা হচ্ছে</p>
        <p className="text-[#8899A6] mt-2">অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন...</p>
      </div>
    );
  }

  // ONLINE STATE
  if (status === 'online' && settings?.livePlaybackUrl) {
    return (
      <div className="min-h-[80vh] bg-[#0F1419] flex flex-col items-center justify-center p-4">
        <LiveAudioPlayer playbackUrl={settings.livePlaybackUrl} />
        <p className="mt-8 text-[#8899A6] text-sm italic">
          সরাসরি বয়ান শেষ হলে পেজটি স্বাভাবিক অবস্থায় ফিরে আসবে
        </p>
      </div>
    );
  }

  // OFFLINE STATE
  return (
    <div className="min-h-[80vh] bg-[#0F1419] flex flex-col items-center justify-center text-center p-6">
      <div className="text-8xl mb-8 grayscale opacity-50">🕌</div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#F0F4F8] mb-4">
        এখন সরাসরি কোনো অনুষ্ঠান নেই
      </h1>
      <p className="text-[#8899A6] text-lg max-w-md mx-auto mb-10">
        যখনই লাইভ বয়ান শুরু হবে, এই পেজটি স্বয়ংক্রিয়ভাবে প্লেয়ারে পরিণত হবে।
      </p>
      <div className="space-y-6">
        <Link 
          href="/bayans" 
          className="inline-block bg-[#c4a962]/10 text-[#c4a962] border border-[#c4a962]/30 px-8 py-3 rounded-2xl font-bold hover:bg-[#c4a962]/20 transition-all"
        >
          রেকর্ড করা বয়ান শুনুন →
        </Link>
        <p className="text-[#8899A6] text-xs">অটো-রিফ্রেশ মোড চালু আছে</p>
      </div>
    </div>
  );
}
