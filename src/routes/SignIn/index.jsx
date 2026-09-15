import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Button} from "../../components";
import { Eye, EyeOff, ArrowLeft, LogIn } from "lucide-react";
import * as Helpers from '../../helpers';

function SignIn({ signin, navigate }) {
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("savedEmail") || "";
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    return Boolean(localStorage.getItem("savedEmail"));
  }); 

  useEffect(() => {
    document.title = 'SignIn | Moh';
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

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
        localStorage.setItem("admin", JSON.stringify(response.admin));
        if (rememberMe) {
          localStorage.setItem("token", response.token);

          localStorage.setItem("savedEmail", email.trim().toLowerCase());
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("savedEmail");
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
            <Link to='/signup' className='signup-link'>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

