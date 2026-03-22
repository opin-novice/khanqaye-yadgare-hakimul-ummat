'use client';

import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function LiveAudioPlayer({ playbackUrl }) {
  const audioRef = useRef(null);
  const hlsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playbackUrl || !audioRef.current) return;

    let hlsInstance = null;

    // Safety timeout: If nothing happens in 10 seconds, stop loading and show the player/error
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 10000);

    const initPlayer = () => {
      if (Hls.isSupported()) {
        hlsInstance = new Hls({ 
          lowLatencyMode: true,
          backBufferLength: 60,
          manifestLoadingMaxRetry: 4,
          levelLoadingMaxRetry: 4
        });
        hlsRef.current = hlsInstance;
        hlsInstance.loadSource(playbackUrl);
        hlsInstance.attachMedia(audioRef.current);
        
        hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
          clearTimeout(timeout);
          setLoading(false);
          audioRef.current.play().catch(() => {});
          setIsPlaying(true);
        });

        hlsInstance.on(Hls.Events.ERROR, (_, data) => {
          console.warn("HLS Warning/Error:", data.type, data.details);
          if (data.fatal) {
            clearTimeout(timeout);
            setLoading(false);
            setError(true);
            hlsInstance.destroy();
          }
        });
      } else if (audioRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari native HLS fallback
        audioRef.current.src = playbackUrl;
        audioRef.current.addEventListener('loadedmetadata', () => {
          clearTimeout(timeout);
          setLoading(false);
          audioRef.current.play().catch(() => {});
          setIsPlaying(true);
        });
      }
    };

    initPlayer();

    return () => {
      clearTimeout(timeout);
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [playbackUrl]);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioRef.current.volume = val;
    setIsMuted(val === 0);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#1A2332] rounded-3xl border border-[#c4a962]/20 shadow-2xl transition-all duration-500">
        <div className="w-10 h-10 border-4 border-[#c4a962]/20 border-t-[#c4a962] rounded-full animate-spin mb-4"></div>
        <p className="text-[#F0F4F8] font-medium">অডিও সংযোগ করা হচ্ছে...</p>
        <p className="text-[#8899A6] text-xs mt-2">বয়ান শুরু হওয়া পর্যন্ত অপেক্ষা করুন</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-[#1A2332] rounded-3xl border border-red-500/30 text-center shadow-2xl">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-red-400 mb-2 font-bold">অডিও সংযোগ বিচ্ছিন্ন</p>
        <p className="text-[#8899A6] text-sm mb-6">লিঙ্কটি সঠিক কি না বা বয়ান বর্তমানে চলছে কি না যাচাই করুন।</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-[#c4a962] text-[#1f4e3d] px-8 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-all"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[640px] mx-auto bg-[#1A2332] p-8 rounded-[2.5rem] shadow-2xl border border-[#c4a962]/10 relative overflow-hidden transition-all duration-700">
      {/* Pulse LIVE badge */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="text-[10px] font-bold text-white tracking-widest leading-none">LIVE</span>
      </div>

      <div className="mt-8 text-center space-y-8">
        <p className="text-3xl md:text-4xl font-[family-name:var(--font-arabic)] text-[#c4a962] font-medium" dir="rtl">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>

        {/* Animated Sound Wave */}
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

        {/* Controls */}
        <div className="flex items-center gap-6 pt-4">
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-[#c4a962] flex items-center justify-center text-[#1A2332] hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            {isPlaying ? <Pause fill="currentColor" /> : <Play className="ml-1" fill="currentColor" />}
          </button>

          <div className="flex-1 flex items-center gap-3">
            {isMuted || volume === 0 ? <VolumeX className="text-[#8899A6]" /> : <Volume2 className="text-[#8899A6]" />}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 accent-[#c4a962] bg-[#8899A6]/20 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <audio ref={audioRef} className="hidden" />

      <style jsx>{`
        @keyframes sound-wave {
          0%, 100% { height: 6px; }
          50% { height: 28px; }
        }
        .animate-sound-wave {
          animation: sound-wave 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
