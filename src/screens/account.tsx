import type { ReactNode } from "react";
import {
  BadgeCheck,
  Building2,
  ChevronRight,
  ExternalLink,
  FileText,
  GraduationCap,
  Lock,
  LogOut,
  MessageCircle,
  PenLine,
  RefreshCw,
  ShieldCheck,
  UserPen,
  Users,
  BookOpen,
} from "lucide-react";
import { Body, MHS_TABS, PJ_TABS, Phone } from "../phone";
import { Avatar, Badge, Button, Card, Dialog, Eyebrow, IconButton, Kawung, PageHeader, TopBar, d, s } from "../ui";
import { LEGAL, LEGAL_CONTACT, LEGAL_EFFECTIVE, LEGAL_VERSION, ME } from "../data";
import type { BadgeTone } from "../ui";

function InfoRow({ icon, label, children, chevron }: { icon: ReactNode; label: string; children?: ReactNode; chevron?: boolean }) {
  return (
    <div className="flex items-center gap-3.5 px-4 py-3.5">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-paper2 text-ink2">{icon}</div>
      <div className="min-w-0 flex-1">
        <div style={s(15, 600, 1.3)}>{label}</div>
        {children}
      </div>
      {chevron && <ChevronRight size={20} className="text-muted" />}
    </div>
  );
}
const Div = () => <div className="h-px bg-line" />;
const val = (t: string) => <div className="text-muted" style={s(13, 400, 1.4)}>{t}</div>;

export function AccountScreen({ role, author = "approved", logout }: { role: "pj" | "mhs"; author?: "approved" | "pending" | "none"; logout?: boolean }) {
  const pj = role === "pj";
  const scopes = ["Karsa Lib", author === "approved" ? "Tulis artikel" : null, "Laporan", "Peringkat", "Grup kelas"].filter(Boolean).join(" · ");
  const tone: BadgeTone = author === "approved" ? "leaf" : author === "pending" ? "tide" : "neutral";
  const label = author === "approved" ? "DISETUJUI" : author === "pending" ? "MENUNGGU TINJAUAN" : "BELUM DIAJUKAN";
  return (
    <Phone
      tabs={pj ? PJ_TABS : MHS_TABS}
      active="akun"
      fixed={logout}
      overlay={logout ? <Dialog tone="danger" title="Keluar dari SiKarsa?" desc="Kamu perlu masuk lagi dengan akun Google kampus untuk melanjutkan. Draf tulisan yang belum disimpan akan hilang." confirm="Keluar" /> : undefined}
    >
      <PageHeader title="Akun" eyebrow={<Eyebrow>Profil</Eyebrow>} right={<IconButton><RefreshCw size={20} className="text-ink2" /></IconButton>} />
      <Body dock gap={24}>
        <div className="rise sh-card rounded-[32px] bg-espresso p-6">
          <div className="relative">
            <Kawung alpha={0.12} />
            <div className="relative">
              <div className="flex items-center gap-4">
                <Avatar name={ME.name} size={68} tone="brand" border={4} borderColor="rgba(255,255,255,.1)" />
                <div className="min-w-0 flex-1">
                  <div className="text-white" style={d(22, 700, 1.25)}>{ME.name}</div>
                  <div className="truncate text-white/60" style={s(13, 400, 1.4)}>{ME.email}</div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                <div>
                  <div className="text-white/50" style={s(11, 700, 1.4, 0.1)}>NIM</div>
                  <div className="text-white" style={d(18, 700, 1.2, 0.02)}>{ME.nim}</div>
                </div>
                <Badge tone="solid" icon={pj ? <ShieldCheck size={12} /> : <GraduationCap size={12} />}>{pj ? "PJ KELAS" : "MAHASISWA"}</Badge>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="px-1 py-3" style={d(18, 700)}>Identitas dan akses</div>
          <Card>
            <InfoRow icon={<ShieldCheck size={20} />} label="Akses Karsa">
              {val(pj ? "PJ mata kuliah · pencatat poin" : "Mahasiswa")}
              <div className="text-muted" style={s(12, 400, 1.45)}>{scopes}</div>
            </InfoRow>
            <Div />
            <InfoRow icon={<Building2 size={20} />} label="Fakultas Karsa Lib">{val(ME.fakultas)}</InfoRow>
            <Div />
            <InfoRow icon={<GraduationCap size={20} />} label="Program studi">{val(ME.prodi)}</InfoRow>
            <Div />
            <InfoRow icon={<Users size={20} />} label="Kelas Karsa Lib">{val(ME.kelas)}</InfoRow>
            <Div />
            <div className="flex items-center gap-3.5 px-4 py-3.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-paper2 text-ink2"><PenLine size={20} /></div>
              <div className="flex-1" style={s(15, 600, 1.3)}>Akses menulis</div>
              <Badge tone={tone}>{label}</Badge>
              <ChevronRight size={20} className="text-muted" />
            </div>
            <Div />
            <InfoRow icon={<UserPen size={20} />} label="Profil penulis" chevron>
              {val(author === "approved" ? "Tampil di artikel yang kamu terbitkan" : "Nama, fakultas, prodi, kelas")}
            </InfoRow>
          </Card>
        </div>
        <div>
          <div className="px-1 py-3" style={d(18, 700)}>Informasi aplikasi</div>
          <Card>
            <InfoRow icon={<FileText size={20} />} label="Syarat Penggunaan" chevron>
              <div className="text-muted" style={s(12, 400, 1.4)}>Versi {LEGAL_VERSION} · {LEGAL_EFFECTIVE}</div>
            </InfoRow>
            <Div />
            <InfoRow icon={<Lock size={20} />} label="Kebijakan Privasi" chevron>
              <div className="text-muted" style={s(12, 400, 1.4)}>Versi {LEGAL_VERSION} · {LEGAL_EFFECTIVE}</div>
            </InfoRow>
            <Div />
            <InfoRow icon={<MessageCircle size={20} />} label="Bantuan & masukan" chevron>
              <div className="text-muted" style={s(12, 400, 1.4)}>{LEGAL_CONTACT}</div>
            </InfoRow>
          </Card>
        </div>
        <div>
          <Button variant="dangerSoft" size="lg" full leading={<LogOut size={20} />}>Keluar dari aplikasi</Button>
          <div className="mt-6 flex items-center justify-center gap-1.5 text-muted" style={s(12, 600, 1.4)}>
            <BadgeCheck size={16} className="text-brand-500" /> SiKarsa Mobile 1.0.0
          </div>
        </div>
      </Body>
    </Phone>
  );
}

