'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Play, Pause, Volume2, VolumeX, Mic2, Radio, Globe } from 'lucide-react';

export default function LivePage() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('FETCHING');
  const [playerLoading, setPlayerLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef(null);
  const hlsRef = useRef(null);

  const checkServer = async () => {
    try {
      const res = await fetch('/api/live-status', { cache: 'no-store' });
      const json = await res.json();
      setData(json);
      if (json && json.isLive && json.livePlaybackUrl) {
        setStatus('ONLINE');
      } else {
        setStatus('OFFLINE');
      }
    } catch (err) {
      console.error("Check Failed:", err);
      setStatus('OFFLINE');
    }
  };

  useEffect(() => {
    checkServer();
    const inv = setInterval(checkServer, 30000);
    return () => clearInterval(inv);
  }, []);

  useEffect(() => {
    const playbackUrl = data?.livePlaybackUrl;
    if (status !== 'ONLINE' || !playbackUrl || !audioRef.current) return;

    let hlsInstance = null;
    let isMounted = true;

    const loaderTimer = setTimeout(() => {
      if (isMounted) setPlayerLoading(false);
    }, 5000);

    const startPlayer = () => {
      if (!isMounted) return;
      if (window.Hls) {
        if (window.Hls.isSupported()) {
          hlsInstance = new window.Hls({ lowLatencyMode: true });
          hlsRef.current = hlsInstance;
          hlsInstance.loadSource(playbackUrl);
          hlsInstance.attachMedia(audioRef.current);
          hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
            if (isMounted) {
              clearTimeout(loaderTimer);
              setPlayerLoading(false);
            }
          });
        }
      } else {
        setTimeout(startPlayer, 1000);
      }
    };

    startPlayer();

    return () => {
      isMounted = false;
      clearTimeout(loaderTimer);
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [status, data?.livePlaybackUrl]);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error(e));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  if (status === 'FETCHING') {
    return (
      <div className="min-h-screen bg-[#0A0F14] flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-[#c4a962]/20 border-t-[#c4a962] rounded-full animate-spin mb-6" />
        <p className="text-xl font-medium tracking-wide animate-pulse">লাইভ চেক করা হচ্ছে...</p>
      </div>
    );
  }

  if (status === 'OFFLINE') {
    return (
      <div className="min-h-screen bg-[#0A0F14] flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 blur-[120px] rounded-full" />
        
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="w-32 h-32 bg-[#1A2332] rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl border border-white/5 group">
            <Radio className="w-12 h-12 text-[#c4a962] opacity-20 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white/90">এখন লাইভ বয়ান নেই</h2>
          <p className="text-gray-400 mb-12 text-lg leading-relaxed">বয়ান শুরু হলে এই পেজটি স্বয়ংক্রিয়ভাবে লাইভ প্লেয়ারে পরিণত হবে। অনুগ্রহ করে অপেক্ষা করুন।</p>
          <Link href="/bayans" className="inline-flex items-center gap-3 bg-[#c4a962] hover:bg-[#d4b972] text-[#0A0F14] px-10 py-5 rounded-2xl font-bold shadow-[0_10px_40px_rgba(196,169,98,0.2)] transition-all hover:-translate-y-1 active:scale-95">
            পূর্বের বয়ান শুনুন <Globe className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F14] overflow-hidden flex flex-col items-center justify-center p-4 relative">
      <Script 
        src="https://cdn.jsdelivr.net/npm/hls.js@1.5.7/dist/hls.min.js" 
        strategy="afterInteractive" 
      />

      {/* --- MESH GRADIENT BACKDROP --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[15%] w-[45%] h-[45%] bg-emerald-900/30 blur-[120px] rounded-full animate-blob" />
        <div className="absolute bottom-[10%] right-[15%] w-[45%] h-[45%] bg-amber-900/20 blur-[120px] rounded-full animate-blob animation-delay-2000" />
        <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {playerLoading ? (
          <div className="backdrop-blur-3xl bg-white/5 p-16 rounded-[3rem] border border-white/10 shadow-2xl flex flex-col items-center animate-in fade-in zoom-in duration-700">
            <div className="w-14 h-14 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6" />
            <p className="text-emerald-500 font-bold tracking-widest text-sm uppercase">Establishing Connection</p>
            <p className="text-white/60 mt-2 text-sm italic">বয়ান সংযোগ করা হচ্ছে...</p>
          </div>
        ) : (
          <div className="w-full max-w-[680px] backdrop-blur-3xl bg-white/5 p-8 md:p-14 rounded-[3.5rem] shadow-2xl border border-white/10 relative overflow-hidden animate-in slide-in-from-bottom-12 duration-1000">
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

            {/* LIVE Badge */}
            <div className="flex justify-center mb-10">
              <div className="flex items-center gap-3 px-5 py-2 bg-red-600/90 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.3)] backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
                <span className="text-xs font-black text-white tracking-[0.2em]">LIVE NOW</span>
              </div>
            </div>

            <p className="text-4xl md:text-6xl font-serif text-[#c4a962] mb-12 drop-shadow-2xl" dir="rtl">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
            
            {/* Visualization */}
            <div className="flex justify-center items-end gap-2 h-12 mb-10">
              {[...Array(9)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-wave' : 'h-2 opacity-30'}`} 
                  style={{ animationDelay: `${i * 120}ms`, height: isPlaying ? 'auto' : '8px' }} 
                />
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-12 text-white/95 tracking-tight">সরাসরি বয়ান চলছে</h1>

            <div className="flex flex-col items-center gap-10">
              {/* Play Button with Pulsing Rings */}
              <div className="relative">
                {isPlaying && (
                  <>
                    <div className="absolute inset-0 bg-[#c4a962]/40 rounded-full animate-ping-slow scale-150" />
                    <div className="absolute inset-0 bg-[#c4a962]/20 rounded-full animate-ping-slow scale-125 animation-delay-1000" />
                  </>
                )}
                <button 
                  onClick={togglePlay} 
                  aria-label={isPlaying ? "বয়ান থামান" : "বয়ান চালু করুন"}
                  className="relative z-10 w-28 h-28 rounded-full bg-[#c4a962] flex items-center justify-center text-[#0A0F14] shadow-[0_0_50px_rgba(196,169,98,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 group"
                >
                  {isPlaying ? (
                    <Pause size={40} fill="currentColor" className="group-hover:scale-110 transition-transform text-[#0A0F14]" />
                  ) : (
                    <Play size={40} fill="currentColor" className="ml-2 group-hover:scale-110 transition-transform text-[#0A0F14]" />
                  )}
                </button>
              </div>

              {/* Volume & Details */}
              <div className="w-full max-w-sm pt-6 border-t border-white/10 flex flex-col items-center gap-6">
                <div className="flex items-center gap-4 w-full">
                  <Volume2 className="text-white/40 w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden relative group">
                    <div 
                      className="absolute left-0 top-0 h-full bg-[#c4a962]" 
                      style={{ width: '100%' }}
                    />
                  </div>
                  <Mic2 className="text-[#c4a962] w-5 h-5 flex-shrink-0 animate-pulse" />
                </div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Broadcasting via Livepeer Studio</p>
              </div>
            </div>
          </div>
        )}
        
        <Link href="/" className="mt-12 text-white/40 hover:text-[#c4a962] transition-colors flex items-center gap-2 group italic text-sm">
          <span>মূল পাতায় ফিরে যান</span>
          <span className="w-4 h-[1px] bg-white/20 group-hover:bg-[#c4a962] transition-colors" />
        </Link>
      </div>

      <audio ref={audioRef} className="hidden" />

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes sound-wave {
          0%, 100% { height: 12px; }
          50% { height: 48px; }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          70%, 100% { transform: scale(3.5); opacity: 0; }
        }
        .animate-blob { animation: blob 15s infinite alternate ease-in-out; }
        .animate-sound-wave { animation: sound-wave 0.8s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
