import { client } from "@/lib/sanity";
import { HelpCircle, Calendar } from "lucide-react";
import { formatBengaliDate } from "@/lib/bengali";

export const revalidate = 60;

export default async function FatwasPage() {
  const query = `*[_type == "fatwa"] | order(date desc)`;
  let fatwas = [];
  try {
    fatwas = await client.fetch(query);
  } catch (e) {
    console.error("Sanity fetch failed", e);
  }

  return (
    <div className="max-w-4xl mx-auto w-full space-y-12">
      {/* Header */}
      <div className="bg-[#1f4e3d] text-[#fcfaf7] p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#c4a962] rounded-full opacity-10 blur-3xl -ml-20 -mt-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#3a735b] rounded-full opacity-30 blur-3xl -mr-20 -mb-20"></div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center gap-4 relative z-10 drop-shadow-md">
          <HelpCircle className="w-10 h-10 md:w-12 md:h-12 text-[#c4a962]" /> ফতোয়া সমূহ
        </h1>
        <p className="text-[#b8d0c0] font-medium text-lg md:text-xl relative z-10 tracking-wide">
          দৈনন্দিন জীবনের গুরুত্বপূর্ণ দ্বীনি জিজ্ঞাসার উত্তর
        </p>
      </div>

      {/* Fatwa List */}
      <div className="space-y-8">
        {fatwas.length > 0 ? (
          fatwas.map((fatwa) => (
            <div key={fatwa._id} className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-[#e8dfce] transition-all hover:border-[#c4a962] hover:shadow-xl group">
              <h2 className="text-xl md:text-2xl font-bold text-[#1f4e3d] mb-6 md:mb-8 bg-[#fcfaf7] p-6 md:p-8 rounded-3xl border border-[#e8dfce] leading-relaxed relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#c4a962] group-hover:bg-[#1f4e3d] transition-colors"></div>
                <span className="text-[#8c7435] font-black mr-3 text-sm md:text-base tracking-wider uppercase">প্রশ্ন:</span>
                <span className="block mt-2">{fatwa.question}</span>
              </h2>
              
              <div className="prose prose-lg md:prose-xl max-w-none text-[#4a5d4e] leading-loose mb-8 px-4 md:px-6">
                <span className="text-[#1f4e3d] font-black mr-3 text-sm md:text-base tracking-wider uppercase">উত্তর:</span>
                {fatwa.answer}
              </div>

              <div className="flex items-center gap-5 text-sm md:text-base text-[#708474] border-t border-[#e8dfce] pt-6 mt-8 px-4 md:px-6">
                <span className="bg-[#fcfaf7] border border-[#e8dfce] text-[#8c7435] px-4 py-2 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider">
                  {fatwa.category}
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#a0843c]" />
                  {formatBengaliDate(fatwa.date)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-[#e8dfce] shadow-sm">
             <div className="w-20 h-20 mx-auto bg-[#fcfaf7] rounded-full flex items-center justify-center mb-6">
               <HelpCircle className="w-10 h-10 text-[#c4a962]" />
             </div>
             <p className="text-2xl md:text-3xl font-bold text-[#1f4e3d] mb-3">কোনো ফতোয়া পাওয়া যায়নি</p>
             <p className="text-[#708474] font-medium text-lg">শিগগিরই আপডেট করা হবে ইনশাআল্লাহ</p>
          </div>
        )}
      </div>
    </div>
  );
}
