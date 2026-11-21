import type { ReactNode } from "react";
import {
  Bold,
  BookOpen,
  BookOpenText,
  Check,
  Clock,
  Code,
  ExternalLink,
  Eye,
  Feather,
  FileText,
  FileUp,
  Flag,
  Heading1,
  Heading2,
  Italic,
  Link2,
  List,
  MessageCircle,
  MessagesSquare,
  Pencil,
  PenLine,
  Quote,
  Reply,
  Save,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  UserPen,
  UserRound,
  Zap,
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
  InlineMd,
  Markdown,
  OptionRow,
  PageHeader,
  PopMenu,
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
import type { MenuEntry } from "../ui";
import { ARTICLES, COMMENTS, ME, MY_POSTS, excerpt } from "../data";
import type { Article } from "../data";

const WRITER_MENU: MenuEntry[] = [
  { label: "Tulisan saya", icon: <FileText size={18} /> },
  { label: "Impor .docx", icon: <FileUp size={18} /> },
  { label: "Profil penulis", icon: <UserPen size={18} /> },
];
const READER_MENU: MenuEntry[] = [{ label: "Ajukan akses penulis", icon: <Feather size={18} /> }];

/* ───────── Kartu artikel ───────── */
export function ArticleCard({ a }: { a: Article }) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center gap-3">
          <Avatar name={a.author} size={38} />
          <div className="min-w-0 flex-1">
            <div className="truncate" style={s(14, 700, 1.25)}>{a.author}</div>
            <div className="truncate text-muted" style={s(12, 400, 1.4)}>{a.prodi} · {a.when}</div>
          </div>
          <Badge tone="neutral">{a.tag}</Badge>
        </div>
        <div className="mt-4" style={d(20, 700, 1.2, -0.02)}>{a.title}</div>
        <div className="mt-2 line-clamp-3 text-ink2" style={s(14, 400, 1.625)}>{excerpt(a.body)}</div>
        <div className="mb-3.5 mt-4 h-px bg-line" />
        <div className="flex items-center gap-5 text-muted" style={s(13, 600, 1.3)}>
          <span className="flex items-center gap-1.5"><Eye size={16} />{a.readers} pembaca</span>
          <span className="flex items-center gap-1.5"><MessageCircle size={16} />{a.comments} komentar</span>
        </div>
      </div>
    </Card>
  );
}

function AuthorBanner({ bg, tile, tint, title, body, bodyCls, action }: { bg: string; tile: string; tint: string; title: string; body: string; bodyCls: string; action?: ReactNode }) {
  return (
    <div className={cn("flex items-center gap-4 rounded-[28px] py-4 pl-4 pr-5", bg)}>
      <div className={cn("flex size-12 shrink-0 items-center justify-center rounded-2xl", tile, tint)}><Feather size={24} /></div>
      <div className="min-w-0 flex-1">
        <div style={d(17, 700, 1.25)}>{title}</div>
        <div className={bodyCls} style={s(13, 400, 1.375)}>{body}</div>
      </div>
      {action}
    </div>
  );
}

/* ───────── Form profil (ProfileSetupContent) ───────── */
export function ProfileSetupCard() {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center gap-3.5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-600"><BookOpen size={22} /></div>
          <div className="flex-1">
            <div style={d(18, 700, 1.2)}>Siapkan ruang belajarmu</div>
            <div className="text-muted" style={s(13, 400, 1.5)}>Pilih identitas program studi agar feed menampilkan artikel yang tepat.</div>
          </div>
        </div>
        <div className="mt-5 space-y-[18px]">
          <Field label="Nama yang ditampilkan"><TextField value={ME.name} /></Field>
          <SelectTrigger label="Fakultas" value={ME.fakultas} placeholder="Pilih fakultas" />
          <SelectTrigger label="Program studi" value={ME.prodi} placeholder="Pilih program studi" />
          <SelectTrigger label="Kelas" placeholder="Pilih kelas" optional />
        </div>
        <div className="mt-4 rounded-2xl bg-paper2 px-4 py-3 text-ink2" style={s(12, 400, 1.55)}>
          Fakultas dan program studi tidak dapat diubah setelah disimpan. Pilihan prodi menentukan artikel yang bisa kamu lihat.
        </div>
        <Button size="lg" full className="mt-5">Simpan profil</Button>
      </div>
    </Card>
  );
}

