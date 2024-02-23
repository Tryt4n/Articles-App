import { z } from "zod";

// Error Messages
const required_email_error = "Email is required.";
const invalid_email_error = "Invalid email address provided.";

const required_username_error = "Username is required.";
const invalid_username_too_short_error = "Username length must be at least 3 characters long.";
const invalid_username_too_long_error = "Username length must be at most 50 characters long.";

const required_password_error = "Password is required.";
const invalid_password_too_short_error = "Password must be at least 8 characters long.";
const invalid_password_too_long_error = "Password must be at most 50 characters long.";

const invalid_password_confirmation_error = "Passwords do not match.";

// Schemas
export const SignupSchema = z
  .object({
    email: z.string().min(1, required_email_error).email(invalid_email_error),
    username: z
      .string()
      .min(1, required_username_error)
      .min(3, invalid_username_too_short_error)
      .max(50, invalid_username_too_long_error),
    password: z
      .string()
      .min(1, required_password_error)
      .min(8, invalid_password_too_short_error)
      .max(50, invalid_password_too_long_error),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: invalid_password_confirmation_error,
    path: ["passwordConfirmation"],
  });
