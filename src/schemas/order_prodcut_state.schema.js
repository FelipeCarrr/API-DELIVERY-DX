import { z } from "zod";

const orderProductStateSchema = z.object({
  name: z.string().min(4).max(45),
});

export const validateProductOrderState = (object) => {
  return orderProductStateSchema.safeParse(object);
};

export const validatePartialOrderProductState = (object) => {
  return orderProductStateSchema.partial().safeParse(object);
};