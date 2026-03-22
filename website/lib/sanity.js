import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  // Hardcoded as fallback to ensure the website is always connected to the right project
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0e1b5dx8",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-21",
  useCdn: false, // Set to false to get fresh data immediately (important for LIVE)
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
