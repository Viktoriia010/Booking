import { getImageUrl } from "../../api";
import type { Room } from "../../context/HotelsContext.types";

type BookingRoomProps = {
    room: Room;
};

const BookingRoom = ({ room }: BookingRoomProps) => {
    return (
        <div className="booking-room">
            <img
                className="room-card__image"
                src={getImageUrl(room.imageUrl)}
                alt={room.title}
            />

            <h2>{room.title}</h2>

            <p>{room.bedType}</p>

            <p>{room.pricePerNight} / night</p>
        </div>
    );
};

export default BookingRoom;