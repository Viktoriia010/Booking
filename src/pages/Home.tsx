import banner from "@/assets/banner.jpg";
import HotelList from "@/components/hotel/HotelList.tsx";
import benefits from "@/models/benefits.ts";
import woman from "@/assets/photo-woman.avif";
import { useEffect, useState } from "react";

import SearchForm from "@/components/hotel/SearchForm.tsx";
import type { SearchData } from "@/context/HotelsContext.types.ts";

import {useHotels} from "@/hooks/useHotels.ts";
import {apiFetch} from "@/api.ts";
import Review from "@/components/reviews/Review.tsx";
import type { Review as ReviewType } from "@/context/HotelsContext.types";
import {useNavigate} from "react-router-dom";
import {authModalStore} from "@/store/authModalStore.ts";


export default function Home() {
    const openRegisterModal = authModalStore(
        (state) => state.openRegisterModal
    );


    const {
        hotels,
        loading,
        error,
        loadRandomHotels,
        loadHotels,
        loadFilters
    } = useHotels();
    const [reviews, setReviews] = useState<ReviewType[]>([]);

    useEffect(() => {
        apiFetch("/Review/best")
            .then(res => res.json())
            .then(setReviews);
    }, []);

    useEffect(() => {
        void loadRandomHotels();
    }, []);

    const navigate = useNavigate();

    const search = async (data: SearchData) => {
        navigate("/search");

        void loadHotels(data);
        void loadFilters(data);
    };

    console.log("HOTELS:", hotels);
    console.log("loading:", loading);
    console.log("error:", error);
    console.log("hotels.length:", hotels.length);
    console.log(
        "CAN RENDER:",
        !loading && !error && hotels.length > 0
    );



    return (
        <>
            <section className="relative h-[220px] w-full font-['Nunito Sans']">
                {/* Background */}
                <img
                    src={banner}
                    alt="Travel"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute bottom-0 left-1/2 z-10 w-full -translate-x-1/2 translate-y-1/2 px-4">
                    <SearchForm onSearch={search} />
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
                {loading && (
                    <p className="text-center text-sm text-[#717171]">
                        Loading hotels...
                    </p>
                )}

                {error && (
                    <p className="text-center text-sm text-red-500">
                        {error}
                    </p>
                )}

                {!loading && !error && hotels.length === 0 && (
                    <p className="text-center text-sm text-[#717171]">
                        No hotels found.
                    </p>
                )}

                {!loading && !error && hotels.length > 0 && (
                    <div className="overflow-x-auto scrollbar-hide">
                    <HotelList hotels={hotels} />
                        </div>
                )}
            </section>


            <section className="mx-auto max-w-6xl px-4 pb-8 font-['Nunito Sans']">
                <h2 className="mb-6 text-center text-[16px] uppercase text-[#717171]">
                    Reviews
                </h2>
                <div className="flex flex-row gap-9 overflow-x-auto scrollbar-hide">
                    {reviews.map(review => (
                        <Review
                            key={review.id}
                            review={review}
                        />
                    ))}
                </div>
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
                    onClick={openRegisterModal}
                >
                    Register an account
                </button>

                <img src="/flag.svg" alt="" />
            </section>

        </>
    );
}

