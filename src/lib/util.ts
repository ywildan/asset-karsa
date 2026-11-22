import type { CSSProperties } from "react";

export const cn = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");

/* Tipografi: displayStyle() / sansStyle() di theme/Type.kt */
export const d = (size: number, weight = 800, lh = 1.2, tr = 0): CSSProperties => ({
  fontFamily: "var(--font-display)",
  fontSize: size,
  fontWeight: weight,
  lineHeight: lh,
  letterSpacing: tr ? `${tr}em` : undefined,
});
export const s = (size: number, weight = 400, lh = 1.5, tr = 0): CSSProperties => ({
  fontFamily: "var(--font-sans)",
  fontSize: size,
  fontWeight: weight,
  lineHeight: lh,
  letterSpacing: tr ? `${tr}em` : undefined,
});

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function downloadBlob(filename: string, content: BlobPart, type = "text/plain") {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/** Render string SVG (harus punya width/height/viewBox) ke PNG */
export function svgToPng(svg: string, size: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const withNs = svg.includes("xmlns=") ? svg : svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
    const img = new Image();
    img.onload = () => {
      const ratio = img.naturalHeight / img.naturalWidth || 1;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = Math.round(size * ratio);
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("no canvas"));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("png"))), "image/png");
    };
    img.onerror = () => reject(new Error("img"));
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(withNs);
  });
}

/* ───────── Kontras WCAG ───────── */
export const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};
const lin = (v: number) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
export const luminance = (hex: string) => {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
export const contrast = (a: string, b: string) => {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};
