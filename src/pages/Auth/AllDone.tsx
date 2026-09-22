import { useNavigate } from "react-router-dom";

const AllDone = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>All done</h2>
            <p>Your account has been created.</p>

            <button
                type="button"
                className="button"
                onClick={() => navigate("/account")}
            >
                Go to profile
            </button>

            <button
                type="button"
                onClick={() => navigate("/")}
            >
                Return to booking
            </button>
        </div>
    );
};

export default AllDone;