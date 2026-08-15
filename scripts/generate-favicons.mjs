// Generates the day/night cat favicons as crisp 32x32 pixel-art PNGs.
// Run: node scripts/generate-favicons.mjs
import zlib from "node:zlib";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PUBLIC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");

// ---------------------------------------------------------------------------
// Sprites ('#' = cat, 'e' = eye, 'z' = zzz, '.' = background)
// ---------------------------------------------------------------------------

// Bold silhouette — big triangle ears, round head, simple body, instant read.
const DAY = [
  ".#.....#.",
  ".##...##.",
  ".###.###.",
  ".#######.",
  ".#ee#ee#.",
  ".#######.",
  ".#######.",
  "..#####..",
  "..#####..",
];

// Sleeping loaf with z's — simplified, same bold approach.
const NIGHT = [
  "..........zz",
  "...........z",
  "..........z.",
  "....######..",
  "..########..",
  ".##########.",
  ".##########.",
  "..########..",
];

// ---------------------------------------------------------------------------
// Minimal PNG encoder (RGBA, no dependencies)
// ---------------------------------------------------------------------------

function crc32(buf) {
  if (!crc32.table) {
    crc32.table = Array.from({ length: 256 }, (_, n) => {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      return c >>> 0;
    });
  }
  let c = 0xffffffff;
  for (const byte of buf) c = crc32.table[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, "ascii");
  data.copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
}

function encodePng(size, pixels) {
  const raw = Buffer.alloc(size * (1 + size * 4));
  for (let y = 0; y < size; y++) {
    const row = y * (1 + size * 4);
    raw[row] = 0; // filter: none
    for (let x = 0; x < size; x++) {
      const [r, g, b] = pixels[y][x];
      const i = row + 1 + x * 4;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
      raw[i + 3] = 255;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ---------------------------------------------------------------------------
// Compose and write
// ---------------------------------------------------------------------------

const SIZE = 32;

function render(map, { bg, fg, eye, zzz, scale, ox, oy }) {
  const pixels = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => bg),
  );
  map.forEach((row, my) => {
    [...row].forEach((ch, mx) => {
      if (ch === ".") return;
      const color = ch === "e" ? eye : ch === "z" ? zzz : fg;
      for (let dy = 0; dy < scale; dy++) {
        for (let dx = 0; dx < scale; dx++) {
          const x = ox + mx * scale + dx;
          const y = oy + my * scale + dy;
          if (x >= 0 && x < SIZE && y >= 0 && y < SIZE) pixels[y][x] = color;
        }
      }
    });
  });
  return encodePng(SIZE, pixels);
}

const WHITE = [255, 255, 255];
const INK = [17, 17, 17];
const NIGHT_BG = [22, 20, 18]; // #161412
const CREAM = [237, 234, 230]; // #EDEAE6
const MUTED = [150, 144, 135];

fs.writeFileSync(
  path.join(PUBLIC, "favicon-day.png"),
  render(DAY, { bg: WHITE, fg: INK, eye: WHITE, zzz: MUTED, scale: 2, ox: 3, oy: 3 }),
);
fs.writeFileSync(
  path.join(PUBLIC, "favicon-night.png"),
  render(NIGHT, { bg: NIGHT_BG, fg: CREAM, eye: NIGHT_BG, zzz: MUTED, scale: 2, ox: 0, oy: 0 }),
);

console.log("Wrote favicon-day.png and favicon-night.png");
