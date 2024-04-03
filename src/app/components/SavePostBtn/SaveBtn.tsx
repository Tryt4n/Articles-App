"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";
import HeartIcon from "@/app/Icons/HeartIcon";
import HeartFilledIcon from "@/app/Icons/HeartFilledIcon";

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

      {alreadySaved ? <HeartFilledIcon /> : <HeartIcon />}
    </button>
  );
}
