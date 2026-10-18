import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/sections/Hero";
import { About, Certifications, Contact, Experience, Projects, Skills } from "@/components/sections/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bright Eduful | Cybersecurity Analyst" },
      { name: "description", content: "Bright Eduful — Cybersecurity Analyst in Accra, Ghana. Threat analysis, vulnerability management and incident response." },
      { property: "og:title", content: "Bright Eduful | Cybersecurity Analyst" },
      { property: "og:description", content: "Threat analysis, vulnerability management and incident response from Accra, Ghana." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);
  return (
    <>
        <Preloader onDone={done} />
        <main>
          <Hero ready={ready} />
          <About />
          <Experience />
          <Certifications />
          <Projects />
          <Skills />
          <Contact />
        </main>
    </>
  );
}
