"use client";

import { formatBengaliDate } from "@/lib/bengali";
import { Calendar } from "lucide-react";

export default function BayanCard({ bayan, onPlay }) {
  const categoryMap = {
    'General': 'সাধারণ',
    'Tazkiyah': 'তাযকিয়াহ'
  };
  const bdCategory = categoryMap[bayan.category] || bayan.category;
  
  return (
    <div 
      className="group p-5 bg-white rounded-2xl shadow-sm border border-[#e8dfce] hover:border-[#c4a962] hover:bg-[#fcfaf7] hover:shadow-md transition-all flex justify-between items-center cursor-pointer active:scale-[0.99]" 
      onClick={() => onPlay && onPlay(bayan)}
    >
      <div>
        <h3 className="font-bold text-lg md:text-xl text-[#1f4e3d] group-hover:text-[#a0843c] transition-colors leading-snug">
          {bayan.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-[#708474] mt-3">
          <span className="flex items-center gap-1 bg-[#f3eee1] text-[#8c7435] font-bold px-3 py-1.5 rounded-lg text-xs tracking-wide">
            {bdCategory}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#a0843c]" />
            {formatBengaliDate(bayan.date)}
          </span>
        </div>
      </div>
      {onPlay && (
        <div className="w-12 h-12 flex-shrink-0 ml-4 rounded-full bg-[#f3eee1] flex items-center justify-center text-[#1f4e3d] group-hover:bg-[#1f4e3d] group-hover:text-[#fcfaf7] transition-all duration-300 shadow-sm border border-[#e8dfce] group-hover:border-[#1f4e3d]">
          <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
      )}
    </div>
  );
}
