import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/hooks/useTheme";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FloatingThemeSwitcher } from "@/components/ThemeSwitcher";
import { Cursor, ScrollProgress, SmoothScroll } from "@/components/fx/Effects";

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
    <ThemeProvider>
      <div className="grain">
        <Preloader onDone={done} />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <Navbar />
        <main>
          <Hero ready={ready} />
        </main>
        <FloatingThemeSwitcher />
      </div>
    </ThemeProvider>
  );
}
