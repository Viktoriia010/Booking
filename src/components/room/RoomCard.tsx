import type { Room } from "@/context/HotelsContext.types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {getImageUrl} from "@/api.ts";

type Props = {
    room: Room;
};
const RoomCard = ({ room }: Props) => {
    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div
            className="
                flex
                w-full
                flex-col
                overflow-hidden
                rounded-[12px]
                border
                border-[#DDDDDD]
                bg-white
                shadow-[0_-2px_18px_rgba(0,0,0,0.08)]
                md:h-[182px]
                md:flex-row"
        >
            {/* IMAGE */}
            <div
                className="
                    h-[205px]
                    w-full
                    shrink-0
                     md:h-full
                    md:w-[250px]
                ">
                {room.imageUrl ? (
                    <img
                        src={getImageUrl(room.imageUrl)}
                        alt={room.title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
                        No image
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div
                className="
                    flex
                    flex-1
                    flex-col
                    px-4
                    py-4
                    md:px-5
                    md:py-4
                " >
                <h3
                    className="
                        mb-3
                        text-[13px]
                        font-bold
                        text-[#303030]
                        md:text-[16px] ">
                    {room.title}
                </h3>

                {/* BED */}
                <div className="flex items-center gap-2 text-[10px] text-[#717171] md:text-[12px]">
                    <img
                        src="/bed.svg"
                        alt=""
                        className="h-4 w-4"
                    />

                    <span className="w-[45px]">Bed:</span>

                    <span>
                        {room.bedType}
                    </span>
                </div>

                {/* GUESTS */}
                <div className="mt-2 flex items-center gap-2 text-[10px] text-[#717171] md:text-[12px]">
                    <img
                        src="/peoples.svg"
                        alt=""
                        className="h-4 w-4 opacity-60"
                    />

                    <span className="w-[45px]">Guests:</span>

                    <span>
                        maximum {room.capacity}
                    </span>
                </div>

            </div>

            {/* ACTIONS */}
            <div
                className="grid
                    w-full
                    grid-cols-2
                    gap-x-4
                    gap-y-2
                    px-4
                    pb-4
                    md:flex
                    md:w-[130px]
                    md:shrink-0
                    md:flex-col
                    md:items-center
                    md:justify-center
                    md:gap-3
                    md:pb-0
                    md:pr-5
                    md:pl-0 ">
                {/* PRICE */}
                <p
                    className="
                        col-span-2
                        text-center
                        text-[16px]
                        font-bold
                        text-[#581ADB]
                        md:col-span-1" >
                    {room.pricePerNight}$
                </p>

                {/* INFO */}
                <button
                    type="button"
                    onClick={() => setShowInfo(true)}
                    className="
                        order-2
                        h-[32px]
                        w-full
                        rounded-full
                        border
                        border-[#581ADB]
                        bg-white
                        text-[11px]
                        font-semibold
                        text-[#581ADB]
                        transition
                        duration-300
                        hover:bg-[#F5F1FF]
                        cursor-pointer
                        md:order-2
                        md:w-[88px]
                        md:text-[12px]" >
                    +INFO
                </button>

                {/* CHOOSE */}
                <button
                    type="button"
                    disabled={!room.isAvailable}
                    onClick={() =>
                        navigate(`/booking/${room.id}`)
                    }
                    className=" order-1
                        h-[32px]
                        w-full
                        rounded-full
                        bg-[#581ADB]
                        text-[11px]
                        font-semibold
                        text-white
                        transition
                        duration-250
                        hover:bg-[#4816C5]
                        disabled:cursor-not-allowed
                        disabled:bg-gray-300
                        cursor-pointer
                        md:order-1
                        md:w-[88px]
                        md:text-[12px]">
                    {room.isAvailable ? "CHOOSE" : "UNAVAILABLE"}
                </button>
            </div>
            {showInfo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setShowInfo(false)}>
                    <section role="dialog" aria-modal="true" aria-labelledby={`room-info-${room.id}`} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(event) => event.stopPropagation()}>
                        <div className="flex items-start justify-between gap-4">
                            <h2 id={`room-info-${room.id}`} className="text-lg font-bold text-[#303030]">{room.title}</h2>
                            <button type="button" aria-label="Close room information" onClick={() => setShowInfo(false)} className="text-2xl leading-none text-[#777]">×</button>
                        </div>
                        <dl className="mt-5 space-y-3 text-sm text-[#717171]">
                            <div className="flex justify-between gap-4"><dt>Bed</dt><dd className="text-right font-semibold text-[#303030]">{room.bedType}</dd></div>
                            <div className="flex justify-between gap-4"><dt>Maximum guests</dt><dd className="font-semibold text-[#303030]">{room.capacity}</dd></div>
                            <div className="flex justify-between gap-4"><dt>Availability</dt><dd className="font-semibold text-[#303030]">{room.isAvailable ? "Available" : "Unavailable"}</dd></div>
                            <div className="flex justify-between gap-4"><dt>Price per night</dt><dd className="font-semibold text-[#581ADB]">${room.pricePerNight}</dd></div>
                        </dl>
                        <button type="button" onClick={() => setShowInfo(false)} className="mt-6 w-full rounded-full border border-[#581ADB] py-2 text-sm font-semibold text-[#581ADB]">Close</button>
                    </section>
                </div>
            )}
        </div>
    );
};

export default RoomCard;
