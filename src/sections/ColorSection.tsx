import { useState } from "react";
import { ArrowLeftRight, Check } from "lucide-react";
import { Section, Segmented } from "../components/ui";
import { ALL_SWATCHES, FORMAT_LABEL, PALETTE, formatColor, hexOf, kotlinName } from "../lib/tokens";
import type { ColorFormat, Swatch } from "../lib/tokens";
import { cn, contrast, d, s } from "../lib/util";
import { useToast } from "../components/Toast";

const isDark = (hex: string) => contrast(hex, "#FFFFFF") > contrast(hex, "#26180F");

function SwatchCard({ c, format, tall }: { c: Swatch; format: ColorFormat; tall?: boolean }) {
  const { copy } = useToast();
  const [done, setDone] = useState(false);
  const dark = isDark(c.hex);
  return (
    <button
      onClick={() => {
        copy(formatColor(c, format), `${kotlinName(c.key)} tersalin`);
        setDone(true);
        window.setTimeout(() => setDone(false), 1200);
      }}
      className="group overflow-hidden rounded-3xl border border-ink/5 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
    >
      <div className={cn("relative flex items-start justify-end p-2.5", tall ? "h-24" : "h-20")} style={{ background: c.hex }}>
        <span className={cn("flex size-6 items-center justify-center rounded-full transition", dark ? "bg-white/20 text-white" : "bg-black/10 text-ink", done ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
          <Check size={13} strokeWidth={3} />
        </span>
      </div>
      <div className="px-3 py-2.5">
        <div className="text-ink" style={s(12.5, 700, 1.2)}>
          {kotlinName(c.key)}
        </div>
        <div className="mt-0.5 truncate text-ink2" style={{ fontFamily: "ui-monospace, monospace", fontSize: 11 }}>
          {format === "hex" ? c.hex : formatColor(c, format)}
        </div>
        {c.role && (
          <div className="mt-0.5 truncate text-muted" style={s(10.5, 400, 1.3)}>
            {c.role}
          </div>
        )}
      </div>
    </button>
  );
}

function Contrast() {
  const [fg, setFg] = useState("ink");
  const [bg, setBg] = useState("paper");
  const ratio = contrast(hexOf(fg), hexOf(bg));
  const level = (min: number) => ratio >= min;
  const checks = [
    { l: "AA teks normal", min: 4.5 },
    { l: "AA teks besar", min: 3 },
    { l: "AAA teks normal", min: 7 },
    { l: "AAA teks besar", min: 4.5 },
  ];
  const presets: [string, string, string][] = [
    ["Teks utama", "ink", "paper"],
    ["Tombol primer", "paper", "brand-500"],
    ["Teks brand", "brand-700", "brand-100"],
    ["Dock aktif", "paper", "espresso"],
    ["Aksen di gelap", "brand-300", "espresso"],
    ["Teks redup", "muted", "paper"],
    ["Error", "danger-500", "danger-100"],
    ["Sukses", "leaf-600", "leaf-100"],
  ];
  const Select = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
    <label className="block flex-1">
      <span className="mb-1.5 block text-ink2" style={s(12.5, 600, 1.2)}>
        {label}
      </span>
      <div className="flex items-center gap-3 rounded-2xl bg-paper2 px-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-400">
        <span className="size-6 shrink-0 rounded-full border border-ink/10" style={{ background: hexOf(value) }} />
        <select value={value} onChange={(e) => onChange(e.target.value)} className="h-[52px] w-full bg-transparent text-ink outline-none" style={s(14, 500, 1.2)}>
          {PALETTE.map((g) => (
            <optgroup key={g.id} label={g.title}>
              {g.items.map((c) => (
                <option key={c.key} value={c.key}>
                  {kotlinName(c.key)} · {c.hex}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </label>
  );
  return (
    <div className="sh-card rounded-[28px] border border-ink/5 bg-white p-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <div className="text-brand-700" style={s(11, 700, 1.4, 0.16)}>
            PEMERIKSA KONTRAS
          </div>
          <div className="text-ink" style={d(22, 700, 1.2)}>
            Aman dibaca atau tidak?
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-end gap-2">
            <Select value={fg} onChange={setFg} label="Warna teks" />
            <button
              onClick={() => {
                setFg(bg);
                setBg(fg);
              }}
              className="mb-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:bg-paper2 active:scale-90"
              aria-label="Tukar warna"
            >
              <ArrowLeftRight size={18} />
            </button>
            <Select value={bg} onChange={setBg} label="Latar" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {presets.map(([n, f, b]) => (
              <button
                key={n}
                onClick={() => {
                  setFg(f);
                  setBg(b);
                }}
                className={cn("rounded-full px-3.5 py-1.5 transition active:scale-95", fg === f && bg === b ? "bg-espresso text-white" : "border border-line bg-white text-ink2 hover:bg-paper2")}
                style={s(12, 600, 1.2)}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {checks.map((c) => (
              <div key={c.l} className={cn("flex items-center justify-between rounded-2xl px-3.5 py-2.5", level(c.min) ? "bg-leaf-100 text-leaf-600" : "bg-danger-100 text-danger-500")} style={s(12, 700, 1.2)}>
                {c.l}
                <span>{level(c.min) ? "Lulus" : "Gagal"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col overflow-hidden rounded-3xl" style={{ background: hexOf(bg), color: hexOf(fg) }}>
          <div className="flex flex-1 flex-col justify-center p-6">
            <div style={d(44, 800, 1, -0.03)}>{ratio.toFixed(2)}:1</div>
            <div className="mt-3" style={d(20, 700, 1.25)}>
              Normalisasi tanpa pusing
            </div>
            <p className="mt-1.5 opacity-90" style={s(14, 400, 1.55)}>
              Catatan ini memakai satu kasus: tabel pesanan kantin kampus. Gunakan akun kampus untuk masuk.
            </p>
            <div style={s(11, 700, 1.4, 0.16)} className="mt-3">
              PERPUSTAKAAN PRODI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ColorSection() {
  const [format, setFormat] = useState<ColorFormat>("hex");
  const brand = PALETTE.find((g) => g.id === "brand")!;
  return (
    <Section id="warna" no="02" title="Palet warna" desc={`${ALL_SWATCHES.length} token dari theme/Colors.kt. Pilih format, lalu klik warna mana pun untuk menyalinnya. Hanya ada tema terang: kertas hangat, tinta kopi, dan oranye Karsa.`}>
      <div className="mb-6 overflow-x-auto no-scrollbar">
        <Segmented
          className="w-max min-w-full sm:min-w-0"
          value={format}
          onChange={setFormat}
          options={(Object.keys(FORMAT_LABEL) as ColorFormat[]).map((f) => ({ value: f, label: FORMAT_LABEL[f] }))}
        />
      </div>

      {/* Rampa brand */}
      <div className="sh-card mb-8 overflow-hidden rounded-[28px] border border-ink/5 bg-white p-2">
        <div className="flex h-28 overflow-hidden rounded-3xl">
          {brand.items.map((c) => (
            <RampStep key={c.key} c={c} format={format} />
          ))}
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-ink" style={d(16, 700, 1.2)}>
            Rampa Brand
          </span>
          <span className="text-muted" style={s(12, 400, 1.2)}>
            50 → 800 · primer = 500
          </span>
        </div>
      </div>

      <div className="space-y-10">
        {PALETTE.map((g) => (
          <div key={g.id}>
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3">
              <h3 className="text-ink" style={d(20, 700, 1.25)}>
                {g.title}
              </h3>
              <span className="text-muted" style={s(12.5, 400, 1.4)}>
                {g.desc}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {g.items.map((c) => (
                <SwatchCard key={c.key} c={c} format={format} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Contrast />
      </div>
    </Section>
  );
}

function RampStep({ c, format }: { c: Swatch; format: ColorFormat }) {
  const { copy } = useToast();
  const dark = isDark(c.hex);
  const n = c.key.split("-")[1];
  return (
    <button
      onClick={() => copy(formatColor(c, format), `${kotlinName(c.key)} tersalin`)}
      className={cn("flex min-w-0 flex-1 flex-col justify-end p-2 text-left transition-[flex-grow] duration-300 hover:flex-[1.8]", dark ? "text-white" : "text-ink")}
      style={{ background: c.hex }}
      title={`${kotlinName(c.key)} ${c.hex}`}
    >
      <span style={d(15, 800, 1)}>{n}</span>
      <span className="hidden opacity-80 sm:block" style={{ fontFamily: "ui-monospace, monospace", fontSize: 9.5 }}>
        {c.hex.slice(1)}
      </span>
    </button>
  );
}
