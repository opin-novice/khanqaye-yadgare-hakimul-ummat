"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, BookOpen, Eye, X, ExternalLink } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { getDriveViewUrl, getDriveDownloadUrl } from "@/lib/drive";
import ScrollReveal from "./ScrollReveal";

export default function KitabClient({ initialKitabs }) {
  const [activePdfUrl, setActivePdfUrl] = useState(null);
  const [activeTitle, setActiveTitle] = useState("");

  const handleRead = (kitab) => {
    if (kitab.pdfUrl.startsWith('/') || kitab.pdfUrl.includes('archive.org')) {
      setActivePdfUrl(kitab.pdfUrl);
      setActiveTitle(kitab.title);
    } else if (kitab.pdfUrl.includes('drive.google.com')) {
      window.open(getDriveViewUrl(kitab.pdfUrl), '_blank');
    } else {
      window.open(kitab.pdfUrl, '_blank');
    }
  };

  const getDownloadHref = (pdfUrl) => {
    if (pdfUrl.startsWith('/')) return pdfUrl;
    if (pdfUrl.includes('drive.google.com')) return getDriveDownloadUrl(pdfUrl);
    return pdfUrl;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
      {initialKitabs.map((kitab, idx) => (
        <ScrollReveal key={kitab._id} className={`animation-delay-${(idx % 3) * 100}`}>
          <div className="bg-white border border-[#e8dfce] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#c4a962] transition-all flex flex-col group h-full">
            {/* Card Top: Book Cover */}
            <div className="relative aspect-[3/4] w-full bg-[#f3eee1] overflow-hidden">
              {kitab.cover ? (
                <Image
                  src={urlFor(kitab.cover).width(600).url()}
                  alt={kitab.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#c4a962] p-8 text-center opacity-40">
                  <BookOpen className="w-20 h-20 mb-4" />
                  <span className="font-bold">প্রচ্ছদ যুক্ত নেই</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Card Bottom: Info & Buttons */}
            <div className="p-6 flex flex-col flex-grow bg-white">
              <h2 className="font-bold text-xl md:text-2xl text-[#1f4e3d] leading-tight mb-6 text-center line-clamp-2 h-14">
                {kitab.title}
              </h2>

              <div className="flex gap-3 mt-auto">
                {/* Read Button */}
                <button
                  onClick={() => handleRead(kitab)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#f3eee1] text-[#1f4e3d] font-bold px-4 py-3 rounded-xl hover:bg-[#e8dfce] transition-all shadow-sm text-sm md:text-base border border-[#e8dfce]"
                >
                  <Eye className="w-4 h-4" />
                  পড়ুন
                </button>

                {/* Download Button */}
                <a
                  href={encodeURI(getDownloadHref(kitab.pdfUrl))}
                  download={kitab.pdfUrl.startsWith('/') ? `${kitab.title}.pdf` : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1f4e3d] text-[#fcfaf7] font-bold px-4 py-3 rounded-xl hover:bg-[#c4a962] hover:text-[#1f4e3d] transition-all shadow-sm text-sm md:text-base"
                >
                  <Download className="w-4 h-4" />
                  ডাউনলোড
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}

      {/* Full-screen PDF Modal */}
      {activePdfUrl && (
        <div className="fixed inset-0 z-[1001] flex flex-col bg-black/95 animate-in fade-in duration-300">
          {/* Modal Header */}
          <div className="bg-[#1f4e3d] text-white p-4 md:px-8 flex items-center justify-between border-b border-white/10">
            <h2 className="font-bold text-lg md:text-xl truncate pr-4">{activeTitle}</h2>
            <div className="flex items-center gap-3">
              <a 
                href={activePdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-[#c4a962] text-[#1f4e3d] px-4 py-2 rounded-xl font-bold text-sm hover:brightness-110 transition-all"
              >
                <ExternalLink className="w-4 h-4" /> পূর্ণ স্ক্রিনে দেখুন
              </a>
              <button 
                onClick={() => setActivePdfUrl(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title="বন্ধ করুন"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* Modal Body: PDF Viewer */}
          <div className="flex-1 w-full bg-[#525659]">
            <iframe
              src={`${encodeURI(activePdfUrl)}#toolbar=0`}
              className="w-full h-full border-none"
              title={activeTitle}
            />
          </div>
          
          {/* Mobile Footer Button */}
          <div className="sm:hidden p-4 bg-[#1f4e3d]/80 border-t border-white/10 text-center">
            <a 
              href={activePdfUrl} 
              target="_blank" 
              className="inline-block bg-[#c4a962] text-[#1f4e3d] px-8 py-3 rounded-2xl font-bold"
            >
              পিডিএফ ডাউনলোড / পূর্ণ স্ক্রিন
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
