import { Navigate } from "react-router-dom";
import Loading from "./Loading";

function PrivateRoute({ admin, children }) {
    const { authenticated, initialized } = admin;

    const token = localStorage.getItem("token");

    // Still checking authentication
    if (!initialized && token) {
        return <Loading size="big" />;
    }

    // No token = definitely not authenticated
    if (!token || !authenticated) {
        return <Navigate to="/signin" replace />;
    }

    return children;
}

export default PrivateRoute;