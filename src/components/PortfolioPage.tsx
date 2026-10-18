import { createContext, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/data/portfolio";

export const StandalonePage = createContext(false);

export function PortfolioPage({ children, next }: { children: ReactNode; next: (typeof navLinks)[number] }) {
  return (
    <StandalonePage.Provider value={true}>
      <main className="portfolio-page min-h-svh pb-28 pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Button asChild variant="link" className="px-0 text-muted-foreground"><Link to="/"><ArrowLeft /> Home</Link></Button>
        </div>
        {children}
        <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6">
          <Button asChild variant="outline" size="lg"><Link to={next.href}>{next.label}<ArrowRight /></Link></Button>
        </div>
      </main>
    </StandalonePage.Provider>
  );
}