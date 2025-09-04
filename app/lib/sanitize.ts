export function sanitizeHtml(input: string): string {
  if (!input) return "";

  // Remove script/style/iframe and other potentially dangerous tags
  let sanitized = input.replace(
    /<(script|style|iframe|object|embed|link|meta)[^>]*>.*?<\/\1>/gis,
    ""
  );

  // Remove inline event handlers like onclick="..." or onerror="..."
  sanitized = sanitized.replace(/\s+on\w+="[^"]*"/gi, "");
  sanitized = sanitized.replace(/\s+on\w+='[^']*'/gi, "");

  // Remove javascript: URLs
  sanitized = sanitized.replace(/javascript:[^'"]*/gi, "");

  return sanitized.trim();
}
