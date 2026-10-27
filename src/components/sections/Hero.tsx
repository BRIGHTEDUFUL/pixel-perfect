import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Download, Shield } from "lucide-react";
import neon from "@/assets/bright-mascot-neon.webp";
import aurora from "@/assets/bright-mascot-aurora.webp";
import sunset from "@/assets/bright-mascot-sunset.webp";
import { profile } from "@/data/portfolio";
import { venture } from "@/data/content";
import { useTheme } from "@/hooks/useTheme";
import { Magnetic, Scramble } from "@/components/fx/Effects";
import { Button } from "@/components/ui/button";

const mascots = { neon, aurora, sunset };
const ease = [0.22, 1, 0.36, 1] as const;

function MaskLine({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span className={`block ${className ?? ""}`} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay, ease }}>
        {children}
      </motion.span>
    </span>
  );
}

function RotatingBadge() {
  const text = "BRIGHT EDUFUL • CYBERSECURITY ANALYST • ";
  return (
    <div className="relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden>
        <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text className="fill-ink font-mono" fontSize="8.4" letterSpacing="1.4"><textPath href="#circ">{text}</textPath></text>
      </svg>
      <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-signal"><Shield size={18} /></span>
    </div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const { theme } = useTheme();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 100, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 100, damping: 20 });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), { stiffness: 80, damping: 20 });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    setFine(true);
    const onMove = (e: MouseEvent) => { mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  if (!ready) return <section id="home" className="min-h-svh" />;

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-10 pt-[calc(6rem+env(safe-area-inset-top))] sm:px-6 sm:pb-24 lg:pt-32">
      {/* vertical labels */}
      <div className="absolute left-3 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-8 font-mono text-[10px] tracking-[0.3em] text-muted-foreground 2xl:flex">
        <span className="vertical-label">S/N 48-150BF</span>
        <span className="vertical-label">EVT//PORTFOLIO 2026</span>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-6 sm:gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Copy */}
        <div className="relative z-20 order-1 min-w-0">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-signal align-middle" />
            <Scramble text="Hi, I'm Bright Eduful" />
          </motion.p>

          <h1 className="relative font-display text-headline font-bold uppercase">
            <MaskLine delay={0.3}>Cyber</MaskLine>
            <MaskLine delay={0.42} className="text-outline">Security</MaskLine>
            <motion.span
              initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -8, scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 120 }}
              className="pointer-events-none absolute -bottom-[0.35em] right-0 font-script text-[0.62em] font-bold normal-case tracking-normal text-theme-3 [text-shadow:0_2px_0_var(--deep)] sm:right-[8%]"
            >
              analyst
            </motion.span>
          </h1>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="mt-8 max-w-lg sm:mt-12">
            <p className="text-base leading-snug text-ink sm:text-xl">
              I hunt threats before they strike, <span className="font-script text-[1.35em] font-bold text-theme-2">close the gaps</span> attackers look for, and lead the response when every second counts.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Focus areas">
              {profile.tagline.map((t, i) => (
                <li key={t} className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink sm:text-[11px]">
                  <span className="text-muted-foreground">0{i + 1}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                  {t}
                </li>
              ))}
            </ul>
            <motion.a
              href={venture.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 bg-card px-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink/40 sm:text-[11px]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-theme-2" />
              {venture.role} of {venture.name}
              <ArrowUpRight size={14} />
            </motion.a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mobile-actions mt-5 grid gap-2 min-[360px]:grid-cols-2 sm:mt-8 sm:flex sm:gap-3">
            <Magnetic>
              <Button asChild className="group min-h-11 w-full rounded-full px-3 sm:min-h-12 sm:px-6">
              <Link to="/projects">
                View my work <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outline" className="min-h-11 w-full rounded-full border-ink/30 bg-transparent px-3 hover:bg-ink hover:text-paper sm:min-h-12 sm:px-6">
              <a href={profile.cv} download>
                <Download size={16} /> Download CV
              </a>
              </Button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Visual */}
        <div className="relative order-2 mx-auto aspect-[4/5] w-full max-w-[16rem] sm:max-w-[26rem] lg:max-w-[32rem]" style={{ perspective: 1000 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.1, ease, delay: 0.1 }}
            style={fine ? { x: tx } : {}}
            className="absolute inset-x-0 bottom-[6%] top-[4%]"
          >
            <div className="notched absolute inset-0 bg-theme-gradient" />
            <div className="absolute left-5 top-6 font-mono text-[10px] tracking-[0.3em] text-paper/80">001 // SEC-OPS</div>
            <div className="absolute bottom-6 left-5 font-display text-5xl font-bold text-paper/20 sm:text-7xl">2026</div>
            <div className="absolute bottom-6 right-5 font-mono text-[10px] tracking-widest text-paper/80">+ ACCRA, GH</div>
          </motion.div>

          <motion.div style={fine ? { rotateX: rx, rotateY: ry } : {}} className="absolute inset-0 z-10">
            <motion.div initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 70, damping: 12, delay: 0.5 }} className="h-full">
              <motion.div animate={{ y: fine ? [0, -14, 0] : 0 }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative h-full">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={theme}
                    src={mascots[theme]}
                    alt="Personalized 3D mascot of Bright Eduful tying his boots"
                    width={720}
                    height={894}
                    decoding="async"
                    fetchPriority="high"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 h-full w-full object-contain drop-shadow-2xl"
                  />
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div animate={{ scaleX: fine ? [1, 0.82, 1] : 1, opacity: fine ? [0.35, 0.2, 0.35] : 0.25 }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[3%] left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-[50%] bg-ink blur-xl" />

          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }} className="absolute -left-2 top-[8%] z-20 sm:-left-8">
            <RotatingBadge />
          </motion.div>
        </div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden h-14 w-14 -translate-x-1/2 place-items-center rounded-full border-2 border-ink/40 transition-colors hover:bg-ink hover:text-paper sm:grid"
      >
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}><ArrowDownRight size={20} /></motion.span>
      </motion.a>
    </section>
  );
}
