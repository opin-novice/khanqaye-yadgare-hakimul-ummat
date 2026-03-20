import { client } from "@/lib/sanity";
import { Headphones, Calendar } from "lucide-react";

export const revalidate = 60;

export default async function BayansPage({ searchParams }) {
  const query = `*[_type == "bayan"]{
    _id,
    title,
    date,
    category,
    "audioUrl": audioFile.asset->url
  } | order(date desc)`;
  const bayans = await client.fetch(query);

  // In Next 13/14 App router, use client component for interactive search if needed,
  // but for simplicity, we do server-side rendering for now.

  return (
    <div className="max-w-4xl mx-auto w-full space-y-8">
      <div className="bg-emerald-600 text-white p-8 rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Headphones /> বয়ান সমূহ
        </h1>
        <p className="text-emerald-100">শাইখের সকল বয়ানের তালিকা</p>
      </div>

      <div className="space-y-4">
        {bayans.length > 0 ? (
          bayans.map((bayan) => (
            <div key={bayan._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{bayan.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md font-medium">
                  {bayan.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {bayan.date}
                </span>
              </div>
              
              {bayan.audioUrl && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">অডিও শুনুন:</p>
                  <audio controls className="w-full h-10">
                     <source src={bayan.audioUrl} type="audio/mpeg" />
                     আপনার ব্রাউজার অডিও সাপোর্ট করে না।
                  </audio>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-500">
            কোনো বয়ান পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
