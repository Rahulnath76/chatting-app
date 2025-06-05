import { z } from "zod";

export const userValidator = z.object({
  username: z.string().min(1, "Atleast one character is required").transform((val) => val.trim()),
  fullName: z
    .string()
    .min(3)
    .max(50)
    .transform((val) => val.trim().replace(/\s+/g, " ")),

  email: z
    .string()
    .email("Invalid email format")
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[0-9]/, "Must include at least one number"),
});

export const loginUserValidator = z.object({
  identifier: z
    .string()
    .min(1, "Identifier is required")
    .transform((val) => val.trim().toLowerCase()),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
