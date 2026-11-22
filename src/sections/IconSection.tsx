import { useMemo, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Code2, Copy, Download, FileImage } from "lucide-react";
import { Chip, Section, SearchField } from "../components/ui";
import { ICONS, ICON_CATEGORIES } from "../lib/icons";
import type { IconCategory } from "../lib/icons";
import { hexOf } from "../lib/tokens";
import { cn, d, downloadBlob, s, svgToPng } from "../lib/util";
import { useToast } from "../components/Toast";

const INK_CHOICES = ["ink", "brand-500", "brand-700", "espresso", "leaf-600", "danger-500", "tide-600", "plum-600", "paper"];

export function IconSection() {
  const { copy, show } = useToast();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<IconCategory | "Semua">("Semua");
  const [size, setSize] = useState(28);
  const [stroke, setStroke] = useState(2);
  const [ink, setInk] = useState("ink");
  const [selName, setSelName] = useState("BookOpen");

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return ICONS.filter((x) => (cat === "Semua" || x.cat === cat) && (!t || x.name.toLowerCase().includes(t) || x.tags.includes(t)));
  }, [q, cat]);

  const sel = ICONS.find((x) => x.name === selName) ?? ICONS[0];
  const color = hexOf(ink);
  const darkBg = ink === "paper";

  const svgOf = (px: number) => renderToStaticMarkup(<sel.Icon size={px} color={color} strokeWidth={stroke} />);
  const jsx = `<${sel.name} size={${size}} strokeWidth={${stroke}} color="${color}" />`;
  const compose = `KarsaIcon.${sel.name}(size = ${size}.dp, tint = KarsaColors.${ink.replace(/^./, (c) => c.toUpperCase()).replace("-", "")})`;

  return (
    <Section id="ikon" no="04" title="Pustaka ikon" desc={`${ICONS.length} ikon bergaya Lucide yang dipakai di seluruh layar SiKarsa. Atur ukuran, tebal garis, dan warna, lalu salin sebagai JSX atau unduh SVG dan PNG.`}>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="sh-card rounded-[28px] border border-ink/5 bg-white p-4 sm:p-5">
          <SearchField value={q} onChange={setQ} placeholder={`Cari ${ICONS.length} ikon · mis. "hapus", "grup", "kunci"`} />
          <div className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
            {(["Semua", ...ICON_CATEGORIES] as const).map((c) => (
              <Chip key={c} selected={cat === c} onClick={() => setCat(c)}>
                {c}
              </Chip>
            ))}
          </div>
          <div className="mt-2 text-muted" style={s(12, 400, 1.4)}>
            {list.length} ikon ditemukan
          </div>
          {list.length === 0 ? (
            <div className="flex flex-col items-center py-14 text-center">
              <div className="text-ink" style={d(20, 700, 1.25)}>
                Ikon tidak ketemu
              </div>
              <div className="mt-1 text-muted" style={s(13, 400, 1.5)}>
                Coba kata kunci lain atau pilih kategori Semua.
              </div>
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
              {list.map((x) => {
                const on = x.name === sel.name;
                return (
                  <button
                    key={x.name}
                    onClick={() => setSelName(x.name)}
                    onDoubleClick={() => copy(x.name, `${x.name} tersalin`)}
                    className={cn(
                      "flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 p-1.5 transition active:scale-95",
                      on ? "border-brand-500 bg-brand-50" : "border-transparent bg-paper hover:bg-paper2",
                    )}
                    title={x.name}
                  >
                    <x.Icon size={size} strokeWidth={stroke} color={on ? "#E36B0F" : color === "#FBF5EC" ? "#26180F" : color} />
                    <span className="w-full truncate text-center text-muted" style={s(9.5, 600, 1.2)}>
                      {x.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="sh-card rounded-[28px] border border-ink/5 bg-white p-5">
            <div className="text-brand-700" style={s(11, 700, 1.4, 0.16)}>
              {sel.cat.toUpperCase()}
            </div>
            <div className="text-ink" style={d(24, 700, 1.2)}>
              {sel.name}
            </div>
            <div className={cn("mt-4 flex h-40 items-center justify-center rounded-3xl", darkBg ? "bg-espresso" : "bg-paper2")}>
              <sel.Icon size={Math.max(size, 72)} strokeWidth={stroke} color={color} />
            </div>
            <div className="mt-3 flex items-end justify-center gap-4">
              {[16, 20, 24, 32].map((n) => (
                <div key={n} className="flex flex-col items-center gap-1">
                  <sel.Icon size={n} strokeWidth={stroke} color={darkBg ? "#26180F" : color} />
                  <span className="text-muted" style={s(10, 600, 1.2)}>
                    {n}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-1.5 flex justify-between text-ink2" style={s(12.5, 600, 1.2)}>
                  <span>Ukuran</span>
                  <span className="text-muted">{size}px</span>
                </div>
                <input type="range" min={16} max={48} value={size} onChange={(e) => setSize(Number(e.target.value))} className="karsa-range" />
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-ink2" style={s(12.5, 600, 1.2)}>
                  <span>Tebal garis</span>
                  <span className="text-muted">{stroke.toFixed(1)}</span>
                </div>
                <input type="range" min={1} max={3} step={0.25} value={stroke} onChange={(e) => setStroke(Number(e.target.value))} className="karsa-range" />
              </div>
              <div>
                <div className="mb-2 text-ink2" style={s(12.5, 600, 1.2)}>
                  Warna
                </div>
                <div className="flex flex-wrap gap-2">
                  {INK_CHOICES.map((k) => (
                    <button
                      key={k}
                      onClick={() => setInk(k)}
                      aria-label={k}
                      title={k}
                      className={cn("size-8 rounded-full border-2 transition active:scale-90", ink === k ? "border-brand-500 ring-2 ring-brand-200" : "border-ink/10")}
                      style={{ background: hexOf(k) }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  downloadBlob(`${sel.name}.svg`, svgOf(size), "image/svg+xml");
                  show(`${sel.name}.svg diunduh`);
                }}
                className="sh-brand flex h-11 items-center justify-center gap-2 rounded-2xl bg-brand-500 text-white transition hover:bg-brand-600 active:scale-[0.98]"
                style={s(13.5, 600, 1.2)}
              >
                <Download size={16} /> SVG
              </button>
              <button
                onClick={async () => {
                  try {
                    const blob = await svgToPng(svgOf(24), 256);
                    downloadBlob(`${sel.name}.png`, blob, "image/png");
                    show(`${sel.name}.png diunduh`);
                  } catch {
                    show("Gagal membuat PNG", "error");
                  }
                }}
                className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-espresso text-white transition hover:bg-espresso2 active:scale-[0.98]"
                style={s(13.5, 600, 1.2)}
              >
                <FileImage size={16} /> PNG
              </button>
              <button onClick={() => copy(jsx, "JSX tersalin")} className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-brand-100 text-brand-700 transition hover:bg-brand-200 active:scale-[0.98]" style={s(13.5, 600, 1.2)}>
                <Code2 size={16} /> JSX
              </button>
              <button onClick={() => copy(svgOf(size), "Kode SVG tersalin")} className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-brand-100 text-brand-700 transition hover:bg-brand-200 active:scale-[0.98]" style={s(13.5, 600, 1.2)}>
                <Copy size={16} /> Salin SVG
              </button>
            </div>
            <button onClick={() => copy(compose, "Compose tersalin")} className="mt-2 w-full truncate rounded-xl bg-paper2 px-3 py-2 text-left text-ink2 transition hover:bg-paper3" style={{ fontFamily: "ui-monospace, monospace", fontSize: 11 }}>
              {compose}
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
