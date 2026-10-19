import { motion } from "framer-motion";
import { themes } from "@/data/portfolio";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

export function SwatchPills({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Color theme">
      {themes.map((t) => {
        const active = t.id === theme;
        return (
          <Button variant="ghost"
            key={t.id}
            role="radio"
            aria-checked={active}
            aria-label={`${t.label} theme`}
            onClick={() => setTheme(t.id)}
            className="group flex min-h-11 flex-col items-start justify-center gap-1 px-0 hover:bg-transparent"
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
          </Button>
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
      transition={{ duration: 0.3 }}
      className="glass fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-[70] rounded-2xl border px-3 sm:bottom-6 sm:right-6 sm:px-4"
    >
      <div className="sm:hidden"><SwatchPills compact /></div>
      <div className="hidden sm:block"><SwatchPills /></div>
    </motion.div>
  );
}
