import type { Room } from "@/context/HotelsContext.types";
import { useNavigate } from "react-router-dom";
import {getImageUrl} from "@/api.ts";

type Props = {
    room: Room;
};
const RoomCard = ({ room }: Props) => {
    const navigate = useNavigate();

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

                {/* FEATURES */}
                <div
                    className="
                        mt-5
                        flex
                        items-center
                        gap-5
                        text-[10px]
                        text-[#717171]
                        md:text-[12px]
                        md:gap-6
                    "
                >
                    <span className="flex items-center gap-1.5">
                        <img
                            src="/wifi.svg"
                            alt=""
                            className="h-4 w-4"
                        />
                        free wi-fi
                    </span>

                    <span className="flex items-center gap-1.5">
                        <img
                            src="/bath.svg"
                            alt=""
                            className="h-4 w-4"
                        />
                        bath
                    </span>
                </div>

                {/* CANCELLATION */}
                <div className="mt-2 flex items-center gap-2 text-[10px] text-[#581ADB] md:text-[12px]">
                    <span className="text-[11px]">✓</span>
                    <span>FREE cancellation</span>
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
        </div>
    );
};

export default RoomCard;
