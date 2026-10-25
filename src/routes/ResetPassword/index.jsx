import { useCallback, useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../components/Button";
import * as Helpers from "../../helpers";

function ResetPassword({
    resetPassword,
}) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const role = searchParams.get("role") || "lecturer";
    const [resetData, setResetData] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadResetData = async () => {
            const data = await Helpers.sessionStorage.getSessionData(
                "passwordReset"
            );

            setResetData(data);
        };

        loadResetData();
    }, []);

    const email = resetData?.email || "";
    const resetToken = resetData?.resetToken;

    const validatePassword = useCallback(() => {
        if (!password) {
            Helpers.notification.error("Please enter your new password")
            return false;
        }

        if (password.length < 8) {
            Helpers.notification.error("Password must be at least 8 characters")
            return false;
        }

        if (!/[A-Z]/.test(password)) {
            Helpers.notification.error("Password must contain a uppercase letter.")
            return false;
        }

        if (!/[a-z]/.test(password)) {
           Helpers.notification.error("Password must contain a uppercase letter.")
            return false;
        }

        if (!/[0-9]/.test(password)) {
            Helpers.notification.error("Password must contain a number.")
            return false;
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            Helpers.notification.error("Password must contain a special character.")
            return false;
        }

        if (password !== confirmPassword) {
            Helpers.notification.error("Please make sure both password match.")
            return false;
        }

        return true;
    }, [password, confirmPassword]);

    const handleSubmit = useCallback(() => {
        if (!email || !resetToken) {
            Helpers.notification.error("Please restart the password reset process.")
            navigate("/forgot-password", { replace: true });
            return;
        }

        if (!validatePassword()) {
            return;
        }

        setSubmitting(true);

        resetPassword(
            {
                email,
                resetToken,
                password,
            },

            () => {
                setSubmitting(false);
                Helpers.notification.error("Unable to reset your password.")
                
            },

            () => {
                setSubmitting(false);
                Helpers.sessionStorage.removeSessionData("passwordReset");
                Helpers.notification.error("Your password has been reset successfully.")
                navigate(`/signin?role=${role}`, {replace: true})
            }
        );
    }, [resetPassword, email, password, resetToken, validatePassword, role, navigate]);

    return (
        <div className='signup-container reset-password-container'>
            <div className='signup-card'>
                <h2>Reset Password</h2>
                <h4>
                    Create a new password for your {role} account.
                </h4>

                <h4>{email}</h4>

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

                <Button
                    onClick={handleSubmit}
                    title={submitting ? "Resetting..." : "Reset Password"}
                    disabled={submitting}
                    loading={submitting}
                />

                <Link to={`/forgot-password?role=${role}`} className="back-to-signin-link">
                    Back
                </Link>
            </div>
        </div>
    );
}

export default ResetPassword;