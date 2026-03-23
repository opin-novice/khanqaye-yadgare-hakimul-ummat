import { client } from "@/lib/sanity";
import MalfuzatClient from "@/components/MalfuzatClient";

export const revalidate = 60;

export default async function MalfuzatPage() {
  let malfuzat = [];
  try {
    malfuzat = await client.fetch(`*[_type == "malfuzat"] | order(date desc)`);
  } catch (e) {
    console.error("Malfuzat fetch failed", e);
  }

  return (
    <div className="flex flex-col gap-8">
      <MalfuzatClient initialMalfuzat={malfuzat} />
    </div>
  );
}
