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
    <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-2/3 space-y-6">
        <div className="bg-emerald-600 text-white p-8 rounded-[2rem] shadow-sm">
          <h1 className="text-4xl font-bold mb-3">সকল বয়ান</h1>
          <p className="text-emerald-100 font-medium">মোট {totalCount}টি বয়ান</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <input 
            type="text" 
            placeholder="বয়ান খুঁজুন..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />
          <div className="flex gap-2 text-sm font-bold">
            <button 
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-xl transition-colors ${activeCategory === "All" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              সকল
            </button>
            <button 
              onClick={() => setActiveCategory("General")}
              className={`px-4 py-2 rounded-xl transition-colors ${activeCategory === "General" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              সাধারণ
            </button>
            <button 
              onClick={() => setActiveCategory("Tazkiyah")}
              className={`px-4 py-2 rounded-xl transition-colors ${activeCategory === "Tazkiyah" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              তাযকিয়াহ
            </button>
          </div>
        </div>

        <p className="text-gray-500 font-medium px-2">
          {totalCount}টির মধ্যে {showingCount}টি দেখাচ্ছে
        </p>

        <div className="space-y-8">
          {Object.keys(groupedBayans).length > 0 ? (
            Object.keys(groupedBayans).map(month => (
              <div key={month} className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">{month}</h2>
                <div className="grid gap-3">
                  {groupedBayans[month].map(bayan => (
                     <BayanCard key={bayan._id} bayan={bayan} onPlay={setCurrentBayan} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-[2rem] border border-gray-100">
              <p className="text-2xl font-bold text-gray-700 mb-2">কোনো বয়ান পাওয়া যায়নি</p>
              <p className="text-gray-500 font-medium">অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="w-full md:w-1/3 sticky top-24">
        <AudioPlayer currentBayan={currentBayan} />
      </div>
    </div>
  );
}
