export const join = (...parts: Array<string | number | null | undefined>) =>
  "/" +
  parts
    .filter((p) => p !== null && p !== undefined)
    .map((p) => String(p).replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");

export const q = (
  params?: Record<string, string | number | boolean | null | undefined>
) => {
  if (!params) return "";
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === null || v === undefined) continue;
    sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
};