export function LegalScreen({ doc }: { doc: "terms" | "privacy" }) {
  const data = LEGAL[doc];
  return (
    <Phone>
      <TopBar title={data.title} subtitle={`Versi ${LEGAL_VERSION} · Berlaku sejak ${LEGAL_EFFECTIVE}`} right={<IconButton><ExternalLink size={20} className="text-ink2" /></IconButton>} />
      <Body className="pt-2 pb-6" gap={16}>
        <div className="rounded-3xl bg-brand-50 p-5">
          <div className="text-brand-600" style={s(11, 700, 1.4, 0.08)}>Dokumen layanan Karsa</div>
          <div className="mt-2 text-ink2" style={s(15, 400, 1.7)}>{data.summary}</div>
        </div>
        {data.sections.map((sec) => (
          <Card key={sec.h}>
            <div className="p-5">
              <div style={d(18, 700, 1.25)}>{sec.h}</div>
              {sec.p.map((p, i) => <div key={i} className="mt-2 text-ink2" style={s(15, 400, 1.75)}>{p}</div>)}
            </div>
          </Card>
        ))}
        <div className="px-1 py-1">
          <div className="text-muted" style={s(13, 400, 1.6)}>Ada pertanyaan tentang dokumen ini? Hubungi pengelola Karsa di {LEGAL_CONTACT}.</div>
          <Button variant="soft" className="mt-3" leading={<ExternalLink size={18} />}>Buka versi web</Button>
        </div>
      </Body>
    </Phone>
  );
}

export { BookOpen };
