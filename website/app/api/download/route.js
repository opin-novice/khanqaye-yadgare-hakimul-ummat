// Specialized downloader for Archive.org Audio Files
// This ensures that clicking the download icon starting a real download instead of just playing in a new tab.

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Missing url parameter", { status: 400 });
  }

  // Security: Only allow archive.org for the audio proxy
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith("archive.org") && !parsed.hostname.endsWith("soundhelix.com")) {
      return new Response("Domain not allowed for proxy", { status: 403 });
    }
  } catch {
    return new Response("Invalid URL", { status: 400 });
  }

  try {
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!response.ok) return new Response("Failed to fetch audio", { status: 502 });

    const filename = url.split("/").pop()?.split("?")[0] || "bayan.mp3";

    return new Response(response.body, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return new Response("Download failed", { status: 500 });
  }
}
