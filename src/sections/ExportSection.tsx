import { useMemo, useState } from "react";
import { Braces, FileCode2, Paintbrush, Smartphone } from "lucide-react";
import { Section } from "../components/ui";
import { CodeBlock } from "../components/CodeBlock";
import { buildExport } from "../lib/tokens";
import type { ExportKind } from "../lib/tokens";
import { cn, d, s } from "../lib/util";

const KINDS: { id: ExportKind; label: string; sub: string; Icon: typeof Braces }[] = [
  { id: "css", label: "CSS", sub: "Custom properties", Icon: FileCode2 },
  { id: "tailwind", label: "Tailwind v4", sub: "@theme", Icon: Paintbrush },
  { id: "kotlin", label: "Compose", sub: "KarsaColors.kt", Icon: Smartphone },
  { id: "json", label: "JSON", sub: "Design tokens", Icon: Braces },
];

export function ExportSection() {
  const [kind, setKind] = useState<ExportKind>("css");
  const out = useMemo(() => buildExport(kind), [kind]);
  return (
    <Section id="ekspor" no="08" title="Ekspor token" desc="Bawa seluruh token Karsa ke proyek lain. Pilih format, salin, atau unduh berkasnya.">
      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {KINDS.map((k) => {
            const on = kind === k.id;
            return (
              <button
                key={k.id}
                onClick={() => setKind(k.id)}
                className={cn(
                  "flex items-center gap-3 rounded-3xl border-2 p-4 text-left transition active:scale-[0.98]",
                  on ? "border-espresso bg-espresso text-white" : "border-line bg-white text-ink hover:border-brand-200",
                )}
              >
                <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-2xl", on ? "bg-brand-500 text-white" : "bg-brand-100 text-brand-700")}>
                  <k.Icon size={22} />
                </span>
                <span className="min-w-0">
                  <span className="block" style={d(17, 700, 1.2)}>
                    {k.label}
                  </span>
                  <span className={cn("block truncate", on ? "text-white/60" : "text-muted")} style={s(12, 400, 1.3)}>
                    {k.sub}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <CodeBlock key={kind} code={out.code} file={out.file} mime={out.mime} maxHeight={460} />
      </div>
    </Section>
  );
}
