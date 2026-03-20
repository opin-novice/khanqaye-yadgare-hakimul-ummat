import { client } from "@/lib/sanity";
import Link from "next/link";
import { Headphones, HelpCircle, Calendar, ArrowRight } from "lucide-react";

export const revalidate = 60; // revalidate every minute if webhook isn't instant

export default async function Home() {
  const bayans = await client.fetch(`*[_type == "bayan"] | order(date desc)[0...5]`);
  const fatwas = await client.fetch(`*[_type == "fatwa"] | order(date desc)[0...5]`);

  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-emerald-50 rounded-3xl border border-emerald-100">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
          শাইখের আলোচনা ও ফতোয়া
        </h1>
        <p className="text-lg text-emerald-700 max-w-2xl mx-auto px-4">
          শাইখের সর্বশেষ তালিম, হাদিসের দরস এবং ফতোয়ার উত্তর সমূহ শুনুন এবং পড়ুন।
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Latest Bayans Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Headphones className="text-emerald-600" />
              সর্বশেষ বয়ান
            </h2>
            <Link href="/bayans" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
              সব দেখুন <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {bayans.length > 0 ? (
              bayans.map((bayan) => (
                <div key={bayan._id} className="group p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-emerald-800 transition-colors">
                        {bayan.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                        <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                          {bayan.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {bayan.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  {bayan.audioFile && (
                    <div className="mt-4">
                      {/* Note: In a real app we fetch audio URL from sanity, assuming reference */}
                      <p className="text-sm text-emerald-600">অডিও যুক্ত আছে</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">কোনো বয়ান পাওয়া যায়নি।</p>
            )}
          </div>
        </section>

        {/* Latest Fatwas Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <HelpCircle className="text-emerald-600" />
              সর্বশেষ ফতোয়া
            </h2>
            <Link href="/fatwas" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
              সব দেখুন <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {fatwas.length > 0 ? (
              fatwas.map((fatwa) => (
                <div key={fatwa._id} className="group p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-emerald-800 transition-colors">
                    {fatwa.question}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                      {fatwa.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {fatwa.date}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">কোনো ফতোয়া পাওয়া যায়নি।</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
