import { client } from "@/lib/sanity";
import { BookOpen } from "lucide-react";
import KitabClient from "@/components/KitabClient";

export const revalidate = 60;

export default async function KitabPage() {
  let kitabs = [];
  try {
    // Sorted from Oldest to Newest (New additions appear at the end)
    kitabs = await client.fetch(`*[_type == "kitab"] | order(_createdAt asc) { _id, title, cover, pdfUrl }`);
  } catch (e) {
    console.error("Sanity fetch failed", e);
  }

  return (
    <div className="max-w-6xl mx-auto w-full space-y-12 pb-12">
      {/* Header */}
      <div className="bg-[#1f4e3d] text-[#fcfaf7] p-10 md:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c4a962] rounded-full opacity-10 blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3a735b] rounded-full opacity-20 blur-3xl -ml-20 -mb-20"></div>
        
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold flex items-center justify-center gap-4">
            <BookOpen className="w-10 h-10 md:w-14 md:h-14 text-[#c4a962]" />
            কিতাব সমূহ
          </h1>
          <p className="text-[#b8d0c0] font-medium text-lg md:text-2xl max-w-2xl mx-auto">
            তরজুমানে আকাবির আরেফবিল্লাহ হযরত মাওলানা শাহ মুফতি মুহসিনুল করিম সাহেব (দাঃবাঃ) এর নির্দেশিত কিতাবসমূহ এখান থেকে পড়ুন এবং ডাউনলোড করুন।
          </p>
        </div>
      </div>

      {/* Main Content (Client Component) */}
      {kitabs.length > 0 ? (
        <KitabClient initialKitabs={kitabs} />
      ) : (
        <div className="col-span-full text-center py-24 bg-white rounded-[2.5rem] border border-[#e8dfce] shadow-sm">
          <BookOpen className="w-20 h-20 mx-auto text-[#c4a962] mb-6 opacity-30" />
          <p className="text-3xl font-bold text-[#1f4e3d] mb-4">কোনো কিতাব পাওয়া যায়নি</p>
          <p className="text-[#708474] font-medium text-xl">শিগগিরই নতুন কিতাব যুক্ত করা হবে ইনশাআল্লাহ।</p>
        </div>
      )}
    </div>
  );
}
