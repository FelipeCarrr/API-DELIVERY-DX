import { z } from "zod";

const orderSchema = z.object({
  clientId: z.string(),
  orderStateId: z.string(),
});

const orderCompleteSchema = z.object({
  email: z.string().email(),
  products: z.array(
    z.object({
      productId: z.string(),
      weight: z.number().int().positive(),
    })
  ),
  addressId: z.string(),
});

export const validateOrder = (object) => {
  return orderSchema.safeParse(object);
};

export const validatePartialOrder = (object) => {
  return orderSchema.partial().safeParse(object);
};

export const validateOrderComplete = (object) => {
  return orderCompleteSchema.safeParse(object);
};
