import { z } from "zod";

const levelSchema = z.object({
  shelveId: z.string(),
  numberAmount: z.number(),
  numberLevel: z.number(),
  avalaible: z.number(),
});

export const validateLevel = (object) => {
  return levelSchema.safeParse(object);
};
