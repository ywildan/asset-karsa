import { hexToRgb } from "./util";

export type Swatch = { key: string; hex: string; role?: string };
export type SwatchGroup = { id: string; title: string; desc: string; items: Swatch[] };

export const kotlinName = (key: string) => key[0].toUpperCase() + key.slice(1).replace("-", "");

export const PALETTE: SwatchGroup[] = [
  {
    id: "surface",
    title: "Permukaan",
    desc: "Latar kertas hangat pengganti putih murni.",
    items: [
      { key: "paper", hex: "#FBF5EC", role: "background / surface" },
      { key: "paper2", hex: "#F5ECE0", role: "surfaceVariant · input" },
      { key: "paper3", hex: "#EBDFCD", role: "handle · skeleton" },
      { key: "line", hex: "#EBE0D1", role: "outline · border" },
    ],
  },
  {
    id: "ink",
    title: "Tinta & Espresso",
    desc: "Teks dan permukaan gelap bernuansa kopi.",
    items: [
      { key: "ink", hex: "#26180F", role: "teks utama" },
      { key: "ink2", hex: "#5A483B", role: "teks sekunder" },
      { key: "muted", hex: "#8B7B6D", role: "teks redup" },
      { key: "espresso", hex: "#2A1A10", role: "secondary · Dock · scrim" },
      { key: "espresso2", hex: "#3B261A", role: "espresso terang" },
    ],
  },
  {
    id: "brand",
    title: "Brand (oranye)",
    desc: "Rampa sembilan tingkat; Brand500 adalah warna primer.",
    items: [
      { key: "brand-50", hex: "#FFF5EC" },
      { key: "brand-100", hex: "#FFE6D0", role: "primaryContainer" },
      { key: "brand-200", hex: "#FFCB9C", role: "glow menu" },
      { key: "brand-300", hex: "#FFA762", role: "aksen di atas gelap" },
      { key: "brand-400", hex: "#F88A2E", role: "fokus input" },
      { key: "brand-500", hex: "#E36B0F", role: "primary" },
      { key: "brand-600", hex: "#C75A08", role: "teks brand" },
      { key: "brand-700", hex: "#8F4208", role: "onPrimaryContainer" },
      { key: "brand-800", hex: "#5F2C06", role: "kutipan artikel" },
    ],
  },
  {
    id: "support",
    title: "Pendukung",
    desc: "Status dan nada avatar: mentega, daun, bahaya, laut, plum.",
    items: [
      { key: "butter-100", hex: "#FDF0C4" },
      { key: "butter-400", hex: "#F7C948" },
      { key: "butter-700", hex: "#7A5A00" },
      { key: "leaf-100", hex: "#DCF2E4" },
      { key: "leaf-500", hex: "#1F7A4D", role: "sukses" },
      { key: "leaf-600", hex: "#17623D" },
      { key: "danger-100", hex: "#FBE2DF", role: "errorContainer" },
      { key: "danger-500", hex: "#C1352B", role: "error" },
      { key: "tide-100", hex: "#DCEBF4" },
      { key: "tide-600", hex: "#2A6385" },
      { key: "plum-100", hex: "#F1DCEB" },
      { key: "plum-600", hex: "#7A3E6B" },
    ],
  },
];

export const ALL_SWATCHES: Swatch[] = PALETTE.flatMap((g) => g.items);
export const hexOf = (key: string) => ALL_SWATCHES.find((c) => c.key === key)?.hex ?? "#000000";

export type ColorFormat = "hex" | "rgb" | "css" | "tw" | "kt";
export const FORMAT_LABEL: Record<ColorFormat, string> = {
  hex: "HEX",
  rgb: "RGB",
  css: "CSS var",
  tw: "Tailwind",
  kt: "Compose",
};
export const formatColor = (c: Swatch, f: ColorFormat) => {
  const [r, g, b] = hexToRgb(c.hex);
  switch (f) {
    case "hex":
      return c.hex;
    case "rgb":
      return `rgb(${r}, ${g}, ${b})`;
    case "css":
      return `var(--color-${c.key})`;
    case "tw":
      return `bg-${c.key}`;
    case "kt":
      return `KarsaColors.${kotlinName(c.key)}`;
  }
};

/* ───────── Tipografi ───────── */
export type TypeStyle = {
  label: string;
  use: string;
  family: "display" | "sans";
  size: number;
  weight: number;
  lh: number;
  tr?: number;
  sample: string;
};
export const TYPE_SCALE: TypeStyle[] = [
  { label: "Display 40", use: "Judul splash · nama aplikasi", family: "display", size: 40, weight: 800, lh: 1, tr: -0.02, sample: "SiKarsa" },
  { label: "Display 34", use: "PageHeader tiap tab", family: "display", size: 34, weight: 800, lh: 1.02, tr: -0.02, sample: "Grup kelas" },
  { label: "Display 20", use: "Judul kartu · TopBar", family: "display", size: 20, weight: 700, lh: 1.25, sample: "Normalisasi tanpa pusing" },
  { label: "Display 18", use: "SectionTitle", family: "display", size: 18, weight: 700, lh: 1.3, sample: "Per mata kuliah" },
  { label: "Sans 16 / 700", use: "Judul baris daftar", family: "sans", size: 16, weight: 700, lh: 1.25, sample: "Basis Data Lanjut" },
  { label: "Sans 15 / 400", use: "Isi teks & input", family: "sans", size: 15, weight: 400, lh: 1.5, sample: "Gunakan akun kampus berakhiran @students.untidar.ac.id" },
  { label: "Sans 13 / 600", use: "Label & tombol kecil", family: "sans", size: 13, weight: 600, lh: 1.2, sample: "Mata kuliah" },
  { label: "Sans 12 / 400", use: "Teks redup · meta", family: "sans", size: 12, weight: 400, lh: 1.4, sample: "SI-4B · PJ Dimas Aryo · 38 anggota" },
  { label: "Eyebrow 11 / 700", use: "Kicker huruf kapital, tracking 0.16em", family: "sans", size: 11, weight: 700, lh: 1.4, tr: 0.16, sample: "PERPUSTAKAAN PRODI" },
];

