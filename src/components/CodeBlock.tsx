import { Copy, Download } from "lucide-react";
import { cn, downloadBlob, s } from "../lib/util";
import { useToast } from "./Toast";

export function CodeBlock({
  code,
  file,
  mime = "text/plain",
  label,
  maxHeight = 360,
  className = "",
}: {
  code: string;
  file?: string;
  mime?: string;
  label?: string;
  maxHeight?: number;
  className?: string;
}) {
  const { copy, show } = useToast();
  return (
    <div className={cn("overflow-hidden rounded-3xl bg-espresso text-white", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="truncate text-brand-300" style={{ fontFamily: "ui-monospace, monospace", fontSize: 12 }}>
          {file ?? label ?? "kode"}
        </span>
        <div className="flex shrink-0 gap-1.5">
          <button
            onClick={() => copy(code, label ? `${label} tersalin` : "Kode tersalin")}
            className="flex h-8 items-center gap-1.5 rounded-full bg-white/10 px-3 text-white/90 transition hover:bg-white/20 active:scale-95"
            style={s(12, 600, 1.2)}
          >
            <Copy size={14} /> Salin
          </button>
          {file && (
            <button
              onClick={() => {
                downloadBlob(file, code, mime);
                show(`${file} diunduh`);
              }}
              className="flex h-8 items-center gap-1.5 rounded-full bg-brand-500 px-3 text-white transition hover:bg-brand-600 active:scale-95"
              style={s(12, 600, 1.2)}
            >
              <Download size={14} /> Unduh
            </button>
          )}
        </div>
      </div>
      <pre className="overflow-auto p-4 text-white/85" style={{ maxHeight, fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: 12.5, lineHeight: 1.7 }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
