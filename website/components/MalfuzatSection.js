"use client";

import { useState } from "react";
import { BookOpen, X, Share2, Calendar } from "lucide-react";
import { PortableText } from "@portabletext/react";
import ScrollReveal from "./ScrollReveal";
import { formatBengaliDate } from "@/lib/bengali";
import Link from "next/link";

export default function MalfuzatSection({ malfuzat = [] }) {
  if (malfuzat.length === 0) return null;

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
            <Link 
              href={`/malfuzat/${item.slug?.current || item._id}`}
              className="bg-white p-6 rounded-2xl border border-[#e8dfce] shadow-sm hover:border-[#c4a962] hover:shadow-md transition-all cursor-pointer group flex flex-col h-full block"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-[#8c7435] bg-[#f3eee1] px-2.5 py-1 rounded-lg">
                  {item.date ? formatBengaliDate(item.date) : "প্রবন্ধ"}
                </span>
                <span className="text-[#c4a962] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-sm font-bold">
                  বিস্তারিত পড়ুন →
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1f4e3d] group-hover:text-[#c4a962] transition-colors line-clamp-2 md:line-clamp-3 leading-snug">
                {item.title}
              </h3>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
