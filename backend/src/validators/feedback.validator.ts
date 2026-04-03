import { z } from "zod";

export const createFeedbackSchema = z.object({
  kind: z.enum(["review", "report"]),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  comment: z.string().min(2),
});