export const profile = {
  name: "Bright Eduful",
  role: "Cybersecurity Analyst",
  location: "Accra, Ghana",
  email: "brighteduful22@gmail.com",
  phone: "+233245251204",
  linkedin: "https://linkedin.com/in/brighteduful",
  cv: "/BrightEduful-CV.pdf",
  tagline: ["Threat analysis", "Vulnerability management", "Incident response"],
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Certifications", href: "/certifications" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
] as const;

export type ThemeId = "neon" | "aurora" | "sunset";

export const themes: { id: ThemeId; label: string; swatches: string[] }[] = [
  { id: "neon", label: "Neon", swatches: ["#303030", "#989898", "#A6FF00"] },
  { id: "aurora", label: "Aurora", swatches: ["#009FA1", "#F47A90", "#3E055A"] },
  { id: "sunset", label: "Sunset", swatches: ["#F9D849", "#D73B4F", "#140363"] },
];
