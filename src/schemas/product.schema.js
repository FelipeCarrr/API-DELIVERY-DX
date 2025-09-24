import { z } from "zod";

const productSchema = z.object({
  name: z.string().max(45),
  image: z.string().startsWith("data:image/").optional(),
});

export const validateProduct = (object) => {
  return productSchema.safeParse(object);
};
