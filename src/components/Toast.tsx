import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";
import { CircleCheck, Info, TriangleAlert } from "lucide-react";
import { copyText, s } from "../lib/util";

type Tone = "success" | "neutral" | "error";
type Ctx = { show: (msg: string, tone?: Tone) => void; copy: (text: string, label?: string) => void };
const ToastCtx = createContext<Ctx>({ show: () => {}, copy: () => {} });
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [t, setT] = useState<{ id: number; msg: string; tone: Tone } | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const show = useCallback((msg: string, tone: Tone = "success") => {
    window.clearTimeout(timer.current);
    setT({ id: Date.now(), msg, tone });
    timer.current = window.setTimeout(() => setT(null), 2200);
  }, []);

  const copy = useCallback(
    async (text: string, label = "Tersalin") => {
      const ok = await copyText(text);
      show(ok ? `${label} ke papan klip` : "Gagal menyalin", ok ? "success" : "error");
    },
    [show],
  );

  return (
    <ToastCtx.Provider value={{ show, copy }}>
      {children}
      {t && (
        <div
          key={t.id}
          className="toast-in sh-pop fixed bottom-6 left-1/2 z-[300] flex max-w-[calc(100vw-32px)] items-center gap-2.5 rounded-full bg-espresso py-3 pl-4 pr-5 text-white"
          style={s(13.5, 600, 1.3)}
          role="status"
        >
          {t.tone === "success" && <CircleCheck size={18} className="shrink-0 text-brand-300" />}
          {t.tone === "neutral" && <Info size={18} className="shrink-0 text-white/70" />}
          {t.tone === "error" && <TriangleAlert size={18} className="shrink-0 text-danger-100" />}
          <span className="truncate">{t.msg}</span>
        </div>
      )}
    </ToastCtx.Provider>
  );
}
