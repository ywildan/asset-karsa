/* Generator SVG untuk aset brand (sumber tunggal: dipakai tampilan & unduhan) */

/** LogoMark: 4 kelopak kawung bertemu di satu titik (components/Logo.kt) */
export function logoSvg({
  size = 128,
  tile = "#E36B0F",
  ink = "#FFFFFF",
  radius = 15,
  stroke,
}: {
  size?: number;
  tile?: string | null;
  ink?: string;
  radius?: number;
  stroke?: string;
}) {
  const bg = tile ? `<rect width="48" height="48" rx="${radius}" fill="${tile}"${stroke ? ` stroke="${stroke}" stroke-width="1.5"` : ""}/>` : "";
  return `<svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">${bg}<g stroke="${ink}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="24" cy="14.5" rx="5.2" ry="8.8"/><ellipse cx="24" cy="33.5" rx="5.2" ry="8.8"/><ellipse cx="14.5" cy="24" rx="8.8" ry="5.2"/><ellipse cx="33.5" cy="24" rx="8.8" ry="5.2"/></g><circle cx="24" cy="24" r="3.2" fill="${ink}"/></svg>`;
}

/** BloomLogo versi splash (Splash.kt): lingkaran + 4 kelopak */
export function bloomSvg({ size = 128, bg = "#E36B0F", mark = "#FFFFFF" }: { size?: number; bg?: string | null; mark?: string }) {
  const petals = [0, 90, 180, 270]
    .map((r) => `<ellipse cx="50" cy="29.1" rx="11.5" ry="18.75" fill="none" stroke="${mark}" stroke-width="4" stroke-linecap="round" transform="rotate(${r} 50 50)"/>`)
    .join("");
  const circle = bg ? `<circle cx="50" cy="50" r="50" fill="${bg}"/>` : "";
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${circle}${petals}</svg>`;
}

/** Wordmark: logo + tulisan SiKarsa */
export function wordmarkSvg({ ink = "#26180F", tile = "#E36B0F", mark = "#FFFFFF" }: { ink?: string; tile?: string; mark?: string }) {
  const inner = logoSvg({ size: 48, tile, ink: mark }).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  return `<svg width="220" height="56" viewBox="0 0 220 56" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 4)">${inner}</g><text x="60" y="38" font-family="Bricolage Grotesque, system-ui, sans-serif" font-size="32" font-weight="800" letter-spacing="-0.64" fill="${ink}">SiKarsa</text></svg>`;
}

/** Ubin motif Kawung 44×44 (KawungPattern di Common.kt) */
export function kawungTileInner(color: string, alpha: number) {
  return `<g fill="none" stroke="${color}" stroke-opacity="${alpha}" stroke-width="1.2"><ellipse cx="22" cy="22" rx="6" ry="11"/><ellipse cx="22" cy="33" rx="6" ry="11"/><ellipse cx="22" cy="22" rx="11" ry="6"/><ellipse cx="33" cy="22" rx="11" ry="6"/></g><circle cx="22" cy="22" r="1.8" fill="${color}" fill-opacity="${Math.min(1, alpha * 1.4)}"/>`;
}

/** Satu ubin sebagai data-URI, dipakai sebagai background-image */
export function kawungTileUri(color: string, alpha: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">${kawungTileInner(color, alpha)}</svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

/** File SVG utuh berisi pola berulang */
export function kawungFileSvg({
  w,
  h,
  tile,
  color,
  alpha,
  bg,
}: {
  w: number;
  h: number;
  tile: number;
  color: string;
  alpha: number;
  bg: string | null;
}) {
  const sc = tile / 44;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="kawung" width="${tile}" height="${tile}" patternUnits="userSpaceOnUse"><g transform="scale(${sc})">${kawungTileInner(color, alpha)}</g></pattern></defs>${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ""}<rect width="${w}" height="${h}" fill="url(#kawung)"/></svg>`;
}

export const svgInline = (svg: string) => ({ __html: svg });
