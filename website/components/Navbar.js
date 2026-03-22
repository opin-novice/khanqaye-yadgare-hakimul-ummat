'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";

export default function Navbar() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkLive = async () => {
      try {
        const response = await fetch('/api/live-status');
        const data = await response.json();
        setIsLive(!!data?.isLive);
      } catch (e) {
        console.error("Navbar live fetch error", e);
      }
    };
    checkLive();
    const interval = setInterval(checkLive, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-[#fcfaf7] border-b border-[#e8dfce] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between h-auto py-4 items-center gap-5">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-md border-2 border-[#c4a962] group-hover:border-[#1f4e3d] transition-colors flex-shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="খানকায়ে ইয়াদগারে হাকিমুল উম্মত"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl md:text-3xl text-[#1f4e3d] leading-tight tracking-tight">শায়খের বয়ান</span>
                <span className="text-xs text-[#8c7435] font-medium tracking-wide uppercase mt-0.5">তাজকিয়াহ ও আত্মশুদ্ধি</span>
              </div>
            </Link>
          </div>
          
          {/* Nav Links */}
          <div className="flex items-center gap-1 font-bold bg-white p-1.5 rounded-2xl shadow-sm border border-[#e8dfce] flex-wrap justify-center">
            <Link href="/" className="text-[#4a5d4e] hover:text-[#1f4e3d] hover:bg-[#f3eee1] transition-colors text-sm md:text-base px-4 py-2 rounded-xl">
              হোম
            </Link>
            <Link href="/bayans" className="text-[#4a5d4e] hover:text-[#1f4e3d] hover:bg-[#f3eee1] transition-colors text-sm md:text-base px-4 py-2 rounded-xl">
              সকল বয়ান
            </Link>
            <Link href="/fatwas" className="text-[#4a5d4e] hover:text-[#1f4e3d] hover:bg-[#f3eee1] transition-colors text-sm md:text-base px-4 py-2 rounded-xl">
              ফতোয়া
            </Link>
            <Link href="/kitab" className="text-[#4a5d4e] hover:text-[#1f4e3d] hover:bg-[#f3eee1] transition-colors text-sm md:text-base px-4 py-2 rounded-xl">
              কিতাব
            </Link>
            <Link href="/live" className="relative flex items-center gap-2 text-[#4a5d4e] hover:text-[#1f4e3d] hover:bg-[#f3eee1] transition-colors text-sm md:text-base px-4 py-2 rounded-xl">
              {isLive && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
              সরাসরি বয়ান
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
