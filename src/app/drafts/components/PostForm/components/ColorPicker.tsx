import React, {
  useState,
  useEffect,
  useDeferredValue,
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithoutRef,
} from "react";
import usePost from "@/app/drafts/(pages)/hooks/usePost";

export const ColorPicker = forwardRef(InnerComponent);

function InnerComponent(
  { ...props }: ComponentPropsWithoutRef<"input">,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { setTextOptions } = usePost();
  const [writingColor, setWritingColor] = useState("#000000");
  const deferredColor = useDeferredValue(writingColor);

  useEffect(() => {
    setTextOptions((prevValue) => ({ ...prevValue, textColor: deferredColor }));
  }, [deferredColor, setTextOptions]);

  return (
    <label>
      <input
        {...props}
        type="color"
        name="post-content-color"
        id="post-content-color"
        ref={ref}
        defaultValue={writingColor}
        aria-label="Change font color"
        onChange={(e) => setWritingColor(e.target.value)}
      />
    </label>
  );
}
