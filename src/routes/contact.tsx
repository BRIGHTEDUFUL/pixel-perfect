import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/sections/Sections";
import { PortfolioPage } from "@/components/PortfolioPage";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact | Bright Eduful" },
    { name: "description", content: "Send Bright Eduful an inquiry about cybersecurity opportunities, projects, or collaboration." },
    { property: "og:title", content: "Contact | Bright Eduful" },
    { property: "og:description", content: "Send Bright Eduful an inquiry about cybersecurity opportunities, projects, or collaboration." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Page,
});

function Page() {
  return <PortfolioPage next={{ href: "/about", label: "About" }}><Contact /></PortfolioPage>;
}
