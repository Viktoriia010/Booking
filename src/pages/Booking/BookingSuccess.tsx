import { Link } from "react-router-dom";

const BookingSuccess = () => {
    return (
        <div className="success-page">
            <h1>Booking completed</h1>
            <p>Your booking was successfully created.</p>
            <Link className="button" to="/account">
                Open account
            </Link>
            <Link className="button" to="/">
                Back to hotels
            </Link>
        </div>
    );
};

export default BookingSuccess;