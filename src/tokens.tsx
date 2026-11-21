import type { ReactNode } from "react";
import { Bell, Check, FileText, Inbox, Lock, PenLine, Plus, Trash2 } from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  Chip,
  EmptyState,
  ErrorState,
  Field,
  IconButton,
  Kawung,
  LogoMark,
  PointBadge,
  Segmented,
  SearchField,
  SelectTrigger,
  Skeleton,
  TextField,
  Toast,
  d,
  s,
} from "./ui";
import type { BadgeTone, BtnVariant, Tone } from "./ui";
import { PJ_TABS, MHS_TABS, Dock } from "./phone";
import { PopMenuPanel } from "./ui";

const COLORS: { group: string; items: [string, string, string][] }[] = [
  { group: "Surfaces", items: [["Paper", "#FBF5EC", "background / surface"], ["Paper2", "#F5ECE0", "surfaceVariant · input"], ["Paper3", "#EBDFCD", "handle · skeleton"], ["Line", "#EBE0D1", "outline · border"]] },
  { group: "Ink", items: [["Ink", "#26180F", "teks utama"], ["Ink2", "#5A483B", "teks sekunder"], ["Muted", "#8B7B6D", "teks redup"], ["Espresso", "#2A1A10", "secondary · Dock · scrim"], ["Espresso2", "#3B261A", ""]] },
  { group: "Brand (oranye)", items: [["Brand50", "#FFF5EC", ""], ["Brand100", "#FFE6D0", "primaryContainer"], ["Brand200", "#FFCB9C", "glow menu"], ["Brand300", "#FFA762", ""], ["Brand400", "#F88A2E", "fokus input"], ["Brand500", "#E36B0F", "primary"], ["Brand600", "#C75A08", ""], ["Brand700", "#8F4208", "onPrimaryContainer"], ["Brand800", "#5F2C06", "kutipan artikel"]] },
  { group: "Pendukung", items: [["Butter100", "#FDF0C4", ""], ["Butter400", "#F7C948", ""], ["Butter700", "#7A5A00", ""], ["Leaf100", "#DCF2E4", ""], ["Leaf500", "#1F7A4D", "sukses"], ["Leaf600", "#17623D", ""], ["Danger100", "#FBE2DF", "errorContainer"], ["Danger500", "#C1352B", "error"], ["Tide100", "#DCEBF4", ""], ["Tide600", "#2A6385", ""], ["Plum100", "#F1DCEB", ""], ["Plum600", "#7A3E6B", ""]] },
];

