import { useNavigate } from "react-router-dom";

import Modal from "../../components/modal/Modal";

const AllDone = () => {
    const navigate =
        useNavigate();

    return (
        <Modal
            open={true}
            closeModal={() =>
                navigate("/")
            }
        >
            <div className="w-full px-8 pb-8 pt-3 text-center font-['Nunito_Sans']">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F0E8FF]">
                    <span className="text-3xl font-extrabold text-[#581ADB]">
                        ✓
                    </span>
                </div>

                <h2 className="mt-5 text-[25px] font-extrabold text-[#581ADB]">
                    All done!
                </h2>

                <p className="mt-2 text-sm text-[#777]">
                    Your information has been saved successfully.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/account"
                        )
                    }
                    className="mt-7 h-12 w-full rounded-full bg-[#581ADB] text-sm font-extrabold text-white"
                >
                    Check your profile!
                </button>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/")
                    }
                    className="mt-3 h-12 w-full rounded-full border border-[#581ADB] text-sm font-bold text-[#581ADB]"
                >
                    Continue booking
                </button>
            </div>
        </Modal>
    );
};

export default AllDone;