"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import useModal from "@/app/hooks/useModal";
import CloseIcon from "@/app/Icons/CloseIcon";
import "./style.css";

type ModalProps = {
  children: React.ReactNode;
} & ComponentPropsWithoutRef<"dialog">;

export default function Modal({ children, ...props }: ModalProps) {
  const { modalRef, closeModal } = useModal();

  function closeModalOnBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.currentTarget !== e.target) return; // If the click did not occur on the backdrop, return

    const dialogDimensions = (e.target as HTMLDialogElement).getBoundingClientRect(); // Get the dimensions of the dialog

    // If the click occurred outside the dialog area, close the modal
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  }

  return (
    <dialog
      {...props}
      className="modal"
      ref={modalRef}
      onClick={closeModalOnBackdropClick}
    >
      <div className="modal-close-btn-wrapper">
        <button
          type="button"
          onClick={closeModal}
        >
          <span className="visually-hidden">Close</span>
          <CloseIcon />
        </button>
      </div>

      <div className="modal-content-container">{children}</div>
    </dialog>
  );
}
