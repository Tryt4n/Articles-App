import usePostForm from "@/app/drafts/(pages)/hooks/usePostForm";
import React, { useState, useEffect, useDeferredValue, type ComponentPropsWithoutRef } from "react";

export default function FontSizeInput({ ...props }: ComponentPropsWithoutRef<"input">) {
  const { setTextOptions, refs } = usePostForm();
  const [fontSize, setFontSize] = useState("16px");
  const deferredFontSize = useDeferredValue(fontSize);

  useEffect(() => {
    setTextOptions((prevValue) => ({ ...prevValue, textSize: deferredFontSize }));
  }, [deferredFontSize, setTextOptions]);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const pattern =
      /^\d+(p|px|e|em|r|re|rem|c|ch|l|lh|r|rl|rlh|v|vw|vh|s|sv|svw|svh|l|lv|lvw|lvh|d|dv|dvw|dvh)?$/;
    if (pattern.test(value)) {
      setFontSize(value);
    } else {
      e.target.value = value.slice(0, -1);
    }
  };

  return (
    <label>
      <input
        {...props}
        type="text"
        name="post-content-font-size"
        id="post-content-font-size"
        className="post-content-form-font-size-input"
        ref={refs.fontSizeInputRef}
        defaultValue={fontSize}
        aria-label="Change font size"
        placeholder="16px"
        minLength={2}
        maxLength={5}
        pattern="\d+(px|em|rem|ch|lh|rlh|vw|vmin|vmax|svw|svh|lvw|lvh|dvw|dvh)"
        onChange={handleFontSizeChange}
      />
    </label>
  );
}
