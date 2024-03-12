"use client";

import React, { createContext, useRef } from "react";
import { startViewTransition } from "../helpers/helpers";

type ModalContextType = {
  showModal: () => void;
  closeModal: () => void;
  readonly modalRef: React.RefObject<HTMLDialogElement>;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  function showModal() {
    if (!modalRef) return;

    startViewTransition(() => {
      modalRef.current?.showModal();
    });
  }

  function closeModal() {
    if (!modalRef) return;

    startViewTransition(() => {
      modalRef.current?.close();
    });
  }

  return (
    <ModalContext.Provider value={{ showModal, closeModal, modalRef }}>
      {children}
    </ModalContext.Provider>
  );
}
