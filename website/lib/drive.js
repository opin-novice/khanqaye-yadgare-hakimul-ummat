export function extractDriveId(driveUrl) {
  if (!driveUrl) return null;
  // Match the long string between /d/ and /view (or other end delimiters)
  const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export function getDriveViewUrl(driveUrl) {
  const id = extractDriveId(driveUrl);
  if (!id) return driveUrl; // Fallback to original if ID extraction fails
  return `https://drive.google.com/file/d/${id}/view`;
}

export function getDriveDownloadUrl(driveUrl) {
  const id = extractDriveId(driveUrl);
  if (!id) return driveUrl; // Fallback to original if ID extraction fails
  return `https://drive.google.com/uc?export=download&id=${id}`;
}
