import { motion } from "framer-motion";
import { themes } from "@/data/portfolio";
import { useTheme } from "@/hooks/useTheme";

export function SwatchPills({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Color theme">
      {themes.map((t) => {
        const active = t.id === theme;
        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={active}
            aria-label={`${t.label} theme`}
            onClick={() => setTheme(t.id)}
            className="group flex min-h-11 flex-col items-start justify-center gap-1"
          >
            <span className={`relative flex h-4 overflow-hidden rounded-full ring-2 transition-all ${active ? "ring-ink" : "ring-transparent"} ${compact ? "w-12" : "w-20"}`}>
              {t.swatches.map((c) => (
                <span key={c} className="h-full flex-1" style={{ backgroundColor: c }} />
              ))}
            </span>
            {!compact && (
              <span className={`font-mono text-[10px] tracking-wider ${active ? "text-foreground" : "text-muted-foreground"}`}>
                {t.swatches[2]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function FloatingThemeSwitcher() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.6, type: "spring" }}
      className="glass fixed bottom-4 right-4 z-[70] rounded-2xl border px-3 sm:bottom-6 sm:right-6 sm:px-4"
    >
      <div className="sm:hidden"><SwatchPills compact /></div>
      <div className="hidden sm:block"><SwatchPills /></div>
    </motion.div>
  );
}
