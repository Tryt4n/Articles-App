"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";

type SaveBtnProps = { alreadySaved: boolean } & ComponentPropsWithoutRef<"button">;

export default function SaveBtn({ alreadySaved, ...props }: SaveBtnProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      {...props}
    >
      <span className="visually-hidden">{`${alreadySaved ? "Unsav" : "Sav"}${
        pending ? "ing" : "e"
      } Post`}</span>

      {alreadySaved ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Layer_1"
          x="0"
          y="0"
          viewBox="0 0 29 29"
        >
          <path d="m14.854 6.083-.354.353-.354-.354a6.5 6.5 0 0 0-9.192 9.192l.354.354L14.5 24.82l9.192-9.192.354-.354a6.5 6.5 0 0 0-9.192-9.191z" />
          <path d="m14.854 6.083-.354.353-.354-.354a6.5 6.5 0 0 0-9.192 9.192l.354.354L14.5 24.82l9.192-9.192.354-.354a6.5 6.5 0 0 0-9.192-9.191z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          width="512px"
          height="512px"
          viewBox="0 0 512 512"
        >
          <path d="M349.6 64c-36.4 0-70.718 16.742-93.6 43.947C233.117 80.742 198.8 64 162.4 64 97.918 64 48 114.221 48 179.095c0 79.516 70.718 143.348 177.836 241.694L256 448l30.164-27.211C393.281 322.442 464 258.61 464 179.095 464 114.221 414.082 64 349.6 64zm-80.764 329.257l-4.219 3.873-8.617 7.773-8.616-7.772-4.214-3.869c-50.418-46.282-93.961-86.254-122.746-121.994C92.467 236.555 80 208.128 80 179.095c0-22.865 8.422-43.931 23.715-59.316C118.957 104.445 139.798 96 162.4 96c26.134 0 51.97 12.167 69.11 32.545L256 157.661l24.489-29.116C297.63 108.167 323.465 96 349.6 96c22.603 0 43.443 8.445 58.686 23.778C423.578 135.164 432 156.229 432 179.095c0 29.033-12.467 57.459-40.422 92.171-28.784 35.74-72.325 75.709-122.742 121.991z" />
        </svg>
      )}
    </button>
  );
}
