// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import type { Hotel } from "../../context/HotelsContext.types";
// import {useHotels,} from "../../hooks/useHotels.ts";
// import {getImageUrl,} from "../../api";
// import {useAuth,} from "../../context/useAuth";
// import Modal from "../modal/Modal";
// import Stars from "../modal/Stars";
// import ReviewList from "../reviews/ReviewList";
// import RatingCircle from "../hotel/RatingCircle";
//
// type Props = {
//     hotel: Hotel | null;
//     onClose: () => void;
// };
//
// const HotelDetailsModal = ({
//                                hotel,
//                                onClose,
//                            }: Props) => {
//     const navigate =
//         useNavigate();
//
//     const { isAuth } =
//         useAuth();
//
//     const {
//         hotels,
//         addReview,
//     } = useHotels();
//
//     const [rating, setRating] =
//         useState(0);
//
//     const [text, setText] =
//         useState("");
//
//     const [message, setMessage] =
//         useState("");
//
//     if (!hotel) {
//         return null;
//     }
//
//     const currentHotel =
//         hotels.find(
//             item =>
//                 item.id ===
//                 hotel.id
//         ) || hotel;
//
//     const hotelStars =
//         currentHotel.stars > 0
//             ? Math.round(
//                 currentHotel.stars
//             )
//             : Math.round(
//                 currentHotel.rating /
//                 2
//             );
//
//     const sendReview = async () => {
//         if (!isAuth) {
//             navigate("/");
//             return;
//         }
//
//         if (rating === 0) {
//             setMessage(
//                 "Choose a rating."
//             );
//             return;
//         }
//
//         if (!text.trim()) {
//             setMessage(
//                 "Write a comment."
//             );
//             return;
//         }
//
//         setMessage("");
//
//         try {
//             await addReview(
//                 currentHotel.id,
//                 rating,
//                 text.trim()
//             );
//
//             setRating(0);
//             setText("");
//
//             setMessage(
//                 "Review added successfully."
//             );
//         } catch (error) {
//             setMessage(
//                 error instanceof Error
//                     ? error.message
//                     : "Could not add review."
//             );
//         }
//     };
//
//     return (
//         <Modal
//             open={true}
//             closeModal={onClose}
//         >
//             <div className="max-h-[88vh] overflow-y-auto px-5 pb-7 font-['Nunito_Sans']">
//                 <div className="flex items-start justify-between gap-4">
//                     <div>
//                         <h2 className="text-2xl font-extrabold text-[#581ADB]">
//                             {
//                                 currentHotel.name
//                             }
//                         </h2>
//
//                         <p className="mt-1 text-sm text-[#777]">
//                             {
//                                 currentHotel.city
//                             }
//                             ,{" "}
//                             {
//                                 currentHotel.country
//                             }
//                         </p>
//                     </div>
//
//                     <button
//                         type="button"
//                         onClick={() =>
//                             navigate(
//                                 `/hotel/${currentHotel.id}`
//                             )
//                         }
//                         className="rounded-full border border-[#581ADB] px-4 py-2 text-xs font-bold text-[#581ADB]"
//                     >
//                         Hotel page
//                     </button>
//                 </div>
//
//                 <div className="mt-4 overflow-hidden rounded-[16px]">
//                     {currentHotel.mainImageUrl ? (
//                         <img
//                             className="h-64 w-full object-cover"
//                             src={getImageUrl(
//                                 currentHotel.mainImageUrl
//                             )}
//                             alt={
//                                 currentHotel.name
//                             }
//                         />
//                     ) : (
//                         <div className="flex h-64 items-center justify-center bg-[#F4F4F4] text-gray-500">
//                             No hotel image
//                         </div>
//                     )}
//                 </div>
//
//                 <div className="mt-4 flex flex-wrap items-center gap-4">
//                     <div className="flex items-center gap-1">
//                         {Array.from({
//                             length: 5,
//                         }).map(
//                             (_, index) => (
//                                 <span
//                                     key={
//                                         index
//                                     }
//                                     className={`text-lg ${index < hotelStars ? "text-[#581ADB]" : "text-[#D8D8D8]"}`}
//                                 >
//                                     ★
//                                 </span>
//                             )
//                         )}
//                     </div>
//
//                     <RatingCircle
//                         rating={
//                             currentHotel.rating
//                         }
//                     />
//
//                     <span className="text-sm text-[#777]">
//                         {currentHotel.rating >
//                         0
//                             ? `${currentHotel.rating.toFixed(1)}/10` : "No rating"}
//                     </span>
//                     <span className="text-sm text-[#999]">
//                         {
//                             currentHotel.reviewsCount
//                         }{" "}review(s)
//                     </span>
//                 </div>
//                 <section className="mt-6">
//                     <h3 className="text-lg font-extrabold text-[#222]">
//                         Description
//                     </h3>
//                     <p className="mt-2 leading-6 text-[#666]">{
//                         currentHotel.description || "No description."}</p>
//                 </section>
//                 <section className="mt-6">
//                     <h3 className="text-lg font-extrabold text-[#222]">
//                         Amenities
//                     </h3>
//                     <p className="mt-2 text-[#666]">
//                         {currentHotel.amenities.length ? currentHotel.amenities.join(", ") : "No amenities."}</p>
//                     <p className="mt-2 text-[#666]">Wi-Fi:{" "}
//                         {currentHotel.hasWifi === true ? "Yes" : currentHotel.hasWifi === false
//                             ? "No"
//                             : "Not specified"}</p>
//                 </section>
//                 {currentHotel.images.length > 1 && (
//                     <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
//                         {currentHotel.images.map(
//                             image => (
//                                 <img
//                                     key={
//                                         image
//                                     }
//                                     src={getImageUrl(
//                                         image
//                                     )}
//                                     alt={
//                                         currentHotel.name
//                                     }
//                                     className="h-28 w-full rounded-xl object-cover"
//                                 />
//                             )
//                         )}
//                     </div>
//                 )}
//                 <section className="mt-6">
//                     <h3 className="mb-3 text-lg font-extrabold text-[#222]">
//                         Rooms</h3>
//                     {currentHotel.rooms.length === 0 ? (<p className="text-gray-500">No rooms.</p>) : (
//                         <div className="space-y-3">
//                             {currentHotel.rooms.map(
//                                 room => (
//                                     <div
//                                         key={
//                                             room.id
//                                         }
//                                         className="rounded-[14px] border border-[#E5E5E5] p-3"
//                                     >
//                                         <div className="flex gap-3">
//                                             {room.imageUrl ? (
//                                                 <img
//                                                     className="h-24 w-24 rounded-xl object-cover"
//                                                     src={getImageUrl(
//                                                         room.imageUrl
//                                                     )}
//                                                     alt={
//                                                         room.title
//                                                     }
//                                                 />
//                                             ) : (
//                                                 <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[#F3F3F3] text-xs text-gray-500">
//                                                     No image
//                                                 </div>
//                                             )}
//
//                                             <div className="min-w-0 flex-1">
//                                                 <h4 className="font-extrabold text-[#222]">
//                                                     {
//                                                         room.title
//                                                     }
//                                                 </h4>
//
//                                                 <p className="mt-1 text-sm text-[#777]">
//                                                     Bed:{" "}
//                                                     {
//                                                         room.bedType
//                                                     }
//                                                 </p>
//
//                                                 <p className="text-sm text-[#777]">
//                                                     Capacity:{" "}
//                                                     {
//                                                         room.capacity
//                                                     }
//                                                 </p>
//
//                                                 <p className="mt-1 font-extrabold text-[#581ADB]">
//                                                     {
//                                                         room.pricePerNight
//                                                     }{" "}
//                                                     / night
//                                                 </p>
//                                             </div>
//                                         </div>
//
//                                         {room.isAvailable && (
//                                             <button
//                                                 type="button"
//                                                 className="mt-3 rounded-full bg-[#581ADB] px-6 py-2 text-sm font-bold text-white"
//                                                 onClick={() => {
//                                                     onClose();
//
//                                                     navigate(
//                                                         `/booking/${room.id}`
//                                                     );
//                                                 }}
//                                             >
//                                                 Book
//                                             </button>
//                                         )}
//                                     </div>
//                                 )
//                             )}
//                         </div>
//                     )}
//                 </section>
//                 <section className="mt-6">
//                     <h3 className="mb-3 text-lg font-extrabold text-[#222]">
//                         Reviews
//                     </h3>
//                     <ReviewList
//                         reviews={
//                             currentHotel.reviews
//                         }
//                     />
//                 </section>
//                 <section className="mt-6 rounded-[16px] border border-[#E5E5E5] p-4">
//
//                     <h3 className="text-lg font-extrabold text-[#222]">
//                         Leave a review
//                     </h3>
//
//                     {isAuth ? (
//                         <>
//                             <p className="mt-3 text-sm text-[#777]">
//                                 Your rating
//                             </p>
//
//                             <Stars
//                                 value={rating}
//                                 onChange={
//                                     setRating
//                                 }
//                             />
//
//                             <textarea
//                                 value={text}
//                                 onChange={event =>
//                                     setText(
//                                         event
//                                             .target
//                                             .value
//                                     )
//                                 }
//                                 placeholder="Your comment"
//                                 className="mt-4 min-h-28 w-full resize-none rounded-[14px] border border-[#DDDDDD] p-4 outline-none focus:border-[#581ADB] focus:ring-2 focus:ring-violet-100"
//                             />
//
//                             <button
//                                 type="button"
//                                 className="mt-3 rounded-full bg-[#581ADB] px-7 py-3 text-sm font-bold text-white"
//                                 onClick={
//                                     sendReview
//                                 }
//                             >
//                                 Send review
//                             </button>
//                         </>
//                     ) : (
//                         <p className="mt-3 text-sm text-[#777]">
//                             Sign in to leave a review.
//                         </p>
//                     )}
//
//                     {message && (
//                         <p
//                             className={`mt-3 text-sm ${
//                                 message.includes(
//                                     "successfully"
//                                 )
//                                     ? "text-green-600"
//                                     : "text-red-500"
//                             }`}
//                         >
//                             {message}
//                         </p>
//                     )}
//                 </section>
//             </div>
//         </Modal>
//     );
// };
//
// export default HotelDetailsModal;
