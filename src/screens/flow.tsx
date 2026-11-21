import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  BookOpenText,
  Check,
  Crown,
  Eye,
  GraduationCap,
  MessageCircle,
  MessagesSquare,
  Pin,
  RefreshCw,
  Send,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  X,
} from "lucide-react";
import { Phone } from "../phone";
import {
  Avatar,
  Badge,
  BloomLogo,
  Button,
  GoogleMark,
  Kawung,
  LogoMark,
  PointBadge,
  Spinner,
  cn,
  d,
  s,
} from "../ui";

/* ═══════════════ SPLASH (screens/Splash.kt) ═══════════════ */
function BigCard({ children }: { children: ReactNode }) {
  return <div className="sh-card h-full overflow-hidden rounded-[28px] bg-white p-4">{children}</div>;
}
function StepRow({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-leaf-500 text-white">
        <Check size={14} strokeWidth={3} />
      </div>
      <div className="min-w-0">
        <div style={s(12, 700, 1.2)}>{title}</div>
        <div className="truncate text-ink/55" style={s(10, 400, 1.3)}>{sub}</div>
      </div>
    </div>
  );
}
function PodiumCol({
  ini, name, bar, barCls, avBg, avCls, rank, size, rankSize, crown, ring,
}: {
  ini: string; name: string; bar: number; barCls: string; avBg: string; avCls: string; rank: string; size: number; rankSize: number; crown?: boolean; ring?: boolean;
}) {
  return (
    <div className="flex w-16 flex-col items-center">
      <div className="flex h-3.5 items-center justify-center text-butter-400">{crown && <Crown size={16} strokeWidth={2.2} />}</div>
      <div
        className={cn("flex items-center justify-center rounded-full", avBg, avCls, ring && "ring-[3px] ring-brand-500")}
        style={{ width: size, height: size, ...s(11, 800, 1) }}
      >
        {ini}
      </div>
      <div className="mt-1" style={s(10, 700, 1.2)}>{name}</div>
      <div
        className={cn("mt-1.5 flex w-full items-center justify-center rounded-t-2xl", barCls)}
        style={{ height: bar, ...d(rankSize, 800, 1) }}
      >
        {rank}
      </div>
    </div>
  );
}
function RekapRow({ cat, pts, cls }: { cat: string; pts: string; cls: string }) {
  return (
    <div className="flex h-6 items-center justify-between">
      <span className="text-ink/80" style={s(10, 600, 1.2)}>{cat}</span>
      <span className={cn("rounded-full px-2 py-0.5", cls)} style={s(9, 800, 1.2)}>{pts}</span>
    </div>
  );
}
function MateriRow({ t, tag, p }: { t: string; tag: string; p: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="truncate" style={s(11, 700, 1.2)}>{t}</span>
        <span className="ml-2 rounded-full bg-paper2 px-2 py-0.5 text-ink/70" style={s(9, 700, 1.2)}>{tag}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-paper2">
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${p * 100}%` }} />
      </div>
    </div>
  );
}

const SLIDES: { title: string; desc: string; card: ReactNode }[] = [
  {
    title: "Input poin", desc: "Catat kontribusi mahasiswa",
    card: (
      <BigCard>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span style={d(17, 800, 1.1)}>Input poin</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-white" style={s(9, 700, 1.2, 0.04)}>
              <ShieldCheck size={13} strokeWidth={2.2} /> PJ KELAS
            </span>
          </div>
          <div className="mt-3 space-y-2.5">
            <StepRow title="Mata kuliah" sub="Bahasa Indonesia · K1" />
            <StepRow title="Mahasiswa" sub="Rani Wulandari · NIM ••••1204" />
            <StepRow title="Kategori" sub="Bertanya · +4 poin" />
          </div>
          <div className="mt-3.5 flex gap-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className={cn("flex h-9 flex-1 items-center justify-center rounded-full", n === 4 ? "bg-brand-500 text-white" : "bg-paper2")} style={d(13, 800, 1)}>{n}</div>
            ))}
          </div>
          <div className="flex-1" />
          <div className="flex h-11 items-center justify-between rounded-2xl bg-espresso px-4 text-white">
            <span style={s(13, 700, 1.2)}>Simpan poin</span>
            <span className="text-butter-400" style={d(15, 800, 1)}>+4</span>
          </div>
        </div>
      </BigCard>
    ),
  },
  {
    title: "Partisipasi teratas", desc: "Podium & peringkat kelas",
    card: (
      <BigCard>
        <div className="flex h-full flex-col">
          <span style={d(17, 800, 1.1)}>Partisipasi teratas</span>
          <div className="flex-1" />
          <div className="flex items-end justify-center gap-2">
            <PodiumCol ini="DA" name="Dimas" bar={64} barCls="bg-espresso text-white" avBg="bg-plum-100" avCls="text-plum-600" rank="2" size={36} rankSize={20} />
            <PodiumCol ini="RW" name="Rani" bar={92} barCls="bg-brand-500 text-white" avBg="bg-butter-100" avCls="text-brand-600" rank="1" size={44} rankSize={30} crown />
            <PodiumCol ini="KM" name="Kamu" bar={46} barCls="bg-butter-100 text-butter-700" avBg="bg-leaf-100" avCls="text-leaf-500" rank="3" size={36} rankSize={20} ring />
          </div>
          <div className="mt-3 flex h-[30px] items-center justify-center rounded-[15px] bg-paper2 text-ink/60" style={s(10, 600, 1.2)}>
            SI-4A · 24 mahasiswa · 3 PJ
          </div>
        </div>
      </BigCard>
    ),
  },
  {
    title: "Materi kelas", desc: "Unggah & sinkron materi",
    card: (
      <BigCard>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span style={d(17, 800, 1.1)}>Materi kelas</span>
            <span className="rounded-full bg-butter-100 px-2.5 py-1 text-butter-700" style={s(9, 700, 1.2, 0.04)}>3 BARU</span>
          </div>
          <div className="mt-3.5 space-y-2.5">
            <MateriRow t="Bab 3 · Teks Eksposisi" tag="PDF" p={1} />
            <MateriRow t="Bab 4 · Kalimat Efektif" tag="Slide" p={0.7} />
            <MateriRow t="Bab 5 · Ejaan & Tanda Baca" tag="Video" p={0.35} />
            <MateriRow t="Bab 6 · Karya Ilmiah" tag="PDF" p={0.2} />
          </div>
          <div className="flex-1" />
          <div className="flex h-[34px] items-center justify-center rounded-[17px] bg-butter-100 text-butter-700" style={s(11, 700, 1.2)}>
            Unduh semua materi
          </div>
        </div>
      </BigCard>
    ),
  },
  {
    title: "Diskusi kelas", desc: "Tanya jawab real-time",
    card: (
      <BigCard>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span style={d(17, 800, 1.1)}>Diskusi kelas</span>
            <span className="inline-flex items-center gap-[5px] rounded-full bg-leaf-100 px-2.5 py-1 text-leaf-500" style={s(9, 700, 1.2)}>
              <span className="size-1.5 rounded-full bg-leaf-500" /> LIVE
            </span>
          </div>
          <div className="mt-3.5 flex items-end">
            <div className="flex size-7 items-center justify-center rounded-full bg-plum-100 text-plum-600" style={s(9, 800, 1)}>DA</div>
            <div className="ml-2 rounded-2xl bg-paper2 px-3 py-2" style={s(11, 500, 1.35)}>Apa beda opini dan fakta, Bu?</div>
          </div>
          <div className="mt-2 flex justify-end">
            <div className="rounded-2xl bg-brand-500 px-3 py-2 text-white" style={s(11, 600, 1.35)}>Fakta bisa dibuktikan</div>
          </div>
          <div className="mt-2 flex items-end">
            <div className="flex size-7 items-center justify-center rounded-full bg-plum-100 text-plum-600" style={s(9, 800, 1)}>DA</div>
            <div className="ml-2 rounded-2xl bg-paper2 px-3 py-2" style={s(11, 500, 1.35)}>Baik, Bu. Saya catat.</div>
          </div>
          <div className="mt-2.5">
            <span className="rounded-full bg-butter-100 px-2.5 py-1 text-butter-700" style={s(10, 700, 1.2)}>+5 poin diskusi</span>
          </div>
          <div className="flex-1" />
          <div className="flex h-[38px] items-center rounded-[19px] bg-paper2 px-3.5">
            <span className="flex-1 text-muted" style={s(11, 400, 1.2)}>Tulis balasan…</span>
            <span className="flex size-6 items-center justify-center rounded-full bg-brand-500 text-white"><Send size={12} strokeWidth={2.2} /></span>
          </div>
        </div>
      </BigCard>
    ),
  },
  {
    title: "Rekap poin", desc: "Ringkasan nilai keaktifan",
    card: (
      <BigCard>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span style={d(17, 800, 1.1)}>Rekap poin</span>
            <span className="rounded-full bg-ink px-2.5 py-1 text-white" style={s(9, 700, 1.2, 0.04)}>SEMESTER 4</span>
          </div>
          <div className="mt-2.5 flex items-end justify-between">
            <div>
              <div className="text-brand-600" style={d(34, 800, 1, -0.01)}>1.240</div>
              <div className="text-ink/55" style={s(10, 400, 1.3)}>total poin keaktifan</div>
            </div>
            <div className="flex h-[100px] items-end gap-1.5">
              {[38, 55, 44, 70, 62, 90].map((v, i) => (
                <div key={i} className={cn("w-3.5 rounded-t-md", i === 5 ? "bg-brand-500" : "bg-butter-100")} style={{ height: `${v}%` }} />
              ))}
            </div>
          </div>
          <div className="mt-3.5 text-ink/60" style={s(10, 700, 1.2)}>3 aktivitas terakhir</div>
          <div className="mt-2 space-y-1.5">
            <RekapRow cat="Bertanya" pts="+4" cls="bg-brand-50 text-brand-600" />
            <RekapRow cat="Aktif diskusi" pts="+2" cls="bg-butter-100 text-butter-700" />
            <RekapRow cat="Presentasi" pts="+3" cls="bg-leaf-100 text-leaf-500" />
          </div>
        </div>
      </BigCard>
    ),
  },
];

export function SplashScreen() {
  const [active, setActive] = useState(0);
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 1800);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = ((now - start) % 5200) / 4200;
      setProg(Math.min(1, t));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const label = prog >= 1 ? "SIAP DIGUNAKAN" : prog < 0.3 ? "MENYIAPKAN KELAS" : prog < 0.6 ? "MENYINKRONKAN MATERI" : "MEMUAT POIN KEAKTIFAN";
  return (
    <Phone top={0} light bg="bg-paper">
      <div className="relative shrink-0 overflow-hidden" style={{ height: "46%", background: "linear-gradient(to bottom,#F88A2E,#E36B0F,#C75A08)" }}>
        <div className="absolute rounded-full border-white/15" style={{ right: -124, top: -128, width: 208, height: 208, borderWidth: 14 }} />
        <div className="absolute rounded-full border-white/15" style={{ left: -136, top: 88, width: 192, height: 192, borderWidth: 12 }} />
        <div className="relative flex h-full flex-col items-center justify-center px-5 pt-7">
          <div className="relative flex size-24 items-center justify-center rounded-full border-[3px] border-white/35">
            {[0, 1.2].map((dl) => (
              <span key={dl} className="absolute size-20 rounded-full border-2 border-white/40" style={{ animation: "ring 2.4s ease-out infinite", animationDelay: `${dl}s` }} />
            ))}
            <BloomLogo size={80} bg="#fff" mark="#E36B0F" />
          </div>
          <div className="mt-3 text-white" style={d(40, 800, 1, -0.02)}>SiKarsa</div>
          <div className="mt-1.5 text-white/85" style={s(12, 400, 1.4)}>Poin keaktifan, materi, dan diskusi kelas.</div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col rounded-t-[40px] bg-paper px-5 py-5"
        style={{ height: "59.5%", boxShadow: "0 -8px 24px rgba(42,26,16,.18)" }}
      >
        <div className="relative" style={{ height: 287 }}>
          <div className="absolute inset-x-3 top-3 bottom-0 translate-y-2 rounded-[28px] bg-white/70" />
          <div key={active} className="slidein relative h-full">{SLIDES[active].card}</div>
        </div>
        <div key={"c" + active} className="mt-3.5 flex flex-col items-center rise">
          <div style={d(13, 800, 1.2)}>{SLIDES[active].title}</div>
          <div className="text-muted" style={s(10, 400, 1.4)}>{SLIDES[active].desc}</div>
        </div>
        <div className="mt-2 flex items-center justify-center">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={cn("mx-[3px] h-[5px] rounded-full transition-all duration-300", i === active ? "w-6 bg-brand-500" : "w-[5px] bg-ink/15")} />
          ))}
        </div>
        <div className="flex-[0.75]" />
        <div>
          <div className="flex items-end justify-between">
            <span className="text-ink/50" style={s(9, 600, 1.4, 0.22)}>{label}</span>
            <span style={d(15, 800, 1)}>{Math.floor(prog * 100)}%</span>
          </div>
          <div className="relative mt-1.5 h-[7px] overflow-hidden rounded-full bg-paper2">
            <div className="relative h-full overflow-hidden rounded-full bg-brand-500" style={{ width: `${prog * 100}%` }}>
              {prog < 1 && <div className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/70 to-transparent" style={{ animation: "shimmer 1.6s linear infinite" }} />}
            </div>
          </div>
        </div>
        <div className="flex-[0.25]" />
      </div>
    </Phone>
  );
}

/* ═══════════════ ONBOARDING (screens/Onboarding.kt) ═══════════════ */
const OB = [
  { no: "01", kicker: "Poin akademik", title: "Setiap kontribusi punya tempat.", bg: "#E36B0F" },
  { no: "02", kicker: "Grup kelas", title: "Percakapan kelas tetap dekat.", bg: "#2A6385" },
  { no: "03", kicker: "Karsa Lib", title: "Ilmu tumbuh saat dibagikan.", bg: "#17623D" },
];
const fl = (delay = 0): CSSProperties => ({ animationDelay: `${delay}ms` });

function ArtPoints() {
  return (
    <>
      <div className="floaty absolute left-6 top-9 w-[78%]">
        <div className="sh-pop flex items-center gap-3 rounded-3xl bg-white p-4">
          <Avatar name="Aulia Rahmawati" size={42} />
          <div className="min-w-0 flex-1">
            <div className="truncate" style={s(14, 700, 1.4)}>Aulia Rahmawati</div>
            <div className="truncate text-muted" style={s(12, 400, 1.4)}>Menjawab pertanyaan · Basis Data</div>
          </div>
          <PointBadge points={3} />
        </div>
      </div>
      <div className="floaty absolute right-5 w-[62%]" style={{ top: "42%", ...fl(2000) }}>
        <div className="sh-pop rounded-3xl bg-espresso p-4">
          <div className="text-white/50" style={s(11, 700, 1.4, 0.1)}>TOTAL POIN KEAKTIFAN</div>
          <div className="mt-1 text-white" style={d(48, 800, 1)}>31</div>
          <div className="mt-3 flex items-end gap-1">
            {[3, 4, 2, 3, 4, 2].map((n, i) => (
              <div key={i} className="flex-1 rounded-md" style={{ height: 8 + n * 6, background: `rgba(248,138,46,${0.35 + n * 0.16})` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="floaty absolute bottom-7 left-7" style={fl(1400)}>
        <div className="sh-pop flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5">
          <PointBadge points={4} />
          <span style={s(14, 700, 1.2)}>Presentasi</span>
        </div>
      </div>
    </>
  );
}
function ArtGroup() {
  return (
    <>
      <div className="absolute inset-x-6 top-7 flex items-center gap-2 rounded-2xl bg-white/90 px-4 py-3">
        <Pin size={16} className="text-brand-600" />
        <span className="truncate" style={s(13, 600, 1.4)}>Kuis Kamis 10.00, Lab 3</span>
      </div>
      <div className="floaty absolute left-6 w-[70%]" style={{ top: "27%" }}>
        <div className="sh-pop rounded-3xl rounded-bl-lg bg-white p-4">
          <div className="text-tide-600" style={s(11, 700, 1.4)}>Intan</div>
          <div className="mt-0.5" style={s(14, 400, 1.4)}>Ada yang punya catatan BCNF?</div>
        </div>
      </div>
      <div className="floaty absolute right-6 w-[68%]" style={{ top: "50%", ...fl(2000) }}>
        <div className="sh-pop rounded-3xl rounded-br-lg bg-brand-500 p-4 text-white" style={s(14, 400, 1.4)}>Kuunggah di drive kelas ya!</div>
      </div>
      <div className="floaty absolute bottom-7 left-6" style={fl(1400)}>
        <div className="sh-pop flex items-center gap-2 rounded-full bg-espresso py-1.5 pl-1 pr-5">
          <div className="relative h-[26px] w-[62px]">
            {["Aulia R", "Bagas S", "Cahya N"].map((n, i) => (
              <div key={n} className="absolute top-0" style={{ left: i * 18 }}>
                <Avatar name={n} size={26} border={2} />
              </div>
            ))}
          </div>
          <span className="text-white" style={s(12, 600, 1.2)}>38 anggota</span>
        </div>
      </div>
    </>
  );
}
function ArtLib() {
  return (
    <>
      <div className="floaty absolute left-6 top-8 w-[80%]">
        <div className="sh-pop rounded-3xl bg-white p-5">
          <div className="flex items-center gap-2">
            <Avatar name="Rafi Hidayat" size={28} />
            <span className="text-ink2" style={s(12, 600, 1.4)}>Rafi Hidayat</span>
          </div>
          <div className="mt-3" style={d(20, 700, 1.25)}>Normalisasi tanpa pusing lewat satu studi kasus</div>
          <div className="mt-3 space-y-1.5">
            <div className="h-2 rounded-full bg-paper3" />
            <div className="h-2 w-[83%] rounded-full bg-paper3" />
            <div className="h-2 w-[66%] rounded-full bg-paper3" />
          </div>
          <div className="mt-4 flex items-center gap-4 text-muted" style={s(12, 600, 1.2)}>
            <span className="flex items-center gap-1.5"><Eye size={16} strokeWidth={1.6} />214</span>
            <span className="flex items-center gap-1.5"><MessageCircle size={16} strokeWidth={1.6} />14</span>
          </div>
        </div>
      </div>
      <div className="floaty absolute bottom-8 right-6" style={fl(2500)}>
        <div className="sh-pop flex size-20 items-center justify-center rounded-[28px] bg-espresso text-butter-400">
          <BookOpenText size={36} />
        </div>
      </div>
      <div className="floaty absolute bottom-12 left-8" style={fl(1000)}>
        <div className="sh-brand rounded-full bg-brand-500 px-4 py-2.5 text-white" style={s(14, 700, 1.2)}>+ Tulis</div>
      </div>
    </>
  );
}

export function OnboardingScreen({ index }: { index: 0 | 1 | 2 }) {
  const last = index === 2;
  const page = OB[index];
  return (
    <Phone>
      <div className="flex shrink-0 items-center px-5 py-3">
        <div className="flex flex-1 gap-1.5">
          {OB.map((_, i) => (
            <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper3">
              <div className="h-full rounded-full bg-espresso" style={{ width: i <= index ? "100%" : 0 }} />
            </div>
          ))}
        </div>
        <span className="ml-3 p-1 text-ink2" style={s(14, 600, 1.2)}>Lewati</span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="flex h-full" style={{ paddingLeft: 20, transform: `translateX(${-index * 350}px)` }}>
          {OB.map((p, i) => (
            <div key={i} className="h-full w-[350px] shrink-0">
              <div className="relative h-full overflow-hidden rounded-[40px]" style={{ background: p.bg }}>
                <Kawung />
                <div className="absolute -right-10 -top-10 size-44 rounded-full" style={{ background: "radial-gradient(circle,rgba(255,255,255,.1),transparent 70%)" }} />
                {i === index && (i === 0 ? <ArtPoints /> : i === 1 ? <ArtGroup /> : <ArtLib />)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="shrink-0 px-7 pb-8 pt-6">
        <div className="rise" key={index}>
          <div className="flex items-center gap-3">
            <span style={d(16, 700, 1.2)}>{page.no}</span>
            <span className="h-px w-8 bg-brand-300" />
            <span className="text-brand-700" style={s(11, 700, 1.4, 0.18)}>{page.kicker.toUpperCase()}</span>
          </div>
          <div className="mt-3" style={d(32, 800, 1.05, -0.02)}>{page.title}</div>
        </div>
        <Button size="lg" full className="mt-6" trailing={<ArrowRight size={20} />}>
          {last ? "Mulai sekarang" : "Lanjut"}
        </Button>
      </div>
    </Phone>
  );
}

/* ═══════════════ LOGIN (screens/Login.kt) ═══════════════ */
export function LoginScreen({ variant }: { variant: "default" | "error" | "accepted" | "waiting" }) {
  const accepted = variant === "accepted" || variant === "waiting";
  return (
    <Phone top={0}>
      <div className="relative shrink-0 overflow-hidden rounded-b-[48px] bg-brand-500" style={{ height: "46%" }}>
        <Kawung />
        <div className="absolute -left-16 -top-16 size-64 rounded-full" style={{ background: "radial-gradient(circle,rgba(255,167,98,.4),transparent 70%)" }} />
        <div className="absolute bottom-9 left-7 right-7">
          <LogoMark size={64} tile="#2A1A10" ink="#FFA762" radius={20} />
          <div className="mt-6 text-white" style={d(40, 800, 1.02, -0.02)}>Masuk ke SiKarsa</div>
          <div className="mt-2 w-[310px] text-white/85" style={s(15, 400, 1.5)}>Poin keaktifan, materi, dan diskusi kelas.</div>
        </div>
      </div>
      <div className="no-scrollbar flex min-h-0 flex-1 flex-col justify-between overflow-y-auto px-7 pb-7 pt-7">
        <div>
          {variant === "waiting" ? (
            <div className="sh-card rounded-[28px] border border-ink/5 bg-white p-5">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600"><Spinner size={24} /></div>
                <div className="flex-1">
                  <div style={d(18, 700, 1.25)}>Menunggu login di browser...</div>
                  <div className="mt-0.5 text-muted" style={s(13, 400, 1.5)}>Selesaikan masuk dengan akun Google kampusmu.</div>
                </div>
              </div>
              <Button variant="ghost" full className="mt-4">Batalkan</Button>
            </div>
          ) : (
            <div className="rise space-y-4">
              {variant === "error" && (
                <div className="flex items-start gap-3 rounded-[20px] border border-danger-500/20 bg-danger-100 py-3.5 pl-3.5 pr-2">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/70 text-danger-500"><ShieldAlert size={17} /></div>
                  <div className="flex-1 pt-1 text-danger-500" style={s(13, 500, 1.5)}>Baca dan setujui Syarat Penggunaan sebelum masuk.</div>
                  <div className="flex size-8 items-center justify-center text-danger-500"><X size={16} /></div>
                </div>
              )}
              <div className="flex items-start gap-3.5 rounded-[22px] border border-line bg-white p-4">
                <div className={cn("flex size-6 shrink-0 items-center justify-center rounded-lg border", accepted ? "border-brand-500 bg-brand-500 text-white" : "border-line bg-white")}>
                  {accepted && <Check size={15} strokeWidth={2.6} />}
                </div>
                <div className="space-y-1">
                  <div className="text-ink2" style={s(13, 500, 1.5)}>Saya telah membaca dan menyetujui dokumen berikut.</div>
                  <div style={s(13, 700, 1.5)}>
                    <span className="text-brand-700 underline">Syarat Penggunaan</span>
                    <span className="font-normal text-muted">  ·  </span>
                    <span className="text-brand-700 underline">Kebijakan Privasi</span>
                  </div>
                  <div className="text-muted" style={s(12, 400, 1.5)}>Data poin dan aktivitas digunakan untuk keperluan akademik.</div>
                </div>
              </div>
              <div className="sh-card flex h-14 items-center justify-center gap-3 rounded-[20px] border border-line bg-white" style={s(16, 600, 1.2)}>
                <GoogleMark /> Masuk dengan Google
              </div>
              <div className="px-3 text-center text-muted" style={s(13, 400, 1.625)}>
                Gunakan akun kampus berakhiran @students.untidar.ac.id agar poinmu tercatat.
              </div>
            </div>
          )}
          <div className="mt-8 space-y-3">
            {[
              [Trophy, "Poin keaktifan tercatat rapi", "bg-brand-100 text-brand-600"],
              [MessagesSquare, "Grup kelas dalam satu tempat", "bg-tide-100 text-tide-600"],
              [BookOpenText, "Materi dari teman satu prodi", "bg-leaf-100 text-leaf-600"],
            ].map(([Ic, t, c]) => {
              const I = Ic as typeof Trophy;
              return (
                <div key={t as string} className="flex items-center gap-3.5">
                  <div className={cn("flex size-10 items-center justify-center rounded-2xl", c as string)}><I size={20} /></div>
                  <span className="text-ink2" style={s(14, 600, 1.4)}>{t as string}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-6 text-center text-muted" style={s(12, 400, 1.5)}>
          Login berlangsung melalui browser. Kata sandi Google tidak disimpan di aplikasi.
        </div>
      </div>
    </Phone>
  );
}

export function SessionErrorScreen() {
  return (
    <Phone>
      <Kawung color="#E36B0F" alpha={0.06} fade />
      <div className="relative flex flex-1 flex-col items-center justify-center px-8">
        <LogoMark size={72} radius={22} />
        <div className="mt-7 text-center" style={d(30, 800, 1.1, -0.02)}>Belum bisa memeriksa sesi</div>
        <div className="mt-3 w-[300px] text-center text-ink2" style={s(15, 400, 1.625)}>Periksa koneksi internetmu, lalu coba lagi.</div>
        <Button size="lg" full className="mt-7" leading={<RefreshCw size={18} />}>Coba lagi</Button>
        <div className="mt-3.5 text-center text-muted" style={s(12, 400, 1.4)}>Sesi kamu tetap tersimpan di perangkat ini.</div>
      </div>
    </Phone>
  );
}

export { Badge, GraduationCap };
