import { z } from "zod";

const addressSchema = z.object({
  direction: z
    .string()
    .max(128, "Direction must be at most 128 characters long"),
  contactName: z
    .string()
    .max(64, "Contact name must be at most 64 characters long")
    .optional(),
  contactPhone: z
    .string()
    .length(10, "Contact phone must be exactly 10 characters long")
    .optional(),
});

const updateAddressLatLng = z.object({
  id: z.string().uuid("Invalid address ID"),
  latitude: z.number(),
  longitude: z.number(),
});

export const validateAddress = (object) => {
  return addressSchema.safeParse(object);
};

export const validateUpdateAddress = (object) => {
  return updateAddressLatLng.safeParse(object);
};
