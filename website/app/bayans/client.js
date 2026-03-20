"use client";

import { useState, useMemo } from "react";
import { formatBengaliMonth, toBengaliNumerals } from "@/lib/bengali";
import BayanCard from "@/components/BayanCard";
import AudioPlayer from "@/components/AudioPlayer";

// We'll pass the bayans as initial data from a Server Component wrapped around this,
// but Since the user wants to group, filter, and search interactively, we need a Client Component.

export default function BayansClient({ initialBayans }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentBayan, setCurrentBayan] = useState(null);

  const filteredBayans = useMemo(() => {
    return initialBayans.filter(bayan => {
      const matchSearch = bayan.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = activeCategory === "All" || bayan.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [initialBayans, searchTerm, activeCategory]);

  const groupedBayans = useMemo(() => {
    const groups = {};
    filteredBayans.forEach(bayan => {
      // Formats to "মার্চ ২০২৫"
      const monthStr = formatBengaliMonth(bayan.date);
      if (!groups[monthStr]) {
        groups[monthStr] = [];
      }
      groups[monthStr].push(bayan);
    });
    return groups;
  }, [filteredBayans]);

  const totalCount = toBengaliNumerals(initialBayans.length);
  const showingCount = toBengaliNumerals(filteredBayans.length);

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-10 items-start">
      <div className="w-full lg:w-2/3 space-y-8">
        
        {/* Header Section */}
        <div className="bg-[#1f4e3d] text-[#fcfaf7] p-10 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#3a735b] rounded-full opacity-20 blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c4a962] rounded-full opacity-10 blur-3xl -ml-20 -mb-20"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 relative z-10 drop-shadow-sm">সকল বয়ান</h1>
          <p className="text-[#d4c398] font-medium text-lg md:text-xl relative z-10 tracking-wide">মোট {totalCount}টি বয়ান সংরক্ষিত আছে</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-5 justify-between items-center bg-white p-5 rounded-[2rem] shadow-sm border border-[#e8dfce]">
          <input 
            type="text" 
            placeholder="বয়ান খুঁজুন..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 px-5 py-3.5 border border-[#e8dfce] bg-[#fcfaf7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4a962] focus:border-transparent font-medium text-[#2c3e30] transition-shadow"
          />
          <div className="flex gap-2 text-sm font-bold bg-[#fcfaf7] p-1.5 rounded-2xl border border-[#e8dfce]">
            <button 
              onClick={() => setActiveCategory("All")}
              className={`px-5 py-2.5 rounded-xl transition-all ${activeCategory === "All" ? "bg-[#1f4e3d] text-white shadow-md transform scale-105" : "bg-transparent text-[#708474] hover:bg-[#e8dfce]"}`}
            >
              সকল
            </button>
            <button 
              onClick={() => setActiveCategory("General")}
              className={`px-5 py-2.5 rounded-xl transition-all ${activeCategory === "General" ? "bg-[#1f4e3d] text-white shadow-md transform scale-105" : "bg-transparent text-[#708474] hover:bg-[#e8dfce]"}`}
            >
              সাধারণ
            </button>
            <button 
              onClick={() => setActiveCategory("Tazkiyah")}
              className={`px-5 py-2.5 rounded-xl transition-all ${activeCategory === "Tazkiyah" ? "bg-[#1f4e3d] text-white shadow-md transform scale-105" : "bg-transparent text-[#708474] hover:bg-[#e8dfce]"}`}
            >
              তাযকিয়াহ
            </button>
          </div>
        </div>

        <p className="text-[#a0843c] font-bold px-2 tracking-wide">
          {totalCount}টির মধ্যে {showingCount}টি দেখাচ্ছে
        </p>

        {/* Bayans List */}
        <div className="space-y-10">
          {Object.keys(groupedBayans).length > 0 ? (
            Object.keys(groupedBayans).map(month => (
              <div key={month} className="space-y-5">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1f4e3d] border-b border-[#e8dfce] pb-3 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#c4a962] rounded-full inline-block"></span>
                  {month}
                </h2>
                <div className="grid gap-4">
                  {groupedBayans[month].map(bayan => (
                     <BayanCard key={bayan._id} bayan={bayan} onPlay={setCurrentBayan} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-[#e8dfce] shadow-sm">
              <div className="w-20 h-20 mx-auto bg-[#fcfaf7] rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">📿</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-[#1f4e3d] mb-3">কোনো বয়ান পাওয়া যায়নি</p>
              <p className="text-[#708474] font-medium text-lg">অন্য কীওয়ার্ড বা বিভাগ দিয়ে চেষ্টা করুন</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Sticky Audio Player */}
      <div className="w-full lg:w-1/3 sticky top-32">
        <AudioPlayer currentBayan={currentBayan} />
      </div>
    </div>
  );
}
