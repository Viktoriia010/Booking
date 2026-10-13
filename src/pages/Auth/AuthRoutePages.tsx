import { useNavigate } from "react-router-dom";
import Information from "./Information";
import AllDone from "./AllDone";

export function InformationRoute() {
    const navigate = useNavigate();
    return <Information onSuccess={() => navigate("/all-done")} />;
}

export function AllDoneRoute() {
    const navigate = useNavigate();
    return <AllDone onClose={() => navigate("/account")} />;
}
