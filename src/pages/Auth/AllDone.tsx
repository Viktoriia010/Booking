import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";

const AllDone = () => {
    const navigate = useNavigate();

    return (
        <Modal open={true} onClose={() => navigate("/")}>
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
        </Modal>
    );
};

export default AllDone;