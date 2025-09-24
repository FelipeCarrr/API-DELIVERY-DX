import { z } from "zod";

const typeSchema = z.object({
  name: z.string().max(45),
});

export const validateType = (object) => {
  return typeSchema.safeParse(object);
};
