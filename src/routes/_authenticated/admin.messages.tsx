import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Archive, ArrowLeft, ArrowRight, Mail, RefreshCw, LogOut, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { listInquiries, updateInquiry } from "@/lib/contact.functions";
import { supabase } from "@/integrations/supabase/client";

type Filter = "all" | "unread" | "archived";
const inquiries = (page: number, filter: Filter) => queryOptions({ queryKey: ["inquiries", page, filter], queryFn: () => listInquiries({ data: { page, filter } }), retry: false });

export const Route = createFileRoute("/_authenticated/admin/messages")({
  head: () => ({ meta: [
    { title: "Private Messages | Bright Eduful" },
    { name: "description", content: "Bright Eduful's private inquiry inbox." },
    { property: "og:title", content: "Private Messages | Bright Eduful" },
    { property: "og:description", content: "Bright Eduful's private inquiry inbox." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(inquiries(0, "all")),
  component: Messages,
  errorComponent: ({ reset }) => <main className="mx-auto max-w-3xl px-5 pb-32 pt-36"><h1 className="font-display text-2xl">Inbox unavailable</h1><p className="my-6">Only the site owner's verified account can access these messages.</p><div className="flex flex-wrap gap-3"><Button onClick={reset}>Try again</Button><Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button></div></main>,
});

function Messages() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const update = useServerFn(updateInquiry);
  const { data, isFetching } = useSuspenseQuery(inquiries(page, filter));
  const active = data.rows.find(row => row.id === selected);
  async function status(id: string, value: "read" | "unread" | "archived") {
    setBusy(true); setError("");
    try { await update({ data: { id, status: value } }); await queryClient.invalidateQueries({ queryKey: ["inquiries"] }); }
    catch { setError("Could not update this message. Please try again."); }
    finally { setBusy(false); }
  }
  return <main className="mx-auto max-w-7xl px-4 pb-32 pt-32 sm:px-6">
    <p className="mb-3 font-mono text-xs text-muted-foreground">BRIGHT EDUFUL / PRIVATE INBOX</p>
    <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
      <h1 className="font-display text-3xl font-bold">Messages <span className="text-muted-foreground">({data.count})</span></h1>
      <div className="flex gap-2"><Button variant="outline" size="icon" className="h-11 w-11" title="Refresh messages" aria-label="Refresh messages" onClick={() => queryClient.invalidateQueries({ queryKey: ["inquiries"] })}><RefreshCw className={isFetching ? "animate-spin" : ""} /></Button><Button variant="outline" className="min-h-11" onClick={() => supabase.auth.signOut()}><LogOut />Sign out</Button></div>
    </div>
    <div className="my-6 flex gap-2" role="group" aria-label="Filter messages">{(["all", "unread", "archived"] as const).map(value => <Button key={value} variant={filter === value ? "default" : "outline"} className="min-h-11 capitalize" aria-pressed={filter === value} onClick={() => { setFilter(value); setPage(0); setSelected(null); }}>{value === "all" ? "Inbox" : value}</Button>)}</div>
    {error && <p role="alert" className="mb-4 text-destructive">{error}</p>}
    <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className="min-w-0">
        {data.rows.length === 0 ? <div className="border-y py-16 text-center"><Inbox className="mx-auto mb-4 text-muted-foreground" /><p>No {filter === "all" ? "" : filter + " "}messages yet.</p></div> : <ul className="divide-y border-y">{data.rows.map(row => <li key={row.id}><Button variant="ghost" disabled={busy} onClick={() => { setSelected(row.id); if (row.status === "unread") void status(row.id, "read"); }} className={`h-auto min-h-24 w-full justify-start whitespace-normal rounded-none px-3 py-5 text-left ${row.id === selected ? "bg-muted" : ""}`}><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="break-words font-semibold">{row.name}</span>{row.status === "unread" && <span className="shrink-0 rounded-full bg-signal px-2 py-1 text-xs text-ink">New</span>}</div><p className="mt-1 break-words">{row.subject}</p><time className="mt-2 block text-xs text-muted-foreground">{new Date(row.created_at).toLocaleString()}</time></div></Button></li>)}</ul>}
        <div className="mt-5 flex items-center justify-between gap-3"><Button variant="outline" disabled={page === 0} onClick={() => { setPage(p => p - 1); setSelected(null); }} aria-label="Previous page"><ArrowLeft /></Button><span className="text-sm">Page {page + 1}</span><Button variant="outline" disabled={(page + 1) * 20 >= data.count} onClick={() => { setPage(p => p + 1); setSelected(null); }} aria-label="Next page"><ArrowRight /></Button></div>
      </div>
      {active ? <article className="min-w-0 border-t py-6 lg:border-t-0 lg:py-0"><p className="mb-2 font-mono text-xs uppercase text-muted-foreground">{active.status}</p><h2 className="break-words font-display text-xl">{active.subject}</h2><p className="mt-4 break-words">{active.name}</p><a className="break-all text-sm underline" href={`mailto:${encodeURIComponent(active.email)}`}>{active.email}</a><p className="my-8 whitespace-pre-wrap break-words leading-relaxed">{active.message}</p><div className="flex flex-wrap gap-3"><Button asChild className="min-h-11"><a href={`mailto:${encodeURIComponent(active.email)}?subject=${encodeURIComponent(`Re: ${active.subject}`)}`}><Mail />Reply by email</a></Button><Button variant="outline" disabled={busy} className="min-h-11" onClick={() => status(active.id, active.status === "archived" ? "read" : "archived")}><Archive />{active.status === "archived" ? "Restore" : "Archive"}</Button><Button variant="outline" disabled={busy} className="min-h-11" onClick={() => status(active.id, active.status === "unread" ? "read" : "unread")}>{active.status === "unread" ? "Mark read" : "Mark unread"}</Button></div></article> : <div className="hidden min-h-72 items-center justify-center border-l text-muted-foreground lg:flex">Select a message</div>}
    </div>
  </main>;
}