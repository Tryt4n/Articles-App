"use client";

import React from "react";
import useToast from "@/app/hooks/useToast";
import "./style.css";

export default function Toast({ children }: { children: React.ReactNode }) {
  const { setToastMessage } = useToast();

  return (
    <div className="toast-notification">
      <span className="toast-notification-text">{children}</span>
      <button
        className="toast-notification-btn"
        aria-label="Close notification"
        autoFocus
        onClick={() => setToastMessage("")}
      >
        X
      </button>
    </div>
  );
}
