import banner from "@/assets/banner.jpg";
import HotelList from "@/components/hotel/HotelList.tsx";
import ReviewList from "@/components/reviews/ReviewList.tsx";
import benefits from "@/models/benefits.ts";
import woman from "@/assets/photo-woman.avif";
// import {RegisterPage} from "@/pages/Auth/RegisterPage.tsx";
// import {LoginPage} from "@/pages/Auth/LoginPage.tsx";
import {useState} from "react";
import Modal from "@/components/modal/Modal.tsx";
import Login from "@/pages/Auth/Login.tsx";
import Register from "@/pages/Auth/Register.tsx";
import VerifyCode from "@/pages/Auth/VerifyCode.tsx";

//зробити вибір дат по календарю

export default function Home() {
    const [modal, setModal] = useState<"login" | "register" | "verify" | null>(null);
    const [verificationData, setVerificationData] = useState({
        email: "",
        verificationCode: "",
    });
    console.log("CURRENT MODAL:", modal);
    console.log("VERIFICATION DATA:", verificationData);
    const closeModal = () => setModal(null);

    return (
        <>
            <section className="relative h-[220px] w-full font-['Nunito Sans']">
                {/* Background */}
                <img
                    src={banner}
                    alt="Travel"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Desktop Search */}
                <div className="absolute bottom-0 left-1/2 z-10 hidden w-full max-w-5xl -translate-x-1/2 translate-y-1/2 px-4 sm:block">
                    <div className="flex h-14 w-full rounded-[60px] bg-white p-2 shadow-md">

                        <div className="flex flex-1 items-center justify-center gap-3 border-r-2 border-gray-200 p-2">
                            <img src="/plane.svg" alt="" className="h-5 w-5" />
                            <input type="text" placeholder="Where are you going?" className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-black" >

                            </input>
                        </div>

                        <button type="button" className="flex flex-1 items-center justify-center gap-3 border-r-2 border-gray-200 p-2 cursor-pointer">
                            <img src="/calendar.svg" alt="" className="h-5 w-5" />
                            <p className="text-[14px] text-black">
                                Check in - Check out
                            </p>
                        </button>

                        <button type="button" className="flex flex-1 items-center justify-center gap-3 cursor-pointer">
                            <img src="/peoples.svg" alt="" className="h-5 w-5" />
                            <p className="text-[14px] text-black">
                                Guests
                            </p>
                            <img src="/arrows.svg" alt="" className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            aria-label="Search"
                            className="cursor-pointer"
                        >
                            <img src="/search.svg" alt="" className="h-10 w-10" />
                        </button>

                    </div>
                </div>

                {/* Mobile Search */}
                <div className="absolute bottom-0 left-1/2 z-10 w-full -translate-x-1/2 translate-y-1/2 px-4 sm:hidden">
                    <div className="flex h-14 w-full items-center gap-3 rounded-[60px] bg-white pl-5 pr-2 shadow-xl">
                        <div className="flex h-14 w-full items-center  gap-3 ">
                            <img
                                src="/plane.svg"
                                alt=""
                                className="h-5 w-5"
                            />

                            <p className="text-[14px] text-black">
                                Where are you going?
                            </p>
                        </div>

                        <img
                            src="/setting4.svg"
                            alt=""
className="w-10 h-10 cursor-pointer"
                        />
                    </div>

                </div>
            </section>
            <section className="mx-auto flex max-w-2xl justify-center  px-4 pt-15 pb-2">
                <div className="hidden sm:flex gap-16">
                    <img src="/bag.svg" alt="" />
                    <img src="/payment.svg" alt="" />
                    <img src="/information.svg" alt="" />
                </div>

                <img
                    src="/advent.svg"
                    alt=""
                    className="block sm:hidden"
                />
            </section>
            <section className="mx-auto max-w-6xl px-4 py-12">
                    <HotelList/>
            </section>
            <section className="mx-auto max-w-6xl px-4 pb-8 font-['Nunito Sans']">
                <h2 className="mb-6 text-center text-[16px] uppercase text-[#717171]">
                    Reviews
                </h2>

                    <ReviewList/>
            </section>
            <section className="mx-auto max-w-6xl px-4 py-8">
                <h2 className="mb-6 text-center text-[16px] uppercase text-[#717171]">
                    Safe with us
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.text}
                            className="flex h-[208px] flex-col items-center justify-center rounded-[13px] border border-[#DDDDDD] px-4 text-center last:col-span-2 sm:last:col-span-1"
                        >
                            <img
                                src={benefit.icon}
                                alt=""
                                className="mb-4 h-[24.38px] w-24"
                            />

                            <p className="text-[16px] leading-6 text-[#717171]">
                                {benefit.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-8 font-['Nunito Sans']">
                <h2 className="mb-6 text-center text-[16px] uppercase text-[#717171]">
                    Be our regular
                </h2>

                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <img
                        src={woman}
                        alt="Travel"
                        className="h-[171px] min-w-[272px] w-full rounded-[13px] object-cover md:w-[25%]"
                    />

                    <div className="flex min-h-[171px] flex-1 text-[15px] leading-6 text-black flex-col justify-center rounded-[13px] border border-[#E5E5E5] bg-white px-6 py-4 shadow-[0_3px_12px_rgba(0,0,0,0.06)]">
                        <p>
                            We believe that every customer deserves the best,
                            and we&apos;re committed to providing top-class
                            services to all of our clients. When you book with
                            us, you can enjoy not only great deals on your
                            travel arrangements, but also exclusive discounts
                            and special offers. We value your loyalty and want
                            to show our appreciation by giving back.
                        </p>

                        <p className="mt-4">
                            So start your search today and discover the amazing
                            rewards waiting for you on our website!
                        </p>
                    </div>
                </div>
            </section>

            <section className="flex justify-center px-4 pb-24 mt-5 ">
                <img
                src="/flagr.svg"
                />
                <button
                    type="button"
                    className="rounded-[30px] bg-[#581ADB] sm:px-13 px-10 py-4 sm:py-4.5 mx-4 text-[14px] cursor-pointer font-bold text-white
                    shadow-[0_5px_20px_rgba(93,22,232,0.35)]
                    transition-all
                    duration-200
                    hover:scale-105
                    hover:shadow-[0_8px_28px_rgba(93,22,232,0.5)]"
                    onClick={() => setModal("register")}
                >
                    Register an account
                </button>
                <img
                    src="/flag.svg"
                />
            </section>
            <Modal
                open={modal !== null}
                closeModal={closeModal}
            >
                {modal === "register" && (
                    <Register
                        onRegister={(email, verificationCode) => {
                            setVerificationData({
                                email,
                                verificationCode,
                            });

                            setModal("verify");
                        }
                        }
                        onLogin={() => setModal("login")}
                    />
                )}

                {modal === "login" && (
                    <Login
                        onRegister={() => setModal("register")}
                        onSuccess={closeModal}
                    />
                )}

                {modal === "verify" && (
                    <VerifyCode
                        email={verificationData.email}
                        verificationCode={verificationData.verificationCode}
                        onClose={() => setModal(null)}
                    />
                )}
            </Modal>
            </>
    );
}
