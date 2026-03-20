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
    <div className="max-w-4xl mx-auto w-full space-y-8">
      <div className="bg-indigo-600 text-white p-8 rounded-[2rem] shadow-sm">
        <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
          <HelpCircle className="w-8 h-8" /> ফতোয়া সমূহ
        </h1>
        <p className="text-indigo-100 font-medium">গুরুত্বপূর্ণ দ্বীনি জিজ্ঞাসার উত্তর</p>
      </div>

      <div className="space-y-6">
        {fatwas.length > 0 ? (
          fatwas.map((fatwa) => (
            <div key={fatwa._id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 transition-all hover:border-indigo-200 hover:shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4 bg-gray-50 p-5 rounded-2xl border border-gray-100 leading-relaxed">
                <span className="text-indigo-600 font-black mr-2">প্রশ্ন:</span>
                {fatwa.question}
              </h2>
              
              <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed mb-4 px-2">
                <span className="text-emerald-600 font-black mr-2">উত্তর:</span>
                {fatwa.answer}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 border-t pt-5 mt-4 px-2">
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wide">
                  {fatwa.category}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {formatBengaliDate(fatwa.date)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-[2rem] border border-gray-100">
             <p className="text-2xl font-bold text-gray-700 mb-2">কোনো ফতোয়া পাওয়া যায়নি</p>
          </div>
        )}
      </div>
    </div>
  );
}
