import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/sections/Sections";
import { PortfolioPage } from "@/components/PortfolioPage";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact | Bright Eduful" },
    { name: "description", content: "Contact Bright Eduful by email or phone, connect on LinkedIn, or download his cybersecurity CV." },
    { property: "og:title", content: "Contact | Bright Eduful" },
    { property: "og:description", content: "Contact Bright Eduful by email or phone, connect on LinkedIn, or download his cybersecurity CV." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Page,
});

function Page() {
  return <PortfolioPage next={{ href: "/about", label: "About" }}><Contact /></PortfolioPage>;
}
