import type { CSSProperties, ReactNode } from "react";
import { useId } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  EllipsisVertical,
  Inbox,
  Info,
  LoaderCircle,
  RefreshCw,
  Search,
  TriangleAlert,
  CircleCheck,
  X,
} from "lucide-react";

/* ───────── Tipografi: displayStyle() / sansStyle() di theme/Type.kt ───────── */
export const d = (size: number, weight = 800, lh = 1.2, tr = 0): CSSProperties => ({
  fontFamily: "var(--font-display)",
  fontSize: size,
  fontWeight: weight,
  lineHeight: lh,
  letterSpacing: tr ? `${tr}em` : undefined,
});
export const s = (size: number, weight = 400, lh = 1.5, tr = 0): CSSProperties => ({
  fontFamily: "var(--font-sans)",
  fontSize: size,
  fontWeight: weight,
  lineHeight: lh,
  letterSpacing: tr ? `${tr}em` : undefined,
});

export const cn = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");

/* ───────── Kawung pattern (KawungPattern di Common.kt) ───────── */
export function Kawung({
  color = "#fff",
  alpha = 0.2,
  fade = false,
  className = "",
}: {
  color?: string;
  alpha?: number;
  fade?: boolean;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full pointer-events-none", className)}
      style={
        fade
          ? {
              maskImage: "radial-gradient(circle at 50% 45%, #000 0, transparent 77%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 45%, #000 0, transparent 77%)",
            }
          : undefined
      }
    >
      <defs>
        <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeOpacity={alpha} strokeWidth="1.2">
            <ellipse cx="22" cy="22" rx="6" ry="11" />
            <ellipse cx="22" cy="33" rx="6" ry="11" />
            <ellipse cx="22" cy="22" rx="11" ry="6" />
            <ellipse cx="33" cy="22" rx="11" ry="6" />
          </g>
          <circle cx="22" cy="22" r="1.8" fill={color} fillOpacity={alpha * 1.4} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ───────── Logo (components/Logo.kt) ───────── */
export function LogoMark({
  size = 56,
  tile = "#E36B0F",
  ink = "#fff",
  radius = 15,
}: {
  size?: number;
  tile?: string;
  ink?: string;
  radius?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx={radius} fill={tile} />
      <g stroke={ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="24" cy="14.5" rx="5.2" ry="8.8" />
        <ellipse cx="24" cy="33.5" rx="5.2" ry="8.8" />
        <ellipse cx="14.5" cy="24" rx="8.8" ry="5.2" />
        <ellipse cx="33.5" cy="24" rx="8.8" ry="5.2" />
      </g>
      <circle cx="24" cy="24" r="3.2" fill={ink} />
    </svg>
  );
}

/** Logo bunga 4 kelopak versi splash (BloomLogo di Splash.kt) */
export function BloomLogo({ size, bg, mark }: { size: number; bg: string; mark: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ background: bg, borderRadius: "50%" }}>
      {[0, 90, 180, 270].map((r) => (
        <ellipse
          key={r}
          cx="50"
          cy="29.1"
          rx="11.5"
          ry="18.75"
          fill="none"
          stroke={mark}
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${r} 50 50)`}
        />
      ))}
    </svg>
  );
}

export function GoogleMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

export function Spinner({ size = 20, className = "" }: { size?: number; className?: string }) {
  return <LoaderCircle size={size} className={cn("spin", className)} />;
}

/* ───────── Button (KarsaButton) ───────── */
export type BtnVariant = "primary" | "dark" | "soft" | "outline" | "ghost" | "danger" | "dangerSoft";
export type BtnSize = "sm" | "md" | "lg";

export function Button({
  children,
  variant = "primary",
  size = "md",
  full,
  loading,
  disabled,
  leading,
  trailing,
  className = "",
}: {
  children: ReactNode;
  variant?: BtnVariant;
  size?: BtnSize;
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}) {
  const active = !disabled && !loading;
  const dims = {
    sm: "h-9 rounded-full px-3.5 gap-1.5",
    md: "h-12 rounded-2xl px-5 gap-2",
    lg: "h-14 rounded-[20px] px-6 gap-2.5",
  }[size];
  const fs = { sm: 13, md: 15, lg: 16 }[size];
  const palette: Record<BtnVariant, string> = {
    primary: "bg-brand-500 text-white sh-brand",
    dark: "bg-espresso text-white",
    soft: "bg-brand-100 text-brand-700",
    outline: "bg-white text-ink border border-line",
    ghost: "bg-transparent text-ink2",
    danger: "bg-danger-500 text-white",
    dangerSoft: "bg-danger-100 text-danger-500",
  };
  const off =
    variant === "ghost" || variant === "outline"
      ? "bg-transparent text-muted " + (variant === "outline" ? "border border-line" : "")
      : "bg-paper3 text-muted";
  return (
    <div
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap active:scale-[0.98] transition-transform",
        dims,
        active ? palette[variant] : off,
        full && "flex w-full",
        className,
      )}
      style={s(fs, 600, 1.2)}
    >
      {loading ? <Spinner size={20} /> : leading}
      {children}
      {trailing}
    </div>
  );
}

export function IconButton({
  children,
  variant = "plain",
  className = "",
}: {
  children: ReactNode;
  variant?: "plain" | "ghost" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full",
        variant === "plain" && "bg-white border border-line text-ink",
        variant === "ghost" && "bg-transparent text-ink",
        variant === "dark" && "bg-espresso text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ───────── Avatar / Badge / PointBadge ───────── */
export type Tone = "brand" | "butter" | "leaf" | "tide" | "plum" | "clay";
const TONES: Tone[] = ["brand", "butter", "leaf", "tide", "plum", "clay"];
export const toneFor = (seed: string): Tone => {
  let h = 0;
  for (const ch of seed) h = (Math.imul(h, 31) + ch.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
};
const toneBg: Record<Tone, string> = {
  brand: "bg-brand-100",
  butter: "bg-butter-100",
  leaf: "bg-leaf-100",
  tide: "bg-tide-100",
  plum: "bg-plum-100",
  clay: "bg-paper3",
};
export const toneFg: Record<Tone, string> = {
  brand: "text-brand-700",
  butter: "text-butter-700",
  leaf: "text-leaf-600",
  tide: "text-tide-600",
  plum: "text-plum-600",
  clay: "text-ink2",
};
export const toneName: Record<Tone, string> = {
  brand: "text-brand-600",
  butter: "text-butter-700",
  leaf: "text-leaf-600",
  tide: "text-tide-600",
  plum: "text-plum-600",
  clay: "text-ink2",
};
export const initials = (n: string) =>
  n
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

export function Avatar({
  name,
  size = 40,
  tone,
  square,
  border,
  borderColor = "#2A1A10",
  className = "",
}: {
  name: string;
  size?: number;
  tone?: Tone;
  square?: boolean;
  border?: number;
  borderColor?: string;
  className?: string;
}) {
  const t = tone ?? toneFor(name);
  return (
    <div
      className={cn("flex shrink-0 items-center justify-center", toneBg[t], toneFg[t], className)}
      style={{
        width: size,
        height: size,
        borderRadius: square ? 14 : 9999,
        boxShadow: border ? `0 0 0 ${border}px ${borderColor}` : undefined,
        ...d(Math.max(11, Math.floor(size * 0.36)), 700, 1.2),
      }}
    >
      {initials(name)}
    </div>
  );
}

export type BadgeTone = "brand" | "solid" | "dark" | "leaf" | "butter" | "danger" | "neutral" | "plum" | "tide";
const badgeCls: Record<BadgeTone, string> = {
  brand: "bg-brand-100 text-brand-700",
  solid: "bg-brand-500 text-white",
  dark: "bg-espresso text-white",
  leaf: "bg-leaf-100 text-leaf-600",
  butter: "bg-butter-100 text-butter-700",
  danger: "bg-danger-100 text-danger-500",
  neutral: "bg-paper2 text-ink2",
  plum: "bg-plum-100 text-plum-600",
  tide: "bg-tide-100 text-tide-600",
};
export function Badge({
  children,
  tone = "brand",
  icon,
  className = "",
}: {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1", badgeCls[tone], className)}
      style={s(11, 700, 1.2, 0.025)}
    >
      {icon}
      {children}
    </span>
  );
}

export function PointBadge({ points, large }: { points: number; large?: boolean }) {
  const cls =
    points >= 4
      ? "bg-brand-500 text-white"
      : points === 3
        ? "bg-brand-100 text-brand-700"
        : points === 2
          ? "bg-butter-100 text-butter-700"
          : "bg-paper2 text-ink2";
  return (
    <div
      className={cn("flex shrink-0 items-center justify-center", cls)}
      style={{
        width: large ? 56 : 44,
        height: large ? 56 : 44,
        borderRadius: large ? 18 : 14,
        ...d(large ? 24 : 18, 800, 1),
      }}
    >
      +{points}
    </div>
  );
}

/* ───────── Card / Chip / Segmented ───────── */
export function Card({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn("sh-card overflow-hidden rounded-[28px] border border-ink/5 bg-white", className)}
    >
      {children}
    </div>
  );
}

export function Chip({
  children,
  selected,
  icon,
  onClick,
}: {
  children: ReactNode;
  selected?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-4 active:scale-95 transition-transform",
        selected ? "bg-espresso text-white" : "border border-line bg-white text-ink2",
      )}
      style={s(13, 600, 1.2)}
    >
      {icon}
      {children}
    </div>
  );
}

export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string; icon?: ReactNode }[];
  value: T;
  onChange?: (v: T) => void;
}) {
  return (
    <div className="flex rounded-full bg-paper3/70 p-1">
      {options.map((o) => {
        const sel = o.value === value;
        return (
          <div
            key={String(o.value)}
            onClick={() => onChange?.(o.value)}
            className={cn(
              "flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full px-3",
              sel ? "bg-white text-ink shadow-sm" : "text-ink2",
            )}
            style={s(13, 600, 1.2)}
          >
            {o.icon}
            {o.label}
          </div>
        );
      })}
    </div>
  );
}

/* ───────── Input ───────── */
export function Field({
  label,
  hint,
  right,
  children,
}: {
  label?: string;
  hint?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      {(label || right) && (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-ink2" style={s(13, 600, 1.2)}>
            {label}
          </span>
          {right}
        </div>
      )}
      {children}
      {hint && (
        <div className="mt-1.5 text-muted" style={s(12, 400, 1.4)}>
          {hint}
        </div>
      )}
    </div>
  );
}

export function TextField({
  value,
  placeholder,
  multiline,
  minHeight,
  focused,
  trailing,
  onChange,
}: {
  value?: string;
  placeholder?: string;
  multiline?: boolean;
  minHeight?: number;
  focused?: boolean;
  trailing?: ReactNode;
  onChange?: (v: string) => void;
}) {
  const cls = cn(
    "w-full rounded-2xl border-2 outline-none placeholder:text-muted/80 focus:border-brand-400 focus:bg-white text-ink",
    focused ? "border-brand-400 bg-white" : "border-transparent bg-paper2",
  );
  return (
    <div className="relative">
      {multiline ? (
        <textarea
          defaultValue={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(cls, "resize-none px-4 py-3.5")}
          style={{ ...s(15, 400, 1.5), minHeight: minHeight ?? 84 }}
        />
      ) : (
        <input
          defaultValue={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(cls, "h-[52px] px-4")}
          style={s(15, 400, 1.5)}
        />
      )}
      {trailing && <div className="absolute right-3 top-1/2 -translate-y-1/2">{trailing}</div>}
    </div>
  );
}

export function SearchField({
  value,
  placeholder,
  onChange,
}: {
  value?: string;
  placeholder: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="flex h-[52px] items-center rounded-2xl border border-line bg-white pl-4 pr-3">
      <Search size={18} className="shrink-0 text-muted" />
      <input
        defaultValue={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="ml-2.5 min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted/80"
        style={s(15, 400, 1.5)}
      />
      {value ? (
        <div className="flex size-7 items-center justify-center rounded-full bg-paper2 text-ink2">
          <X size={16} />
        </div>
      ) : null}
    </div>
  );
}

/** Tampilan tertutup SelectField (dibuka sebagai sheet di app asli) */
export function SelectTrigger({
  value,
  placeholder,
  label,
  optional,
}: {
  value?: string;
  placeholder: string;
  label?: string;
  optional?: boolean;
}) {
  return (
    <div>
      {label && (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-ink2" style={s(13, 600, 1.2)}>
            {label}
          </span>
          {optional && (
            <span className="text-muted" style={s(12, 500, 1.2)}>
              Opsional
            </span>
          )}
        </div>
      )}
      <div className="flex h-[52px] items-center rounded-2xl bg-paper2 px-4">
        <span className={cn("flex-1 truncate", value ? "text-ink" : "text-muted/80")} style={s(15, 400, 1.5)}>
          {value ?? placeholder}
        </span>
        <ChevronDown size={20} className="text-muted" />
      </div>
    </div>
  );
}

/* ───────── Loading / Empty / Error ───────── */
export function Skeleton({ className = "", round }: { className?: string; round?: boolean }) {
  return <div className={cn("skel bg-paper3/80", round ? "rounded-full" : "rounded-xl", className)} />;
}

export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="rounded-[28px] border border-ink/5 bg-white p-5">
      <div className="flex items-center gap-3">
        <Skeleton round className="size-10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <div className="mt-5 space-y-2.5">
        <Skeleton className="h-5 w-4/5" />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className={cn("h-3.5", i === lines - 1 ? "w-2/3" : "w-full")} />
        ))}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  desc,
  icon,
  action,
}: {
  title: string;
  desc?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rise flex flex-col items-center px-6 py-12">
      <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-[28px] bg-brand-100 text-brand-600">
        <Kawung color="#26180f" alpha={0.07} />
        <span className="relative">{icon ?? <Inbox size={36} />}</span>
      </div>
      <div className="mt-5 text-center" style={d(20, 700)}>
        {title}
      </div>
      {desc && (
        <div className="mt-1.5 w-[260px] text-center text-muted" style={s(14, 400, 1.625)}>
          {desc}
        </div>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = "Gagal memuat data", desc = "Sepertinya koneksimu terputus. Periksa jaringan lalu coba lagi." }) {
  return (
    <div className="rise flex flex-col items-center px-6 py-12">
      <div className="flex size-20 items-center justify-center rounded-[28px] bg-danger-100 text-danger-500">
        <TriangleAlert size={36} />
      </div>
      <div className="mt-5" style={d(20, 700)}>
        {title}
      </div>
      <div className="mt-1.5 w-[260px] text-center text-muted" style={s(14, 400, 1.625)}>
        {desc}
      </div>
      <Button variant="dark" className="mt-5" leading={<RefreshCw size={16} />}>
        Coba lagi
      </Button>
    </div>
  );
}

/* ───────── Layout helpers ───────── */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-brand-700" style={s(11, 700, 1.4, 0.16)}>
      {children}
    </span>
  );
}

export function PageHeader({
  title,
  eyebrow,
  subtitle,
  right,
}: {
  title: string;
  eyebrow?: ReactNode;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex shrink-0 items-start justify-between px-5 pb-4 pt-5">
      <div className="min-w-0 flex-1">
        {eyebrow && <div className="mb-2 flex items-center gap-2">{eyebrow}</div>}
        <div style={d(34, 800, 1.02, -0.02)}>{title}</div>
        {subtitle && (
          <div className="mt-1.5 text-muted" style={s(14, 400, 1.5)}>
            {subtitle}
          </div>
        )}
      </div>
      {right && <div className="flex items-center gap-2 pl-3 pt-1">{right}</div>}
    </div>
  );
}

export function TopBar({
  title,
  subtitle,
  leading,
  right,
}: {
  title?: string;
  subtitle?: string;
  leading?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex h-16 shrink-0 items-center gap-3 px-4">
      <IconButton>
        <ArrowLeft size={20} />
      </IconButton>
      {leading}
      <div className="min-w-0 flex-1">
        {title && (
          <div className="truncate" style={d(20, 700, 1.25)}>
            {title}
          </div>
        )}
        {subtitle && (
          <div className="truncate text-muted" style={s(12, 400, 1.4)}>
            {subtitle}
          </div>
        )}
      </div>
      {right}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="px-1" style={d(18, 700)}>
      {children}
    </div>
  );
}

/* ───────── Overlay: Sheet / Dialog / Toast / PopMenu (ui/Overlay.kt, Snackbar.kt) ───────── */
export function Sheet({
  title,
  children,
  footer,
  footerDivider = true,
}: {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  footerDivider?: boolean;
}) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end bg-espresso/50">
      <div className="flex max-h-[86%] flex-col overflow-hidden rounded-t-[32px] bg-paper pb-5">
        <div className="mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-paper3" />
        {title && (
          <div className="flex shrink-0 items-center pb-2 pl-6 pr-3 pt-3">
            <div className="flex-1" style={d(20, 700, 1.25)}>
              {title}
            </div>
            <IconButton variant="ghost">
              <X size={20} />
            </IconButton>
          </div>
        )}
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-2">{children}</div>
        {footer && (
          <div className={cn("px-6 pb-2 pt-4", footerDivider && "border-t border-line")}>{footer}</div>
        )}
      </div>
    </div>
  );
}

export function Dialog({
  title,
  desc,
  tone = "primary",
  confirm = "Ya",
  cancel = "Batal",
  children,
}: {
  title: string;
  desc?: string;
  tone?: "primary" | "danger";
  confirm?: string;
  cancel?: string;
  children?: ReactNode;
}) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-espresso/55 p-6">
      <div className="sh-pop w-full rounded-[32px] bg-white p-6">
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-2xl",
            tone === "danger" ? "bg-danger-100 text-danger-500" : "bg-brand-100 text-brand-600",
          )}
        >
          {tone === "danger" ? <TriangleAlert size={24} /> : <Info size={24} />}
        </div>
        <div className="mt-4 whitespace-pre-line" style={d(22, 700, 1.25)}>
          {title}
        </div>
        {desc && (
          <div className="mt-2 whitespace-pre-line text-ink2" style={s(14, 400, 1.625)}>
            {desc}
          </div>
        )}
        {children}
        <div className="mt-6 flex gap-3">
          <Button variant="outline" full className="flex-1">
            {cancel}
          </Button>
          <Button variant={tone === "danger" ? "danger" : "primary"} full className="flex-1">
            {confirm}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Toast({
  msg,
  tone = "success",
  action,
  bottom = 140,
}: {
  msg: string;
  tone?: "success" | "neutral" | "error";
  action?: string;
  bottom?: number;
}) {
  const bg = { success: "bg-leaf-500", neutral: "bg-espresso", error: "bg-danger-500" }[tone];
  const Ic = { success: CircleCheck, neutral: Info, error: TriangleAlert }[tone];
  return (
    <div className="absolute inset-x-4 z-20" style={{ bottom }}>
      <div className={cn("sh-pop flex items-center gap-3 rounded-2xl px-4 py-3.5 text-white", bg)}>
        <Ic size={20} className="shrink-0" />
        <span className="flex-1" style={s(14, 600, 1.375)}>
          {msg}
        </span>
        {action && (
          <span className="rounded-full bg-white/20 px-3 py-1.5" style={s(12, 700, 1.2)}>
            {action}
          </span>
        )}
      </div>
    </div>
  );
}

export type MenuEntry = { label: string; icon: ReactNode; danger?: boolean };
export function PopMenuPanel({ entries }: { entries: MenuEntry[] }) {
  return (
    <div className="w-60 space-y-0.5 rounded-[22px] border border-ink/5 bg-white p-1.5 shadow-[0_0_0_1px_rgba(255,203,156,.25),0_3px_22px_8px_rgba(255,203,156,.35)]">
      {entries.map((e) => (
        <div key={e.label} className="flex items-center gap-3 rounded-2xl px-3.5 py-3">
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-xl bg-paper2",
              e.danger ? "text-danger-500" : "text-ink2",
            )}
          >
            {e.icon}
          </div>
          <span className={e.danger ? "text-danger-500" : "text-ink"} style={s(14, 600, 1.3)}>
            {e.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Tombol ⋮ + (opsional) menu terbuka di bawahnya */
export function PopMenu({ entries, open }: { entries: MenuEntry[]; open?: boolean }) {
  return (
    <div className="relative">
      <IconButton>
        <EllipsisVertical size={20} />
      </IconButton>
      {open && (
        <div className="absolute right-0 top-[44px] z-40">
          <PopMenuPanel entries={entries} />
        </div>
      )}
    </div>
  );
}

export function ActionRow({
  icon,
  label,
  sub,
  danger,
}: {
  icon: ReactNode;
  label: string;
  sub?: string;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl px-3 py-3">
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          danger ? "bg-danger-100 text-danger-500" : "bg-paper2 text-ink2",
        )}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className={danger ? "text-danger-500" : "text-ink"} style={s(15, 600, 1.3)}>
          {label}
        </div>
        {sub && (
          <div className="text-muted" style={s(12, 400, 1.4)}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

/** Opsi dalam sheet pilihan (SelectField) */
export function OptionRow({ label, sub, selected }: { label: string; sub?: string; selected?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl px-4 py-3.5",
        selected ? "bg-brand-100" : "border border-line bg-white",
      )}
    >
      <div className="min-w-0 flex-1">
        <div className={selected ? "text-brand-700" : "text-ink"} style={s(15, 600, 1.4)}>
          {label}
        </div>
        {sub && (
          <div className="text-muted" style={s(12, 400, 1.4)}>
            {sub}
          </div>
        )}
      </div>
      {selected && <Check size={20} className="text-brand-600" />}
    </div>
  );
}

/* ───────── Markdown sederhana (ui/Markdown.kt) ───────── */
function inline(text: string): ReactNode[] {
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={k++} className="font-bold text-ink">{t.slice(2, -2)}</strong>);
    else if (t.startsWith("*")) out.push(<em key={k++}>{t.slice(1, -1)}</em>);
    else if (t.startsWith("`"))
      out.push(
        <code key={k++} className="rounded bg-paper2 px-1 font-medium text-brand-700" style={{ fontFamily: "monospace", fontSize: 14 }}>
          {t.slice(1, -1)}
        </code>,
      );
    else
      out.push(
        <span key={k++} className="font-semibold text-brand-700 underline">
          {t.match(/\[([^\]]+)\]/)?.[1]}
        </span>,
      );
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
export const InlineMd = ({ text }: { text: string }) => <>{inline(text)}</>;

export function Markdown({ source }: { source: string }) {
  const lines = source.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let k = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (line.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      blocks.push(
        <pre key={k++} className="my-5 overflow-x-auto rounded-2xl bg-espresso p-4 text-brand-100" style={{ ...s(13, 400, 1.625), fontFamily: "monospace" }}>
          {code.join("\n")}
        </pre>,
      );
    } else if (line.startsWith("## ")) {
      blocks.push(<h2 key={k++} className="mb-3 mt-9" style={d(24, 700, 1.25, -0.02)}>{inline(line.slice(3))}</h2>);
      i++;
    } else if (line.startsWith("# ")) {
      blocks.push(<h1 key={k++} className="mb-3 mt-9" style={d(28, 800, 1.25, -0.02)}>{inline(line.slice(2))}</h1>);
      i++;
    } else if (line.startsWith("> ")) {
      const q: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) q.push(lines[i++].slice(2));
      blocks.push(
        <div key={k++} className="my-6 flex overflow-hidden rounded-r-3xl bg-brand-50">
          <div className="w-1 shrink-0 bg-brand-400" />
          <div className="px-5 py-4 text-brand-800" style={d(19, 600, 1.375)}>{inline(q.join(" "))}</div>
        </div>,
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) items.push(lines[i++].slice(2));
      blocks.push(
        <ul key={k++} className="my-4 space-y-2.5">
          {items.map((it, j) => (
            <li key={j} className="flex">
              <span className="mr-3 mt-[11px] size-1.5 shrink-0 rounded-full bg-brand-500" />
              <span className="text-ink2" style={s(16, 400, 1.7)}>{inline(it)}</span>
            </li>
          ))}
        </ul>,
      );
    } else {
      const p: string[] = [];
      while (i < lines.length && lines[i].trim() && !/^(#|>|- |```)/.test(lines[i])) p.push(lines[i++]);
      blocks.push(<p key={k++} className="my-4 text-ink2" style={s(16, 400, 1.8)}>{inline(p.join(" "))}</p>);
    }
  }
  return <div>{blocks}</div>;
}
