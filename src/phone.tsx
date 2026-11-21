import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  BatteryFull,
  BookOpen,
  MessagesSquare,
  PenLine,
  Signal,
  Trophy,
  UserRound,
  Wifi,
} from "lucide-react";
import { cn, s } from "./ui";

/** true = frame ponsel dibuat setinggi isi layar (tanpa scroll internal) */
export const TallCtx = createContext(false);

export type TabKey = "lib" | "grup" | "input" | "aktivitas" | "poinku" | "akun";
const TAB_META: Record<TabKey, { label: string; Icon: typeof BookOpen }> = {
  lib: { label: "Karsa Lib", Icon: BookOpen },
  grup: { label: "Grup", Icon: MessagesSquare },
  input: { label: "Input poin", Icon: PenLine },
  aktivitas: { label: "Aktivitas", Icon: Activity },
  poinku: { label: "Poinku", Icon: Trophy },
  akun: { label: "Akun", Icon: UserRound },
};
export const PJ_TABS: TabKey[] = ["lib", "grup", "input", "aktivitas", "akun"];
export const MHS_TABS: TabKey[] = ["lib", "grup", "poinku", "akun"];

export function Dock({ tabs, active }: { tabs: TabKey[]; active?: TabKey }) {
  const hasInput = tabs.includes("input");
  const side = tabs.filter((t) => t !== "input");
  const spacerAfter = !hasInput ? -1 : side.length >= 4 ? 1 : 0;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, rgba(251,245,236,0) 0%, rgba(251,245,236,.7) 35%, #FBF5EC 100%)" }}
      />
      <div className="relative px-3 pb-6 pt-3" style={{ height: 106 + 12 }}>
        <div className="sh-pop absolute inset-x-3 bottom-6 flex h-[82px] items-end rounded-full bg-espresso px-[18px] pb-3">
          {side.map((t, i) => {
            const { label, Icon } = TAB_META[t];
            const on = active === t;
            return (
              <div key={t} className="contents">
                <div className="flex flex-1 flex-col items-center justify-end">
                  <div
                    className={cn(
                      "flex h-9 w-16 items-center justify-center rounded-[18px] transition-colors",
                      on ? "bg-brand-500 text-white" : "text-white/55",
                    )}
                  >
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <span
                    className={cn("mt-[5px] whitespace-nowrap", on ? "text-white" : "text-white/55")}
                    style={s(11.5, 500, 1.2)}
                  >
                    {label}
                  </span>
                </div>
                {i === spacerAfter && <div className="w-[76px] shrink-0" />}
              </div>
            );
          })}
        </div>
        {hasInput && (
          <div className="absolute inset-x-0 bottom-[36px] flex flex-col items-center">
            <div
              className="flex size-[68px] items-center justify-center rounded-full bg-brand-500 text-white"
              style={{ boxShadow: "0 0 26px 8px rgba(227,107,15,.5)" }}
            >
              <PenLine size={28} strokeWidth={2.2} />
            </div>
            <span className="mt-3 text-white" style={s(11.5, 500, 1.2)}>
              Input poin
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBar({ light }: { light?: boolean }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-50 flex h-7 items-center justify-between px-6",
        light ? "text-white" : "text-ink",
      )}
      style={s(12, 600, 1)}
    >
      <span>09.41</span>
      <span className="flex items-center gap-1.5">
        <Signal size={13} />
        <Wifi size={13} />
        <BatteryFull size={15} />
      </span>
    </div>
  );
}

export function Phone({
  children,
  tabs,
  active,
  overlay,
  toast,
  bg = "bg-paper",
  light,
  top = 38,
  fixed,
}: {
  children: ReactNode;
  tabs?: TabKey[];
  active?: TabKey;
  overlay?: ReactNode;
  toast?: ReactNode;
  bg?: string;
  light?: boolean;
  /** padding atas (status bar + 10dp) — 0 untuk layar penuh seperti Splash/Login */
  top?: number;
  fixed?: boolean;
}) {
  const tall = useContext(TallCtx);
  const autoHeight = tall && !overlay && !fixed;
  return (
    <div className="rounded-[46px] bg-[#0d0805] p-[9px] shadow-[0_30px_60px_-20px_rgba(0,0,0,.7)] ring-1 ring-white/10">
      <div
        className={cn("relative flex w-[390px] flex-col overflow-hidden rounded-[38px] text-ink", bg)}
        style={{ height: autoHeight ? undefined : 844, minHeight: 844, paddingTop: top }}
      >
        <StatusBar light={light} />
        {children}
        {tabs && <Dock tabs={tabs} active={active} />}
        {toast}
        {overlay}
        <div className="pointer-events-none absolute bottom-2 left-1/2 z-50 h-1 w-28 -translate-x-1/2 rounded-full bg-ink/25" />
      </div>
    </div>
  );
}

/** Area isi yang bisa di-scroll (Column + verticalScroll di Compose) */
export function Body({
  children,
  className = "",
  dock,
  gap,
}: {
  children: ReactNode;
  className?: string;
  /** beri ruang untuk Dock: padding bottom 140dp */
  dock?: boolean;
  gap?: number;
}) {
  return (
    <div
      className={cn("no-scrollbar min-h-0 flex-1 overflow-y-auto px-5", className)}
      style={{ paddingBottom: dock ? 140 : 24, display: gap ? "flex" : undefined, flexDirection: "column", rowGap: gap }}
    >
      {children}
    </div>
  );
}
