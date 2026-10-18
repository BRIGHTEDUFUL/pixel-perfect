import { motion } from "framer-motion";
import { useContext } from "react";
import { StandalonePage } from "@/components/PortfolioPage";
import { ArrowUpRight, Award, Download, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/portfolio";
import { about, certifications, education, experience, organizations, projects, skillRows } from "@/data/content";
import { Magnetic, Scramble } from "@/components/fx/Effects";

const ease = [0.22, 1, 0.36, 1] as const;
const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease },
};

function Heading({ index, title }: { index: string; title: string }) {
  const standalone = useContext(StandalonePage);
  const Tag = standalone ? "h1" : "h2";
  return (
    <div className="mb-12 flex items-end justify-between gap-6 border-b pb-6">
      <Tag className={`min-w-0 font-display font-bold uppercase leading-tight sm:text-5xl lg:text-6xl ${title === "Certifications" ? "text-xl" : "text-3xl"}`}>
        <Scramble text={title} />
      </Tag>
      <span className="font-mono text-xs tracking-widest text-muted-foreground">/{index}</span>
    </div>
  );
}

const wrap = "[content-visibility:auto] [contain-intrinsic-size:auto_800px] mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32";

export function About() {
  return (
    <section id="about" className={wrap}>
      <Heading index="01" title="About" />
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <motion.p {...reveal} className="text-[clamp(1.25rem,2.6vw,1.9rem)] font-medium leading-snug">
          {about}
        </motion.p>
        <motion.div {...reveal} className="overflow-hidden rounded-3xl bg-deep font-mono text-sm text-paper shadow-float">
          <div className="flex gap-1.5 border-b border-paper/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-paper/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-paper/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal" />
          </div>
          <div className="space-y-2 p-5 leading-relaxed">
            <p><span className="text-signal">$</span> whoami</p>
            <p className="text-paper/70">{profile.name.toLowerCase()} — {profile.role.toLowerCase()}</p>
            <p><span className="text-signal">$</span> cat education.txt</p>
            <p className="text-paper/70">{education.degree}<br />{education.school}<br />{education.period}</p>
            <p><span className="text-signal">$</span> ls courses/</p>
            <p className="text-paper/70">{education.courses.join("  ·  ")}</p>
            <p><span className="text-signal">$</span> <span className="animate-pulse">▌</span></p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Skills() {
  const standalone = useContext(StandalonePage);
  if (standalone) return (
    <section id="skills" className={wrap}>
      <Heading index="05" title="Skills" />
      <div className="divide-y border-y">
        {skillRows.map((row, i) => <div key={i} className="grid gap-6 py-8 md:grid-cols-[220px_1fr]">
          <h2 className="font-mono text-sm text-muted-foreground">{["Security operations", "Tools & programming", "Frameworks & cloud"][i]}</h2>
          <ul className="flex flex-wrap gap-3">{row.map(skill => <li key={skill} className="rounded-lg border bg-card px-4 py-3 font-medium">{skill}</li>)}</ul>
        </div>)}
      </div>
    </section>
  );
  return (
    <section id="skills" className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6"><Heading index="05" title="Skills" /></div>
      <div className="space-y-4">
        {skillRows.map((row, i) => (
          <div key={i} className="flex overflow-hidden">
            <motion.div
              className="flex shrink-0 gap-4 pr-4"
              animate={{ x: i % 2 ? ["-50%", "0%"] : ["0%", "-50%"] }}
              transition={{ duration: 30 + i * 6, repeat: Infinity, ease: "linear" }}
            >
              {[...row, ...row, ...row, ...row].map((s, k) => (
                <span key={k} className={`whitespace-nowrap rounded-full border px-6 py-3 font-display text-lg font-bold uppercase sm:text-2xl ${k % 3 === 1 ? "bg-ink text-paper" : k % 3 === 2 ? "bg-signal text-ink border-transparent" : ""}`}>
                  {s}
                </span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className={wrap}>
      <Heading index="02" title="Experience" />
      <div className="divide-y border-y">
        {experience.map((e) => (
          <motion.article {...reveal} key={e.org} className="grid gap-4 py-8 md:grid-cols-[200px_1fr_1fr]">
            <span className="font-mono text-xs tracking-widest text-muted-foreground">{e.period}</span>
            <div>
              <h3 className="font-display text-2xl font-bold">{e.org}</h3>
              <p className="mt-1 text-muted-foreground">{e.role}</p>
            </div>
            <ul className="space-y-2">
              {e.points.map((p) => (
                <li key={p} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-theme-2" />{p}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className={wrap}>
      <Heading index="04" title="Projects" />
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <motion.article
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.1 }}
            key={p.title}
            data-cursor="view"
            className="group flex min-h-80 flex-col justify-between rounded-3xl bg-theme-gradient p-6 text-paper shadow-float transition-transform duration-500 hover:-translate-y-2"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs tracking-widest">0{i + 1}</span>
              <ArrowUpRight className="transition-transform group-hover:rotate-45" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold uppercase leading-tight">{p.title}</h3>
              <p className="mt-3 text-sm text-paper/80">{p.text}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => <span key={t} className="rounded-full bg-paper/15 px-3 py-1 font-mono text-[11px]">{t}</span>)}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className={wrap}>
      <Heading index="03" title="Certifications" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <motion.div {...reveal} transition={{ ...reveal.transition, delay: i * 0.05 }} key={c.name}
            className={`flex items-start gap-4 rounded-3xl border p-6 ${i === 0 ? "bg-ink text-paper" : "bg-card"}`}>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-signal text-ink"><Award size={18} /></span>
            <div>
              <h3 className="font-semibold leading-snug">{c.name}</h3>
              <p className={`mt-1 font-mono text-xs tracking-widest ${i === 0 ? "text-paper/60" : "text-muted-foreground"}`}>{c.issuer.toUpperCase()}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-10 font-mono text-xs tracking-widest text-muted-foreground">
        MEMBER OF — {organizations.join(" · ").toUpperCase()}
      </p>
    </section>
  );
}

export function Contact() {
  const standalone = useContext(StandalonePage);
  const Tag = standalone ? "h1" : "h2";
  const items = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone}` },
    { icon: Linkedin, label: "linkedin.com/in/brighteduful", href: profile.linkedin },
    { icon: MapPin, label: profile.location },
  ];
  return (
    <section id="contact" className="px-3 pb-6 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-deep px-6 py-20 text-paper sm:px-12">
        <p className="font-mono text-xs tracking-widest text-signal">/06 — CONTACT</p>
        <Tag className="mt-6 font-display text-3xl font-bold uppercase leading-tight sm:text-5xl lg:text-7xl">
          Let's secure<br /><span className="text-signal">something.</span>
        </Tag>
        <div className="mt-10 flex flex-wrap gap-3">
          <Magnetic>
            <a href={`mailto:${profile.email}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-signal px-6 font-medium text-ink">
              Get in touch <ArrowUpRight size={18} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.cv} download className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/30 px-6 font-medium">
              Download CV <Download size={18} />
            </a>
          </Magnetic>
        </div>
        <ul className="mt-14 grid gap-4 border-t border-paper/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, label, href }) => (
            <li key={label} className="flex items-center gap-3 text-sm text-paper/80">
              <Icon size={16} className="shrink-0 text-signal" />
              {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="break-all hover:text-paper">{label}</a> : label}
            </li>
          ))}
        </ul>
        <p className="mt-12 font-mono text-[11px] tracking-widest text-paper/40">© {new Date().getFullYear()} {profile.name.toUpperCase()}</p>
      </div>
    </section>
  );
}
