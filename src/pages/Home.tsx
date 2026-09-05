import banner from "@/assets/banner.jpg";

export default function Home() {
    return (
        <>
            <section className="relative h-[220px] w-full">
                {/* Background */}
                <img
                    src={banner}
                    alt="Travel"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Desktop Search */}
                <div className="absolute bottom-0 left-1/2 z-10 hidden w-full max-w-5xl -translate-x-1/2 translate-y-1/2 px-4 sm:block">
                    <div className="flex h-14 w-full rounded-[60px] bg-white p-2 shadow-xl">

                        <div className="flex flex-1 items-center justify-center gap-3 border-r-2 border-gray-200 p-2">
                            <img src="/plane.svg" alt="" className="h-5 w-5" />
                            <p className="text-[14px] text-black">
                                Where are you going?
                            </p>
                        </div>

                        <div className="flex flex-1 items-center justify-center gap-3 border-r-2 border-gray-200 p-2">
                            <img src="/calendar.svg" alt="" className="h-5 w-5" />
                            <p className="text-[14px] text-black">
                                Check in - Check out
                            </p>
                        </div>

                        <div className="flex flex-1 items-center justify-center gap-3">
                            <img src="/peoples.svg" alt="" className="h-5 w-5" />
                            <p className="text-[14px] text-black">
                                Guests
                            </p>
                            <img src="/arrows.svg" alt="" className="h-4 w-4" />
                        </div>

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
        </>
    );
}
