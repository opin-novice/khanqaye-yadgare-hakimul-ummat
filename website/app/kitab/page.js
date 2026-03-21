import { client } from "@/lib/sanity";
import { Download, BookOpen, Eye } from "lucide-react";
import { getDriveViewUrl, getDriveDownloadUrl } from "@/lib/drive";

export const revalidate = 60;

export default async function KitabPage() {
  let kitabs = [];
  try {
    kitabs = await client.fetch(`*[_type == "kitab"] | order(_createdAt desc) { _id, title, pdfUrl }`);
  } catch (e) {
    console.error("Sanity fetch failed", e);
  }

  return (
    <div className="max-w-4xl mx-auto w-full space-y-12">
      {/* Header */}
      <div className="bg-[#1f4e3d] text-[#fcfaf7] p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#c4a962] rounded-full opacity-10 blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3a735b] rounded-full opacity-20 blur-3xl -mr-20 -mb-20"></div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center gap-4 relative z-10">
          <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-[#c4a962]" />
          কিতাব সমূহ
        </h1>
        <p className="text-[#b8d0c0] font-medium text-lg md:text-xl relative z-10">
          গুরুত্বপূর্ণ ইসলামিক কিতাব ডাউনলোড করুন
        </p>
      </div>

      {/* Book List */}
      <div className="grid gap-4">
        {kitabs.length > 0 ? (
          kitabs.map((kitab) => (
            <div
              key={kitab._id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-[#e8dfce] rounded-2xl p-5 md:p-6 shadow-sm hover:border-[#c4a962] hover:shadow-md transition-all gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f3eee1] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1f4e3d] transition-colors">
                  <BookOpen className="w-6 h-6 text-[#1f4e3d] group-hover:text-[#fcfaf7] transition-colors" />
                </div>
                <h2 className="font-bold text-lg md:text-xl text-[#1f4e3d] leading-snug">
                  {kitab.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Preview / Read Button */}
                <a
                  href={getDriveViewUrl(kitab.pdfUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#f3eee1] text-[#1f4e3d] font-bold px-5 py-2.5 rounded-xl hover:bg-[#e8dfce] transition-all shadow-sm text-sm"
                >
                  <Eye className="w-4 h-4" />
                  পড়ুন
                </a>

                {/* Download Button */}
                <a
                  href={getDriveDownloadUrl(kitab.pdfUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#1f4e3d] text-[#fcfaf7] font-bold px-5 py-2.5 rounded-xl hover:bg-[#c4a962] hover:text-[#1f4e3d] transition-all shadow-sm text-sm"
                >
                  <Download className="w-4 h-4" />
                  ডাউনলোড
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-[#e8dfce] shadow-sm">
            <BookOpen className="w-16 h-16 mx-auto text-[#c4a962] mb-6" />
            <p className="text-2xl md:text-3xl font-bold text-[#1f4e3d] mb-3">কোনো কিতাব পাওয়া যায়নি</p>
            <p className="text-[#708474] font-medium text-lg">শিগগিরই আপডেট করা হবে ইনশাআল্লাহ</p>
          </div>
        )}
      </div>
    </div>
  );
}
