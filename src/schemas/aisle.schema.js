import { z } from "zod";


const aisleSchema = z.object({
    number: z.number(),
    
});

export const validateAisles = (object) => {
    return aisleSchema.safeParse(object);
};
  