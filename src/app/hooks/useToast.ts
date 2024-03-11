import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

export default function useToast() {
  const toast = useContext(ToastContext);

  if (!toast) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }

  return toast;
}
