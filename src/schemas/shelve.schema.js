import { z } from "zod";


const shelveSchema = z.object({
    numberAisle: z.number(),
    numberShelve: z.number()

});

export const validateShelve = (object) => {
    return shelveSchema.safeParse(object);
};
