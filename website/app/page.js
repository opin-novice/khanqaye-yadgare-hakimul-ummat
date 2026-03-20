import { client } from "@/lib/sanity";
import Link from "next/link";
import BayanCard from "@/components/BayanCard";

export const revalidate = 60;

const fallbackBayans = [
  { _id: '1', title: "তাওবা ও ইস্তিগফারের গুরুত্ব",       date: "2025-03-15", category: "Tazkiyah" },
  { _id: '2', title: "নামাজের হাকিকত ও আত্মিক উপকার",     date: "2025-03-10", category: "General"  },
  { _id: '3', title: "কলবের পরিশুদ্ধি — প্রথম পর্ব",       date: "2025-02-28", category: "Tazkiyah" },
  { _id: '4', title: "দুনিয়ার মোহ থেকে মুক্তির পথ",        date: "2025-02-20", category: "Tazkiyah" },
  { _id: '5', title: "রমজানের প্রস্তুতি কীভাবে নেবেন",     date: "2025-02-10", category: "General"  },
  { _id: '6', title: "সবর ও শোকরের ফযিলত",                 date: "2025-01-25", category: "General"  },
  { _id: '7', title: "আল্লাহর সাথে সম্পর্ক গড়ার উপায়",    date: "2025-01-15", category: "Tazkiyah" },
  { _id: '8', title: "হালাল রিযিক ও বরকতের রহস্য",         date: "2025-01-05", category: "General"  }
];

export default async function Home() {
  let bayans = [];
  try {
    bayans = await client.fetch(`*[_type == "bayan"]{
      _id, title, date, category, "audioUrl": audioFile.asset->url
    } | order(date desc)[0...5]`);
  } catch (e) {
    console.error("Sanity fetch failed", e);
  }

  const displayBayans = bayans.length > 0 ? bayans : fallbackBayans.slice(0, 5);

  return (
    <div className="space-y-12">
      <section className="text-center py-16 bg-emerald-50 rounded-[2rem] border border-emerald-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-emerald-100 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-emerald-200 opacity-50 blur-3xl"></div>
        <div className="relative z-10">
          <p className="text-xl md:text-2xl font-[family-name:var(--font-arabic)] text-emerald-800 mb-6 font-bold" dir="rtl">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
            শায়খের বয়ান
          </h1>
          <p className="text-xl text-emerald-700 max-w-2xl mx-auto px-4 mb-10 font-medium">
            প্রতিদিনের বয়ান ও আধ্যাত্মিক শিক্ষা
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/bayans" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95">
              বয়ান শুনুন →
            </Link>
            <Link href="/fatwas" className="bg-white hover:bg-gray-50 text-emerald-700 border border-emerald-200 font-bold text-lg px-8 py-3 rounded-full shadow-sm hover:shadow transition-all active:scale-95">
              সব দেখুন →
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-800">
            সাম্প্রতিক বয়ান
          </h2>
          <Link href="/bayans" className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 transition-colors">
            সকল বয়ান দেখুন →
          </Link>
        </div>
        <div className="grid gap-4">
          {displayBayans.map((bayan) => (
            <Link href="/bayans" key={bayan._id}>
              <BayanCard bayan={bayan} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
