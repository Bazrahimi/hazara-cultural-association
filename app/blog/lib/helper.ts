export const extractTitleFromSlug = (param?: string | null): string => {
  if (!param) return "Post";

  try {
    const title = decodeURIComponent(param).replace(/-/g, " ").trim();

    return title || "Post";
  } catch {
    return "Post";
  }
};

export function truncateTitle(text: string, maxChar = 4) {
  if (text.length <= maxChar) {
    return text.trim().replace(/-/g, " ");
  }

  return (
    text
      .slice(0, maxChar)

      .replace(/-/g, " ") + "..."
  );
}
