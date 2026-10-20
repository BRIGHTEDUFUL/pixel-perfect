import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import "@lovable.dev/cloud-auth-js/styles.css";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Owner Sign In | Bright Eduful" }, { name: "description", content: "Sign in to Bright Eduful's private messages page." },
    { property: "og:title", content: "Owner Sign In | Bright Eduful" }, { property: "og:description", content: "Sign in to Bright Eduful's private messages page." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { let mounted = true; supabase.auth.getUser().then(({ data }) => { if (mounted && data.user) void navigate({ to: "/admin/messages", replace: true }); }); return () => { mounted = false; }; }, [navigate]);
  async function signIn(provider: "google" | "lovable") {
    setBusy(true); setError("");
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/auth` });
      if (result.error) { setError("Sign-in failed. Please try again."); return; }
      if (!result.redirected) await navigate({ to: "/admin/messages" });
    } catch { setError("Sign-in failed. Please try again."); }
    finally { setBusy(false); }
  }
  return <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 pb-32 pt-32">
    <ShieldCheck className="mb-6 text-foreground" size={40} /><p className="mb-3 font-mono text-xs text-muted-foreground">BRIGHT EDUFUL / ADMIN</p><h1 className="font-display text-3xl font-bold">Owner sign in</h1><p className="mb-8 mt-4 text-muted-foreground">Sign in with your verified owner account to read inquiries.</p>
    <div className="space-y-3"><Button className="min-h-12 w-full" disabled={busy} onClick={() => signIn("google")}>Sign in with Google</Button><Button className="lovable-auth-button w-full" disabled={busy} onClick={() => signIn("lovable")}>Sign in with Lovable</Button></div>
    {error && <p role="alert" className="mt-5 text-destructive">{error}</p>}
    <Button asChild variant="link" className="mt-6 min-h-11"><Link to="/">Back to portfolio</Link></Button>
  </main>;
}