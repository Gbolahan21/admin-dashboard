import { Navigate } from "react-router-dom";
import Loading from "./Loading";

function PrivateRoute({ admin, children }) {

    const { authenticated, initialized } = admin 

    if (!initialized) {
        return <Loading size="big" />;
    }

    if (!authenticated) {
        return <Navigate to="/signin" replace />;
    }

    return children;
}

export default PrivateRoute;