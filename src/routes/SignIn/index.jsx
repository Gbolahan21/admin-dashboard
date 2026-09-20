import {useState, useEffect} from "react";
import { Link, useSearchParams } from "react-router-dom";
import {Button} from "../../components";
import { Eye, EyeOff, ArrowLeft, LogIn } from "lucide-react";
import * as Helpers from '../../helpers';

function SignIn({ signin, navigate }) {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "lecturer";
  const isLecturer = role === "lecturer";
  const [email, setEmail] = useState(() => {
    const role = new URLSearchParams(window.location.search).get("role") || "lecturer";
    const emailKey =
      role === "admin"
        ? "adminSavedEmail"
        : "lecturerSavedEmail";
    return localStorage.getItem(emailKey) || "";
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    const role = new URLSearchParams(window.location.search).get("role") || "lecturer";
    const emailKey =
      role === "admin"
        ? "adminSavedEmail"
        : "lecturerSavedEmail";
    return Boolean(localStorage.getItem(emailKey));
  });

  useEffect(() => {
    document.title = `${isLecturer ? "Lecturer" : "Admin"} SignIn | Moh`;
  }, [isLecturer]);

  useEffect(() => {
    const tokenKey =
      role === "admin"
        ? "adminToken"
        : "lecturerToken";

    const token = localStorage.getItem(tokenKey);

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, role]);

  const handleLogin = () => {
    signin(
      email.trim().toLowerCase(),
      password,

      // Error callback
      (error) => {
        Helpers.notification.error(error.message)
      },

      // Success callback
      (response) => {
        const userRole = response.role;

        if (!userRole) {
          Helpers.notification.error("Login response did not contain a role.");
          return;
        }

        if (userRole !== role) {
          Helpers.notification.error("The selected account role does not match the authenticated account.");
          return;
        }

        const tokenKey =
        userRole === "admin"
          ? "adminToken"
          : "lecturerToken";

        const emailKey =
          userRole === "admin"
            ? "adminSavedEmail"
            : "lecturerSavedEmail";

        localStorage.setItem("role", userRole);
        localStorage.setItem(tokenKey, response.token);
        if (rememberMe) {
          localStorage.setItem(emailKey, email.trim().toLowerCase());
        } else {
          localStorage.removeItem(emailKey);
        }

        Helpers.notification.success(response.message)

        navigate('/dashboard');
      }
    )
  };

  const details = !email || !password;
  
  return (
    <div>
      <div className='signup-container'>
        <div className='signup-card'>
          <Link to='/'>
            <ArrowLeft size={20} />
          </Link>

          <p className='signup-text'>SignIn</p>

          <input
            className='signup-input'
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className='signup-inputContainer'>
            <input
              className='signup-inputs'
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <EyeOff size={20} />
                ) : (
                    <Eye size={20} />
                )}
            </button>
          </div>

          <div className="remember-container">
                <label className="remember-label">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />

                    <span>Remember me</span>
                </label>
            </div>

          <Button type="submit" title="Login" iconRight={<LogIn size={18} color="white" />} onClick={handleLogin} disabled={details} />

          <p className='signup-footerText'>
            Don't have an account.{" "}
            <Link  to={`/signup?role=${role}`} className='signup-link'>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

