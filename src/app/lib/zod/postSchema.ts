import { z } from "zod";

// Error Messages
const required_title_error = "Title cannot be empty.";
const max_title_error = "Title cannot be longer than 100 characters.";
const special_char_title_error = "Title can only contain alphanumeric characters and spaces.";

const required_content_error = "Content has to be at least 100 characters long.";

const max_tag_error = "Tags value cannot be longer than 100 characters.";
const max_single_tag_error = "Single tag cannot be longer than 30 characters.";
const special_char_tag_error = "Tags can only contain alphanumeric characters, spaces, and #.";

const image_link_error = "Image link cannot be empty.";
const image_link_not_url_error = "Image link has to be a valid URL.";

const onlyLettersAndNumbersWithWhiteSpaces = new RegExp(/^[\p{L}\p{N}\s]*$/u);
const onlyBasicLettersNumbersWhiteSpacesAndHash = new RegExp(/^[\w\s#]*$/);

export const PostSchema = z.object({
  title: z
    .string()
    .min(1, required_title_error)
    .max(100, max_title_error)
    .refine((title) => onlyLettersAndNumbersWithWhiteSpaces.test(title), special_char_title_error),
  category: z.string().min(1),
  content: z.string().min(100, required_content_error),
  tags: z
    .string()
    .max(100, max_tag_error)
    .refine((tags) => tags.split(" ").every((tag) => tag.length <= 30), max_single_tag_error)
    .refine((tags) => onlyBasicLettersNumbersWhiteSpacesAndHash.test(tags), special_char_tag_error),
  image: z
    .string()
    .min(1, image_link_error)
    .refine((image) => {
      try {
        new URL(image);
        return true;
      } catch (_) {
        return false;
      }
    }, image_link_not_url_error),
});
