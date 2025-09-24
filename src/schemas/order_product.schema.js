import { z } from "zod";

const order_ProductSchema = z.object({
  weight: z.number().nonnegative(),
  productId: z.string(),
  orderId: z.string(),
  orderProductStateId: z.string(),
});

export const validateOrder_Product = (object) => {
  return order_ProductSchema.safeParse(object);
};

export const validatePartialOrder_Product = (object) => {
  return order_ProductSchema.partial().safeParse(object);
};
