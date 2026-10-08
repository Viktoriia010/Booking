// import { useNavigate } from "react-router-dom";
//
// type AllDoneProps = {
//     onClose: () => void;
// };
//
// const AllDone = ({ onClose }: AllDoneProps) => {
//     const navigate = useNavigate();
//
//     return (
//         <div className="relative w-full max-w-[500px] rounded-[20px] bg-white px-11 py-6">
//                 <h2 className="text-center text-[23px] font-bold text-[#581ADB]">
//                     All done!
//                 </h2>
//
//
//
//             {/* Check icon */}
//             <div className="mt-12 flex justify-center">
//                 <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full border-[4px] border-[#581ADB]">
//                     <svg
//                         width="58"
//                         height="58"
//                         viewBox="0 0 58 58"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             d="M13 29L24 40L47 17"
//                             stroke="#5B21E6"
//                             strokeWidth="4"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                     </svg>
//                 </div>
//             </div>
//
//             {/* Buttons */}
//             <div className="mt-[62px] space-y-5">
//                 <button
//                     type="button"
//                     onClick={() =>
//                     {onClose();
//                         navigate("/account");}
//                 }
//                     className="h-[53px] w-full cursor-pointer rounded-full bg-[#581ADB] text-[16px] font-semibold text-white transition hover:bg-[#4C18CC]"
//                 >
//                     Check your profile!
//                 </button>
//
//                 <button
//                     type="button"
//                     onClick={() => {
//                         onClose();
//                         navigate("/");
//                     }}
//                     className="h-[53px] w-full cursor-pointer rounded-full border border-[#581ADB] bg-white text-[16px] font-semibold text-[#581ADB] transition hover:bg-[#581ADB] hover:text-white"
//                 >
//                     Continue booking
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default AllDone;



import Modal from "../../components/modal/Modal";
import {useNavigate} from "react-router-dom";

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