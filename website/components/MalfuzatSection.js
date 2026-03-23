"use client";

import { useState } from "react";
import { BookOpen, X, Share2, Calendar } from "lucide-react";
import { PortableText } from "@portabletext/react";
import ScrollReveal from "./ScrollReveal";
import { formatBengaliDate } from "@/lib/bengali";

export default function MalfuzatSection({ malfuzat = [] }) {
  const [selectedMalfuzat, setSelectedMalfuzat] = useState(null);

  if (malfuzat.length === 0) return null;

  const handleShare = async (item) => {
    const shareData = {
      title: item.title,
      text: `পড়ুন: ${item.title} (মালফুজাত)`,
      url: `${window.location.origin}/malfuzat#article-${item._id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
        alert("লিঙ্ক কপি করা হয়েছে!");
      }
    } catch (err) {
      console.log("Error sharing", err);
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3 border-b border-[#e8dfce] pb-4">
        <div className="bg-[#f3eee1] p-2 rounded-lg">
          <BookOpen className="w-6 h-6 text-[#8c7435]" />
        </div>
        <h2 className="text-3xl font-bold text-[#1f4e3d]">মালফুজাত ও প্রবন্ধ</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {malfuzat.map((item, idx) => (
          <ScrollReveal key={item._id} className={`animation-delay-${(idx % 4) * 100}`}>
            <div 
              onClick={() => setSelectedMalfuzat(item)}
              className="bg-white p-6 rounded-2xl border border-[#e8dfce] shadow-sm hover:border-[#c4a962] hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-[#8c7435] bg-[#f3eee1] px-2.5 py-1 rounded-lg">
                  {item.date ? formatBengaliDate(item.date) : "প্রবন্ধ"}
                </span>
                <span className="text-[#c4a962] opacity-0 group-hover:opacity-100 transition-opacity">
                  বিস্তারিত পড়ুন →
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1f4e3d] group-hover:text-[#c4a962] transition-colors line-clamp-2 md:line-clamp-3 leading-snug">
                {item.title}
              </h3>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Modal / Popup Box */}
      {selectedMalfuzat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#1f4e3d]/40 backdrop-blur-sm"
            onClick={() => setSelectedMalfuzat(null)}
          ></div>
          
          {/* Content Box */}
          <div className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-[2.5rem] shadow-2xl border border-[#e8dfce] overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-5 duration-500">
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-[#e8dfce] flex justify-between items-start bg-[#fcfaf7]">
              <div className="flex-1 pr-6">
                <div className="flex items-center gap-2 text-[#8c7435] mb-2 font-bold text-sm">
                  <Calendar className="w-4 h-4" />
                  {selectedMalfuzat.date ? formatBengaliDate(selectedMalfuzat.date) : "মালফুজাত"}
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#1f4e3d] leading-tight">
                  {selectedMalfuzat.title}
                </h2>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleShare(selectedMalfuzat)}
                  className="p-3 bg-white rounded-2xl border border-[#e8dfce] text-[#8c7435] hover:bg-[#1f4e3d] hover:text-white transition-all shadow-sm"
                  title="শেয়ার করুন"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSelectedMalfuzat(null)}
                  className="p-3 bg-white rounded-2xl border border-[#e8dfce] text-[#1f4e3d] hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
                  title="বন্ধ করুন"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 md:p-10 overflow-y-auto rich-text-container">
              <div className="prose prose-lg prose-stone max-w-none text-[#2c3e30] leading-loose font-medium">
                <PortableText 
                  value={selectedMalfuzat.content} 
                  components={{
                    block: {
                      normal: ({children}) => <p className="mb-6 last:mb-0">{children}</p>,
                      h1: ({children}) => <h1 className="text-3xl font-bold mb-6 text-[#1f4e3d]">{children}</h1>,
                      h2: ({children}) => <h2 className="text-2xl font-bold mb-4 text-[#1f4e3d]">{children}</h2>,
                    },
                    marks: {
                      strong: ({children}) => <strong className="font-extrabold text-[#1f4e3d]">{children}</strong>,
                    }
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#fcfaf7] border-t border-[#e8dfce] text-center">
              <p className="text-sm text-[#708474] font-medium italic">
                খানকায়ে ইয়াদগারে হাকিমুল উম্মত — তাজকিয়াহ ও আত্মশুদ্ধি
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .rich-text-container p {
          white-space: pre-wrap;
          line-height: 2;
        }
      `}</style>
    </section>
  );
}
