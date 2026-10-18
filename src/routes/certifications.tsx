import { createFileRoute } from "@tanstack/react-router";
import { Certifications } from "@/components/sections/Sections";
import { PortfolioPage } from "@/components/PortfolioPage";

export const Route = createFileRoute("/certifications")({
  head: () => ({ meta: [
    { title: "Certifications | Bright Eduful" },
    { name: "description", content: "Bright Eduful’s certifications, including Microsoft Azure Fundamentals AZ-900 and credentials from ISC2, Google, APIsec and Splunk." },
    { property: "og:title", content: "Certifications | Bright Eduful" },
    { property: "og:description", content: "Bright Eduful’s certifications, including Microsoft Azure Fundamentals AZ-900 and credentials from ISC2, Google, APIsec and Splunk." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Page,
});

function Page() {
  return <PortfolioPage next={{ href: "/projects", label: "Projects" }}><Certifications /></PortfolioPage>;
}