function Block({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div className="rounded-[28px] bg-paper p-6 text-ink">
      <div style={d(20, 700, 1.25)}>{title}</div>
      {note && <div className="mt-1 text-muted" style={s(12, 400, 1.5)}>{note}</div>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function Tokens() {
  const variants: BtnVariant[] = ["primary", "dark", "soft", "outline", "ghost", "danger", "dangerSoft"];
  const tones: Tone[] = ["brand", "butter", "leaf", "tide", "plum", "clay"];
  const badges: BadgeTone[] = ["brand", "solid", "dark", "leaf", "butter", "danger", "neutral", "plum", "tide"];
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Block title="Warna" note="theme/Colors.kt · hanya lightColorScheme (tidak ada tema gelap)">
        <div className="space-y-4">
          {COLORS.map((g) => (
            <div key={g.group}>
              <div className="mb-2 text-muted" style={s(11, 700, 1.2, 0.08)}>{g.group.toUpperCase()}</div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {g.items.map(([n, hex, use]) => (
                  <div key={n} className="overflow-hidden rounded-2xl border border-line bg-white">
                    <div className="h-10" style={{ background: hex }} />
                    <div className="px-2 py-1.5">
                      <div style={s(11, 700, 1.2)}>{n}</div>
                      <div className="text-muted" style={s(10, 500, 1.3)}>{hex}</div>
                      {use && <div className="text-muted/80" style={s(9, 400, 1.3)}>{use}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Block>

      <div className="space-y-6">
        <Block title="Tipografi" note="Dua font variabel yang dibundel di res/font: Bricolage Grotesque (display) & Plus Jakarta Sans (isi)">
          <div className="space-y-3">
            {[
              ["Display 40/800 · -0.02em", d(40, 800, 1, -0.02), "SiKarsa"],
              ["Display 34/800 · PageHeader", d(34, 800, 1.02, -0.02), "Grup kelas"],
              ["Display 20/700 · judul kartu / TopBar", d(20, 700, 1.25), "Normalisasi tanpa pusing"],
              ["Display 18/700 · SectionTitle", d(18, 700), "Per mata kuliah"],
              ["Sans 16/700 · judul baris", s(16, 700, 1.25), "Basis Data Lanjut"],
              ["Sans 15/400 · isi & input", s(15, 400, 1.5), "Gunakan akun kampus berakhiran @students.untidar.ac.id"],
              ["Sans 13/600 · label", s(13, 600, 1.2), "Mata kuliah"],
              ["Sans 12/400 · muted", s(12, 400, 1.4), "SI-4B · PJ Dimas Aryo · 38 anggota"],
              ["Eyebrow 11/700 · 0.16em", s(11, 700, 1.4, 0.16), "Perpustakaan prodi"],
            ].map(([label, st, sample]) => (
              <div key={label as string}>
                <div className="text-muted" style={s(10, 500, 1.2)}>{label as string}</div>
                <div className={(label as string).startsWith("Eyebrow") ? "text-brand-700" : (label as string).includes("muted") ? "text-muted" : ""} style={st as React.CSSProperties}>{sample as string}</div>
              </div>
            ))}
          </div>
        </Block>
        <Block title="Radius & bayangan" note="Common.kt · cardShadow / popShadow / brandShadow (versi CSS = perkiraan elevasi Android)">
          <div className="grid grid-cols-3 gap-4">
            {[["Card 28dp", "sh-card rounded-[28px] bg-white"], ["Pop 24dp", "sh-pop rounded-[24px] bg-white"], ["Brand btn", "sh-brand rounded-2xl bg-brand-500 text-white"], ["Sheet 32dp", "rounded-[32px] bg-paper2"], ["Field 16dp", "rounded-2xl bg-paper2"], ["Pill penuh", "rounded-full border border-line bg-white"]].map(([n, c]) => (
              <div key={n} className={`flex h-20 items-center justify-center text-center ${c}`} style={s(11, 600, 1.2)}>{n}</div>
            ))}
          </div>
        </Block>
      </div>

      <Block title="Tombol" note="KarsaButton: Sm 36dp (pil) · Md 48dp (r16) · Lg 56dp (r20)">
        <div className="space-y-3">
          {variants.map((v) => (
            <div key={v} className="flex flex-wrap items-center gap-2.5">
              <span className="w-20 text-muted" style={s(10, 600, 1.2)}>{v}</span>
              <Button variant={v} size="sm">Simpan</Button>
              <Button variant={v} size="md" leading={<Plus size={16} />}>Simpan</Button>
              <Button variant={v} size="lg">Simpan</Button>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="w-20 text-muted" style={s(10, 600, 1.2)}>disabled/loading</span>
            <Button disabled>Nonaktif</Button>
            <Button variant="outline" disabled>Outline</Button>
            <Button loading>Memuat</Button>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-20 text-muted" style={s(10, 600, 1.2)}>icon button</span>
            <IconButton><Bell size={20} /></IconButton>
            <IconButton variant="ghost"><Trash2 size={20} /></IconButton>
            <IconButton variant="dark"><PenLine size={20} /></IconButton>
          </div>
        </div>
      </Block>

      <Block title="Avatar, badge, chip, segmented">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            {tones.map((t) => <Avatar key={t} name={`Nama ${t}`} tone={t} size={44} />)}
            <Avatar name="Basis Data" size={52} square tone="brand" />
            <Avatar name="Aulia R" size={26} border={2} />
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => <Badge key={b} tone={b}>{b.toUpperCase()}</Badge>)}
            <Badge tone="dark" icon={<Lock size={12} />}>PJ KELAS</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[1, 2, 3, 4].map((n) => <PointBadge key={n} points={n} />)}
            <PointBadge points={4} large />
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip selected>Terbaru</Chip>
            <Chip>Trending 7 hari</Chip>
            <Chip icon={<Check size={14} />}>Dengan ikon</Chip>
          </div>
          <Segmented value="a" options={[{ value: "a", label: "Laporan saya" }, { value: "b", label: "Peringkat" }]} />
        </div>
      </Block>

      <Block title="Input" note="Fokus: latar putih + ring 2dp Brand400 (coba ketuk kolom)">
        <div className="space-y-4">
          <Field label="Nama yang ditampilkan" hint="Teks bantu 12sp muted"><TextField value="Nadia Putri Maharani" /></Field>
          <Field label="Catatan"><TextField multiline placeholder="Opsional · misalnya: presentasi kelompok 3" /></Field>
          <SearchField placeholder="Cari judul artikel di prodimu" />
          <SelectTrigger label="Fakultas" placeholder="Pilih fakultas" />
          <SelectTrigger label="Kelas" value="SI-4B" placeholder="" optional />
        </div>
      </Block>

      <Block title="Kondisi kosong, error, skeleton">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[28px] border border-ink/5 bg-white"><EmptyState title="Belum ada artikel" desc="Saat ada tulisan baru dari prodimu, artikel itu akan muncul di sini." icon={<FileText size={36} />} /></div>
          <div className="rounded-[28px] border border-ink/5 bg-white"><ErrorState /></div>
          <div className="space-y-2 rounded-[28px] border border-ink/5 bg-white p-5">
            <div className="flex items-center gap-3"><Skeleton round className="size-10" /><div className="flex-1 space-y-2"><Skeleton className="h-3.5 w-1/2" /><Skeleton className="h-3 w-1/3" /></div></div>
            <Skeleton className="mt-4 h-5 w-4/5" /><Skeleton className="h-3.5 w-full" /><Skeleton className="h-3.5 w-2/3" />
          </div>
          <div className="relative h-40 overflow-hidden rounded-[28px] bg-brand-500"><Kawung /><div className="relative p-5 text-white" style={s(13, 600, 1.4)}>KawungPattern<br /><span style={s(11, 400)}>motif 4 elips · tile 44dp</span></div></div>
        </div>
      </Block>

      <Block title="Toast (snackbar)" note="3 nada + aksi opsional · muncul di atas Dock (140dp dari bawah)">
        <div className="space-y-3">
          {(["success", "neutral", "error"] as const).map((t) => (
            <div key={t} className="relative h-16"><Toast tone={t} msg={t === "success" ? "Selamat datang, Nadia!" : t === "neutral" ? "Tautan artikel disalin" : "Koneksi terputus. Coba lagi."} action={t === "success" ? "Lihat" : undefined} bottom={0} /></div>
          ))}
        </div>
      </Block>

      <Block title="Menu pop-up (⋮)" note="Panel 240dp, radius 22, ikon 32dp di tile Paper2, pendar Brand200">
        <div className="flex justify-center py-2">
          <PopMenuPanel entries={[{ label: "Tulisan saya", icon: <FileText size={18} /> }, { label: "Impor .docx", icon: <Inbox size={18} /> }, { label: "Hapus draf", icon: <Trash2 size={18} />, danger: true }]} />
        </div>
      </Block>

      <Block title="Logo" note="LogoMark: 4 kelopak kawung yang bertemu di satu titik · tile Brand500 / Espresso">
        <div className="flex items-center gap-4">
          <LogoMark size={64} />
          <LogoMark size={64} tile="#2A1A10" ink="#FFA762" radius={20} />
          <LogoMark size={40} />
        </div>
      </Block>

      <Block title="Dock navigasi" note="Pil Espresso 82dp + tombol tengah 68dp (Input poin) bila punya hak mencatat poin">
        <div className="space-y-3">
          {[["PJ (5 tab)", PJ_TABS, "aktivitas"], ["Mahasiswa (4 tab)", MHS_TABS, "poinku"]].map(([n, t, a]) => (
            <div key={n as string}>
              <div className="mb-1 text-muted" style={s(11, 600, 1.2)}>{n as string}</div>
              <div className="relative mx-auto h-[130px] w-[390px] max-w-full overflow-hidden rounded-3xl bg-paper2">
                <Dock tabs={t as typeof PJ_TABS} active={a as "poinku"} />
              </div>
            </div>
          ))}
        </div>
      </Block>
    </div>
  );
}
