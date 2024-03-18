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

export const ImageInput = forwardRef(InnerComponent);

type ImageInputProps = {
  imageSrc: string;
  error?: string;
} & ComponentPropsWithRef<"input">;

function InnerComponent(
  { imageSrc, error, ...props }: ImageInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { postData, setPostData } = usePost();
  const [inputImage, setInputImage] = useState(imageSrc);
  const deferredImage = useDeferredValue(inputImage);

  // Update global state with deferred value to prevent lag
  useEffect(() => {
    setPostData((prevPostData) => ({ ...prevPostData, imageSrc: deferredImage }));
  }, [deferredImage, setPostData]);

  // Update local storage for post preview page
  useEffect(() => {
    localStorage.setItem(
      "live-preview-data",
      JSON.stringify({ ...postData, imageSrc: inputImage })
    );
  }, [inputImage, postData]);

  return (
    <PostFormInput
      {...props}
      type="text"
      label="Image Link:"
      id="image"
      ref={ref}
      defaultValue={inputImage}
      minLength={10}
      maxLength={200}
      required
      error={error}
      onChange={(e) => setInputImage(e.target.value)}
    />
  );
}
