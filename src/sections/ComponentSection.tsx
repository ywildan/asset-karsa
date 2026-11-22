import { useState } from "react";
import type { ReactNode } from "react";
import { Activity, Bell, BookOpen, Check, FileText, Inbox, Lock, MessagesSquare, PenLine, Plus, Trash2, Trophy, UserRound, Users, Zap } from "lucide-react";
import {
  Avatar, Badge, Button, Card, Chip, Field, IconButton, PointBadge, SearchField, Segmented, SelectTrigger, Skeleton, TextField, ToastSpecimen,
} from "../components/ui";
import type { BadgeTone, BtnVariant, Tone } from "../components/ui";
import { Section } from "../components/ui";
import { kawungTileUri } from "../lib/brand";
import { RADII, SHADOWS } from "../lib/tokens";
import { cn, d, s } from "../lib/util";
import { useToast } from "../components/Toast";

function Spec({ title, spec, children, className = "" }: { title: string; spec: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("sh-card rounded-[28px] border border-ink/5 bg-white p-5 sm:p-6", className)}>
      <div className="text-ink" style={d(20, 700, 1.25)}>
        {title}
      </div>
      <div className="mt-0.5 text-muted" style={s(12, 400, 1.5)}>
        {spec}
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

/* ───────── Dock ───────── */
type Tab = "lib" | "grup" | "input" | "aktivitas" | "poinku" | "akun";
const TAB_META: Record<Tab, { label: string; Icon: typeof BookOpen }> = {
  lib: { label: "Karsa Lib", Icon: BookOpen },
  grup: { label: "Grup", Icon: MessagesSquare },
  input: { label: "Input", Icon: PenLine },
  aktivitas: { label: "Aktivitas", Icon: Activity },
  poinku: { label: "Poinku", Icon: Trophy },
  akun: { label: "Akun", Icon: UserRound },
};
function Dock({ tabs, active, onChange }: { tabs: Tab[]; active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div className="sh-pop flex h-[82px] items-end rounded-full bg-espresso px-3 pb-3">
      {tabs.map((t) => {
        const { label, Icon } = TAB_META[t];
        if (t === "input") {
          return (
            <div key={t} className="flex flex-1 flex-col items-center justify-end">
              <button
                onClick={() => onChange(t)}
                aria-label={label}
                className={cn("sh-brand -mt-6 mb-0 flex size-[60px] items-center justify-center rounded-full border-4 border-paper text-white transition active:scale-90", active === t ? "bg-brand-400" : "bg-brand-500")}
              >
                <Icon size={26} />
              </button>
            </div>
          );
        }
        const on = active === t;
        return (
          <button key={t} onClick={() => onChange(t)} className="flex flex-1 flex-col items-center justify-end">
            <span className={cn("flex h-9 w-14 items-center justify-center rounded-[18px] transition-colors", on ? "bg-brand-500 text-white" : "text-white/55")}>
              <Icon size={22} />
            </span>
            <span className={cn("mt-1 whitespace-nowrap", on ? "text-white" : "text-white/55")} style={s(10.5, 500, 1.2)}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function DockDemo() {
  const [role, setRole] = useState<"pj" | "mhs">("pj");
  const tabs: Tab[] = role === "pj" ? ["lib", "grup", "input", "aktivitas", "akun"] : ["lib", "grup", "poinku", "akun"];
  const [active, setActive] = useState<Tab>("lib");
  const cur = tabs.includes(active) ? active : tabs[0];
  return (
    <div>
      <Segmented
        value={role}
        onChange={setRole}
        options={[
          { value: "pj", label: "PJ · 5 tab" },
          { value: "mhs", label: "Mahasiswa · 4 tab" },
        ]}
      />
      <div className="mx-auto mt-5 max-w-[420px] rounded-[28px] bg-paper px-3 pb-5 pt-10">
        <Dock tabs={tabs} active={cur} onChange={setActive} />
      </div>
    </div>
  );
}

/* ───────── Contoh kartu ───────── */
function ArticleCard() {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        <Avatar name="Rafi Hidayat" size={32} tone="tide" />
        <div>
          <div className="text-ink" style={s(13, 700, 1.2)}>
            Rafi Hidayat
          </div>
          <div className="text-muted" style={s(11, 400, 1.2)}>
            Sistem Informasi · Kemarin
          </div>
        </div>
        <Badge tone="brand" className="ml-auto">
          BASIS DATA
        </Badge>
      </div>
      <div className="mt-3 text-ink" style={d(18, 700, 1.25)}>
        Normalisasi tanpa pusing: dari 1NF sampai BCNF lewat satu studi kasus
      </div>
      <div className="mt-1.5 line-clamp-2 text-ink2" style={s(13, 400, 1.55)}>
        Banyak dari kita menghafal definisi normalisasi, tetapi baru paham ketika melihat satu tabel yang berantakan dirapikan.
      </div>
      <div className="mt-3 flex gap-4 text-muted" style={s(12, 500, 1.2)}>
        <span>214 pembaca</span>
        <span>5 komentar</span>
      </div>
    </Card>
  );
}
function GroupRow({ name, kelas, tone, locked }: { name: string; kelas: string; tone: Tone; locked?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3">
      <Avatar name={name} size={48} tone={tone} square />
      <div className="min-w-0 flex-1">
        <div className="truncate text-ink" style={s(15, 700, 1.25)}>
          {name}
        </div>
        <div className="truncate text-muted" style={s(12, 400, 1.4)}>
          {kelas} · PJ Dimas Aryo · 38 anggota
        </div>
      </div>
      {locked && <Lock size={16} className="text-muted" />}
    </div>
  );
}
function HistoryRow({ poin, name, cat }: { poin: number; name: string; cat: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3">
      <PointBadge points={poin} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-ink" style={s(14.5, 700, 1.25)}>
          {name}
        </div>
        <div className="truncate text-muted" style={s(12, 400, 1.4)}>
          {cat}
        </div>
      </div>
      <span className="text-muted" style={s(11.5, 500, 1.2)}>
        09.12
      </span>
    </div>
  );
}

export function ComponentSection() {
  const { show } = useToast();
  const variants: BtnVariant[] = ["primary", "dark", "soft", "outline", "ghost", "danger", "dangerSoft"];
  const tones: Tone[] = ["brand", "butter", "leaf", "tide", "plum", "clay"];
  const badges: BadgeTone[] = ["brand", "solid", "dark", "leaf", "butter", "danger", "neutral", "plum", "tide"];
  const [chip, setChip] = useState("Terbaru");
  const [seg, setSeg] = useState<"laporan" | "peringkat">("laporan");
  const [q, setQ] = useState("");

  return (
    <Section id="komponen" no="06" title="Komponen" desc="Komponen inti KarsaUI yang bisa dicoba langsung: tombol, input, chip, toast, Dock, kartu, dan kondisi kosong. Ukuran mengikuti dp di aplikasi Compose.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Spec title="Tombol" spec="KarsaButton · Sm 36dp (pil) · Md 48dp (r16) · Lg 56dp (r20)">
          <div className="space-y-3">
            {variants.map((v) => (
              <div key={v} className="flex flex-wrap items-center gap-2.5">
                <span className="w-[88px] text-muted" style={s(11, 600, 1.2)}>
                  {v}
                </span>
                <Button variant={v} size="sm" onClick={() => show(`Tombol ${v} · Sm`, "neutral")}>
                  Simpan
                </Button>
                <Button variant={v} size="md" leading={<Plus size={16} />} onClick={() => show(`Tombol ${v} · Md`, "neutral")}>
                  Simpan
                </Button>
                <Button variant={v} size="lg" className="hidden sm:inline-flex" onClick={() => show(`Tombol ${v} · Lg`, "neutral")}>
                  Simpan
                </Button>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="w-[88px] text-muted" style={s(11, 600, 1.2)}>
                status
              </span>
              <Button disabled>Nonaktif</Button>
              <Button variant="outline" disabled>
                Outline
              </Button>
              <Button loading>Memuat</Button>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-[88px] text-muted" style={s(11, 600, 1.2)}>
                ikon
              </span>
              <IconButton label="Notifikasi">
                <Bell size={20} />
              </IconButton>
              <IconButton label="Hapus" variant="ghost">
                <Trash2 size={20} />
              </IconButton>
              <IconButton label="Tulis" variant="dark">
                <PenLine size={20} />
              </IconButton>
            </div>
          </div>
        </Spec>

        <div className="space-y-6">
          <Spec title="Avatar, badge, chip" spec="Avatar 6 nada · Badge 9 gaya · Chip 36dp pil · Segmented">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                {tones.map((t, i) => (
                  <Avatar key={t} name={["Nadia Putri", "Aulia R", "Bagas S", "Cahya N", "Dimas A", "Eka F"][i]} tone={t} size={46} />
                ))}
                <Avatar name="Basis Data" size={52} square />
              </div>
              <div className="flex flex-wrap gap-2">
                {badges.map((b) => (
                  <Badge key={b} tone={b}>
                    {b.toUpperCase()}
                  </Badge>
                ))}
                <Badge tone="dark" icon={<Lock size={12} />}>
                  PJ KELAS
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <PointBadge key={n} points={n} />
                ))}
                <PointBadge points={4} large />
              </div>
              <div className="flex flex-wrap gap-2">
                {["Terbaru", "Trending 7 hari", "Basis Data"].map((c) => (
                  <Chip key={c} selected={chip === c} onClick={() => setChip(c)} icon={chip === c ? <Check size={14} /> : undefined}>
                    {c}
                  </Chip>
                ))}
              </div>
              <Segmented
                value={seg}
                onChange={setSeg}
                options={[
                  { value: "laporan", label: "Laporan saya" },
                  { value: "peringkat", label: "Peringkat" },
                ]}
              />
            </div>
          </Spec>
        </div>

        <Spec title="Input" spec="Fokus: latar putih + ring 2dp Brand400 · coba ketuk kolomnya">
          <div className="space-y-4">
            <Field label="Nama yang ditampilkan" hint="Teks bantu 12sp muted">
              <TextField value="Nadia Putri Maharani" />
            </Field>
            <Field label="Catatan">
              <TextField multiline placeholder="Opsional · misalnya: presentasi kelompok 3" />
            </Field>
            <SearchField value={q} onChange={setQ} placeholder="Cari judul artikel di prodimu" />
            <SelectTrigger label="Fakultas" placeholder="Pilih fakultas" />
            <SelectTrigger label="Kelas" value="SI-4B" placeholder="" />
          </div>
        </Spec>

        <div className="space-y-6">
          <Spec title="Toast" spec="3 nada + aksi opsional · muncul di atas Dock · klik tombol untuk mencoba">
            <div className="space-y-3">
              <ToastSpecimen tone="success" msg="Selamat datang, Nadia!" action="Lihat" />
              <ToastSpecimen tone="neutral" msg="Tautan artikel disalin" />
              <ToastSpecimen tone="error" msg="Koneksi terputus. Coba lagi." />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="soft" onClick={() => show("Poin berhasil disimpan", "success")}>
                Coba sukses
              </Button>
              <Button size="sm" variant="outline" onClick={() => show("Tautan artikel disalin", "neutral")}>
                Coba netral
              </Button>
              <Button size="sm" variant="dangerSoft" onClick={() => show("Koneksi terputus. Coba lagi.", "error")}>
                Coba error
              </Button>
            </div>
          </Spec>

          <Spec title="Dock navigasi" spec="Pil Espresso 82dp · tombol tengah bila punya hak mencatat poin · klik tab">
            <DockDemo />
          </Spec>
        </div>

        <Spec title="Kartu & baris daftar" spec="Card r28 + cardShadow · baris r16 dengan border Line" className="lg:col-span-2">
          <div className="grid gap-5 md:grid-cols-2">
            <ArticleCard />
            <div className="space-y-3">
              <GroupRow name="Basis Data Lanjut" kelas="SI-4B" tone="brand" />
              <GroupRow name="Interaksi Manusia & Komputer" kelas="SI-4B" tone="plum" locked />
              <HistoryRow poin={3} name="Aulia Rahmawati" cat="Menjawab pertanyaan" />
              <HistoryRow poin={4} name="Intan Kusuma Dewi" cat="Presentasi / paparan" />
            </div>
          </div>
        </Spec>

        <Spec title="Kondisi kosong, skeleton & hero" spec="EmptyState · Skeleton (denyut 0,7 dtk) · kartu berpola batik Truntum" className="lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-[28px] border border-ink/5 bg-paper px-5 py-8 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <FileText size={30} />
              </div>
              <div className="mt-4 text-ink" style={d(18, 700, 1.25)}>
                Belum ada artikel
              </div>
              <div className="mt-1 text-muted" style={s(12.5, 400, 1.5)}>
                Saat ada tulisan baru dari prodimu, artikel itu akan muncul di sini.
              </div>
              <Button size="sm" variant="soft" className="mt-4" leading={<Inbox size={15} />}>
                Muat ulang
              </Button>
            </div>
            <div className="space-y-3 rounded-[28px] border border-ink/5 bg-paper p-5">
              <div className="flex items-center gap-3">
                <Skeleton round className="size-10" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
              <Skeleton className="mt-4 h-5 w-4/5" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-2/3" />
            </div>
            <div className="relative overflow-hidden rounded-[28px] bg-brand-500 p-5 text-white">
              <div className="absolute inset-0" style={{ backgroundImage: kawungTileUri("#ffffff", 0.22), backgroundSize: "44px 44px" }} />
              <div className="relative flex h-full min-h-[180px] flex-col justify-end">
                <Badge tone="dark" icon={<Users size={12} />}>
                  38 ANGGOTA
                </Badge>
                <div className="mt-2" style={d(26, 800, 1.05, -0.02)}>
                  Grup kelas SI-4B
                </div>
                <div className="mt-1 text-white/85" style={s(12.5, 400, 1.5)}>
                  Kartu hero dengan pola batik Truntum.
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-white/90" style={s(12, 600, 1.2)}>
                  <Zap size={14} /> 28 poin
                </div>
              </div>
            </div>
          </div>
        </Spec>
      </div>
    </Section>
  );
}

/* ───────── Radius & bayangan ───────── */
export function ShapeSection() {
  const { copy } = useToast();
  return (
    <Section id="bentuk" no="07" title="Radius & bayangan" desc="Bentuk lembut dengan sudut besar dan bayangan cokelat hangat, bukan abu-abu. Klik kartu untuk menyalin nilainya.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="sh-card rounded-[28px] border border-ink/5 bg-white p-6">
          <div className="text-ink" style={d(20, 700, 1.25)}>
            Radius
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {RADII.map((r) => (
              <button
                key={r.name}
                onClick={() => copy(`RoundedCornerShape(${r.dp === 9999 ? "50" : r.dp}${r.dp === 9999 ? "" : ".dp"})`, `Radius ${r.name} tersalin`)}
                className="group text-left transition active:scale-95"
              >
                <div className="flex h-24 items-center justify-center border-2 border-brand-300 bg-brand-50 text-brand-700 transition group-hover:bg-brand-100" style={{ borderRadius: Math.min(r.dp, 48), ...s(18, 800, 1) }}>
                  {r.dp === 9999 ? "∞" : r.dp}
                </div>
                <div className="mt-2 text-ink" style={s(12.5, 700, 1.2)}>
                  {r.name}
                </div>
                <div className="text-muted" style={s(11, 400, 1.3)}>
                  {r.use}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] bg-paper2 p-6">
          <div className="text-ink" style={d(20, 700, 1.25)}>
            Bayangan
          </div>
          <div className="mt-4 grid grid-cols-2 gap-5">
            {SHADOWS.map((x) => (
              <button key={x.name} onClick={() => copy(`box-shadow: ${x.css};`, `${x.name} tersalin`)} className="text-left transition active:scale-95">
                <div className={cn("flex h-24 items-center justify-center rounded-[24px] bg-white text-ink2", x.cls)} style={s(12, 600, 1.2)}>
                  {x.name}
                </div>
                <div className="mt-2 text-muted" style={s(11, 400, 1.3)}>
                  {x.use}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
