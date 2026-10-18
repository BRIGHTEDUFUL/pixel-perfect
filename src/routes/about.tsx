import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/sections/Sections";
import { PortfolioPage } from "@/components/PortfolioPage";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About | Bright Eduful" },
    { name: "description", content: "Cybersecurity analyst in Accra, Ghana, studying Cybersecurity at Ghana Communication Technology University." },
    { property: "og:title", content: "About | Bright Eduful" },
    { property: "og:description", content: "Cybersecurity analyst in Accra, Ghana, studying Cybersecurity at Ghana Communication Technology University." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Page,
});

function Page() {
  return <PortfolioPage next={{ href: "/experience", label: "Experience" }}><About /></PortfolioPage>;
}
