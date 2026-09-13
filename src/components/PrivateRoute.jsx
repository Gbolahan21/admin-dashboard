import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

export default function PrivateRoute({ children }) {
  const authenticated = useSelector(
    (state) => state.admin?.authenticated
  );

  const initialized = useSelector(
    (state) => state.admin?.initialized
  );

  if (!initialized) {
    return <Loader size="large" />;
  }

  if (!authenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}