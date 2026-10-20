import { describe, expect, it } from "vitest";
import { contactSchema, statusSchema } from "@/lib/contact-schema";

const valid = { name: "Visitor", email: "visitor@example.com", subject: "Cybersecurity inquiry", message: "I'd like to discuss a project.", website: "" };
describe("Contact validation", () => {
  it("accepts an inquiry and trims whitespace", () => expect(contactSchema.parse({ ...valid, name: " Visitor " }).name).toBe("Visitor"));
  it.each(["name", "subject", "message"])("rejects empty %s", field => expect(contactSchema.safeParse({ ...valid, [field]: " " }).success).toBe(false));
  it("rejects an invalid email", () => expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false));
  it.each([["name", 100], ["email", 255], ["subject", 150], ["message", 3000]] as const)("bounds %s", (field, max) => expect(contactSchema.safeParse({ ...valid, [field]: "a".repeat(max + 1) }).success).toBe(false));
  it("rejects a filled spam trap", () => expect(contactSchema.safeParse({ ...valid, website: "spam" }).success).toBe(false));
  it("rejects unsupported message statuses", () => expect(statusSchema.safeParse({ id: "a437fd01-9a70-4a23-a3d6-05c73d5be1e1", status: "deleted" }).success).toBe(false));
});