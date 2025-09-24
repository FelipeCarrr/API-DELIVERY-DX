import { z } from "zod";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(64),
});

export const validateAuth = (object) => {
  return authSchema.safeParse(object);
};

export const validatePartialAuth = (object) => {
  return authSchema.partial().safeParse(object);
};
