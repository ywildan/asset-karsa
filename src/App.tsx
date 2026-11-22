import { useEffect, useState } from "react";
import { ToastProvider } from "./components/Toast";
import { Hero } from "./sections/Hero";
import { LogoSection } from "./sections/LogoSection";
import { ColorSection } from "./sections/ColorSection";
import { TypeSection } from "./sections/TypeSection";
import { IconSection } from "./sections/IconSection";
import { PatternSection } from "./sections/PatternSection";
import { ComponentSection, ShapeSection } from "./sections/ComponentSection";
import { ExportSection } from "./sections/ExportSection";
import { cn, d, s } from "./lib/util";
import { kawungTileUri, logoSvg, svgInline } from "./lib/brand";

const NAV: [string, string][] = [
  ["logo", "Logo"],
  ["warna", "Warna"],
  ["tipografi", "Tipografi"],
  ["ikon", "Ikon"],
  ["pola", "Pola Kawung"],
  ["komponen", "Komponen"],
  ["bentuk", "Bentuk"],
  ["ekspor", "Ekspor"],
];

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const onScroll = () => {
      let cur = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

const IDS = NAV.map(([id]) => id);

export default function App() {
  const active = useScrollSpy(IDS);
  return (
    <ToastProvider>
      <div className="min-h-screen bg-paper text-ink" style={{ fontFamily: "var(--font-sans)" }}>
        <Hero />

        <nav className="sticky top-0 z-[100] border-b border-line bg-paper/90 backdrop-blur-md">
          <div className="no-scrollbar mx-auto flex max-w-[1200px] items-center gap-2 overflow-x-auto px-5 py-3 md:px-8">
            <a href="#" className="mr-2 hidden shrink-0 items-center gap-2 sm:flex" aria-label="Ke atas">
              <span dangerouslySetInnerHTML={svgInline(logoSvg({ size: 30, radius: 11 }))} />
              <span className="text-ink" style={d(17, 800, 1, -0.02)}>
                Asset Karsa
              </span>
            </a>
            {NAV.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn("shrink-0 rounded-full px-4 py-2 transition active:scale-95", active === id ? "bg-espresso text-white" : "text-ink2 hover:bg-paper2")}
                style={s(13, 600, 1.2)}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <main className="mx-auto max-w-[1200px] px-5 md:px-8">
          <LogoSection />
          <ColorSection />
          <TypeSection />
          <IconSection />
          <PatternSection />
          <ComponentSection />
          <ShapeSection />
          <ExportSection />
        </main>

        <footer className="relative mt-10 overflow-hidden bg-espresso text-white">
          <div className="absolute inset-0" style={{ backgroundImage: kawungTileUri("#FFA762", 0.12), backgroundSize: "44px 44px" }} />
          <div className="relative mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-5 py-12 md:flex-row md:items-center md:px-8">
            <div className="flex items-center gap-4">
              <span dangerouslySetInnerHTML={svgInline(logoSvg({ size: 56, radius: 18 }))} />
              <div>
                <div style={d(26, 800, 1, -0.02)}>Asset Karsa</div>
                <div className="text-white/60" style={s(13, 400, 1.5)}>
                  Pustaka aset gaya UI SiKarsa · tema kertas, tinta kopi, oranye.
                </div>
              </div>
            </div>
            <a href="#" className="rounded-full bg-white/10 px-5 py-2.5 text-white transition hover:bg-white/20 active:scale-95" style={s(13, 600, 1.2)}>
              Kembali ke atas ↑
            </a>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}
