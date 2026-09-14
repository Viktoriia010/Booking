import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { apiFetch, readError } from "../../api";
import { useAuth } from "../../context/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await apiFetch("/Auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error(await readError(response));
            const data = await response.json();

            login(
                { name: data.name, email: data.email },
                data.accessToken,
                data.refreshToken
            );

            navigate("/", { replace: true });
        } catch (error) {
            setError(error instanceof Error ? error.message : "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={true} onClose={() => navigate("/")}>
            <h2>Sign in</h2>
            <form onSubmit={submit} className="auth-form">
                <input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Password" required />
                <button className="button" type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Continue"}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>No account? <Link to="/register">Register</Link></p>
        </Modal>
    );
};

export default Login;
