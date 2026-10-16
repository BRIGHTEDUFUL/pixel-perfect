import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void; scrollTo: (t: Element, o?: object) => void } | null = null;
    let onClick: ((e: MouseEvent) => void) | null = null;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.1 }) as never;
      const loop = (t: number) => { lenis?.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
      onClick = (e) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]');
        if (!a) return;
        const el = document.querySelector(a.getAttribute("href")!);
        if (el) { e.preventDefault(); lenis?.scrollTo(el, { offset: -80 }); }
      };
      document.addEventListener("click", onClick);
    });
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); if (onClick) document.removeEventListener("click", onClick); };
  }, []);
  return null;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[90] h-1 origin-left bg-bar-gradient" />;
}

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 250, damping: 25 });
  const ry = useSpring(y, { stiffness: 250, damping: 25 });
  const [mode, setMode] = useState<"" | "hover" | "view">("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target as HTMLElement;
      setMode(t.closest("[data-cursor='view']") ? "view" : t.closest("a,button") ? "hover" : "");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;
  const size = mode === "view" ? 84 : mode === "hover" ? 56 : 36;
  return (
    <div className="cursor-ui pointer-events-none fixed inset-0 z-[95]">
      <motion.div style={{ x, y }} className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-ink" />
      <motion.div
        style={{ x: rx, y: ry, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
        className="absolute grid place-items-center rounded-full border border-ink/60 font-mono text-[10px] tracking-widest text-paper transition-[width,height,margin,background-color] duration-300 data-[v=true]:bg-ink"
        data-v={mode === "view"}
      >
        {mode === "view" && "VIEW"}
      </motion.div>
    </div>
  );
}

export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&/<>";
export function Scramble({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let iv: ReturnType<typeof setInterval>;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      setTimeout(() => {
        let i = 0;
        iv = setInterval(() => {
          setOut(text.split("").map((c, k) => (k < i || c === " " ? c : CHARS[Math.floor(Math.random() * CHARS.length)])).join(""));
          i += 0.5;
          if (i > text.length) { clearInterval(iv); setOut(text); }
        }, 30);
      }, delay);
    });
    io.observe(el);
    return () => { io.disconnect(); clearInterval(iv); };
  }, [text, delay]);
  return <span ref={ref} className={className}>{out}</span>;
}
