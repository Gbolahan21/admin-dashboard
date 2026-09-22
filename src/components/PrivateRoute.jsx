import { Navigate, Outlet, useLocation } from "react-router-dom";
import * as Helpers from "../helpers";
import Loading from "./Loading";

const adminOnlyRoutes = [
    "/faculty",
    "/department",
    "/level",
    "/semester",
];

function PrivateRoute({ admin, children }) {
    const location = useLocation();

    const {authenticated, initialized, role} = admin;

    const token = Helpers.token.get();

    const isAdminOnlyRoute = adminOnlyRoutes.includes(
        location.pathname
    );

    if (!initialized && token) {
        return <Loading size="big" />;
    }

    if (!token || !authenticated) {
        const role = localStorage.getItem("role");

        return (
            <Navigate
                to={`/signin?role=${role || "lecturer"}`}
                replace
            />
        );
    };
    

    if (isAdminOnlyRoute && role !== "admin") {
       return <Navigate to="/404" replace />;
    }

    return children || <Outlet />;
}

export default PrivateRoute;