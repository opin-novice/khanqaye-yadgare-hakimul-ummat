// API route: /api/download?url=https://archive.org/...
// Proxies the file server-side so the browser gets a real download prompt.

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Missing url parameter", { status: 400 });
  }

  // Only allow archive.org and soundhelix for safety
  try {
    const parsed = new URL(url);
    const allowed = ["archive.org", "soundhelix.com"];
    const isAllowed = allowed.some((domain) => parsed.hostname.endsWith(domain));
    if (!isAllowed) {
      return new Response("URL not allowed", { status: 403 });
    }
  } catch {
    return new Response("Invalid URL", { status: 400 });
  }

  try {
    const upstream = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!upstream.ok) {
      return new Response("Failed to fetch file", { status: 502 });
    }

    const contentType = upstream.headers.get("content-type") || "audio/mpeg";
    // Try to extract filename from URL
    const filename = url.split("/").pop()?.split("?")[0] || "bayan.mp3";

    return new Response(upstream.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return new Response("Download failed", { status: 500 });
  }
}
