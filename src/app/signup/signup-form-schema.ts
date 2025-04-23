import { z } from "zod";

export const SignupFormSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
    password: z.string().min(6, "Password is required."),
    confirmPassword: z.string().min(6, "Password is required."),
});
