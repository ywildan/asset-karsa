import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Check, ChevronDown, LoaderCircle, Search } from "lucide-react";
import { cn, d, s } from "../lib/util";

/* ───────── Pembungkus section ───────── */
export function Section({
  id,
  no,
  title,
  desc,
  icon,
  children,
  dark,
}: {
  id: string;
  no: string;
  title: string;
  desc: string;
  icon?: ReactNode;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-14 md:py-20">
      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div className="flex items-start gap-4">
          <span className={dark ? "text-brand-400" : "text-brand-500"} style={d(48, 800, 0.95, -0.03)}>
            {no}
          </span>
          <div>
            <div className={cn("mb-1 flex items-center gap-2", dark ? "text-brand-300" : "text-brand-700")} style={s(11, 700, 1.4, 0.16)}>
              {icon}
              ASET KARSA
            </div>
            <h2 className={dark ? "text-white" : "text-ink"} style={d(34, 800, 1.05, -0.02)}>
              {title}
            </h2>
            <p className={cn("mt-2 max-w-2xl", dark ? "text-white/60" : "text-ink2")} style={s(14.5, 400, 1.65)}>
              {desc}
            </p>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}

/* ───────── Kartu ───────── */
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("sh-card rounded-[28px] border border-ink/5 bg-white", className)}>{children}</div>;
}

/* ───────── Tombol (KarsaButton) ───────── */
export type BtnVariant = "primary" | "dark" | "soft" | "outline" | "ghost" | "danger" | "dangerSoft";
export type BtnSize = "sm" | "md" | "lg";

export function Button({
  children,
  variant = "primary",
  size = "md",
  full,
  loading,
  leading,
  trailing,
  className = "",
  disabled,
  ...rest
}: {
  children: ReactNode;
  variant?: BtnVariant;
  size?: BtnSize;
  full?: boolean;
  loading?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const active = !disabled && !loading;
  const dims = { sm: "h-9 rounded-full px-3.5 gap-1.5", md: "h-12 rounded-2xl px-5 gap-2", lg: "h-14 rounded-[20px] px-6 gap-2.5" }[size];
  const fs = { sm: 13, md: 15, lg: 16 }[size];
  const palette: Record<BtnVariant, string> = {
    primary: "bg-brand-500 text-white sh-brand hover:bg-brand-600",
    dark: "bg-espresso text-white hover:bg-espresso2",
    soft: "bg-brand-100 text-brand-700 hover:bg-brand-200",
    outline: "bg-white text-ink border border-line hover:bg-paper2",
    ghost: "bg-transparent text-ink2 hover:bg-paper2",
    danger: "bg-danger-500 text-white hover:opacity-90",
    dangerSoft: "bg-danger-100 text-danger-500 hover:opacity-80",
  };
  const off = variant === "ghost" || variant === "outline" ? "bg-transparent text-muted border border-line" : "bg-paper3 text-muted";
  return (
    <button
      disabled={!active}
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap transition active:scale-[0.98]",
        dims,
        active ? palette[variant] : cn(off, "cursor-not-allowed"),
        full && "flex w-full",
        className,
      )}
      style={s(fs, 600, 1.2)}
      {...rest}
    >
      {loading ? <LoaderCircle size={20} className="spin" /> : leading}
      {children}
      {trailing}
    </button>
  );
}

