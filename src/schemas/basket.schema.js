import { z } from "zod";

const basketSchema = z.object({
  levelId: z.string(),
  weight: z.number().nonnegative(),
  productId: z.string(),
  expiration: z
    .string()
    .nullable()
    .refine(
      (val) => {
        if (val === null) return true; // Aceptar `NULL`
        const date = new Date(val);
        return !isNaN(date.getTime()); // Validar que la fecha es válida
      },
      {
        message: "Invalid date format or null value",
      }
    ),
});

export const validateBasket = (object) => {
  return basketSchema.safeParse(object);
};

export const validatePartialBasket = (object) => {
  return basketSchema.partial().safeParse(object);
};
