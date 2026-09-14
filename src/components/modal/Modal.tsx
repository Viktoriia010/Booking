import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import "./Modal.css";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Modal = ({ open, onClose, children }: ModalProps) => {
    const modal = document.getElementById("modal");

    if (!open || !modal) return null;

    return createPortal(
        <div className="background" onClick={onClose}>
            <div className="modal" onClick={event => event.stopPropagation()}>
                <button type="button" className="modal__close" onClick={onClose}>×</button>
                {children}
            </div>
        </div>,
        modal
    );
};

export default Modal;