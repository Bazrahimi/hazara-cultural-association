// app/ui/TricolorRule.tsx
import clsx from "clsx";

type Props = {
  height?: number; // px height (default 4)
  rounded?: boolean; // rounded ends
  className?: string; // extra classes (e.g. mt-6)
  segments?: [number, number, number]; // relative sizes, defaults 1/1/1
  colors?: [string, string, string]; // hex/CSS color strings
  sheen?: boolean; // add vertical glossy sheen overlay
  feather?: number; // soften seams in % of width (e.g. 0.8)
};

const  TricolorRule = ({
  height = 6,
  rounded = true,
  className,
  segments = [1, 1, 1],
  colors = ["#facc15", "#e5e7eb", "#3b82f6"], // yellow-400, gray-200, blue-500
  sheen = true,
  feather = 0, // 0 = hard seams; try 0.6–1.2 for gentle blends
}: Props)  => {
  const total = segments[0] + segments[1] + segments[2];
  const s1 = (segments[0] / total) * 100; // first breakpoint
  const s2 = ((segments[0] + segments[1]) / total) * 100; // second breakpoint

  const clampP = (v: number) => Math.max(0, Math.min(100, v));
  const f = Math.max(0, feather);

  // For soft seams we’ll use a blended color via color-mix (modern browsers).
  // If not supported, the browser will just use the provided color token as-is.
  const mix12 = `color-mix(in oklab, ${colors[0]} 50%, ${colors[1]} 50%)`;
  const mix23 = `color-mix(in oklab, ${colors[1]} 50%, ${colors[2]} 50%)`;

  // Build the horizontal stripes gradient, with optional feathering at seams.
  const stripes = (() => {
    if (f <= 0) {
      // Hard edges
      return `linear-gradient(
        90deg,
        ${colors[0]} 0% ${s1}%,
        ${colors[1]} ${s1}% ${s2}%,
        ${colors[2]} ${s2}% 100%
      )`;
    }
    // Soft edges around s1 and s2 using a small blending band
    const a = clampP(s1 - f);
    const b = clampP(s1 + f);
    const c = clampP(s2 - f);
    const d = clampP(s2 + f);

    return `linear-gradient(
      90deg,
      ${colors[0]} 0% ${a}%,
      ${mix12} ${a}% ${b}%,
      ${colors[1]} ${b}% ${c}%,
      ${mix23} ${c}% ${d}%,
      ${colors[2]} ${d}% 100%
    )`;
  })();

  // A subtle vertical sheen to give a bit of depth (transparent overlay)
  const sheenOverlay = `linear-gradient(
    180deg,
    rgba(255,255,255,0.30) 0%,
    rgba(255,255,255,0.12) 45%,
    rgba(0,0,0,0.08) 100%
  )`;

  return (
    <div
      aria-hidden="true"
      className={clsx("w-full", rounded && "rounded-full", className)}
      style={{
        height,
        // Layer gradients: topmost first. Use transparent overlay for sheen.
        backgroundImage: sheen ? `${sheenOverlay}, ${stripes}` : stripes,
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "100% 100%, 100% 100%",
        backgroundPosition: "center, center",
      }}
    />
  );
}

export default TricolorRule