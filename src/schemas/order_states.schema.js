import { z } from "zod";

const orderStatesSchema = z.object({
  name: z.string().min(4).max(64),
});

export const validateOrderStates = (object) => {
  return orderStatesSchema.safeParse(object);
};

export const validatePartialOrderStates = (object) => {
  return orderStatesSchema.partial().safeParse(object);
};
