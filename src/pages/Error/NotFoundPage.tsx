import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="error-page">
            <h1>Page not found</h1>
            <Link to="/">Back to hotels</Link>
        </div>
    );
};

export default NotFoundPage;