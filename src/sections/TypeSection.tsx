import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Section, Segmented } from "../components/ui";
import { TYPE_SCALE } from "../lib/tokens";
import { cn, d, s } from "../lib/util";
import { useToast } from "../components/Toast";

const FONTS = [
  {
    id: "display",
    name: "Bricolage Grotesque",
    role: "Display · judul & angka",
    css: "var(--font-display)",
    weights: [200, 400, 600, 700, 800],
    url: "https://fonts.google.com/specimen/Bricolage+Grotesque",
    note: "Berkarakter, sedikit eksentrik. Dipakai untuk judul halaman, judul kartu, dan angka poin.",
  },
  {
    id: "sans",
    name: "Plus Jakarta Sans",
    role: "Sans · isi & antarmuka",
    css: "var(--font-sans)",
    weights: [300, 400, 500, 600, 700, 800],
    url: "https://fonts.google.com/specimen/Plus+Jakarta+Sans",
    note: "Terbaca jelas di layar kecil. Dipakai untuk teks isi, label, tombol, dan input.",
  },
];

export function TypeSection() {
  const { copy } = useToast();
  const [custom, setCustom] = useState("");
  const [fam, setFam] = useState<"all" | "display" | "sans">("all");
  const list = TYPE_SCALE.filter((t) => fam === "all" || t.family === fam);

  return (
    <Section id="tipografi" no="03" title="Tipografi" desc="Dua font variabel: Bricolage Grotesque untuk display dan Plus Jakarta Sans untuk isi. Ketik teksmu sendiri untuk mencoba setiap gaya.">
      <div className="grid gap-5 md:grid-cols-2">
        {FONTS.map((f, idx) => (
          <div key={f.id} className={cn("sh-card relative overflow-hidden rounded-[28px] p-6", idx === 0 ? "bg-espresso text-white" : "border border-ink/5 bg-white text-ink")}>
            <div className={idx === 0 ? "text-brand-300" : "text-brand-700"} style={s(11, 700, 1.4, 0.16)}>
              {f.role.toUpperCase()}
            </div>
            <div className="mt-2 flex items-end justify-between gap-4">
              <div style={{ fontFamily: f.css, fontSize: 110, fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.04em" }}>Aa</div>
              <a
                href={f.url}
                target="_blank"
                rel="noreferrer"
                className={cn("mb-2 flex h-9 items-center gap-1.5 rounded-full px-3.5 transition active:scale-95", idx === 0 ? "bg-white/10 hover:bg-white/20" : "bg-brand-100 text-brand-700 hover:bg-brand-200")}
                style={s(12, 600, 1.2)}
              >
                Google Fonts <ExternalLink size={13} />
              </a>
            </div>
            <div className="mt-4" style={{ fontFamily: f.css, fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
              {f.name}
            </div>
            <p className={cn("mt-1.5", idx === 0 ? "text-white/65" : "text-ink2")} style={s(13, 400, 1.6)}>
              {f.note}
            </p>
            <div className="mt-4 break-all" style={{ fontFamily: f.css, fontSize: 17, lineHeight: 1.5, fontWeight: 500 }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789 !?@#&%
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {f.weights.map((w) => (
                <span key={w} className={cn("rounded-full px-3 py-1", idx === 0 ? "bg-white/10" : "bg-paper2")} style={{ fontFamily: f.css, fontWeight: w, fontSize: 13 }}>
                  {w}
                </span>
              ))}
            </div>
            <button
              onClick={() => copy(`font-family: "${f.name}", system-ui, sans-serif;`, "font-family tersalin")}
              className={cn("mt-4 w-full truncate rounded-xl px-3 py-2 text-left transition active:scale-[0.99]", idx === 0 ? "bg-black/25 text-white/80 hover:bg-black/35" : "bg-paper2 text-ink2 hover:bg-paper3")}
              style={{ fontFamily: "ui-monospace, monospace", fontSize: 11.5 }}
            >
              font-family: "{f.name}", system-ui;
            </button>
          </div>
        ))}
      </div>

      <div className="sh-card mt-6 rounded-[28px] border border-ink/5 bg-white p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-brand-700" style={s(11, 700, 1.4, 0.16)}>
              SKALA TIPE
            </div>
            <div className="text-ink" style={d(22, 700, 1.2)}>
              {list.length} gaya teks
            </div>
          </div>
          <Segmented
            className="md:w-[320px]"
            value={fam}
            onChange={setFam}
            options={[
              { value: "all", label: "Semua" },
              { value: "display", label: "Display" },
              { value: "sans", label: "Sans" },
            ]}
          />
        </div>
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Ketik teks untuk dicoba di semua gaya…"
          className="mb-2 h-[52px] w-full rounded-2xl border-2 border-transparent bg-paper2 px-4 text-ink outline-none placeholder:text-muted/80 focus:border-brand-400 focus:bg-white"
          style={s(15, 400, 1.5)}
        />
        <div className="divide-y divide-line">
          {list.map((t) => {
            const style = t.family === "display" ? d(t.size, t.weight, t.lh, t.tr ?? 0) : s(t.size, t.weight, t.lh, t.tr ?? 0);
            const text = custom ? (t.label.startsWith("Eyebrow") ? custom.toUpperCase() : custom) : t.sample;
            const spec = `${t.family === "display" ? "Bricolage" : "Jakarta"} ${t.size}/${t.weight}${t.tr ? ` · ${t.tr}em` : ""}`;
            return (
              <button
                key={t.label}
                onClick={() => copy(`fontSize: ${t.size}.sp, fontWeight: ${t.weight}, lineHeight: ${t.lh}`, `${t.label} tersalin`)}
                className="grid w-full gap-1 py-4 text-left transition hover:bg-paper/70 md:grid-cols-[210px_1fr] md:gap-6"
              >
                <div>
                  <div className="text-ink" style={s(12.5, 700, 1.3)}>
                    {t.label}
                  </div>
                  <div className="text-muted" style={s(11, 400, 1.4)}>
                    {t.use}
                  </div>
                  <div className="mt-0.5 text-brand-600" style={{ fontFamily: "ui-monospace, monospace", fontSize: 10.5 }}>
                    {spec}
                  </div>
                </div>
                <div className={cn("min-w-0 break-words", t.label.startsWith("Eyebrow") ? "text-brand-700" : t.label.includes("12") ? "text-muted" : "text-ink")} style={style}>
                  {text}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
