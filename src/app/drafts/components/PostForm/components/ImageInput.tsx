import React, { useState, useEffect, useDeferredValue, type ComponentPropsWithRef } from "react";
import usePostForm from "@/app/drafts/hooks/usePostForm";
import { PostFormInput } from "./PostFormInput";

type ImageInputProps = {
  imageSrc: string;
  error?: string;
} & ComponentPropsWithRef<"input">;

export default function ImageInput({ imageSrc, error, ...props }: ImageInputProps) {
  const { postData, setPostData, refs } = usePostForm();
  const [inputImage, setInputImage] = useState(imageSrc);
  const deferredImage = useDeferredValue(inputImage);

  // Update global state with deferred value to prevent lag
  useEffect(() => {
    setPostData((prevPostData) => ({ ...prevPostData, image: deferredImage }));
  }, [deferredImage, setPostData]);

  // Update local storage for post preview page
  useEffect(() => {
    localStorage.setItem("live-preview-data", JSON.stringify({ ...postData, image: inputImage }));
  }, [inputImage, postData]);

  return (
    <PostFormInput
      {...props}
      type="text"
      label="Image Link:"
      id="image"
      ref={refs.imageRef}
      defaultValue={inputImage}
      minLength={10}
      maxLength={200}
      required
      error={error}
      onChange={(e) => setInputImage(e.target.value)}
    />
  );
}
