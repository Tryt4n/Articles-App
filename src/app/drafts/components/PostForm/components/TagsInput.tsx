import React, { useState, useEffect, useDeferredValue, type ComponentPropsWithRef } from "react";
import usePostForm from "@/app/drafts/(pages)/hooks/usePostForm";
import { PostFormInput } from "./PostFormInput";
import type { PostTags } from "@/types/tags";

type TagsInputProps = { tags: PostTags; error?: string } & ComponentPropsWithRef<"input">;

export default function TagsInput({ tags, error, ...props }: TagsInputProps) {
  const { postData, setPostData, refs } = usePostForm();
  const [inputTags, setInputTags] = useState(tags);
  const deferredTags = useDeferredValue(inputTags);

  const { tagsRef } = refs;

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
      // ref={ref}
      ref={tagsRef}
      error={error}
      onChange={() => {
        if (typeof tagsRef === "object" && tagsRef !== null && tagsRef.current !== null) {
          const newTagsValue = tagsRef.current.value
            .split(" ")
            .filter((tag) => tag.trim() !== "") // Ignore empty tags
            .map((tag) => ({ id: tag, name: tag }));

          setInputTags(newTagsValue);
        }
      }}
    />
  );
}
