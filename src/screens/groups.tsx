import type { ReactNode } from "react";
import {
  Ban,
  ChevronRight,
  Copy,
  EyeOff,
  Flag,
  Lock,
  LockOpen,
  MessagesSquare,
  Pencil,
  Pin,
  Reply,
  Search,
  Send,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { Body, MHS_TABS, PJ_TABS, Phone } from "../phone";
import {
  ActionRow,
  Avatar,
  Badge,
  Button,
  Card,
  Dialog,
  EmptyState,
  Eyebrow,
  Field,
  IconButton,
  PageHeader,
  SearchField,
  Sheet,
  TextField,
  Toast,
  TopBar,
  cn,
  s,
  toneFor,
  toneName,
} from "../ui";
import { CHAT, COURSES } from "../data";

const PREVIEW: Record<string, [string, string]> = {
  c1: ["Terima kasih ya, sangat membantu!", "12 mnt"],
  c2: ["Oke, sudah kuikuti. Terima kasih Nadia!", "2 j"],
  c3: ["Hasil heuristic evaluation kelompok 1–4 sudah diunggah.", "6 j"],
  c4: ["Besok bawa tabel distribusi t ya.", "25 mnt"],
  c5: ["Jadwal presentasi kelompok: Selasa pukul 13.00, ruang B2.", "Kemarin"],
};

/* ═══════════════ DAFTAR GRUP ═══════════════ */
export function GroupList({ variant = "list" }: { variant?: "list" | "empty" | "noResult" }) {
  const isPj = true;
  return (
    <Phone tabs={isPj ? PJ_TABS : MHS_TABS} active="grup">
      <PageHeader title="Grup kelas" eyebrow={<Eyebrow>Percakapan</Eyebrow>} subtitle="Percakapan kelas tetap dekat." />
      <div className="shrink-0 px-5 pb-4">
        <SearchField placeholder="Cari matkul atau kelas" value={variant === "noResult" ? "fisika" : undefined} />
      </div>
      <Body dock>
        {variant === "empty" ? (
          <Card><EmptyState title="Belum bergabung ke grup" desc="Grup otomatis muncul setelah kamu terdaftar di mata kuliah semester ini." icon={<MessagesSquare size={36} />} /></Card>
        ) : variant === "noResult" ? (
          <Card><EmptyState title="Grup tidak ditemukan" desc="Tidak ada matkul atau kelas bernama “fisika”." icon={<Search size={36} />} action={<Button variant="soft">Hapus pencarian</Button>} /></Card>
        ) : (
          <div className="space-y-3">
            {COURSES.map((c, i) => (
              <div key={c.id} className="rise" style={{ animationDelay: `${i * 45}ms` }}>
                <Card>
                  <div className="flex gap-3.5 p-4">
                    <Avatar name={c.name} size={52} tone={c.tone} square />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex min-w-0 items-center gap-1.5">
                          <span className="truncate" style={s(16, 700, 1.25)}>{c.name}</span>
                          {c.locked && <Lock size={14} className="shrink-0 text-muted" />}
                        </div>
                        <span className="text-muted" style={s(11, 600, 1.3)}>{PREVIEW[c.id][1]}</span>
                      </div>
                      <div className="truncate text-muted" style={s(12, 400, 1.4)}>
                        {c.kelas} · {c.pjMe ? "Kamu PJ" : `PJ ${c.pjOther}`} · {c.members} anggota
                      </div>
                      <div className="mt-2 truncate text-ink2" style={s(14, 400, 1.4)}>{PREVIEW[c.id][0]}</div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </Body>
    </Phone>
  );
}

/* ═══════════════ OBROLAN ═══════════════ */
const nameOf = (m: (typeof CHAT)[number]) => (m.from === "me" ? "Kamu" : m.name ?? "Anggota");

function Bubble({ m, hl }: { m: (typeof CHAT)[number]; hl?: boolean }) {
  const mine = m.from === "me";
  const name = nameOf(m);
  const isPj = m.name === "Dimas Aryo";
  if (m.deleted)
    return (
      <div className={cn("flex items-end", mine ? "justify-end" : "justify-start")}>
        {!mine && <div className="mb-0.5 mr-2"><Avatar name={name} size={30} /></div>}
        <div className="flex items-center gap-2 rounded-[20px] border border-paper3 px-4 py-2.5 text-muted" style={s(13, 400, 1.3)}>
          <Ban size={14} /> Pesan ini telah dihapus
        </div>
      </div>
    );
  if (m.hidden)
    return (
      <div className="flex items-end">
        <div className="mb-0.5 mr-2"><Avatar name={name} size={30} /></div>
        <div className="flex items-center gap-2 rounded-[20px] bg-paper3/50 px-4 py-2.5 text-muted" style={s(13, 400, 1.3)}>
          <EyeOff size={14} /> Pesan disembunyikan oleh PJ
        </div>
      </div>
    );
  const sub = mine ? "text-white/75" : "text-muted";
  return (
    <div className={cn("flex items-end", mine ? "justify-end" : "justify-start")}>
      {!mine && <div className="mb-0.5 mr-2"><Avatar name={name} size={30} /></div>}
      <div
        className={cn(
          "max-w-[300px] rounded-[22px] px-4 py-2.5",
          mine ? "rounded-br-lg bg-brand-500" : "rounded-bl-lg bg-white",
          !mine && (m.pinned || hl ? "border-2 border-brand-300" : "border border-ink/5"),
        )}
      >
        {!mine && (
          <div className="mb-0.5 flex items-center gap-1.5">
            <span className={toneName[toneFor(name)]} style={s(12, 700, 1.4)}>{name}</span>
            {isPj && <Badge>PJ</Badge>}
          </div>
        )}
        {m.reply && (
          <div className={cn("mb-1.5 rounded-lg px-2.5 py-1.5", mine ? "bg-white/15" : "bg-paper2")}>
            <div className={mine ? "text-white" : "text-brand-700"} style={s(11, 700, 1.3)}>{m.reply.name}</div>
            <div className={cn("line-clamp-2", mine ? "text-white/85" : "text-ink2")} style={s(12, 400, 1.4)}>{m.reply.text}</div>
          </div>
        )}
        <div className={mine ? "text-white" : "text-ink"} style={s(15, 400, 1.375)}>{m.text}</div>
        <div className={cn("mt-1 flex items-center justify-end gap-1.5", sub)} style={s(11, 400, 1.3)}>
          {m.pinned && <Pin size={12} />}
          {m.edited && <span>diedit</span>}
          <span>{m.time}</span>
        </div>
      </div>
    </div>
  );
}

export type ChatOverlay = "actions" | "actionsManager" | "pins" | "report" | "hide" | "block" | "delete" | "unblock";
const REASONS = ["Spam atau promosi", "Ujaran kasar atau pelecehan", "Konten tidak pantas", "Informasi menyesatkan", "Lainnya"];

export function ChatScreen({
  manager,
  locked,
  overlay,
  editing,
  replying,
}: {
  manager?: boolean;
  locked?: boolean;
  overlay?: ChatOverlay;
  editing?: boolean;
  replying?: boolean;
}) {
  const course = COURSES[0];
  const canSend = !locked || manager;
  const target = CHAT[2];
  const preview = (
    <div className="rounded-2xl border border-line bg-white p-3.5">
      <div className="text-muted" style={s(12, 700, 1.4)}>{target.name}</div>
      <div className="line-clamp-2 text-ink2" style={s(14, 400, 1.4)}>{target.text}</div>
    </div>
  );
  let ov: ReactNode = null;
  if (overlay === "actions" || overlay === "actionsManager") {
    const mgr = overlay === "actionsManager";
    ov = (
      <Sheet title="Aksi pesan">
        {preview}
        <div className="mt-3">
          <ActionRow icon={<Copy size={20} />} label="Salin teks" />
          <ActionRow icon={<Reply size={20} />} label="Balas pesan" />
          {mgr && <ActionRow icon={<Pin size={20} />} label="Sematkan pesan" sub="Pesan tampil di bagian atas grup" />}
          {mgr && <ActionRow icon={<Pencil size={20} />} label="Edit pesan" />}
          {mgr && <ActionRow icon={<Trash2 size={20} />} label="Hapus pesan" sub="Diganti penanda “telah dihapus”" danger />}
          {mgr && <ActionRow icon={<EyeOff size={20} />} label="Sembunyikan pesan" sub="Disembunyikan untuk seluruh anggota" danger />}
          <ActionRow icon={<Flag size={20} />} label="Laporkan pesan" />
          <ActionRow icon={<Ban size={20} />} label="Blokir Dimas" danger />
        </div>
      </Sheet>
    );
  } else if (overlay === "pins") {
    ov = (
      <Sheet title="Pesan disematkan">
        <div className="space-y-2.5">
          {[CHAT[0]].map((m) => (
            <div key={m.id} className="rounded-2xl border border-line bg-white p-3.5">
              <div className="text-brand-700" style={s(12, 700, 1.4)}>{m.name}</div>
              <div className="line-clamp-2 text-ink2" style={s(14, 400, 1.5)}>{m.text}</div>
              <div className="mt-1 text-muted" style={s(11, 400, 1.3)}>{m.time}</div>
            </div>
          ))}
        </div>
      </Sheet>
    );
  } else if (overlay === "report") {
    ov = (
      <Sheet title="Laporkan pesan" footer={<Button size="lg" full>Kirim laporan</Button>}>
        <div className="text-muted" style={s(14, 400, 1.5)}>Pilih alasan yang paling sesuai. Identitasmu tidak terlihat oleh pelapor lain.</div>
        <div className="mt-3 space-y-2">
          {REASONS.map((r, i) => (
            <div key={r} className={cn("flex items-center gap-3 rounded-2xl px-4 py-3.5", i === 0 ? "bg-brand-100" : "border border-line bg-white")}>
              <div className={cn("flex size-5 items-center justify-center rounded-full border-2", i === 0 ? "border-brand-500" : "border-paper3")}>
                {i === 0 && <div className="size-2.5 rounded-full bg-brand-500" />}
              </div>
              <span className={i === 0 ? "text-brand-700" : "text-ink"} style={s(15, 600, 1.3)}>{r}</span>
            </div>
          ))}
        </div>
        <div className="mt-3.5"><Field label="Keterangan (opsional)"><TextField multiline minHeight={76} placeholder="Tambahkan konteks bila perlu" /></Field></div>
      </Sheet>
    );
  } else if (overlay === "hide") {
    ov = (
      <Dialog tone="danger" title="Sembunyikan pesan" desc="Pesan akan disembunyikan dari seluruh anggota grup. Alasan wajib diisi." confirm="Sembunyikan">
        <div className="mt-3.5"><Field label="Alasan"><TextField multiline minHeight={76} placeholder="Misalnya: keluar dari topik kelas" /></Field></div>
      </Dialog>
    );
  } else if (overlay === "block") {
    ov = <Dialog tone="danger" title="Blokir Intan Kusuma Dewi?" desc="Pesan darinya akan disembunyikan di semua grup. Kamu bisa membuka blokir kapan saja." confirm="Blokir" />;
  } else if (overlay === "unblock") {
    ov = <Dialog title="Buka blokir Intan Kusuma Dewi?" desc="Pesan dari pengguna ini akan terlihat lagi di semua grup." confirm="Buka blokir" />;
  } else if (overlay === "delete") {
    ov = <Dialog tone="danger" title="Hapus pesan ini?" desc="Pesan diganti penanda “Pesan ini telah dihapus” untuk semua anggota grup." confirm="Hapus" />;
  }
  const msgs = overlay === "unblock" ? CHAT : CHAT;
  return (
    <Phone fixed overlay={ov} toast={!overlay && !editing && !replying && manager ? <Toast msg="Pesan disematkan" bottom={96} tone="neutral" /> : undefined}>
      <TopBar
        leading={<Avatar name={course.name} size={40} tone={course.tone} square />}
        title={course.name}
        subtitle={`${course.kelas} · ${course.members} anggota · PJ ${course.pjOther}`}
        right={
          manager ? (
            <div className="flex gap-0.5">
              <IconButton><Flag size={18} /></IconButton>
              <IconButton>{locked ? <LockOpen size={18} /> : <Lock size={18} />}</IconButton>
            </div>
          ) : locked ? (
            <Lock size={16} className="mr-3 text-muted" />
          ) : undefined
        }
      />
      <div className="mx-4 mb-2 flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-white px-3 py-2.5">
        <div className="flex size-8 items-center justify-center rounded-xl bg-brand-100 text-brand-600"><Pin size={16} /></div>
        <div className="min-w-0 flex-1">
          <div className="text-brand-700" style={s(11, 700, 1.4, 0.05)}>DISEMATKAN</div>
          <div className="truncate text-ink2" style={s(13, 400, 1.4)}>{CHAT[0].text}</div>
        </div>
        <ChevronRight size={16} className="text-muted" />
      </div>
      <div className="no-scrollbar min-h-0 flex-1 space-y-2.5 overflow-y-auto bg-paper2/60 p-4">
        {msgs.map((m, i) => (
          <div key={m.id}>
            {m.day && (
              <div className="mb-2.5 flex justify-center">
                <span className="rounded-full bg-white px-3 py-1 text-muted" style={s(11, 700, 1.3)}>{m.day}</span>
              </div>
            )}
            <Bubble m={m} hl={i === 2 && !!overlay && overlay.startsWith("actions")} />
          </div>
        ))}
      </div>
      <div className="shrink-0 border-t border-line bg-paper px-4 pb-6 pt-3">
        {!canSend ? (
          <div className="flex items-center gap-3 rounded-2xl bg-paper2 px-4 py-3.5 text-ink2">
            <Lock size={20} className="shrink-0 text-muted" />
            <span style={s(13, 400, 1.375)}>Grup dikunci. Hanya PJ yang dapat mengirim pesan. Hubungi {course.pjOther} bila ada pertanyaan.</span>
          </div>
        ) : (
          <>
            {locked && (
              <div className="mb-2 ml-1 flex items-center gap-1.5 text-muted" style={s(12, 600, 1.4)}>
                <Lock size={14} /> Grup dikunci. Hanya kamu sebagai PJ yang dapat mengirim.
              </div>
            )}
            {(editing || replying) && (
              <div className="mb-2 flex items-center gap-2 rounded-xl bg-brand-100 px-3 py-2 text-brand-700" style={s(12, 600, 1.4)}>
                {editing ? <Pencil size={14} /> : <Reply size={14} />}
                <span className="flex-1 truncate">{editing ? "Mengedit: Ringkasannya juga sudah kutulis di Karsa Lib…" : "Membalas Aulia Rahmawati"}</span>
                <X size={16} />
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="flex h-12 flex-1 items-center rounded-full border border-line bg-white px-5 text-muted/80" style={s(15, 400, 1.5)}>
                {replying ? "Tulis balasan…" : "Tulis pesan…"}
              </div>
              <div className="flex size-12 items-center justify-center rounded-full bg-paper3 text-muted"><Send size={20} /></div>
            </div>
          </>
        )}
      </div>
    </Phone>
  );
}

/* ═══════════════ LAPORAN GRUP ═══════════════ */
export function GroupReportsScreen({ empty }: { empty?: boolean }) {
  const items = [
    { r: "Spam · Bagas Setiawan", date: "21 Nov 2026", body: "Jual joki tugas murah, hubungi WA 0812xxxxxxx", note: "Berulang kali kirim promosi.", by: "Aulia Rahmawati" },
    { r: "Ujaran kasar atau pelecehan · Kevin Santoso", date: "20 Nov 2026", body: "Jawaban kamu itu asal banget, jangan sok pintar di grup ini.", by: "Intan Kusuma Dewi" },
  ];
  return (
    <Phone>
      <TopBar title="Laporan grup" subtitle={empty ? "0 laporan terbuka" : "2 laporan terbuka"} />
      <Body className="pt-4" gap={12}>
        {empty ? (
          <Card><EmptyState title="Tidak ada laporan terbuka" desc="Laporan anggota yang dapat kamu tangani akan muncul di sini." icon={<ShieldCheck size={36} />} /></Card>
        ) : (
          items.map((it) => (
            <Card key={it.r}>
              <div className="p-4">
                <div className="flex items-center">
                  <span className="flex-1 text-ink" style={s(14, 700, 1.3)}>{it.r}</span>
                  <span className="ml-2 text-muted" style={s(11, 500, 1.3)}>{it.date}</span>
                </div>
                <div className="mt-2 text-ink2" style={s(14, 400, 1.5)}>{it.body}</div>
                {it.note && <div className="mt-1.5 text-muted" style={s(12, 400, 1.45)}>Catatan: {it.note}</div>}
                <div className="mt-2.5 text-muted" style={s(11, 400, 1.3)}>Dilaporkan {it.by}</div>
                <div className="mt-3 flex justify-end gap-2.5">
                  <Button variant="ghost" size="sm">Tutup laporan</Button>
                  <Button variant="dangerSoft" size="sm" leading={<EyeOff size={15} />}>Sembunyikan</Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </Body>
    </Phone>
  );
}
