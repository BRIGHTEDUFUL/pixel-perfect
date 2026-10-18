import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { Magnetic } from "@/components/fx/Effects";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed inset-x-0 top-3 z-[80] px-3 sm:top-4 sm:px-6">
        <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2 sm:px-6">
          <Link to="/" aria-label="Bright Eduful home" className="font-display text-xl font-bold tracking-tight">
            BE<span className="text-theme-2">.</span>
          </Link>
          <ul className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link to={l.href} activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }} className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Magnetic>
              <a href={`mailto:${profile.email}`} className="hidden min-h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper sm:inline-flex">
                Hire me
              </a>
            </Magnetic>
            <Button size="icon" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} className="h-11 w-11 rounded-full lg:hidden">
              <Menu size={18} />
            </Button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] flex flex-col bg-deep p-6 text-paper"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-bold">BE<span className="text-signal">.</span></span>
              <Button size="icon" variant="secondary" aria-label="Close menu" onClick={() => setOpen(false)} className="h-11 w-11 rounded-full">
                <X size={18} />
              </Button>
            </div>
            <ul className="mt-12 flex flex-1 flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.li key={l.href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.06 }}>
                  <Link to={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 font-display text-2xl font-bold uppercase leading-tight sm:text-4xl">
                    <span className="font-mono text-xs text-signal">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="font-mono text-xs tracking-widest text-paper/60">{profile.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
