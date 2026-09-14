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

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
        <form className="search-form" onSubmit={submit}>
            <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="City or hotel"
            />

            <label>
                Check-in
                <input
                    type="date"
                    value={checkIn}
                    onChange={(event) => setCheckIn(event.target.value)}
                />
            </label>

            <label>
                Check-out
                <input
                    type="date"
                    value={checkOut}
                    onChange={(event) => setCheckOut(event.target.value)}
                />
            </label>

            <label>
                Adults
                <select
                    value={adults}
                    onChange={(event) => setAdults(Number(event.target.value))}
                >
                    {[1, 2, 3, 4].map(x => <option key={x} value={x}>{x}</option>)}
                </select>
            </label>

            <label>
                Children
                <select
                    value={children}
                    onChange={(event) => setChildren(Number(event.target.value))}
                >
                    {[0, 1, 2, 3].map(x => <option key={x} value={x}>{x}</option>)}
                </select>
            </label>

            <label>
                Rooms
                <select
                    value={rooms}
                    onChange={(event) => setRooms(Number(event.target.value))}
                >
                    {[1, 2, 3, 4].map(x => <option key={x} value={x}>{x}</option>)}
                </select>
            </label>

            <button className="button" type="submit">Search</button>
        </form>
    );
};

export default SearchForm;