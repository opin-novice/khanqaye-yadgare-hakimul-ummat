'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import LiveAudioPlayer from '@/components/LiveAudioPlayer';

export default function LivePage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const data = await client.fetch(`*[_type == "siteSettings"][0] { isLive, livePlaybackUrl }`);
      setSettings(data);
    } catch (e) {
      console.error("Live page fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    // Poll every 30 seconds
    const interval = setInterval(fetchSettings, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#0F1419]">
        <div className="w-12 h-12 border-4 border-[#c4a962]/20 border-t-[#c4a962] rounded-full animate-spin mb-4"></div>
        <p className="text-[#F0F4F8] text-lg">লোড হচ্ছে...</p>
      </div>
    );
  }

  // ONLINE STATE
  if (settings?.isLive) {
    return (
      <div className="min-h-[80vh] bg-[#0F1419] flex flex-col items-center justify-center p-4">
        <LiveAudioPlayer playbackUrl={settings.livePlaybackUrl} />
        <p className="mt-8 text-[#8899A6] text-sm animate-pulse">
          বয়ান শেষ হলে পেজটি স্বয়ংক্রিয়ভাবে আপডেট হবে
        </p>
      </div>
    );
  }

  // OFFLINE STATE
  return (
    <div className="min-h-[80vh] bg-[#0F1419] flex flex-col items-center justify-center text-center p-6">
      <div className="text-8xl mb-8">🌙</div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#F0F4F8] mb-4">
        এখন কোনো সরাসরি বয়ান নেই
      </h1>
      <p className="text-[#8899A6] text-lg max-w-md mx-auto mb-8">
        শায়খ যখন বয়ান শুরু করবেন, এই পেজটি স্বয়ংক্রিয়ভাবে চালু হবে।
      </p>
      <div className="space-y-4">
        <p className="text-[#8899A6] text-xs">পেজটি প্রতি ৩০ সেকেন্ডে আপডেট হয়</p>
        <Link 
          href="/bayans" 
          className="inline-block text-[#c4a962] font-bold border-b border-[#c4a962]/30 pb-1 hover:border-[#c4a962] transition-all"
        >
          পূর্বের বয়ান শুনুন →
        </Link>
      </div>
    </div>
  );
}
