import { z } from 'zod'

// Base schemas (as ZodObject)
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits')
})

export const addressSchema = z.object({
  streetAddress: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().regex(/^\d{5,}$/, 'Zip code must be at least 5 digits')
})

export const accountSchema = z.object({
  username: z.string().min(4, 'Username must be at least 4 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
})

// Combined schema without refinement (for step validation)
export const baseFormSchema = personalInfoSchema
  .merge(addressSchema)
  .merge(accountSchema)

// Final schema with refinement (for form submission)
export const formSchema = baseFormSchema.refine(
  data => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }
)

export type FormData = z.infer<typeof formSchema>