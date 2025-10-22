import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialogRef.current;
    if (modal) {
      modal.showModal();
    }

    // Cleanup function: close modal when component unmounts to prevent errors
    return () => {
      if (modal && modal.open) {
        modal.close();
      }
    };
  }, []);

  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;

  // Render the modal inside the #modal root using React Portal
  return createPortal(
    <dialog className="modal" ref={dialogRef} onClose={onClose}>
      {children}
    </dialog>,
    modalRoot
  );
}
