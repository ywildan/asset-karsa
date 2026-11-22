import { useMemo, useState } from "react";
import { Check, Download, Copy, X as XIcon } from "lucide-react";
import { Section, Segmented } from "../components/ui";
import { bloomSvg, logoSvg, svgInline, wordmarkSvg } from "../lib/brand";
import { cn, d, downloadBlob, s, svgToPng } from "../lib/util";
import { useToast } from "../components/Toast";

type Variant = {
  id: string;
  name: string;
  note: string;
  bg: string; // latar pratinjau
  svg: (size: number) => string;
  wide?: boolean;
};

const VARIANTS: Variant[] = [
  { id: "brand", name: "Tile Brand", note: "Utama · ikon launcher", bg: "bg-paper2", svg: (n) => logoSvg({ size: n, tile: "#E36B0F", ink: "#FFFFFF" }) },
  { id: "espresso", name: "Tile Espresso", note: "Untuk latar terang", bg: "bg-paper2", svg: (n) => logoSvg({ size: n, tile: "#2A1A10", ink: "#FFA762" }) },
  { id: "cream", name: "Tile Krem", note: "Untuk latar oranye", bg: "bg-brand-500", svg: (n) => logoSvg({ size: n, tile: "#FBF5EC", ink: "#E36B0F" }) },
  { id: "mono-ink", name: "Mono Tinta", note: "Tanpa tile · cetak", bg: "bg-white", svg: (n) => logoSvg({ size: n, tile: null, ink: "#26180F" }) },
  { id: "mono-white", name: "Mono Putih", note: "Di atas foto / gelap", bg: "bg-espresso", svg: (n) => logoSvg({ size: n, tile: null, ink: "#FFFFFF" }) },
  { id: "bloom", name: "Bloom Splash", note: "Lingkaran · splash", bg: "bg-espresso", svg: (n) => bloomSvg({ size: n, bg: "#E36B0F", mark: "#FFFFFF" }) },
  { id: "bloom-line", name: "Bloom Garis", note: "Tanpa lingkaran", bg: "bg-brand-100", svg: (n) => bloomSvg({ size: n, bg: null, mark: "#8F4208" }) },
  { id: "wordmark", name: "Wordmark", note: "Logo + SiKarsa", bg: "bg-white", svg: () => wordmarkSvg({}), wide: true },
];

