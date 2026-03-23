'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function LiveAudioPlayer({ playbackUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playbackUrl || !audioRef.current) return;

    let hls = null;
    let isDestroyed = false;

    // Safety timeout: Never stay in loading for more than 4 seconds
    const safetyTimer = setTimeout(() => {
      if (!isDestroyed) {
        console.log("Player safety timeout reached. Showing UI.");
        setLoading(false);
      }
    }, 4000);

    const initHls = () => {
      if (isDestroyed) return;

      if (window.Hls) {
        if (window.Hls.isSupported()) {
          console.log("Initializing HLS...");
          hls = new window.Hls({ 
            lowLatencyMode: true,
            manifestLoadingMaxRetry: 10,
            manifestLoadingRetryDelay: 2000
          });
          hls.loadSource(playbackUrl);
          hls.attachMedia(audioRef.current);
          
          hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
            if (isDestroyed) return;
            console.log("Manifest parsed!");
            clearTimeout(safetyTimer);
            setLoading(false);
            // We don't auto-play here to avoid browser blocks, user clicks play
          });

          hls.on(window.Hls.Events.ERROR, (_, data) => {
            if (data.fatal) {
              console.warn("HLS fatal error:", data.details);
              // Don't show error immediately, let it retry or let user click play
            }
          });
        } else if (audioRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          audioRef.current.src = playbackUrl;
          clearTimeout(safetyTimer);
          setLoading(false);
        }
      } else {
        setTimeout(initHls, 500);
      }
    };

    initHls();

    return () => {
      isDestroyed = true;
      clearTimeout(safetyTimer);
      if (hls) hls.destroy();
    };
  }, [playbackUrl]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsPlaying(true);
        setError(false);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Playback failed:", err);
      setError(true);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
    setIsMuted(val === 0);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#1A2332] rounded-3xl border border-[#c4a962]/20">
        <div className="w-10 h-10 border-4 border-[#c4a962]/20 border-t-[#c4a962] rounded-full animate-spin mb-4"></div>
        <p className="text-[#F0F4F8] font-medium">অডিও সংযোগ করা হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[640px] mx-auto bg-[#1A2332] p-8 rounded-[2.5rem] shadow-2xl border border-[#c4a962]/10 relative overflow-hidden">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="text-[10px] font-bold text-white tracking-widest leading-none">LIVE</span>
      </div>

      <div className="mt-8 text-center space-y-8">
        <p className="text-3xl md:text-4xl font-[family-name:var(--font-arabic)] text-[#c4a962] font-medium" dir="rtl">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>

        <div className="flex justify-center items-end gap-1.5 h-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-1.5 bg-[#10B981] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-wave' : 'h-1.5'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            ></div>
          ))}
        </div>

        <p className="text-[#F0F4F8] text-xl font-medium">সরাসরি বয়ান চলছে</p>

        {error && <p className="text-red-400 text-sm">অডিও সংযোগে সমস্যা হচ্ছে, প্লে বাটনে ক্লিক করে আবার চেষ্টা করুন।</p>}

        <div className="flex items-center gap-6 pt-4">
          <button onClick={togglePlay} className="w-16 h-16 rounded-full bg-[#c4a962] flex items-center justify-center text-[#1A2332] hover:scale-105 active:scale-95 transition-all">
            {isPlaying ? <Pause fill="currentColor" /> : <Play className="ml-1" fill="currentColor" />}
          </button>
          <div className="flex-1 flex items-center gap-3">
            {isMuted || volume === 0 ? <VolumeX className="text-[#8899A6]" /> : <Volume2 className="text-[#8899A6]" />}
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="flex-1 accent-[#c4a962] bg-[#8899A6]/20 h-1.5 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
      </div>
      <audio ref={audioRef} className="hidden" />
      <style jsx>{`
        @keyframes sound-wave { 0%, 100% { height: 6px; } 50% { height: 28px; } }
        .animate-sound-wave { animation: sound-wave 0.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
