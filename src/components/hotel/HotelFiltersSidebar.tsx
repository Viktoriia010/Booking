import { useState} from "react";

import type {
    HotelFiltersResponse,
    SearchData,
} from "@/context/HotelsContext.types";

type HotelFiltersSidebarProps = {
    filters: HotelFiltersResponse | null;
    searchData: SearchData | null;
    onApply: (filters: Partial<SearchData>) => void;
};


const HotelFiltersSidebar = ({filters,searchData,onApply}: HotelFiltersSidebarProps) => {
    const minRating = searchData?.minRating;
    const stars = searchData?.stars;

    const selectedTypes = searchData?.types ?? [];
    const selectedChainIds = searchData?.chainIds ?? [];
    const selectedAmenities = searchData?.amenities ?? [];

    const [showAllAmenities, setShowAllAmenities] = useState(false);
    const [showAllTypes, setShowAllTypes] = useState(false);

    const minPrice =
        searchData?.minPrice ?? filters?.minPrice ?? 0;

    const maxPrice =
        searchData?.maxPrice ?? filters?.maxPrice ?? 0;


    const priceRange =
        (filters?.maxPrice ?? 0) -
        (filters?.minPrice ?? 0);

    const minPosition =
        priceRange > 0
            ? ((minPrice - (filters?.minPrice ?? 0)) / priceRange) * 100
            : 0;

    const maxPosition =
        priceRange > 0
            ? ((maxPrice - (filters?.minPrice ?? 0)) / priceRange) * 100
            : 100;


    const changeFilter = (changes: Partial<SearchData>) => {
        onApply(changes);
    };


    const toggleType = (type: string) => {
        const next = selectedTypes.includes(type) ? selectedTypes.filter((item) => item !== type ) : [...selectedTypes, type];

        changeFilter({
            types: next,
        });
    };


    const toggleChain = (id: number) => {
        const next = selectedChainIds.includes(id) ? selectedChainIds.filter((item) => item !== id) : [...selectedChainIds, id];

        changeFilter({
            chainIds: next,
        });
    };

    const toggleAmenity = (name: string) => {
        const next = selectedAmenities.includes(name) ? selectedAmenities.filter((item) => item !== name) : [...selectedAmenities, name];

        changeFilter({
            amenities: next,
        });
    };


    const handleMinPriceChange = (value: number) => {
        const nextValue = Math.min(value, maxPrice - 1);

        changeFilter({
            minPrice: nextValue,
        });
    };


    const handleMaxPriceChange = (value: number) => {
        const nextValue = Math.max(value, minPrice + 1);

        changeFilter({
            maxPrice: nextValue,
        });
    };


    return (
        <aside className="w-full">


            <button
                type="button"
                className="
                    mb-3
                    flex
                    h-6
                    w-full
                    items-center
                    justify-between
                    rounded-full
                    border
                    border-[#DDDDDD]
                    bg-white
                    px-3
                    text-[9px]
                    font-medium
                    text-[#581ADB]
                    transition-colors
                    hover:bg-[#FAF8FF]
                "
            >
                <span>See the map</span>

                <span
                    className="
                        flex
                        h-3
                        w-3
                        items-center
                        justify-center
                        rounded-full
                        bg-[#FF385C]
                    "
                >
                    <span
                        className="
                            h-1
                            w-1
                            rounded-full
                            bg-white
                        "
                    />
                </span>
            </button>


            <div
                className="
                    overflow-hidden
                    rounded-[9px]
                    border
                    border-[#DDDDDD]
                    bg-white
                "
            >

                <FilterSection title="Price">

                    <div>
                        <div
                            className="
                                mb-2
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <span
                                className="
                                    text-[9px]
                                    text-[#717171]
                                "
                            >
                                {minPrice}$ night
                            </span>

                            <span
                                className="
                                    text-[9px]
                                    text-[#717171]
                                "
                            >
                                {maxPrice}$ night
                            </span>
                        </div>


                        <div className="relative h-3">


                            <div
                                className="
                                    absolute
                                    left-0
                                    right-0
                                    top-1/2
                                    h-[1px]
                                    -translate-y-1/2
                                    bg-[#717171]
                                "
                            />



                            <div
                                className="
                                    absolute
                                    top-1/2
                                    h-[1px]
                                    -translate-y-1/2
                                    bg-[#581ADB]
                                "
                                style={{
                                    left: `${minPosition}%`,
                                    right: `${
                                        100 - maxPosition}%`,
                                }}
                            />


                            <input
                                type="range"
                                min={filters?.minPrice ?? 0}
                                max={filters?.maxPrice ?? 0}
                                value={minPrice}
                                onChange={(event) =>
                                    handleMinPriceChange(
                                        Number( event.target.value),
                                    )
                                }
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    z-20
                                    h-[12px]
                                    w-full
                                    appearance-none
                                    bg-transparent

                                    [&::-webkit-slider-runnable-track]:bg-transparent
                                    [&::-webkit-slider-thumb]:pointer-events-auto
                                    [&::-webkit-slider-thumb]:h-[10px]
                                    [&::-webkit-slider-thumb]:w-[10px]
                                    [&::-webkit-slider-thumb]:appearance-none
                                    [&::-webkit-slider-thumb]:rounded-full
                                    [&::-webkit-slider-thumb]:border
                                    [&::-webkit-slider-thumb]:border-[#717171]
                                    [&::-webkit-slider-thumb]:bg-white
                                "
                            />

                            <input
                                type="range"
                                min={filters?.minPrice ?? 0}
                                max={filters?.maxPrice ?? 0}
                                value={maxPrice}
                                onChange={(event) =>
                                    handleMaxPriceChange(
                                        Number(
                                            event.target
                                                .value,
                                        ),
                                    )
                                }
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    z-10
                                    h-[12px]
                                    w-full
                                    appearance-none
                                    bg-transparent

                                    [&::-webkit-slider-runnable-track]:bg-transparent
                                    [&::-webkit-slider-thumb]:pointer-events-auto
                                    [&::-webkit-slider-thumb]:h-[10px]
                                    [&::-webkit-slider-thumb]:w-[10px]
                                    [&::-webkit-slider-thumb]:appearance-none
                                    [&::-webkit-slider-thumb]:rounded-full
                                    [&::-webkit-slider-thumb]:border
                                    [&::-webkit-slider-thumb]:border-[#717171]
                                    [&::-webkit-slider-thumb]:bg-white
                                "
                            />

                        </div>
                    </div>

                </FilterSection>

                <FilterSection title="Sort by">

                    <SortOption
                        label="Best rating"
                        checked={searchData?.sort === "rating"}
                        onClick={() =>
                            changeFilter({
                                sort:
                                    searchData?.sort === "rating"
                                        ? undefined
                                        : "rating",
                            })
                        }
                    />

                    <SortOption
                        label="Price: low to high"
                        checked={searchData?.sort === "price-asc"}
                        onClick={() =>
                            changeFilter({
                                sort:
                                    searchData?.sort === "price-asc"
                                        ? undefined
                                        : "price-asc",
                            })
                        }
                    />

                    <SortOption
                        label="Price: high to low"
                        checked={searchData?.sort === "price-desc"}
                        onClick={() =>
                            changeFilter({
                                sort:
                                    searchData?.sort === "price-desc"
                                        ? undefined
                                        : "price-desc",
                            })
                        }
                    />

                </FilterSection>

                <FilterSection title="Rating">

                    {filters?.ratings.map((item) => (
                        <RadioFilter
                            key={item.minRating}
                            label={`${item.minRating}+`}
                            count={item.count}
                            checked={minRating ===item.minRating}
                            onClick={() =>
                                changeFilter({minRating:minRating ===item.minRating? undefined : item.minRating})
                            }
                        />
                    ))}

                </FilterSection>


                <FilterSection title="Stars">

                    {[...(filters?.stars ?? [])]
                        .sort((a, b) =>
                                b.stars - a.stars,
                        )
                        .map((item) => (
                            <RadioFilter
                                key={item.stars}
                                count={item.count}
                                checked={
                                    stars === item.stars
                                }
                                onClick={() =>
                                    changeFilter({
                                        stars:
                                            stars ===
                                            item.stars
                                                ? undefined
                                                : item.stars,
                                    })
                                }
                            >
                                <Stars
                                    stars={item.stars}
                                />
                            </RadioFilter>
                        ))}

                </FilterSection>


                <FilterSection title="Facilities">
                    {(showAllAmenities ? filters?.amenities : filters?.amenities.slice(0, 6)
                    )?.map((item) => (
                        <CheckboxFilter
                            key={item.name}
                            label={item.name}
                            count={item.count}
                            checked={selectedAmenities.includes(item.name)}
                            onClick={() => toggleAmenity(item.name)}
                        />
                    ))}

                    {filters?.amenities &&
                        filters.amenities.length > 6 && (
                            <ExpandButton
                                expanded={showAllAmenities}
                                onClick={() =>
                                    setShowAllAmenities(
                                        current => !current
                                    )
                                }
                            />
                        )}

                </FilterSection>


                <FilterSection title="Type of hotel">

                    {(showAllTypes
                            ? filters?.types
                            : filters?.types.slice(0, 8)
                    )?.map((item) => (
                        <CheckboxFilter
                            key={item.type}
                            label={item.type}
                            count={item.count}
                            checked={selectedTypes.includes(item.type)}
                            onClick={() =>
                                toggleType(item.type)
                            }
                        />
                    ))}

                    {filters?.types &&
                        filters.types.length > 8 && (
                            <ExpandButton
                                expanded={showAllTypes}
                                onClick={() =>
                                    setShowAllTypes(
                                        current => !current
                                    )
                                }
                            />
                        )}

                </FilterSection>


                <FilterSection title="Chain hotels">

                    {filters?.chains.map((item) => (
                        <CheckboxFilter
                            key={item.id}
                            label={item.name}
                            count={item.count}
                            checked={selectedChainIds.includes(
                                item.id,
                            )}
                            onClick={() =>
                                toggleChain(
                                    item.id,
                                )
                            }
                        />
                    ))}

                </FilterSection>

            </div>
        </aside>
    );
};


type FilterSectionProps = {
    title?: string;
    children: React.ReactNode;
};

const FilterSection = ({title,children}: FilterSectionProps) => {
    return (
        <section
            className="
                border-b
                border-[#E7E7E7]
                px-[12px]
                py-[11px]
                last:border-b-0
            "
        >
            {title && (
                <h3
                    className="
                        mb-[7px]
                        text-[10px]
                        font-medium
                        leading-[12px]
                        text-[#717171]
                    "
                >
                    {title}
                </h3>
            )}

            <div className="space-y-[5px]">
                {children}
            </div>
        </section>
    );
};


type SortOptionProps = {
    label: string;
    checked: boolean;
    onClick: () => void;
};

const SortOption = ({
                        label,
                        checked,
                        onClick,
                    }: SortOptionProps) => {
    return (
        <label className="flex cursor-pointer items-center gap-2">
            <input
                type="radio"
                checked={checked}
                onClick={onClick}
                readOnly
                className="h-[11px] w-[11px] accent-[#581ADB]"
            />

            <span className="text-[9px] text-[#717171]">
                {label}
            </span>
        </label>
    );
};


type RadioFilterProps = {
    label?: React.ReactNode;
    children?: React.ReactNode;
    count: number;
    checked: boolean;
    onClick: () => void;
};

const RadioFilter = ({
                         label,
                         children,
                         count,
                         checked,
                         onClick,
                     }: RadioFilterProps) => {
    return (
        <label className="flex min-h-[13px] w-full cursor-pointer items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-[6px]">
                <input
                    type="radio"
                    checked={checked}
                    onClick={onClick}
                    readOnly
                    className="
                        h-[11px]
                        w-[11px]
                        shrink-0
                        accent-[#581ADB]
                    "
                />

                <span className="truncate text-[9px] font-normal leading-[11px] text-[#717171]">
                    {children ?? label}
                </span>
            </span>

            <span className="shrink-0 text-[9px] leading-[11px] text-[#858585]">
                {count}
            </span>
        </label>
    );
};



type CheckboxFilterProps = {
    label: string;
    count: number;
    checked: boolean;
    onClick: () => void;
};

const CheckboxFilter = ({
                            label,
                            count,
                            checked,
                            onClick,
                        }: CheckboxFilterProps) => {
    return (
    <label
        className="
                flex
                min-h-[13px]
                w-full
                cursor-pointer
                items-center
                justify-between
                gap-2
            "
    >
            <span className="flex min-w-0 items-center gap-[6px]">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onClick}
                    className="
                        h-[11px]
                        w-[11px]
                        shrink-0
                        accent-[#581ADB]
                    "
                />

                <span
                    className="
                        truncate
                        text-[9px]
                        leading-[11px]
                        text-[#717171]
                    "
                >
                    {label}
                </span>
            </span>

        <span
            className="
                    shrink-0
                    text-[9px]
                    leading-[11px]
                    text-[#858585]
                "
        >
                {count}
            </span>
    </label>
);
};



const Stars = ({ stars }: {stars: number}) => {
    return (
        <span className="flex items-center gap-[1px]">
            {Array.from({
                length: stars,
            }).map((_, index) => (
                <span
                    key={index}
                    className="
                        text-[9px]
                        leading-none
                        text-[#717171]
                    "
                >
                    ★
                </span>
            ))}
        </span>
    );
};


type ExpandButtonProps = {
    expanded: boolean;
    onClick: () => void;
};

const ExpandButton = ({
                          expanded,
                          onClick,
                      }: ExpandButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                mt-1
                flex
                w-full
                cursor-pointer
                justify-center
                text-[#581ADB]
            "
        >
            <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`
                    transition-transform
                    duration-200
                    ${expanded ? "rotate-180" : ""}
                `}
            >
                <path d="m6 9 6 6 6-6" />
            </svg>
        </button>
    );
};
export default HotelFiltersSidebar;
