import React, {
  useState,
  useEffect,
  useDeferredValue,
  forwardRef,
  type ComponentPropsWithRef,
  type ForwardedRef,
} from "react";
import usePost from "@/app/drafts/(pages)/hooks/usePost";
import { PostFormInput } from "./PostFormInput";
import type { PostTags } from "@/types/tags";

export const TagsInput = forwardRef(InnerComponent);

type TagsInputProps = { tags: PostTags; error?: string } & ComponentPropsWithRef<"input">;

function InnerComponent(
  { tags, error, ...props }: TagsInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { postData, setPostData } = usePost();
  const [inputTags, setInputTags] = useState(tags);
  const deferredTags = useDeferredValue(inputTags);

  // Update global state with deferred value to prevent lag
  useEffect(() => {
    setPostData((prevPostData) => ({ ...prevPostData, tags: deferredTags }));
  }, [deferredTags, setPostData]);

  // Update local storage for post preview page
  useEffect(() => {
    localStorage.setItem("live-preview-data", JSON.stringify({ ...postData, tags: inputTags }));
  }, [inputTags, postData]);

  return (
    <PostFormInput
      {...props}
      type="text"
      label="Add Tags (optional):"
      id="tags"
      defaultValue={`${inputTags
        .map((tag) => {
          return tag.name;
        })
        .join(" ")}${inputTags.length > 0 ? " " : ""}`} // Add space if there are tags
      ref={ref}
      error={error}
      onChange={() => {
        if (typeof ref === "object" && ref !== null && ref.current !== null) {
          const newTagsValue = ref.current.value
            .split(" ")
            .filter((tag) => tag.trim() !== "") // Ignore empty tags
            .map((tag) => ({ id: tag, name: tag }));

          setInputTags(newTagsValue);
        }
      }}
    />
  );
}
