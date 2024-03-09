import React, { type ComponentProps } from "react";
import { FormInput } from "@/app/components/FormInput/FormInput";

type PostFormInputProps = ComponentProps<typeof FormInput> & {
  error?: string;
};

export const PostFormInput = React.forwardRef<HTMLInputElement, PostFormInputProps>(
  (props, ref) => {
    const { label, id, type, defaultValue, error, ...rest } = props;

    return (
      <FormInput
        {...rest}
        label={label}
        id={`post-${id}`}
        type={type}
        minLength={1}
        maxLength={100}
        defaultValue={defaultValue}
        aria-errormessage={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        ref={ref}
      >
        {error && (
          <strong
            id={`${id}-error`}
            className="form-input-error"
            aria-live="polite"
          >
            {error}
          </strong>
        )}
      </FormInput>
    );
  }
);

PostFormInput.displayName = `PostFormInput}`;
