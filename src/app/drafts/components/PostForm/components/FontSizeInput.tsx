import usePost from "@/app/drafts/(pages)/hooks/usePost";
import React, {
  useState,
  useEffect,
  useDeferredValue,
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithoutRef,
} from "react";

export const FontSizeInput = forwardRef(InnerComponent);

function InnerComponent(
  { ...props }: ComponentPropsWithoutRef<"input">,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { setTextOptions } = usePost();
  const [fontSize, setFontSize] = useState("16px");
  const deferredFontSize = useDeferredValue(fontSize);

  useEffect(() => {
    setTextOptions((prevValue) => ({ ...prevValue, textSize: deferredFontSize }));
  }, [deferredFontSize, setTextOptions]);

  return (
    <label>
      <input
        {...props}
        type="text"
        name="post-content-font-size"
        id="post-content-font-size"
        ref={ref}
        defaultValue={fontSize}
        aria-label="Change font size"
        onChange={(e) => setFontSize(e.target.value)}
        maxLength={5}
      />
    </label>
  );
}
