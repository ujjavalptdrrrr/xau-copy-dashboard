import { z } from "zod";
export const accountSchema = z.object({
  name: z.string().trim().min(2).max(60),
  broker: z.string().trim().min(2).max(60),
  server: z.string().trim().min(3).max(80),
  login: z.string().trim().regex(/^\d{5,12}$/),
  accountType: z.enum(["master", "client"]),
  balance: z.number().min(0).max(100_000_000),
  lotMode: z.enum(["fixed", "multiplier"]),
  fixedLot: z.number().min(0.01).max(100),
  multiplier: z.number().min(0.001).max(10),
});
export type AccountFormValues = z.infer<typeof accountSchema>;