import React, { type ComponentProps } from "react";

type FormInputProps = {
  label: string;
  id: string;
  className?: string;
  children?: React.ReactNode;
} & ComponentProps<"input">;

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { label, id, className, children, ...inputProps } = props;

  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        name={id}
        id={id}
        ref={ref}
      />

      {children}
    </div>
  );
});

FormInput.displayName = "FormInput with forwarded ref";