export function LogoSection() {
  const { show, copy } = useToast();
  const [sel, setSel] = useState("brand");
  const [pngSize, setPngSize] = useState<"256" | "512" | "1024">("512");
  const [radius, setRadius] = useState(15);
  const v = VARIANTS.find((x) => x.id === sel)!;
  const isTile = sel === "brand" || sel === "espresso" || sel === "cream";

  const exportSvg = useMemo(() => {
    if (isTile) {
      const map: Record<string, [string, string]> = { brand: ["#E36B0F", "#FFFFFF"], espresso: ["#2A1A10", "#FFA762"], cream: ["#FBF5EC", "#E36B0F"] };
      return logoSvg({ size: 512, tile: map[sel][0], ink: map[sel][1], radius });
    }
    return v.svg(v.wide ? 220 : 512);
  }, [sel, radius, v, isTile]);

  const downloadSvg = () => {
    downloadBlob(`karsa-${sel}.svg`, exportSvg, "image/svg+xml");
    show(`karsa-${sel}.svg diunduh`);
  };
  const downloadPng = async () => {
    try {
      const blob = await svgToPng(exportSvg, Number(pngSize));
      downloadBlob(`karsa-${sel}-${pngSize}.png`, blob, "image/png");
      show(`PNG ${pngSize}px diunduh`);
    } catch {
      show("Gagal membuat PNG", "error");
    }
  };

  return (
    <Section id="logo" no="01" title="Logo & lambang" desc="LogoMark empat kelopak Kawung yang bertemu di satu titik. Pilih varian, atur radius ubin, lalu unduh sebagai SVG atau PNG.">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Daftar varian */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {VARIANTS.map((x) => {
            const on = x.id === sel;
            return (
              <button
                key={x.id}
                onClick={() => setSel(x.id)}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-3xl border-2 bg-white text-left transition active:scale-[0.98]",
                  on ? "border-brand-500 sh-brand" : "border-line hover:border-brand-200",
                  x.wide && "col-span-2",
                )}
              >
                <div className={cn("flex h-32 items-center justify-center", x.bg)}>
                  <div dangerouslySetInnerHTML={svgInline(x.id === "wordmark" ? x.svg(0) : x.svg(72))} />
                </div>
                <div className="flex items-start justify-between gap-2 px-3.5 py-3">
                  <div>
                    <div className="text-ink" style={s(13, 700, 1.25)}>
                      {x.name}
                    </div>
                    <div className="text-muted" style={s(11, 400, 1.35)}>
                      {x.note}
                    </div>
                  </div>
                  {on && (
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Panel ekspor */}
        <div className="sh-card h-fit rounded-[28px] border border-ink/5 bg-white p-5 lg:sticky lg:top-24">
          <div className="text-brand-700" style={s(11, 700, 1.4, 0.16)}>
            EKSPOR
          </div>
          <div className="text-ink" style={d(22, 700, 1.2)}>
            {v.name}
          </div>
          <div className={cn("mt-4 flex h-52 items-center justify-center rounded-3xl", v.bg)}>
            <div dangerouslySetInnerHTML={svgInline(v.wide ? v.svg(0).replace('width="220" height="56"', 'width="260" height="66"') : isTile ? logoSvg({ size: 128, tile: sel === "brand" ? "#E36B0F" : sel === "espresso" ? "#2A1A10" : "#FBF5EC", ink: sel === "brand" ? "#FFFFFF" : sel === "espresso" ? "#FFA762" : "#E36B0F", radius }) : v.svg(128))} />
          </div>

          {isTile && (
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-ink2" style={s(12.5, 600, 1.2)}>
                <span>Radius ubin</span>
                <span className="text-muted">{radius === 24 ? "lingkaran" : `${radius} / 48`}</span>
              </div>
              <input type="range" min={0} max={24} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="karsa-range" />
            </div>
          )}

          <div className="mt-4">
            <div className="mb-1.5 text-ink2" style={s(12.5, 600, 1.2)}>
              Ukuran PNG
            </div>
            <Segmented
              value={pngSize}
              onChange={setPngSize}
              options={[
                { value: "256", label: "256" },
                { value: "512", label: "512" },
                { value: "1024", label: "1024" },
              ]}
            />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <button onClick={downloadSvg} className="sh-brand flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand-500 text-white transition hover:bg-brand-600 active:scale-[0.98]" style={s(14, 600, 1.2)}>
              <Download size={17} /> SVG
            </button>
            <button onClick={downloadPng} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-espresso text-white transition hover:bg-espresso2 active:scale-[0.98]" style={s(14, 600, 1.2)}>
              <Download size={17} /> PNG
            </button>
          </div>
          <button
            onClick={() => copy(exportSvg, "Kode SVG tersalin")}
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-brand-100 text-brand-700 transition hover:bg-brand-200 active:scale-[0.98]"
            style={s(13.5, 600, 1.2)}
          >
            <Copy size={16} /> Salin kode SVG
          </button>
        </div>
      </div>

      {/* Ruang aman, ukuran minimum, boleh/jangan */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="sh-card rounded-[28px] border border-ink/5 bg-white p-6">
          <div className="text-ink" style={d(18, 700, 1.3)}>
            Ruang aman
          </div>
          <p className="mt-1 text-muted" style={s(12.5, 400, 1.55)}>
            Sisakan jarak minimal ½ lebar logo di keempat sisi.
          </p>
          <div className="mt-5 flex justify-center">
            <div className="relative flex size-44 items-center justify-center rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50">
              <div className="absolute inset-[34px] rounded-xl border border-brand-300/60 bg-white/60" />
              <div className="relative" dangerouslySetInnerHTML={svgInline(logoSvg({ size: 76 }))} />
              <span className="absolute left-1/2 top-2 -translate-x-1/2 text-brand-700" style={s(10, 700, 1, 0.04)}>½x</span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-brand-700" style={s(10, 700, 1, 0.04)}>½x</span>
            </div>
          </div>
        </div>
        <div className="sh-card rounded-[28px] border border-ink/5 bg-white p-6">
          <div className="text-ink" style={d(18, 700, 1.3)}>
            Ukuran minimum
          </div>
          <p className="mt-1 text-muted" style={s(12.5, 400, 1.55)}>
            Jangan tampilkan lebih kecil dari 24 dp agar kelopak tetap terbaca.
          </p>
          <div className="mt-6 flex items-end justify-center gap-5">
            {[24, 32, 48, 64].map((n) => (
              <div key={n} className="flex flex-col items-center gap-2">
                <div dangerouslySetInnerHTML={svgInline(logoSvg({ size: n }))} />
                <span className="text-muted" style={s(11, 600, 1.2)}>
                  {n}dp
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="sh-card rounded-[28px] border border-ink/5 bg-white p-6">
          <div className="text-ink" style={d(18, 700, 1.3)}>
            Boleh & jangan
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { ok: true, label: "Warna resmi", svg: logoSvg({ size: 56 }), cls: "" },
              { ok: false, label: "Diputar", svg: logoSvg({ size: 56 }), cls: "rotate-[24deg]" },
              { ok: false, label: "Diregangkan", svg: logoSvg({ size: 56 }), cls: "scale-x-[1.4] scale-y-75" },
              { ok: true, label: "Tile krem", svg: logoSvg({ size: 56, tile: "#2A1A10", ink: "#FFA762" }), cls: "" },
              { ok: false, label: "Warna asing", svg: logoSvg({ size: 56, tile: "#3B82F6", ink: "#FACC15" }), cls: "" },
              { ok: false, label: "Efek bayangan", svg: logoSvg({ size: 56 }), cls: "drop-shadow-[0_8px_6px_rgba(0,0,0,.6)]" },
            ].map((x) => (
              <div key={x.label} className="flex flex-col items-center gap-2">
                <div className="relative flex h-16 w-full items-center justify-center overflow-hidden rounded-2xl bg-paper2">
                  <div className={x.cls} dangerouslySetInnerHTML={svgInline(x.svg.replace('width="56" height="56"', 'width="40" height="40"'))} />
                  <span className={cn("absolute right-1 top-1 flex size-4 items-center justify-center rounded-full text-white", x.ok ? "bg-leaf-500" : "bg-danger-500")}>
                    {x.ok ? <Check size={10} strokeWidth={3} /> : <XIcon size={10} strokeWidth={3} />}
                  </span>
                </div>
                <span className="text-center text-ink2" style={s(10.5, 600, 1.2)}>
                  {x.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
