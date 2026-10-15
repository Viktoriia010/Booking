import { createPortal } from "react-dom";
import type { ReactNode } from "react";

const modalNode = document.getElementById("modal") as HTMLElement;

type ModalProps = {
    open: boolean;
    closeModal: () => void;
    children: ReactNode;
};

const renderContent = (props: ModalProps) => {
    return createPortal(
        <div>
            <div
                className="fixed inset-0 z-[999] bg-black/50"
                onClick={props.closeModal}
            />

            <div
                className="
                       fixed
                    left-1/2
                    top-1/2
                    z-[1000]
                    w-[90%]
                    max-w-md
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-xl
                    bg-white
                    shadow-xl
                "
            >
                <button
                    className="absolute right-[15px] top-[15px] border-0 text-base m-1.5"
                    onClick={props.closeModal}
                >
                    <img
                        src="/close.svg"
                        alt=""
                        className="cursor-pointer w-4 h-4"
                    />
                </button>

                {props.children}
            </div>
        </div>,
        modalNode
    );
};

const Modal = (props: ModalProps) => {
    return props.open ? renderContent(props) : null;
};

export default Modal;


// import { createPortal } from "react-dom";
// import type { ReactNode } from "react";
// import "./Modal.css";
//
// type ModalProps = {
//     open: boolean;
//     onClose: () => void;
//     children: ReactNode;
// };
//
// const Modal = ({ open, onClose, children }: ModalProps) => {
//     const modal = document.getElementById("modal");
//
//     if (!open || !modal) return null;
//
//     return createPortal(
//         <div className="background" onClick={onClose}>
//             <div className="modal" onClick={event => event.stopPropagation()}>
//                 <button type="button" className="modal__close" onClick={onClose}>×</button>
//                 {children}
//             </div>
//         </div>,
//         modal
//     );
// };
//
// export default Modal;