/* ═══════════════ BERANDA KARSA LIB ═══════════════ */
export type LibVariant = "feed" | "banner" | "pending" | "setup" | "menu" | "gate" | "emptySearch" | "loading" | "error";
export function LibHome({ variant, writer = true }: { variant: LibVariant; writer?: boolean }) {
  const canWrite = writer && variant !== "banner" && variant !== "gate" && variant !== "pending";
  const header = (
    <PageHeader
      title="Karsa Lib"
      eyebrow={<Eyebrow>Perpustakaan prodi</Eyebrow>}
      subtitle="Ilmu tumbuh saat dibagikan."
      right={
        <>
          <div className="sh-brand flex h-11 items-center gap-1.5 rounded-full bg-brand-500 px-5 text-white" style={s(14, 600, 1.2)}>
            <PenLine size={16} /> Tulis
          </div>
          <PopMenu open={variant === "menu"} entries={canWrite ? WRITER_MENU : READER_MENU} />
        </>
      }
    />
  );
  let content: ReactNode;
  if (variant === "setup") content = <ProfileSetupCard />;
  else if (variant === "loading")
    content = (
      <div className="space-y-4">
        {[0, 1, 2].map((i) => <CardSkeletonLocal key={i} />)}
      </div>
    );
  else if (variant === "error")
    content = (
      <Card>
        <EmptyState title="Karsa Lib belum termuat" desc="Periksa koneksi lalu coba lagi." icon={<Search size={36} />} action={<Button variant="soft">Coba lagi</Button>} />
      </Card>
    );
  else
    content = (
      <>
        {variant === "banner" || variant === "gate" ? (
          <AuthorBanner bg="bg-butter-100" tile="bg-espresso" tint="text-butter-400" title="Ingin ikut menulis?" body="Ajukan akses penulis agar tulisanmu dibaca seluruh prodi." bodyCls="text-butter-700" action={<Button variant="dark" size="sm">Ajukan</Button>} />
        ) : variant === "pending" ? (
          <AuthorBanner bg="bg-tide-100" tile="bg-white" tint="text-tide-600" title="Pengajuan sedang ditinjau" body="Kamu tetap bisa membaca dan berdiskusi. Tarik layar untuk memperbarui status." bodyCls="text-tide-600" />
        ) : null}
        <SearchField placeholder="Cari judul artikel di prodimu" value={variant === "emptySearch" ? "kriptografi" : undefined} />
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
          <Chip selected>Terbaru</Chip>
          <Chip>Trending 7 hari</Chip>
          <Chip>Trending 30 hari</Chip>
        </div>
        {variant === "emptySearch" ? (
          <Card>
            <EmptyState title="Artikel tidak ditemukan" desc="Tidak ada judul yang cocok di program studimu. Coba kata kunci lain." icon={<Search size={36} />} action={<Button variant="soft">Hapus pencarian</Button>} />
          </Card>
        ) : (
          ARTICLES.map((a, i) => (
            <div key={a.id} className="rise" style={{ animationDelay: `${i * 50}ms` }}>
              <ArticleCard a={a} />
            </div>
          ))
        )}
      </>
    );
  return (
    <Phone
      tabs={writer ? PJ_TABS : MHS_TABS}
      active="lib"
      fixed={variant === "menu" || variant === "gate"}
      overlay={
        variant === "gate" ? (
          <Sheet title="Perlu akses penulis">
            <div className="flex flex-col items-center">
              <div className="flex size-16 items-center justify-center rounded-3xl bg-butter-100 text-butter-700"><Feather size={32} /></div>
              <div className="mt-4 w-[280px] text-center text-ink2" style={s(15, 400, 1.625)}>
                Menulis di Karsa Lib membutuhkan akses penulis. Lengkapi profil penulis, lalu admin prodi akan meninjaunya.
              </div>
              <Button size="lg" full className="mt-6">Ajukan akses penulis</Button>
              <Button variant="ghost" full className="mt-2.5">Nanti saja</Button>
            </div>
          </Sheet>
        ) : undefined
      }
    >
      {header}
      <Body dock gap={16}>{content}</Body>
    </Phone>
  );
}
function CardSkeletonLocal() {
  return (
    <div className="rounded-[28px] border border-ink/5 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="skel size-10 rounded-full bg-paper3/80" />
        <div className="flex-1 space-y-2"><div className="skel h-3.5 w-1/2 rounded-xl bg-paper3/80" /><div className="skel h-3 w-1/3 rounded-xl bg-paper3/80" /></div>
      </div>
      <div className="mt-5 space-y-2.5">
        <div className="skel h-5 w-4/5 rounded-xl bg-paper3/80" />
        <div className="skel h-3.5 rounded-xl bg-paper3/80" /><div className="skel h-3.5 rounded-xl bg-paper3/80" /><div className="skel h-3.5 w-2/3 rounded-xl bg-paper3/80" />
      </div>
    </div>
  );
}

