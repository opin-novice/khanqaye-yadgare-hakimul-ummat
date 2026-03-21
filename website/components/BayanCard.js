"use client";

import { useState } from "react";
import { formatBengaliDate } from "@/lib/bengali";
import { Calendar, Download } from "lucide-react";

export default function BayanCard({ bayan }) {
  const [playing, setPlaying] = useState(false);

  const bdCategory = bayan.category || "";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#e8dfce] hover:border-[#c4a962] hover:shadow-md transition-all overflow-hidden">
      {/* Top Row: info + action buttons */}
      <div className="flex justify-between items-center p-5 gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg md:text-xl text-[#1f4e3d] leading-snug">
            {bayan.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-[#708474] mt-2 flex-wrap">
            {bdCategory && (
              <span className="bg-[#f3eee1] text-[#8c7435] font-bold px-3 py-1 rounded-lg text-xs tracking-wide">
                {bdCategory}
              </span>
            )}
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#a0843c]" />
              {formatBengaliDate(bayan.date)}
            </span>
          </div>
        </div>

        {bayan.audioUrl && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Download button — using proxy for Archive.org files to force download */}
            <a
              href={`/api/download?url=${encodeURIComponent(bayan.audioUrl)}`}
              download
              title="ডাউনলোড করুন"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f3eee1] text-[#8c7435] border border-[#e8dfce] hover:bg-[#c4a962] hover:text-white hover:border-[#c4a962] transition-all"
            >
              <Download className="w-4 h-4" />
            </a>

            {/* Play / Pause button */}
            <button
              onClick={() => setPlaying(!playing)}
              title={playing ? "বন্ধ করুন" : "শুনুন"}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border
                ${playing
                  ? "bg-[#1f4e3d] text-[#fcfaf7] border-[#1f4e3d] scale-105"
                  : "bg-[#f3eee1] text-[#1f4e3d] border-[#e8dfce] hover:bg-[#1f4e3d] hover:text-[#fcfaf7] hover:border-[#1f4e3d]"}`}
            >
              {playing ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Inline Audio Player */}
      {playing && bayan.audioUrl && (
        <div className="border-t border-[#e8dfce] bg-[#fcfaf7] px-5 py-4">
          <audio
            controls
            autoPlay
            className="w-full h-10 accent-[#1f4e3d]"
            src={bayan.audioUrl}
          />
        </div>
      )}
    </div>
  );
}
