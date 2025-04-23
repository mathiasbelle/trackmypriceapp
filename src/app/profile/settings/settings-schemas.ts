import { z } from "zod";

export const UpdateNameSchema = z.object({
    name: z.string().min(2, {
        message: "The name must be at least 2 characters long.",
    }),
});

export const DeleteAccountSchema = z.object({
    password: z.string().min(1, "Password is required."),
});
