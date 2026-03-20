import { client } from "@/lib/sanity";
import { HelpCircle, Calendar } from "lucide-react";

export const revalidate = 60;

export default async function FatwasPage() {
  const query = `*[_type == "fatwa"] | order(date desc)`;
  const fatwas = await client.fetch(query);

  return (
    <div className="max-w-4xl mx-auto w-full space-y-8">
      <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <HelpCircle /> ফতোয়া সমূহ
        </h1>
        <p className="text-indigo-100">গুরুত্বপূর্ণ দ্বীনি জিজ্ঞাসার উত্তর</p>
      </div>

      <div className="space-y-6">
        {fatwas.length > 0 ? (
          fatwas.map((fatwa) => (
            <div key={fatwa._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-indigo-600 font-black mr-2">প্রশ্ন:</span>
                {fatwa.question}
              </h2>
              
              <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed mb-4 p-4">
                <span className="text-emerald-600 font-black mr-2">উত্তর:</span>
                {fatwa.answer}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 border-t pt-4 mt-2">
                <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-medium">
                  {fatwa.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {fatwa.date}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-500">
            কোনো ফতোয়া পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
