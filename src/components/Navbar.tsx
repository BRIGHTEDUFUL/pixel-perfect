import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { Magnetic } from "@/components/fx/Effects";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <header className="fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-[80] px-3 sm:top-4 sm:px-6">
        <nav className="glass mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full border px-4 py-2 sm:px-6 lg:flex lg:justify-between">
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
            <Dialog.Trigger asChild>
              <Button size="icon" aria-label="Open menu" className="h-11 w-11 shrink-0 rounded-full lg:hidden">
                <Menu size={18} />
              </Button>
            </Dialog.Trigger>
          </div>
        </nav>
      </header>

      <Dialog.Portal>
        <Dialog.Content asChild aria-describedby={undefined}>
          <motion.div
            className="fixed inset-0 z-[150] flex flex-col overflow-y-auto overscroll-contain bg-deep px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] text-paper sm:px-6"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
            <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <span className="font-display text-xl font-bold">BE<span className="text-signal">.</span></span>
              <Dialog.Close asChild>
                <Button size="icon" variant="secondary" aria-label="Close menu" className="h-11 w-11 rounded-full">
                  <X size={18} />
                </Button>
              </Dialog.Close>
            </div>
            <ul className="my-6 flex flex-1 flex-col gap-2 sm:my-12">
              {navLinks.map((l, i) => (
                <motion.li key={l.href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.06 }}>
                  <Link to={l.href} onClick={() => setOpen(false)} className="grid min-h-12 grid-cols-[auto_minmax(0,1fr)] items-center gap-3 font-display text-lg font-bold uppercase leading-tight sm:gap-4 sm:text-3xl">
                    <span className="shrink-0 font-mono text-xs text-signal">0{i + 1}</span>
                    <span className="min-w-0 break-words">{l.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="shrink-0 break-all font-mono text-xs tracking-widest text-paper/60">{profile.email}</p>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
