import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";

export default function RoutesConfig() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signin" element={<SignIn />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}