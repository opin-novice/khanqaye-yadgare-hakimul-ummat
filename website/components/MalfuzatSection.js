"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function MalfuzatSection({ malfuzat = [] }) {
  const [expandedId, setExpandedId] = useState(null);

  if (malfuzat.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3 border-b border-[#e8dfce] pb-4">
        <div className="bg-[#f3eee1] p-2 rounded-lg">
          <BookOpen className="w-6 h-6 text-[#8c7435]" />
        </div>
        <h2 className="text-3xl font-bold text-[#1f4e3d]">মালফুজাত (প্রবন্ধ)</h2>
      </div>

      <div className="grid gap-4">
        {malfuzat.map((item, idx) => {
          const isExpanded = expandedId === item._id;
          return (
            <ScrollReveal key={item._id} className={`animation-delay-${(idx % 3) * 100}`}>
              <div 
                className={`bg-white rounded-2xl border border-[#e8dfce] shadow-sm hover:shadow-md transition-all overflow-hidden ${isExpanded ? 'ring-2 ring-[#c4a962]/30 border-[#c4a962]' : 'hover:border-[#c4a962]'}`}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item._id)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 group"
                >
                  <h3 className={`text-xl font-bold transition-colors ${isExpanded ? 'text-[#c4a962]' : 'text-[#1f4e3d] group-hover:text-[#c4a962]'}`}>
                    {item.title}
                  </h3>
                  <div className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className={`w-6 h-6 ${isExpanded ? 'text-[#c4a962]' : 'text-[#a0843c]'}`} />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-8 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="prose prose-stone max-w-none text-lg leading-relaxed text-[#2c3e30]">
                      {/* Using a simple fallback for rich text if no portable text component is ready */}
                      {item.content?.map((block, bIdx) => (
                        <p key={bIdx} className="mb-4">
                          {block.children?.map(child => child.text).join('')}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
