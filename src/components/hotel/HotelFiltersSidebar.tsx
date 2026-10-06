import type {
    HotelFiltersResponse,
    SearchData,
} from "@/context/HotelsContext.types";

type HotelFiltersSidebarProps = {
    filters: HotelFiltersResponse | null;
    searchData: SearchData | null;
    onApply: (filters: Partial<SearchData>) => void;
};

const HotelFiltersSidebar = ({
                                 filters,
                                 searchData,
                                 onApply,
                             }: HotelFiltersSidebarProps) => {
    const minRating = searchData?.minRating;
    const stars = searchData?.stars;
    const selectedTypes = searchData?.types ?? [];
    const selectedChainIds = searchData?.chainIds ?? [];
    const selectedAmenities = searchData?.amenities ?? [];

    const changeFilter = (changes: Partial<SearchData>) => {
        onApply({
            ...changes,
            page: 1,
        });
    };

    const toggleType = (type: string) => {
        const next = selectedTypes.includes(type)
            ? selectedTypes.filter(item => item !== type)
            : [...selectedTypes, type];

        changeFilter({
            types: next,
        });
    };

    const toggleChain = (id: number) => {
        const next = selectedChainIds.includes(id)
            ? selectedChainIds.filter(item => item !== id)
            : [...selectedChainIds, id];

        changeFilter({
            chainIds: next,
        });
    };

    const toggleAmenity = (name: string) => {
        const next = selectedAmenities.includes(name)
            ? selectedAmenities.filter(item => item !== name)
            : [...selectedAmenities, name];

        changeFilter({
            amenities: next,
        });
    };

    return (
        <aside
            className="
                w-full
                overflow-hidden
                rounded-[10px]
                border border-[#E5E5E5]
                bg-white
            "
        >
            {/* MAP */}
            <button
                type="button"
                className="
                    flex
                    h-[40px]
                    w-full
                    cursor-pointer
                    items-center
                    justify-between
                    border-b border-[#E7E7E7]
                    px-3
                    text-[11px]
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
                        h-[18px]
                        w-[18px]
                        items-center
                        justify-center
                        rounded-full
                        bg-[#FF385C]
                    "
                >
                    <span className="h-[5px] w-[5px] rounded-full bg-white" />
                </span>
            </button>

            {/* RATING */}
            <FilterSection title="Rating">
                {filters?.ratings.map(item => (
                    <RadioFilter
                        key={item.minRating}
                        label={`${item.minRating}+`}
                        count={item.count}
                        checked={minRating === item.minRating}
                        onClick={() =>
                            changeFilter({
                                minRating:
                                    minRating === item.minRating
                                        ? undefined
                                        : item.minRating,
                            })
                        }
                    />
                ))}
            </FilterSection>

            {/* STARS */}
            <FilterSection title="Stars">
                {filters?.stars
                    .sort((a, b) => b.stars - a.stars)
                    .map(item => (
                        <RadioFilter
                            key={item.stars}
                            count={item.count}
                            checked={stars === item.stars}
                            onClick={() =>
                                changeFilter({
                                    stars:
                                        stars === item.stars
                                            ? undefined
                                            : item.stars,
                                })
                            }
                        >
                            <span className="flex items-center gap-[1px]">
                                {Array.from({
                                    length: item.stars,
                                }).map((_, index) => (
                                    <span
                                        key={index}
                                        className="text-[10px] leading-none text-[#666]"
                                    >
                                        ★
                                    </span>
                                ))}
                            </span>
                        </RadioFilter>
                    ))}
            </FilterSection>

            {/* FACILITIES */}
            <FilterSection title="Facilities">
                {filters?.amenities.map(item => (
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
                        <button
                            type="button"
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
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>
                    )}
            </FilterSection>

            {/* HOTEL TYPE */}
            <FilterSection title="Type of hotel">
                {filters?.types.map(item => (
                    <CheckboxFilter
                        key={item.type}
                        label={item.type}
                        count={item.count}
                        checked={selectedTypes.includes(item.type)}
                        onClick={() => toggleType(item.type)}
                    />
                ))}
            </FilterSection>

            {/* CHAINS */}
            <FilterSection title="Chain hotels">
                {filters?.chains.map(item => (
                    <CheckboxFilter
                        key={item.id}
                        label={item.name}
                        count={item.count}
                        checked={selectedChainIds.includes(item.id)}
                        onClick={() => toggleChain(item.id)}
                    />
                ))}
            </FilterSection>
        </aside>
    );
};

type FilterSectionProps = {
    title: string;
    children: React.ReactNode;
};

const FilterSection = ({
                           title,
                           children,
                       }: FilterSectionProps) => {
    return (
        <section className="border-b border-[#E7E7E7] px-3 py-3">
            <h3 className="mb-2.5 text-[11px] font-semibold text-[#5E5E5E]">
                {title}
            </h3>

            <div className="space-y-[6px]">
                {children}
            </div>
        </section>
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
        <button
            type="button"
            onClick={onClick}
            className="
                flex
                w-full
                cursor-pointer
                items-center
                justify-between
                text-left
            "
        >
            <span className="flex items-center gap-[6px]">
                <span
                    className={`
                        flex
                        h-[11px]
                        w-[11px]
                        items-center
                        justify-center
                        rounded-full
                        border
                        ${
                        checked
                            ? "border-[#581ADB]"
                            : "border-[#777]"
                    }
                    `}
                >
                    {checked && (
                        <span className="h-[5px] w-[5px] rounded-full bg-[#581ADB]" />
                    )}
                </span>

                <span className="text-[10px] text-[#666]">
                    {children ?? label}
                </span>
            </span>

            <span className="text-[10px] text-[#858585]">
                {count}
            </span>
        </button>
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
        <button
            type="button"
            onClick={onClick}
            className="
                flex
                w-full
                cursor-pointer
                items-center
                justify-between
                text-left
            "
        >
            <span className="flex min-w-0 items-center gap-[6px]">
                <span
                    className={`
                        flex
                        h-[11px]
                        w-[11px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[2px]
                        border
                        ${
                        checked
                            ? "border-[#581ADB] bg-[#581ADB]"
                            : "border-[#777] bg-white"
                    }
                    `}
                >
                    {checked && (
                        <svg
                            width="8"
                            height="8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m5 12 4 4L19 6" />
                        </svg>
                    )}
                </span>

                <span className="truncate text-[10px] text-[#666]">
                    {label}
                </span>
            </span>

            <span className="ml-2 shrink-0 text-[10px] text-[#858585]">
                {count}
            </span>
        </button>
    );
};

export default HotelFiltersSidebar;
