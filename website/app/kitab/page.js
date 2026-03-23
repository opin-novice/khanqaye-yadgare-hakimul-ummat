import { client, urlFor } from "@/lib/sanity";
import { Download, BookOpen, Eye } from "lucide-react";
import Image from "next/image";
import { getDriveViewUrl, getDriveDownloadUrl } from "@/lib/drive";

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
            তরজুমানে আকাবির আরেফবিল্লাহ হযরত মাওলানা মুফতি মুহসিনুল করিম সাহেব (দাঃবাঃ) এর নির্দেশিত কিতাবসমূহ এখান থেকে পড়ুন এবং ডাউনলোড করুন।
          </p>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {kitabs.length > 0 ? (
          kitabs.map((kitab) => (
            <div
              key={kitab._id}
              className="bg-white border border-[#e8dfce] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#c4a962] transition-all flex flex-col group"
            >
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
                  {/* Read */}
                  <a
                    href={getDriveViewUrl(kitab.pdfUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#f3eee1] text-[#1f4e3d] font-bold px-4 py-3 rounded-xl hover:bg-[#e8dfce] transition-all shadow-sm text-sm md:text-base border border-[#e8dfce]"
                  >
                    <Eye className="w-4 h-4" />
                    পড়ুন
                  </a>

                  {/* Download */}
                  <a
                    href={getDriveDownloadUrl(kitab.pdfUrl)}
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
          ))
        ) : (
          <div className="col-span-full text-center py-24 bg-white rounded-[2.5rem] border border-[#e8dfce] shadow-sm">
            <BookOpen className="w-20 h-20 mx-auto text-[#c4a962] mb-6 opacity-30" />
            <p className="text-3xl font-bold text-[#1f4e3d] mb-4">কোনো কিতাব পাওয়া যায়নি</p>
            <p className="text-[#708474] font-medium text-xl">শিগগিরই নতুন কিতাব যুক্ত করা হবে ইনশাআল্লাহ।</p>
          </div>
        )}
      </div>
    </div>
  );
}
