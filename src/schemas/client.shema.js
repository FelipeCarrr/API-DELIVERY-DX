import { z } from "zod";

const clientSchema = z.object({
  name: z.string().min(4).max(64),
  lastName: z.string().min(4).max(64),
  phone: z.string().min(10).max(10),
  email: z.string().email(),
  address: z.array(
    z.object({
      direction: z.string().min(4).max(128),
      contactName: z.string().min(4).max(64),
      contactPhone: z.string().min(10).max(10),
    })
  ),
});

export const validateClient = (object) => {
  return clientSchema.safeParse(object);
};

export const validatePartialClient = (object) => {
  return clientSchema.partial().safeParse(object);
};
