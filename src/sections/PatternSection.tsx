import { useMemo, useState } from "react";
import { Copy, Download, FileImage } from "lucide-react";
import { Section, Switch } from "../components/ui";
import { kawungFileSvg, kawungTileUri } from "../lib/brand";
import { hexOf } from "../lib/tokens";
import { cn, d, downloadBlob, s, svgToPng } from "../lib/util";
import { useToast } from "../components/Toast";

const BGS: { key: string; label: string; ink: string }[] = [
  { key: "brand-500", label: "Brand", ink: "paper" },
  { key: "espresso", label: "Espresso", ink: "brand-300" },
  { key: "paper", label: "Kertas", ink: "brand-500" },
  { key: "brand-100", label: "Brand 100", ink: "brand-600" },
  { key: "leaf-600", label: "Daun", ink: "leaf-100" },
  { key: "tide-600", label: "Laut", ink: "tide-100" },
];

export function PatternSection() {
  const { copy, show } = useToast();
  const [bgKey, setBgKey] = useState("brand-500");
  const [inkKey, setInkKey] = useState("paper");
  const [alpha, setAlpha] = useState(0.2);
  const [tile, setTile] = useState(44);
  const [fade, setFade] = useState(false);
  const [transparent, setTransparent] = useState(false);

  const bg = hexOf(bgKey);
  const ink = hexOf(inkKey);

  const svg = useMemo(
    () => kawungFileSvg({ w: 1200, h: 675, tile, color: ink, alpha, bg: transparent ? null : bg }),
    [tile, ink, alpha, bg, transparent],
  );
  const css = `background-color: ${transparent ? "transparent" : bg};
background-image: ${kawungTileUri(ink, alpha).replace(/%0A/g, "")};
background-size: ${tile}px ${tile}px;`;

  const maskStyle = fade ? { maskImage: "radial-gradient(circle at 50% 45%, #000 0, transparent 77%)", WebkitMaskImage: "radial-gradient(circle at 50% 45%, #000 0, transparent 77%)" } : undefined;

  return (
    <Section id="pola" no="05" title="Pola Batik Truntum" desc="Motif batik Truntum: bunga bintang kecil selang-seling di tiap ubin 44 dp, dipakai di header, splash, dan kartu. Atur warna, kerapatan, dan ukuran ubin, lalu ekspor.">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="sh-card overflow-hidden rounded-[28px] border border-ink/5 bg-white p-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[16/9]" style={{ background: transparent ? "repeating-conic-gradient(#EBDFCD 0% 25%, #FBF5EC 0% 50%) 0 0/20px 20px" : bg }}>
            <div className="absolute inset-0" style={{ backgroundImage: kawungTileUri(ink, alpha), backgroundSize: `${tile}px ${tile}px`, ...maskStyle }} />
            <div className="relative flex h-full flex-col justify-end p-6 sm:p-8" style={{ color: ink }}>
              <div style={s(11, 700, 1.4, 0.16)}>BATIK TRUNTUM</div>
              <div style={d(34, 800, 1, -0.02)}>SiKarsa</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 p-2 pt-3 sm:grid-cols-6">
            {BGS.map((b) => (
              <button
                key={b.key}
                onClick={() => {
                  setBgKey(b.key);
                  setInkKey(b.ink);
                  setTransparent(false);
                }}
                className={cn("relative h-16 overflow-hidden rounded-2xl border-2 transition active:scale-95", bgKey === b.key ? "border-ink" : "border-transparent")}
                style={{ background: hexOf(b.key) }}
                title={b.label}
              >
                <div className="absolute inset-0" style={{ backgroundImage: kawungTileUri(hexOf(b.ink), 0.3), backgroundSize: "30px 30px" }} />
                <span className="absolute bottom-1 left-2 rounded-full px-1.5" style={{ ...s(10, 700, 1.4), color: hexOf(b.ink) }}>
                  {b.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="sh-card h-fit rounded-[28px] border border-ink/5 bg-white p-5">
          <div className="text-brand-700" style={s(11, 700, 1.4, 0.16)}>
            PENGATURAN
          </div>
          <div className="text-ink" style={d(22, 700, 1.2)}>
            Generator pola
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-1.5 flex justify-between text-ink2" style={s(12.5, 600, 1.2)}>
                <span>Kerapatan garis</span>
                <span className="text-muted">{Math.round(alpha * 100)}%</span>
              </div>
              <input type="range" min={0.05} max={0.6} step={0.01} value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="karsa-range" />
            </div>
            <div>
              <div className="mb-1.5 flex justify-between text-ink2" style={s(12.5, 600, 1.2)}>
                <span>Ukuran ubin</span>
                <span className="text-muted">{tile} dp</span>
              </div>
              <input type="range" min={24} max={120} step={2} value={tile} onChange={(e) => setTile(Number(e.target.value))} className="karsa-range" />
            </div>
            <div>
              <div className="mb-2 text-ink2" style={s(12.5, 600, 1.2)}>
                Warna garis
              </div>
              <div className="flex flex-wrap gap-2">
                {["paper", "brand-100", "brand-300", "brand-500", "brand-700", "espresso", "ink", "leaf-500"].map((k) => (
                  <button
                    key={k}
                    onClick={() => setInkKey(k)}
                    aria-label={k}
                    title={k}
                    className={cn("size-8 rounded-full border-2 transition active:scale-90", inkKey === k ? "border-brand-500 ring-2 ring-brand-200" : "border-ink/10")}
                    style={{ background: hexOf(k) }}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Switch on={fade} onChange={setFade} label="Pudar ke tepi (fade)" />
              <Switch on={transparent} onChange={setTransparent} label="Latar transparan (ekspor)" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                downloadBlob("karsa-truntum.svg", svg, "image/svg+xml");
                show("karsa-truntum.svg diunduh");
              }}
              className="sh-brand flex h-11 items-center justify-center gap-2 rounded-2xl bg-brand-500 text-white transition hover:bg-brand-600 active:scale-[0.98]"
              style={s(13.5, 600, 1.2)}
            >
              <Download size={16} /> SVG
            </button>
            <button
              onClick={async () => {
                try {
                  const blob = await svgToPng(svg, 1920);
                  downloadBlob("karsa-truntum.png", blob, "image/png");
                  show("karsa-truntum.png diunduh");
                } catch {
                  show("Gagal membuat PNG", "error");
                }
              }}
              className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-espresso text-white transition hover:bg-espresso2 active:scale-[0.98]"
              style={s(13.5, 600, 1.2)}
            >
              <FileImage size={16} /> PNG
            </button>
          </div>
          <button onClick={() => copy(css, "CSS tersalin")} className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-brand-100 text-brand-700 transition hover:bg-brand-200 active:scale-[0.98]" style={s(13.5, 600, 1.2)}>
            <Copy size={16} /> Salin CSS background
          </button>
        </div>
      </div>
    </Section>
  );
}
