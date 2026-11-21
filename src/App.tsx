import { useState } from "react";
import type { ReactNode } from "react";
import { TallCtx } from "./phone";
import { LogoMark, cn, d, s } from "./ui";
import { Tokens } from "./tokens";
import { LoginScreen, OnboardingScreen, SessionErrorScreen, SplashScreen } from "./screens/flow";
import { ArticleScreen, AuthorProfileScreen, AuthorScreen, EditorScreen, ImportScreen, LibHome, MyPostsScreen } from "./screens/lib";
import { ChatScreen, GroupList, GroupReportsScreen } from "./screens/groups";
import { ActivityScreen, HistoryScreen, InputScreen, PoinkuScreen, RankingScreen, ReportScreen } from "./screens/points";
import { AccountScreen, LegalScreen } from "./screens/account";

type Note = { kind: "info" | "warn"; text: string };
function Spec({ title, comp, notes, children }: { title: string; comp: string; notes?: Note[]; children: ReactNode }) {
  return (
    <div className="flex w-[408px] flex-col">
      <div className="mb-3 px-1">
        <div className="text-paper" style={s(15, 700, 1.3)}>{title}</div>
        <div className="text-brand-300" style={{ fontFamily: "ui-monospace, monospace", fontSize: 11 }}>{comp}</div>
      </div>
      {children}
      {notes && (
        <div className="mt-3 space-y-1.5 px-1">
          {notes.map((n, i) => (
            <div
              key={i}
              className={cn("rounded-xl px-3 py-2", n.kind === "warn" ? "border border-butter-400/40 bg-butter-400/10 text-butter-100" : "bg-white/5 text-paper/70")}
              style={s(11.5, 500, 1.5)}
            >
              <b>{n.kind === "warn" ? "⚠ Keterangan: " : "ℹ "}</b>
              {n.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const W = (text: string): Note => ({ kind: "warn", text });
const I = (text: string): Note => ({ kind: "info", text });

function Section({ id, no, title, desc, children }: { id: string; no: string; title: string; desc: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-12">
      <div className="mb-8 flex items-start gap-4">
        <span className="text-brand-400" style={d(44, 800, 1, -0.02)}>{no}</span>
        <div>
          <h2 className="text-paper" style={d(30, 800, 1.1, -0.02)}>{title}</h2>
          <p className="mt-1 max-w-3xl text-paper/60" style={s(14, 400, 1.6)}>{desc}</p>
        </div>
      </div>
      <div className="grid items-start justify-center gap-x-8 gap-y-14" style={{ gridTemplateColumns: "repeat(auto-fill, 408px)" }}>
        {children}
      </div>
    </section>
  );
}

const GLOBAL_NOTES: { t: string; d: string }[] = [
  { t: "Cakupan: hanya modul Compose", d: "Saya hanya membaca folder karsa-mobile-compose (aplikasi Android). Situs web Next.js di repo yang sama (landing, /materi, /unduh, login web, dashboard, admin, pengelola, halaman legal web) bukan Compose, jadi tidak dirender di sini." },
  { t: "Tidak dijalankan di emulator", d: "Semua tampilan disusun dari membaca kode (ukuran dp, warna, radius, tipografi, struktur). Saya tidak menjalankan aplikasinya, jadi kerapatan piksel, ripple, bayangan elevasi Android, dan perilaku scroll hanyalah perkiraan terbaik." },
  { t: "Data dummy, bukan data server", d: "Data aplikasi asli datang dari API (net/ApiClient.kt). Saya memakai seed di data/KarsaData.kt bila ada, dan mengarang sisanya: isi Teman Baca AI, total poin, peringkat, preview grup, jumlah pembaca, dan lainnya." },
  { t: "Elemen sistem Android", d: "Status bar, gesture bar, keyboard, share sheet, pemilih berkas (.docx), dan Chrome Custom Tab untuk login Google tidak ada di kode Compose. Saya hanya menggambar tiruan status bar dan gesture bar. Layar browser login Google tidak ditampilkan." },
  { t: "Ikon", d: "KarsaIcons.kt berisi path ikon bergaya Lucide yang di-port manual. Saya memakai lucide-react dengan nama yang sama. Bentuknya setara, tetapi bisa sedikit berbeda karena versi atau ketebalan garis." },
  { t: "Animasi hanya sebagian", d: "Yang ditiru: carousel dan progress Splash, denyut cincin logo, kartu melayang Onboarding, animasi muncul 'rise', dan skeleton. Yang tidak ditiru: transisi push antar-layar, geser pager, pegas logo, press-scale, dan transisi sheet. Itu hanya tampil sebagai keadaan akhir yang statis." },
  { t: "Tarik untuk memperbarui", d: "Teks 'Tarik layar untuk memperbarui status' ada di kode, tetapi saya tidak menemukan implementasi indikator pull-to-refresh di file yang saya baca. Karena itu saya tidak menggambarnya." },
  { t: "Tema gelap tidak ada", d: "Theme.kt hanya mendefinisikan lightColorScheme, jadi saya tidak membuat versi gelap. Latar galeri ini gelap hanya sebagai pembungkus presentasi." },
  { t: "Kondisi layar yang tidak saya gambar", d: "Beberapa kondisi ada di kode tetapi tidak saya render, antara lain: Teman Baca dinonaktifkan, loading, dan kuota token atau ringkasan habis; dialog kuota web search; blokir/unblokir dalam daftar pesan; mode 'compact' Splash untuk layar pendek (<720dp). Saya hanya mengambil keadaan yang paling representatif." },
  { t: "Ukuran layar", d: "Semua frame berukuran 390×844 dp. Layar asli bisa lebih sempit atau lebih tinggi. Beberapa layar (Splash, Input) menghitung tinggi secara dinamis, sehingga hasil pada perangkat lain bisa sedikit berbeda." },
  { t: "Tab berbasis peran", d: "Tab ditentukan oleh capabilities dari server: PJ memakai Lib, Grup, Input (tombol tengah), Aktivitas, Akun; Mahasiswa memakai Lib, Grup, Poinku, Akun. Grup hanya muncul bila punya kelas. Saya menampilkan kedua peran, tetapi kombinasi izin lain tidak." },
  { t: "Ikon launcher", d: "Ikon aplikasi (tile oranye dengan 4 kelopak) dibaca dari res/drawable. Saya hanya menampilkannya sebagai LogoMark, bukan sebagai ikon adaptif Android lengkap dengan mask." },
];

export default function App() {
  const [tall, setTall] = useState(false);
  const nav = [
    ["tokens", "Design tokens"], ["alur", "Alur awal"], ["lib", "Karsa Lib"], ["libdetail", "Baca & tulis"],
    ["grup", "Grup"], ["poin", "Input & Aktivitas"], ["poinku", "Poinku"], ["akun", "Akun & Legal"],
  ];
  return (
    <TallCtx.Provider value={tall}>
      <div className="min-h-screen bg-[#17100b] text-paper" style={{ fontFamily: "var(--font-sans)" }}>
        <header className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(60% 80% at 20% 0%, rgba(227,107,15,.35), transparent 70%)" }} />
          <div className="relative mx-auto max-w-[1800px] px-6 py-14">
            <div className="flex items-center gap-4">
              <LogoMark size={64} radius={20} />
              <div>
                <div className="text-brand-300" style={s(12, 700, 1.4, 0.16)}>PEMBACAAN KODE · karsa-mobile-compose</div>
                <h1 style={d(48, 800, 1, -0.02)}>SiKarsa — Galeri UI Compose</h1>
              </div>
            </div>
            <p className="mt-5 max-w-3xl text-paper/70" style={s(15, 400, 1.7)}>
              Seluruh layar aplikasi Android SiKarsa (Jetpack Compose) direkonstruksi ke HTML dari hasil membaca kode theme, komponen, dan semua layar. Semua data akun dan isi adalah <b className="text-paper">dummy</b>. Bagian yang tidak pasti ditandai <span className="rounded bg-butter-400/20 px-1.5 text-butter-100">⚠ Keterangan</span>.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setTall((v) => !v)}
                className={cn("rounded-full px-5 py-2.5 transition", tall ? "bg-brand-500 text-white" : "bg-white/10 text-paper hover:bg-white/15")}
                style={s(13, 700, 1.2)}
              >
                {tall ? "✓ Tampilkan layar penuh (tanpa scroll)" : "Tampilkan layar penuh (tanpa scroll)"}
              </button>
              <span className="text-paper/50" style={s(12, 400, 1.4)}>Default: setiap frame 390×844 dan bisa di-scroll seperti di ponsel.</span>
            </div>
          </div>
        </header>

        <nav className="sticky top-0 z-[100] border-b border-white/10 bg-[#17100b]/90 backdrop-blur">
          <div className="no-scrollbar mx-auto flex max-w-[1800px] gap-2 overflow-x-auto px-6 py-3">
            <a href="#catatan" className="shrink-0 rounded-full bg-butter-400/15 px-4 py-1.5 text-butter-100" style={s(12, 700, 1.2)}>⚠ Keterangan penting</a>
            {nav.map(([id, l]) => (
              <a key={id} href={`#${id}`} className="shrink-0 rounded-full bg-white/10 px-4 py-1.5 text-paper/80 hover:bg-white/15" style={s(12, 600, 1.2)}>{l}</a>
            ))}
          </div>
        </nav>

        <main className="mx-auto max-w-[1800px] px-6">
          <section id="catatan" className="scroll-mt-24 py-12">
            <h2 style={d(30, 800, 1.1, -0.02)}>⚠ Keterangan: yang kurang saya ketahui atau tidak saya tampilkan</h2>
            <p className="mt-1 max-w-3xl text-paper/60" style={s(14, 400, 1.6)}>Catatan wajib. Daftar ini merangkum keterbatasan rekonstruksi. Catatan khusus per layar ada di bawah masing-masing frame.</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {GLOBAL_NOTES.map((n, i) => (
                <div key={n.t} className="rounded-2xl border border-butter-400/25 bg-butter-400/[0.07] p-4">
                  <div className="text-butter-100" style={s(13, 700, 1.4)}>{i + 1}. {n.t}</div>
                  <div className="mt-1 text-paper/70" style={s(12.5, 400, 1.6)}>{n.d}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="tokens" className="scroll-mt-24 py-12">
            <div className="mb-8 flex items-start gap-4">
              <span className="text-brand-400" style={d(44, 800, 1, -0.02)}>00</span>
              <div>
                <h2 style={d(30, 800, 1.1, -0.02)}>Design tokens & komponen dasar</h2>
                <p className="mt-1 max-w-3xl text-paper/60" style={s(14, 400, 1.6)}>Dari theme/Colors.kt, Theme.kt, Type.kt, ui/Common.kt, ui/Overlay.kt, components/Snackbar.kt, components/Dock.kt.</p>
              </div>
            </div>
            <Tokens />
          </section>

          <Section id="alur" no="01" title="Alur awal" desc="Fase aplikasi: Splash → Onboarding → Login → (SessionError bila server tidak terjangkau) → App.">
            <Spec title="Splash (interaktif)" comp="SplashScreen · Splash.kt" notes={[I("Kartu fitur berganti tiap 1,8 dtk, progres 4,2 dtk. Urutan kartu diacak di aplikasi asli; di sini berurutan."), W("Cincin besar di bagian atas dan posisi lingkaran dihitung dari kode dan mungkin berbeda beberapa dp.")]}>
              <SplashScreen />
            </Spec>
            <Spec title="Onboarding 1/3" comp="OnboardingScreen · Onboarding.kt" notes={[I("Kartu mengambang dan potongan kartu berikutnya di tepi kanan berasal dari contentPadding pager."), W("Gerakan geser pager tidak ditiru, hanya keadaan akhir tiap halaman.")]}><OnboardingScreen index={0} /></Spec>
            <Spec title="Onboarding 2/3" comp="OnboardingScreen · Onboarding.kt"><OnboardingScreen index={1} /></Spec>
            <Spec title="Onboarding 3/3" comp="OnboardingScreen · Onboarding.kt"><OnboardingScreen index={2} /></Spec>
            <Spec title="Login — awal" comp="LoginScreen · Login.kt" notes={[I("Setelah menekan 'Masuk dengan Google', login dilanjutkan di browser (tidak ditampilkan).")]}><LoginScreen variant="default" /></Spec>
            <Spec title="Login — syarat belum disetujui" comp="AuthErrorBanner · Login.kt"><LoginScreen variant="error" /></Spec>
            <Spec title="Login — syarat disetujui" comp="TermsCard (checked) · Login.kt"><LoginScreen variant="accepted" /></Spec>
            <Spec title="Login — menunggu browser" comp="WaitingCard · Login.kt"><LoginScreen variant="waiting" /></Spec>
            <Spec title="Gagal memeriksa sesi" comp="SessionErrorScreen · Login.kt"><SessionErrorScreen /></Spec>
          </Section>

          <Section id="lib" no="02" title="Tab Karsa Lib" desc="Perpustakaan artikel per prodi. Tombol 'Tulis' dan menu ⋮ berubah sesuai izin penulis.">
            <Spec title="Beranda — penulis aktif (PJ)" comp="LibHome · LibScreens.kt" notes={[I("Dock lima tab. Tab aktif memakai pil Brand500.")]}><LibHome variant="feed" /></Spec>
            <Spec title="Beranda — menu ⋮ terbuka" comp="PopMenu · Overlay.kt"><LibHome variant="menu" /></Spec>
            <Spec title="Beranda — banner 'Ingin ikut menulis?'" comp="AuthorBanner (None)" notes={[I("Tampilan Mahasiswa: Dock empat tab (Lib, Grup, Poinku, Akun). Teks banner berubah menjadi 'Permohonan belum disetujui' bila pernah ditolak, tidak saya gambar.")]}><LibHome variant="banner" writer={false} /></Spec>
            <Spec title="Beranda — sheet 'Perlu akses penulis'" comp="KarsaSheet · LibHome"><LibHome variant="gate" writer={false} /></Spec>
            <Spec title="Beranda — pengajuan ditinjau" comp="AuthorBanner (Pending)"><LibHome variant="pending" writer={false} /></Spec>
            <Spec title="Beranda — siapkan profil" comp="ProfileSetupContent"><LibHome variant="setup" /></Spec>
            <Spec title="Beranda — pencarian kosong" comp="EmptyState · LibHome"><LibHome variant="emptySearch" /></Spec>
            <Spec title="Beranda — memuat (skeleton)" comp="ListSkeleton"><LibHome variant="loading" /></Spec>
            <Spec title="Beranda — gagal memuat" comp="EmptyState + Coba lagi"><LibHome variant="error" /></Spec>
          </Section>

          <Section id="libdetail" no="03" title="Baca & tulis (Karsa Lib)" desc="Layar yang dibuka lewat stack di atas tab: artikel, Teman Baca AI, editor, tulisan saya, impor .docx, akses penulis, profil penulis.">
            <Spec title="Artikel + diskusi" comp="ArticleScreen · LibScreens.kt" notes={[I("Tombol ✨ hanya muncul bila artikel mendukung AI (aiEnabled)."), W("Isi artikel adalah markdown sederhana (H1, H2, daftar, kutipan, kode, tebal/miring/tautan). Blok tabel/gambar tidak didukung renderer aslinya.")]}><ArticleScreen /></Spec>
            <Spec title="Artikel — komentar terkirim" comp="Toast sukses"><ArticleScreen overlay="none" /></Spec>
            <Spec title="Teman Baca — tanya materi" comp="LibAiSheet · LibAiSheet.kt" notes={[W("Jawaban AI dan sumber web adalah teks karangan. Rujukan paragraf diambil dari server di aplikasi asli.")]}><ArticleScreen overlay="aiChat" /></Spec>
            <Spec title="Teman Baca — ringkasan" comp="AiSummaryTab"><ArticleScreen overlay="aiSummary" /></Spec>
            <Spec title="Dialog laporkan artikel" comp="LibReportDialog · LibDialogs.kt"><ArticleScreen overlay="report" /></Spec>
            <Spec title="Profil penulis" comp="AuthorProfileScreen · LibAuthorProfile.kt"><AuthorProfileScreen /></Spec>
            <Spec title="Editor — Tulis" comp="EditorScreen · LibWriteScreens.kt" notes={[I("Toolbar markdown: H1, H2, tebal, miring, kode, daftar, kutipan, tautan.")]}><EditorScreen mode="tulis" /></Spec>
            <Spec title="Editor — Pratinjau" comp="EditorScreen (Pratinjau)"><EditorScreen mode="pratinjau" /></Spec>
            <Spec title="Editor — buang perubahan?" comp="KarsaDialog (Danger)"><EditorScreen mode="tulis" leave /></Spec>
            <Spec title="Tulisan saya" comp="MyPostsScreen" notes={[I("Menu ⋮ per kartu: Edit, Terbitkan/Arsipkan/Hapus draf. Panel menu tidak saya buka di sini (tampilan menu ada di bagian Design tokens).")]}><MyPostsScreen /></Spec>
            <Spec title="Tulisan saya — konfirmasi terbit" comp="KarsaDialog (Primary)"><MyPostsScreen confirm /></Spec>
            <Spec title="Impor .docx — awal" comp="ImportScreen"><ImportScreen /></Spec>
            <Spec title="Impor .docx — berkas dipilih" comp="ImportScreen (picked)"><ImportScreen picked /></Spec>
            <Spec title="Akses menulis — form permohonan" comp="AuthorScreen · AuthorRequestContent"><AuthorScreen variant="request" /></Spec>
            <Spec title="Akses menulis — menunggu" comp="AuthorRequestContent (pending)"><AuthorScreen variant="pending" /></Spec>
            <Spec title="Akses menulis — penulis aktif" comp="WriterHub"><AuthorScreen variant="hub" /></Spec>
            <Spec title="Akses menulis — lengkapi profil" comp="ProfileSetupContent"><AuthorScreen variant="setup" /></Spec>
          </Section>

          <Section id="grup" no="04" title="Tab Grup" desc="Daftar grup kelas dan ruang obrolan per mata kuliah. Fitur moderasi hanya untuk PJ (isManager).">
            <Spec title="Daftar grup" comp="GroupList · GroupsScreen.kt" notes={[W("Badge jumlah pesan belum dibaca ada di kode tetapi nilainya di-hardcode 0, jadi tidak pernah tampil. Preview pesan terakhir berasal dari server.")]}><GroupList /></Spec>
            <Spec title="Daftar grup — kosong" comp="EmptyState"><GroupList variant="empty" /></Spec>
            <Spec title="Daftar grup — pencarian tak ketemu" comp="EmptyState + SearchX"><GroupList variant="noResult" /></Spec>
            <Spec title="Obrolan — anggota" comp="ChatScreen" notes={[I("Gelembung kita: Brand500; orang lain: putih dengan tepi. Pesan yang disematkan diberi garis Brand300.")]}><ChatScreen /></Spec>
            <Spec title="Obrolan — PJ (kunci & laporan)" comp="ChatScreen (isManager)"><ChatScreen manager /></Spec>
            <Spec title="Obrolan — grup dikunci" comp="ChatScreen (locked)"><ChatScreen locked /></Spec>
            <Spec title="Obrolan — mengedit pesan" comp="ChatScreen (editing)"><ChatScreen manager editing /></Spec>
            <Spec title="Obrolan — membalas" comp="ChatScreen (replyTo)"><ChatScreen replying /></Spec>
            <Spec title="Sheet aksi pesan — anggota" comp="KarsaSheet · ActionRow"><ChatScreen overlay="actions" /></Spec>
            <Spec title="Sheet aksi pesan — PJ" comp="KarsaSheet · ActionRow"><ChatScreen manager overlay="actionsManager" /></Spec>
            <Spec title="Pesan disematkan" comp="KarsaSheet"><ChatScreen overlay="pins" /></Spec>
            <Spec title="Laporkan pesan" comp="KarsaSheet + radio alasan"><ChatScreen overlay="report" /></Spec>
            <Spec title="Sembunyikan pesan" comp="KarsaDialog (Danger)"><ChatScreen manager overlay="hide" /></Spec>
            <Spec title="Blokir pengguna" comp="KarsaDialog (Danger)"><ChatScreen overlay="block" /></Spec>
            <Spec title="Buka blokir" comp="KarsaDialog (Primary)" notes={[W("Setelah pengguna diblokir, pesannya tampil sebagai 'Pesan dari pengguna yang diblokir' (bg Paper3/50). Baris ini ada di kode tetapi tidak saya gambar pada data dummy.")]}><ChatScreen overlay="unblock" /></Spec>
            <Spec title="Hapus pesan" comp="KarsaDialog (Danger)"><ChatScreen manager overlay="delete" /></Spec>
            <Spec title="Laporan grup (PJ)" comp="GroupReportsScreen · GroupReportsScreen.kt"><GroupReportsScreen /></Spec>
            <Spec title="Laporan grup — kosong" comp="EmptyState"><GroupReportsScreen empty /></Spec>
          </Section>

          <Section id="poin" no="05" title="Input poin & Aktivitas (PJ)" desc="Khusus pengguna yang berhak mencatat poin (recordPoints). Tombol tengah Dock membuka wizard 3 langkah.">
            <Spec title="Input poin — langkah 1" comp="InputPoin · InputScreen.kt"><InputScreen variant="step1" /></Spec>
            <Spec title="Input poin — pilih matkul" comp="SelectField → KarsaSheet"><InputScreen variant="sheet" /></Spec>
            <Spec title="Input poin — langkah 2 (kosong)" comp="Step + SearchField"><InputScreen variant="recents" /></Spec>
            <Spec title="Input poin — langkah 2 (hasil cari)" comp="Step + daftar hasil" notes={[I("Pencarian: ≥3 huruf nama atau 2–4 digit terakhir NIM. NIM ditampilkan disamarkan.")]}><InputScreen variant="step2" /></Spec>
            <Spec title="Input poin — langkah 3" comp="Step + SelectField + poin 1–4"><InputScreen variant="step3" /></Spec>
            <Spec title="Input poin — siap kirim" comp="Bar mengambang (ready)"><InputScreen variant="ready" /></Spec>
            <Spec title="Input poin — berhasil" comp="Toast + aksi 'Lihat'" notes={[W("Setelah menyimpan, form di-reset ke langkah 1. Frame ini hanya menempelkan toast pada keadaan siap kirim.")]}><InputScreen variant="saved" /></Spec>
            <Spec title="Aktivitas — Ruang PJ" comp="ActivityHub · ActivityScreens.kt" notes={[W("Angka statistik, total laporan, dan peringkat adalah dummy. Dihitung dari data riwayat dan laporan di aplikasi asli.")]}><ActivityScreen /></Spec>
            <Spec title="Riwayat poin" comp="HistoryScreen"><HistoryScreen /></Spec>
            <Spec title="Riwayat — opsi entri" comp="KarsaSheet"><HistoryScreen overlay="menu" /></Spec>
            <Spec title="Riwayat — konfirmasi hapus" comp="KarsaDialog (Danger)"><HistoryScreen overlay="confirm" /></Spec>
            <Spec title="Riwayat — tidak ada hasil" comp="EmptyState + Toast"><HistoryScreen overlay="empty" /></Spec>
          </Section>

          <Section id="poinku" no="06" title="Poinku, Laporan & Peringkat" desc="Tab Poinku untuk mahasiswa (tanpa hak mencatat). Layar Laporan dan Peringkat yang sama juga dibuka dari Aktivitas (PJ).">
            <Spec title="Poinku — Laporan saya" comp="PoinkuScreen · ReportView"><PoinkuScreen seg="laporan" /></Spec>
            <Spec title="Poinku — Peringkat" comp="PoinkuScreen · RankingView" notes={[I("Podium Top 3 dengan mahkota di juara 1. Baris 'Kamu' diberi garis 2dp Brand500 dan label KAMU. Tombol 'Lihat posisiku' menyorot baris selama 1,8 dtk."), W("Urutan dan skor peringkat adalah dummy. Peringkat bersama (skor sama) diurutkan berdasarkan nama di data dummy ini.")]}><PoinkuScreen seg="peringkat" /></Spec>
            <Spec title="Poinku — belum ada laporan" comp="EmptyState"><PoinkuScreen seg="kosong" /></Spec>
            <Spec title="Laporan saya (layar penuh)" comp="ReportScreen"><ReportScreen /></Spec>
            <Spec title="Partisipasi teratas (layar penuh)" comp="RankingScreen"><RankingScreen /></Spec>
          </Section>

          <Section id="akun" no="07" title="Akun & Dokumen hukum" desc="Profil, identitas, akses fitur, informasi aplikasi, dan logout.">
            <Spec title="Akun — PJ" comp="AccountScreen · AccountScreens.kt" notes={[W("Nomor versi di bawah ('1.0.0') adalah dummy. Aslinya BuildConfig.VERSION_NAME.")]}><AccountScreen role="pj" /></Spec>
            <Spec title="Akun — Mahasiswa (menunggu tinjauan)" comp="AccountScreen (Pending)"><AccountScreen role="mhs" author="pending" /></Spec>
            <Spec title="Akun — konfirmasi keluar" comp="KarsaDialog (Danger)"><AccountScreen role="mhs" author="none" logout /></Spec>
            <Spec title="Syarat Penggunaan" comp="LegalScreen (Terms)" notes={[I("Teks diambil persis dari data/KarsaData.kt. Tombol ↗ membuka versi web, tidak ditampilkan.")]}><LegalScreen doc="terms" /></Spec>
            <Spec title="Kebijakan Privasi" comp="LegalScreen (Privacy)"><LegalScreen doc="privacy" /></Spec>
          </Section>
        </main>

        <footer className="border-t border-white/10 py-10 text-center text-paper/40" style={s(12, 400, 1.6)}>
          Rekonstruksi UI dari github.com/ywildan/karsa · modul karsa-mobile-compose · semua data dummy
        </footer>
      </div>
    </TallCtx.Provider>
  );
}
