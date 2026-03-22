'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LivePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const checkStatus = async () => {
    try {
      console.log("DIAGNOSTIC: Checking status...");
      const res = await fetch('/api/live-status', { cache: 'no-store' });
      const json = await res.json();
      console.log("DIAGNOSTIC: Received:", json);
      setData(json);
    } catch (err) {
      console.error("DIAGNOSTIC: Fetch failed:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    checkStatus();
    const timer = setInterval(checkStatus, 15000);
    return () => clearInterval(timer);
  }, []);

  // 1. Initial Loading (No data yet)
  if (!data && !error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 font-sans">
        <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full mb-4" />
        <h2 className="text-2xl font-bold">সার্ভারের সাথে সংযুক্ত হওয়া হচ্ছে...</h2>
        <p className="text-gray-400 mt-2">Checking Live status...</p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold">নেটওয়ার্ক এরর</h2>
        <p className="text-gray-400 mt-2">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-6 bg-white text-black px-6 py-2 rounded-full font-bold">Retry</button>
      </div>
    );
  }

  // 3. Online State
  if (data?.isLive) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex flex-col items-center justify-center p-6 text-white font-sans">
        <div className="w-full max-w-xl bg-[#1A2332] rounded-[3rem] p-10 shadow-2xl border border-emerald-500/20 text-center space-y-8">
          <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold tracking-widest text-sm uppercase">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            LIVE BROADCASTING
          </div>

          <p className="text-4xl text-emerald-400 font-serif" dir="rtl">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          
          <h1 className="text-3xl font-bold text-gray-100">সরাসরি বয়ান চলছে</h1>

          {/* Diagnostic Player (Standard Audio Tag) */}
          <div className="py-6 flex flex-col items-center gap-4 bg-black/30 rounded-3xl">
            <audio 
              src={data.livePlaybackUrl} 
              controls 
              autoPlay 
              className="w-full max-w-sm accent-emerald-500"
            />
            <p className="text-xs text-gray-500">Note: Audio may take 10-20sec to start</p>
          </div>

          <p className="text-sm text-gray-500 italic">বয়ান শেষ না হওয়া পর্যন্ত এটি চলবে।</p>
        </div>
        
        <Link href="/" className="mt-10 text-emerald-500 hover:underline">← ফিরে যান</Link>
      </div>
    );
  }

  // 4. Offline State
  return (
    <div className="min-h-screen bg-[#0F1419] flex flex-col items-center justify-center p-10 text-white text-center">
      <div className="text-8xl mb-8 opacity-20">🌙</div>
      <h2 className="text-4xl font-bold mb-4">এখন লাইভ বয়ান নেই</h2>
      <p className="text-gray-400 max-w-md mx-auto mb-10">শায়খ যখন সরাসরি বয়ান শুরু করবেন, এখানে প্লেয়ারটি স্বয়ংক্রিয়ভাবে চালু হবে।</p>
      <Link href="/bayans" className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-500/20">
        রেকর্ড করা বয়ান শুনুন
      </Link>
    </div>
  );
}
