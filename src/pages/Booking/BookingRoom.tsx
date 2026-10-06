import { getImageUrl } from "../../api";
import type { Room } from "../../context/HotelsContext.types";

type BookingRoomProps = {
    room: Room;
};

const BookingRoom = ({ room }: BookingRoomProps) => {
    return (
        <div className="overflow-hidden rounded-[18px] border border-[#E5E5E5] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="aspect-[16/10] overflow-hidden bg-[#F3F3F3]">
                {room.imageUrl ? (
                    <img
                        src={getImageUrl(room.imageUrl)}
                        alt={room.title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-[#999]">
                        No image
                    </div>
                )}
            </div>

            <div className="p-5">
                <h2 className="text-xl font-extrabold text-[#222]">
                    {room.title}
                </h2>

                <p className="mt-2 text-sm text-[#777]">
                    {room.bedType}
                </p>

                <p className="mt-4 text-lg font-extrabold text-[#581ADB]">
                    ${room.pricePerNight} / night
                </p>
            </div>
        </div>
    );
};

export default BookingRoom;