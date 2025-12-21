// lib/validators.ts
import { z } from "zod";

export const generateEmailSchema = z.object({
  context: z.string().min(1),
  tone: z.string().optional(),
});