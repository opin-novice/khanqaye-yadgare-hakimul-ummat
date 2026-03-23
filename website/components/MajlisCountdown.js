"use client";

import { useState, useEffect } from "react";

export default function MajlisCountdown({ nextMajlis }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!nextMajlis?.datetime) return;

    const ONE_HOUR = 60 * 60 * 1000;
    const DAY = 24 * 60 * 60 * 1000;

    const tick = () => {
      let target = new Date(nextMajlis.datetime).getTime();
      const now = Date.now();

      // Auto-recurrence logic: If more than 1 hour has passed since target, jump 24 hours forward
      while (now > target + ONE_HOUR) {
        target += DAY;
      }

      const diff = target - now;

      // Show "Started" message for exactly 1 hour window
      if (now >= target && now <= target + ONE_HOUR) {
        setExpired(true);
      } else {
        setExpired(false);
        setTimeLeft({
          days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [nextMajlis]);

  if (!nextMajlis?.datetime || !mounted) return null;

  function pad(n) { return String(n).padStart(2, "0"); }

  const units = [
    ...(timeLeft.days > 0 ? [{ val: timeLeft.days, label: "দিন" }] : []),
    { val: timeLeft.hours,   label: "ঘণ্টা"  },
    { val: timeLeft.minutes, label: "মিনিট"  },
    { val: timeLeft.seconds, label: "সেকেন্ড" },
  ];

  return (
    <section className="bg-[#1f4e3d] text-[#fcfaf7] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#c4a962] rounded-full opacity-10 blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3a735b] rounded-full opacity-20 blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight">
          {nextMajlis.title || "পরবর্তী মজলিস"}
        </h2>

        {expired ? (
          <p className="text-2xl font-bold text-[#c4a962]">মজলিস শুরু হয়েছে! আল্লাহ কবুল করুন।</p>
        ) : (
          <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
            {units.map(({ val, label }) => (
              <div key={label} className="flex flex-col items-center bg-white bg-opacity-10 rounded-2xl px-6 py-5 min-w-[80px]">
                <span className="text-4xl md:text-6xl font-black text-[#c4a962] tabular-nums">{pad(val)}</span>
                <span className="text-xs md:text-sm font-bold text-[#b8d0c0] mt-2 tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
