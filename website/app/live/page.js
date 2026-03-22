'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

/**
 * CONSOLIDATED LIVE PAGE & PLAYER
 * This file contains everything to avoid import/caching issues.
 */

export default function LivePage() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('FETCHING'); // FETCHING -> ONLINE or OFFLINE
  const [playerLoading, setPlayerLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef(null);
  const hlsRef = useRef(null);

  // 1. Fetch Status from API Proxy
  const checkServer = async () => {
    try {
      console.log("LOG: Checking Server...");
      const res = await fetch('/api/live-status', { cache: 'no-store' });
      const json = await res.json();
      console.log("LOG: Result:", json);
      
      setData(json);
      if (json && json.isLive && json.livePlaybackUrl) {
        setStatus('ONLINE');
      } else {
        setStatus('OFFLINE');
      }
    } catch (err) {
      console.error("LOG: Check Failed:", err);
      setStatus('OFFLINE');
    }
  };

  useEffect(() => {
    checkServer();
    const inv = setInterval(checkServer, 30000);
    return () => clearInterval(inv);
  }, []);

  // 2. Initialize Player when ONLINE
  useEffect(() => {
    // Only initialize or re-initialize if the status OR the playback URL actually changes
    const playbackUrl = data?.livePlaybackUrl;
    if (status !== 'ONLINE' || !playbackUrl || !audioRef.current) return;

    console.log("LOG: Initializing/Updating player for URL:", playbackUrl);
    let hlsInstance = null;
    let isMounted = true;

    // Hard timeout for loader
    const loaderTimer = setTimeout(() => {
      if (isMounted) {
        console.log("LOG: Timeout reached. Showing player anyway.");
        setPlayerLoading(false);
      }
    }, 5000);

    const startPlayer = () => {
      if (!isMounted) return;

      if (window.Hls) {
        if (window.Hls.isSupported()) {
          console.log("LOG: HLS.js Found. Loading stream...");
          hlsInstance = new window.Hls({ 
            lowLatencyMode: true,
            manifestLoadingMaxRetry: 10,
            manifestLoadingRetryDelay: 2000
          });
          hlsRef.current = hlsInstance;
          hlsInstance.loadSource(playbackUrl);
          hlsInstance.attachMedia(audioRef.current);
          
          hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
            console.log("LOG: Manifest Ready.");
            if (isMounted) {
              clearTimeout(loaderTimer);
              setPlayerLoading(false);
            }
          });

          hlsInstance.on(window.Hls.Events.ERROR, (_, d) => {
            if (d.fatal) {
              console.error("LOG: FATAL ERROR:", d.details);
              if (isMounted) {
                setError(true);
                setPlayerLoading(false);
              }
            }
          });
        }
      } else {
        console.log("LOG: Hls.js not on window yet. Retrying...");
        setTimeout(startPlayer, 1000);
      }
    };

    startPlayer();

    return () => {
      isMounted = false;
      clearTimeout(loaderTimer);
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [status, data?.livePlaybackUrl]); // KEY FIX: Depend on playbackUrl, not the entire data object

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Play failed", e));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // UI - FETCHING
  if (status === 'FETCHING') {
    return (
      <div className="min-h-[85vh] bg-[#0F1419] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xl font-bold">লাইভ চেক করা হচ্ছে...</p>
      </div>
    );
  }

  // UI - OFFLINE
  if (status === 'OFFLINE') {
    return (
      <div className="min-h-[85vh] bg-[#0F1419] flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="text-8xl mb-6 opacity-30 grayscale">🌙</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">এখন লাইভ বয়ান নেই</h2>
        <Link href="/bayans" className="bg-[#c4a962] text-[#1f4e3d] px-10 py-4 rounded-2xl font-bold">পূর্বের বয়ান শুনুন</Link>
      </div>
    );
  }

  // UI - ONLINE
  return (
    <div className="min-h-[85vh] bg-[#0F1419] flex flex-col items-center justify-center p-4">
      <Script 
        src="https://cdn.jsdelivr.net/npm/hls.js@1.5.7/dist/hls.min.js" 
        strategy="afterInteractive" 
        onLoad={() => console.log("LOG: CDN SCRIPT LOADED")}
      />

      {playerLoading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-[#1A2332] rounded-3xl border border-emerald-500/20 text-white">
          <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
          <p className="font-medium">অডিও সংযোগ করা হচ্ছে...</p>
        </div>
      ) : (
        <div className="w-full max-w-[640px] bg-[#1A2332] p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-emerald-500/10 relative overflow-hidden text-center text-white">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest">LIVE</span>
          </div>

          <p className="text-3xl md:text-5xl font-serif text-[#c4a962] mt-6" dir="rtl">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          
          <div className="flex justify-center items-end gap-1.5 h-10 my-8">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className={`w-1.5 bg-emerald-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-wave' : 'h-1.5'}`} style={{ animationDelay: `${i*100}ms` }} />
            ))}
          </div>

          <h1 className="text-2xl font-bold mb-8">সরাসরি বয়ান চলছে</h1>

          <button onClick={togglePlay} className="w-20 h-20 rounded-full bg-[#c4a962] flex items-center justify-center mx-auto mb-10 text-[#1A2332] shadow-2xl hover:scale-105 active:scale-95 transition-all">
            {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
          </button>

          <p className="text-xs text-gray-500 italic">সার্ভার: Livepeer Studio HLS</p>
          {error && <p className="text-red-400 mt-4 text-xs">সংযোগ বিচ্ছিন্ন। পেজটি রিফ্রেশ করে আবার চেষ্টা করুন।</p>}
        </div>
      )}

      <audio ref={audioRef} className="hidden" />
      <style jsx>{`
        @keyframes sound-wave { 0%, 100% { height: 6px; } 50% { height: 32px; } }
        .animate-sound-wave { animation: sound-wave 0.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
