import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { apiFetch, readError } from "../../api";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const response = await apiFetch("/Auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email, phone, password }),
            });

            if (!response.ok) throw new Error(await readError(response));
            const data = await response.json();

            navigate(`/verify?email=${encodeURIComponent(email)}`, {
                state: { verificationCode: data.verificationCode },
            });
        } catch (error) {
            setError(error instanceof Error ? error.message : "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={true} onClose={() => navigate("/")}>
            <h2>Register</h2>
            <form onSubmit={submit} className="auth-form">
                <input value={name} onChange={event => setName(event.target.value)} placeholder="Name" required />
                <input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Email" required />
                <input value={phone} onChange={event => setPhone(event.target.value)} placeholder="Phone" />
                <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Password" required />
                <input type="password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder="Confirm password" required />
                <label><input type="checkbox" required /> I agree with Privacy policy</label>
                <button className="button" type="submit" disabled={loading}>{loading ? "Loading..." : "Send code"}</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </Modal>
    );
};

export default Register;
