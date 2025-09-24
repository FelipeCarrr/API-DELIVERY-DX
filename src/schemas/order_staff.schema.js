import { z } from "zod";

const orderStaffSchema = z.object({
  orderId: z.string(),
  ID_recolector: z.string().nullable(),
  ID_repartidor: z.string().nullable(),
});

export const validateOrderStaff = (object) => {
  return orderStaffSchema.safeParse(object);
};

export const validatePartialOrderStaff = (object) => {
  return orderStaffSchema.partial().safeParse(object);
};
