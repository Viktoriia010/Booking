import { create } from "zustand";

type AuthModalType =
    | "login"
    | "register"
    | "verify"
    | "info"
    | "all-done"
    | null;

type AuthModalStore = {
    modal: AuthModalType;
    verificationData: {
        email: string;
        purpose: string;
    };

    openLoginModal: () => void;
    openRegisterModal: () => void;
    openVerifyModal: (email: string, purpose: string) => void;
    openInfoModal: () => void;
    openAllDoneModal: () => void;
    closeModal: () => void;
};

export const authModalStore = create<AuthModalStore>((set) => ({
    modal: null,

    verificationData: {
        email: "",
        purpose: "",
    },

    openLoginModal: () => {
        set({ modal: "login" });
    },

    openRegisterModal: () => {
        set({ modal: "register" });
    },

    openVerifyModal: (email, purpose) => {
        set({
            modal: "verify",
            verificationData: {
                email,
                purpose,
            },
        });
    },

    openInfoModal: () => {
        set({ modal: "info" });
    },

    openAllDoneModal: () => {
        set({ modal: "all-done" });
    },

    closeModal: () => {
        set({ modal: null });
    },
}));