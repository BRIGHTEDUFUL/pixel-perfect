import { createContext, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/data/portfolio";

export const StandalonePage = createContext(false);

export function PortfolioPage({ children, next }: { children: ReactNode; next: (typeof navLinks)[number] }) {
  return (
    <StandalonePage.Provider value={true}>
      <main className="portfolio-page min-h-svh pb-[calc(6rem+env(safe-area-inset-bottom))] pt-[calc(6rem+env(safe-area-inset-top))] sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Button asChild variant="link" className="min-h-11 px-0 text-muted-foreground"><Link to="/"><ArrowLeft /> Home</Link></Button>
        </div>
        {children}
        <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6">
          <Button asChild variant="outline" size="lg" className="min-h-12 w-full sm:w-auto"><Link to={next.href}>{next.label}<ArrowRight /></Link></Button>
        </div>
      </main>
    </StandalonePage.Provider>
  );
}