import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between h-auto py-4 md:py-3 items-center gap-4">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-xl shadow-sm">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-emerald-800 leading-tight">শায়খের বয়ান</span>
                <span className="text-xs text-emerald-600 font-medium tracking-wide">প্রতিদিনের বয়ান ও আধ্যাত্মিক শিক্ষা</span>
              </div>
            </Link>
          </div>
          <div className="text-center font-bengali w-full md:w-auto mt-2 md:mt-0 px-2 flex-grow">
            <p className="text-base md:text-lg font-bold font-[family-name:var(--font-arabic)] text-emerald-800 dir-rtl hidden md:block" dir="rtl">
              الشيخ المفتي محسن الكريم، المفتي الرئيسي بـ "جامعة إسلامية يونسية" ببرهمن بريا، وخليفة شيخ الحديث مولانا شاه عبد المتين بن حسين (دامت بركاتهم).
            </p>
            <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed mt-1 font-medium hidden md:block">
              শাহ মুফতি মুহসিনুল করিম সাহেব,প্রধান মুফতি,জামিয়া ইসলামিয়া ইউনুছিয়া মাদ্রাসা,ব্রাহ্মণবাড়িয়া ও খলীফায়ে শাইখুল হাদীস মাওলানা শাহ আব্দুল মতীন বিন হুসাইন সাহেব (দাঃবাঃ)
            </p>
          </div>
          <div className="flex items-center gap-6 mt-2 md:mt-0 font-bold">
            <Link href="/" className="text-gray-600 hover:text-emerald-600 transition-colors text-lg px-2 py-1 rounded-lg hover:bg-emerald-50">
              হোম
            </Link>
            <Link href="/bayans" className="text-gray-600 hover:text-emerald-600 transition-colors text-lg px-2 py-1 rounded-lg hover:bg-emerald-50">
              সকল বয়ান
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
