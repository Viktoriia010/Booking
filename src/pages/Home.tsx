import banner from "@/assets/banner.jpg";
import HotelList from "@/components/hotel/HotelList.tsx";
import ReviewList from "@/components/reviews/ReviewList.tsx";

//зробити вибір дат по календарю

export default function Home() {
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
            <section className="mx-auto max-w-6xl pb-8 font-['Nunito Sans']">
                <h2 className="mb-4 text-center text-[16px] uppercase text-[#717171]">
                    Reviews
                </h2>

                    <ReviewList/>
            </section>
            </>
    );
}
