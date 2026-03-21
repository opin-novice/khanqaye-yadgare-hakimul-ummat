/**
 * Normalizes Archive.org links to ensure they are stable and accessible.
 * Replaces temporary cluster/caching subdomains (like dn710409.ca.archive.org)
 * with the standard, stable archive.org/download/ format.
 */
export function normalizeArchiveUrl(url) {
  if (!url) return "";
  
  // If it's already a stable download link, return it
  if (url.includes("archive.org/download/")) return url;

  // Handle temporary cluster links: https://dnXXXXXX.ca.archive.org/X/items/ITEM_ID/FILE_NAME
  const archiveMatch = url.match(/archive\.org\/\d+\/items\/([^/]+)\/(.+)$/);
  if (archiveMatch) {
    const itemId = archiveMatch[1];
    const fileName = archiveMatch[2];
    return `https://archive.org/download/${itemId}/${fileName}`;
  }

  return url;
}
