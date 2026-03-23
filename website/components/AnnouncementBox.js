"use client";

import { Megaphone, X } from "lucide-react";
import { useState } from "react";

export default function AnnouncementBox({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!message || !isVisible) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 animate-fade-up">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1f4e3d] to-[#2d6b53] rounded-3xl shadow-2xl border border-[#3a735b] p-6 md:p-8">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#c4a962] opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-[#fcfaf7] opacity-5 blur-2xl rounded-full"></div>
        
        <div className="relative z-10 flex items-start gap-5 md:gap-7">
          <div className="bg-[#c4a962] p-4 rounded-2xl shadow-inner shadow-[#b09650] flex-shrink-0">
            <Megaphone className="w-7 h-7 text-[#1f4e3d]" />
          </div>
          
          <div className="flex-1 space-y-2">
            <h3 className="text-[#d4c398] font-bold text-lg md:text-xl tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 bg-[#d4c398] rounded-full animate-pulse"></span>
              বিশেষ ঘোষণা
            </h3>
            <p className="text-[#fcfaf7] text-xl md:text-2xl font-bold leading-relaxed drop-shadow-sm">
              {message}
            </p>
          </div>

          <button 
            onClick={() => setIsVisible(false)}
            className="text-[#b8d0c0] hover:text-[#fcfaf7] transition-colors p-1"
            aria-label="ঘোষণাটি বন্ধ করুন"
            title="বন্ধ করুন"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
