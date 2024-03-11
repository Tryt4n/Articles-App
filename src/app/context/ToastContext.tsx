"use client";

import React, { createContext, useEffect, useState } from "react";
import Toast from "../components/Toast/Toast";

type ToastContextType = {
  toastMessage: string;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export function ToastContextProvider({ children }: { children: React.ReactNode }) {
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (toastMessage !== "") {
      const timeout = setTimeout(() => {
        setToastMessage("");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [toastMessage]);

  return (
    <ToastContext.Provider value={{ toastMessage, setToastMessage }}>
      {toastMessage !== "" && <Toast>{toastMessage}</Toast>}

      {children}
    </ToastContext.Provider>
  );
}
