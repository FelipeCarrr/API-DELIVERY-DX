import { z } from "zod";

const staffSchema = z.object({
  email: z.string().email(),
  name: z.string().min(4).max(64),
  lastName: z.string().min(4).max(64),
  phone: z.string().min(10).max(10),
  rol: z.enum(["ADMIN", "COURIER", "PACKER"]),
});

export const validateStaff = (object) => {
  return staffSchema.safeParse(object);
};

export const validatePartialStaff = (object) => {
  return staffSchema.partial().safeParse(object);
};
