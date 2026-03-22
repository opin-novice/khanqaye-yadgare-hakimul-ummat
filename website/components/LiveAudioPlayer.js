'use client';

import { useState, useEffect, useRef } from 'react';
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
    let isDestroyed = false;

    // Safety timeout
    const timeout = setTimeout(() => {
      if (!isDestroyed) setLoading(false);
    }, 10000);

    const initPlayer = async () => {
      try {
        // Dynamically import HLS.js to avoid crashing if it's missing or in environments that don't support it
        const { default: Hls } = await import('hls.js').catch(e => {
          console.error("Failed to load hls.js module", e);
          return { default: null };
        });

        if (isDestroyed) return;

        if (Hls && Hls.isSupported()) {
          console.log("HLS.js is supported, initializing...");
          hlsInstance = new Hls({ 
            lowLatencyMode: true,
            manifestLoadingMaxRetry: 4
          });
          hlsRef.current = hlsInstance;
          hlsInstance.loadSource(playbackUrl);
          hlsInstance.attachMedia(audioRef.current);
          
          hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
            if (isDestroyed) return;
            clearTimeout(timeout);
            setLoading(false);
            audioRef.current.play().catch(() => {});
            setIsPlaying(true);
          });

          hlsInstance.on(Hls.Events.ERROR, (_, data) => {
            if (data.fatal) {
              console.error("HLS fatal error:", data.details);
              if (!isDestroyed) {
                setError(true);
                setLoading(false);
              }
            }
          });
        } else if (audioRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          console.log("Using Native HLS support (Safari)");
          audioRef.current.src = playbackUrl;
          audioRef.current.addEventListener('loadedmetadata', () => {
            if (isDestroyed) return;
            clearTimeout(timeout);
            setLoading(false);
            audioRef.current.play().catch(() => {});
            setIsPlaying(true);
          });
        } else {
          console.warn("No HLS support found");
          setLoading(false);
          setError(true);
        }
      } catch (err) {
        console.error("Player initialization failed", err);
        setLoading(false);
        setError(true);
      }
    };

    initPlayer();

    return () => {
      isDestroyed = true;
      clearTimeout(timeout);
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [playbackUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
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
    if (audioRef.current) audioRef.current.volume = val;
    setIsMuted(val === 0);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#1A2332] rounded-3xl border border-[#c4a962]/20">
        <div className="w-10 h-10 border-4 border-[#c4a962]/20 border-t-[#c4a962] rounded-full animate-spin mb-4"></div>
        <p className="text-[#F0F4F8] font-medium">সংযোগ স্থাপনের চেষ্টা করা হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-[#1A2332] rounded-3xl border border-red-500/30 text-center">
        <p className="text-red-400 mb-4 font-bold italic">অডিও প্লেয়ারটি লোড করা সম্ভব হয়নি</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-[#c4a962] text-[#1f4e3d] px-6 py-2 rounded-xl font-bold"
        >
          আবার চেষ্টা করুন
        </button>
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
          بِسْمِ اللهِ الرَّحْمٰনِ الرَّحِيْمِ
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
