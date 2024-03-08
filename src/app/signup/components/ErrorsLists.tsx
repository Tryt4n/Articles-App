import React from "react";
import type { ErrorKeys } from "@/app/actions/types";

export default function ErrorsLists({ errors }: { errors: Record<ErrorKeys, string[]> }) {
  return (
    <div
      className="form-errors-list"
      role="alert"
      aria-live="polite"
    >
      {Object.entries(errors).map(([field, fieldErrors]) => {
        if (fieldErrors.length > 0) {
          return (
            <ul
              key={field}
              id={`${field}-error`}
            >
              {fieldErrors.map((error, index) => (
                <li key={`${field}-${index}`}>
                  <strong>{error}</strong>
                </li>
              ))}
            </ul>
          );
        }
      })}
    </div>
  );
}
