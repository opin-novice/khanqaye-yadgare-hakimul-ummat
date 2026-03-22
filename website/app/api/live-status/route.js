import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const data = await client.fetch(
      `*[_type == "siteSettings"] | order(_updatedAt desc)[0] { isLive, livePlaybackUrl }`
    );
    return NextResponse.json(data || { isLive: false });
  } catch (error) {
    console.error("API Live Status Error:", error);
    return NextResponse.json({ isLive: false, error: error.message }, { status: 500 });
  }
}