export function IconButton({
  children,
  variant = "plain",
  label,
  className = "",
  ...rest
}: { children: ReactNode; variant?: "plain" | "ghost" | "dark"; label: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full transition active:scale-95",
        variant === "plain" && "border border-line bg-white text-ink hover:bg-paper2",
        variant === "ghost" && "bg-transparent text-ink hover:bg-paper2",
        variant === "dark" && "bg-espresso text-white hover:bg-espresso2",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ───────── Badge / Chip / Segmented ───────── */
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
export function Badge({ children, tone = "brand", icon, className = "" }: { children: ReactNode; tone?: BadgeTone; icon?: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1", badgeCls[tone], className)} style={s(11, 700, 1.2, 0.025)}>
      {icon}
      {children}
    </span>
  );
}

export function PointBadge({ points, large }: { points: number; large?: boolean }) {
  const cls =
    points >= 4 ? "bg-brand-500 text-white" : points === 3 ? "bg-brand-100 text-brand-700" : points === 2 ? "bg-butter-100 text-butter-700" : "bg-paper2 text-ink2";
  return (
    <div
      className={cn("flex shrink-0 items-center justify-center", cls)}
      style={{ width: large ? 56 : 44, height: large ? 56 : 44, borderRadius: large ? 18 : 14, ...d(large ? 24 : 18, 800, 1) }}
    >
      +{points}
    </div>
  );
}

export function Chip({ children, selected, icon, onClick }: { children: ReactNode; selected?: boolean; icon?: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 transition active:scale-95",
        selected ? "bg-espresso text-white" : "border border-line bg-white text-ink2 hover:bg-paper2",
      )}
      style={s(13, 600, 1.2)}
    >
      {icon}
      {children}
    </button>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: {
  options: { value: T; label: string; icon?: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex rounded-full bg-paper3/70 p-1", className)}>
      {options.map((o) => {
        const sel = o.value === value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              "flex h-9 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 transition",
              sel ? "bg-white text-ink shadow-sm" : "text-ink2 hover:text-ink",
            )}
            style={s(13, 600, 1.2)}
          >
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ───────── Input ───────── */
export function Field({ label, hint, children }: { label?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      {label && (
        <div className="mb-2 text-ink2" style={s(13, 600, 1.2)}>
          {label}
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

const inputCls = "w-full rounded-2xl border-2 border-transparent bg-paper2 text-ink outline-none placeholder:text-muted/80 focus:border-brand-400 focus:bg-white";
export function TextField({ value, placeholder, multiline, onChange }: { value?: string; placeholder?: string; multiline?: boolean; onChange?: (v: string) => void }) {
  return multiline ? (
    <textarea
      defaultValue={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(inputCls, "min-h-[84px] resize-none px-4 py-3.5")}
      style={s(15, 400, 1.5)}
    />
  ) : (
    <input defaultValue={value} placeholder={placeholder} onChange={(e) => onChange?.(e.target.value)} className={cn(inputCls, "h-[52px] px-4")} style={s(15, 400, 1.5)} />
  );
}

export function SearchField({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative">
      <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[52px] w-full rounded-full border-2 border-transparent bg-paper2 pl-12 pr-4 text-ink outline-none placeholder:text-muted/80 focus:border-brand-400 focus:bg-white"
        style={s(15, 400, 1.5)}
      />
    </div>
  );
}

export function SelectTrigger({ label, value, placeholder }: { label: string; value?: string; placeholder: string }) {
  return (
    <Field label={label}>
      <div className="flex h-[52px] items-center justify-between rounded-2xl bg-paper2 px-4" style={s(15, 400, 1.5)}>
        <span className={value ? "text-ink" : "text-muted/80"}>{value || placeholder}</span>
        <ChevronDown size={20} className="text-muted" />
      </div>
    </Field>
  );
}

/* ───────── Toast statis (spesimen) ───────── */
export function ToastSpecimen({ tone, msg, action }: { tone: "success" | "neutral" | "error"; msg: string; action?: string }) {
  const bg = tone === "error" ? "bg-danger-500" : "bg-espresso";
  return (
    <div className={cn("sh-pop flex items-center gap-3 rounded-full py-3 pl-4 pr-3 text-white", bg)} style={s(13.5, 600, 1.3)}>
      {tone === "success" ? <Check size={18} className="text-brand-300" /> : <span className="size-2 rounded-full bg-white/60" />}
      <span className="flex-1">{msg}</span>
      {action && (
        <span className="rounded-full bg-white/15 px-3 py-1" style={s(12, 700, 1.2)}>
          {action}
        </span>
      )}
    </div>
  );
}

/* ───────── Avatar ───────── */
export type Tone = "brand" | "butter" | "leaf" | "tide" | "plum" | "clay";
const toneBg: Record<Tone, string> = { brand: "bg-brand-100 text-brand-700", butter: "bg-butter-100 text-butter-700", leaf: "bg-leaf-100 text-leaf-600", tide: "bg-tide-100 text-tide-600", plum: "bg-plum-100 text-plum-600", clay: "bg-paper3 text-ink2" };
export function Avatar({ name, size = 44, tone = "brand", square }: { name: string; size?: number; tone?: Tone; square?: boolean }) {
  const ini = name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
  return (
    <div
      className={cn("flex shrink-0 items-center justify-center", toneBg[tone])}
      style={{ width: size, height: size, borderRadius: square ? 14 : 9999, ...d(Math.max(11, Math.floor(size * 0.36)), 700, 1.2) }}
    >
      {ini}
    </div>
  );
}

export function Skeleton({ className = "", round }: { className?: string; round?: boolean }) {
  return <div className={cn("skel bg-paper3", round ? "rounded-full" : "rounded-lg", className)} />;
}

/* ───────── Toggle sederhana ───────── */
export function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button onClick={() => onChange(!on)} className="flex items-center gap-2.5" role="switch" aria-checked={on}>
      <span className={cn("relative h-7 w-12 rounded-full transition-colors", on ? "bg-brand-500" : "bg-paper3")}>
        <span className={cn("absolute top-1 size-5 rounded-full bg-white shadow transition-all", on ? "left-6" : "left-1")} />
      </span>
      <span className="text-ink2" style={s(13, 600, 1.2)}>
        {label}
      </span>
    </button>
  );
}


