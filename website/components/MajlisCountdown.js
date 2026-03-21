"use client";

import { useState, useEffect } from "react";

export default function MajlisCountdown({ nextMajlis }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, days: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!nextMajlis?.datetime) return;

    const target = new Date(nextMajlis.datetime).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setExpired(true);
        return;
      }

      setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [nextMajlis]);

  function pad(n) { return String(n).padStart(2, "0"); }

  if (!nextMajlis?.datetime) return null;

  return (
    <section className="bg-[#1f4e3d] text-[#fcfaf7] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#c4a962] rounded-full opacity-10 blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3a735b] rounded-full opacity-20 blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

      <div className="relative z-10 text-center">
        <p className="text-[#d4c398] font-bold uppercase tracking-widest text-sm md:text-base mb-4">
          পরবর্তী মজলিস
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight">
          {nextMajlis.title || "পরবর্তী মজলিস"}
        </h2>

        {expired ? (
          <p className="text-2xl font-bold text-[#c4a962]">মজলিস শুরু হয়েছে! আল্লাহ কবুল করুন।</p>
        ) : (
          <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
            {timeLeft.days > 0 && (
              <div className="flex flex-col items-center bg-[#fcfaf7] bg-opacity-10 rounded-2xl px-6 py-5 min-w-[80px]">
                <span className="text-4xl md:text-6xl font-black text-[#c4a962] tabular-nums">{pad(timeLeft.days)}</span>
                <span className="text-xs md:text-sm font-bold text-[#b8d0c0] mt-2 uppercase tracking-wider">দিন</span>
              </div>
            )}
            <div className="flex flex-col items-center bg-[#fcfaf7] bg-opacity-10 rounded-2xl px-6 py-5 min-w-[80px]">
              <span className="text-4xl md:text-6xl font-black text-[#c4a962] tabular-nums">{pad(timeLeft.hours)}</span>
              <span className="text-xs md:text-sm font-bold text-[#b8d0c0] mt-2 uppercase tracking-wider">ঘণ্টা</span>
            </div>
            <div className="flex flex-col items-center bg-[#fcfaf7] bg-opacity-10 rounded-2xl px-6 py-5 min-w-[80px]">
              <span className="text-4xl md:text-6xl font-black text-[#c4a962] tabular-nums">{pad(timeLeft.minutes)}</span>
              <span className="text-xs md:text-sm font-bold text-[#b8d0c0] mt-2 uppercase tracking-wider">মিনিট</span>
            </div>
            <div className="flex flex-col items-center bg-[#fcfaf7] bg-opacity-10 rounded-2xl px-6 py-5 min-w-[80px]">
              <span className="text-4xl md:text-6xl font-black text-[#fcfaf7] tabular-nums">{pad(timeLeft.seconds)}</span>
              <span className="text-xs md:text-sm font-bold text-[#b8d0c0] mt-2 uppercase tracking-wider">সেকেন্ড</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
