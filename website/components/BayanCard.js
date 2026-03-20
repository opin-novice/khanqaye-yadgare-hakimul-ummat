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
      className="group p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md transition-all flex justify-between items-center cursor-pointer active:scale-[0.99]" 
      onClick={() => onPlay && onPlay(bayan)}
    >
      <div>
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-800 transition-colors">
          {bayan.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
          <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 font-medium px-2 py-1 rounded-md text-xs">
            {bdCategory}
          </span>
          <span className="flex items-center gap-1 font-medium text-gray-500">
            <Calendar className="w-3 h-3 text-gray-400" />
            {formatBengaliDate(bayan.date)}
          </span>
        </div>
      </div>
      {onPlay && (
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
      )}
    </div>
  );
}
