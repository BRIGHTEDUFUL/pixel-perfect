import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ThemeId } from "@/data/portfolio";

const Ctx = createContext<{ theme: ThemeId; setTheme: (t: ThemeId) => void }>({
  theme: "neon",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>("neon");

  useEffect(() => {
    const saved = localStorage.getItem("be-theme") as ThemeId | null;
    if (saved === "neon" || saved === "aurora" || saved === "sunset") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("be-theme", theme);
  }, [theme]);

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
