import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/sections/Sections";
import { PortfolioPage } from "@/components/PortfolioPage";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [
    { title: "Projects | Bright Eduful" },
    { name: "description", content: "Bright Eduful’s network vulnerability scanning, SIEM threat hunting and security awareness projects." },
    { property: "og:title", content: "Projects | Bright Eduful" },
    { property: "og:description", content: "Bright Eduful’s network vulnerability scanning, SIEM threat hunting and security awareness projects." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Page,
});

function Page() {
  return <PortfolioPage next={{ href: "/skills", label: "Skills" }}><Projects /></PortfolioPage>;
}
