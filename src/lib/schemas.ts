import { z } from "zod";

// Helper function for password matching validation
const passwordRefinement = (data: {
  password: string;
  confirmPassword: string;
}) => data.password === data.confirmPassword;

// Base schemas without refinements
const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const addressSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().regex(/^\d{5,}$/, "Zip code must be at least 5 digits"),
});

const accountBaseSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
});

// Apply password matching refinement separately
export const accountSchema = accountBaseSchema.superRefine((data, ctx) => {
  if (!passwordRefinement(data)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  }
});

// Combined schema without password refinement for step validation
export const baseFormSchema = personalInfoSchema
  .merge(addressSchema)
  .merge(accountBaseSchema);

// Final schema with all validations
export const formSchema = baseFormSchema.superRefine((data, ctx) => {
  if (!passwordRefinement(data)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  }
});

export type FormData = z.infer<typeof formSchema>;
