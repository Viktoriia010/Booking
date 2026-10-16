import { useEffect, useRef, useState, type FormEvent } from "react";
import type { SearchData } from "../../context/HotelsContext.types";

type SearchFormProps = { onSearch: (data: SearchData) => void };

// ==== Calendar ====
const MONTHS = ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"];
const WEEKDAYS = ["Пн","Вт","Ср","Чт","Пт","Сб","Нд"];

const toIso = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

const MiniCalendar = ({
                          value, min, onChange, onClose,
                      }: {
    value: string; min?: string;
    onChange: (v: string) => void;
    onClose: () => void;
}) => {
    const [view, setView] = useState(() => value ? new Date(value) : new Date());
    const year = view.getFullYear(), month = view.getMonth();
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const minDate = min ? new Date(min) : null;
    const today = new Date(); today.setHours(0,0,0,0);

    const days: (number | null)[] = [
        ...Array(firstWeekday).fill(null),
        ...Array.from({length: daysInMonth}, (_, i) => i + 1),
    ];

    return (
        <div className="absolute left-0 top-full z-50 mt-2 w-[270px] rounded-[20px] border border-[#EEEEEE] bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <div className="mb-3 flex items-center justify-between">
                <button type="button" onClick={() => setView(new Date(year, month-1, 1))}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#581ADB] hover:bg-violet-50">←</button>
                <span className="text-[14px] font-bold">{MONTHS[month]} {year}</span>
                <button type="button" onClick={() => setView(new Date(year, month+1, 1))}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#581ADB] hover:bg-violet-50">→</button>
            </div>

            <div className="mb-1 grid grid-cols-7 gap-1">
                {WEEKDAYS.map(d => <div key={d} className="text-center text-[11px] font-semibold text-[#717171]">{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => {
                    if (day === null) return <div key={`e${i}`} />;
                    const thisDate = new Date(year, month, day);
                    const iso = toIso(thisDate);
                    const isSelected = iso === value;
                    const isToday = thisDate.getTime() === today.getTime();
                    const isDisabled = minDate ? thisDate < minDate : false;

                    return (
                        <button key={day} type="button" disabled={isDisabled}
                                onClick={() => { onChange(iso); onClose(); }}
                                className={[
                                    "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[12px] transition",
                                    isSelected ? "bg-[#581ADB] font-bold text-white"
                                        : isToday ? "font-bold text-[#581ADB] hover:bg-violet-50"
                                            : "text-black hover:bg-violet-50",
                                    isDisabled ? "cursor-not-allowed text-[#CCCCCC] hover:bg-transparent" : "",
                                ].join(" ")}>
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// ==== DateField ====
const formatDisplay = (iso: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}.${m}.${y}`;
};

const DateField = ({
                       label, value, min, onChange,
                   }: {
    label: string; value: string; min?: string;
    onChange: (v: string) => void;
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const h = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        if (open) document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, [open]);

    return (
        <div ref={ref} className="relative flex w-1/2 flex-col">
            <span className="text-[10px] text-gray-500">{label}</span>
            <button type="button" onClick={() => setOpen(v => !v)}
                    className="w-full cursor-pointer bg-transparent text-left text-[13px] text-black outline-none hover:text-[#581ADB]">
                {value ? formatDisplay(value) : <span className="text-[#AAAAAA]">дд.мм.рррр</span>}
            </button>
            {open && <MiniCalendar value={value} min={min} onChange={onChange} onClose={() => setOpen(false)} />}
        </div>
    );
};

// ==== GuestsDropdown ====
const Counter = ({ label, value, min, onChange }: {
    label: string; value: number; min: number;
    onChange: (n: number) => void;
}) => (
    <div className="flex items-center justify-between py-2">
        <span className="text-[13px]">{label}</span>
        <div className="flex items-center gap-3">
            <button type="button" disabled={value <= min} onClick={() => onChange(value-1)}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#DDDDDD] text-[#581ADB] hover:border-[#581ADB] hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-[#EEEEEE] disabled:text-[#CCCCCC]">−</button>
            <span className="w-5 text-center text-[13px] font-semibold">{value}</span>
            <button type="button" onClick={() => onChange(value+1)}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#DDDDDD] text-[#581ADB] hover:border-[#581ADB] hover:bg-violet-50">+</button>
        </div>
    </div>
);

const GuestsDropdown = ({ adults, children, rooms, setAdults, setChildren, setRooms }: {
    adults: number; children: number; rooms: number;
    setAdults: (n: number) => void; setChildren: (n: number) => void; setRooms: (n: number) => void;
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const h = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        if (open) document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, [open]);

    const total = adults + children;

    return (
        <div ref={ref} className="relative flex-1">
            <span className="text-[10px] text-gray-500">Guests</span>
            <button type="button" onClick={() => setOpen(v => !v)}
                    className="flex w-full cursor-pointer items-center justify-between text-left text-[13px] text-black">
                <span>{total} guest{total !== 1 ? "s" : ""}, {rooms} room{rooms !== 1 ? "s" : ""}</span>
                <span className="text-[#717171]">{open ? "▲" : "▼"}</span>
            </button>
            {open && (
                <div className="absolute right-0 top-full z-50 mt-3 w-[260px] rounded-[20px] border border-[#EEEEEE] bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                    <Counter label="Adults" value={adults} min={1} onChange={setAdults} />
                    <Counter label="Children" value={children} min={0} onChange={setChildren} />
                    <Counter label="Rooms" value={rooms} min={1} onChange={setRooms} />
                </div>
            )}
        </div>
    );
};

// ==== SearchForm ====
const SearchForm = ({ onSearch }: SearchFormProps) => {
    const [search, setSearch] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [error, setError] = useState("");

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (checkIn && checkOut && checkOut <= checkIn) {
            setError("Check-out must be after check-in.");
            return;
        }

        const data: SearchData = {
            search,
            checkIn,
            checkOut,
            adults,
            children,
            rooms,
        };

        onSearch(data);
    };

    return (
        <div className="w-full">
            <form onSubmit={submit}
                  className="mx-auto flex w-full max-w-5xl flex-col gap-2 rounded-[24px] bg-white p-2 shadow-md sm:flex-row sm:items-center sm:rounded-[60px]">
                <div className="flex min-h-12 flex-1 items-center gap-3 border-b border-gray-200 px-4 py-2 sm:border-b-0 sm:border-r-2">
                    <img src="/plane.svg" alt="" className="h-5 w-5 shrink-0" />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                           placeholder="Where are you going?"
                           className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-black" />
                </div>

                <div className="flex min-h-12 flex-1 items-center gap-3 border-b border-gray-200 px-4 py-2 sm:border-b-0 sm:border-r-2">
                    <img src="/calendar.svg" alt="" className="h-5 w-5 shrink-0" />
                    <div className="flex w-full gap-2">
                        <DateField label="Check-in" value={checkIn}
                                   onChange={v => { setCheckIn(v); if (checkOut && v >= checkOut) setCheckOut(""); }} />
                        <DateField label="Check-out" value={checkOut} min={checkIn || undefined}
                                   onChange={setCheckOut} />
                    </div>
                </div>

                <div className="flex min-h-12 flex-1 items-center gap-3 border-b border-gray-200 px-4 py-2 sm:border-b-0">
                    <img src="/peoples.svg" alt="" className="h-5 w-5 shrink-0" />
                    <GuestsDropdown adults={adults} children={children} rooms={rooms}
                                    setAdults={setAdults} setChildren={setChildren} setRooms={setRooms} />
                </div>

                <button type="submit" aria-label="Search"
                        className="flex h-12 shrink-0 cursor-pointer items-center justify-center rounded-[30px] bg-[#581ADB] px-5 transition hover:bg-violet-800 active:scale-[0.98]">
                    <img src="/search.svg" alt="" className="h-8 w-8" />
                </button>
            </form>

            {error && <p className="mx-auto mt-2 max-w-5xl px-4 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default SearchForm;