/* ═══════════════ DETAIL ARTIKEL ═══════════════ */
const IconCircle = ({ children }: { children: ReactNode }) => (
  <IconButton className="[&_svg]:size-[18px]">{children}</IconButton>
);

function CommentItem({ author, when, text, small, writer, mine }: { author: string; when: string; text: string; small?: boolean; writer?: boolean; mine?: boolean }) {
  return (
    <div className="flex gap-3">
      <Avatar name={author} size={small ? 32 : 38} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span style={s(14, 700, 1.3)}>{mine ? "Kamu" : author}</span>
          {writer && <Badge>PENULIS</Badge>}
          <span className="text-muted" style={s(12, 400, 1.3)}>{when}</span>
          <div className="flex-1" />
          <PopMenu entries={[{ label: "Laporkan", icon: <Flag size={18} /> }]} />
        </div>
        <div className="mt-1 text-ink2" style={s(small ? 14 : 15, 400, 1.625)}>{text}</div>
        {!small && (
          <div className="mt-1.5 flex items-center gap-1.5 text-muted" style={s(13, 600, 1.3)}><Reply size={14} />Balas</div>
        )}
      </div>
    </div>
  );
}

function AiComposer({ webArmed, empty = true }: { webArmed?: boolean; empty?: boolean }) {
  return (
    <div>
      <div className="rounded-[22px] border border-line bg-white py-3.5 pb-2.5 pl-4 pr-3 shadow-[0_6px_14px_-6px_rgba(38,24,15,.18)]">
        <div className={empty ? "text-muted" : "text-ink"} style={s(15, 400, 1.467)}>{empty ? "Tanya tentang materi..." : "Apa bedanya 3NF dan BCNF?"}</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={cn("flex items-center gap-[5px] rounded-full px-3 py-1.5", webArmed ? "bg-espresso text-white" : "bg-paper2 text-ink2")} style={s(13, 500, 1.2)}>
              <Search size={15} /> Cari web
            </div>
            <div className="flex items-center gap-[3px] text-ink2" style={s(13, 400, 1.2)}><Zap size={14} /> Sisa 42 rb Token</div>
          </div>
          <div className={cn("flex size-10 items-center justify-center rounded-full", empty ? "bg-paper3 text-muted" : "bg-brand-600 text-white")}><Send size={18} className="translate-x-px" /></div>
        </div>
      </div>
      <div className="mt-2 text-center text-ink2/85" style={s(11, 400, 1.4)}>AI dapat keliru. Periksa kembali artikel dan sumber belajarmu.</div>
    </div>
  );
}
function AiPanel({ children, chips, web }: { children: ReactNode; chips?: number[]; web?: boolean }) {
  return (
    <div className="rounded-[18px] border border-line bg-white p-3.5">
      {web && <div className="mb-2"><Badge tone="tide">DARI WEB</Badge></div>}
      <div className="space-y-2 text-ink2" style={s(15, 400, 1.65)}>{children}</div>
      {chips && (
        <div className="mt-2.5 flex gap-2">
          {chips.map((n) => (
            <span key={n} className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1.5 text-brand-700" style={s(11, 700, 1.2)}>Paragraf {n}<ExternalLink size={11} /></span>
          ))}
        </div>
      )}
    </div>
  );
}

