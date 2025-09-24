import { z } from "zod";

export const administrationSchema = z.object({
  name: z.string("El nombre es obligatorio"),
  latitude: z.number({ invalid_type_error: "La latitud debe ser un número" }),
  longitude: z.number({ invalid_type_error: "La longitud debe ser un número" }),
  radius: z.number({ invalid_type_error: "El radio debe ser un número" }),
});

export function validateAdministration(data) {
  return administrationSchema.safeParse(data);
}
