import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-page">
            <div className="not-found-card">

                <div className="not-found-code">
                    404
                </div>

                <h1>Page not found</h1>

                <p>
                    Sorry, the page you're looking for doesn't exist or
                    may have been moved.
                </p>

                <div className="not-found-actions">

                    <button
                        className="back-button"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>

                    <button
                        className="dashboard-button"
                        onClick={() => navigate("/dashboard")}
                    >
                        <Home size={18} />
                        Back to Dashboard
                    </button>

                </div>

            </div>
        </div>
    );
};

export default NotFound;
