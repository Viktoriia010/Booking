import banner from "@/assets/banner.jpg";
import ReviewList from "@/components/reviews/ReviewList.tsx";
import benefits from "@/models/benefits.ts";
import woman from "@/assets/photo-woman.avif";
import { useEffect, useState } from "react";
import Modal from "@/components/modal/Modal.tsx";
import Login from "@/pages/Auth/Login.tsx";
import Register from "@/pages/Auth/Register.tsx";
import VerifyCode from "@/pages/Auth/VerifyCode.tsx";
import { useHotels } from "@/hooks/useHotels.ts";
import SearchForm from "@/components/hotels/SearchForm.tsx";
import HotelCard from "@/components/hotels/HotelCard.tsx";
import HotelDetailsModal from "@/components/hotels/HotelDetailsModal.tsx";
import type {
    Hotel,
    SearchData,
} from "@/context/HotelsContext.types.ts";

export default function Home() {
    const {
        hotels,
        loading,
        error,
        loadHotels,
    } = useHotels();

    const [selectedHotel, setSelectedHotel] =
        useState<Hotel | null>(null);

    const [modal, setModal] = useState<
        "login" | "register" | "verify" | null
    >(null);

    const [verificationData, setVerificationData] =
        useState({
            email: "",
            purpose: "Login",
        });

    useEffect(() => {
        void loadHotels();
    }, [loadHotels]);

    const search = async (data: SearchData) => {
        await loadHotels(data);
    };

    const closeModal = () => {
        setModal(null);
    };

    return (
        <>
            <section className="relative h-[220px] w-full font-['Nunito Sans']">
                <img
                    src={banner}
                    alt="Travel"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute bottom-0 left-1/2 z-10 w-full -translate-x-1/2 translate-y-1/2 px-4">
                    <SearchForm onSearch={search} />
                </div>
            </section>

            <section className="mx-auto flex max-w-2xl justify-center px-4 pb-2 pt-15">
                <div className="hidden gap-16 sm:flex">
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
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
                    {loading && (
                        <p className="col-span-full text-center text-sm text-[#717171]">
                            Loading hotels...
                        </p>
                    )}

                    {error && (
                        <p className="col-span-full text-center text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    {!loading &&
                        !error &&
                        hotels.length === 0 && (
                            <p className="col-span-full text-center text-sm text-[#717171]">
                                No hotels found.
                            </p>
                        )}

                    {!loading &&
                        !error &&
                        hotels.length > 0 &&
                        hotels.map((hotel) => (
                            <HotelCard
                                key={hotel.id}
                                hotel={hotel}
                                onChoose={setSelectedHotel}
                            />
                        ))}
                </div>
            </section>

            <HotelDetailsModal
                hotel={selectedHotel}
                onClose={() => setSelectedHotel(null)}
            />

            <section className="mx-auto max-w-6xl px-4 pb-8 font-['Nunito Sans']">
                <h2 className="mb-6 text-center text-[16px] uppercase text-[#717171]">
                    Reviews
                </h2>

                <ReviewList />
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

                    <div className="flex min-h-[171px] flex-1 flex-col justify-center rounded-[13px] border border-[#E5E5E5] bg-white px-6 py-4 text-[15px] leading-6 text-black shadow-[0_3px_12px_rgba(0,0,0,0.06)]">
                        <p>
                            We believe that every customer deserves
                            the best, and we're committed to providing
                            top-class services to all of our clients.
                            When you book with us, you can enjoy not
                            only great deals on your travel
                            arrangements, but also exclusive discounts
                            and special offers. We value your loyalty
                            and want to show our appreciation by giving
                            back.
                        </p>

                        <p className="mt-4">
                            So start your search today and discover the
                            amazing rewards waiting for you on our
                            website!
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-5 flex justify-center px-4 pb-24">
                <img src="/flagr.svg" alt="" />

                <button
                    type="button"
                    className="mx-4 rounded-[30px] bg-[#581ADB] px-10 py-4 text-[14px] font-bold text-white shadow-[0_5px_20px_rgba(93,22,232,0.35)] transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_28px_rgba(93,22,232,0.5)] sm:px-13 sm:py-4.5"
                    onClick={() => setModal("register")}
                >
                    Register an account
                </button>

                <img src="/flag.svg" alt="" />
            </section>

            <Modal
                open={modal !== null}
                closeModal={closeModal}
            >
                {modal === "register" && (
                    <Register
                        onRegister={(email) => {
                            setVerificationData({
                                email,
                                purpose: "Registration",
                            });

                            setModal("verify");
                        }}
                        onLogin={() => {
                            setModal("login");
                        }}
                    />
                )}

                {modal === "login" && (
                    <Login
                        onRegister={() => {
                            setModal("register");
                        }}
                        onVerify={(email) => {
                            setVerificationData({
                                email,
                                purpose: "Login",
                            });

                            setModal("verify");
                        }}
                    />
                )}

                {modal === "verify" && (
                    <VerifyCode
                        email={verificationData.email}
                        purpose={verificationData.purpose}
                        onSuccess={closeModal}
                    />
                )}
            </Modal>
        </>
    );
}