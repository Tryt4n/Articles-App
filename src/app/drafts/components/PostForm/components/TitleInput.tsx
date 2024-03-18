import React, {
  useState,
  useEffect,
  useDeferredValue,
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithRef,
} from "react";
import usePost from "@/app/drafts/(pages)/hooks/usePost";
import { PostFormInput } from "./PostFormInput";

type TitleInputProps = {
  title: string;
  error?: string;
} & ComponentPropsWithRef<"input">;

export const TitleInput = forwardRef(InnerComponent);

function InnerComponent(
  { title, error, ...props }: TitleInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { postData, setPostData } = usePost();
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
      ref={ref}
      defaultValue={inputTitle}
      required
      error={error}
      onChange={(e) => setInputTitle(e.target.value)}
    />
  );
}
