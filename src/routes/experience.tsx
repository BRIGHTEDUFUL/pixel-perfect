import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/sections/Sections";
import { PortfolioPage } from "@/components/PortfolioPage";

export const Route = createFileRoute("/experience")({
  head: () => ({ meta: [
    { title: "Experience | Bright Eduful" },
    { name: "description", content: "Co-founder of SynthxOS since March 2026, a B2B software studio in Accra, plus cybersecurity internships and job simulations in threat hunting, vulnerability management and incident response." },
    { property: "og:title", content: "Experience | Bright Eduful" },
    { property: "og:description", content: "Co-founder of SynthxOS, a B2B software studio in Accra, plus cybersecurity internships and job simulations in threat hunting, vulnerability management and incident response." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Page,
});

function Page() {
  return <PortfolioPage next={{ href: "/certifications", label: "Certifications" }}><Experience /></PortfolioPage>;
}
