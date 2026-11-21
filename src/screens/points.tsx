import type { ReactNode } from "react";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Crown,
  EllipsisVertical,
  FileBarChart,
  GraduationCap,
  History,
  NotebookPen,
  ScanSearch,
  Search,
  ShieldAlert,
  ShieldCheck,
  SearchX,
  Trash2,
  Trophy,
} from "lucide-react";
import { Body, MHS_TABS, PJ_TABS, Phone } from "../phone";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Chip,
  Dialog,
  EmptyState,
  Eyebrow,
  Field,
  IconButton,
  Kawung,
  OptionRow,
  PageHeader,
  PointBadge,
  SearchField,
  SelectTrigger,
  Segmented,
  Sheet,
  TextField,
  Toast,
  TopBar,
  cn,
  d,
  s,
} from "../ui";
import { CATEGORIES, COURSES, HISTORY, RANK_OPTIONS, RANK_ROWS, REPORT_COURSES, STUDENTS, maskNim, nimLabel } from "../data";

/* ═══════════════ INPUT POIN ═══════════════ */
type StepSt = "done" | "active" | "todo";
function Step({ n, title, st, last, summary, children }: { n: number; title: string; st: StepSt; last?: boolean; summary?: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full",
            st === "done" && "bg-leaf-500 text-white",
            st === "active" && "sh-brand bg-brand-500 text-white",
            st === "todo" && "bg-paper2 text-muted",
          )}
          style={d(14, 700, 1)}
        >
          {st === "done" ? <CheckIc /> : n}
        </div>
        {!last && <div className={cn("mt-1.5 w-0.5 flex-1", st === "done" ? "bg-leaf-500/35" : "bg-paper3")} />}
      </div>
      <div className={cn("min-w-0 flex-1", !last && "pb-6")}>
        <div className="flex h-8 items-center justify-between">
          <span className={st === "todo" ? "text-muted" : "text-ink"} style={s(15, 700, 1.3)}>{title}</span>
          {st === "done" && <span className="rounded-full px-2 py-1 text-brand-700" style={s(13, 600, 1.3)}>Ubah</span>}
        </div>
        {st === "active" ? <div className="rise pt-3">{children}</div> : <div className="pt-0.5">{summary}</div>}
      </div>
    </div>
  );
}
const CheckIc = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);
const sumText = (t: string, muted?: boolean) => <div className={muted ? "text-muted/80" : "text-ink2"} style={s(muted ? 13 : 15, 400, 1.5)}>{t}</div>;

