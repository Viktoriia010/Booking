import { useState, type FormEvent } from "react";
import type { SearchData } from "../../context/HotelsContext.types";

type SearchFormProps = {
    onSearch: (data: SearchData) => void;
};

const SearchForm = ({ onSearch }: SearchFormProps) => {
    const [search, setSearch] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [error, setError] = useState("");

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (checkIn && checkOut && checkOut <= checkIn) {
            setError("Check-out must be after check-in.");
            return;
        }

        onSearch({
            search,
            checkIn,
            checkOut,
            adults,
            children,
            rooms,
        });
    };

    return (
        <div className="w-full">
            <form
                onSubmit={submit}
                className="mx-auto flex w-full max-w-5xl flex-col gap-2 rounded-[24px] bg-white p-2 shadow-md sm:flex-row sm:items-center sm:rounded-[60px]"
            >
                <div className="flex min-h-12 flex-1 items-center gap-3 border-b border-gray-200 px-4 py-2 sm:border-b-0 sm:border-r-2">
                    <img
                        src="/plane.svg"
                        alt=""
                        className="h-5 w-5 shrink-0"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Where are you going?"
                        className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-black"
                    />
                </div>

                <div className="flex min-h-12 flex-1 items-center gap-3 border-b border-gray-200 px-4 py-2 sm:border-b-0 sm:border-r-2">
                    <img
                        src="/calendar.svg"
                        alt=""
                        className="h-5 w-5 shrink-0"
                    />

                    <div className="flex w-full gap-2">
                        <div className="flex w-1/2 flex-col">
                            <span className="text-[10px] text-gray-500">
                                Check-in
                            </span>

                            <input
                                type="date"
                                value={checkIn}
                                onChange={(event) => {
                                    setCheckIn(event.target.value);

                                    if (
                                        checkOut &&
                                        event.target.value >= checkOut
                                    ) {
                                        setCheckOut("");
                                    }
                                }}
                                className="w-full cursor-pointer bg-transparent text-[13px] text-black outline-none"
                            />
                        </div>

                        <div className="flex w-1/2 flex-col">
                            <span className="text-[10px] text-gray-500">
                                Check-out
                            </span>

                            <input
                                type="date"
                                value={checkOut}
                                min={checkIn || undefined}
                                onChange={(event) =>
                                    setCheckOut(event.target.value)
                                }
                                className="w-full cursor-pointer bg-transparent text-[13px] text-black outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex min-h-12 flex-1 items-center gap-3 border-b border-gray-200 px-4 py-2 sm:border-b-0">
                    <img
                        src="/peoples.svg"
                        alt=""
                        className="h-5 w-5 shrink-0"
                    />

                    <div className="flex w-full gap-2">
                        <label className="flex flex-1 flex-col">
                            <span className="text-[10px] text-gray-500">
                                Adults
                            </span>

                            <select
                                value={adults}
                                onChange={(event) =>
                                    setAdults(Number(event.target.value))
                                }
                                className="cursor-pointer bg-transparent text-[13px] outline-none"
                            >
                                {[1, 2, 3, 4].map((x) => (
                                    <option key={x} value={x}>
                                        {x}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="flex flex-1 flex-col">
                            <span className="text-[10px] text-gray-500">
                                Children
                            </span>

                            <select
                                value={children}
                                onChange={(event) =>
                                    setChildren(Number(event.target.value))
                                }
                                className="cursor-pointer bg-transparent text-[13px] outline-none"
                            >
                                {[0, 1, 2, 3].map((x) => (
                                    <option key={x} value={x}>
                                        {x}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="flex flex-1 flex-col">
                            <span className="text-[10px] text-gray-500">
                                Rooms
                            </span>

                            <select
                                value={rooms}
                                onChange={(event) =>
                                    setRooms(Number(event.target.value))
                                }
                                className="cursor-pointer bg-transparent text-[13px] outline-none"
                            >
                                {[1, 2, 3, 4].map((x) => (
                                    <option key={x} value={x}>
                                        {x}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    aria-label="Search"
                    className="flex h-12 shrink-0 cursor-pointer items-center justify-center rounded-[30px] bg-[#581ADB] px-5 transition hover:opacity-90"
                >
                    <img
                        src="/search.svg"
                        alt=""
                        className="h-8 w-8"
                    />
                </button>
            </form>

            {error && (
                <p className="mx-auto mt-2 max-w-5xl px-4 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default SearchForm;