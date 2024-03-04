import { z } from "zod";

// Error Messages
const required_title_error = "Title cannot be empty.";
const max_title_error = "Title cannot be longer than 100 characters.";

const required_content_error = "Content has to be at least 100 characters long.";

// Schemas
export const PostSchema = z.object({
  title: z.string().min(1, required_title_error).max(100, max_title_error),
  category: z.string().min(1),
  content: z.string().min(100, required_content_error),
});
