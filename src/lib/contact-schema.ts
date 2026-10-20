import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  subject: z.string().trim().min(1, "Enter a subject.").max(150),
  message: z.string().trim().min(1, "Enter your message.").max(3000),
  website: z.string().max(0, "Unable to send this inquiry.").default(""),
});
export const statusSchema = z.object({ id: z.string().uuid(), status: z.enum(["unread", "read", "archived"]) });
export type ContactInput = z.infer<typeof contactSchema>;