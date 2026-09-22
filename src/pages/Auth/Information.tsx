import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { apiFetch, readError } from "../../api";
import { useAuth } from "../../context/useAuth";

const Information = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [travelPurpose, setTravelPurpose] = useState("");
    const [pet, setPet] = useState(false);
    const [error, setError] = useState("");

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        try {
            const response = await apiFetch("/Account", {
                method: "PUT",
                body: JSON.stringify({
                    name: user?.name || "",
                    phone: user?.phone || "",
                    country,
                    city,
                    travelPurpose,
                    travelingWithPet: pet,
                }),
            });
            if (!response.ok) throw new Error(await readError(response));
            navigate("/all-done");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Could not save information");
        }
    };

    return (
        <Modal open={true} closeModal={() => navigate("/")}>
            <h2>Your information</h2>
            <form onSubmit={submit} className="auth-form">
                <input value={country} onChange={event => setCountry(event.target.value)} placeholder="Country" />
                <input value={city} onChange={event => setCity(event.target.value)} placeholder="City" />
                <input value={travelPurpose} onChange={event => setTravelPurpose(event.target.value)} placeholder="Purpose of trip" />
                <label><input type="checkbox" checked={pet} onChange={event => setPet(event.target.checked)} /> Traveling with pet</label>
                <button className="button" type="submit">Continue</button>
            </form>
            <button type="button" onClick={() => navigate("/all-done")}>Later</button>
            {error && <p className="error">{error}</p>}
        </Modal>
    );
};

export default Information;
