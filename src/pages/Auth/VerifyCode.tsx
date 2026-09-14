import { useState, type FormEvent } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { apiFetch, readError } from "../../api";
import { useAuth } from "../../context/useAuth";

const VerifyCode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const { login } = useAuth();
    const email = params.get("email") || "";
    const codeFromServer = (location.state as { verificationCode?: string } | null)?.verificationCode || "";
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        try {
            const response = await apiFetch("/Auth/verify", {
                method: "POST",
                body: JSON.stringify({ email, code }),
            });

            if (!response.ok) throw new Error(await readError(response));
            const data = await response.json();

            login(
                { name: data.name, email: data.email },
                data.accessToken,
                data.refreshToken
            );

            navigate("/information");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Verification failed");
        }
    };

    return (
        <Modal open={true} onClose={() => navigate("/")}>
            <h2>Authentication</h2>
            <p>Enter the verification code for {email}</p>
            {codeFromServer && (
                <p>Test code: <strong>{codeFromServer}</strong></p>
            )}
            <form onSubmit={submit} className="auth-form">
                <input value={code} onChange={event => setCode(event.target.value)} placeholder="Verification code" required />
                <button className="button" type="submit">Check code</button>
            </form>
            {error && <p className="error">{error}</p>}
        </Modal>
    );
};

export default VerifyCode;
