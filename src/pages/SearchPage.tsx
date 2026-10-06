import {useHotels} from "@/hooks/useHotels.ts";
import type { SearchData} from "@/context/HotelsContext.types.ts";
import banner from "@/assets/search-banner.jpg";
import SearchForm from "@/components/hotels/SearchForm.tsx";
import HotelList from "@/components/hotel/HotelList.tsx";
import HotelFiltersSidebar from "@/components/hotel/HotelFiltersSidebar.tsx";


const SearchPage = ()=>{

    const {
        hotels,
        loading,
        error,
        searchData,
        loadHotels,
        loadFilters,
        filters,
        page,
        pageSize,
        total,
    } = useHotels();


    const totalPages = Math.ceil(total / pageSize);

    const search = async (data: SearchData) => {
        const nextData: SearchData = {
            ...data,
            page: 1,
        };

        await Promise.all([
            loadHotels(nextData),
            loadFilters(nextData),
        ]);
    };

    const handlePageChange = async (newPage: number) => {
        if (!searchData) return;

        if (newPage < 1 || newPage > totalPages) {
            return;
        }

        await loadHotels({
            ...searchData,
            page: newPage,
            pageSize,
        });
    };

    const getPageNumbers = (): (number | string)[] => {
        if (totalPages <= 5) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1
            );
        }

        if (page <= 3) {
            return [1, 2, 3, 4, "...", totalPages];
        }

        if (page >= totalPages - 2) {
            return [
                1,
                "...",
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        return [
            1,
            "...",
            page - 1,
            page,
            page + 1,
            "...",
            totalPages,
        ];
    };

    const pageNumbers = getPageNumbers();


    return (
        <>
            <section className="relative h-[220px] w-full font-['Nunito Sans']">
                {/* Background */}
                <img
                    src={banner}
                    alt="Travel"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/*/!* Desktop Search *!/*/}
                {/*<div className="absolute bottom-0 left-1/2 z-10 hidden w-full max-w-5xl -translate-x-1/2 translate-y-1/2 px-4 sm:block">*/}
                {/*    <div className="flex h-14 w-full rounded-[60px] bg-white p-2 shadow-md">*/}

                {/*        <div className="flex flex-1 items-center justify-center gap-3 border-r-2 border-gray-200 p-2">*/}
                {/*            <img src="/plane.svg" alt="" className="h-5 w-5" />*/}
                {/*            <input type="text" placeholder="Where are you going?" className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-black" >*/}

                {/*            </input>*/}
                {/*        </div>*/}

                {/*        <button type="button" className="flex flex-1 items-center justify-center gap-3 border-r-2 border-gray-200 p-2 cursor-pointer">*/}
                {/*            <img src="/calendar.svg" alt="" className="h-5 w-5" />*/}
                {/*            <p className="text-[14px] text-black">*/}
                {/*                Check in - Check out*/}
                {/*            </p>*/}
                {/*        </button>*/}

                {/*        <button type="button" className="flex flex-1 items-center justify-center gap-3 cursor-pointer">*/}
                {/*            <img src="/peoples.svg" alt="" className="h-5 w-5" />*/}
                {/*            <p className="text-[14px] text-black">*/}
                {/*                Guests*/}
                {/*            </p>*/}
                {/*            <img src="/arrows.svg" alt="" className="h-4 w-4" />*/}
                {/*        </button>*/}

                {/*        <button*/}
                {/*            type="button"*/}
                {/*            aria-label="Search"*/}
                {/*            className="cursor-pointer"*/}
                {/*        >*/}
                {/*            <img src="/search.svg" alt="" className="h-10 w-10" />*/}
                {/*        </button>*/}

                {/*    </div>*/}
                {/*</div>*/}

                {/*/!* Mobile Search *!/*/}
                {/*<div className="absolute bottom-0 left-1/2 z-10 w-full -translate-x-1/2 translate-y-1/2 px-4 sm:hidden">*/}
                {/*    <div className="flex h-14 w-full items-center gap-3 rounded-[60px] bg-white pl-5 pr-2 shadow-xl">*/}
                {/*        <div className="flex h-14 w-full items-center  gap-3 ">*/}
                {/*            <img*/}
                {/*                src="/plane.svg"*/}
                {/*                alt=""*/}
                {/*                className="h-5 w-5"*/}
                {/*            />*/}

                {/*            <p className="text-[14px] text-black">*/}
                {/*                Where are you going?*/}
                {/*            </p>*/}
                {/*        </div>*/}

                {/*        <img*/}
                {/*            src="/setting4.svg"*/}
                {/*            alt=""*/}
                {/*            className="h-10 w-10 cursor-pointer"*/}
                {/*        />*/}
                {/*    </div>*/}

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

            <section className="mx-auto max-w-[1150px] px-4 py-12">
                {loading && (
                    <p className="text-center text-sm text-[#717171]">
                        Loading hotels...
                    </p>
                )}
                {/*<div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">*/}
                {/*    {loading && (*/}
                {/*        <p className="col-span-full text-center text-sm text-[#717171]">*/}
                {/*            Loading hotels...*/}
                {/*        </p>*/}
                {/*    )}*/}

                {error && (
                    <p className="text-center text-sm text-red-500">
                        {error}
                    </p>
                )}
                {/*{error && (*/}
                {/*    <p className="col-span-full text-center text-sm text-red-500">*/}
                {/*        {error}*/}
                {/*    </p>*/}
                {/*)}*/}

                {!loading && !error && hotels.length === 0 && (
                    <p className="text-center text-sm text-[#717171]">
                        No hotels found.
                    </p>
                )}
                {/*{!loading &&*/}
                {/*    !error &&*/}
                {/*    hotels.length === 0 && (*/}
                {/*        <p className="col-span-full text-center text-sm text-[#717171]">*/}
                {/*            No hotels found.*/}
                {/*        </p>*/}
                {/*    )}*/}

                {/*{!loading && !error && hotels.length > 0 && (*/}
                {/*    <div className="overflow-x-auto scrollbar-hide">*/}
                {/*        <HotelList hotels={hotels} />*/}
                {/*    </div>*/}
                {/*)}*/}
                    <div className="flex items-start gap-5">
                        {/* Sidebar */}
                        <aside className="hidden w-[170px] shrink-0 lg:block">
                            <HotelFiltersSidebar
                                filters={filters}
                                searchData={searchData}
                                onApply={(nextFilters) => {
                                    if (!searchData) {
                                        return;
                                    }

                                    void loadHotels({
                                        ...searchData,
                                        ...nextFilters,
                                        page: 1,
                                    });
                                }}
                            />
                        </aside>

                        {/*/!* Hotels *!/*/}
                        {/*<div className="min-w-0 flex-1">*/}
                        {/*    <HotelList hotels={hotels} />*/}
                        {/*</div>*/}
                        {!loading && !error && hotels.length > 0 && (
                            <div className="overflow-x-auto scrollbar-hide">
                                <HotelList hotels={hotels} />
                            </div>
                        )}
                    </div>

                {/*    {!loading &&*/}
                {/*        !error &&*/}
                {/*        hotels.map(hotel => (*/}
                {/*            <HotelCard*/}
                {/*                key={hotel.id}*/}
                {/*                hotel={hotel}*/}
                {/*                onChoose={setSelectedHotel}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*</div>*/}
                {!loading && !error && totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-1.5">
                        {/* Previous */}
                        <button
                            type="button"
                            disabled={page === 1}
                            onClick={() => void handlePageChange(page - 1)}
                            aria-label="Previous page"
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
                text-[#8F8F8F] transition-all duration-200
                hover:bg-[#F1ECFF] hover:text-[#581ADB]
                disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        {/* Pages */}
                        <div className="flex items-center gap-1.5">
                            {pageNumbers.map((pageNumber, index) => {
                                if (typeof pageNumber === "string") {
                                    return (
                                        <span
                                            key={`ellipsis-${index}`}
                                            className="flex h-10 w-6 items-center justify-center
                                text-sm font-medium text-[#8F8F8F]"
                                        >
                            ...
                        </span>
                                    );
                                }

                                return (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        onClick={() => void handlePageChange(pageNumber)}
                                        className={`flex h-10 min-w-10 cursor-pointer items-center justify-center
                            rounded-full px-3 text-sm font-medium transition-all duration-200 ${
                                            page === pageNumber
                                                ? "bg-[#581ADB] text-white shadow-[0_4px_12px_rgba(88,26,219,0.25)]"
                                                : "text-[#8F8F8F] hover:bg-[#F1ECFF] hover:text-[#581ADB]"
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Next */}
                        <button
                            type="button"
                            disabled={page === totalPages}
                            onClick={() => void handlePageChange(page + 1)}
                            aria-label="Next page"
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
                text-[#8F8F8F] transition-all duration-200
                hover:bg-[#F1ECFF] hover:text-[#581ADB]
                disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                )}



            </section>
            {/*<HotelList/>*/}

            {/*<HotelDetailsModal*/}
            {/*    hotel={selectedHotel}*/}
            {/*    onClose={() => setSelectedHotel(null)}*/}
            {/*/>*/}

        </>
    );
}
export default SearchPage;