export function ArticleScreen({ overlay }: { overlay?: "aiChat" | "aiSummary" | "report" | "none" }) {
  const a = ARTICLES[0];
  const ai = overlay === "aiChat" || overlay === "aiSummary";
  return (
    <Phone
      fixed={!!overlay && overlay !== "none"}
      toast={overlay === "none" ? <Toast msg="Komentar terkirim" bottom={90} /> : undefined}
      overlay={
        overlay === "report" ? (
          <Dialog title="Laporkan artikel" desc="Laporan akan ditinjau admin. Pilih alasan yang paling sesuai." confirm="Kirim laporan">
            <div className="mt-4"><SelectTrigger label="Alasan laporan" value="Informasi keliru" placeholder="Pilih alasan" /></div>
            <div className="mt-3.5"><Field label="Keterangan (opsional)"><TextField multiline minHeight={96} placeholder="Tambahkan konteks bila perlu" /></Field></div>
          </Dialog>
        ) : ai ? (
          <Sheet title="Teman baca" footerDivider={false} footer={<AiComposer empty={overlay === "aiSummary"} />}>
            <div className="line-clamp-2 text-muted" style={s(12, 500, 1.4)}>{a.title}</div>
            <div className="mt-3">
              <Segmented value={overlay === "aiSummary" ? 0 : 1} options={[
                { value: 0, label: "Ringkasan", icon: <Sparkles size={16} /> },
                { value: 1, label: "Tanya materi", icon: <MessagesSquare size={16} /> },
              ]} />
            </div>
            <div className="mt-4">
              {overlay === "aiSummary" ? (
                <>
                  <AiPanel chips={[1, 3, 5]}>
                    <p>Artikel menjelaskan normalisasi basis data lewat satu studi kasus tabel pesanan kantin.</p>
                    <p><b>1.</b> 1NF: satu sel hanya berisi satu nilai.</p>
                    <p><b>2.</b> 2NF/3NF: pindahkan atribut yang tidak bergantung langsung pada kunci utama.</p>
                    <p><b>3.</b> BCNF: pecah lagi jika ada determinan yang bukan kunci kandidat.</p>
                  </AiPanel>
                  <Button variant="soft" full className="mt-3" leading={<MessagesSquare size={17} />}>Tanya tentang ringkasan</Button>
                </>
              ) : (
                <div className="space-y-3.5">
                  <div className="flex justify-end"><div className="max-w-[280px] rounded-[18px] rounded-br-md bg-brand-100 px-3.5 py-2.5" style={s(14, 500, 1.5)}>Apa bedanya 3NF dan BCNF?</div></div>
                  <AiPanel chips={[4, 5]}>
                    <p>Pada 3NF, atribut non-kunci tidak boleh bergantung pada atribut non-kunci lain. BCNF lebih ketat: <b>setiap determinan harus merupakan kunci kandidat</b>.</p>
                  </AiPanel>
                  <div className="flex justify-end"><div className="max-w-[280px] rounded-[18px] rounded-br-md bg-brand-100 px-3.5 py-2.5" style={s(14, 500, 1.5)}>Ada rujukan terbaru dari web?</div></div>
                  <AiPanel web>
                    <p>Beberapa sumber menyarankan BCNF untuk skema transaksional dengan banyak kunci kandidat.</p>
                    <div className="text-muted" style={s(11, 700, 1.4)}>Sumber web:</div>
                    <div className="flex items-center gap-1.5 text-brand-700" style={s(12, 600, 1.4)}>Normalization in DBMS — GeeksforGeeks <ExternalLink size={12} /></div>
                  </AiPanel>
                </div>
              )}
            </div>
          </Sheet>
        ) : undefined
      }
    >
      <TopBar
        title="Artikel"
        right={
          <div className="flex items-center gap-2">
            <IconCircle><Sparkles /></IconCircle>
            <IconCircle><Flag /></IconCircle>
            <IconCircle><Share2 /></IconCircle>
          </div>
        }
      />
      <Body className="pb-6">
        <div className="rise pt-1">
          <Badge>{a.tag}</Badge>
          <div className="mt-3" style={d(28, 800, 1.1, -0.02)}>{a.title}</div>
          <div className="mt-5 flex items-center gap-3">
            <Avatar name={a.author} size={44} />
            <div>
              <div style={s(15, 700, 1.25)}>{a.author}</div>
              <div className="text-muted" style={s(12, 400, 1.4)}>{a.prodi}</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-muted" style={s(13, 600, 1.3)}>
            <Eye size={16} />{a.readers} pembaca unik<span>·</span>20 Nov 2026
          </div>
          <div className="mt-5 h-px bg-line" />
          <Markdown source={a.body} />
          <div className="mt-10 flex items-center gap-2">
            <span style={d(22, 700, 1.25)}>Diskusi</span>
            <span className="rounded-full bg-paper3 px-2.5 py-0.5 text-ink2" style={s(12, 700, 1.3)}>5</span>
          </div>
          <div className="mt-4 space-y-5">
            {COMMENTS.map((c) => (
              <div key={c.id}>
                <CommentItem author={c.author} when={c.when} text={c.text} />
                <div className="ml-[18px] mt-3 space-y-4 border-l-2 border-line pl-4">
                  {c.replies.map((r, i) => <CommentItem key={i} small author={r.author} when={r.when} text={r.text} writer={r.writer} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Body>
      <div className="shrink-0 border-t border-line bg-paper px-4 py-3 pb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-12 flex-1 items-center rounded-full border border-line bg-white px-5 text-muted/80" style={s(15, 400, 1.5)}>Tulis komentar…</div>
          <div className="flex size-12 items-center justify-center rounded-full bg-paper3 text-muted"><Send size={20} /></div>
        </div>
      </div>
    </Phone>
  );
}

/* ═══════════════ EDITOR ═══════════════ */
const TOOLS = [Heading1, Heading2, null, Bold, Italic, Code, null, List, Quote, Link2];
export function EditorScreen({ mode, leave }: { mode: "tulis" | "pratinjau"; leave?: boolean }) {
  const title = "Rangkuman ERD: dari kebutuhan bisnis ke tabel";
  const body = `ERD membantu kita memetakan **entitas**, atribut, dan relasi sebelum menulis satu baris SQL.\n## Mulai dari kebutuhan\nTulis dulu kalimat bisnisnya, misalnya "mahasiswa mengambil banyak mata kuliah".\n- Tentukan entitas\n- Tentukan kardinalitas\n> Diagram yang baik bisa dijelaskan dalam satu menit.`;
  return (
    <Phone fixed={leave} overlay={leave ? <Dialog tone="danger" title="Buang perubahan?" desc="Ada perubahan yang belum disimpan. Simpan sebagai draf agar tidak hilang." confirm="Buang" cancel="Lanjut menulis" /> : undefined}>
      <TopBar title="Tulis artikel" subtitle="Belum disimpan" right={<Button variant="soft" size="sm" leading={<Save size={16} />}>Simpan draf</Button>} />
      <div className="shrink-0 px-4">
        <Segmented value={mode} options={[
          { value: "tulis", label: "Tulis", icon: <PenLine size={16} /> },
          { value: "pratinjau", label: "Pratinjau", icon: <FileText size={16} /> },
        ]} />
        <div className={cn("no-scrollbar mt-3 flex items-center overflow-x-auto rounded-2xl border border-line bg-white p-1.5", mode === "pratinjau" && "opacity-40")}>
          {TOOLS.map((T, i) =>
            T ? <div key={i} className="flex size-10 shrink-0 items-center justify-center rounded-xl text-ink2"><T size={19} /></div> : <div key={i} className="mx-1 h-6 w-px bg-line" />,
          )}
        </div>
        <div className="h-3" />
      </div>
      <Body className="pb-4">
        {mode === "tulis" ? (
          <>
            <div className="py-2" style={d(28, 800, 1.1, -0.02)}>{title}</div>
            <div className="my-3 h-px bg-line" />
            <div className="whitespace-pre-line py-2 text-ink2" style={s(16, 400, 1.8)}>{body}</div>
          </>
        ) : (
          <div className="pt-1">
            <div style={d(28, 800, 1.1, -0.02)}>{title}</div>
            <div className="my-3 h-px bg-line" />
            <Markdown source={body} />
          </div>
        )}
      </Body>
      <div className="flex shrink-0 items-center gap-3 border-t border-line bg-paper px-4 pb-6 pt-3">
        <div className="flex-1 pl-1">
          <div style={s(13, 700, 1.3)}>46 kata</div>
          <div className="text-muted" style={s(12, 400, 1.3)}>1 mnt baca</div>
        </div>
        <Button leading={<Send size={16} />}>Terbitkan</Button>
      </div>
    </Phone>
  );
}

/* ═══════════════ TULISAN SAYA ═══════════════ */
export function MyPostsScreen({ confirm }: { confirm?: boolean }) {
  return (
    <Phone fixed={confirm} overlay={confirm ? <Dialog title="Terbitkan artikel?" desc="Artikel akan dapat dibaca oleh seluruh mahasiswa di prodimu." confirm="Lanjutkan" /> : undefined}>
      <TopBar title="Tulisan saya" subtitle="3 tulisan" right={<Button size="sm" leading={<PenLine size={16} />}>Tulis</Button>} />
      <div className="shrink-0 px-5 pb-3">
        <Segmented value="Semua" options={["Semua", "Draf", "Terbit", "Arsip"].map((v) => ({ value: v, label: v }))} />
      </div>
      <Body className="pb-6" gap={12}>
        {MY_POSTS.map((p) => (
          <Card key={p.title}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <Badge tone={p.status === "draft" ? "butter" : p.status === "archived" ? "neutral" : "leaf"}>
                  {p.status === "draft" ? "DRAF" : p.status === "archived" ? "DIARSIPKAN" : "TERBIT"}
                </Badge>
                <div className="flex items-center gap-1.5">
                  <span className="text-muted" style={s(12, 400, 1.3)}>{p.when}</span>
                  <PopMenu entries={[]} />
                </div>
              </div>
              <div className="mt-3" style={d(18, 700, 1.25)}>{p.title}</div>
              <div className="mt-1.5 text-muted" style={s(12, 600, 1.4)}>
                {p.status === "draft" ? "Ketuk untuk melanjutkan menulis" : p.status === "archived" ? "Diarsipkan · bisa diterbitkan kembali" : `${p.readers} pembaca · ${p.comments} komentar`}
              </div>
            </div>
          </Card>
        ))}
      </Body>
    </Phone>
  );
}

/* ═══════════════ IMPOR DOCX ═══════════════ */
export function ImportScreen({ picked }: { picked?: boolean }) {
  return (
    <Phone>
      <TopBar title="Impor .docx" subtitle="Ubah dokumen Word menjadi artikel" />
      <Body className="pt-2" gap={20}>
        <div className={cn("flex flex-col items-center rounded-[32px] border-2 px-6 py-10", picked ? "border-leaf-500/50 bg-leaf-100/50" : "border-brand-300 bg-brand-50")}>
          <div className={cn("flex size-16 items-center justify-center rounded-3xl text-white", picked ? "bg-leaf-500" : "bg-brand-500 sh-brand")}>
            {picked ? <FileText size={32} /> : <Upload size={32} />}
          </div>
          <div className="mt-4" style={d(picked ? 18 : 20, 700, 1.25)}>{picked ? "Catatan-Kuliah-ERD.docx" : "Pilih berkas .docx"}</div>
          <div className="text-muted" style={s(14, 400, 1.5)}>{picked ? "84.3 KB · ketuk untuk ganti berkas" : "Ukuran maksimal 5 MB"}</div>
        </div>
        <Card>
          <div className="p-5">
            <div style={d(16, 700, 1.25)}>Yang perlu kamu tahu</div>
            <div className="mt-3 space-y-2.5">
              {["Baris pertama dipakai sebagai judul artikel.", "Heading, tebal, miring, dan daftar dipertahankan.", "Gambar dan tabel belum didukung dan akan dilewati."].map((l) => (
                <div key={l} className="flex gap-3"><span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand-500" /><span className="text-ink2" style={s(14, 400, 1.625)}>{l}</span></div>
              ))}
            </div>
          </div>
        </Card>
        <Button size="lg" full disabled={!picked} leading={<FileUp size={20} />}>Impor ke editor</Button>
      </Body>
    </Phone>
  );
}

/* ═══════════════ AKSES MENULIS ═══════════════ */
export function AuthorScreen({ variant }: { variant: "request" | "pending" | "hub" | "setup" }) {
  const sub = { request: "Ajukan akses penulis", pending: "Menunggu tinjauan", hub: "Penulis aktif", setup: "Lengkapi profil Karsa Lib" }[variant];
  return (
    <Phone>
      <TopBar title="Akses menulis" subtitle={sub} />
      <Body className="pt-2" gap={16}>
        {variant === "setup" && <ProfileSetupCard />}
        {variant === "hub" && (
          <>
            <Card>
              <div className="flex items-center gap-4 p-[18px]">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-leaf-100 text-leaf-600"><ShieldCheck size={24} /></div>
                <div>
                  <div className="text-muted" style={s(12, 600, 1.4)}>Akses menulis aktif</div>
                  <div style={d(18, 700, 1.25)}>{ME.name}</div>
                  <div className="text-muted" style={s(12, 400, 1.4)}>{ME.prodi} · {ME.kelas}</div>
                </div>
              </div>
            </Card>
            <Button size="lg" full leading={<PenLine size={18} />}>Tulis artikel</Button>
            <Button size="lg" full variant="soft" leading={<FileText size={18} />}>Tulisan saya</Button>
            <Button size="lg" full variant="outline" leading={<UserRound size={18} />}>Lihat profil penulis</Button>
          </>
        )}
        {(variant === "request" || variant === "pending") && (
          <>
            <Card>
              <div className="flex items-center gap-3.5 p-4">
                <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-2xl", variant === "pending" ? "bg-tide-100 text-tide-600" : "bg-butter-100 text-butter-700")}>
                  {variant === "pending" ? <Clock size={22} /> : <Feather size={22} />}
                </div>
                <div className="flex-1">
                  <div style={d(17, 700, 1.25)}>{variant === "pending" ? "Permohonan sedang ditinjau" : "Bagikan ilmu untuk satu prodi"}</div>
                  <div className="text-muted" style={s(13, 400, 1.5)}>
                    {variant === "pending" ? "Kamu tetap bisa membaca dan berdiskusi. Tarik layar untuk memperbarui status." : "Admin akan meninjau permohonanmu sebelum akses menulis aktif."}
                  </div>
                </div>
              </div>
            </Card>
            {variant === "request" && (
              <Card>
                <div className="space-y-[18px] p-5">
                  <Field label="Mengapa ingin menjadi penulis?"><TextField multiline minHeight={120} placeholder="Ceritakan alasan dan rencanamu menulis" /></Field>
                  <Field label="Topik yang ingin ditulis"><TextField multiline minHeight={88} placeholder="Misalnya: catatan kuliah, tutorial, pengalaman organisasi" /></Field>
                  <Field label="Username Instagram (opsional)"><TextField placeholder="@username" /></Field>
                  <Field label="Username TikTok (opsional)"><TextField placeholder="@username" /></Field>
                  <div className="flex items-start gap-3 rounded-2xl bg-paper2 p-3.5">
                    <div className="flex size-[22px] shrink-0 items-center justify-center rounded-[7px] border border-line bg-white" />
                    <span className="text-ink2" style={s(13, 500, 1.5)}>Saya akan mengikuti panduan komunitas Karsa Lib.</span>
                  </div>
                  <Button size="lg" full disabled leading={<Send size={18} />}>Kirim permohonan</Button>
                </div>
              </Card>
            )}
          </>
        )}
      </Body>
    </Phone>
  );
}

/* ═══════════════ PROFIL PENULIS ═══════════════ */
export function AuthorProfileScreen() {
  return (
    <Phone>
      <TopBar title="Profil penulis" subtitle="Karsa Lib" />
      <Body className="pb-8" gap={16}>
        <Card>
          <div className="flex items-center gap-4 p-5">
            <Avatar name="Rafi Hidayat" size={64} />
            <div className="min-w-0 flex-1">
              <div style={d(22, 700, 1.2)}>Rafi Hidayat</div>
              <div className="text-ink2" style={s(13, 600, 1.4)}>Sistem Informasi</div>
              <div className="text-muted" style={s(12, 400, 1.4)}>Fakultas Ilmu Komputer</div>
            </div>
          </div>
        </Card>
        <div className="flex gap-3">
          {[["12", "Artikel terbit"], ["1.284", "Total pembaca"]].map(([v, l]) => (
            <div key={l} className="flex-1 rounded-3xl bg-white px-[18px] py-4">
              <div style={d(28, 800, 1, -0.02)}>{v}</div>
              <div className="text-muted" style={s(12, 500, 1.4)}>{l}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 pl-1" style={d(18, 700)}>Tulisan Rafi</div>
        <ArticleCard a={ARTICLES[0]} />
        <ArticleCard a={{ ...ARTICLES[2], author: "Rafi Hidayat" }} />
      </Body>
    </Phone>
  );
}

export { BookOpenText, Check, InlineMd, OptionRow, Pencil, Trash2 };