export type InputVariant = "step1" | "step2" | "recents" | "step3" | "ready" | "sheet" | "saved";
export function InputScreen({ variant }: { variant: InputVariant }) {
  const stage = variant === "step1" || variant === "sheet" ? 1 : variant === "step2" || variant === "recents" ? 2 : 3;
  const ready = variant === "ready" || variant === "saved";
  const stu = STUDENTS[0];
  const done1 = stage >= 2 || true;
  const st = (n: number): StepSt => (n === stage ? "active" : n < stage ? "done" : "todo");
  const doneSteps = [stage > 1, stage > 2 || ready, ready];
  const hint = ready ? "Siap: +3 untuk Aulia Rahmawati" : stage === 1 ? "Langkah 1 dari 3 · Pilih matkul" : stage === 2 ? "Langkah 2 dari 3 · Pilih mahasiswa" : "Langkah 3 dari 3 · Pilih kategori";
  void done1;
  return (
    <Phone
      tabs={PJ_TABS}
      active="input"
      fixed={variant === "sheet"}
      toast={variant === "saved" ? <Toast msg="+3 poin tercatat untuk Aulia Rahmawati" action="Lihat" bottom={252} /> : undefined}
      overlay={
        variant === "sheet" ? (
          <Sheet title="Pilih mata kuliah">
            <div className="space-y-1.5">
              {COURSES.filter((c) => c.pjMe).map((c, i) => (
                <OptionRow key={c.id} label={`${c.name} · ${c.kelas}`} sub={`${c.members} mahasiswa`} selected={i === 0} />
              ))}
            </div>
          </Sheet>
        ) : undefined
      }
    >
      <PageHeader title="Input poin" eyebrow={<Badge tone="dark" icon={<ShieldCheck size={12} />}>PJ KELAS</Badge>} subtitle="Catat kontribusi mahasiswa" />
      <Body className="pb-[300px]">
        <Card className="max-w-[480px]">
          <div className="p-6">
            <Step n={1} title="Mata kuliah" st={st(1)} summary={sumText("Basis Data Lanjut · SI-4B")}>
              <SelectTrigger placeholder="Pilih mata kuliah" />
              <div className="mt-2 flex items-center gap-1.5 text-muted" style={s(12, 400, 1.4)}>
                <ShieldCheck size={14} className="text-brand-500" /> Daftar kelas mengikuti penugasan PJ.
              </div>
            </Step>
            <Step
              n={2}
              title="Mahasiswa"
              st={st(2)}
              summary={
                stage > 2 || ready ? (
                  <div className="flex items-center gap-3 rounded-2xl bg-paper2 py-2.5 pl-2.5 pr-4">
                    <Avatar name={stu.name} size={38} />
                    <div>
                      <div style={s(15, 600, 1.3)}>{stu.name}</div>
                      <div className="text-muted" style={s(12, 400, 1.4)}>{nimLabel(stu.nim)}</div>
                    </div>
                  </div>
                ) : (
                  sumText("Cari berdasarkan nama atau NIM", true)
                )
              }
            >
              <SearchField placeholder="Cari nama atau NIM" value={variant === "step2" ? "aul" : undefined} />
              {variant === "step2" ? (
                <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-white">
                  {[STUDENTS[0], STUDENTS[8]].map((x, i) => (
                    <div key={x.nim}>
                      {i > 0 && <div className="h-px bg-line" />}
                      <div className="flex items-center gap-3 px-3.5 py-3">
                        <Avatar name={x.name} size={40} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate" style={s(15, 600, 1.3)}>{x.name}</div>
                          <div className="text-muted" style={s(12, 400, 1.4)}>{nimLabel(x.nim)}</div>
                        </div>
                        <ChevronRight size={20} className="text-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="mt-2 pl-1 text-muted" style={s(12, 400, 1.625)}>Nama, NIM, atau 2-4 digit terakhir. Minimal 3 huruf atau 2 digit.</div>
                  <div className="mt-4">
                    <div className="flex items-center gap-1.5 text-muted" style={s(12, 600, 1.4)}><Clock size={14} /> Baru-baru ini</div>
                    <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
                      {[STUDENTS[0], STUDENTS[3], STUDENTS[8]].map((x) => (
                        <div key={x.nim} className="flex shrink-0 items-center gap-2 rounded-full bg-paper2 py-1 pl-1 pr-3.5">
                          <Avatar name={x.name} size={26} />
                          <span style={s(13, 600, 1.3)}>{x.name.split(" ")[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </Step>
            <Step n={3} title="Kontribusi" st={st(3)} last summary={sumText(ready ? "Menjawab pertanyaan · +3 poin" : "Kategori, poin, dan catatan", !ready)}>
              <div className="space-y-5">
                <SelectTrigger label="Kategori" value={ready ? CATEGORIES[1] : undefined} placeholder="Pilih kategori kontribusi" />
                <div>
                  <div className="mb-2 text-ink2" style={s(13, 600, 1.4)}>Poin</div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((v) => (
                      <div key={v} className={cn("flex flex-1 items-center justify-center rounded-2xl py-3.5", v === 3 ? "bg-brand-500 text-white" : "bg-paper2 text-ink")} style={d(26, 800, 1)}>{v}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-ink2" style={s(13, 600, 1.4)}>Catatan</div>
                  <TextField multiline minHeight={84} placeholder="Opsional · misalnya: presentasi kelompok 3" />
                  <div className="mt-1 text-right text-muted" style={s(11, 400, 1.2)}>0/500</div>
                </div>
              </div>
            </Step>
          </div>
        </Card>
      </Body>
      <div className="absolute inset-x-3 bottom-[134px] z-10">
        <div className="sh-pop rounded-[28px] bg-white p-3.5">
          <div className="mb-3 flex items-center gap-3 px-1">
            <div className="flex gap-1">
              {doneSteps.map((x, i) => <div key={i} className={cn("h-1.5 w-5 rounded-full", x ? "bg-leaf-500" : "bg-paper3")} />)}
            </div>
            <span className={cn("truncate", ready ? "text-leaf-600" : "text-ink2")} style={s(12, 600, 1.4)}>{hint}</span>
          </div>
          <Button size="lg" full disabled={!ready}>Input poin</Button>
        </div>
      </div>
    </Phone>
  );
}

/* ═══════════════ AKTIVITAS / RUANG PJ ═══════════════ */
export function ActivityScreen() {
  return (
    <Phone tabs={PJ_TABS} active="aktivitas">
      <PageHeader title="Ruang PJ" eyebrow={<Eyebrow>Aktivitas</Eyebrow>} subtitle="Pantau poin yang kamu catat untuk kelas." />
      <Body dock gap={16}>
        <div className="rise sh-card rounded-[32px] bg-espresso p-5">
          <div className="relative">
            <Kawung alpha={0.14} />
            <div className="relative">
              <div className="text-brand-300" style={s(11, 700, 1.4, 0.16)}>7 HARI TERAKHIR</div>
              <div className="mt-3 flex">
                {[[7, "Entri"], [6, "Mahasiswa"], [16, "Total poin"]].map(([v, l]) => (
                  <div key={l as string} className="flex-1">
                    <div className="text-white" style={d(34, 800, 1)}>{v}</div>
                    <div className="text-white/55" style={s(12, 400, 1.4)}>{l}</div>
                  </div>
                ))}
              </div>
              <Button size="lg" full className="mt-5" leading={<NotebookPen size={20} />}>Input poin mahasiswa</Button>
            </div>
          </div>
        </div>
        <Card>
          <div className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600"><History size={24} /></div>
              <div className="flex-1">
                <div style={d(20, 700, 1.25)}>Riwayat Poin</div>
                <div className="text-muted" style={s(13, 400, 1.4)}>11 entri tercatat</div>
              </div>
              <ChevronRight size={20} className="text-muted" />
            </div>
            <div className="mt-4 space-y-2.5">
              {HISTORY[0].items.map((e) => (
                <div key={e.nim} className="flex items-center gap-3 rounded-2xl bg-paper2 px-3 py-2.5">
                  <div className="flex size-8 items-center justify-center rounded-xl bg-white text-brand-700" style={d(14, 800, 1)}>+{e.poin}</div>
                  <span className="flex-1 truncate" style={s(13, 600, 1.4)}>{e.name}</span>
                  <span className="text-muted" style={s(12, 400, 1.4)}>{e.time}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <div className="flex gap-4">
          <div className="sh-brand relative flex h-[156px] flex-1 flex-col justify-between overflow-hidden rounded-[28px] bg-brand-500 p-5">
            <Kawung alpha={0.16} />
            <div className="relative flex size-10 items-center justify-center rounded-xl bg-white/20 text-white"><FileBarChart size={20} /></div>
            <div className="relative text-white">
              <div style={d(40, 800, 1)}>26</div>
              <div style={s(14, 700, 1.3)}>Laporan Saya</div>
            </div>
          </div>
          <div className="flex h-[156px] flex-1 flex-col justify-between rounded-[28px] bg-butter-100 p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-butter-400/60 text-butter-700"><Trophy size={20} /></div>
            <div>
              <div className="text-butter-700" style={d(40, 800, 1)}>#5</div>
              <div style={s(14, 700, 1.3)}>Peringkat Kelas</div>
            </div>
          </div>
        </div>
      </Body>
    </Phone>
  );
}

/* ═══════════════ RIWAYAT ═══════════════ */
export function HistoryScreen({ overlay }: { overlay?: "menu" | "confirm" | "empty" }) {
  const e = HISTORY[0].items[0];
  return (
    <Phone
      fixed={overlay === "menu" || overlay === "confirm"}
      toast={overlay === "empty" ? <Toast msg="Entri dihapus dan tercatat di audit log" tone="neutral" bottom={40} /> : undefined}
      overlay={
        overlay === "menu" ? (
          <Sheet title="Opsi entri">
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3">
              <PointBadge points={e.poin} />
              <div className="min-w-0 flex-1">
                <div style={s(14, 700, 1.3)}>{e.name}</div>
                <div className="truncate text-muted" style={s(12, 400, 1.4)}>{e.cat} · {e.course}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-danger-100 px-4 py-4 text-danger-500">
              <Trash2 size={20} />
              <div>
                <div style={s(15, 600, 1.3)}>Hapus entri</div>
                <div className="opacity-80" style={s(12, 400, 1.4)}>Tercatat di audit log</div>
              </div>
            </div>
          </Sheet>
        ) : overlay === "confirm" ? (
          <Dialog tone="danger" title="Hapus entri poin ini?" desc={`+${e.poin} untuk ${e.name} akan dihapus. Tindakan ini tercatat di audit log dan tidak bisa dibatalkan.`} confirm="Hapus" />
        ) : undefined
      }
    >
      <TopBar title="Riwayat poin" subtitle={overlay === "empty" ? "0 entri" : "6 entri"} />
      <div className="shrink-0 space-y-3 px-5 pb-3 pt-1">
        <SearchField placeholder="Nama, akhir NIM, atau kategori" value={overlay === "empty" ? "zzz" : undefined} />
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
          <Chip selected>Semua matkul</Chip>
          <Chip>Basis Data Lanjut</Chip>
          <Chip>Pemrograman Web</Chip>
        </div>
      </div>
      <Body className="pb-6">
        {overlay === "empty" ? (
          <Card>
            <EmptyState title="Tidak ada hasil" desc="Coba kata kunci lain, atau ganti filter mata kuliah." icon={<ScanSearch size={36} />} action={<Button variant="soft">Reset filter</Button>} />
          </Card>
        ) : (
          <div className="space-y-6">
            {HISTORY.map((g) => (
              <div key={g.day}>
                <div className="flex items-center justify-between px-1 py-1.5">
                  <span style={s(13, 700, 1.4)}>{g.day}</span>
                  <span className="text-muted" style={s(12, 400, 1.4)}>{g.date}</span>
                </div>
                <div className="space-y-3">
                  {g.items.map((it) => (
                    <Card key={it.nim + it.time}>
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <PointBadge points={it.poin} />
                          <div className="min-w-0 flex-1">
                            <div className="truncate" style={s(15, 700, 1.25)}>{it.name}</div>
                            <div className="text-muted" style={s(12, 400, 1.4)}>{it.nim}</div>
                          </div>
                          <IconButton variant="ghost" className="text-muted"><EllipsisVertical size={20} /></IconButton>
                        </div>
                        <div className="mt-3 text-ink2" style={s(13, 600, 1.4)}>{it.cat} · {it.course}</div>
                        <div className="text-muted" style={s(12, 400, 1.4)}>{it.kelas} · {it.time}</div>
                        {it.note && <div className="mt-3 rounded-xl bg-paper2 px-3.5 py-2.5 text-ink2" style={s(13, 400, 1.625)}>“{it.note}”</div>}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 flex gap-3 rounded-2xl bg-butter-100/70 px-4 py-3.5 text-butter-700">
          <ShieldAlert size={16} className="mt-0.5 shrink-0" />
          <span style={s(13, 400, 1.625)}>Setiap penghapusan tercatat di audit log dan dapat ditinjau dosen.</span>
        </div>
      </Body>
    </Phone>
  );
}

/* ═══════════════ LAPORAN SAYA ═══════════════ */
function ReportView() {
  const max = Math.max(...REPORT_COURSES.map((c) => c.total));
  const total = REPORT_COURSES.reduce((a, c) => a + c.total, 0);
  return (
    <div>
      <div className="rise sh-brand relative overflow-hidden rounded-[32px] bg-brand-500 p-6">
        <Kawung alpha={0.16} />
        <div className="absolute -right-4 -top-4 size-44 rounded-full" style={{ background: "radial-gradient(circle,rgba(255,167,98,.5),transparent 70%)" }} />
        <div className="relative">
          <div className="text-white/85" style={s(14, 600, 1.4)}>Total poin keaktifan</div>
          <div className="text-white" style={d(56, 800, 1, -0.02)}>{total}</div>
          <div className="mt-4 text-white/90" style={s(13, 600, 1.4)}>SI-4B · Sistem Informasi · Semester 4</div>
          <div className="mt-4 flex gap-2">
            {["4 matkul", "9 kontribusi"].map((t) => <span key={t} className="rounded-full bg-white/20 px-3 py-1.5 text-white" style={s(12, 700, 1.3)}>{t}</span>)}
          </div>
        </div>
      </div>
      <div className="mt-7 px-1" style={d(18, 700)}>Per mata kuliah</div>
      <div className="mt-3 space-y-3">
        {[...REPORT_COURSES].sort((a, b) => b.total - a.total).map((c, i) => (
          <Card key={c.id}>
            <div className="flex items-center gap-3 p-4">
              <Avatar name={c.name} size={44} square />
              <div className="min-w-0 flex-1">
                <div className="truncate" style={s(15, 700, 1.25)}>{c.name}</div>
                <div className="text-muted" style={s(11, 500, 1.3)}>{c.code} · PJ {c.pj}</div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper2">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${Math.max(2, (c.total / max) * 100)}%` }} />
                </div>
              </div>
              <div className="text-right">
                <div style={d(24, 800, 1)}>{c.total}</div>
                <div className="text-muted" style={s(11, 400, 1.3)}>{c.entries.length} entri</div>
              </div>
              <ChevronDown size={20} className={cn("text-muted transition-transform", i === 0 && "rotate-180")} />
            </div>
            {i === 0 && (
              <div className="bg-paper/60">
                <div className="h-px bg-line" />
                {c.entries.map((e, j) => (
                  <div key={j} className="flex items-start gap-3 px-4 py-3.5">
                    <PointBadge points={e.poin} />
                    <div className="min-w-0 flex-1">
                      <div style={s(14, 600, 1.375)}>{e.cat}</div>
                      <div className="text-muted" style={s(12, 400, 1.4)}>{e.date} · {e.time}</div>
                      {e.note && <div className="mt-1.5 text-ink2" style={s(13, 400, 1.625)}>“{e.note}”</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ PERINGKAT ═══════════════ */
function RankingView() {
  const rows = RANK_ROWS;
  const top = rows.slice(0, 3);
  const rest = rows.slice(3);
  const myRank = rows.findIndex((r) => r.me) + 1;
  const cell = (row: (typeof rows)[number], rank: number, h: number, bar: string, av: number) => (
    <div className="flex flex-1 flex-col items-center">
      <div className="relative">
        {rank === 1 && <Crown size={24} className="absolute -top-6 left-1/2 -translate-x-1/2 text-butter-400" />}
        <Avatar name={row.name} size={av} border={row.me ? 3 : undefined} borderColor="#E36B0F" />
      </div>
      <div className="mt-2 w-full truncate text-center" style={s(13, 700, 1.3)}>{row.me ? "Kamu" : row.name.split(" ")[0]}</div>
      <div className="text-muted" style={s(12, 600, 1.3)}>{row.total} poin</div>
      <div className={cn("mt-2 flex w-full items-center justify-center rounded-t-[20px]", bar)} style={{ height: h, ...d(36, 800, 1) }}>{rank}</div>
    </div>
  );
  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
        {RANK_OPTIONS.map((o, i) => <Chip key={o} selected={i === 0}>{o}</Chip>)}
      </div>
      <div className="h-5" />
      <div className="rise sh-card relative overflow-hidden rounded-[32px] bg-white px-4 pt-8">
        <Kawung color="#26180f" alpha={0.07} />
        <div className="relative flex h-[230px] items-end">
          {cell(top[1], 2, 96, "bg-espresso text-white", 52)}
          {cell(top[0], 1, 128, "bg-brand-500 text-white", 62)}
          {cell(top[2], 3, 72, "bg-butter-100 text-butter-700", 52)}
        </div>
      </div>
      <div className="mt-7 px-1" style={d(18, 700)}>Peringkat lainnya</div>
      <div className="mt-3 space-y-2.5">
        {rest.map((r, i) => (
          <div key={r.nim} className={cn("flex items-center gap-3 rounded-[22px] bg-white py-3 pl-3 pr-4", r.me ? "border-2 border-brand-500" : "border border-ink/5")}>
            <span className="w-8 text-center text-muted" style={d(18, 800, 1)}>{i + 4}</span>
            <Avatar name={r.name} size={40} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate" style={s(14, 700, 1.3)}>{r.name}</span>
                {r.me && <Badge tone="solid">KAMU</Badge>}
              </div>
              <div className="text-muted" style={s(12, 400, 1.4)}>{r.me ? r.nim : maskNim(r.nim)}</div>
            </div>
            <span style={d(20, 800, 1)}>{r.total}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-center">
        <Button variant="dark" size="lg" leading={<ScanSearch size={20} />}>Lihat posisiku · #{myRank}</Button>
      </div>
    </div>
  );
}

export function ReportScreen() {
  return (
    <Phone>
      <TopBar title="Laporan saya" subtitle="Poin keaktifan semester ini" />
      <Body className="pt-2"><ReportView /></Body>
    </Phone>
  );
}
export function RankingScreen() {
  return (
    <Phone>
      <TopBar title="Partisipasi teratas" subtitle="SI-4B · Sistem Informasi" />
      <Body className="pt-2"><RankingView /></Body>
    </Phone>
  );
}

/* ═══════════════ POINKU (tab mahasiswa) ═══════════════ */
export function PoinkuScreen({ seg }: { seg: "laporan" | "peringkat" | "kosong" }) {
  return (
    <Phone tabs={MHS_TABS} active="poinku">
      <PageHeader
        title={seg === "peringkat" ? "Partisipasi teratas" : "Poinku"}
        eyebrow={<Eyebrow>Poin keaktifan</Eyebrow>}
        subtitle={seg === "peringkat" ? "SI-4B · Sistem Informasi" : "Rekap kontribusimu di kelas."}
      />
      <div className="shrink-0 px-5 pb-4">
        <Segmented value={seg === "peringkat" ? "p" : "l"} options={[
          { value: "l", label: "Laporan saya", icon: <FileBarChart size={16} /> },
          { value: "p", label: "Peringkat", icon: <Trophy size={16} /> },
        ]} />
      </div>
      <Body dock>
        {seg === "laporan" && <ReportView />}
        {seg === "peringkat" && <RankingView />}
        {seg === "kosong" && (
          <Card><EmptyState title="Belum ada laporan" desc="Kelas atau semester aktif angkatanmu belum tersedia." icon={<FileBarChart size={36} />} /></Card>
        )}
      </Body>
    </Phone>
  );
}

export { Field, GraduationCap, Search, SearchX };
