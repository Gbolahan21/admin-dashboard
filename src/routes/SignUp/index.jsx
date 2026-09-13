import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Button, Dropdown} from "../../components";
import { Eye, EyeOff, ArrowLeft, UserPlus } from "lucide-react";
import * as Helpers from '../../helpers';

function SignUp({ signup, navigate }) {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.title = 'SignUp | Moh';
  }, []);

  const handleRegister = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 
    if (!passwordRegex.test(password)) {
      Helpers.notification.error(
        "Weak Password",
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      Helpers.notification.error("Passwords do not match.");
      return;
    }

    signup(
      firstname.trim(),
      lastname.trim(),
      email.trim().toLowerCase(),
      title.trim(),
      password,

      // ERROR CALLBACK
      (error) => {
        Helpers.notification.error(error?.error || error?.message || "Registration failed");
      },

      // SUCCESS CALLBACK
      (response) => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setTitle("");
        setPassword("");
        setConfirmPassword("");

        Helpers.notification.success(response?.message);

        navigate('/signin');
      }
    )
  };

  const details = !firstname || !lastname || !email || !title || !password || !confirmPassword;

  const titleOptions = [
    { label: "Mr", value: "Mr" },
    { label: "Mrs", value: "Mrs" },
  ];
  
  return (
    <div>
      <div className='signup-container'>
        <div className='signup-card'>
          <Link to='/'>
            <ArrowLeft size={20} />
          </Link>

          <p className='signup-text'>SignUp</p>

          <input
            className='signup-input'
            placeholder="Enter your firstname"
            autoCapitalize="words"
            autoCorrect={false}
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            className='signup-input'
            placeholder="Enter your lastname"
            autoCapitalize="words"
            autoCorrect={false}
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            className='signup-input'
            placeholder="Enter your email"
            type="email"
            autoCapitalize="none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Dropdown
            // label="Title"
            placeholder="Select Title"
            value={title}
            onSelect={setTitle}
            options={titleOptions}
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

          <div className='signup-inputContainer'>
            <input
              className='signup-inputs'
              placeholder="Confirm password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          
             <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
                {showConfirmPassword ? (
                    <EyeOff size={20} />
                ) : (
                    <Eye size={20} />
                )}
            </button>
          </div>

          {password.length > 0 && (
            <div style={{ marginBottom: 15 }}>
              <p
                style={{
                  color: password.length >= 8 ? "green" : "red",
                }}
              >
                {password.length >= 8 ? "✓" : "✗"} At least 8 characters
              </p>

              <p
                style={{
                  color: /[A-Z]/.test(password) ? "green" : "red",
                }}
              >
                {/[A-Z]/.test(password) ? "✓" : "✗"} One uppercase letter
              </p>

              <p
                style={{
                  color: /[a-z]/.test(password) ? "green" : "red",
                }}
              >
                {/[a-z]/.test(password) ? "✓" : "✗"} One lowercase letter
              </p>

              <p
                style={{
                  color: /\d/.test(password) ? "green" : "red",
                }}
              >
                {/\d/.test(password) ? "✓" : "✗"} One number
              </p>

              <p
                style={{
                  color: /[@$!%*?&]/.test(password) ? "green" : "red",
                }}
              >
                {/[@$!%*?&]/.test(password) ? "✓" : "✗"} One special character
              </p>
            </div>
          )}

          <div>
            {confirmPassword.length > 0 && (
              <p
                style={{
                  color: password === confirmPassword ? "green" : "red",
                  marginBottom: 15,
                }}
              >
                {password === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
              </p>
            )}
          </div>

          <Button type="submit" title="Submit" iconLeft={<UserPlus size={18} color="white" />} onClick={handleRegister} disabled={details} />

          <p className='signup-footerText'>
            Already have an account.{" "}
            <Link to='/signin' className='signup-link'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
