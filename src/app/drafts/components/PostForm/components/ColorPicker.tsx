import React, { useState, useEffect, useDeferredValue, type ComponentPropsWithoutRef } from "react";
import usePostForm from "@/app/drafts/hooks/usePostForm";

export default function ColorPicker({ ...props }: ComponentPropsWithoutRef<"input">) {
  const { setTextOptions, refs } = usePostForm();
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
        className="post-content-form-color-input"
        ref={refs.colorPickerRef}
        defaultValue={writingColor}
        aria-label="Change font color"
        onChange={(e) => setWritingColor(e.target.value)}
      />
    </label>
  );
}
