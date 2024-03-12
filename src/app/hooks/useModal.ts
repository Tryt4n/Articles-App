import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export default function useModal() {
  const modal = useContext(ModalContext);

  if (!modal) {
    throw new Error("useModal must be used within a ModalContextProvider");
  }

  return modal;
}
