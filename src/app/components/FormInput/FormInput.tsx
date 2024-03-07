import React, { type ComponentPropsWithoutRef } from "react";

type FormInputProps = {
  label: string;
  id: string;
  className?: string;
} & ComponentPropsWithoutRef<"input">;

export default function FormInput({ label, id, className, ...props }: FormInputProps) {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input
        name={id}
        id={id}
        {...props}
      />
    </div>
  );
}
