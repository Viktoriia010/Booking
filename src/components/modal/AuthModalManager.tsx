import Modal from "@/components/modal/Modal.tsx";

import Login from "@/pages/Auth/Login.tsx";
import Register from "@/pages/Auth/Register.tsx";
import VerifyCode from "@/pages/Auth/VerifyCode.tsx";
import Information from "@/pages/Auth/Information.tsx";
import AllDone from "@/pages/Auth/AllDone.tsx";

import { authModalStore } from "@/store/authModalStore.ts";

export default function AuthModalManager() {
    const modal = authModalStore((state) => state.modal);

    const verificationData = authModalStore(
        (state) => state.verificationData
    );

    const openLoginModal = authModalStore(
        (state) => state.openLoginModal
    );

    const openRegisterModal = authModalStore(
        (state) => state.openRegisterModal
    );

    const openVerifyModal = authModalStore(
        (state) => state.openVerifyModal
    );

    const openInfoModal = authModalStore(
        (state) => state.openInfoModal
    );

    const openAllDoneModal = authModalStore(
        (state) => state.openAllDoneModal
    );

    const closeModal = authModalStore(
        (state) => state.closeModal
    );

    return (
        <Modal
            open={modal !== null}
            closeModal={closeModal}
        >
            {modal === "register" && (
                <Register
                    onRegister={(email) => {
                        openVerifyModal(email, "Registration");
                    }}
                    onLogin={openLoginModal}
                />
            )}

            {modal === "login" && (
                <Login
                    onRegister={openRegisterModal}
                    onVerify={(email) => {
                        openVerifyModal(email, "Login");
                    }}
                />
            )}

            {modal === "verify" && (
                <VerifyCode
                    email={verificationData.email}
                    purpose={verificationData.purpose}
                    onSuccess={() => {
                        if (verificationData.purpose === "Registration") {
                            openInfoModal();
                        } else {
                            closeModal();
                        }
                    }}
                />
            )}

            {modal === "info" && (
                <Information
                    onSuccess={() => {
                        openAllDoneModal();
                    }}
                />
            )}

            {modal === "all-done" && (
                <AllDone onClose={closeModal} />
            )}
        </Modal>
    );
}