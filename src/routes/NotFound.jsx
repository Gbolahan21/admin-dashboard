import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, Home } from "lucide-react";
import notification from "../helpers/notification";

const NotFound = () => {
    const navigate = useNavigate();

    const admin = useSelector((state) => state.admin);

    const handleDashboard = () => {
        const token = localStorage.getItem("token");

        if (!token || !admin?.authenticated) {
            notification.error(
                "Please sign in to access the dashboard."
            );

            navigate("/signin");
            return;
        }

        navigate("/dashboard");
    };

    return (
        <div className="not-found-page">

            <div className="not-found-card">

                <div className="not-found-code">
                    404
                </div>

                <h1>Page not found</h1>

                <p>
                    Sorry, the page you're looking for doesn't exist
                    or may have been moved.
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
                        onClick={handleDashboard}
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