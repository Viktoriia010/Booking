// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getImageUrl } from "../api";
// import type { Hotel } from "../context/HotelsContext.types";
// import { useHotels } from "../hooks/useHotels.ts";
// import { useAuth } from "../context/useAuth";
// import Stars from "../components/modal/Stars";
// import ReviewList from "../components/reviews/ReviewList";
//
// const HotelPage = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { loadHotel, addReview } = useHotels();
//     const { isAuth } = useAuth();
//     const [hotel, setHotel] = useState<Hotel | null>(null);
//     const [rating, setRating] = useState(0);
//     const [text, setText] = useState("");
//     const [message, setMessage] = useState("");
//
//     useEffect(() => {
//         if (!id) return;
//         void loadHotel(id).then(setHotel);
//     }, [id]);
//
//     if (!hotel) return <p>Hotel not found.</p>;
//
//     const submitReview = async () => {
//         if (!isAuth) {
//             navigate("/login");
//             return;
//         }
//         if (rating === 0 || !text.trim()) {
//             setMessage("Choose a rating and write a comment.");
//             return;
//         }
//         try {
//             await addReview(hotel.id, rating, text.trim());
//             const updated = await loadHotel(hotel.id);
//             setHotel(updated);
//             setRating(0);
//             setText("");
//             setMessage("Review added.");
//         } catch (error) {
//             setMessage(error instanceof Error ? error.message : "Could not add review.");
//         }
//     };
//
//     return (
//         <div className="hotel-page">
//             <button type="button" onClick={() => navigate(-1)}>Back</button>
//             <h1>{hotel.name}</h1>
//             <p>{hotel.city}, {hotel.country}</p>
//             <Stars value={Math.round(hotel.rating)} />
//             <p>Rating: {hotel.rating > 0 ? hotel.rating.toFixed(1) : "No rating"} ({hotel.reviewsCount} reviews)</p>
//
//             {hotel.mainImageUrl && <img className="hotel-page__image" src={getImageUrl(hotel.mainImageUrl)} alt={hotel.name} />}
//             <h2>Description</h2>
//             <p>{hotel.description || "No description."}</p>
//             <h2>Amenities</h2>
//             <p>{hotel.amenities.length ? hotel.amenities.join(", ") : "No amenities."}</p>
//             <p>Wi-Fi: {hotel.hasWifi === true ? "Yes" : hotel.hasWifi === false ? "No" : "Not specified"}</p>
//
//             <h2>Rooms</h2>
//             {hotel.rooms.length === 0 ? <p>No rooms.</p> : hotel.rooms.map(room => (
//                 <div className="room-card" key={room.id}>
//                     {room.imageUrl && <img className="room-card__image" src={getImageUrl(room.imageUrl)} alt={room.title} />}
//                     <div>
//                         <h3>{room.title}</h3>
//                         <p>{room.bedType}</p>
//                         <p>Capacity: {room.capacity}</p>
//                         <p>{room.pricePerNight} / night</p>
//                         <button className="button" type="button" disabled={!room.isAvailable} onClick={() => navigate(`/booking/${room.id}`)}>
//                             {room.isAvailable ? "Book" : "Not available"}
//                         </button>
//                     </div>
//                 </div>
//             ))}
//
//             <h2>Reviews</h2>
//             <ReviewList reviews={hotel.reviews} />
//             <div className="review-form">
//                 <h3>Leave a review</h3>
//                 {isAuth ? <>
//                     <Stars value={rating} onChange={setRating} />
//                     <textarea value={text} onChange={event => setText(event.target.value)} placeholder="Comment" />
//                     <button type="button" className="button" onClick={submitReview}>Send</button>
//                 </> : <button type="button" className="button" onClick={() => navigate("/login")}>Sign in to review</button>}
//                 {message && <p>{message}</p>}
//             </div>
//         </div>
//     );
// };
//
// export default HotelPage;