/* ───────── Radius & bayangan ───────── */
export const RADII = [
  { name: "Field", dp: 16, use: "Input · tombol Md" },
  { name: "Button Lg", dp: 20, use: "Tombol besar" },
  { name: "Pop", dp: 24, use: "Menu pop-up" },
  { name: "Card", dp: 28, use: "Kartu & blok" },
  { name: "Sheet", dp: 32, use: "Bottom sheet" },
  { name: "Pill", dp: 9999, use: "Chip · Dock · tombol Sm" },
];
export const SHADOWS = [
  { name: "cardShadow", css: "0 8px 20px -6px rgba(42,26,16,.2), 0 1px 3px rgba(42,26,16,.06)", cls: "sh-card", use: "Kartu" },
  { name: "popShadow", css: "0 22px 40px -10px rgba(42,26,16,.5), 0 4px 12px rgba(42,26,16,.16)", cls: "sh-pop", use: "Dock, menu, sheet" },
  { name: "brandShadow", css: "0 10px 22px -6px rgba(227,107,15,.62), 0 2px 6px rgba(227,107,15,.3)", cls: "sh-brand", use: "Tombol primer" },
  { name: "glow", css: "0 0 0 1px rgba(255,203,156,.2), 0 3px 18px 6px rgba(255,203,156,.35)", cls: "sh-glow", use: "Pendar menu" },
];

/* ───────── Generator ekspor token ───────── */
export type ExportKind = "css" | "tailwind" | "kotlin" | "json";

export function buildExport(kind: ExportKind): { code: string; file: string; mime: string } {
  const groups = PALETTE;
  if (kind === "css") {
    const lines = groups.flatMap((g) => [`  /* ${g.title} */`, ...g.items.map((c) => `  --color-${c.key}: ${c.hex.toLowerCase()};`), ""]);
    const code = `:root {
  --font-display: "Bricolage Grotesque", system-ui, sans-serif;
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;

${lines.join("\n").trimEnd()}

  --radius-field: 16px;
  --radius-button-lg: 20px;
  --radius-pop: 24px;
  --radius-card: 28px;
  --radius-sheet: 32px;

  --shadow-card: ${SHADOWS[0].css};
  --shadow-pop: ${SHADOWS[1].css};
  --shadow-brand: ${SHADOWS[2].css};
}
`;
    return { code, file: "karsa-tokens.css", mime: "text/css" };
  }
  if (kind === "tailwind") {
    const lines = groups.flatMap((g) => [`  /* ${g.title} */`, ...g.items.map((c) => `  --color-${c.key}: ${c.hex.toLowerCase()};`), ""]);
    const code = `@import "tailwindcss";

@theme {
  --font-display: "Bricolage Grotesque", system-ui, sans-serif;
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;

${lines.join("\n").trimEnd()}

  --radius-field: 16px;
  --radius-card: 28px;
  --radius-sheet: 32px;
}
`;
    return { code, file: "karsa-theme.css", mime: "text/css" };
  }
  if (kind === "kotlin") {
    const lines = groups.flatMap((g) => [
      `    // ${g.title}`,
      ...g.items.map((c) => `    val ${kotlinName(c.key)} = Color(0xFF${c.hex.slice(1).toUpperCase()})`),
      "",
    ]);
    const code = `package id.sikarsa.theme

import androidx.compose.ui.graphics.Color

object KarsaColors {
${lines.join("\n").trimEnd()}
}
`;
    return { code, file: "KarsaColors.kt", mime: "text/plain" };
  }
  const obj: Record<string, unknown> = {
    name: "Karsa Design Tokens",
    fonts: { display: "Bricolage Grotesque", sans: "Plus Jakarta Sans" },
    color: Object.fromEntries(groups.map((g) => [g.id, Object.fromEntries(g.items.map((c) => [c.key, { value: c.hex, ...(c.role ? { description: c.role } : {}) }]))])),
    radius: Object.fromEntries(RADII.map((r) => [r.name, { value: r.dp }])),
    shadow: Object.fromEntries(SHADOWS.map((x) => [x.name, { value: x.css }])),
    typography: Object.fromEntries(TYPE_SCALE.map((t) => [t.label, { family: t.family, size: t.size, weight: t.weight, lineHeight: t.lh }])),
  };
  return { code: JSON.stringify(obj, null, 2) + "\n", file: "karsa-tokens.json", mime: "application/json" };
}
