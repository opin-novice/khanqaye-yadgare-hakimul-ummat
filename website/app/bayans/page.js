import { client } from "@/lib/sanity";
import BayansClient from "./client";

export const revalidate = 60;

const fallbackBayans = [
  { _id: '1', title: "তাওবা ও ইস্তিগফারের গুরুত্ব",       date: "2025-03-15", category: "Tazkiyah" },
  { _id: '2', title: "নামাজের হাকিকত ও আত্মিক উপকার",     date: "2025-03-10", category: "General"  },
  { _id: '3', title: "কলবের পরিশুদ্ধি — প্রথম পর্ব",       date: "2025-02-28", category: "Tazkiyah" },
  { _id: '4', title: "দুনিয়ার মোহ থেকে মুক্তির পথ",        date: "2025-02-20", category: "Tazkiyah" },
  { _id: '5', title: "রমজানের প্রস্তুতি কীভাবে নেবেন",     date: "2025-02-10", category: "General"  },
  { _id: '6', title: "সবর ও শোকরের ফযিলত",                 date: "2025-01-25", category: "General"  },
  { _id: '7', title: "আল্লাহর সাথে সম্পর্ক গড়ার উপায়",    date: "2025-01-15", category: "Tazkiyah" },
  { _id: '8', title: "হালাল রিযিক ও বরকতের রহস্য",         date: "2025-01-05", category: "General"  }
];

export default async function BayansPage() {
  let bayans = [];
  try {
    const query = `*[_type == "bayan"]{
      _id,
      title,
      date,
      category,
      "audioUrl": audioFile.asset->url
    } | order(date desc)`;
    bayans = await client.fetch(query);
  } catch (e) {
    console.error("Sanity fetch failed", e);
  }

  const initialBayans = bayans.length > 0 ? bayans : fallbackBayans;

  return (
    <div className="w-full">
      <BayansClient initialBayans={initialBayans} />
    </div>
  );
}
