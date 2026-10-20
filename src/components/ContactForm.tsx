import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/contact-schema";
import { sendInquiry } from "@/lib/contact.functions";

export function ContactForm() {
  const send = useServerFn(sendInquiry);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const result = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
    setError("");
    setFields({});
    if (!result.success) {
      setFields(Object.fromEntries(result.error.issues.map(issue => [String(issue.path[0]), issue.message])));
      return;
    }
    setBusy(true);
    try {
      await send({ data: result.data });
      form.reset();
      setSent(true);
    } catch {
      setError("Your message wasn’t sent. Please try again or contact me by email.");
    } finally { setBusy(false); }
  }

  if (sent) return <div role="status" className="flex min-h-80 flex-col items-start justify-center gap-5">
    <CheckCircle2 className="text-signal" size={36} />
    <h3 className="font-display text-xl">Message sent.</h3>
    <p className="text-paper/70">Thank you for reaching out, your inquiry has been received.</p>
    <Button variant="outline" className="min-h-11 border-paper/30 bg-transparent text-paper" onClick={() => setSent(false)}>Send another message</Button>
  </div>;

  const inputClass = "min-h-12 rounded-lg border-paper/25 bg-paper/5 text-base text-paper placeholder:text-paper/40";
  return <form onSubmit={submit} noValidate className="space-y-5" aria-label="Contact inquiry">
    <div className="grid gap-5 sm:grid-cols-2">
      {([{ name: "name", label: "Your name", type: "text", max: 100, auto: "name" }, { name: "email", label: "Email address", type: "email", max: 255, auto: "email" }] as const).map(f => <div key={f.name}>
        <label htmlFor={`inquiry-${f.name}`} className="mb-2 block text-sm text-paper/80">{f.label}</label>
        <Input id={`inquiry-${f.name}`} name={f.name} type={f.type} autoComplete={f.auto} maxLength={f.max} required disabled={busy} aria-invalid={!!fields[f.name]} aria-describedby={fields[f.name] ? `error-${f.name}` : undefined} className={inputClass} />
        {fields[f.name] && <p id={`error-${f.name}`} className="mt-2 text-sm text-signal">{fields[f.name]}</p>}
      </div>)}
    </div>
    <div><label htmlFor="inquiry-subject" className="mb-2 block text-sm text-paper/80">Subject</label>
      <Input id="inquiry-subject" name="subject" maxLength={150} required disabled={busy} className={inputClass} aria-invalid={!!fields.subject} aria-describedby={fields.subject ? "error-subject" : undefined} />
      {fields.subject && <p id="error-subject" className="mt-2 text-sm text-signal">{fields.subject}</p>}
    </div>
    <div><label htmlFor="inquiry-message" className="mb-2 block text-sm text-paper/80">Message</label>
      <Textarea id="inquiry-message" name="message" maxLength={3000} rows={5} required disabled={busy} className={`${inputClass} min-h-36 resize-y`} aria-invalid={!!fields.message} aria-describedby={fields.message ? "error-message" : undefined} />
      {fields.message && <p id="error-message" className="mt-2 text-sm text-signal">{fields.message}</p>}
    </div>
    <div hidden aria-hidden="true"><label htmlFor="inquiry-website">Website</label><input id="inquiry-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    {error && <p role="alert" className="text-sm text-signal">{error}</p>}
    <Button type="submit" disabled={busy} className="min-h-12 w-full rounded-full bg-signal text-ink hover:bg-signal/90 sm:w-auto sm:px-8">{busy ? <Loader2 className="animate-spin" /> : <Send />} {busy ? "Sending…" : "Send message"}</Button>
  </form>;
}