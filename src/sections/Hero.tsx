import { ArrowDown, Download, Layers, Palette, Shapes, Sparkles, Type } from "lucide-react";
import { ALL_SWATCHES, buildExport } from "../lib/tokens";
import { ICONS } from "../lib/icons";
import { kawungTileUri, logoSvg, svgInline } from "../lib/brand";
import { d, downloadBlob, s } from "../lib/util";
import { Button } from "../components/ui";
import { useToast } from "../components/Toast";

export function Hero() {
  const { show } = useToast();
  const stats = [
    { n: ALL_SWATCHES.length, l: "warna token" },
    { n: ICONS.length, l: "ikon Lucide" },
    { n: 2, l: "font variabel" },
    { n: 4, l: "format ekspor" },
  ];
  return (
    <header className="relative overflow-hidden bg-brand-500 text-white">
      <div className="absolute inset-0 opacity-100" style={{ backgroundImage: kawungTileUri("#ffffff", 0.2), backgroundSize: "44px 44px" }} />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(70% 90% at 85% 10%, rgba(255,203,156,.45), transparent 65%), radial-gradient(60% 80% at 0% 100%, rgba(42,26,16,.55), transparent 70%)" }}
      />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-24 pt-14 md:px-8 md:pb-28 md:pt-20 lg:grid-cols-[1.25fr_1fr]">
        <div className="rise">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-espresso/90 py-1.5 pl-2 pr-4" style={s(12, 700, 1.2, 0.04)}>
            <span className="flex size-6 items-center justify-center rounded-full bg-brand-500">
              <Sparkles size={13} />
            </span>
            PUSTAKA ASET · GAYA UI SIKARSA
          </div>
          <h1 style={d(72, 800, 0.95, -0.035)} className="text-[48px] sm:text-[64px] lg:text-[84px]">
            Asset
            <br />
            Karsa<span className="text-espresso">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-white/90" style={s(17, 400, 1.65)}>
            Satu tempat untuk seluruh bahan visual aplikasi SiKarsa: logo, palet kertas-oranye, tipografi, ikon, pola batik Truntum, dan komponen. Klik untuk menyalin, atau unduh siap pakai.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#logo">
              <Button variant="dark" size="lg" trailing={<ArrowDown size={18} />}>
                Jelajahi aset
              </Button>
            </a>
            <Button
              variant="soft"
              size="lg"
              leading={<Download size={18} />}
              onClick={() => {
                const x = buildExport("css");
                downloadBlob(x.file, x.code, x.mime);
                show("karsa-tokens.css diunduh");
              }}
            >
              Unduh token CSS
            </Button>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((x) => (
              <div key={x.l} className="rounded-2xl bg-white/12 px-4 py-3 backdrop-blur-sm" style={{ background: "rgba(255,255,255,.14)" }}>
                <div style={d(28, 800, 1, -0.02)}>{x.n}</div>
                <div className="text-white/80" style={s(11.5, 500, 1.3)}>
                  {x.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual melayang */}
        <div className="relative mx-auto hidden h-[420px] w-full max-w-[420px] lg:block">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="ring absolute inset-0 rounded-[48px] border-2 border-white/50" />
            <div className="sh-pop overflow-hidden rounded-[48px]" dangerouslySetInnerHTML={svgInline(logoSvg({ size: 200, tile: "#2A1A10", ink: "#FFA762", radius: 15 }))} />
          </div>
          <div className="floaty sh-card absolute left-0 top-6 flex items-center gap-2 rounded-3xl bg-paper p-3 text-ink" style={{ animationDelay: "0s" }}>
            <Palette size={18} className="text-brand-600" />
            {["#FFE6D0", "#FFA762", "#E36B0F", "#2A1A10"].map((c) => (
              <span key={c} className="size-6 rounded-full border border-ink/10" style={{ background: c }} />
            ))}
          </div>
          <div className="floaty sh-card absolute right-0 top-24 rounded-3xl bg-paper px-5 py-3 text-ink" style={{ animationDelay: "0.8s" }}>
            <div className="flex items-center gap-2 text-brand-700" style={s(10, 700, 1.2, 0.16)}>
              <Type size={14} /> DISPLAY
            </div>
            <div style={d(34, 800, 1, -0.02)}>Aa</div>
          </div>
          <div className="floaty sh-card absolute bottom-16 left-2 flex items-center gap-2 rounded-full bg-espresso px-4 py-3 text-white" style={{ animationDelay: "1.4s" }}>
            <Shapes size={18} className="text-brand-300" />
            <span style={s(12.5, 600, 1.2)}>{ICONS.length} ikon</span>
          </div>
          <div className="floaty sh-card absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-brand-100 px-4 py-3 text-brand-700" style={{ animationDelay: "0.4s" }}>
            <Layers size={18} />
            <span style={s(12.5, 700, 1.2)}>Batik</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-8 rounded-t-[32px] bg-paper" />
    </header>
  );
}
