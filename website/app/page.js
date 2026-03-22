import { client } from "@/lib/sanity";
import Link from "next/link";
import BayanCard from "@/components/BayanCard";
import MajlisCountdown from "@/components/MajlisCountdown";
import ScheduleAndMap from "@/components/ScheduleAndMap";
import ContactUs from "@/components/ContactUs";
import HomeCards from "@/components/HomeCards";

export const revalidate = 60;

const mockAudioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const fallbackBayans = [
  { _id: '1', title: "তাওবা ও ইস্তিগফারের গুরুত্ব",       date: "2025-03-15", category: "তাযকিয়াহ", audioUrl: mockAudioUrl },
  { _id: '2', title: "নামাজের হাকিকত ও আত্মিক উপকার",     date: "2025-03-10", category: "সাধারণ",    audioUrl: mockAudioUrl },
  { _id: '3', title: "কলবের পরিশুদ্ধি — প্রথম পর্ব",       date: "2025-02-28", category: "তাযকিয়াহ", audioUrl: mockAudioUrl },
  { _id: '4', title: "দুনিয়ার মোহ থেকে মুক্তির পথ",        date: "2025-02-20", category: "তাযকিয়াহ", audioUrl: mockAudioUrl },
  { _id: '5', title: "রমজানের প্রস্তুতি কীভাবে নেবেন",     date: "2025-02-10", category: "সাধারণ",    audioUrl: mockAudioUrl },
];

export default async function Home() {
  let bayans = [];
  let nextMajlis = null;
  let siteSettings = null;
  try {
    [bayans, nextMajlis, siteSettings] = await Promise.all([
      client.fetch(`*[_type == "bayan"]{ _id, title, date, category, audioUrl } | order(date desc)[0...5]`),
      client.fetch(`*[_type == "nextMajlis"][0]{ title, datetime }`),
      client.fetch(`*[_type == "siteSettings"][0]{ newsTicker }`),
    ]);
  } catch (e) {
    console.error("Sanity fetch failed", e);
  }

  const displayBayans = bayans.length > 0 ? bayans : fallbackBayans;
  const newsTicker = siteSettings?.newsTicker || "";

  return (
    <div className="space-y-12">
      {/* New Image Cards Section (Full-Width Carousel) */}
      <HomeCards newsTicker={newsTicker} />

      {/* Hero Section */}
      <section className="text-center py-20 md:py-28 bg-[#1f4e3d] rounded-[2.5rem] border border-[#163a2d] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#3a735b] opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#c4a962] opacity-10 blur-3xl"></div>

        <div className="relative z-10 px-4">
          <p className="text-xl md:text-2xl font-[family-name:var(--font-arabic)] text-[#d4c398] mb-6 font-medium tracking-wider" dir="rtl">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#fcfaf7] mb-6 leading-tight tracking-tight drop-shadow-sm">
            খানকায়ে ইয়াদগারে হাকিমুল উম্মত
          </h1>
          <p className="text-xl md:text-2xl text-[#b8d0c0] max-w-2xl mx-auto px-4 mb-12 font-medium leading-relaxed">
            তাজকিয়াহ ও আত্মশুদ্ধির এক আধ্যাত্মিক পরিবেশ<br/>
            <span className="text-lg opacity-80 mt-2 block">তরজুমানে আকাবির আরেফবিল্লাহ হযরত মাওলানা মুফতি মুহসিনুল করিম সাহেব (দাঃবাঃ)</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/bayans" className="bg-[#c4a962] hover:bg-[#b09650] text-[#1f4e3d] font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center w-full sm:w-auto">
              বয়ান শুনুন →
            </Link>
            <Link href="/fatwas" className="bg-transparent hover:bg-[#28634e] text-[#fcfaf7] border border-[#3a735b] font-bold text-lg px-8 py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center w-full sm:w-auto">
              ফতোয়া পড়ুন
            </Link>
          </div>
        </div>
      </section>

      {/* Majlis Countdown (only renders if admin has set a datetime in Sanity) */}
      {nextMajlis && <MajlisCountdown nextMajlis={nextMajlis} />}

      {/* Latest Bayans Section */}
      <section className="max-w-4xl mx-auto px-2">
        <div className="flex justify-between items-center mb-8 border-b border-[#e8dfce] pb-4">
          <h2 className="text-3xl font-bold text-[#1f4e3d]">সাম্প্রতিক বয়ান</h2>
          <Link href="/bayans" className="text-[#8c7435] hover:text-[#c4a962] font-bold flex items-center gap-1 transition-colors text-lg">
            সকল বয়ান দেখুন →
          </Link>
        </div>
        <div className="grid gap-4">
          {displayBayans.map((bayan) => (
            <BayanCard key={bayan._id} bayan={bayan} />
          ))}
        </div>
      </section>

      {/* Schedule and Map */}
      <section className="max-w-4xl mx-auto px-2">
        <ScheduleAndMap />
      </section>

      {/* Contact Us */}
      <section className="max-w-4xl mx-auto px-2">
        <ContactUs />
      </section>
    </div>
  );
}
