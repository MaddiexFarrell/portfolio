function buildNoise(baseFrequency: number, size: number, octaves: number) {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='${octaves}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E`;
}

type GrainProps = {
  opacity?: number;
  /** Lower = coarser, chunkier grain. Default 0.85 (fine). */
  baseFrequency?: number;
  size?: number;
  octaves?: number;
  blend?: "overlay" | "soft-light" | "screen" | "normal";
};

export default function Grain({
  opacity = 0.14,
  baseFrequency = 0.85,
  size = 160,
  octaves = 4,
  blend = "overlay",
}: GrainProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        backgroundImage: `url("${buildNoise(baseFrequency, size, octaves)}")`,
        opacity,
        mixBlendMode: blend,
      }}
    />
  );
}
