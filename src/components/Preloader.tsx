import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches || sessionStorage.getItem("be-intro-seen")) {
      onDone();
      return;
    }
    sessionStorage.setItem("be-intro-seen", "1");
    setShow(true);
    const start = performance.now();
    const dur = 450;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else { setShow(false); onDone(); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-deep p-6 text-paper sm:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between font-mono text-[10px] tracking-[0.3em] text-paper/60 sm:text-xs">
            <span>BE.//SYS</span>
            <span>EVT//PORTFOLIO 2026</span>
          </div>
          <div>
            <div className="font-display text-[clamp(5rem,22vw,16rem)] font-bold leading-none text-signal tabular-nums">
              {String(n).padStart(3, "0")}
            </div>
            <div className="mt-4 h-px w-full bg-paper/15">
              <div className="h-px bg-signal" style={{ width: `${n}%` }} />
            </div>
            <p className="mt-4 font-mono text-xs tracking-[0.25em] text-paper/70">
              INITIALIZING SECURE CONNECTION<span className="animate-pulse">…</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
