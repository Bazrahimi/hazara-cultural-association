// app/lib/sanitize.ts
export function sanitizeHtml(input: string): string {
  if (!input) return "";

  // Remove script/style/iframe/object/embed/link/meta blocks
  // Note: use [\s\S]*? instead of dotAll + 's' flag
  let sanitized = input.replace(
    /<(script|style|iframe|object|embed|link|meta)[^>]*>[\s\S]*?<\/\1>/gi,
    ""
  );

  // Remove self-closing variants of the above (e.g., <link ... />, <meta ... />)
  sanitized = sanitized.replace(/<(link|meta|object|embed)[^>]*\/?>/gi, "");

  // Remove inline event handlers like onclick="..." or onerror='...'
  sanitized = sanitized.replace(/\s+on\w+="[^"]*"/gi, "");
  sanitized = sanitized.replace(/\s+on\w+='[^']*'/gi, "");

  // Strip javascript: and data: javascript payloads in href/src
  sanitized = sanitized.replace(
    /\s(href|src)\s*=\s*(['"])\s*javascript:[^'"]*\2/gi,
    ""
  );

  // (Optional) allow only http(s)/mailto/tel for href/src
  // sanitized = sanitized.replace(/\s(href|src)\s*=\s*(['"])(?!https?:|mailto:|tel:)[^'"]*\2/gi, "");

  return sanitized.trim();
}
