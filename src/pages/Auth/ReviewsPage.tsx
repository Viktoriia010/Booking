// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useHotels } from "../../hooks/useHotels.ts";
// import { useAuth } from "../../context/useAuth";
// import Stars from "../../components/modal/Stars";
// import ReviewList from "../../components/reviews/ReviewList";
//
const ReviewsPage = () => {
//     const navigate = useNavigate();
//     const { hotels, addReview, loadHotels } = useHotels();
//     const { isAuth } = useAuth();
//     const [hotelId, setHotelId] = useState("");
//     const [rating, setRating] = useState(0);
//     const [text, setText] = useState("");
//     const [message, setMessage] = useState("");
//
//     useEffect(() => {
//         if (hotels.length === 0) void loadHotels();
//     }, []);
//
//     const currentHotelId = hotelId || hotels[0]?.id || "";
//     const hotel = hotels.find(x => x.id === currentHotelId);
//
//     const submit = async () => {
//         if (!isAuth) {
//             navigate("/login");
//             return;
//         }
//         if (!hotelId || rating === 0 || !text.trim()) {
//             setMessage("Choose a hotel, rating and comment.");
//             return;
//         }
//         try {
//             await addReview(currentHotelId, rating, text.trim());
//             setRating(0);
//             setText("");
//             setMessage("Review added.");
//         } catch (error) {
//             setMessage(error instanceof Error ? error.message : "Could not add review");
//         }
//     };
//
//     return (
//         <div className="reviews-page">
//             <h1>Reviews</h1>
//             {hotels.length === 0 ? <p>No hotels found.</p> : <>
//                 <select value={currentHotelId} onChange={event => setHotelId(event.target.value)}>
//                     {hotels.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
//                 </select>
//                 {hotel && <>
//                     <h2>{hotel.name}</h2>
//                     <Stars value={Math.round(hotel.rating)} />
//                     <p>Rating: {hotel.rating > 0 ? hotel.rating.toFixed(1) : "No rating"}</p>
//                     <ReviewList reviews={hotel.reviews} />
//                     <div className="review-form">
//                         <h3>Add review</h3>
//                         {isAuth ? <>
//                             <Stars value={rating} onChange={setRating} />
//                             <textarea value={text} onChange={event => setText(event.target.value)} placeholder="Comment" />
//                             <button type="button" className="button" onClick={submit}>Send</button>
//                         </> : <button type="button" className="button" onClick={() => navigate("/login")}>Sign in to review</button>}
//                         {message && <p>{message}</p>}
//                     </div>
//                 </>}
//             </>}
//         </div>
//     );
};

export default ReviewsPage;
