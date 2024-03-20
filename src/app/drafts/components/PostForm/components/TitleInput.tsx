import React, { useState, useEffect, useDeferredValue, type ComponentPropsWithRef } from "react";
import usePostForm from "@/app/drafts/hooks/usePostForm";
import { PostFormInput } from "./PostFormInput";

type TitleInputProps = {
  title: string;
  error?: string;
} & ComponentPropsWithRef<"input">;

export default function TitleInput({ title, error, ...props }: TitleInputProps) {
  const { postData, setPostData, refs } = usePostForm();
  const [inputTitle, setInputTitle] = useState(title);
  const deferredTitle = useDeferredValue(inputTitle);

  // Update global state with deferred value to prevent lag
  useEffect(() => {
    setPostData((prevPostData) => ({ ...prevPostData, title: deferredTitle }));
  }, [deferredTitle, setPostData]);

  // Update local storage for post preview page
  useEffect(() => {
    localStorage.setItem("live-preview-data", JSON.stringify({ ...postData, title: inputTitle }));
  }, [inputTitle, postData]);

  return (
    <PostFormInput
      {...props}
      type="text"
      label="Title:"
      id="title"
      ref={refs.titleRef}
      defaultValue={inputTitle}
      required
      error={error}
      onChange={(e) => setInputTitle(e.target.value)}
    />
  );
}
