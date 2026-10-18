import { createFileRoute } from "@tanstack/react-router";
import { Skills } from "@/components/sections/Sections";
import { PortfolioPage } from "@/components/PortfolioPage";

export const Route = createFileRoute("/skills")({
  head: () => ({ meta: [
    { title: "Skills | Bright Eduful" },
    { name: "description", content: "Bright Eduful’s skills in incident response, threat hunting, SIEM tools, programming, networking and cloud fundamentals." },
    { property: "og:title", content: "Skills | Bright Eduful" },
    { property: "og:description", content: "Bright Eduful’s skills in incident response, threat hunting, SIEM tools, programming, networking and cloud fundamentals." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Page,
});

function Page() {
  return <PortfolioPage next={{ href: "/contact", label: "Contact" }}><Skills /></PortfolioPage>;
}
