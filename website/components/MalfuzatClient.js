"use client";

import { useState, useMemo } from "react";
import { BookOpen, Search } from "lucide-react";
import MalfuzatSection from "./MalfuzatSection";
import ScrollReveal from "./ScrollReveal";

export default function MalfuzatClient({ initialMalfuzat }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMalfuzat = useMemo(() => {
    return initialMalfuzat.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [initialMalfuzat, searchTerm]);

  return (
    <div className="max-w-4xl mx-auto w-full space-y-8">
      {/* Header Section */}
      <ScrollReveal>
        <div className="bg-[#1f4e3d] text-[#fcfaf7] p-10 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#3a735b] rounded-full opacity-20 blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c4a962] rounded-full opacity-10 blur-3xl -ml-20 -mb-20"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 relative z-10 drop-shadow-sm">মালফুজাত ও প্রবন্ধ</h1>
          <p className="text-[#d4c398] font-medium text-lg md:text-xl relative z-10 tracking-wide">পড়ুন আত্মশুদ্ধি ও আধ্যাত্মিক উন্নতির পাথেয়</p>
        </div>
      </ScrollReveal>

      {/* Search */}
      <ScrollReveal className="animation-delay-100">
        <div className="flex bg-white p-2 rounded-[2rem] shadow-sm border border-[#e8dfce]">
          <div className="flex items-center pl-5 text-[#a0843c]">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="প্রবন্ধ খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3.5 bg-transparent focus:outline-none font-medium text-[#2c3e30]"
          />
        </div>
      </ScrollReveal>

      {/* Content */}
      <div className="animate-fade-up">
        <MalfuzatSection malfuzat={filteredMalfuzat} />
      </div>

      {filteredMalfuzat.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-[#e8dfce] shadow-sm">
          <p className="text-2xl font-bold text-[#1f4e3d]">কোনো প্রবন্ধ পাওয়া যায়নি</p>
        </div>
      )}
    </div>
  );
}
