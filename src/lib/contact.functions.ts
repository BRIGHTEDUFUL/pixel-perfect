import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { contactSchema, statusSchema } from "./contact-schema";

export const sendInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { website: _website, ...inquiry } = data;
    const { error } = await supabaseAdmin.from("contact_submissions").insert(inquiry);
    if (error) throw new Error("Your message could not be saved. Please try again.");
    return { success: true };
  });

export const listInquiries = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ page: z.number().int().min(0), filter: z.enum(["all", "unread", "archived"]) }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (roleError || !isAdmin) throw new Error("This inbox is only available to the site owner.");
    let query = context.supabase.from("contact_submissions").select("id, created_at, name, email, subject, message, status", { count: "exact" }).order("created_at", { ascending: false });
    if (data.filter === "all") query = query.neq("status", "archived");
    else query = query.eq("status", data.filter);
    const { data: rows, error, count } = await query.range(data.page * 20, data.page * 20 + 19);
    if (error) throw new Error("Messages could not be loaded. Please try again.");
    return { rows: rows ?? [], count: count ?? 0 };
  });

export const updateInquiry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => statusSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (roleError || !isAdmin) throw new Error("This inbox is only available to the site owner.");
    const { data: row, error } = await context.supabase.from("contact_submissions").update({ status: data.status }).eq("id", data.id).select("id").single();
    if (error || !row) throw new Error("The message could not be updated.");
    return { success: true };
  });